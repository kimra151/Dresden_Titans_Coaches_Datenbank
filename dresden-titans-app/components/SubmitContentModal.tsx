"use client";

import { useState, useRef } from 'react';
import { 
  X, UploadCloud, FileVideo, Plus, Trash2, 
  ChevronRight, ChevronLeft, CheckCircle2, AlertCircle,
  Loader2, Check
} from 'lucide-react';

// WICHTIG: Passe den Pfad zu deiner Server Action an!
import { getPresignedUrl } from '../lib/actions/uploadFileToR2'; 

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubmitContentModal({ isOpen, onClose }: SubmitModalProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'submissions'>('upload');
  const [step, setStep] = useState(1);
  const [dragActive, setDragActive] = useState(false);
  
  // --- UPLOAD STATES ---
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- FORM STATES ---
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('');
  const [description, setDescription] = useState('');
  const [keyPoints, setKeyPoints] = useState<string[]>(['']);
  const [constraints, setConstraints] = useState('');

  if (!isOpen) return null;

  // --- DRAG & DROP HANDLER ---
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type.includes('video')) {
        setFile(droppedFile);
        setUploadError(null);
      } else {
        setUploadError('Bitte lade nur Videodateien (MP4, MOV, WebM) hoch.');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadError(null);
    }
  };

  // --- FORM HANDLER ---
  const handleAddPoint = () => setKeyPoints([...keyPoints, '']);
  const handleRemovePoint = (index: number) => {
    const newPoints = [...keyPoints];
    newPoints.splice(index, 1);
    setKeyPoints(newPoints);
  };

  // 2. Ersetze die handleUpload Funktion:
  const handleUpload = async () => {
    if (!file) {
      setUploadError('Bitte wähle zuerst ein Video aus.');
      setStep(1);
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      // 1. Hole das "Ticket" (die Presigned URL) vom Next.js Server
      const { success, uploadUrl, fileUrl, error } = await getPresignedUrl(file.name, file.type);

      if (!success || !uploadUrl) {
        throw new Error(error || 'Fehler beim Generieren der Upload-URL.');
      }

      // 2. Lade das Video DIREKT zu Cloudflare R2 hoch (bypassed deinen Server!)
      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type, // Muss exakt mit dem ContentType aus der Server Action übereinstimmen
        },
      });

      if (uploadResponse.ok) {
        setUploadSuccess(true);
        
        // --- HIER IST DER MAGISCHE MOMENT ---
        // Das Video liegt jetzt in Cloudflare. 
        // Jetzt kannst du den fertigen Link (`fileUrl`) zusammen mit den 
        // anderen Formular-Daten (Title, Category, etc.) in deiner Datenbank speichern.
        // z.B.: await saveDrillToDatabase({ title, category, level, videoUrl: fileUrl, ... });

        setTimeout(() => {
          onClose();
          setFile(null);
          setStep(1);
          setUploadSuccess(false);
          setTitle('');
          // ... (andere Formularfelder leeren)
        }, 2000);
      } else {
        throw new Error('Upload zu Cloudflare fehlgeschlagen.');
      }
    } catch (error: any) {
      console.error(error);
      setUploadError(error.message || 'Ein unerwarteter Fehler ist aufgetreten.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      
      <div 
        className="absolute inset-0 bg-[#0B1F3A]/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={!isUploading ? onClose : undefined} // Verhindert Schließen während Upload
      />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        
        {!isUploading && (
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 z-20 w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-500 transition-colors"
          >
            <X size={18} />
          </button>
        )}

        <div className="px-8 pt-8 pb-0 border-b border-slate-100">
          <h2 className="text-2xl font-montserrat font-bold text-[#0B1F3A] mb-6">
            Inhalt teilen
          </h2>
          <div className="flex gap-6 text-[14px] font-semibold">
            <button 
              onClick={() => !isUploading && setActiveTab('upload')}
              className={`pb-3 border-b-2 transition-all ${
                activeTab === 'upload' ? 'border-[#1E5AA8] text-[#0B1F3A]' : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              Neuer Upload
            </button>
            <button 
              onClick={() => !isUploading && setActiveTab('submissions')}
              className={`pb-3 border-b-2 transition-all ${
                activeTab === 'submissions' ? 'border-[#1E5AA8] text-[#0B1F3A]' : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              Meine Uploads
            </button>
          </div>
        </div>

        {activeTab === 'upload' ? (
          <div className="flex flex-col max-h-[80vh] overflow-hidden">
            
            <div className="w-full h-1 bg-slate-100">
              <div 
                className="h-full bg-[#1E5AA8] transition-all duration-500 ease-out" 
                style={{ width: step === 1 ? '50%' : '100%' }}
              />
            </div>

            <div className="overflow-y-auto p-8 scrollbar-hide">
              
              {uploadError && (
                <div className="mb-6 bg-red-50 text-red-600 border border-red-200 p-4 rounded-xl flex gap-3 text-[13px] animate-in fade-in">
                  <AlertCircle size={18} className="shrink-0" />
                  <p>{uploadError}</p>
                </div>
              )}

              {/* --- SCHRITT 1 --- */}
              {step === 1 && (
                <div className="space-y-6 animate-in slide-in-from-left-4 duration-300">
                  
                  <div className="bg-[#EEF3F8]/50 border border-[#1E5AA8]/20 p-4 rounded-xl flex gap-3 text-slate-600 text-[13px] leading-relaxed">
                    <AlertCircle size={18} className="text-[#1E5AA8] shrink-0 mt-0.5" />
                    <p>
                      <strong>Qualitäts-Check:</strong> Teile Drills, die innovativ sind oder einen klaren Fokus haben. Lade keine Standard-Korbleger-Lines hoch – wir suchen Übungen, die andere Trainer wirklich weiterbringen.
                    </p>
                  </div>

                  {/* Drag & Drop Zone */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                      Video Datei *
                    </label>
                    
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      accept="video/mp4,video/quicktime,video/webm" 
                      className="hidden" 
                      onChange={handleChange}
                    />

                    <div 
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`w-full border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                        dragActive ? 'border-[#1E5AA8] bg-[#EEF3F8]' : 
                        file ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 hover:border-[#1E5AA8]/50 hover:bg-slate-50'
                      }`}
                    >
                      {file ? (
                        <>
                          <div className="w-12 h-12 bg-emerald-100 rounded-full shadow-sm flex items-center justify-center text-emerald-600 mb-3">
                            <FileVideo size={24} />
                          </div>
                          <p className="text-[14px] font-bold text-emerald-700 mb-1 truncate max-w-[250px]">
                            {file.name}
                          </p>
                          <p className="text-[12px] text-emerald-600/70">
                            {(file.size / (1024 * 1024)).toFixed(2)} MB • Klicken zum Ändern
                          </p>
                        </>
                      ) : (
                        <>
                          <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-[#1E5AA8] mb-3">
                            <UploadCloud size={24} />
                          </div>
                          <p className="text-[14px] font-semibold text-[#0B1F3A] mb-1">
                            Klicken oder Video hierher ziehen
                          </p>
                          <p className="text-[12px] text-slate-400">MP4, MOV oder WebM (Max 500MB)</p>
                        </>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                      Titel des Drills *
                    </label>
                    <input 
                      type="text" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="z.B. Euro Step Finishing unter Kontakt" 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[14px] focus:bg-white focus:border-[#6DB7FF] focus:ring-4 focus:ring-[#6DB7FF]/10 outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                        Kategorie *
                      </label>
                      <select 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[14px] text-slate-700 focus:bg-white focus:border-[#6DB7FF] focus:ring-4 focus:ring-[#6DB7FF]/10 outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Auswählen...</option>
                        <option value="shooting">Shooting</option>
                        <option value="finishing">Finishing</option>
                        <option value="ballhandling">Ballhandling</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                        Team / Level *
                      </label>
                      <select 
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[14px] text-slate-700 focus:bg-white focus:border-[#6DB7FF] focus:ring-4 focus:ring-[#6DB7FF]/10 outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Auswählen...</option>
                        <option value="u10-u12">U10 - U12</option>
                        <option value="u13-u14">U13 - U14</option>
                        <option value="jbbl">JBBL (U16)</option>
                        <option value="nbbl">NBBL (U19)</option>
                        <option value="pro">Pro</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* --- SCHRITT 2 --- */}
              {step === 2 && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                  
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                      Beschreibung & Zielsetzung *
                    </label>
                    <textarea 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Erkläre kurz den Ablauf und was mit diesem Drill primär trainiert wird..." 
                      className="w-full h-24 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[14px] focus:bg-white focus:border-[#6DB7FF] focus:ring-4 focus:ring-[#6DB7FF]/10 outline-none transition-all resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                      Key Coaching Points
                    </label>
                    <div className="space-y-3">
                      {keyPoints.map((point, index) => (
                        <div key={index} className="flex gap-2">
                          <div className="flex-1 relative">
                            <CheckCircle2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                            <input 
                              type="text" 
                              value={point}
                              onChange={(e) => {
                                const newPoints = [...keyPoints];
                                newPoints[index] = e.target.value;
                                setKeyPoints(newPoints);
                              }}
                              placeholder={`Coaching Point ${index + 1}`}
                              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[14px] focus:bg-white focus:border-[#6DB7FF] focus:ring-4 focus:ring-[#6DB7FF]/10 outline-none transition-all"
                            />
                          </div>
                          {keyPoints.length > 1 && (
                            <button 
                              onClick={() => handleRemovePoint(index)}
                              className="w-11 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <button 
                      onClick={handleAddPoint}
                      className="mt-3 flex items-center gap-1.5 text-[12px] font-bold text-[#1E5AA8] hover:text-[#0B1F3A] transition-colors"
                    >
                      <Plus size={14} /> Weiteren Punkt hinzufügen
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                      Constraint Ideas (Make it harder/easier)
                    </label>
                    <textarea 
                      value={constraints}
                      onChange={(e) => setConstraints(e.target.value)}
                      placeholder="Welche Constraints können Trainer anwenden, um die Übung zu skalieren?" 
                      className="w-full h-20 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[14px] focus:bg-white focus:border-[#6DB7FF] focus:ring-4 focus:ring-[#6DB7FF]/10 outline-none transition-all resize-none"
                    />
                  </div>

                </div>
              )}
            </div>

            {/* --- MODAL FOOTER --- */}
            <div className="px-8 py-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              {step === 1 ? (
                <button 
                  onClick={onClose}
                  disabled={isUploading}
                  className="px-5 py-2.5 text-[14px] font-semibold text-slate-500 hover:text-slate-800 transition-colors disabled:opacity-50"
                >
                  Abbrechen
                </button>
              ) : (
                <button 
                  onClick={() => setStep(1)}
                  disabled={isUploading}
                  className="flex items-center gap-1 px-5 py-2.5 text-[14px] font-semibold text-slate-500 hover:text-[#0B1F3A] transition-colors disabled:opacity-50"
                >
                  <ChevronLeft size={16} /> Zurück
                </button>
              )}

              {step === 1 ? (
                <button 
                  onClick={() => setStep(2)}
                  disabled={!file} // Blockiert, wenn kein File da ist
                  className="flex items-center gap-1 px-6 py-2.5 bg-[#0B1F3A] hover:bg-[#1E5AA8] text-white text-[14px] font-bold rounded-xl transition-colors shadow-lg shadow-[#0B1F3A]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Weiter <ChevronRight size={16} />
                </button>
              ) : (
                <button 
                  onClick={handleUpload}
                  disabled={isUploading || uploadSuccess}
                  className={`flex items-center gap-2 px-6 py-2.5 text-white text-[14px] font-bold rounded-xl transition-all shadow-lg ${
                    uploadSuccess 
                      ? 'bg-emerald-500 shadow-emerald-500/20' 
                      : 'bg-[#1E5AA8] hover:bg-[#0B1F3A] shadow-[#1E5AA8]/20'
                  } disabled:opacity-80 disabled:cursor-not-allowed`}
                >
                  {isUploading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Upload läuft...
                    </>
                  ) : uploadSuccess ? (
                    <>
                      <Check size={16} /> Erfolgreich hochgeladen!
                    </>
                  ) : (
                    <>
                      <UploadCloud size={16} /> In die Vault hochladen
                    </>
                  )}
                </button>
              )}
            </div>

          </div>
        ) : (
          <div className="p-8 text-center text-slate-500 flex flex-col items-center justify-center h-64">
            <FileVideo size={32} className="text-slate-300 mb-3" />
            <p>Du hast noch keine Videos hochgeladen.</p>
          </div>
        )}
      </div>
    </div>
  );
}