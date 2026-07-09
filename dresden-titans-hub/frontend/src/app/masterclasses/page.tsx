"use client";

import { useState } from 'react';
import { 
  Search, Play, Bookmark, Filter, ChevronDown, 
  GraduationCap, Clock, Mic, CheckCircle2, Presentation
} from 'lucide-react';

// --- MOCK DATA: Perfekt zugeschnitten auf den Vereinsalltag ---
const CONTINUE_WATCHING = [
  {
    id: 101,
    title: "Titans Spielkonzeption U13/U14",
    speaker: "Mattis",
    role: "Sportliche Leitung",
    progress: 65, // in Prozent
    duration: "1h 15m",
    timeLeft: "26m left",
    category: "Vereinskonzept",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop"
  }
];

const CLINICS = [
  {
    id: 2,
    title: "CLA: Constraints-Led Approach in der Defense",
    description: "Praktische Beispiele, wie wir unsere Verteidigungs-Prinzipien durch gezielte Regelanpassungen im SSG lehren.",
    speaker: "Steve Lang",
    category: "Taktik & Coaching",
    duration: "1h 05m",
    image: "https://images.unsplash.com/photo-1519861531473-9200260768bf?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "DBB Coach Clinic: Modernes Pick & Roll Spacing",
    description: "Aufzeichnung der DBB Fortbildung zum Thema Spacing-Konzepte gegen Hedge und Drop Coverages.",
    speaker: "Gast-Referent",
    category: "Taktik Extern",
    duration: "1h 30m",
    image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Athletik-Basics für den U14-Bereich",
    description: "Verletzungsprävention und Load-Management bei Doppelspieltagen und Turnieren wie dem Noah Berge Cup.",
    speaker: "Rene",
    category: "Athletik",
    duration: "55m",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
  }
];

export default function ClinicsPage() {
  const [activeTab, setActiveTab] = useState<'library' | 'bookmarks'>('library');
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="max-w-[1200px] mx-auto pb-16 animate-in fade-in duration-500">
      
      {/* --- HEADER --- */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-[#1E5AA8]/10 flex items-center justify-center text-[#1E5AA8] shadow-sm">
            <GraduationCap size={24} strokeWidth={2.5} />
          </div>
          <h1 className="font-montserrat font-bold text-3xl text-[#0B1F3A] uppercase tracking-tight">
            Trainer Fortbildungen
          </h1>
        </div>
        <p className="text-slate-500 text-[15px] ml-16 max-w-2xl leading-relaxed">
          Interne Clinics, Gast-Vorträge und methodische Deep-Dives. Baue dein Wissen in deinem eigenen Tempo aus.
        </p>
      </div>

      {/* --- COMMAND CENTER (Einheitliches UI mit Drills & Games) --- */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 mb-12 overflow-hidden">
        <div className="flex px-4 pt-3 bg-slate-50/80 border-b border-slate-100">
          <button 
            onClick={() => setActiveTab('library')}
            className={`px-6 py-3 text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'library' ? 'border-[#1E5AA8] text-[#0B1F3A]' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100/50 rounded-t-lg'
            }`}
          >
            Library
          </button>
          <button 
            onClick={() => setActiveTab('bookmarks')}
            className={`px-6 py-3 text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'bookmarks' ? 'border-[#1E5AA8] text-[#0B1F3A]' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100/50 rounded-t-lg'
            }`}
          >
            Bookmarks
          </button>
        </div>

        <div className="p-6">
          <div className="relative group mb-6">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1E5AA8]" />
            <input type="text" placeholder="Search clinics, speakers, or topics..." className="w-full pl-12 pr-4 py-3.5 bg-[#EEF3F8]/50 hover:bg-[#EEF3F8]/80 border border-slate-200/80 rounded-xl text-[14px] focus:bg-white focus:border-[#6DB7FF] focus:ring-4 focus:ring-[#6DB7FF]/10 transition-all placeholder:text-slate-400 font-medium"/>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm font-medium text-slate-600">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 md:pb-0">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mr-1 shrink-0">Topic:</span>
              {['All', 'Vereinskonzept', 'Methodik & Werte', 'Taktik', 'Athletik'].map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)} 
                  className={`shrink-0 px-4 py-1.5 rounded-lg active:scale-95 transition-all ${
                    activeCategory === cat ? 'bg-[#1E5AA8] text-white' : 'bg-white border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <button className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-500 hover:bg-slate-50 border border-transparent hover:border-slate-200 active:scale-95 transition-all">
              <Filter size={16} /> More <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* --- CONTINUE WATCHING (Neues UX Feature für lange Videos) --- */}
      {CONTINUE_WATCHING.length > 0 && (
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-5">
            <Clock size={18} className="text-[#1E5AA8]" />
            <h2 className="font-montserrat font-bold text-[17px] text-[#0B1F3A] uppercase tracking-wide">
              Continue Watching
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CONTINUE_WATCHING.map(video => (
              <div key={video.id} className="group bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#1E5AA8]/40 transition-all cursor-pointer flex gap-4">
                
                <div className="relative w-32 h-24 rounded-xl overflow-hidden shrink-0 bg-black">
                  <img src={video.image} alt={video.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 group-hover:bg-[#1E5AA8] transition-all">
                      <Play size={14} className="fill-white ml-0.5" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col flex-1 justify-center">
                  <h3 className="font-bold text-[14px] text-[#0B1F3A] leading-snug mb-1 line-clamp-2 group-hover:text-[#1E5AA8] transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-[12px] text-slate-500 mb-3 flex items-center gap-1.5">
                    <Mic size={12} /> {video.speaker}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="w-full">
                    <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
                      <span>{video.progress}%</span>
                      <span>{video.timeLeft}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#1E5AA8] rounded-full" style={{ width: `${video.progress}%` }}></div>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- ALL CLINICS GRID --- */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Presentation size={18} className="text-[#6DB7FF]" />
          <h2 className="font-montserrat font-bold text-[17px] text-[#0B1F3A] uppercase tracking-wide">
            Alle Fortbildungen
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {CLINICS.map((clinic) => (
          <div key={clinic.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-[0_12px_24px_rgba(11,31,58,0.08)] hover:border-[#6DB7FF]/40 transition-all duration-300 cursor-pointer">
            
            {/* Clean Thumbnail */}
            <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
              <img src={clinic.image} alt={clinic.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"/>
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#0B1F3A]/10">
                <div className="w-14 h-14 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center text-[#1E5AA8] shadow-xl transform scale-90 group-hover:scale-100 transition-all duration-300">
                  <Play size={24} className="fill-[#1E5AA8] ml-1" />
                </div>
              </div>

              <button className="absolute top-3 right-3 w-8 h-8 bg-[#0B1F3A]/60 backdrop-blur-md rounded-lg flex items-center justify-center text-white/90 hover:text-white hover:bg-[#1E5AA8] transition-all opacity-0 group-hover:opacity-100 shadow-sm">
                <Bookmark size={16} />
              </button>

              <div className="absolute bottom-3 right-3 bg-[#0B1F3A]/80 backdrop-blur-md text-white text-[11px] font-bold px-2 py-1 rounded-md flex items-center gap-1.5 shadow-sm">
                <Clock size={12} /> {clinic.duration}
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#EEF3F8] text-[#1E5AA8] uppercase tracking-wider">
                  {clinic.category}
                </span>
              </div>
              
              <h3 className="font-bold text-[15px] text-[#0B1F3A] leading-snug mb-2 line-clamp-2 group-hover:text-[#1E5AA8] transition-colors">
                {clinic.title}
              </h3>
              
              <p className="text-[13px] text-slate-500 leading-relaxed line-clamp-2 mb-4 flex-1">
                {clinic.description}
              </p>

              {/* Referenten Info */}
              <div className="flex items-center gap-2.5 pt-4 border-t border-slate-100 mt-auto">
                <div className="w-7 h-7 rounded-full bg-[#1C2430] flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                  {clinic.speaker.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Referent</span>
                  <span className="text-[12px] font-semibold text-[#0B1F3A] leading-none">{clinic.speaker}</span>
                </div>
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}