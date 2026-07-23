"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react'; // <-- WICHTIG: useState importiert
import { 
  LayoutDashboard, FolderOpen, Users, BookOpen, PlayCircle, BarChart2, 
  Activity, Dumbbell, Tv, PieChart, PenTool, GraduationCap, Calendar, 
  BookMarked, Cpu, Video, Target, Flame, PlusCircle, Settings
} from 'lucide-react';

// <-- WICHTIG: Wir importieren unser neues Modal
import SubmitContentModal from './SubmitContentModal'; 

export default function Sidebar() {
  const pathname = usePathname();
  
  // <-- WICHTIG: Dieser State steuert, ob das Modal sichtbar ist
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false); 

  const NavItem = ({ icon, label, href, disabled = false, soon = false }: { 
    icon: React.ReactNode, label: string, href: string, disabled?: boolean, soon?: boolean 
  }) => {
    const active = pathname === href;
    
    if (disabled || soon) {
      return (
        <div className="flex items-center justify-between px-3 py-2 text-slate-500 font-medium text-[13px] opacity-60 cursor-not-allowed select-none">
          <div className="flex items-center gap-3">
            <div className="text-slate-600">{icon}</div>
            <span>{label}</span>
          </div>
          {soon && (
            <span className="text-[9px] font-bold bg-[#1C2430] text-slate-400 px-1.5 py-0.5 rounded tracking-widest uppercase">
              Soon
            </span>
          )}
        </div>
      );
    }

    return (
      <Link 
        href={href}
        className={`group relative flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 font-medium text-[13px] active:scale-[0.98]
          ${active 
            ? 'bg-[#1E5AA8]/10 text-[#6DB7FF]' 
            : 'text-slate-400 hover:text-slate-200 hover:bg-[#1C2430]/60'
          }
        `}
      >
        {active && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#6DB7FF] rounded-r-md shadow-[0_0_8px_rgba(109,183,255,0.4)]" />
        )}
        
        <div className={`${active ? 'text-[#6DB7FF]' : 'text-slate-500 group-hover:text-slate-300'} transition-colors`}>
          {icon}
        </div>
        <span className="truncate tracking-wide">{label}</span>
      </Link>
    );
  };

  return (
    <>
      <aside className="fixed inset-y-0 left-0 w-64 bg-[#0B1F3A] text-slate-300 flex flex-col z-20 border-r border-[#1C2430] shadow-[4px_0_24px_rgba(11,31,58,0.2)]">
        
        <div className="h-16 flex items-center px-6 justify-between bg-[#0B1F3A]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#1E5AA8] to-[#0B1F3A] rounded-md flex items-center justify-center font-bold font-montserrat text-sm text-white shadow-inner border border-white/10">
              T
            </div>
            <span className="font-montserrat font-bold tracking-[0.15em] text-[14px] text-white mt-0.5">
              COACHES HUB
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-5 px-4 space-y-7 scrollbar-hide">
          <nav className="space-y-1">
            <NavItem href="/" icon={<LayoutDashboard size={18} />} label="Dashboard" />
            <NavItem href="/resources" icon={<BookOpen size={18} />} label="Resources" />
          </nav>

          <div>
            <h3 className="px-3 text-[10px] font-bold text-slate-500/70 uppercase tracking-widest mb-3 flex items-center gap-2">
              Player Development/Team Training
            </h3>
            <nav className="space-y-1">
              <NavItem href="/player-dev/drills" icon={<PlayCircle size={18} />} label="Drills & Games" />
              <NavItem href="/player-dev/movement" icon={<Activity size={18} />} label="Movement Drills" />
              <NavItem href="/player-dev/workouts" icon={<Dumbbell size={18} />} label="Workout Examples" />
            </nav>
          </div>

          

          <nav className="space-y-1">
            <h3 className="px-3 text-[10px] font-bold text-slate-500/70 uppercase tracking-widest mb-3 flex items-center gap-2">
              Fortbildungen
            </h3>
            <NavItem href="/masterclasses" icon={<GraduationCap size={18} />} label="Masterclasses" />
          </nav>

          <div>
            <h3 className="px-3 text-[10px] font-bold text-slate-500/70 uppercase tracking-widest mb-3 flex items-center gap-2">
              Toolbox
            </h3>
            <nav className="space-y-1">
              <NavItem href="/toolbox/plans" icon={<Calendar size={18} />} label="Training Plans" />
            </nav>
          </div>
        </div>

        <div className="p-5 border-t border-[#1C2430] bg-[#0B1F3A]/95 backdrop-blur-md space-y-3">
          
          {/* <-- WICHTIG: Hier triggern wir das Modal beim Klicken */}
          <button 
            onClick={() => setIsSubmitModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-[#1C2430]/50 hover:bg-[#1C2430] border border-dashed border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white rounded-lg text-[13px] font-semibold transition-all active:scale-[0.98]"
          >
            <PlusCircle size={16} />
            <span>Submit Content</span>
          </button>

          <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[#1C2430] transition-colors text-left group">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-md bg-[#1E5AA8] flex items-center justify-center text-[13px] font-bold text-white shrink-0 shadow-sm">
                SL
              </div>
              <div className="truncate">
                <p className="text-[13.5px] font-semibold text-white leading-none mb-1.5 truncate group-hover:text-[#6DB7FF] transition-colors">Steve Lang</p>
                <p className="text-[11px] text-slate-400 leading-none truncate">U14 Headcoach</p>
              </div>
            </div>
            <Settings size={18} className="text-slate-500 shrink-0 group-hover:text-white transition-colors animate-spin-slow-hover" />
          </button>
        </div>
      </aside>

      {/* <-- WICHTIG: Das Modal wird ganz am Ende eingefügt */}
      <SubmitContentModal 
        isOpen={isSubmitModalOpen} 
        onClose={() => setIsSubmitModalOpen(false)} 
      />
    </>
  );
}