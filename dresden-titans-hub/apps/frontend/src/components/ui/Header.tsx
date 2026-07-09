"use client";

import { Search, Bell, Sun, HelpCircle, ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  
  const pathSegments = pathname.split('/').filter(Boolean);
  const currentPage = pathSegments.length > 0 
    ? pathSegments[pathSegments.length - 1].replace('-', ' ') 
    : 'Dashboard';
    
  const formattedPageName = currentPage.charAt(0).toUpperCase() + currentPage.slice(1);

  return (
    <header className="h-16 bg-white/85 backdrop-blur-md border-b border-slate-200/70 flex items-center justify-between px-8 sticky top-0 z-10 transition-all">
      
      <nav className="flex items-center text-[13px] font-semibold text-slate-400">
        <span className="hover:text-slate-600 cursor-pointer transition-colors">Vault</span>
        <ChevronRight size={14} className="mx-2 text-slate-300" />
        <div className="bg-[#EEF3F8] text-[#0B1F3A] px-2.5 py-1.5 rounded-md shadow-sm">
          {formattedPageName}
        </div>
      </nav>

      <div className="flex items-center gap-4">
        
        <div className="relative group flex items-center">
          <Search size={16} className="absolute left-3 text-slate-400 group-focus-within:text-[#1E5AA8] transition-colors pointer-events-none" />
          <input 
            type="text" 
            placeholder="Search anything... (Press ⌘K)" 
            className="w-[280px] pl-9 pr-4 py-2 bg-[#EEF3F8]/60 hover:bg-[#EEF3F8] border border-transparent focus:bg-white focus:border-[#6DB7FF] focus:ring-4 focus:ring-[#6DB7FF]/15 rounded-lg text-[13px] font-medium outline-none transition-all placeholder:text-slate-400 text-slate-700"
          />
        </div>

        <div className="h-5 w-px bg-slate-200 mx-1" />

        <div className="flex items-center gap-1.5">
          <button className="relative p-2.5 text-slate-400 hover:text-[#0B1F3A] hover:bg-slate-100 rounded-lg transition-all active:scale-95">
            <Bell size={18} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          
          <button className="p-2.5 text-slate-400 hover:text-[#0B1F3A] hover:bg-slate-100 rounded-lg transition-all active:scale-95">
            <Sun size={18} />
          </button>

          <button className="p-2.5 text-slate-400 hover:text-[#0B1F3A] hover:bg-slate-100 rounded-lg transition-all active:scale-95">
            <HelpCircle size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}