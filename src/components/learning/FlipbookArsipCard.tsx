import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  ExternalLink,
  Eye,
  Smartphone,
  RotateCw,
  Maximize2,
  X,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface FlipbookArsipCardProps {
  url: string;
  moduleName: string;
  colorTheme?: 'emerald' | 'purple' | 'red' | 'amber';
  tagline?: string;
  showEmbedFrame?: boolean;
  onToggleEmbed?: () => void;
  id?: string;
}

export const FlipbookArsipCard: React.FC<FlipbookArsipCardProps> = ({
  url,
  moduleName,
  colorTheme = 'emerald',
  tagline,
  showEmbedFrame: controlledShowEmbed,
  onToggleEmbed,
  id,
}) => {
  const { addNotification } = useApp();
  const [localShowEmbed, setLocalShowEmbed] = useState(false);
  const [isPortraitMobile, setIsPortraitMobile] = useState<boolean>(false);
  const [dismissRotateBanner, setDismissRotateBanner] = useState(false);
  const [showLandscapeSuccess, setShowLandscapeSuccess] = useState(false);
  const viewerWrapperRef = useRef<HTMLDivElement>(null);

  const isEmbedOpen =
    controlledShowEmbed !== undefined ? controlledShowEmbed : localShowEmbed;

  // Detect Mobile Portrait Orientation
  useEffect(() => {
    const checkOrientation = () => {
      if (typeof window === 'undefined') return;
      const isMobileWidth = window.innerWidth < 768;
      const isPortrait = window.innerHeight > window.innerWidth;
      const isMobileDevice =
        isMobileWidth ||
        (window.innerWidth < 1024 && 'ontouchstart' in window && isPortrait);

      if (isMobileDevice && !isPortrait && isPortraitMobile) {
        // User just rotated from portrait to landscape!
        setShowLandscapeSuccess(true);
        setTimeout(() => setShowLandscapeSuccess(false), 3500);
      }

      setIsPortraitMobile(Boolean(isMobileDevice && isPortrait));
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    if (window.screen?.orientation) {
      window.screen.orientation.addEventListener('change', checkOrientation);
    }

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
      if (window.screen?.orientation) {
        window.screen.orientation.removeEventListener('change', checkOrientation);
      }
    };
  }, [isPortraitMobile]);

  // Attempt auto-landscape and push notification when embed viewer opens
  useEffect(() => {
    if (isEmbedOpen && typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 768;
      const isPortrait = window.innerHeight > window.innerWidth;

      if (isMobile && isPortrait) {
        // Try auto locking orientation if supported by browser/PWA
        try {
          if (window.screen?.orientation && 'lock' in window.screen.orientation) {
            (window.screen.orientation as any).lock('landscape').catch(() => {});
          }
        } catch {}

        addNotification(
          'Saran Tampilan Flipbook',
          'Putar HP Anda ke posisi mendatar (Landscape) untuk tampilan 2 halaman buku yang optimal.',
          'info'
        );
      }
    }
  }, [isEmbedOpen, addNotification]);

  // Action to enter Fullscreen and lock to landscape
  const handleEnterLandscapeFullscreen = async () => {
    try {
      const elem = viewerWrapperRef.current;
      if (elem?.requestFullscreen) {
        await elem.requestFullscreen();
      } else if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }

      if (window.screen?.orientation && 'lock' in window.screen.orientation) {
        await (window.screen.orientation as any).lock('landscape');
      }
    } catch (err) {
      // Browser permissions fallback
      console.log('Fullscreen landscape trigger:', err);
    }
  };

  const themeClasses = {
    emerald: {
      badge: 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/30',
      btnWebsite: 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20 text-white',
      linkTab: 'text-emerald-400 hover:text-emerald-300',
      accentGlow: 'border-emerald-500/30',
    },
    purple: {
      badge: 'bg-purple-500/15 text-purple-400 border border-purple-500/30',
      btnWebsite: 'bg-purple-600 hover:bg-purple-500 shadow-purple-500/20 text-white',
      linkTab: 'text-purple-400 hover:text-purple-300',
      accentGlow: 'border-purple-500/30',
    },
    red: {
      badge: 'bg-red-500/15 text-red-500 border border-red-500/30',
      btnWebsite: 'bg-red-600 hover:bg-red-500 shadow-red-500/20 text-white',
      linkTab: 'text-red-400 hover:text-red-300',
      accentGlow: 'border-red-500/30',
    },
    amber: {
      badge: 'bg-amber-500/15 text-amber-500 border border-amber-500/30',
      btnWebsite: 'bg-amber-600 hover:bg-amber-500 shadow-amber-500/20 text-white',
      linkTab: 'text-amber-400 hover:text-amber-300',
      accentGlow: 'border-amber-500/30',
    },
  }[colorTheme];

  return (
    <div
      id={id}
      className="p-5 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-4 transition-all duration-300"
    >
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-white/10 pb-3.5">
        <div className="flex items-center space-x-3">
          <div className={`w-9 h-9 rounded-xl ${themeClasses.badge} flex items-center justify-center shrink-0`}>
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 dark:text-white text-sm">
              Keterangan Arsip &amp; Dokumen Sumber
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {tagline || `Indeks resmi menuju publikasi digital Communicator Skill - ${moduleName}`}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Status Flipbook Terbuka */}
          {isEmbedOpen && (
            <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-300 border border-sky-500/30 text-xs font-bold">
              <Eye className="w-3.5 h-3.5 text-sky-400" />
              <span>Flipbook Terbuka</span>
            </span>
          )}

          {/* Tombol Buka Website Tab Baru */}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-3 py-1.5 rounded-xl ${themeClasses.btnWebsite} text-xs font-bold shadow-md transition-all flex items-center space-x-1.5 cursor-pointer`}
          >
            <span>Website Flipbook</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Keterangan Arsip Points */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/5 space-y-1">
          <strong className="text-slate-700 dark:text-slate-200 block font-bold">1. Indeks Publikasi:</strong>
          <p className="text-slate-500 dark:text-slate-400 text-[11px]">
            File ini berfungsi sebagai indeks resmi menuju publikasi e-book interaktif.
          </p>
        </div>
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/5 space-y-1">
          <strong className="text-slate-700 dark:text-slate-200 block font-bold">2. Penyimpanan Master:</strong>
          <p className="text-slate-500 dark:text-slate-400 text-[11px]">
            PDF sumber asli tersimpan aman terpisah di Google Drive resmi KAC Pusat.
          </p>
        </div>
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/5 space-y-1">
          <strong className="text-slate-700 dark:text-slate-200 block font-bold">3. Akses Google Sites &amp; Heyzine:</strong>
          <p className="text-slate-500 dark:text-slate-400 text-[11px]">
            Tautan mengarah langsung ke publikasi interaktif Heyzine &amp; Google Sites.
          </p>
        </div>
      </div>

      {/* Embedded Iframe Preview (Toggleable) */}
      {isEmbedOpen && (
        <div className="pt-2 animate-fadeIn space-y-3" ref={viewerWrapperRef}>
          {/* NOTIFIKASI LANDSCAPE UNTUK PENGGUNA MOBILE / SMARTPHONE */}
          {isPortraitMobile && !dismissRotateBanner && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-sky-500/15 border-2 border-amber-500/40 shadow-lg text-slate-800 dark:text-white space-y-3 animate-pulse">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/30 text-amber-500 dark:text-amber-300 border border-amber-500/50 flex items-center justify-center shrink-0 mt-0.5">
                    <Smartphone className="w-5 h-5 -rotate-90 animate-bounce" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-amber-500/30 text-amber-600 dark:text-amber-300 border border-amber-500/40">
                        Saran Tampilan HP
                      </span>
                      <span className="text-xs font-bold text-amber-600 dark:text-amber-300">
                        Putar Posisi Layar ke Landscape
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      Modul flipbook ini dirancang dalam <strong>format 2 halaman buku</strong>. Putar posisi HP Anda ke <strong>posisi mendatar (Landscape)</strong> agar tulisan terlihat jauh lebih besar, tajam, dan nyaman dibaca.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDismissRotateBanner(true)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-black/20 transition-all shrink-0 cursor-pointer"
                  title="Tutup saran orientasi"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleEnterLandscapeFullscreen}
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-xs shadow-md shadow-amber-500/30 active:scale-95 transition-all flex items-center space-x-1.5 cursor-pointer"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Kunci Layar Penuh Landscape</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDismissRotateBanner(true)}
                  className="px-3 py-2 rounded-xl bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-700 dark:text-slate-300 font-bold text-xs transition-all cursor-pointer"
                >
                  Tetap Mode Tegak
                </button>
              </div>
            </div>
          )}

          {/* Konfirmasi saat posisi Landscape aktif */}
          {showLandscapeSuccess && (
            <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center justify-between shadow-md">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Posisi Landscape Aktif: Tampilan 2 Halaman Maksimal &amp; Jelas!</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/30">Nyaman</span>
            </div>
          )}

          {/* Embedded Viewer Window */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/15 shadow-2xl bg-slate-900">
            {/* Top Toolbar */}
            <div className="p-2.5 bg-slate-800 border-b border-white/10 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center space-x-2 truncate mr-2">
                <span className="font-mono text-[11px] truncate text-slate-400">{url}</span>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                {/* Mobile Fullscreen & Landscape Shortcut Button */}
                <button
                  type="button"
                  onClick={handleEnterLandscapeFullscreen}
                  className="px-2.5 py-1 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-400/30 font-bold text-[11px] flex items-center space-x-1.5 transition-all cursor-pointer"
                  title="Putar ke Landscape & Masuk Layar Penuh"
                >
                  <RotateCw className="w-3 h-3 text-sky-400" />
                  <span className="hidden sm:inline">Layar Penuh Landscape</span>
                </button>

                {/* External link */}
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${themeClasses.linkTab} font-bold flex items-center space-x-1 hover:underline text-xs`}
                >
                  <span>Buka Tab Penuh</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <iframe
              title={`Flipbook ${moduleName}`}
              allowFullScreen
              allow="autoplay; fullscreen; clipboard-write"
              scrolling="no"
              style={{ width: '100%', height: '620px', border: 'none' }}
              src={url}
            />
          </div>
        </div>
      )}
    </div>
  );
};
