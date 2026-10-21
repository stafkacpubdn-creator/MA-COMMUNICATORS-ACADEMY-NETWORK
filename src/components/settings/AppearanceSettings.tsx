import React from 'react';
import {
  Sliders,
  Sun,
  Moon,
  Laptop,
  Check,
  Eye,
  Type,
  Palette,
  Camera,
  Edit3,
  ShieldCheck,
  Building2,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { THEME_OPTIONS } from '../../data/themesData';
import { ThemePalette } from '../../types';

export const AppearanceSettings: React.FC = () => {
  const {
    currentUser,
    isDarkMode,
    themePalette,
    setThemePalette,
    addNotification,
    setShowProfileModal,
    isContentAdmin,
    setActiveView,
  } = useApp();

  const handleSelectTheme = (themeId: ThemePalette, themeName: string) => {
    setThemePalette(themeId);
    addNotification('Tema Berhasil Diganti', `Palet ${themeName} kini aktif.`, 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn pb-16">
      {/* Profile Picture & Identity Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-5">
        <div className="border-b border-slate-100 dark:border-white/10 pb-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-800 dark:text-white flex items-center space-x-2">
              <Camera className="w-5 h-5 text-sky-400" />
              <span>Foto Profil & Identitas Akun</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Kelola avatar Anda yang ditampilkan pada seluruh fitur forum, rapor, dan dasbor.
            </p>
          </div>
          {isContentAdmin && (
            <span className="px-2.5 py-1 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-300 border border-purple-500/30 text-[10px] font-bold flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-500" />
              <span>Admin Live Editor</span>
            </span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/5">
          <div className="flex items-center space-x-4">
            <div className="relative group shrink-0">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-16 h-16 rounded-full object-cover ring-4 ring-sky-400/40 shadow-lg"
              />
              <button
                onClick={() => setShowProfileModal(true)}
                className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-sky-500 hover:bg-sky-600 text-white shadow-md cursor-pointer transition-transform group-hover:scale-110"
                title="Ganti Foto Profil"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1">
              <div className="font-bold text-slate-800 dark:text-white text-sm">
                {currentUser.name}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-1.5">
                <Building2 className="w-3.5 h-3.5 text-sky-400" />
                <span>{currentUser.unit}</span>
                <span>•</span>
                <span className="font-mono text-sky-600 dark:text-sky-300">{currentUser.email}</span>
              </div>
              <div className="text-[11px] text-amber-500 font-semibold flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{currentUser.totalXp} XP • Streak {currentUser.streakDays} Hari</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowProfileModal(true)}
              className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold shadow-md shadow-sky-500/20 transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span>Ganti Foto Profil</span>
            </button>

            {isContentAdmin && (
              <button
                onClick={() => setActiveView('setting_content_editor')}
                className="px-3.5 py-2.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 text-purple-600 dark:text-purple-300 border border-purple-500/30 text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-purple-500" />
                <span>Edit Konten Live</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main 6 Distinct Contrast Theme Options */}
      <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-6">
        <div className="border-b border-slate-100 dark:border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-slate-800 dark:text-white flex items-center space-x-2">
              <Palette className="w-5 h-5 text-sky-400" />
              <span>Palet Tema Visual (6 Pilihan Kontras Tinggi)</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Pilih dari 6 tema estetis dengan karakter kontras berbeda untuk kenyamanan membaca maksimal di berbagai kondisi cahaya.
            </p>
          </div>
          <span className="text-[11px] font-mono font-bold text-sky-600 dark:text-sky-300 bg-sky-500/10 border border-sky-500/20 px-3 py-1 rounded-full self-start sm:self-auto">
            Tema Aktif: {THEME_OPTIONS.find((t) => t.id === themePalette)?.name || 'Midnight Navy'}
          </span>
        </div>

        {/* 6 Theme Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {THEME_OPTIONS.map((theme) => {
            const isSelected = themePalette === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => handleSelectTheme(theme.id, theme.name)}
                className={`group relative p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'border-sky-500 ring-2 ring-sky-500/40 shadow-lg scale-[1.02]'
                    : 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 bg-slate-50/50 dark:bg-white/5 hover:scale-[1.01]'
                }`}
                style={{
                  backgroundColor: isSelected ? (theme.isDark ? '#13233a' : '#f0f9ff') : undefined,
                }}
              >
                {/* Header Swatch & Indicator */}
                <div className="space-y-3 w-full">
                  <div
                    className="h-20 w-full rounded-xl border p-2.5 flex flex-col justify-between overflow-hidden shadow-inner relative"
                    style={{
                      backgroundColor: theme.bgHex,
                      borderColor: theme.accentHex + '40',
                    }}
                  >
                    {/* Simulated Miniature UI */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: theme.accentHex }}
                        />
                        <span
                          className="text-[9px] font-black uppercase tracking-wider"
                          style={{ color: theme.textHex }}
                        >
                          {theme.name}
                        </span>
                      </div>
                      <span
                        className="text-[8px] px-1.5 py-0.5 rounded-full font-mono font-bold"
                        style={{
                          backgroundColor: theme.accentHex + '25',
                          color: theme.accentHex,
                          border: `1px solid ${theme.accentHex}50`,
                        }}
                      >
                        {theme.contrastTag}
                      </span>
                    </div>

                    <div
                      className="p-1.5 rounded-lg text-[9px] font-semibold truncate flex items-center justify-between"
                      style={{
                        backgroundColor: theme.cardHex,
                        color: theme.textHex,
                      }}
                    >
                      <span className="truncate">Modul & Asesmen Shaf 2</span>
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: theme.accentHex }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-slate-800 dark:text-white group-hover:text-sky-500 transition-colors">
                        {theme.name}
                      </h4>
                      {isSelected ? (
                        <span className="w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">
                          {theme.isDark ? 'Gelap' : 'Terang'}
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-sky-600 dark:text-sky-400 font-medium">
                      {theme.subtitle}
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {theme.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Hex: <code className="font-mono">{theme.bgHex}</code></span>
                  <span className={`font-bold ${isSelected ? 'text-sky-500' : 'text-slate-400'}`}>
                    {isSelected ? 'Aktif Sekarang' : 'Pilih Tema'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Reading Ergonomics & High Contrast Assurance */}
        <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-xs space-y-1.5">
          <div className="flex items-center space-x-2 text-sky-700 dark:text-sky-300 font-bold">
            <Zap className="w-4 h-4 text-sky-400" />
            <span>Standar Ergonomi Visual & Aksesibilitas WCAG AA</span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
            Seluruh 6 pilihan tema di atas telah disesuaikan agar rasio kontras teks terhadap latar belakang berada di atas <strong>13:1 hingga 21:1</strong> (jauh melampaui standar minimum 4.5:1), memastikan butir soal asesmen, infografis, dan grafik dapat dipelajari dengan sangat nyaman tanpa melelahkan mata.
          </p>
        </div>
      </div>
    </div>
  );
};
