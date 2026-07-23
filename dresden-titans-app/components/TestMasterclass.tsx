"use client";

import { useState } from 'react';
import { 
  Search, Play, Bookmark, GraduationCap, Clock, 
  Mic, Presentation, SearchX, PlayCircle
} from 'lucide-react';

// --- MOCK DATA ---
const CONTINUE_WATCHING = [
  {
    id: 101,
    title: "Titans Spielkonzeption U13/U14",
    speaker: "Mattis",
    role: "Sportliche Leitung",
    progress: 65, 
    duration: "1h 15m",
    timeLeft: "26 Min verbleibend",
    category: "Vereinskonzept",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop"
  }
];

const CLINICS = [
  {
    id: 1,
    title: "Kasuistik & Demokratiebildung im Training",
    description: "Wie wir demokratische Werte und Konfliktlösung direkt in den Trainingsalltag der Jugendteams integrieren können.",
    speaker: "Birte & Sarah",
    category: "Methodik & Werte",
    duration: "45m",
    image: "https://images.unsplash.com/photo-1575361204412-336d600b3962?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "CLA: Constraints-Led Approach in der Defense",
    description: "Praktische Beispiele, wie wir unsere Verteidigungs-Prinzipien durch gezielte Regelanpassungen im SSG lehren.",
    speaker: "Steve Lang",
    category: "Taktik",
    duration: "1h 05m",
    image: "https://images.unsplash.com/photo-1519861531473-9200260768bf?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "DBB Coach Clinic: Modernes Pick & Roll Spacing",
    description: "Aufzeichnung der DBB Fortbildung zum Thema Spacing-Konzepte gegen Hedge und Drop Coverages.",
    speaker: "Gast-Referent",
    category: "Taktik",
    duration: "1h 30m",
    image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Athletik-Basics für den U14-Bereich",
    description: "Verletzungsprävention und Load-Management bei Doppelspieltagen und intensiven Turnierwochenenden.",
    speaker: "Rene",
    category: "Athletik",
    duration: "55m",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
  }
];

const TOPICS = ['All', 'Vereinskonzept', 'Methodik & Werte', 'Taktik', 'Athletik'];

export default function ClinicsPage() {
  const [activeTab, setActiveTab] = useState<'library' | 'bookmarks'>('library');
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Live-Filter Logik
  const matchesSearch = (text: string) => text.toLowerCase().includes(searchQuery.toLowerCase());
  
  const filteredClinics = CLINICS.filter(clinic => 
    (activeCategory === 'All' || clinic.category === activeCategory) && 
    (matchesSearch(clinic.title) || matchesSearch(clinic.speaker) || matchesSearch(clinic.description))
  );

  const hasResults = filteredClinics.length > 0;
  const isSearching = searchQuery.length > 0 || activeCategory !== 'All';

  return (
    <div className="max-w-[1200px] mx-auto pb-16 animate-in fade-in duration-500">
      
      {/* --- HEADER --- */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-[#1E5AA8]/10 flex items-center justify-center text-[#1E5AA8] shadow-sm">
              <GraduationCap size={24} strokeWidth={2.5} />
            </div>
            <h1 className="font-montserrat font-bold text-3xl text-[#0B1F3A] uppercase tracking-tight">
              Fortbildungen
            </h1>
          </div>
          <p className="text-slate-600 text-[15px] ml-16 max-w-2xl leading-relaxed">
            Interne Clinics, Gast-Vorträge und methodische Deep-Dives. Baue dein Wissen in deinem eigenen Tempo aus.
          </p>
        </div>

        {/* Tab Navigation (Kompakt oben rechts) */}
        <div className="flex bg-slate-100 p-1 rounded-xl shrink-0">
          <button 
            onClick={() => setActiveTab('library')}
            className={`px-6 py-2 text-[13px] font-bold rounded-lg transition-all ${
              activeTab === 'library' ? 'bg-white text-[#1E5AA8] shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Library
          </button>
          <button 
            onClick={() => setActiveTab('bookmarks')}
            className={`px-6 py-2 text-[13px] font-bold rounded-lg transition-all ${
              activeTab === 'bookmarks' ? 'bg-white text-[#1E5AA8] shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Bookmarks
          </button>
        </div>
      </div>

      {/* --- STICKY COMMAND CENTER (Search & Filters) --- */}
      <div className="sticky top-16 z-30 bg-[#EEF3F8]/95 backdrop-blur-md pt-4 pb-4 mb-10 border-b border-slate-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Filter-Pills */}
        <div className="flex overflow-x-auto scrollbar-hide gap-2 order-2 md:order-1 pb-1 md:pb-0">
          {TOPICS.map(cat => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)} 
              className={`shrink-0 px-4 py-2 rounded-xl text-[13px] font-bold transition-all border outline-none active:scale-95 ${
                activeCategory === cat 
                  ? 'bg-[#1E5AA8] border-transparent text-white shadow-md shadow-[#1E5AA8]/20' 
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80 order-1 md:order-2 group">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1E5AA8] transition-colors" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Kliniken, Referenten suchen..." 
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-[13px] font-medium text-slate-800 placeholder:text-slate-400 focus:border-[#6DB7FF] focus:ring-4 focus:ring-[#6DB7FF]/10 outline-none transition-all shadow-sm"
          />
        </div>
      </div>

      {/* --- CONTINUE WATCHING (Versteckt sich bei aktiver Suche, um Platz zu machen) --- */}
      {CONTINUE_WATCHING.length > 0 && activeTab === 'library' && !isSearching && (
        <div className="mb-14 animate-in fade-in duration-500">
          <div className="flex items-center gap-2 mb-5">
            <PlayCircle size={20} className="text-[#1E5AA8]" />
            <h2 className="font-montserrat font-bold text-[18px] text-[#0B1F3A] uppercase tracking-wide">
              Continue Watching
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CONTINUE_WATCHING.map(video => (
              <div key={video.id} className="group bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-[0_8px_24px_rgba(11,31,58,0.06)] hover:border-[#1E5AA8]/30 transition-all duration-300 cursor-pointer flex flex-col sm:flex-row gap-5">
                
                {/* Thumbnail */}
                <div className="relative w-full sm:w-40 aspect-video sm:aspect-auto sm:h-28 rounded-xl overflow-hidden shrink-0 bg-black shadow-inner">
                  <img src={video.image} alt={video.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 group-hover:bg-[#1E5AA8] group-hover:border-transparent group-hover:scale-110 transition-all shadow-lg">
                      <Play size={16} className="fill-white ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Info & Progress */}
                <div className="flex flex-col flex-1 justify-center">
                  <p className="text-[10px] font-bold text-[#1E5AA8] uppercase tracking-widest mb-1">{video.category}</p>
                  <h3 className="font-bold text-[15px] text-[#0B1F3A] leading-snug mb-1.5 line-clamp-2 group-hover:text-[#1E5AA8] transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-[12px] text-slate-500 mb-4 flex items-center gap-1.5 font-medium">
                    <Mic size={14} className="text-slate-400" /> {video.speaker}
                  </p>
                  
                  {/* Progress Bar (Deutlicher gestaltet) */}
                  <div className="w-full mt-auto">
                    <div className="flex justify-between text-[11px] font-bold text-slate-500 mb-1.5">
                      <span>{video.progress}%</span>
                      <span>{video.timeLeft}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                      <div className="h-full bg-[#1E5AA8] rounded-full relative">
                        <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/20" /> {/* Shine effect */}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- ALL CLINICS GRID --- */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Presentation size={20} className="text-[#6DB7FF]" />
          <h2 className="font-montserrat font-bold text-[18px] text-[#0B1F3A] uppercase tracking-wide">
            {isSearching ? 'Suchergebnisse' : 'Alle Fortbildungen'}
          </h2>
        </div>
        <span className="text-[13px] font-bold text-slate-400">{filteredClinics.length} Video{filteredClinics.length !== 1 && 's'}</span>
      </div>

      {hasResults ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredClinics.map((clinic) => (
            <div key={clinic.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-[0_12px_24px_rgba(11,31,58,0.08)] hover:border-[#6DB7FF]/40 transition-all duration-300 cursor-pointer">
              
              {/* Thumbnail */}
              <div className="relative aspect-video w-full overflow-hidden bg-black">
                <img src={clinic.image} alt={clinic.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"/>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#0B1F3A]/10">
                  <div className="w-14 h-14 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center text-[#1E5AA8] shadow-xl transform scale-90 group-hover:scale-100 transition-all duration-300">
                    <Play size={24} className="fill-[#1E5AA8] ml-1" />
                  </div>
                </div>

                <button className="absolute top-3 right-3 w-8 h-8 bg-black/40 backdrop-blur-md rounded-lg flex items-center justify-center text-white/90 hover:text-white hover:bg-[#1E5AA8] transition-all opacity-0 group-hover:opacity-100 shadow-sm border border-white/10">
                  <Bookmark size={16} />
                </button>

                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-2 py-1 rounded-md flex items-center gap-1.5 shadow-sm border border-white/10">
                  <Clock size={12} /> {clinic.duration}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-[#EEF3F8] text-[#1E5AA8] uppercase tracking-wider">
                    {clinic.category}
                  </span>
                </div>
                
                <h3 className="font-bold text-[16px] text-[#0B1F3A] leading-snug mb-2 line-clamp-2 group-hover:text-[#1E5AA8] transition-colors">
                  {clinic.title}
                </h3>
                
                <p className="text-[13.5px] text-slate-600 leading-relaxed line-clamp-2 mb-5 flex-1">
                  {clinic.description}
                </p>

                {/* Referenten Info (Bento-Style) */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 mt-auto">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-[12px] font-bold text-slate-600 shrink-0 border border-slate-200 group-hover:border-[#1E5AA8]/30 group-hover:bg-[#EEF3F8] group-hover:text-[#1E5AA8] transition-colors">
                    {clinic.speaker.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Referent</span>
                    <span className="text-[13px] font-bold text-[#0B1F3A] leading-none">{clinic.speaker}</span>
                  </div>
                </div>
              </div>
              
            </div>
          ))}
        </div>
      ) : (
        /* --- EMPTY STATE --- */
        <div className="flex flex-col items-center justify-center py-24 bg-white border border-slate-200 rounded-3xl shadow-sm text-center animate-in fade-in zoom-in-95 duration-200">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
            <SearchX size={28} className="text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-[#0B1F3A] mb-1">Keine Fortbildungen gefunden</h3>
          <p className="text-slate-500 text-sm max-w-xs mx-auto leading-relaxed">
            Für "{searchQuery || activeCategory}" wurden keine Videos gefunden.
          </p>
          <button 
            onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
            className="mt-5 px-5 py-2.5 bg-[#EEF3F8] text-[#1E5AA8] font-bold text-sm rounded-xl hover:bg-[#1E5AA8] hover:text-white transition-all active:scale-95"
          >
            Filter zurücksetzen
          </button>
        </div>
      )}
    </div>
  );
}