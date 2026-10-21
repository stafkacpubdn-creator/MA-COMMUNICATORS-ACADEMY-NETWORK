import React, { useState } from 'react';
import { BookOpen, Maximize2, ShieldCheck, Info, Eye, ExternalLink } from 'lucide-react';
import { FlipbookFullscreenViewer } from './FlipbookFullscreenViewer';

interface FlipbookButtonProps {
  href?: string;
  className?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  colorVariant?: 'green' | 'purple' | 'red';
  badgeText?: string;
  modalTitle?: string;
  onOpenInPage?: () => void;
  isOpenInPage?: boolean;
}

export const FlipbookButton: React.FC<FlipbookButtonProps> = ({
  href = 'https://sites.google.com/view/communicator-basic',
  className = '',
  title,
  subtitle,
  description,
  buttonText,
  colorVariant = 'green',
  badgeText,
  modalTitle,
  onOpenInPage,
  isOpenInPage: controlledIsOpen,
}) => {
  const [showExplanationModal, setShowExplanationModal] = useState(false);
  const [localShowEmbed, setLocalShowEmbed] = useState(false);

  const isPurple = colorVariant === 'purple';
  const isRed = colorVariant === 'red';

  const defaultTitle = isRed
    ? 'Flipbook Interaktif Elevator Pitch'
    : isPurple
    ? 'Flipbook Interaktif Materi Do How'
    : 'Flipbook Interaktif Materi Know How';

  const defaultSubtitle = isRed
    ? 'COMMUNICATOR SKILL - ARSIP DOKUMEN SUMBER'
    : isPurple
    ? 'E-Book Digital Praktis (Layar Penuh Terkunci)'
    : 'E-Book Digital Interaktif (Layar Penuh Terkunci)';

  const defaultDescription = isRed
    ? 'Klik tombol merah di samping untuk membuka modul referensi publikasi digital Elevator Pitch langsung di halaman ini.'
    : isPurple
    ? 'Klik tombol ungu di samping untuk membuka modul referensi praktis lapangan langsung di halaman ini.'
    : 'Klik tombol hijau di samping untuk membuka modul referensi digital Know How langsung di halaman ini.';

  const defaultButtonText = isRed
    ? 'OPEN FLIPBOOK ELEVATOR PITCH'
    : isPurple
    ? 'OPEN FLIPBOOK DO HOW'
    : 'OPEN FLIPBOOK KNOW HOW';

  const defaultBadgeText = isRed || isPurple ? 'Heyzine Reader' : 'Bebas Blokir';

  const defaultModalTitle = isRed
    ? 'Flipbook Elevator Pitch - Bite The Bullets'
    : isPurple
    ? 'Flipbook Do How - Communicator Runner'
    : 'Flipbook Know How - Communicator Basic';

  const isEmbedActive =
    controlledIsOpen !== undefined ? controlledIsOpen : localShowEmbed;

  const handleMainButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenInPage) {
      onOpenInPage();
    } else {
      setLocalShowEmbed((prev) => !prev);
    }
  };

  return (
    <>
      <div
        className={`flex flex-col sm:flex-row items-center justify-between gap-4 p-4 md:p-5 rounded-3xl ${
          isRed
            ? 'bg-gradient-to-r from-red-950/45 via-rose-950/35 to-slate-900/40 border-red-500/35 shadow-red-950/20'
            : isPurple
            ? 'bg-gradient-to-r from-purple-950/45 via-indigo-950/35 to-slate-900/40 border-purple-500/35 shadow-purple-950/20'
            : 'bg-gradient-to-r from-emerald-950/40 via-green-950/30 to-slate-900/40 border-emerald-500/30'
        } border shadow-lg ${className}`}
      >
        <div className="flex items-center space-x-3.5">
          <div
            className={`w-10 h-10 rounded-2xl ${
              isRed
                ? 'bg-red-500/20 text-red-400 border-red-500/35 shadow-red-500/10'
                : isPurple
                ? 'bg-purple-500/20 text-purple-400 border-purple-500/35 shadow-purple-500/10'
                : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 shadow-emerald-500/10'
            } flex items-center justify-center shrink-0 border shadow-inner`}
          >
            <BookOpen className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span
                className={`text-[10px] font-extrabold uppercase tracking-widest ${
                  isRed ? 'text-red-400' : isPurple ? 'text-purple-400' : 'text-emerald-400'
                } block`}
              >
                {subtitle || defaultSubtitle}
              </span>
              <span
                className={`text-[9px] ${
                  isRed
                    ? 'bg-red-500/20 text-red-300 border-red-500/40'
                    : isPurple
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                } border px-1.5 py-0.5 rounded-full font-mono font-bold flex items-center space-x-1`}
              >
                <ShieldCheck className="w-2.5 h-2.5" />
                <span>{badgeText || defaultBadgeText}</span>
              </span>
            </div>
            <h4 className="text-sm md:text-base font-black text-white">
              {title || defaultTitle}
            </h4>
            <p className="text-[11px] text-slate-400">
              {description || defaultDescription}
            </p>
          </div>
        </div>

        {/* 3D Glossy Button (Red for ELEVATOR PITCH, Purple for DO HOW, Green for KNOW HOW) */}
        {/* Changed function to: Buka Flipbook di Halaman Ini */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            type="button"
            onClick={handleMainButtonClick}
            className="group relative inline-flex items-center justify-center shrink-0 transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
            title={
              isEmbedActive
                ? 'Sembunyikan Flipbook di halaman ini'
                : 'Buka Flipbook langsung di halaman ini'
            }
          >
            {/* Ambient Pulsing Glow behind button */}
            <div
              className={`absolute -inset-1 rounded-full ${
                isRed
                  ? 'bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 opacity-65'
                  : isPurple
                  ? 'bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500 opacity-60'
                  : 'bg-gradient-to-r from-emerald-500 to-green-400 opacity-60'
              } blur-md group-hover:opacity-100 transition-opacity duration-300 animate-pulse`}
            />

            {/* 3D Button Core */}
            <div
              className={`relative px-7 md:px-9 py-3.5 md:py-4 rounded-full ${
                isRed
                  ? 'bg-gradient-to-b from-[#ff2626] via-[#e50000] to-[#a80000] border-4 border-[#6b0000] shadow-[0_6px_0_#4a0000,0_10px_22px_rgba(220,38,38,0.5)] group-active:shadow-[0_2px_0_#4a0000,0_4px_10px_rgba(220,38,38,0.5)]'
                  : isPurple
                  ? 'bg-gradient-to-b from-[#a855f7] via-[#7e22ce] to-[#581c87] border-4 border-[#3b0764] shadow-[0_6px_0_#2e0854,0_10px_20px_rgba(0,0,0,0.5)] group-active:shadow-[0_2px_0_#2e0854,0_4px_10px_rgba(0,0,0,0.5)]'
                  : 'bg-gradient-to-b from-[#00b82b] via-[#009420] to-[#005713] border-4 border-[#00380c] shadow-[0_6px_0_#002b09,0_10px_20px_rgba(0,0,0,0.4)] group-active:shadow-[0_2px_0_#002b09,0_4px_10px_rgba(0,0,0,0.4)]'
              } group-active:translate-y-1 transition-all overflow-hidden flex items-center justify-center space-x-2`}
            >
              {/* Glossy Top Glass Reflection */}
              <div className="absolute top-0 left-2 right-2 h-[45%] rounded-t-full bg-gradient-to-b from-white/50 to-transparent pointer-events-none" />
              {/* Inner Stroke */}
              <div
                className={`absolute inset-1 rounded-full border ${
                  isRed
                    ? 'border-red-200/50'
                    : isPurple
                    ? 'border-purple-200/50'
                    : 'border-green-300/40'
                } pointer-events-none`}
              />
              <span className="relative z-10 font-black tracking-wide text-white text-xs md:text-sm uppercase drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)] flex items-center space-x-2">
                <Eye
                  className={`w-4 h-4 ${
                    isRed
                      ? 'text-red-100'
                      : isPurple
                      ? 'text-purple-100'
                      : 'text-emerald-200'
                  }`}
                />
                {/* Text remains exactly as original */}
                <span>{buttonText || defaultButtonText}</span>
              </span>
            </div>
          </button>

          {/* Modal info button */}
          <button
            type="button"
            onClick={() => setShowExplanationModal(true)}
            className={`p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 ${
              isRed
                ? 'text-slate-400 hover:text-red-300 border-slate-700 hover:border-red-500/40'
                : isPurple
                ? 'text-slate-400 hover:text-purple-300 border-slate-700 hover:border-purple-500/40'
                : 'text-slate-400 hover:text-emerald-300 border-slate-700 hover:border-emerald-500/40'
            } border transition-colors cursor-pointer`}
            title="Informasi Teknis Mode Layar Penuh Flipbook"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Standalone embedded frame fallback if not handled by sibling */}
      {!onOpenInPage && localShowEmbed && (
        <div className="p-4 rounded-3xl bg-slate-900 border border-slate-700 shadow-xl space-y-2 animate-fadeIn">
          <div className="p-2.5 bg-slate-800 rounded-xl flex items-center justify-between text-xs text-slate-300">
            <span className="font-mono text-[11px] truncate mr-2">{href}</span>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:text-sky-300 font-bold flex items-center space-x-1"
            >
              <span>Buka Tab Penuh</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
          <iframe
            title={title || defaultTitle}
            allowFullScreen
            allow="autoplay; fullscreen; clipboard-write"
            scrolling="no"
            style={{ width: '100%', height: '620px', border: 'none' }}
            src={href}
            className="rounded-2xl"
          />
        </div>
      )}

      {showExplanationModal && (
        <FlipbookFullscreenViewer
          isOpen={showExplanationModal}
          onClose={() => setShowExplanationModal(false)}
          url={href}
          title={modalTitle || defaultModalTitle}
          colorVariant={colorVariant}
        />
      )}
    </>
  );
};
