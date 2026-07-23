"use client";

import { useState, useRef, useEffect } from 'react';
import { 
  Search, Play, Bookmark, Filter, ChevronDown, 
  ListVideo, LayoutGrid, Clock, Check
} from 'lucide-react';

// --- MOCK DATA ---
const DRILL_LIBRARY = [
  {
    id: 1,
    title: "Big Man Rotational Ballhandling",
    description: "Drill teaching big men to develop controlled ballhandling in confined spaces under pressure.",
    category: "Ballhandling",
    level: "Intermediate",
    duration: "2:00",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Finishing - Advantage Starts",
    description: "Offensive player starts with a clear dynamic advantage to practice game-speed finishing.",
    category: "Finishing",
    level: "Advanced",
    duration: "1:45",
    image: "https://images.unsplash.com/photo-1519861531473-9200260768bf?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Circle Path Shots",
    description: "A shooting drill that emphasizes shot-release stability by varying the ball path.",
    category: "Shooting",
    level: "Beginner",
    duration: "0:56",
    image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Finishing - Neutral Starts",
    description: "1v1 scenarios starting from a complete standstill to build isolation scoring.",
    category: "Finishing",
    level: "Intermediate",
    duration: "2:15",
    image: "https://images.unsplash.com/photo-1575361204412-336d600b3962?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Downhill DHO Finishing 1v1",
    description: "1v1 finishing drill where a big man starts with a defender on his back.",
    category: "Finishing",
    level: "Advanced",
    duration: "0:34",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Audio Cue Sprint Stop Pull Ups",
    description: "Players sprint from the top of the key toward the baseline, stopping on command.",
    category: "Shooting",
    level: "Beginner",
    duration: "0:38",
    image: "https://images.unsplash.com/photo-1526628574100-349fce8f465a?q=80&w=800&auto=format&fit=crop"
  }
];

const CATEGORIES = ['All', 'Shooting', 'Finishing', 'Ballhandling', 'Tactical & Passing'];
const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function DrillsLibraryPage() {
  // --- UNIFIED FILTER STATE ---
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeLevel, setActiveLevel] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // --- VIEW TOGGLE STATE (macOS Style) ---
  const [viewMode, setViewMode] = useState<'list' | 'gallery'>('list');

  // Dropdown Ref & State
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- FILTERING LOGIC ---
  const filteredDrills = DRILL_LIBRARY.filter(drill => {
    const matchesCategory = activeCategory === 'All' || drill.category === activeCategory;
    const matchesLevel = activeLevel === 'All' || drill.level === activeLevel;
    const matchesSearch = drill.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          drill.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesLevel && matchesSearch;
  });

  return (
    <div className="max-w-[1400px] mx-auto pb-16">
      
      {/* --- HEADER --- */}
      <div className="mb-8 mt-2">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-[#1E5AA8]/10 flex items-center justify-center text-[#1E5AA8] shadow-sm">
            <Clock size={24} strokeWidth={2.5} />
          </div>
          <h1 className="font-montserrat font-bold text-3xl text-[#0B1F3A] uppercase tracking-tight">
            Drills & Games Vault
          </h1>
        </div>
        <p className="text-slate-500 text-[15px] ml-16 max-w-2xl leading-relaxed">
          Strukturierte Übungen, Small-Sided Games und Trainingsprinzipien für deine Einheiten.
        </p>
      </div>

      {/* =========================================================================
          COMMAND CENTER (Search, Segmented Control, Filters)
          ========================================================================= */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 mb-8 overflow-visible sticky top-16 z-30">
        <div className="p-5 flex flex-col gap-4">
          
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            {/* Search Input */}
            <div className="relative flex-1 group">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1E5AA8] transition-colors" />
              <input 
                type="text" 
                placeholder="Drills nach Begriffen oder Zielen durchsuchen..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-2xl text-[14px] focus:bg-white focus:border-[#6DB7FF] focus:ring-4 focus:ring-[#6DB7FF]/10 transition-all placeholder:text-slate-400 font-medium outline-none"
              />
            </div>
            
            {/* ⭐️ SEGMENTED CONTROL (Der View-Toggle) ⭐️ */}
            <div className="flex bg-slate-100 p-1.5 rounded-2xl shrink-0 self-start md:self-auto border border-slate-200/60 shadow-inner">
              <button 
                type="button"
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-2 px-5 py-2 text-[13px] font-bold rounded-xl transition-all duration-200 ${
                  viewMode === 'list' 
                    ? 'bg-white text-[#1E5AA8] shadow-sm ring-1 ring-black/5' 
                    : 'text-slate-500 hover:text-[#0B1F3A]'
                }`}
              >
                <ListVideo size={16} /> <span className="hidden sm:inline">Liste</span>
              </button>
              <button 
                type="button"
                onClick={() => setViewMode('gallery')}
                className={`flex items-center gap-2 px-5 py-2 text-[13px] font-bold rounded-xl transition-all duration-200 ${
                  viewMode === 'gallery' 
                    ? 'bg-white text-[#1E5AA8] shadow-sm ring-1 ring-black/5' 
                    : 'text-slate-500 hover:text-[#0B1F3A]'
                }`}
              >
                <LayoutGrid size={16} /> <span className="hidden sm:inline">Galerie</span>
              </button>
            </div>
          </div>

          {/* Category Pills & Dropdown */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm font-medium">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 md:pb-0">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mr-2 shrink-0">Filter:</span>
              {CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  type="button" 
                  onClick={() => setActiveCategory(cat)} 
                  className={`shrink-0 px-4 py-2 rounded-xl active:scale-95 transition-all text-[13px] font-semibold border ${
                    activeCategory === cat 
                      ? 'bg-[#0B1F3A] text-white border-transparent shadow-md' 
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  {cat === 'All' ? 'Alle Übungen' : cat}
                </button>
              ))}
            </div>

            {/* Level Filter Dropdown */}
            <div className="ml-auto relative" ref={filterRef}>
              <button 
                type="button" 
                onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl active:scale-95 transition-all shrink-0 font-semibold text-[13px] border ${
                  isFilterMenuOpen || activeLevel !== 'All' 
                    ? 'bg-[#EEF3F8] text-[#1E5AA8] border-[#1E5AA8]/30' 
                    : 'bg-white text-slate-500 hover:bg-slate-50 hover:text-[#0B1F3A] border-slate-200'
                }`}
              >
                <Filter size={16} /> 
                {activeLevel !== 'All' ? `Level: ${activeLevel}` : 'Level'} 
                <ChevronDown size={16} className={`transition-transform duration-200 ${isFilterMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isFilterMenuOpen && (
                <div className="absolute right-0 top-full mt-3 w-56 bg-white border border-slate-200/80 rounded-2xl shadow-xl z-50 p-4 animate-in fade-in zoom-in-95 duration-200">
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Schwierigkeitsgrad</h4>
                  <div className="flex flex-col gap-1">
                    {LEVELS.map(level => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => { setActiveLevel(level); setIsFilterMenuOpen(false); }}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-[13px] font-bold transition-colors ${
                          activeLevel === level ? 'bg-[#EEF3F8] text-[#1E5AA8]' : 'text-slate-600 hover:bg-slate-50 hover:text-[#0B1F3A]'
                        }`}
                      >
                        {level === 'All' ? 'Alle Level' : level}
                        {activeLevel === level && <Check size={16} />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          RESULT FEED (Switches layout based on viewMode)
          ========================================================================= */}
      
      {/* ANSICHT 1: LISTE (Detaillierte SaaS Karten) */}
      {viewMode === 'list' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDrills.map((drill) => (
            <div key={drill.id} className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-200/70 shadow-sm hover:shadow-[0_12px_24px_rgba(11,31,58,0.06)] hover:border-[#1E5AA8]/30 transition-all duration-300 cursor-pointer animate-in fade-in slide-in-from-bottom-2">
              
              <div className="relative aspect-video w-full overflow-hidden bg-slate-900 border-b border-slate-100">
                <img src={drill.image} alt={drill.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"/>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#0B1F3A]/10">
                  <div className="w-14 h-14 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center text-[#1E5AA8] shadow-xl transform scale-90 group-hover:scale-100 transition-all duration-300">
                    <Play size={24} className="fill-[#1E5AA8] ml-1" />
                  </div>
                </div>
                
                <button type="button" className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center text-white/90 hover:text-white bg-black/30 hover:bg-[#1E5AA8] rounded-xl backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 border border-white/10 shadow-sm">
                  <Bookmark size={16} />
                </button>
                
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1.5 shadow-sm">
                  <Clock size={12} /> {drill.duration}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <p className="text-[10px] font-bold text-[#1E5AA8] uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  {drill.category} <span className="w-1 h-1 rounded-full bg-slate-300" /> {drill.level}
                </p>
                <h3 className="font-bold text-[17px] text-[#0B1F3A] leading-snug mb-2 group-hover:text-[#1E5AA8] transition-colors line-clamp-2">
                  {drill.title}
                </h3>
                <p className="text-[14px] text-slate-500 leading-relaxed line-clamp-2 mt-auto">
                  {drill.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ANSICHT 2: GALERIE (Kompakte visuelle Karten) */}
      {viewMode === 'gallery' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDrills.map((drill) => (
            <div key={drill.id} className="group relative aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_12px_30px_rgba(11,31,58,0.15)] transition-all duration-300 cursor-pointer border border-slate-200/50 hover:border-[#6DB7FF]/40 animate-in fade-in slide-in-from-bottom-2">
              
              <img src={drill.image} alt={drill.title} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-all duration-700"/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
              
              <div className="absolute top-4 left-4">
                <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold px-3 py-1.5 rounded-xl uppercase tracking-widest shadow-sm">
                  {drill.category}
                </span>
              </div>

              <button type="button" className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-white bg-white/10 hover:bg-[#1E5AA8] border border-white/20 rounded-xl backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 shadow-sm">
                <Bookmark size={16} />
              </button>
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-2xl border border-white/30 transform scale-90 group-hover:scale-100 transition-all">
                  <Play size={28} className="fill-white ml-1.5" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="font-montserrat font-bold text-[20px] text-white leading-tight mb-2 drop-shadow-md">
                  {drill.title}
                </h3>
                <div className="flex items-center justify-between opacity-80 group-hover:opacity-100 transition-opacity">
                  <span className="text-[12px] font-medium text-slate-300">
                    {drill.level}
                  </span>
                  <span className="text-[12px] font-bold text-white bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10">
                    {drill.duration}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EMPTY STATE */}
      {filteredDrills.length === 0 && (
        <div className="py-20 flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-slate-200">
          <p className="text-lg font-bold text-[#0B1F3A] mb-2">Keine Drills gefunden</p>
          <p className="text-slate-500 text-sm mb-6">Für deine aktuellen Filterkriterien gibt es keine Übungen.</p>
          <button 
            type="button" 
            onClick={() => { setActiveCategory('All'); setActiveLevel('All'); setSearchQuery(''); }}
            className="px-6 py-2.5 bg-[#EEF3F8] text-[#1E5AA8] font-bold rounded-xl hover:bg-[#1E5AA8] hover:text-white transition-all"
          >
            Filter zurücksetzen
          </button>
        </div>
      )}

    </div>
  );
}