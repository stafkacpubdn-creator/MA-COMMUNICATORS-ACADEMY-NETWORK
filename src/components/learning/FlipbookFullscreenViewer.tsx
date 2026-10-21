import React, { useState } from 'react';
import {
  Maximize2,
  X,
  ExternalLink,
  RotateCw,
  Lock,
  BookOpen,
  Sparkles,
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  Copy,
  Check,
} from 'lucide-react';

interface FlipbookFullscreenViewerProps {
  isOpen: boolean;
  onClose: () => void;
  url?: string;
  title?: string;
  colorVariant?: 'green' | 'purple' | 'red';
}

export const FlipbookFullscreenViewer: React.FC<FlipbookFullscreenViewerProps> = ({
  isOpen,
  onClose,
  url = 'https://sites.google.com/view/communicator-basic',
  title = 'Flipbook Know How - Communicator Basic',
  colorVariant = 'green',
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isPurple = colorVariant === 'purple';
  const isRed = colorVariant === 'red';

  return (
    <div
      className="fixed inset-0 z-[9999] w-screen h-screen bg-slate-950/95 backdrop-blur-xl flex flex-col justify-center items-center p-4 select-none animate-fadeIn"
      style={{ margin: 0 }}
    >
      <div
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 ${
          isRed ? 'bg-red-500/10' : isPurple ? 'bg-purple-500/10' : 'bg-emerald-500/10'
        } rounded-full blur-3xl pointer-events-none`}
      />
      <div
        className={`relative w-full max-w-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-[#0c182c] border ${
          isRed ? 'border-red-500/40' : isPurple ? 'border-purple-500/40' : 'border-emerald-500/40'
        } rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden`}
      >
        {/* Top Header */}
        <div
          className={`h-16 px-6 bg-[#0a1424] border-b ${
            isRed ? 'border-red-500/30' : isPurple ? 'border-purple-500/30' : 'border-emerald-500/30'
          } flex items-center justify-between`}
        >
          <div className="flex items-center space-x-3">
            <div
              className={`w-9 h-9 rounded-xl ${
                isRed
                  ? 'bg-red-500/20 text-red-400 border-red-500/40'
                  : isPurple
                  ? 'bg-purple-500/20 text-purple-400 border-purple-500/40'
                  : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
              } border flex items-center justify-center`}
            >
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm md:text-base">{title}</h3>
              <div className="flex items-center space-x-2">
                <span
                  className={`text-[10px] ${
                    isRed ? 'text-red-400' : isPurple ? 'text-purple-400' : 'text-emerald-400'
                  } font-semibold flex items-center space-x-1`}
                >
                  <Lock className="w-3 h-3" />
                  <span>Akses E-Book Flipbook Interaktif</span>
                </span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 border border-white/10 flex items-center justify-center transition-colors"
            title="Tutup dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-6">
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start space-x-3.5">
            <ShieldAlert className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1.5 text-slate-300">
              <p className="font-bold text-amber-300 text-sm">
                Akses Langsung Layar Penuh Bebas Hambatan (Full Experience)
              </p>
              <p className="leading-relaxed text-slate-300">
                Untuk memberikan pengalaman membaca e-book 3D flipbook yang paling responsif, jernih, dan optimal pada perangkat Anda tanpa batasan isolasi frame, tautan referensi diarahkan langsung ke halaman flipbook resmi.
              </p>
            </div>
          </div>

          <div
            className={`p-4 rounded-2xl ${
              isRed
                ? 'bg-red-500/10 border-red-500/30'
                : isPurple
                ? 'bg-purple-500/10 border-purple-500/30'
                : 'bg-emerald-500/10 border-emerald-500/30'
            } border text-xs space-y-2 text-slate-200`}
          >
            <div
              className={`flex items-center space-x-2 ${
                isRed ? 'text-red-400' : isPurple ? 'text-purple-400' : 'text-emerald-400'
              } font-bold`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {isRed
                  ? 'Flipbook Elevator Pitch Siap Dibuka di Tab Layar Penuh'
                  : isPurple
                  ? 'Flipbook Do How Siap Dibuka di Tab Layar Penuh'
                  : 'Solusi Akses Penuh: Terbuka Langsung di Tab Layar Penuh'}
              </span>
            </div>
            <p className="leading-relaxed text-slate-300">
              Tekan tombol {isRed ? 'merah' : isPurple ? 'ungu' : 'hijau'} di bawah untuk langsung membuka modul interaktif di tab baru. Anda juga dapat menekan tombol{' '}
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">F11</kbd> pada keyboard komputer Anda untuk mengunci ke mode layar penuh peramban.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between text-xs">
            <span className="text-slate-400 font-mono truncate mr-2">{url}</span>
            <button
              type="button"
              onClick={handleCopy}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-[11px] font-medium flex items-center space-x-1 shrink-0 transition-colors"
            >
              {copied ? (
                <>
                  <Check className={`w-3 h-3 ${isRed ? 'text-red-400' : isPurple ? 'text-purple-400' : 'text-emerald-400'}`} />
                  <span className={isRed ? 'text-red-400' : isPurple ? 'text-purple-400' : 'text-emerald-400'}>Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Salin Tautan</span>
                </>
              )}
            </button>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className={`w-full sm:flex-1 py-3.5 px-6 rounded-2xl ${
                isRed
                  ? 'bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 shadow-red-500/25'
                  : isPurple
                  ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 shadow-purple-500/25'
                  : 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 shadow-emerald-500/25'
              } text-white font-black text-sm tracking-wide flex items-center justify-center space-x-2 shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer`}
            >
              <ExternalLink className="w-4 h-4" />
              <span>
                {isRed
                  ? 'BUKA FLIPBOOK ELEVATOR PITCH SEKARANG'
                  : isPurple
                  ? 'BUKA FLIPBOOK DO HOW SEKARANG'
                  : 'BUKA FLIPBOOK KNOW HOW SEKARANG'}
              </span>
            </a>
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-semibold transition-colors cursor-pointer"
            >
              Kembali ke Aplikasi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
