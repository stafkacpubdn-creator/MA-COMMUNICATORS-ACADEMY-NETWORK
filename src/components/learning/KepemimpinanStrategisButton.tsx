import React, { useState } from 'react';
import {
  Sparkles,
  Maximize2,
  ChevronRight,
  Layers,
  Crown,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { InfografisKepemimpinanModal } from './InfografisKepemimpinanModal';

interface KepemimpinanStrategisButtonProps {
  className?: string;
}

export const KepemimpinanStrategisButton: React.FC<KepemimpinanStrategisButtonProps> = ({
  className = '',
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className={`flex flex-col sm:flex-row items-center justify-between gap-4 p-4 md:p-5 rounded-3xl bg-gradient-to-r from-purple-950/50 via-[#1e1338]/60 to-slate-900/50 border border-purple-500/30 shadow-lg shadow-purple-950/20 ${className}`}
      >
        {/* Left Info Section */}
        <div className="flex items-center space-x-3.5">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden shrink-0 border-2 border-amber-400/60 shadow-[0_0_15px_rgba(251,191,36,0.4)] hover:shadow-[0_0_25px_rgba(251,191,36,0.8)] transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none cursor-pointer bg-gradient-to-tr from-purple-700 via-purple-600 to-amber-500 flex items-center justify-center text-white"
            title="Klik untuk membuka Infografis Arsitektur Narasi & Kepemimpinan Show How"
          >
            <Crown className="w-6 h-6 text-amber-300 group-hover:scale-125 transition-transform" />
            <div className="absolute inset-0 bg-purple-400/10 group-hover:bg-transparent transition-colors" />
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 block">
                Infografis Strategis • Roof KPI C
              </span>
              <span className="text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1.5 py-0.5 rounded-full font-mono font-bold flex items-center space-x-1">
                <Sparkles className="w-2.5 h-2.5" />
                <span>Kepemimpinan Show How</span>
              </span>
            </div>
            <h4 className="text-sm md:text-base font-black text-white flex items-center space-x-1.5">
              <span>Bagan Arsitektur Narasi Strategis & Manajemen Resolusi Krisis</span>
            </h4>
            <p className="text-[11px] text-slate-400 line-clamp-1 sm:line-clamp-none">
              Klik icon button di samping untuk membuka panduan de-eskalasi krisis 60 menit, coaching GROW kader yunior, dan diplomasi pemangku kepentingan.
            </p>
          </div>
        </div>

        {/* 3D Glossy Purple/Gold Button */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="group relative inline-flex items-center justify-center shrink-0 transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
            title="Buka Infografis Kepemimpinan Show How"
          >
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500 via-amber-500 to-yellow-400 opacity-60 blur-md group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
            <div className="relative px-6 md:px-8 py-3 md:py-3.5 rounded-full bg-gradient-to-b from-[#a855f7] via-[#7e22ce] to-[#4c1d95] border-4 border-[#3b0764] shadow-[0_6px_0_#3b0764,0_10px_20px_rgba(0,0,0,0.5)] group-active:shadow-[0_2px_0_#3b0764,0_4px_10px_rgba(0,0,0,0.5)] group-active:translate-y-1 transition-all overflow-hidden flex items-center justify-center space-x-2.5">
              <div className="absolute top-0 left-2 right-2 h-[45%] rounded-t-full bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
              <div className="absolute inset-1 rounded-full border border-purple-200/50 pointer-events-none" />
              <div className="relative z-10 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white shadow-inner">
                <Crown className="w-3.5 h-3.5 text-amber-300" />
              </div>
              <span className="relative z-10 font-black tracking-wider text-white text-xs md:text-sm uppercase drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)]">
                KEPEMIMPINAN SHOW HOW
              </span>
              <Maximize2 className="relative z-10 w-4 h-4 text-purple-100 group-hover:scale-110 transition-transform" />
            </div>
          </button>
        </div>
      </div>

      {isModalOpen && (
        <InfografisKepemimpinanModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};
