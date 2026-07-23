"use client";

import { useState } from 'react';
import { 
  Search, Zap, Bookmark, Play, Filter, ChevronDown, Target, Clock, Layers,
  X, CheckCircle2, TrendingUp, TrendingDown, RefreshCw, Share2, FileText, BarChart
} from 'lucide-react';

// --- MOCK DATA ---
const DRILLS = [
  {
    id: 1,
    title: "Big Man Rotational Ballhandling With Constraints",
    description: "Drill teaching big men to develop controlled ballhandling in confined spaces using rotational resistance. The focus is on absorbing contact while maintaining a live dribble.",
    longDescription: "A high-intensity ballhandling drill that emphasizes maintaining control under physical pressure. By varying the defensive stance and rotational path on the way up, the offensive player learns to circle the ball in an exaggerated arc before settling into a stable, consistent release at the top.",
    category: "Ballhandling",
    level: "U14+",
    duration: "2:30",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop",
    keyPoints: [
      "Maintain identical mechanics regardless of path variation",
      "Circle the ball in a smooth arc to build flexibility",
      "Stabilize the shot at the peak under pressure",
      "Develops adaptability to varied shooting angles"
    ]
  },
  {
    id: 2,
    title: "Circle Path Shots",
    description: "A shooting drill that emphasizes shot-release stability by varying the ball path.",
    longDescription: "A shooting drill that emphasizes shot-release stability by varying the ball path on the way up. The shooter circles the ball in an exaggerated arc.",
    category: "Shooting",
    level: "All Levels",
    duration: "0:56",
    image: "https://images.unsplash.com/photo-1519861531473-9200260768bf?q=80&w=800&auto=format&fit=crop",
    keyPoints: [
      "Keep eyes on the rim throughout",
      "Ensure the guide hand remains still"
    ]
  },
  // Weitere Drills...
];

export default function DrillsAndGames() {
  const [activeTab, setActiveTab] = useState<'library' | 'bookmarks'>('library');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedDrill, setSelectedDrill] = useState<typeof DRILLS[0] | null>(null);

  if (typeof window !== 'undefined') {
    document.body.style.overflow = selectedDrill ? 'hidden' : 'auto';
  }

  return (
    <>
      <div className="max-w-[1200px] mx-auto pb-12 animate-in fade-in duration-500">
        
        {/* --- HEADER --- */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-xl bg-[#1E5AA8]/10 flex items-center justify-center text-[#1E5AA8] shadow-sm">
                <Target size={20} strokeWidth={2.5} />
              </div>
              <h1 className="font-montserrat font-bold text-3xl text-[#0B1F3A] uppercase tracking-tight">
                Player Development
              </h1>
            </div>
            <p className="text-slate-500 text-[14px] ml-14">
              Individual drills, constraint-based games, and skill-building progressions.
            </p>
          </div>
        </div>

        {/* --- COMMAND CENTER --- */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 mb-10 overflow-hidden">
          <div className="flex px-4 pt-3 bg-slate-50/80 border-b border-slate-100">
            {['Library', 'Bookmarks'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase() as any)}
                className={`px-6 py-3 text-sm font-semibold border-b-2 transition-all ${
                  activeTab === tab.toLowerCase() ? 'border-[#1E5AA8] text-[#0B1F3A]' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100/50 rounded-t-lg'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            <div className="relative group mb-6">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1E5AA8]" />
              <input type="text" placeholder="Search drills, concepts, or play types..." className="w-full pl-12 pr-4 py-3.5 bg-[#EEF3F8]/50 hover:bg-[#EEF3F8]/80 border border-slate-200/80 rounded-xl text-[14px] focus:bg-white focus:border-[#6DB7FF] focus:ring-4 focus:ring-[#6DB7FF]/10 transition-all placeholder:text-slate-400 font-medium"/>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm font-medium text-slate-600">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mr-1">Try:</span>
                {['Press Break', 'Finishing', 'Decision-Making'].map(tag => (
                  <button key={tag} className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-lg text-[13px] active:scale-95 transition-all">{tag}</button>
                ))}
              </div>
              <div className="hidden md:block h-6 w-px bg-slate-200 mx-2" />
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mr-1shrink-0">Category:</span>
                {['All', 'Shooting', 'Ballhandling', 'Tactical'].map(cat => (
                  <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-1.5 rounded-lg active:scale-95 transition-all ${activeCategory === cat ? 'bg-[#1E5AA8] text-white' : 'bg-white border border-slate-200 hover:bg-slate-50'}`}>{cat}</button>
                ))}
              </div>
              <button className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-500 hover:bg-slate-50 border border-transparent hover:border-slate-200 active:scale-95 transition-all">
                <Filter size={16} /> More <ChevronDown size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* --- GRID --- */}
        <div className="flex items-center gap-2 mb-6">
          <Zap size={18} className="text-[#6DB7FF] fill-[#6DB7FF]" />
          <h2 className="font-montserrat font-bold text-[17px] text-[#0B1F3A] uppercase tracking-wide">New This Week</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {DRILLS.map((drill) => (
            <div key={drill.id} onClick={() => setSelectedDrill(drill)} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-[#6DB7FF]/50 transition-all duration-300 cursor-pointer">
              <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                <img src={drill.image} alt={drill.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"/>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#0B1F3A]/10">
                  <div className="w-12 h-12 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center text-[#1E5AA8] shadow-xl transform scale-90 group-hover:scale-100 transition-all duration-300">
                    <Play size={20} className="fill-[#1E5AA8] ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 bg-[#0B1F3A]/80 backdrop-blur-md text-white text-[11px] font-bold px-2 py-1 rounded-md flex items-center gap-1.5 shadow-sm">
                  <Clock size={12} /> {drill.duration}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#EEF3F8] text-[#1E5AA8] uppercase tracking-wider">{drill.category}</span>
                  <span className="text-[11px] font-semibold text-slate-400">{drill.level}</span>
                </div>
                <h3 className="font-bold text-[15px] text-[#0B1F3A] leading-snug mb-2 line-clamp-2 group-hover:text-[#1E5AA8] transition-colors">{drill.title}</h3>
                <p className="text-[13px] text-slate-500 leading-relaxed line-clamp-2 mt-auto">{drill.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- BENTO DETAIL MODAL (UX Upgrade) --- */}
      {selectedDrill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12">
          <div className="absolute inset-0 bg-[#0B1F3A]/80 backdrop-blur-sm animate-in fade-in" onClick={() => setSelectedDrill(null)}/>
          
          <div className="relative w-full max-w-7xl max-h-full bg-slate-50 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95">
            <button onClick={() => setSelectedDrill(null)} className="absolute top-5 right-5 z-20 w-10 h-10 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors">
              <X size={20} />
            </button>

            <div className="overflow-y-auto p-6 md:p-8 space-y-6 scrollbar-hide">
              {/* Top Bento Row: Video & Title */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* 1. Video Card (wird kleiner) */}
                <div className="lg:col-span-2 relative aspect-[16/10] bg-black rounded-2xl overflow-hidden shadow-md">
                  <img src={selectedDrill.image} alt={selectedDrill.title} className="w-full h-full object-cover opacity-80"/>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-16 h-16 bg-white/20 hover:bg-[#1E5AA8]/90 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all transform hover:scale-105 border border-white/20 hover:border-transparent">
                      <Play size={28} className="fill-white ml-1.5" />
                    </button>
                  </div>
                </div>

                {/* 2. Header Bento Card */}
                <div className="bg-white p-7 rounded-2xl border border-slate-200/70 shadow-sm flex flex-col">
                  <div className="flex items-center gap-3 mb-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    Metadata
                  </div>
                  <h2 className="text-2xl font-montserrat font-bold text-[#0B1F3A] leading-tight mb-5 flex-1">
                    {selectedDrill.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-slate-100">
                    <span className="text-[10px] font-bold px-2 py-1 rounded bg-[#EEF3F8] text-[#1E5AA8] uppercase tracking-wider">{selectedDrill.category}</span>
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded">{selectedDrill.level}</span>
                    <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1.5 ml-auto"><Clock size={14} />{selectedDrill.duration}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Bento Row: Key Points, Actions, Remix */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* 3. Description & Key Points */}
                <div className="lg:col-span-8 bg-white p-8 rounded-2xl border border-slate-200/70 shadow-sm space-y-7">
                  <div>
                    <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Context</h3>
                    <p className="text-[14.5px] text-slate-600 leading-relaxed">{selectedDrill.longDescription}</p>
                  </div>
                  <div className="pt-6 border-t border-slate-100">
                    <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-5">Key Points</h3>
                    <ul className="space-y-4">
                      {selectedDrill.keyPoints.map((point, idx) => (
                        <li key={idx} className="flex gap-3 text-[14px] text-slate-700">
                          <CheckCircle2 size={19} className="text-emerald-500 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 4. Action Card & Remix */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Actions */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-sm grid grid-cols-3 gap-3 text-slate-600 font-medium text-[13px]">
                    {[
                      {icon: FileText, label: 'Add to Plan'},
                      {icon: Share2, label: 'Share'},
                      {icon: BarChart, label: 'Stats'}
                    ].map(action => (
                      <button key={action.label} className="flex flex-col items-center gap-2 p-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors">
                        <action.icon size={20} />{action.label}
                      </button>
                    ))}
                  </div>

                  {/* Remix Bento Section */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm">
                    <div className="flex items-center gap-2 mb-5">
                      <Zap size={16} className="text-[#6DB7FF] fill-[#6DB7FF]" />
                      <h3 className="text-[12px] font-bold text-[#0B1F3A] uppercase tracking-widest">Remix This Drill</h3>
                    </div>

                    <div className="space-y-3 text-[13px]">
                      {[
                        {icon: TrendingUp, title: 'Make it Harder', text: 'limit to 1 dribble, add a guided defender.', color: 'red'},
                        {icon: TrendingDown, title: 'Make it Easier', text: 'remove the time limit, or go 2v0.', color: 'emerald'},
                        {icon: RefreshCw, title: 'Change the Focus', text: 'turn finishing drill into passing drill.', color: 'blue'}
                      ].map(option => (
                        <div key={option.title} className={`p-4 rounded-xl border transition-colors bg-${option.color}-50/50 border-${option.color}-100 hover:bg-${option.color}-50`}>
                          <div className={`flex items-center gap-2 text-${option.color}-600 font-bold mb-1.5`}>
                            <option.icon size={16} /> {option.title}
                          </div>
                          <p className="text-slate-600 leading-relaxed">{option.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}