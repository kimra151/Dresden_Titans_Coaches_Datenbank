"use client";

import { useState } from 'react';
import { 
  Calendar, GripVertical, Clock, Save, Share2, Plus, 
  Trash2, FileDown, Zap, ShieldAlert, Target, Activity, Printer,
  Layers, RefreshCw
} from 'lucide-react';

// --- MOCK DATA & TYPES ---
type BlockType = 'warmup' | 'cla' | 'skill' | 'tactics' | 'athletics' | 'cool_down';

interface PlanBlock {
  id: string;
  type: BlockType;
  title: string;
  duration: number; // in Minuten
  notes: string;
  constraint?: string;
}

const PALETTE_BLOCKS: { type: BlockType; label: string; icon: any; color: string; bg: string; defaultMins: number }[] = [
  { type: 'warmup', label: 'Activation & Warmup', icon: Activity, color: 'text-orange-500', bg: 'bg-orange-100', defaultMins: 15 },
  { type: 'cla', label: 'CLA / Small-Sided Game', icon: Zap, color: 'text-emerald-500', bg: 'bg-emerald-100', defaultMins: 20 },
  { type: 'skill', label: 'Player Development', icon: Target, color: 'text-[#1E5AA8]', bg: 'bg-[#EEF3F8]', defaultMins: 15 },
  { type: 'tactics', label: 'Team Tactics (5v5)', icon: Layers, color: 'text-purple-500', bg: 'bg-purple-100', defaultMins: 20 },
  { type: 'athletics', label: 'Conditioning / Load', icon: ShieldAlert, color: 'text-red-500', bg: 'bg-red-100', defaultMins: 10 },
  { type: 'cool_down', label: 'Spaced Repetition Review', icon: RefreshCw, color: 'text-slate-500', bg: 'bg-slate-200', defaultMins: 10 },
];

export default function PracticeBuilder() {
  const [planTitle, setPlanTitle] = useState("U14 Game Prep - Fokus Transition");
  const [blocks, setBlocks] = useState<PlanBlock[]>([]);

  // Berechnet die Gesamtzeit dynamisch
  const totalMinutes = blocks.reduce((acc, block) => acc + block.duration, 0);

  const addBlock = (paletteItem: typeof PALETTE_BLOCKS[0]) => {
    const newBlock: PlanBlock = {
      id: Math.random().toString(36).substr(2, 9),
      type: paletteItem.type,
      title: paletteItem.label,
      duration: paletteItem.defaultMins,
      notes: '',
      constraint: '',
    };
    setBlocks([...blocks, newBlock]);
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  const updateBlock = (id: string, field: keyof PlanBlock, value: any) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, [field]: value } : b));
  };

  const loadTemplate = () => {
    setBlocks([
      { id: '1', type: 'warmup', title: 'Dynamic Warmup & Ballhandling', duration: 15, notes: 'Fokus auf tiefe Haltung' },
      { id: '2', type: 'cla', title: '3v3 No Dribble (CLA)', duration: 20, notes: 'Spacing halten', constraint: 'Max 2 Pässe vor Abschluss' },
      { id: '3', type: 'tactics', title: 'Transition Offense 5v0', duration: 15, notes: 'Laufwege festigen' },
      { id: '4', type: 'cool_down', title: 'Active Recall Session', duration: 10, notes: 'Whiteboard: Was waren die 3 Prinzipien im 3v3?' },
    ]);
  };

  return (
    <div className="max-w-[1400px] mx-auto pb-16 animate-in fade-in duration-500">
      
      {/* --- HEADER --- */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-[#1E5AA8]/10 flex items-center justify-center text-[#1E5AA8] shadow-sm">
              <Calendar size={24} strokeWidth={2.5} />
            </div>
            <h1 className="font-montserrat font-bold text-3xl text-[#0B1F3A] uppercase tracking-tight">
              Practice Builder
            </h1>
          </div>
          <p className="text-slate-500 text-[15px] ml-16 max-w-2xl leading-relaxed">
            Drag & Drop Methodik-Blöcke auf deinen Plan, setze Constraints und exportiere die Einheit direkt aufs Tablet.
          </p>
        </div>
        
        {/* Global Actions */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors font-semibold text-[13px] shadow-sm active:scale-95">
            <Printer size={16} /> Print
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#0B1F3A] text-white rounded-xl hover:bg-[#1E5AA8] transition-colors font-bold text-[13px] shadow-lg shadow-[#0B1F3A]/20 active:scale-95">
            <Save size={16} /> Save Plan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* --- LEFT: PALETTE (Sticky) --- */}
        <div className="xl:col-span-4 bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sticky top-24">
          <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-5">
            Building Blocks
          </h3>
          
          <div className="space-y-3 mb-8">
            {PALETTE_BLOCKS.map(block => (
              <button 
                key={block.type}
                onClick={() => addBlock(block)}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200/60 hover:border-[#1E5AA8]/40 hover:shadow-sm hover:bg-slate-50 transition-all group active:scale-[0.98]"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${block.bg} ${block.color}`}>
                    <block.icon size={16} />
                  </div>
                  <span className="font-semibold text-[#0B1F3A] text-[14px]">{block.label}</span>
                </div>
                <Plus size={18} className="text-slate-300 group-hover:text-[#1E5AA8] transition-colors" />
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-100">
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">
              Quick Templates
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={loadTemplate} className="py-3 px-2 bg-slate-50 hover:bg-[#EEF3F8] text-[#1E5AA8] font-bold text-[12px] rounded-xl border border-slate-200 hover:border-[#1E5AA8]/30 transition-colors text-center leading-tight">
                U14 Game Prep <br/><span className="font-medium text-slate-500">90 Min</span>
              </button>
              <button className="py-3 px-2 bg-slate-50 hover:bg-[#EEF3F8] text-[#1E5AA8] font-bold text-[12px] rounded-xl border border-slate-200 hover:border-[#1E5AA8]/30 transition-colors text-center leading-tight">
                Skill Focus <br/><span className="font-medium text-slate-500">60 Min</span>
              </button>
            </div>
          </div>
        </div>

        {/* --- RIGHT: THE CANVAS --- */}
        <div className="xl:col-span-8 bg-white rounded-3xl border border-slate-200/80 shadow-[0_8px_30px_rgba(11,31,58,0.04)] overflow-hidden flex flex-col min-h-[600px]">
          
          {/* Canvas Header */}
          <div className="bg-[#0B1F3A] p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1">
              <input 
                type="text" 
                value={planTitle}
                onChange={(e) => setPlanTitle(e.target.value)}
                className="w-full bg-transparent text-2xl font-montserrat font-bold focus:outline-none focus:ring-2 focus:ring-[#6DB7FF]/50 rounded-lg px-2 py-1 -ml-2 transition-all placeholder:text-white/50"
                placeholder="Name deines Plans..."
              />
            </div>
            
            <div className="flex items-center gap-6 shrink-0 bg-white/10 px-5 py-2.5 rounded-xl backdrop-blur-sm">
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-0.5">Blocks</span>
                <span className="font-bold text-[16px] leading-none">{blocks.length}</span>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-0.5">Total Time</span>
                {/* Dynamische Farbe: Wenn über 90 Minuten, wird es orange als Warnung */}
                <span className={`font-bold text-[16px] leading-none flex items-center gap-1.5 ${totalMinutes > 90 ? 'text-orange-400' : 'text-[#6DB7FF]'}`}>
                  <Clock size={16} /> {totalMinutes} Min
                </span>
              </div>
            </div>
          </div>

          {/* Canvas Body */}
          <div className="flex-1 bg-slate-50/50 p-6 sm:p-8 overflow-y-auto">
            {blocks.length === 0 ? (
              
              /* Empty State */
              <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-in zoom-in-95 duration-500">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-sm">
                  <FileDown size={32} className="text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-[#0B1F3A] mb-2">Dein Plan ist leer</h3>
                <p className="text-slate-500 max-w-sm mb-8 leading-relaxed">
                  Klicke auf die Bausteine in der linken Palette, um dein Training aufzubauen, oder starte mit einem vorgefertigten Template.
                </p>
                <button 
                  onClick={loadTemplate}
                  className="px-6 py-3 bg-[#EEF3F8] text-[#1E5AA8] font-bold rounded-xl hover:bg-[#1E5AA8] hover:text-white transition-colors"
                >
                  U14 Template laden
                </button>
              </div>

            ) : (
              
              /* Filled State (Timeline) */
              <div className="space-y-4">
                {blocks.map((block, index) => {
                  const paletteRef = PALETTE_BLOCKS.find(p => p.type === block.type)!;
                  
                  return (
                    <div key={block.id} className="group flex gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#1E5AA8]/30 transition-all">
                      
                      {/* Drag Handle & Icon */}
                      <div className="flex flex-col items-center gap-3 shrink-0 pt-1">
                        <GripVertical size={20} className="text-slate-300 cursor-grab active:cursor-grabbing hover:text-slate-500" />
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${paletteRef.bg} ${paletteRef.color}`}>
                          <paletteRef.icon size={20} />
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="flex-1 flex flex-col gap-3">
                        <div className="flex items-start justify-between gap-4">
                          <input 
                            type="text"
                            value={block.title}
                            onChange={(e) => updateBlock(block.id, 'title', e.target.value)}
                            className="flex-1 font-bold text-[16px] text-[#0B1F3A] outline-none border-b border-transparent focus:border-[#6DB7FF] bg-transparent transition-colors px-1 -ml-1"
                          />
                          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 focus-within:border-[#1E5AA8] transition-colors">
                            <Clock size={14} className="text-slate-400" />
                            <input 
                              type="number" 
                              value={block.duration}
                              onChange={(e) => updateBlock(block.id, 'duration', parseInt(e.target.value) || 0)}
                              className="w-10 text-center text-[14px] font-bold text-[#0B1F3A] bg-transparent outline-none"
                            />
                            <span className="text-[12px] font-medium text-slate-500">Min</span>
                          </div>
                        </div>

                        <input 
                          type="text"
                          placeholder="Trainingsschwerpunkt oder Notizen..."
                          value={block.notes}
                          onChange={(e) => updateBlock(block.id, 'notes', e.target.value)}
                          className="w-full text-[13px] text-slate-600 outline-none border border-transparent focus:border-slate-200 focus:bg-slate-50 rounded-lg px-3 py-2 transition-colors placeholder:text-slate-300"
                        />

                        {/* CLA Specific: Constraint Input */}
                        {(block.type === 'cla' || block.constraint !== undefined) && (
                          <div className="flex items-center gap-2 text-[12px]">
                            <Zap size={14} className="text-emerald-500 shrink-0" />
                            <span className="font-bold text-slate-500 uppercase tracking-wider">Constraint:</span>
                            <input 
                              type="text"
                              placeholder="z.B. Nur schwache Hand, max 3 Sekunden Ballhalten..."
                              value={block.constraint || ''}
                              onChange={(e) => updateBlock(block.id, 'constraint', e.target.value)}
                              className="flex-1 font-medium text-slate-700 outline-none border-b border-dashed border-slate-300 focus:border-emerald-400 bg-transparent"
                            />
                          </div>
                        )}
                      </div>

                      {/* Delete Action */}
                      <button 
                        onClick={() => removeBlock(block.id)}
                        className="opacity-0 group-hover:opacity-100 shrink-0 pt-2 text-slate-300 hover:text-red-500 transition-all"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}