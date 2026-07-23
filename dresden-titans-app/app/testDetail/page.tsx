"use client";

import { useState } from 'react';
import {
  X, Play, Share2, Bookmark, PlusCircle,
  Target, ListOrdered, CheckCircle2, Clock,
  Users, AlertTriangle, Layers, Heart, Maximize2
} from 'lucide-react';

interface DrillDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  drill?: any;
}

export default function DrillDetailModal({ isOpen, onClose }: DrillDetailModalProps) {
  const [activeRightTab, setActiveRightTab] = useState<'ablauf' | 'keypoints' | 'mistakes'>('ablauf');
  const [isFavorited, setIsFavorited] = useState(false);

  if (!isOpen) return null;

  // Mock-Daten nahtlos in den Vereins-Kontext eingebettet
  const drillData = {
    title: "Closed Eyes Balance with Shoving",
    category: "Athletik & Stabilität",
    author: { name: "Steve Lang", avatar: "SL", role: "U14 Headcoach" },
    meta: "U14 • Erstellt 12.07.2026",
    duration: "10 Min",
    players: "Ab 2 Spielern",
    level: "Alle Level",
    objective: "Verbesserung der statischen Balance und Rumpfstabilität unter unerwartetem Körperkontakt. Simuliert Ausboxen und Fangen unter Druck.",
    execution: [
      "Ein Spieler steht in tiefer, athletischer Grundhaltung (Base) und schließt die Augen.",
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

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-10">
      
      {/* Backdrop - Cinematic Fade */}
      <div 
        className="absolute inset-0 bg-[#040C18]/90 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Container: Split-Brain UI (Max 90vh) */}
      <div className="relative w-full max-w-[1400px] h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row animate-in zoom-in-95 duration-300">
        
        {/* =========================================
            LINKE SPALTE: "Dark Mode" Theater (Fokus auf Media)
        ========================================= */}
        <div className="w-full lg:w-[55%] h-full bg-[#0B1F3A] flex flex-col text-white relative">
          
          {/* Subtle Glow Effect */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#1E5AA8] opacity-20 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

          {/* Header Left */}
          <div className="px-8 pt-8 pb-6 shrink-0 relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-white/10 border border-white/20 text-[#6DB7FF] px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">
                {drillData.category}
              </span>
            </div>
            <h1 className="text-[28px] font-montserrat font-bold text-white leading-tight">
              {drillData.title}
            </h1>
          </div>

          {/* Video Player (Edge-to-Edge in seiner Box) */}
          <div className="relative flex-1 min-h-0 w-full bg-black shrink-0 shadow-2xl group border-y border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1519861531473-9200260768bf?q=80&w=1200&auto=format&fit=crop" 
              alt="Drill Video" 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
            />
            
            {/* Play Button - Apple TV Style */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button 
                className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-[#1E5AA8] hover:scale-105 transition-all shadow-[0_0_40px_rgba(30,90,168,0.3)] border border-white/30"
                aria-label="Video abspielen"
              >
                <Play size={32} className="text-white fill-current ml-2" />
              </button>
            </div>

            <button className="absolute bottom-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100">
              <Maximize2 size={18} />
            </button>
          </div>

          {/* Bottom Action Bar (Fitts's Law: Massive & Accessible) */}
          <div className="p-8 shrink-0 relative z-10 flex flex-col sm:flex-row items-center gap-4">
            
            {/* Author / Trust Element */}
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 rounded-full bg-[#1E5AA8] flex items-center justify-center text-white font-bold text-[15px] shadow-sm border-2 border-[#1E5AA8]/50">
                {drillData.author.avatar}
              </div>
              <div>
                <p className="text-[15px] font-bold text-white leading-none mb-1.5">{drillData.author.name}</p>
                <p className="text-[12px] text-[#6DB7FF] leading-none font-medium">{drillData.author.role}</p>
              </div>
            </div>

            {/* Primary Actions */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button 
                onClick={() => setIsFavorited(!isFavorited)}
                className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-colors ${
                  isFavorited 
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                <Heart size={20} className={isFavorited ? 'fill-current' : ''} />
              </button>
              
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3.5 bg-[#1E5AA8] hover:bg-[#6DB7FF] text-white rounded-2xl font-bold text-[14px] transition-all shadow-lg active:scale-95">
                <PlusCircle size={18} /> In den Plan
              </button>
            </div>
          </div>
        </div>

        {/* =========================================
            RECHTE SPALTE: "Light Mode" Clipboard (Lernen & Lesen)
        ========================================= */}
        <div className="w-full lg:w-[45%] h-full bg-[#F8FAFC] flex flex-col relative">
          
          {/* Top Bar mit Schließen-Button */}
          <div className="flex justify-end p-4 shrink-0 absolute top-0 right-0 z-20">
            <button 
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-slate-200 hover:bg-slate-50 text-slate-500 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-8 lg:p-10 flex-1 flex flex-col h-full overflow-hidden pt-16">
            
            {/* Quick Facts (Material Design inspired) */}
            <div className="flex flex-wrap gap-3 mb-8 shrink-0">
              <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm">
                <Clock size={16} className="text-[#1E5AA8]" />
                <span className="text-[13px] font-bold text-[#0B1F3A]">{drillData.duration}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm">
                <Users size={16} className="text-[#1E5AA8]" />
                <span className="text-[13px] font-bold text-[#0B1F3A]">{drillData.players}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm">
                <Layers size={16} className="text-[#1E5AA8]" />
                <span className="text-[13px] font-bold text-[#0B1F3A]">{drillData.level}</span>
              </div>
            </div>

            {/* Objective Box */}
            <div className="mb-8 shrink-0">
              <h3 className="flex items-center gap-2 text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                <Target size={16} className="text-[#1E5AA8]" /> Worum geht es?
              </h3>
              <p className="text-[15px] text-slate-700 leading-relaxed font-medium bg-[#EEF3F8]/50 p-5 rounded-2xl border border-[#1E5AA8]/10">
                {drillData.objective}
              </p>
            </div>

            {/* Segmented Control Tabs (iOS Style) */}
            <div className="flex p-1.5 bg-slate-200/60 rounded-2xl mb-8 shrink-0">
              <button 
                onClick={() => setActiveRightTab('ablauf')}
                className={`flex-1 py-2.5 text-[13px] font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                  activeRightTab === 'ablauf' ? 'bg-white text-[#0B1F3A] shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <ListOrdered size={16} className={activeRightTab === 'ablauf' ? 'text-[#1E5AA8]' : ''} /> Ablauf
              </button>
              <button 
                onClick={() => setActiveRightTab('keypoints')}
                className={`flex-1 py-2.5 text-[13px] font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                  activeRightTab === 'keypoints' ? 'bg-white text-[#0B1F3A] shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <CheckCircle2 size={16} className={activeRightTab === 'keypoints' ? 'text-emerald-500' : ''} /> Punkte
              </button>
              <button 
                onClick={() => setActiveRightTab('mistakes')}
                className={`flex-1 py-2.5 text-[13px] font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                  activeRightTab === 'mistakes' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <AlertTriangle size={16} className={activeRightTab === 'mistakes' ? 'text-red-500' : ''} /> Fehler
              </button>
            </div>

            {/* Dynamic Content Area (Scrollable) */}
            <div className="flex-1 overflow-y-auto scrollbar-hide pr-2">
              
              {activeRightTab === 'ablauf' && (
                <div className="animate-in fade-in slide-in-from-right-2 duration-300 pl-2">
                  {/* Visuelle Timeline statt Textblock */}
                  <div className="relative border-l-2 border-[#EEF3F8] ml-3 space-y-8 pb-4">
                    {drillData.execution.map((step, idx) => (
                      <div key={idx} className="relative pl-8">
                        {/* Timeline Node */}
                        <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-white border-2 border-[#1E5AA8] flex items-center justify-center text-[#1E5AA8] font-bold text-[13px] shadow-sm">
                          {idx + 1}
                        </div>
                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-[#1E5AA8]/30 transition-colors">
                          <p className="text-[14.5px] text-slate-700 leading-relaxed">
                            {step}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeRightTab === 'keypoints' && (
                <div className="animate-in fade-in slide-in-from-right-2 duration-300 space-y-4">
                  {drillData.keyPoints.map((point, idx) => (
                    <div key={idx} className="flex gap-4 items-start bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-200 transition-colors group">
                      <div className="bg-emerald-50 p-2 rounded-xl shrink-0 group-hover:bg-emerald-100 transition-colors">
                        <CheckCircle2 size={18} className="text-emerald-600" />
                      </div>
                      <span className="text-[14.5px] text-slate-700 font-medium leading-relaxed mt-1">{point}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeRightTab === 'mistakes' && (
                <div className="animate-in fade-in slide-in-from-right-2 duration-300">
                  <div className="bg-red-50 border border-red-100 rounded-2xl p-5 flex gap-4 mb-6">
                    <div className="bg-red-100 p-2 rounded-xl shrink-0 h-fit">
                      <AlertTriangle size={20} className="text-red-600" />
                    </div>
                    <p className="text-[14px] text-red-800 leading-relaxed font-medium">
                      Achte auf diese typischen Kompensationsbewegungen. Korrigiere sie sofort, um falsche Bewegungsmuster zu vermeiden.
                    </p>
                  </div>

                  {/* Cause & Effect Card Design */}
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                    <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400" /> Fehler (Was passiert)
                      </p>
                      <p className="text-[15px] text-[#0B1F3A] font-semibold leading-snug">{drillData.mistake.error}</p>
                    </div>
                    <div className="p-5 bg-emerald-50/30">
                      <p className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Korrektur (Wie du reagierst)
                      </p>
                      <p className="text-[14.5px] text-slate-700 leading-relaxed font-medium">{drillData.mistake.fix}</p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}