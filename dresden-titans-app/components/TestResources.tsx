"use client";

import { useState } from 'react';
import { 
  Library, FileText, ExternalLink, Play, BookOpen, 
  GraduationCap, ArrowRight, BookMarked, DownloadCloud, Users, ShieldAlert,
  SearchX, Search, Clock, FileDown
} from 'lucide-react';

// --- MOCK DATA ---
const INTERNAL_DOCS = [
  { id: 1, title: "U13 / U14 Practice Plan Template", description: "Standardisierte Vorlage für eine 90-Minuten-Einheit. Beinhaltet strukturierte Blöcke für Constraints-Led Approach (CLA) Games und Load-Management.", type: "PDF / Word", icon: FileText, color: "text-blue-600", bg: "bg-blue-100/50", border: "border-blue-200/60", action: "Download Template" },
  { id: 2, title: "Titans Vereins-Playbook", description: "Die zentrale Notion-Datenbank mit allen Basis-Systemen, Einwurf-Varianten und Transition-Regeln für die aktuelle Saison.", type: "Notion Hub", icon: ExternalLink, color: "text-orange-600", bg: "bg-orange-100/50", border: "border-orange-200/60", action: "Open in Notion" },
  { id: 3, title: "DBB Regelwerk 2026 (Jugend)", description: "Offizielles Regelwerk inklusive der neuen Minibasketball-Richtlinien, Auswechselregeln und Spielfeld-Vorgaben für die MDL.", type: "Official PDF", icon: BookMarked, color: "text-emerald-600", bg: "bg-emerald-100/50", border: "border-emerald-200/60", action: "Download PDF" },
  { id: 4, title: "Orga: Fahrgemeinschaften & Notfallkontakte", description: "Wichtige Dokumente für Auswärtsfahrten, Turnier-Organisation (MDL / Cups) und Hallenordnungen der gegnerischen Teams.", type: "Document", icon: Users, color: "text-purple-600", bg: "bg-purple-100/50", border: "border-purple-200/60", action: "View Documents" },
];

const CURATED_VIDEOS = [
  { id: 1, title: "Brad Underwood: Transition Offense into 5 Out Spacing", coach: "Film Room", duration: "4:12", category: "Coaching", image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=800&auto=format&fit=crop" },
  { id: 2, title: "Bob McKillop: 5 Out Motion Offense", coach: "Half Court Hoops", duration: "6:45", category: "Coaching", image: "https://images.unsplash.com/photo-1519861531473-9200260768bf?q=80&w=800&auto=format&fit=crop" },
  { id: 3, title: "Developing the Pick & Roll Read", coach: "Skill Coach", duration: "3:20", category: "Skill Acquisition", image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop" }
];

const RESEARCH_PAPERS = [
  { id: 1, title: "Constraints-Led Approach in Youth Basketball", journal: "Journal of Motor Learning · 2025", summary: "Wie Trainer durch das Verändern von Constraints implizites Lernen bei Spielern fördern.", category: "Skill Acquisition", level: "High Yield" },
  { id: 2, title: "Spaced Repetition im Playbook-Training", journal: "Sports Psychology Review · 2024", summary: "Der Einsatz von systematischen Wiederholungen zur taktischen Ausbildung durch Active Recall.", category: "Mental", level: "Moderate" },
  { id: 3, title: "Load Management in U14 Tournaments", journal: "Athletic Performance · 2025", summary: "Prävention von Verletzungen durch optimale Pausensteuerung bei Doppelspieltagen.", category: "S&C", level: "High Yield" }
];

const RECOMMENDED_BOOKS = [
  { id: 1, author: "Rob Gray", title: "How We Learn to Move", description: "The definitive introduction to how humans learn movement. Essential reading for any coach.", category: "Skill Acquisition" },
  { id: 2, author: "Doug Lemov", title: "The Coach's Guide to Teaching", description: "Translates pedagogical frameworks from the classroom to the sports field.", category: "Coaching" }
];

const FILTERS = ['All', 'Skill Acquisition', 'Coaching', 'S&C', 'Mental'];

export default function ResourcesPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState(''); // Live-Such-State

  // Smafte, kombinierte Filter- und Suchlogik
  const matchesSearch = (text: string) => text.toLowerCase().includes(searchQuery.toLowerCase());

  const filteredVideos = CURATED_VIDEOS.filter(v => 
    (activeFilter === 'All' || v.category === activeFilter) && 
    (matchesSearch(v.title) || matchesSearch(v.coach))
  );
  
  const filteredPapers = RESEARCH_PAPERS.filter(p => 
    (activeFilter === 'All' || p.category === activeFilter) && 
    (matchesSearch(p.title) || matchesSearch(p.journal))
  );
  
  const filteredBooks = RECOMMENDED_BOOKS.filter(b => 
    (activeFilter === 'All' || b.category === activeFilter) && 
    (matchesSearch(b.title) || matchesSearch(b.author))
  );

  const hasAnyResults = filteredVideos.length > 0 || filteredPapers.length > 0 || filteredBooks.length > 0;

  return (
    <div className="max-w-[1200px] mx-auto pb-16 animate-in fade-in duration-500">
      
      {/* --- HEADER --- */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-[#1E5AA8]/10 flex items-center justify-center text-[#1E5AA8] shadow-sm">
            <Library size={24} strokeWidth={2.5} />
          </div>
          <h1 className="font-montserrat font-bold text-3xl text-[#0B1F3A] uppercase tracking-tight">
            Resources
          </h1>
        </div>
        <p className="text-slate-600 text-[15px] ml-16 max-w-2xl leading-relaxed">
          Templates, Forschungsergebnisse und Video-Analysen für dein Training. Alles kompakt an einem Ort für die perfekte Saisonvorbereitung.
        </p>
      </div>

      {/* --- 1. THE INTERNAL HUB --- */}
      <div className="mb-14">
        <h2 className="font-montserrat font-bold text-[18px] text-[#0B1F3A] uppercase tracking-wide mb-5 flex items-center gap-2">
          <ShieldAlert size={20} className="text-[#1E5AA8]" />
          Internal Hub & Templates
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {INTERNAL_DOCS.map((doc) => (
            <div key={doc.id} className={`group bg-white p-6 rounded-2xl border ${doc.border} shadow-sm hover:shadow-[0_12px_24px_rgba(11,31,58,0.05)] hover:border-[#1E5AA8]/30 transition-all duration-300 flex flex-col h-full`}>
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl ${doc.bg} flex items-center justify-center ${doc.color} shrink-0 shadow-inner`}>
                  <doc.icon size={24} strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{doc.type}</p>
                  <h3 className="text-[17px] font-bold text-[#0B1F3A] leading-snug group-hover:text-[#1E5AA8] transition-colors truncate">{doc.title}</h3>
                </div>
              </div>
              <p className="text-[14px] text-slate-600 leading-relaxed mb-6 flex-1">{doc.description}</p>
              <button className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-50 hover:bg-[#1E5AA8] hover:text-white text-[#1E5AA8] font-bold text-[13px] rounded-xl transition-all border border-slate-100 hover:border-transparent active:scale-[0.99]">
                <DownloadCloud size={16} /> {doc.action}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* --- LIVE SEARCH & FILTER BAR COMPONENT --- */}
      <div className="sticky top-16 z-30 bg-[#EEF3F8]/95 backdrop-blur-md pt-4 pb-2 mb-10 border-b border-slate-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Filter-Pills */}
        <div className="flex overflow-x-auto scrollbar-hide gap-1.5 order-2 md:order-1">
          {FILTERS.map(filter => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`shrink-0 px-4 py-2 rounded-xl text-[13px] font-bold transition-all border outline-none active:scale-95 ${
                activeFilter === filter 
                  ? 'bg-[#1E5AA8] border-transparent text-white shadow-md shadow-[#1E5AA8]/20' 
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Integrierte Echtzeit-Suche */}
        <div className="relative w-full md:w-72 order-1 md:order-2 group">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1E5AA8] transition-colors" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ressourcen live filtern..." 
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-[13px] font-medium text-slate-800 placeholder:text-slate-400 focus:border-[#6DB7FF] focus:ring-4 focus:ring-[#6DB7FF]/10 outline-none transition-all shadow-sm"
          />
        </div>
      </div>

      {/* --- EMPTY STATE --- */}
      {!hasAnyResults && (
        <div className="flex flex-col items-center justify-center py-20 bg-white border border-slate-200 rounded-3xl shadow-sm text-center animate-in fade-in zoom-in-95 duration-200">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
            <SearchX size={28} className="text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-[#0B1F3A] mb-1">Keine Ressourcen gefunden</h3>
          <p className="text-slate-500 text-sm max-w-xs mx-auto leading-relaxed">
            Für "{searchQuery || activeFilter}" wurden keine Übungen, Booklets oder Papers hinterlegt.
          </p>
          <button 
            onClick={() => { setActiveFilter('All'); setSearchQuery(''); }}
            className="mt-5 px-5 py-2 bg-[#EEF3F8] text-[#1E5AA8] font-bold text-sm rounded-xl hover:bg-[#1E5AA8] hover:text-white transition-all active:scale-95"
          >
            Filter zurücksetzen
          </button>
        </div>
      )}

      {/* --- 2. CURATED FILM ROOM --- */}
      {filteredVideos.length > 0 && (
        <div className="mb-14 animate-in fade-in duration-300">
          <div className="mb-5">
            <h2 className="font-montserrat font-bold text-[18px] text-[#0B1F3A] uppercase tracking-wide mb-1 flex items-center gap-2">
              <Play size={18} className="text-[#6DB7FF] fill-[#6DB7FF]" />
              Curated Coaching Videos
            </h2>
            <p className="text-[14px] text-slate-600 leading-relaxed max-w-3xl">
              Ausgewählte Videoanalysen aus der Basketballwelt. Jeden Tag neu – mit exaktem Fokus auf den taktischen Kern.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map(video => (
              <div key={video.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-[0_12px_30px_rgba(11,31,58,0.06)] hover:border-[#6DB7FF]/40 transition-all duration-300 cursor-pointer">
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                  <img src={video.image} alt={video.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-[#1E5AA8] group-hover:bg-[#1E5AA8] group-hover:text-white transition-all transform group-hover:scale-110 shadow-lg border border-transparent">
                      <Play size={20} className="fill-current ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col bg-white">
                  <div className="flex justify-between items-center mb-2.5">
                    <p className="text-[10px] font-bold text-[#1E5AA8] uppercase tracking-widest flex items-center gap-1">
                      <ExternalLink size={10} /> {video.coach}
                    </p>
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Clock size={12} /> {video.duration}
                    </span>
                  </div>
                  <h3 className="text-[15px] font-bold text-[#0B1F3A] leading-snug group-hover:text-[#1E5AA8] transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- 3. LITERATURE GRID --- */}
      {(filteredPapers.length > 0 || filteredBooks.length > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start border-t border-slate-200/60 pt-10 animate-in fade-in duration-300">
          
          {/* Research Column */}
          {filteredPapers.length > 0 && (
            <div className="space-y-4">
              <h2 className="font-montserrat font-bold text-[18px] text-[#0B1F3A] uppercase tracking-wide flex items-center gap-2 mb-2">
                <GraduationCap size={20} className="text-slate-500" />
                Research Papers
              </h2>
              <div className="space-y-4">
                {filteredPapers.map(paper => (
                  <div key={paper.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 hover:shadow-md hover:border-[#1E5AA8]/30 transition-all duration-200 group cursor-pointer flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest truncate max-w-[70%]">{paper.journal}</span>
                        <span className={`shrink-0 text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider ${
                          paper.level === 'High Yield' ? 'bg-orange-50 text-orange-700 border border-orange-100' : 'bg-slate-100 text-slate-600'
                        }`}>{paper.level}</span>
                      </div>
                      <h3 className="text-[16px] font-bold text-[#0B1F3A] mb-2 leading-snug group-hover:text-[#1E5AA8] transition-colors">{paper.title}</h3>
                      <p className="text-[13.5px] text-slate-600 leading-relaxed mb-4 italic">"{paper.summary}"</p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-2">
                      <button className="flex items-center gap-1 text-[13px] font-bold text-[#1E5AA8] hover:text-[#0B1F3A] transition-colors">
                        Zusammenfassung lesen <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Books Column */}
          {filteredBooks.length > 0 && (
            <div className="space-y-4">
              <h2 className="font-montserrat font-bold text-[18px] text-[#0B1F3A] uppercase tracking-wide flex items-center gap-2 mb-2">
                <BookOpen size={20} className="text-slate-500" />
                Empfohlene Fachliteratur
              </h2>
              <div className="space-y-4">
                {filteredBooks.map(book => (
                  <div key={book.id} className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md hover:border-[#1E5AA8]/30 transition-all duration-200 cursor-pointer group">
                    <div className="flex gap-4 items-start">
                      <div className="w-16 h-24 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl shrink-0 border border-slate-200/60 flex items-center justify-center shadow-inner relative overflow-hidden">
                        <BookOpen size={22} className="text-slate-400" />
                        <div className="absolute top-0 left-1 w-0.5 h-full bg-slate-200/60" /> {/* Buchrücken-Effekt */}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-[#1E5AA8] uppercase tracking-widest mb-1">{book.author}</p>
                        <h3 className="text-[16px] font-bold text-[#0B1F3A] leading-snug mb-1.5 group-hover:text-[#1E5AA8] transition-colors truncate">{book.title}</h3>
                        <p className="text-[13px] text-slate-600 line-clamp-2 leading-relaxed">{book.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
        </div>
      )}

    </div>
  );
}