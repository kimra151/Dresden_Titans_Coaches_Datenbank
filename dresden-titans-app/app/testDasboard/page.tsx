"use client";

import { 
  Calendar, Clock, MapPin, Play, FileText, 
  ArrowRight, CheckCircle2, AlertCircle, 
  PlayCircle, BarChart3, Inbox, ChevronRight, Bookmark
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// --- MOCK DATA ---

// F-Pattern: Das wichtigste Event (Plan fehlt) steht ganz oben!
const UPCOMING_PRACTICES = [
  {
    id: 1,
    team: "U14",
    type: "Team-Training",
    date: "Heute",
    time: "17:30 - 19:00",
    location: "Margon Arena (Halle 2)",
    planStatus: "empty", 
  },
  {
    id: 2,
    team: "U14",
    type: "Athletik & Individual",
    date: "Donnerstag",
    time: "16:00 - 17:30",
    location: "Joynext Arena",
    planStatus: "draft",
  },
  {
    id: 3,
    team: "U13",
    type: "Team-Training",
    date: "Freitag",
    time: "17:00 - 18:30",
    location: "Margon Arena",
    planStatus: "ready",
  }
];

const NEW_THIS_WEEK = [
  {
    id: 1,
    title: "Big Man Rotational Ballhandling",
    category: "Ballhandling",
    duration: "2:00",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Circle Path Shots",
    category: "Shooting",
    duration: "0:56",
    image: "https://images.unsplash.com/photo-1519861531473-9200260768bf?q=80&w=600&auto=format&fit=crop"
  }
];

// Preattentive Processing: Daten für das Balkendiagramm
const MONTHLY_LOAD = [
  { week: 'W1', hours: 4, max: 10 },
  { week: 'W2', hours: 6, max: 10 },
  { week: 'W3', hours: 8, max: 10 }, // Current week
  { week: 'W4', hours: 0, max: 10 }, // Future
];

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const recentDrafts: any[] = []; // Simulierter Empty State

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-[1400px] mx-auto pb-16 animate-in fade-in duration-500">
      
      {/* --- HEADER (Titans Ästhetik) --- */}
      <div className="mb-8 mt-2 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-montserrat font-bold text-3xl text-[#0B1F3A] tracking-tight mb-2">
            Mission Control
          </h1>
          <p className="text-slate-500 text-[15px]">
            Willkommen zurück, Steve 👋 Dein Fokus für diese Woche.
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#0B1F3A] hover:bg-[#1E5AA8] text-white rounded-xl font-bold text-[13px] transition-all shadow-lg shadow-[#0B1F3A]/20 active:scale-95">
          <FileText size={16} /> Neuen Plan erstellen
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* =========================================
            LINKE SPALTE (Spannweite 8)
        ========================================= */}
        <div className="xl:col-span-8 flex flex-col gap-10">
          
          {/* 1. ACTION REQUIRED (Schedule mit UX-Fokus & Markenfarben) */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-montserrat font-bold text-[16px] text-[#0B1F3A] uppercase tracking-wide flex items-center gap-2">
                <Calendar size={18} className="text-[#1E5AA8]" /> Nächste Einheiten
              </h2>
              <Link href="/toolbox/plans" className="text-[13px] font-bold text-[#1E5AA8] hover:text-[#0B1F3A] flex items-center gap-1 transition-colors">
                Zum Kalender <ChevronRight size={16} />
              </Link>
            </div>

            <div className="space-y-4">
              {UPCOMING_PRACTICES.map((practice, index) => {
                
                // UX: Keine Ampelfarben. Urgency wird durch den Rahmen und den fetten blauen Button erzeugt.
                const isUrgent = practice.planStatus === 'empty' && index === 0;
                
                return (
                  <div 
                    key={practice.id} 
                    className={`group flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-3xl border transition-all duration-300 ${
                      isUrgent 
                        ? 'bg-white border-[#1E5AA8]/30 shadow-[0_12px_30px_rgba(30,90,168,0.08)]' 
                        : 'bg-white border-slate-200/80 shadow-sm hover:border-[#1E5AA8]/20'
                    }`}
                  >
                    
                    <div className="flex items-center gap-6">
                      {/* Datum (Klar strukturiert) */}
                      <div className="w-20 shrink-0 text-center">
                        <p className={`text-[12px] font-bold uppercase tracking-widest ${isUrgent ? 'text-[#1E5AA8]' : 'text-slate-400'}`}>
                          {practice.date}
                        </p>
                        <p className="text-[14px] text-[#0B1F3A] font-bold mt-0.5">{practice.time.split(' - ')[0]}</p>
                      </div>

                      <div className="w-px h-12 bg-slate-100 hidden sm:block" />

                      {/* Content mit Progressive Disclosure (Ort leicht zurückgenommen) */}
                      <div className="py-1">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md ${
                            isUrgent ? 'bg-[#EEF3F8] text-[#1E5AA8]' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {practice.team}
                          </span>
                          <h3 className="font-bold text-[16px] text-[#0B1F3A]">{practice.type}</h3>
                        </div>
                        
                        <div className="flex items-center gap-3 text-[13px] text-slate-400 font-medium">
                          <span className="flex items-center gap-1.5 group-hover:text-slate-600 transition-colors">
                            <MapPin size={14} className={isUrgent ? 'text-[#1E5AA8]/70' : 'text-slate-300'} /> {practice.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Area (Nur Form und 1 Akzentfarbe) */}
                    <div className="mt-5 sm:mt-0 pt-5 sm:pt-0 border-t sm:border-t-0 border-slate-100 flex items-center shrink-0">
                      
                      {practice.planStatus === 'empty' && (
                        <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1E5AA8] hover:bg-[#0B1F3A] text-white rounded-xl text-[13px] font-bold transition-all shadow-lg shadow-[#1E5AA8]/20 active:scale-95">
                          <AlertCircle size={16} /> Plan erstellen
                        </button>
                      )}
                      
                      {practice.planStatus === 'draft' && (
                        <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-[#EEF3F8] hover:bg-[#1E5AA8] hover:text-white text-[#1E5AA8] rounded-xl text-[13px] font-bold transition-all">
                          <FileText size={16} /> Entwurf öffnen
                        </button>
                      )}
                      
                      {practice.planStatus === 'ready' && (
                        <div className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-50 text-slate-400 rounded-xl text-[13px] font-bold border border-slate-100">
                          <CheckCircle2 size={16} /> Plan bereit
                        </div>
                      )}

                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 2. CONTINUE WATCHING (Im edlen Dark-Mode-Design der Titans) */}
          <section>
            <div className="flex items-center gap-2 mb-5">
              <PlayCircle size={18} className="text-[#1E5AA8]" />
              <h2 className="font-montserrat font-bold text-[16px] text-[#0B1F3A] uppercase tracking-wide">
                Weiterlernen
              </h2>
            </div>
            
            <div className="bg-[#0B1F3A] rounded-3xl shadow-[0_12px_30px_rgba(11,31,58,0.15)] p-5 flex gap-5 items-center cursor-pointer relative overflow-hidden group">
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#1E5AA8] opacity-20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />

              <div className="relative w-40 h-24 rounded-2xl overflow-hidden shrink-0 bg-black z-10 border border-white/10">
                <img src="https://images.unsplash.com/photo-1519861531473-9200260768bf?q=80&w=800&auto=format&fit=crop" alt="Thumbnail" className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 group-hover:bg-[#6DB7FF] group-hover:border-transparent transition-all shadow-lg">
                    <Play size={16} className="fill-current ml-0.5" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col flex-1 z-10">
                <p className="text-[10px] font-bold text-[#6DB7FF] uppercase tracking-widest mb-1.5">Taktik Clinic</p>
                <h3 className="font-bold text-[16px] text-white leading-snug mb-4 group-hover:text-[#6DB7FF] transition-colors">
                  CLA: Constraints-Led Approach in der Defense
                </h3>
                
                {/* Progress Bar (Titans Style) */}
                <div className="w-full max-w-md">
                  <div className="flex justify-between text-[11px] font-bold text-slate-400 mb-2">
                    <span className="text-white">65% abgeschlossen</span>
                    <span>12 Min verbleibend</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#6DB7FF] rounded-full relative">
                      <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/30" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. INSPIRATION FEED (Die klassische Titans Karten-Ästhetik) */}
          <section>
            <div className="flex items-center gap-2 mb-5">
              <Play size={18} className="text-[#1E5AA8] fill-[#1E5AA8]" />
              <h2 className="font-montserrat font-bold text-[16px] text-[#0B1F3A] uppercase tracking-wide">
                Neu in der Vault
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {NEW_THIS_WEEK.map((drill) => (
                <div key={drill.id} className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-[0_12px_24px_rgba(11,31,58,0.06)] hover:border-[#1E5AA8]/30 transition-all cursor-pointer">
                  
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                    <img src={drill.image} alt={drill.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"/>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 group-hover:bg-[#1E5AA8] group-hover:border-transparent transition-all transform group-hover:scale-110 shadow-lg">
                        <Play size={20} className="fill-white ml-1" />
                      </div>
                    </div>
                    <button className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-white/70 hover:text-white bg-black/40 hover:bg-[#1E5AA8] rounded-lg backdrop-blur-md transition-all opacity-0 group-hover:opacity-100">
                      <Bookmark size={16} />
                    </button>
                    <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white text-[11px] font-bold px-2 py-1 rounded-md">
                      {drill.duration}
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-[#EEF3F8] text-[#1E5AA8] uppercase tracking-wider">
                        {drill.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-[15px] text-[#0B1F3A] leading-snug group-hover:text-[#1E5AA8] transition-colors">
                      {drill.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* =========================================
            RECHTE SPALTE (Spannweite 4) - Analytics & Orga
        ========================================= */}
        <div className="xl:col-span-4 flex flex-col gap-8">
          
          {/* 4. PREATTENTIVE PROCESSING (Balkendiagramm, edel verpackt) */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_8px_24px_rgba(11,31,58,0.04)] p-7">
            <h3 className="font-montserrat font-bold text-[14px] text-[#0B1F3A] uppercase tracking-wide flex items-center gap-2 mb-8">
              <BarChart3 size={18} className="text-[#1E5AA8]" /> Belastungssteuerung
            </h3>
            
            <div className="flex items-end justify-between h-32 gap-3 mb-6 border-b border-slate-100 pb-3">
              {MONTHLY_LOAD.map((data, i) => {
                const heightPercentage = (data.hours / data.max) * 100;
                const isCurrentWeek = i === 2; // W3 ist aktuell
                return (
                  <div key={data.week} className="flex flex-col items-center flex-1 gap-2 group cursor-crosshair">
                    {/* Tooltip (Progressive Disclosure) */}
                    <span className="text-[11px] font-bold text-[#1E5AA8] opacity-0 group-hover:opacity-100 transition-opacity">
                      {data.hours}h
                    </span>
                    {/* Balken (Schnelle visuelle Erfassung) */}
                    <div className="w-full max-w-[36px] h-full bg-[#EEF3F8] rounded-t-xl flex items-end overflow-hidden relative">
                      <div 
                        className={`w-full rounded-t-xl transition-all duration-1000 ${
                          isCurrentWeek ? 'bg-[#1E5AA8] shadow-inner' : 'bg-slate-300'
                        }`} 
                        style={{ height: `${heightPercentage}%` }}
                      />
                    </div>
                    <span className={`text-[12px] font-bold ${isCurrentWeek ? 'text-[#0B1F3A]' : 'text-slate-400'}`}>
                      {data.week}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
              Dein Pensum in Woche 3 liegt aktuell bei <strong className="text-[#0B1F3A]">8 Stunden</strong> auf dem Court.
            </p>
          </div>

          {/* 5. EMPTY STATE (Sauber integriert in die Titans-Ästhetik) */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_8px_24px_rgba(11,31,58,0.04)] p-7 flex flex-col flex-1 min-h-[250px]">
            <h3 className="font-montserrat font-bold text-[14px] text-[#0B1F3A] uppercase tracking-wide flex items-center gap-2 mb-2">
              <FileText size={18} className="text-[#1E5AA8]" /> Offene Entwürfe
            </h3>
            
            {isLoading ? (
              // Loading Skeleton
              <div className="space-y-4 animate-pulse mt-6">
                <div className="h-12 bg-slate-50 rounded-2xl w-full border border-slate-100" />
                <div className="h-12 bg-slate-50 rounded-2xl w-3/4 border border-slate-100" />
              </div>
            ) : recentDrafts.length > 0 ? (
              <div>{/* Content */}</div>
            ) : (
              // Der stylische Empty State
              <div className="flex-1 flex flex-col items-center justify-center text-center mt-4">
                <div className="w-16 h-16 bg-[#EEF3F8] rounded-full flex items-center justify-center mb-4 border border-[#1E5AA8]/10">
                  <Inbox size={24} className="text-[#1E5AA8]" />
                </div>
                <p className="text-[15px] font-bold text-[#0B1F3A] mb-1.5">Alles erledigt!</p>
                <p className="text-[13px] text-slate-500 max-w-[200px] leading-relaxed">
                  Du hast aktuell keine unfertigen Trainingspläne auf dem Schreibtisch.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}