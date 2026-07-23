"use client";

import { 
  FolderHeart, Plus, Play, MoreVertical, 
  Bookmark, Clock, Layers, Lock, Globe 
} from 'lucide-react';

// --- MOCK DATA ---

// 1. Die Playlists (Collections) des Trainers
const PLAYLISTS = [
  {
    id: 1,
    title: "U13 / U14 Warm-Up Games",
    count: 14,
    visibility: "Private",
    lastUpdated: "Vor 2 Tagen",
    // 3 Bilder erzeugen den "Stapel-Effekt"
    images: [
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519861531473-9200260768bf?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=600&auto=format&fit=crop"
    ]
  },
  {
    id: 2,
    title: "CLA Defense Constraints",
    count: 8,
    visibility: "Shared",
    lastUpdated: "Letzte Woche",
    images: [
      "https://images.unsplash.com/photo-1575361204412-336d600b3962?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526628574100-349fce8f465a?q=80&w=600&auto=format&fit=crop"
    ]
  },
  {
    id: 3,
    title: "Klatovy Turnier Prep",
    count: 5,
    visibility: "Private",
    lastUpdated: "Gestern",
    images: [
      "https://images.unsplash.com/photo-1518622119129-9e80be951fd4?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515523110800-9415d13b84a8?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580087433295-ab2600c1030e?q=80&w=600&auto=format&fit=crop"
    ]
  }
];

// 2. Kürzlich gemerkte (unsortierte) Einzel-Drills
const RECENTLY_SAVED = [
  {
    id: 101,
    title: "Downhill DHO Finishing 1v1",
    category: "Finishing",
    duration: "0:34",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 102,
    title: "Circle Path Shots",
    category: "Shooting",
    duration: "0:56",
    image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=600&auto=format&fit=crop"
  }
];

export default function PlaylistsPage() {
  return (
    <div className="max-w-[1400px] mx-auto pb-16 animate-in fade-in duration-500">
      
      {/* --- HEADER --- */}
      <div className="mb-10 mt-2 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-[#1E5AA8]/10 flex items-center justify-center text-[#1E5AA8] shadow-sm">
              <FolderHeart size={24} strokeWidth={2.5} />
            </div>
            <h1 className="font-montserrat font-bold text-3xl text-[#0B1F3A] uppercase tracking-tight">
              Meine Playlists
            </h1>
          </div>
          <p className="text-slate-500 text-[15px] ml-16 max-w-2xl leading-relaxed">
            Deine persönlichen Sammlungen. Speichere Drills für bestimmte Teams, Schwerpunkte oder zukünftige Trainingspläne.
          </p>
        </div>

        <button className="flex items-center gap-2 px-5 py-3 bg-[#0B1F3A] hover:bg-[#1E5AA8] text-white rounded-xl font-bold text-[13px] transition-all shadow-lg shadow-[#0B1F3A]/20 active:scale-95 shrink-0">
          <Plus size={18} /> Neue Playlist
        </button>
      </div>

      {/* =========================================================================
          SECTION 1: QUICK ACCESS (Unsortierte Bookmarks)
          ========================================================================= */}
      {RECENTLY_SAVED.length > 0 && (
        <div className="mb-14">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-montserrat font-bold text-[16px] text-[#0B1F3A] uppercase tracking-wide flex items-center gap-2">
              <Bookmark size={18} className="text-[#1E5AA8] fill-[#1E5AA8]/20" /> Zuletzt gemerkt
            </h2>
            <button className="text-[12px] font-bold text-slate-400 hover:text-[#1E5AA8] transition-colors">
              Alle anzeigen
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {RECENTLY_SAVED.map((drill) => (
              <div key={drill.id} className="group flex bg-white rounded-2xl p-3 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#1E5AA8]/30 transition-all cursor-pointer gap-4">
                
                {/* Mini Thumbnail */}
                <div className="relative w-24 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-900">
                  <img src={drill.image} alt={drill.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play size={14} className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" />
                  </div>
                </div>

                <div className="flex flex-col justify-center flex-1 min-w-0">
                  <p className="text-[9px] font-bold text-[#1E5AA8] uppercase tracking-widest mb-1 truncate">
                    {drill.category}
                  </p>
                  <h3 className="font-bold text-[13px] text-[#0B1F3A] leading-snug truncate group-hover:text-[#1E5AA8] transition-colors">
                    {drill.title}
                  </h3>
                  <div className="mt-1 flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
                    <Clock size={10} /> {drill.duration}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 2: PLAYLIST GRID (Stacked Cards Effect)
          ========================================================================= */}
      <div>
        <h2 className="font-montserrat font-bold text-[16px] text-[#0B1F3A] uppercase tracking-wide flex items-center gap-2 mb-6">
          <Layers size={18} className="text-slate-400" /> Deine Sammlungen
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PLAYLISTS.map((playlist) => (
            <div key={playlist.id} className="group cursor-pointer">
              
              {/* Stacked Images Container */}
              <div className="relative aspect-square w-full mb-4">
                
                {/* Card 3 (Bottom) */}
                {playlist.images[2] && (
                  <div className="absolute top-4 inset-x-8 bottom-0 rounded-3xl bg-slate-200 overflow-hidden opacity-40 transform transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-95 border border-slate-300">
                    <img src={playlist.images[2]} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
                
                {/* Card 2 (Middle) */}
                {playlist.images[1] && (
                  <div className="absolute top-2 inset-x-4 bottom-2 rounded-3xl bg-slate-300 overflow-hidden opacity-70 transform transition-all duration-500 group-hover:-translate-y-1 group-hover:scale-[0.98] border border-slate-300 shadow-sm">
                    <img src={playlist.images[1]} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
                
                {/* Card 1 (Top / Main Cover) */}
                <div className="absolute inset-x-0 top-0 bottom-4 rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 shadow-[0_8px_20px_rgba(11,31,58,0.08)] transform transition-all duration-500 group-hover:shadow-[0_16px_30px_rgba(11,31,58,0.12)]">
                  <img src={playlist.images[0]} alt={playlist.title} className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/80 via-transparent to-transparent opacity-80" />
                  
                  {/* Play/Open Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#0B1F3A]/10">
                    <div className="w-14 h-14 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center text-[#1E5AA8] shadow-xl transform scale-90 group-hover:scale-100 transition-all duration-300">
                      <Play size={24} className="fill-[#1E5AA8] ml-1" />
                    </div>
                  </div>

                  {/* Drill Count Badge */}
                  <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                    <Layers size={14} className="text-white" />
                    <span className="text-white text-[12px] font-bold">{playlist.count} Drills</span>
                  </div>
                </div>

              </div>

              {/* Playlist Meta Data */}
              <div className="flex items-start justify-between px-2">
                <div>
                  <h3 className="font-bold text-[18px] text-[#0B1F3A] leading-tight mb-1.5 group-hover:text-[#1E5AA8] transition-colors">
                    {playlist.title}
                  </h3>
                  <div className="flex items-center gap-3 text-[12px] font-medium text-slate-500">
                    <span className="flex items-center gap-1">
                      {playlist.visibility === 'Private' ? <Lock size={12} /> : <Globe size={12} />} 
                      {playlist.visibility}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span>{playlist.lastUpdated}</span>
                  </div>
                </div>
                
                {/* Context Menu Button */}
                <button className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-[#0B1F3A] transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}