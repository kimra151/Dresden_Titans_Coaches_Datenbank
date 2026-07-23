"use client";

import { useState, useRef } from 'react';
import {
  X, Play, Share2, Bookmark, PlusCircle,
  Target, ListOrdered, CheckCircle2, Clock,
  Users, AlertTriangle, Layers, Heart
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════
// TYPEN
// ═══════════════════════════════════════════════════════════

export interface Drill {
  title: string;
  category: string;
  author: { name: string; avatar: string; role: string };
  meta: string;
  duration: string;
  players: string;
  level: string;
  objective: string;
  videoUrl: string;
  posterImage?: string;
  execution: string[];
  keyPoints: string[];
  mistake: { error: string; fix: string };
}

interface DrillDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  drill?: Drill;
}

type RightTab = 'ablauf' | 'keypoints' | 'mistakes';

// ═══════════════════════════════════════════════════════════
// MOCK-DATEN (Fallback)
// ═══════════════════════════════════════════════════════════

const DEFAULT_DRILL: Drill = {
  title: "Closed Eyes Balance with Shoving",
  category: "Athletik & Stabilität",
  author: { name: "Steve Lang", avatar: "SL", role: "Headcoach" },
  meta: "U14 • Erstellt 12.07.2026",
  duration: "10 Min",
  players: "Ab 2 Spielern",
  level: "Alle Level",
  objective: "Verbesserung der statischen Balance und Rumpfstabilität unter unerwartetem Körperkontakt. Simuliert Ausboxen und Fangen unter Druck.",
  videoUrl: "https://pub-22e2e48758474fceb6591b14716de1dc.r2.dev/1784731558148-AQNBYWT0-mx03zyfvTd4kiAJC-JyBXMbpvmDpWzhZJii3zTSK8is2qp4Vjd5FZ3m5RVErD3Qu2EOV6HyKHA2tuKMe1gMNQgq.mp4",
  posterImage: "https://images.unsplash.com/photo-1519861531473-9200260768bf?q=80&w=1200&auto=format&fit=crop",
  execution: [
    "Ein Spieler steht in tiefer, athletischer Grundhaltung und schließt die Augen.",
    "Ein Partner stößt ihn sanft, aber bestimmt aus allen vier Richtungen (vorne, hinten, links, rechts) für 15-20 Sekunden.",
    "Das Ziel: Die Balance halten, ohne die Füße zu bewegen. Die Bodenhaftung bleibt jederzeit bestehen."
  ],
  keyPoints: [
    "Augen zwingend geschlossen halten (nimmt den visuellen Anker)",
    "Körperschwerpunkt tief, Knie leicht gebeugt",
    "Core extrem anspannen, Stöße aus der Körpermitte abfedern"
  ],
  mistake: {
    error: "Spieler öffnet die Augen bei Kontakt oder verliert sofort die Fußposition.",
    fix: "Intensität der Stöße verringern. Erst Vertrauen aufbauen, dann die Härte steigern."
  }
};

// ═══════════════════════════════════════════════════════════
// HAUPTKOMPONENTE
// ═══════════════════════════════════════════════════════════

export default function DrillDetailModal({ isOpen, onClose, drill }: DrillDetailModalProps) {
  // Nutze übergebene Drill-Daten oder Fallback auf Mock-Daten
  const drillData = drill ?? DEFAULT_DRILL;

  const [activeRightTab, setActiveRightTab] = useState<RightTab>('ablauf');
  const [isFavorited, setIsFavorited] = useState(false);

  // Video States & Refs
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!isOpen) return null;

  // ═══════════════════════════════════════════════════════
  // VIDEO-LOGIK – EXAKT WIE IM ORIGINAL, NICHTS VERÄNDERT
  // ═══════════════════════════════════════════════════════

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsPlaying(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">

      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0B1F3A]/80 animate-in fade-in duration-200"
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-6xl h-[85vh] max-h-[90vh] bg-[#F8FAFC] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 border border-white/10">

        {/* --- HEADER --- */}
        <div className="h-14 px-6 bg-white border-b border-slate-200 flex items-center justify-between shrink-0 z-10">
          <div className="flex items-center gap-3">
            <span className="bg-[#EEF3F8] text-[#1E5AA8] px-3 py-1.25 rounded-md text-[10px] font-bold uppercase tracking-widest">
              {drillData.category}
            </span>
          </div>
          <button 
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 hover:text-[#0B1F3A] transition-colors"
            aria-label="Schließen"
          >
            <X size={18} />
          </button>
        </div>

        {/* --- MAIN CONTENT (Split Layout) --- */}
        <div className="flex-1 overflow-hidden flex flex-col lg:flex-row h-full">

          {/* LINKE SPALTE */}
          <div className="w-full lg:w-[55%] h-full flex flex-col bg-white border-r border-slate-200">

            <div className="px-6 pt-5 pb-4 shrink-0">
              <h1 className="text-[22px] font-montserrat font-bold text-[#0B1F3A] leading-tight">
                {drillData.title}
              </h1>
            </div>

            {/* --- INTERAKTIVER VIDEO PLAYER – EXAKT WIE ORIGINAL --- */}
            <div className="relative flex-1 min-h-0 w-auto bg-black mx-6 rounded-2xl overflow-hidden mb-4 shadow-sm border border-slate-100 group">
              <video 
                ref={videoRef}
                src={drillData.videoUrl} 
                poster={drillData.posterImage}
                playsInline
                controls={isPlaying}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                className={`w-full h-full ${isPlaying ? 'object-contain' : 'object-cover'} transition-all`}
                onClick={!isPlaying ? togglePlay : undefined}
              />

              {/* Custom Play-Button: Verschwindet, wenn isPlaying true ist */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors pointer-events-none">
                  <button 
                    onClick={togglePlay}
                    className="w-16 h-16 bg-white/95 rounded-full flex items-center justify-center hover:bg-white hover:scale-105 transition-transform shadow-[0_8px_30px_rgb(0,0,0,0.12)] pointer-events-auto"
                    aria-label="Video abspielen"
                  >
                    <Play size={26} className="text-[#1E5AA8] fill-current ml-1.5" />
                  </button>
                </div>
              )}
            </div>

            {/* ACTION ROW */}
            <div className="px-6 py-3 shrink-0">
              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1E5AA8] flex items-center justify-center text-white font-bold text-[14px] shadow-sm">
                    {drillData.author.avatar}
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-[#0B1F3A] leading-none mb-1">{drillData.author.name}</p>
                    <p className="text-[12px] text-slate-400 leading-none">{drillData.author.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={() => setIsFavorited(!isFavorited)}
                    className={`p-2.5 rounded-xl transition-colors ${
                      isFavorited 
                        ? 'text-red-500 bg-red-50' 
                        : 'text-slate-400 hover:bg-[#EEF3F8] hover:text-[#1E5AA8]'
                    }`}
                    aria-label="Favorit"
                  >
                    <Heart size={18} className={isFavorited ? 'fill-current' : ''} />
                  </button>
                  <button 
                    className="p-2.5 rounded-xl text-slate-400 hover:bg-[#EEF3F8] hover:text-[#1E5AA8] transition-colors"
                    aria-label="Teilen"
                  >
                    <Share2 size={18} />
                  </button>
                  <button 
                    className="p-2.5 rounded-xl text-slate-400 hover:bg-[#EEF3F8] hover:text-[#1E5AA8] transition-colors"
                    aria-label="Merken"
                  >
                    <Bookmark size={18} />
                  </button>

                  <button className="ml-2 flex items-center gap-2 px-5 py-2.5 bg-[#1E5AA8] hover:bg-[#0B1F3A] text-white rounded-xl font-bold text-[13px] transition-colors shadow-md shadow-[#1E5AA8]/20">
                    <PlusCircle size={16} />
                    <span>In den Plan</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Meta-Bar & Objective */}
            <div className="px-6 pb-5 pt-2 shrink-0">
              <div className="flex flex-wrap gap-2.5 mb-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg">
                  <Clock size={14} className="text-[#1E5AA8]" />
                  <span className="text-[12px] font-semibold text-[#0B1F3A]">{drillData.duration}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg">
                  <Users size={14} className="text-[#1E5AA8]" />
                  <span className="text-[12px] font-semibold text-[#0B1F3A]">{drillData.players}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg">
                  <Layers size={14} className="text-[#1E5AA8]" />
                  <span className="text-[12px] font-semibold text-[#0B1F3A]">{drillData.level}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-[#EEF3F8]/50 p-4 rounded-xl border border-[#1E5AA8]/10">
                <Target size={16} className="text-[#1E5AA8] mt-0.5 shrink-0" />
                <p className="text-[13.5px] text-[#0B1F3A] font-medium leading-relaxed line-clamp-2">
                  {drillData.objective}
                </p>
              </div>
            </div>

          </div>

          {/* RECHTE SPALTE */}
          <RightPanel 
            activeTab={activeRightTab} 
            onTabChange={setActiveRightTab} 
            drillData={drillData} 
          />

        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SUB-KOMPONENTE: Rechte Spalte
// ═══════════════════════════════════════════════════════════

function RightPanel({ 
  activeTab, 
  onTabChange, 
  drillData 
}: { 
  activeTab: RightTab; 
  onTabChange: (tab: RightTab) => void; 
  drillData: Drill;
}) {
  return (
    <div className="w-full lg:w-[45%] h-full bg-[#F8FAFC] flex flex-col">
      <div className="p-6 flex-1 flex flex-col h-full overflow-hidden">

        <div className="flex p-1 bg-slate-200/60 rounded-xl mb-6 shrink-0">
          <button 
            onClick={() => onTabChange('ablauf')}
            className={`flex-1 py-2 text-[12px] font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'ablauf' 
                ? 'bg-white text-[#1E5AA8] shadow-sm' 
                : 'text-slate-500 hover:text-[#0B1F3A]'
            }`}
          >
            <ListOrdered size={15} /> Ablauf
          </button>
          <button 
            onClick={() => onTabChange('keypoints')}
            className={`flex-1 py-2 text-[12px] font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'keypoints' 
                ? 'bg-white text-[#1E5AA8] shadow-sm' 
                : 'text-slate-500 hover:text-[#0B1F3A]'
            }`}
          >
            <CheckCircle2 size={15} /> Punkte
          </button>
          <button 
            onClick={() => onTabChange('mistakes')}
            className={`flex-1 py-2 text-[12px] font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'mistakes' 
                ? 'bg-white text-red-600 shadow-sm' 
                : 'text-slate-500 hover:text-red-500'
            }`}
          >
            <AlertTriangle size={15} /> Fehler
          </button>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide pr-2">

          {activeTab === 'ablauf' && (
            <div className="space-y-3 animate-in fade-in slide-in-from-right-2 duration-200">
              {drillData.execution.map((step, idx) => (
                <div key={idx} className="flex gap-3 items-start bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="w-7 h-7 rounded-full bg-[#EEF3F8] text-[#1E5AA8] flex items-center justify-center font-bold text-[13px] shrink-0">
                    {idx + 1}
                  </div>
                  <p className="text-[14px] text-slate-700 leading-relaxed mt-0.5">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'keypoints' && (
            <div className="space-y-3 animate-in fade-in slide-in-from-right-2 duration-200">
              {drillData.keyPoints.map((point, idx) => (
                <div key={idx} className="flex gap-3 items-start bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="bg-emerald-100 p-1 rounded-full shrink-0 mt-0.5">
                    <CheckCircle2 size={14} className="text-emerald-600" />
                  </div>
                  <span className="text-[14px] text-slate-700 font-medium leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'mistakes' && (
            <div className="animate-in fade-in slide-in-from-right-2 duration-200">
              <div className="bg-red-50/80 border border-red-100 rounded-xl p-4 flex gap-3 mb-4">
                <AlertTriangle size={18} className="text-red-500 shrink-0 mt-0.5" />
                <p className="text-[13px] text-red-800 leading-relaxed font-medium">
                  Korrigiere diese typischen Kompensationsbewegungen sofort, um falsche Muster zu vermeiden.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="p-4 border-b border-slate-100 bg-slate-50">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Was passiert:</p>
                  <p className="text-[14px] text-[#0B1F3A] font-medium leading-snug">{drillData.mistake.error}</p>
                </div>
                <div className="p-4 bg-emerald-50/30">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Korrektur:</p>
                  </div>
                  <p className="text-[14px] text-slate-700 leading-relaxed">{drillData.mistake.fix}</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
