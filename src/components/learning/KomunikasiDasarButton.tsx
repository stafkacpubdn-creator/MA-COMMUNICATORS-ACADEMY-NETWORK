import React, { useState } from 'react';
import {
  Sparkles,
  Maximize2,
  ChevronRight,
  Layers,
  HelpCircle,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import { InfografisKomunikasiModal } from './InfografisKomunikasiModal';

interface KomunikasiDasarButtonProps {
  className?: string;
}

export const KomunikasiDasarButton: React.FC<KomunikasiDasarButtonProps> = ({
  className = '',
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className={`flex flex-col sm:flex-row items-center justify-between gap-4 p-4 md:p-5 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-[#0b213b]/50 to-slate-900/40 border border-cyan-500/30 shadow-lg shadow-cyan-950/20 ${className}`}
      >
        {/* Left Info Section */}
        <div className="flex items-center space-x-3.5">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden shrink-0 border-2 border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.8)] transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none cursor-pointer bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white"
            title="Klik untuk membuka Infografis 6 Keterampilan Komunikasi Dasar"
          >
            <Layers className="w-6 h-6 text-cyan-200 group-hover:scale-125 transition-transform" />
            <div className="absolute inset-0 bg-cyan-400/10 group-hover:bg-transparent transition-colors" />
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-400 block">
                Infografis Referensi Visual • 6 Keterampilan
              </span>
              <span className="text-[9px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-1.5 py-0.5 rounded-full font-mono font-bold flex items-center space-x-1">
                <Sparkles className="w-2.5 h-2.5" />
                <span>Interaktif</span>
              </span>
            </div>
            <h4 className="text-sm md:text-base font-black text-white flex items-center space-x-1.5">
              <span>Bagan 6 Keterampilan Komunikasi Dasar</span>
            </h4>
            <p className="text-[11px] text-slate-400 line-clamp-1 sm:line-clamp-none">
              Klik icon button di samping untuk membuka infografis lengkap 6 keterampilan esensial (Listening, Verbal, Non-Verbal, Clarity, Empathy, Feedback).
            </p>
          </div>
        </div>

        {/* 3D Glossy Cyan/Neon Animated Button */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="group relative inline-flex items-center justify-center shrink-0 transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
            title="Buka Infografis 6 Keterampilan Komunikasi Dasar"
          >
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-500 opacity-60 blur-md group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
            <div className="relative px-6 md:px-8 py-3 md:py-3.5 rounded-full bg-gradient-to-b from-[#00d2ff] via-[#0088cc] to-[#004f80] border-4 border-[#002f52] shadow-[0_6px_0_#00213a,0_10px_20px_rgba(0,0,0,0.5)] group-active:shadow-[0_2px_0_#00213a,0_4px_10px_rgba(0,0,0,0.5)] group-active:translate-y-1 transition-all overflow-hidden flex items-center justify-center space-x-2.5">
              <div className="absolute top-0 left-2 right-2 h-[45%] rounded-t-full bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
              <div className="absolute inset-1 rounded-full border border-cyan-200/50 pointer-events-none" />
              <div className="relative z-10 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white shadow-inner">
                <Layers className="w-3.5 h-3.5" />
              </div>
              <span className="relative z-10 font-black tracking-wider text-white text-xs md:text-sm uppercase drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)]">
                KOMUNIKASI DASAR
              </span>
              <Maximize2 className="relative z-10 w-4 h-4 text-cyan-100 group-hover:scale-110 transition-transform" />
            </div>
          </button>
        </div>
      </div>

      {isModalOpen && (
        <InfografisKomunikasiModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};
