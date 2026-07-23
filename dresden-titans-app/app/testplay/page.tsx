"use client";

import { 
  ArrowLeft, Play, MoreVertical, Clock, 
  CalendarPlus, Share2, GripVertical, Plus, 
  Trash2, Lock
} from 'lucide-react';
import Link from 'next/link';

// --- MOCK DATA FÜR EINE SPEZIFISCHE PLAYLIST ---
const PLAYLIST_DETAIL = {
  id: 1,
  title: "U13 / U14 Warm-Up Games",
  description: "Eine Sammlung von spielerischen Warm-Ups (Constraints-Led Approach) für die U13 und U14, um die Einheiten mit hoher Intensität und Entscheidungsfindung zu starten.",
  creator: "Steve Lang",
  visibility: "Privat",
  lastUpdated: "Vor 2 Tagen",
  totalDuration: "ca. 45 Min",
  drillCount: 4,
  coverImage: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop",
  drills: [
    {
      id: 101,
      order: 1,
      title: "Tagging with Basketballs (Dribble Knockout)",
      category: "Warm-Up",
      duration: "10:00",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 102,
      order: 2,
      title: "Advantage Starts 2v1",
      category: "Finishing",
      duration: "15:00",
      image: "https://images.unsplash.com/photo-1519861531473-9200260768bf?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 103,
      order: 3,
      title: "Circle Path Shots (Warm-Up Version)",
      category: "Shooting",
      duration: "08:00",
      image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 104,
      order: 4,
      title: "Full Court Passing Tag",
      category: "Passing",
      duration: "12:00",
      image: "https://images.unsplash.com/photo-1575361204412-336d600b3962?q=80&w=400&auto=format&fit=crop"
    }
  ]
};

export default function PlaylistDetailPage() {
  return (
    <div className="max-w-[1200px] mx-auto pb-24 animate-in fade-in duration-500">
      
      {/* --- TOP NAVIGATION BREADCRUMB --- */}
      <div className="mb-6 mt-2 flex items-center justify-between">
        <Link href="/player-dev/playlists" className="flex items-center gap-2 text-slate-500 hover:text-[#0B1F3A] font-bold text-[13px] transition-colors bg-white hover:bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm active:scale-95">
          <ArrowLeft size={16} /> Zurück zur Übersicht
        </Link>
        <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-400 hover:text-[#0B1F3A] transition-colors">
          <MoreVertical size={18} />
        </button>
      </div>

      {/* =========================================================================
          HERO SECTION (Spotify / Masterclass Aesthetic)
          ========================================================================= */}
      <div className="relative bg-[#0B1F3A] rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(11,31,58,0.15)] mb-8 border border-[#1E5AA8]/20">
        
        {/* Background Image with Heavy Blur & Gradient */}
        <div className="absolute inset-0 z-0">
          <img src={PLAYLIST_DETAIL.coverImage} alt="Cover" className="w-full h-full object-cover opacity-30 mix-blend-overlay blur-xl scale-110" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A] via-[#0B1F3A]/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row gap-8 p-8 md:p-10">
          
          {/* Cover Art */}
          <div className="w-48 h-48 md:w-60 md:h-60 shrink-0 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
            <img src={PLAYLIST_DETAIL.coverImage} alt={PLAYLIST_DETAIL.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>

          {/* Playlist Info */}
          <div className="flex flex-col justify-end flex-1">
            <p className="text-[#6DB7FF] text-[11px] font-bold uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <Lock size={12} /> {PLAYLIST_DETAIL.visibility} Playlist
            </p>
            
            <h1 className="font-montserrat font-black text-4xl md:text-5xl lg:text-6xl text-white tracking-tighter leading-none mb-4 drop-shadow-md">
              {PLAYLIST_DETAIL.title}
            </h1>
            
            <p className="text-slate-300 text-[14px] md:text-[15px] max-w-2xl leading-relaxed mb-6">
              {PLAYLIST_DETAIL.description}
            </p>
            
            <div className="flex items-center gap-4 text-[13px] font-medium text-slate-400">
              <span className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white text-[10px] font-bold border border-white/20">
                  {PLAYLIST_DETAIL.creator.charAt(0)}
                </div>
                <span className="text-white font-bold">{PLAYLIST_DETAIL.creator}</span>
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-500" />
              <span>{PLAYLIST_DETAIL.drillCount} Drills</span>
              <span className="w-1 h-1 rounded-full bg-slate-500" />
              <span>{PLAYLIST_DETAIL.totalDuration}</span>
            </div>
          </div>

        </div>

        {/* Action Bar at the bottom of Hero */}
        <div className="relative z-10 bg-black/20 backdrop-blur-md border-t border-white/10 p-5 px-8 flex flex-col sm:flex-row items-center gap-4">
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-[#6DB7FF] hover:bg-white text-[#0B1F3A] rounded-xl font-bold text-[14px] transition-all shadow-lg active:scale-95">
            <CalendarPlus size={18} /> In Trainingsplan übernehmen
          </button>
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-[14px] transition-all border border-white/10">
            <Share2 size={16} /> Playlist teilen
          </button>
        </div>
      </div>

      {/* =========================================================================
          DRILL LIST (Reorderable List View)
          ========================================================================= */}
      <div className="px-2">
        <div className="flex items-center justify-between mb-4 px-4">
          <h2 className="font-montserrat font-bold text-[16px] text-[#0B1F3A] uppercase tracking-wide">
            Inhalt der Playlist
          </h2>
          <button className="flex items-center gap-1.5 text-[13px] font-bold text-[#1E5AA8] hover:text-[#0B1F3A] transition-colors">
            <Plus size={16} /> Drills hinzufügen
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {/* Table Header (Subtle) */}
          <div className="flex items-center px-6 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200/60 mb-2">
            <div className="w-8">#</div>
            <div className="flex-1">Titel</div>
            <div className="w-32 hidden sm:block">Kategorie</div>
            <div className="w-24 text-right">Dauer</div>
            <div className="w-16"></div>
          </div>

          {/* Drill Items */}
          {PLAYLIST_DETAIL.drills.map((drill, index) => (
            <div 
              key={drill.id} 
              className="group flex items-center px-4 py-3 bg-white rounded-2xl border border-slate-200/70 shadow-sm hover:border-[#1E5AA8]/30 hover:shadow-md transition-all cursor-pointer"
            >
              
              {/* Drag Handle & Number */}
              <div className="w-10 flex items-center text-slate-400">
                <GripVertical size={16} className="opacity-0 group-hover:opacity-100 cursor-grab hover:text-[#0B1F3A] transition-all absolute -ml-3" />
                <span className="text-[13px] font-bold group-hover:opacity-0 transition-opacity w-4 text-center">
                  {index + 1}
                </span>
              </div>

              {/* Thumbnail & Title */}
              <div className="flex-1 flex items-center gap-4 min-w-0">
                <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-slate-900 shrink-0">
                  <img src={drill.image} alt={drill.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                    <Play size={14} className="fill-white text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-[14px] text-[#0B1F3A] truncate group-hover:text-[#1E5AA8] transition-colors">
                  {drill.title}
                </h3>
              </div>

              {/* Category */}
              <div className="w-32 hidden sm:block shrink-0">
                <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 text-slate-500 uppercase tracking-wider group-hover:bg-[#EEF3F8] group-hover:text-[#1E5AA8] transition-colors">
                  {drill.category}
                </span>
              </div>

              {/* Duration */}
              <div className="w-24 text-right shrink-0">
                <span className="text-[13px] font-semibold text-slate-500 flex items-center justify-end gap-1.5">
                  {drill.duration}
                </span>
              </div>

              {/* Actions */}
              <div className="w-16 flex justify-end shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors" title="Aus Playlist entfernen">
                  <Trash2 size={16} />
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}