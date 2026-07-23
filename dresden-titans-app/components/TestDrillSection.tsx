"use client";

import { useState } from 'react';
import { 
  X, Play, Clock, CalendarDays, Bookmark, Share2, 
  CheckCircle2, TrendingUp, TrendingDown, RefreshCw, 
  Sparkles, Send, Maximize, Volume2, Settings
} from 'lucide-react';

interface DrillDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  drill?: any; // Später durch deinen echten Typen ersetzen
}

export default function DrillDetailModal({ isOpen, onClose }: DrillDetailModalProps) {
  const [aiQuery, setAiQuery] = useState('');

  if (!isOpen) return null;

  // Mock Data basierend auf den Screenshots
  const mockDrill = {
    title: "1-on-1 Around the Arc, Varied Start Positions",
    subtitle: "Fake DHO 1v1 with Coach (for bigs)",
    description: "Big executes a fake dribble handoff to attack downhill when the defender overplays or switches early. Coach adds constraints (one-foot/two-foot finishes, floaters, range) to build diverse finishing options off the read.",
    duration: "1:56",
    added: "Apr 8, 2026",
    tags: ["1v1", "Advantage", "Player Development", "Finishing"],
    keyPoints: [
      "Fake DHO exploits defender overplay or early switches to create downhill attacking angle",
      "Big must generate speed and momentum toward the rim on the drive",
      "Layer finishing constraints (one-foot, two-foot) to build decision-making",
      "Repetition without repetition: same read, different finishes"
    ],
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop"
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-10">
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0B1F3A]/80 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Container - Max Width extrem groß für das Side-by-Side Layout */}
      <div className="relative w-full max-w-[1400px] h-[90vh] bg-[#F8FAFC] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 border border-white/20">
        
        {/* Header Bar */}
        <div className="h-16 px-6 border-b border-slate-200 bg-white flex items-center justify-between shrink-0 z-10">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
            <span className="hover:text-[#1E5AA8] cursor-pointer">Video Library</span>
            <span>/</span>
            <span className="hover:text-[#1E5AA8] cursor-pointer">Finishing</span>
            <span>/</span>
            <span className="text-[#0B1F3A] truncate max-w-md">{mockDrill.title}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
              <Share2 size={18} />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
              <Bookmark size={18} />
            </button>
            <div className="w-px h-6 bg-slate-200 mx-1" />
            <button 
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Main Content Area - Grid Layout */}
        <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
          
          {/* --- LEFT COLUMN: Video & Content (Scrollable) --- */}
          <div className="flex-1 overflow-y-auto scrollbar-hide bg-[#F8FAFC]">
            <div className="p-6 lg:p-8 space-y-8 max-w-5xl mx-auto">
              
              {/* 1. Video Player (Immersive) */}
              <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-lg group">
                <img 
                  src={mockDrill.image} 
                  alt="Drill Cover" 
                  className="w-full h-full object-cover opacity-80"
                />
                
                {/* Custom Video Controls UI */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-20 h-20 bg-[#1E5AA8]/90 hover:bg-[#6DB7FF] backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(30,90,168,0.5)]">
                    <Play size={32} className="fill-white ml-2" />
                  </button>
                </div>

                <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-full flex items-center gap-4 text-white">
                    <Play size={20} className="fill-white cursor-pointer hover:text-[#6DB7FF]" />
                    <div className="flex-1 h-1.5 bg-white/30 rounded-full cursor-pointer relative">
                      <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-[#6DB7FF] rounded-full" />
                    </div>
                    <span className="text-xs font-medium font-mono">0:45 / {mockDrill.duration}</span>
                    <Volume2 size={18} className="cursor-pointer hover:text-[#6DB7FF]" />
                    <Settings size={18} className="cursor-pointer hover:text-[#6DB7FF]" />
                    <Maximize size={18} className="cursor-pointer hover:text-[#6DB7FF]" />
                  </div>
                </div>
              </div>

              {/* 2. Text Content */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-montserrat font-bold text-[#0B1F3A] leading-tight mb-2">
                    {mockDrill.title}
                  </h1>
                  <h2 className="text-xl font-semibold text-slate-500 mb-6">
                    {mockDrill.subtitle}
                  </h2>
                  <div className="prose prose-slate max-w-none">
                    <p className="text-[15px] text-slate-700 leading-relaxed">
                      {mockDrill.description}
                    </p>
                  </div>
                </div>

                {/* Key Points (BAM Style) */}
                <div className="pt-8 border-t border-slate-200">
                  <h3 className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-6">
                    Key Points
                  </h3>
                  <ul className="space-y-5">
                    {mockDrill.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex gap-4 items-start bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="bg-emerald-100 p-1 rounded-full shrink-0 mt-0.5">
                          <CheckCircle2 size={18} className="text-emerald-600" />
                        </div>
                        <span className="text-[15px] text-[#0B1F3A] leading-relaxed font-medium">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>

          {/* --- RIGHT COLUMN: Smart Sidebar (Sticky) --- */}
          <div className="w-full lg:w-[400px] xl:w-[450px] bg-white border-l border-slate-200 flex flex-col shrink-0">
            <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
              
              {/* Metadata */}
              <div>
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Details</h3>
                <div className="space-y-3 text-[14px]">
                  <div className="flex justify-between items-center text-slate-600">
                    <span className="flex items-center gap-2"><Clock size={16} /> Duration</span>
                    <span className="font-semibold text-[#0B1F3A]">{mockDrill.duration}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span className="flex items-center gap-2"><CalendarDays size={16} /> Added</span>
                    <span className="font-semibold text-[#0B1F3A]">{mockDrill.added}</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {mockDrill.tags.map(tag => (
                    <span key={tag} className="px-3 py-1.5 bg-[#EEF3F8] text-[#1E5AA8] rounded-lg text-[12px] font-bold border border-[#1E5AA8]/10 hover:bg-[#1E5AA8] hover:text-white transition-colors cursor-pointer">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Remix Drill (BAM Style, aber kompakt für die Sidebar) */}
              <div>
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Remix This Drill</h3>
                <div className="space-y-3">
                  <div className="p-3 rounded-xl border border-red-100 bg-red-50/50 flex gap-3 items-start">
                    <TrendingUp size={16} className="text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[13px] font-bold text-red-700 mb-0.5">Make it Harder</p>
                      <p className="text-[12px] text-slate-600 leading-snug">Limit to 1 dribble, add a help defender, or cut time in half.</p>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl border border-emerald-100 bg-emerald-50/50 flex gap-3 items-start">
                    <TrendingDown size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[13px] font-bold text-emerald-700 mb-0.5">Make it Easier</p>
                      <p className="text-[12px] text-slate-600 leading-snug">Start from a stationary catch, remove the time limit.</p>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl border border-blue-100 bg-blue-50/50 flex gap-3 items-start">
                    <RefreshCw size={16} className="text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[13px] font-bold text-blue-700 mb-0.5">Change Focus</p>
                      <p className="text-[12px] text-slate-600 leading-snug">Turn finishing drill into a passing drill on the read.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* --- AI ASSISTANT (Pinned to bottom of sidebar) --- */}
            <div className="p-6 bg-gradient-to-b from-[#0B1F3A] to-[#162C4D] text-white shrink-0 shadow-[0_-10px_30px_rgba(11,31,58,0.1)] relative overflow-hidden">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#6DB7FF] opacity-10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles size={18} className="text-[#6DB7FF]" />
                  <h3 className="font-montserrat font-bold text-[14px] tracking-wide">Titan AI</h3>
                </div>
                
                <p className="text-[12px] text-slate-300 mb-4 leading-relaxed">
                  Ask questions about this drill, generate a specific practice plan block, or get tactical insights.
                </p>

                <div className="space-y-2 mb-4">
                  <button className="w-full text-left p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[12px] text-slate-200 transition-colors">
                    What are the core constraints used here?
                  </button>
                  <button className="w-full text-left p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[12px] text-slate-200 transition-colors">
                    Summarize this video in 3 bullet points.
                  </button>
                </div>

                <div className="relative">
                  <input 
                    type="text" 
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    placeholder="Ask about this video..." 
                    className="w-full pl-4 pr-10 py-3 bg-black/20 border border-white/10 focus:border-[#6DB7FF] rounded-xl text-[13px] text-white placeholder:text-slate-400 outline-none transition-all"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg bg-[#6DB7FF]/20 text-[#6DB7FF] hover:bg-[#6DB7FF] hover:text-[#0B1F3A] transition-colors">
                    <Send size={14} />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}