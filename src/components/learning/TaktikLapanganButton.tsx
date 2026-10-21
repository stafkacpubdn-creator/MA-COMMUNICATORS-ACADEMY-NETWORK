import React, { useState } from 'react';
import {
  Sparkles,
  Maximize2,
  ChevronRight,
  Layers,
  HelpCircle,
  Eye,
  CheckCircle2,
  Zap,
  Swords,
} from 'lucide-react';
import { InfografisTaktikModal } from './InfografisTaktikModal';

interface TaktikLapanganButtonProps {
  className?: string;
}

export const TaktikLapanganButton: React.FC<TaktikLapanganButtonProps> = ({
  className = '',
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className={`flex flex-col sm:flex-row items-center justify-between gap-4 p-4 md:p-5 rounded-3xl bg-gradient-to-r from-indigo-950/50 via-[#101e40]/60 to-slate-900/50 border border-indigo-500/30 shadow-lg shadow-indigo-950/20 ${className}`}
      >
        {/* Left Info Section */}
        <div className="flex items-center space-x-3.5">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden shrink-0 border-2 border-indigo-400/60 shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:shadow-[0_0_25px_rgba(99,102,241,0.8)] transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none cursor-pointer bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white"
            title="Klik untuk membuka Infografis 8 Taktik Komunikasi Lapangan"
          >
            <Zap className="w-6 h-6 text-amber-300 group-hover:scale-125 transition-transform" />
            <div className="absolute inset-0 bg-indigo-400/10 group-hover:bg-transparent transition-colors" />
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-400 block">
                Infografis Taktis Lapangan • Stair KPI B
              </span>
              <span className="text-[9px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 px-1.5 py-0.5 rounded-full font-mono font-bold flex items-center space-x-1">
                <Sparkles className="w-2.5 h-2.5" />
                <span>8 Taktik Interaktif</span>
              </span>
            </div>
            <h4 className="text-sm md:text-base font-black text-white flex items-center space-x-1.5">
              <span>Bagan 8 Taktik Komunikasi Lapangan & Objection Handling</span>
            </h4>
            <p className="text-[11px] text-slate-400 line-clamp-1 sm:line-clamp-none">
              Klik icon button di samping untuk membuka panduan taktis rebuttal 5 detik, teknik Feel-Felt-Found, dan penutupan janji temu silaturahmi.
            </p>
          </div>
        </div>

        {/* 3D Glossy Indigo/Purple Button */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="group relative inline-flex items-center justify-center shrink-0 transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
            title="Buka Infografis 8 Taktik Komunikasi Lapangan"
          >
            {/* Ambient Pulsing Glow behind button */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-60 blur-md group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
            {/* 3D Button Container */}
            <div className="relative px-6 md:px-8 py-3 md:py-3.5 rounded-full bg-gradient-to-b from-[#6366f1] via-[#4f46e5] to-[#312e81] border-4 border-[#1e1b4b] shadow-[0_6px_0_#1e1b4b,0_10px_20px_rgba(0,0,0,0.5)] group-active:shadow-[0_2px_0_#1e1b4b,0_4px_10px_rgba(0,0,0,0.5)] group-active:translate-y-1 transition-all overflow-hidden flex items-center justify-center space-x-2.5">
              {/* Glossy Top Glass Reflection */}
              <div className="absolute top-0 left-2 right-2 h-[45%] rounded-t-full bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
              {/* Inner Stroke */}
              <div className="absolute inset-1 rounded-full border border-indigo-200/50 pointer-events-none" />
              {/* Icon */}
              <div className="relative z-10 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white shadow-inner">
                <Zap className="w-3.5 h-3.5 text-amber-300" />
              </div>
              {/* Text */}
              <span className="relative z-10 font-black tracking-wider text-white text-xs md:text-sm uppercase drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)]">
                TAKTIK LAPANGAN
              </span>
              <Maximize2 className="relative z-10 w-4 h-4 text-indigo-100 group-hover:scale-110 transition-transform" />
            </div>
          </button>
        </div>
      </div>

      {isModalOpen && (
        <InfografisTaktikModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};
