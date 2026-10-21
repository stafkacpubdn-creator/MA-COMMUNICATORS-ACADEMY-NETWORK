import React, { useState } from 'react';
import {
  Menu,
  Moon,
  Sun,
  Wifi,
  WifiOff,
  Cloud,
  RefreshCw,
  Bell,
  Flame,
  FileDown,
  ChevronDown,
  Building2,
  CheckCircle2,
  Sparkles,
  Camera,
  Edit3,
  Megaphone,
  FileSpreadsheet,
  Palette,
  SlidersHorizontal,
  Layers,
  User,
  Shield,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { THEME_OPTIONS } from '../data/themesData';

interface NavbarProps {
  onToggleMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleMobileMenu }) => {
  const {
    activeView,
    setActiveView,
    currentUser,
    switchUser,
    allUsers,
    isDarkMode,
    setIsDarkMode,
    themePalette,
    setThemePalette,
    isOfflineMode,
    setIsOfflineMode,
    isSyncing,
    triggerCloudSync,
    lastSyncedTime,
    notifications,
    setShowReportModal,
    setShowProfileModal,
    setShowGoogleSyncModal,
    isContentAdmin,
    globalAnnouncement,
  } = useApp();

  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [showMobileToolsDropdown, setShowMobileToolsDropdown] = useState(false);

  // Map view to friendly title
  const getViewTitle = () => {
    switch (activeView) {
      case 'dashboard_executive':
        return 'Executive Summary • Dasbor Eksekutif & Ringkasan Kinerja';
      case 'dashboard_peserta':
        return 'Dashboard Progres Peserta Real-Time • Monitoring 15 Unit Terpadu';
      case 'dashboard_graphic':
        return 'Graphic, Chart & Pie • Visualisasi Perkembangan Belajar';
      case 'dashboard_ipooi':
        return 'Analytic (IPOOI) • Evaluasi Input, Process, Output, Outcome & Impact';
      case 'newbie_materi':
        return 'NEWBIE Class • Base KPI A & Materi Teoritis (Know How)';
      case 'newbie_assessment':
        return 'NEWBIE Class • Basic Assessment (50 Butir Reflektif)';
      case 'newbie_result':
        return 'NEWBIE Class • Level 1 Achievement & Sertifikasi';
      case 'newbie_cta':
        return 'NEWBIE Class • 1st Call to Action (Program 21 Hari Alpha)';
      case 'runner_materi':
        return 'RUNNER Class • Stair KPI B & Materi Praktis (Do How)';
      case 'runner_assessment':
        return 'RUNNER Class • Intermediate Assessment (50 Butir Taktis Lapangan)';
      case 'runner_result':
        return 'RUNNER Class • Level 2 Achievement & Rekomendasi Mentor';
      case 'runner_cta':
        return 'RUNNER Class • 2nd Call to Action (Program 21 Hari Beta)';
      case 'master_materi':
        return 'MASTER Class • Roof KPI C & Materi Strategis (Show How)';
      case 'master_assessment':
        return 'MASTER Class • Advance Assessment (50 Butir Strategis & Dilematis)';
      case 'master_result':
        return 'MASTER Class • Level 3 Achievement & Sertifikat Master';
      case 'master_cta':
        return 'MASTER Class • 3rd Call to Action (Program 21 Hari Delta)';
      case 'bullet_elevator':
        return 'Bite The Bullets • Elevator Pitch & Heyzine Flipbook Reader';
      case 'elevator_habit_lab':
        return '21-Day Habit Lab • Studio Latihan 5P+1R Mandiri & Terpadu';
      case 'elevator_coach':
        return 'AI Coach Lab • Studio Latihan Elevator Pitch Interaktif';
      case 'elevator_human':
        return 'Ruang Human Review & Fasilitator • Validasi Rubrik DENGAR';
      case 'bullet_pra':
        return 'Bite The Bullets • Pra-Pengabaran (Kesiapan Mental & Dokumen)';
      case 'bullet_pengabaran':
        return 'Bite The Bullets • Materi Pengabaran (Inti Pesan KAC)';
      case 'bullet_pembinaan':
        return 'Bite The Bullets • Materi Pembinaan (Shaf 2 Berkelanjutan)';
      case 'bullet_aora':
        return 'Bite The Bullets • AORA Framework (Action-Oriented Result)';
      case 'forum_komunitas':
        return 'Forum Diskusi Komunitas & Sharing Best Practice Lapangan';
      case 'setting_tampilan':
        return 'Pengaturan Tampilan & Visual UI/UX';
      case 'setting_password':
        return 'Pengaturan Keamanan & Kata Sandi';
      case 'setting_member_admin':
        return 'Member/Admin Dapur Setting Modular (Config Per Menu)';
      case 'setting_content_editor':
        return 'Dapur Edit Konten Live • Tanpa Coding (Khusus Admin Resmi)';
      case 'panduan_infografis':
        return 'Infografis Ekosistem & Panduan Lengkap Aplikasi';
      default:
        return 'Communicator Academy';
    }
  };

  return (
    <header className="bg-white dark:bg-[#162740] border-b border-slate-200 dark:border-[#233c5e] sticky top-0 z-30 transition-colors shadow-sm select-none">
      {/* MAIN TOP BAR */}
      <div className="h-16 px-3 sm:px-4 md:px-6 flex items-center justify-between gap-2 md:gap-4">
        {/* Left Side: Mobile Menu Button & Participant Identity */}
        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
          {/* Mobile Menu Toggle Button */}
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden flex items-center space-x-1.5 px-3 py-2 rounded-2xl bg-sky-500/15 hover:bg-sky-500/25 text-sky-600 dark:text-sky-300 border border-sky-500/35 shadow-sm active:scale-95 transition-all shrink-0 cursor-pointer font-bold text-xs"
            aria-label="Buka Menu Navigasi"
            title="Buka Menu Navigasi"
          >
            <Menu className="w-4 h-4 text-sky-500 dark:text-sky-400" />
            <span className="font-extrabold uppercase tracking-wide">Menu</span>
          </button>

          {/* Identitas Peserta & Asal Struktur (Prominently visible on Mobile and Desktop) */}
          <button
            type="button"
            onClick={() => {
              setShowUserDropdown(!showUserDropdown);
              setShowMobileToolsDropdown(false);
              setShowThemeDropdown(false);
              setShowNotifDropdown(false);
            }}
            className="flex items-center space-x-2 px-2.5 py-1.5 rounded-2xl bg-gradient-to-r from-slate-100 to-slate-50 dark:from-[#1b3150] dark:to-[#172b47] hover:bg-slate-200 dark:hover:bg-[#203a5e] border border-slate-200 dark:border-sky-500/30 transition-all text-left group shadow-xs cursor-pointer min-w-0"
            title="Klik untuk melihat detail profil atau beralih unit/peserta"
          >
            <div className="relative shrink-0">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-sky-400/50"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-1 ring-white dark:ring-slate-900" />
            </div>

            <div className="min-w-0 truncate">
              {/* Asal Struktur / Unit Badge */}
              <div className="flex items-center space-x-1 truncate leading-tight">
                <span className="text-[10px] font-black uppercase tracking-wider text-sky-600 dark:text-sky-400 flex items-center space-x-1 truncate">
                  <Building2 className="w-3 h-3 text-sky-500 shrink-0 inline" />
                  <span className="truncate">{currentUser.unit}</span>
                </span>
                <span className="hidden md:inline text-[9px] px-1 py-0.2 rounded bg-sky-500/20 text-sky-600 dark:text-sky-300 font-mono font-bold">
                  {currentUser.role === 'admin' ? 'Kordinator' : 'Peserta'}
                </span>
              </div>

              {/* Nama Peserta Lengkap */}
              <div className="text-xs font-bold text-slate-800 dark:text-white truncate flex items-center space-x-1">
                <span className="truncate">{currentUser.name}</span>
                <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-white shrink-0 transition-transform group-hover:translate-y-0.5" />
              </div>
            </div>
          </button>

          {/* Desktop Page Title Breadcrumb */}
          <div className="hidden xl:block min-w-0 pl-2 border-l border-slate-200 dark:border-white/10">
            <h1 className="text-xs lg:text-sm font-bold text-slate-700 dark:text-slate-200 truncate flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span className="truncate">{getViewTitle()}</span>
            </h1>
            <div className="text-[10px] text-slate-400 dark:text-slate-400 truncate flex items-center space-x-1.5">
              <span>Status: Aktif</span>
              <span>•</span>
              <span className="text-sky-500 font-mono">Sinkron: {lastSyncedTime}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Safe Offline Mode Button + Actions */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
          {/* ========================================================= */}
          {/* TOMBOL AKTIVASI MODE LURING (SAFE & CLEAR STATUS BUTTON)   */}
          {/* ========================================================= */}
          <button
            type="button"
            onClick={() => setIsOfflineMode(!isOfflineMode)}
            className={`px-2.5 sm:px-3 py-1.5 rounded-2xl text-xs font-bold flex items-center space-x-1.5 transition-all border shadow-sm cursor-pointer shrink-0 ${
              isOfflineMode
                ? 'bg-amber-500/25 hover:bg-amber-500/35 text-amber-700 dark:text-amber-300 border-amber-500/60 ring-2 ring-amber-500/20 animate-pulse'
                : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-500/40 hover:border-emerald-500/60'
            }`}
            title={
              isOfflineMode
                ? 'Mode Luring Aktif: Data tersimpan lokal tanpa internet. Klik untuk kembali Online.'
                : 'Mode Daring Aktif: Klik untuk menguji Mode Luring (Offline Mode).'
            }
          >
            {isOfflineMode ? (
              <>
                <WifiOff className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="font-extrabold">Luring Aktif</span>
              </>
            ) : (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="font-extrabold">Online</span>
                <span className="hidden lg:inline text-[10px] font-normal text-emerald-600/80 dark:text-emerald-300/80">
                  (Luring Siap)
                </span>
              </>
            )}
          </button>

          {/* Cloud Sync Button */}
          <button
            type="button"
            onClick={triggerCloudSync}
            disabled={isSyncing}
            className="p-2 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-all cursor-pointer relative"
            title="Sinkronisasi Progres ke Cloud & Seluruh Perangkat"
          >
            {isSyncing ? (
              <RefreshCw className="w-4 h-4 text-sky-400 animate-spin" />
            ) : (
              <Cloud className="w-4 h-4 text-sky-400" />
            )}
          </button>

          {/* Streak Counter (Hidden on very small screens, visible from sm) */}
          <div className="hidden sm:flex items-center space-x-1 px-2.5 py-1 rounded-2xl bg-gradient-to-r from-orange-500/15 to-amber-500/15 border border-orange-500/30 text-xs font-bold text-orange-500 dark:text-orange-300">
            <Flame className="w-4 h-4 fill-orange-500 text-orange-500 animate-bounce shrink-0" />
            <span>{currentUser.streakDays} Hari</span>
          </div>

          {/* Desktop Only Tools */}
          <div className="hidden md:flex items-center space-x-1.5">
            {/* Live Content Editor Quick Access for Authorized Admin */}
            {isContentAdmin && (
              <button
                type="button"
                onClick={() => setActiveView('setting_content_editor')}
                className="px-2.5 py-1.5 rounded-2xl bg-purple-500/15 hover:bg-purple-500/25 text-purple-600 dark:text-purple-300 border border-purple-500/30 text-xs font-bold transition-all flex items-center space-x-1.5 shadow-sm cursor-pointer"
                title="Dapur Edit Konten Live Tanpa Coding"
              >
                <Edit3 className="w-3.5 h-3.5 text-purple-500" />
                <span>Live Edit</span>
              </button>
            )}

            {/* Tri-Platform Sync Button (Google Sheets, Apps Script & GitHub) */}
            <button
              type="button"
              onClick={() => setShowGoogleSyncModal(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-indigo-500/15 hover:from-emerald-500/25 hover:to-indigo-500/25 text-xs font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 transition-all shadow-sm cursor-pointer"
              title="Koneksi Google Sheets, Apps Script & GitHub"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-500" />
              <span>Sheets &amp; GitHub</span>
            </button>

            {/* Export PDF Report Button */}
            <button
              type="button"
              onClick={() => setShowReportModal(true)}
              className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-2xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-xs font-medium text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-white/15 transition-all shadow-sm cursor-pointer"
              title="Cetak & Unduh Laporan PDF"
            >
              <FileDown className="w-3.5 h-3.5 text-indigo-400" />
              <span>PDF</span>
            </button>

            {/* 6 Contrast Theme Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowThemeDropdown(!showThemeDropdown);
                  setShowUserDropdown(false);
                  setShowNotifDropdown(false);
                }}
                className="p-2 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-all flex items-center space-x-1 cursor-pointer"
                title="Pilih dari 6 Tema Visual Berbeda Kontras"
                aria-label="Pilih Tema"
              >
                <Palette className="w-4 h-4 text-sky-400" />
                <span
                  className="w-2 h-2 rounded-full border border-white/40 shadow-sm"
                  style={{
                    backgroundColor:
                      THEME_OPTIONS.find((t) => t.id === themePalette)?.accentHex || '#38bdf8',
                  }}
                />
              </button>

              {showThemeDropdown && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#162740] rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 p-3 z-50 text-xs animate-fadeIn">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-white/10">
                    <span className="font-bold text-slate-800 dark:text-white flex items-center space-x-1.5">
                      <Palette className="w-3.5 h-3.5 text-sky-400" />
                      <span>Pilihan 6 Tema Kontras</span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">WCAG AA</span>
                  </div>
                  <div className="space-y-1.5">
                    {THEME_OPTIONS.map((t) => {
                      const isCur = themePalette === t.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => {
                            setThemePalette(t.id);
                            setShowThemeDropdown(false);
                          }}
                          className={`w-full flex items-center justify-between p-2 rounded-xl transition-all cursor-pointer text-left ${
                            isCur
                              ? 'bg-sky-500/15 border border-sky-500/30 font-bold'
                              : 'hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent text-slate-700 dark:text-slate-200'
                          }`}
                        >
                          <div className="flex items-center space-x-2.5 truncate mr-2">
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0 shadow-sm"
                              style={{ backgroundColor: t.accentHex }}
                            />
                            <div className="truncate">
                              <div className="text-xs truncate">{t.name}</div>
                              <div className="text-[10px] text-slate-400 truncate">{t.subtitle}</div>
                            </div>
                          </div>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 text-slate-500 dark:text-slate-400 shrink-0">
                            {t.contrastTag.split(' ')[1] || t.contrastTag}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowNotifDropdown(!showNotifDropdown);
                  setShowUserDropdown(false);
                  setShowThemeDropdown(false);
                }}
                className="p-2 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 relative transition-all cursor-pointer"
                aria-label="Notifikasi"
              >
                <Bell className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                {notifications.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white dark:ring-[#162740]" />
                )}
              </button>
              {showNotifDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#1a2d4b] rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 p-3 z-50 text-xs animate-fadeIn">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-white/10">
                    <span className="font-bold text-slate-800 dark:text-white flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Notifikasi Gamifikasi & Pengingat</span>
                    </span>
                    <span className="text-[10px] text-slate-400">{notifications.length} Terkini</span>
                  </div>
                  <div className="space-y-2 max-h-72 overflow-y-auto custom-scrollbar">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className="p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 space-y-1"
                      >
                        <div className="flex items-center justify-between font-semibold text-slate-800 dark:text-slate-100">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-slate-400 font-normal">{n.timestamp}</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                          {n.message}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Tools Dropdown Button (Groups secondary tools neatly without cramming) */}
          <div className="relative md:hidden">
            <button
              type="button"
              onClick={() => {
                setShowMobileToolsDropdown(!showMobileToolsDropdown);
                setShowUserDropdown(false);
              }}
              className="p-2 rounded-2xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 transition-all cursor-pointer"
              title="Menu Fitur & Sinkronisasi"
              aria-label="Fitur Tambahan"
            >
              <SlidersHorizontal className="w-4 h-4 text-sky-400" />
            </button>

            {showMobileToolsDropdown && (
              <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#162740] rounded-3xl shadow-2xl border border-slate-200 dark:border-white/15 p-3 z-50 text-xs space-y-2 animate-fadeIn">
                <div className="pb-2 border-b border-slate-100 dark:border-white/10 font-bold text-slate-800 dark:text-white flex items-center justify-between">
                  <span className="flex items-center space-x-1.5">
                    <Layers className="w-3.5 h-3.5 text-sky-400" />
                    <span>Peralatan &amp; Sinkronisasi</span>
                  </span>
                  <span className="text-[10px] text-slate-400">Mobile Menu</span>
                </div>

                {/* Sheets & GitHub */}
                <button
                  type="button"
                  onClick={() => {
                    setShowGoogleSyncModal(true);
                    setShowMobileToolsDropdown(false);
                  }}
                  className="w-full flex items-center space-x-2.5 p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-500/30 transition-all text-left"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Koneksi Google Sheets &amp; GitHub</span>
                </button>

                {/* Laporan PDF */}
                <button
                  type="button"
                  onClick={() => {
                    setShowReportModal(true);
                    setShowMobileToolsDropdown(false);
                  }}
                  className="w-full flex items-center space-x-2.5 p-2 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 font-medium transition-all text-left"
                >
                  <FileDown className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Unduh Laporan Belajar (PDF)</span>
                </button>

                {/* Live Content Editor if admin */}
                {isContentAdmin && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveView('setting_content_editor');
                      setShowMobileToolsDropdown(false);
                    }}
                    className="w-full flex items-center space-x-2.5 p-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 dark:text-purple-300 font-semibold border border-purple-500/30 transition-all text-left"
                  >
                    <Edit3 className="w-4 h-4 text-purple-500 shrink-0" />
                    <span>Dapur Edit Konten Live (Admin)</span>
                  </button>
                )}

                {/* Tema Selector in Mobile */}
                <div className="pt-2 border-t border-slate-100 dark:border-white/10">
                  <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1.5 flex items-center space-x-1">
                    <Palette className="w-3 h-3 text-sky-400" />
                    <span>Pilihan Warna Tema:</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {THEME_OPTIONS.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => {
                          setThemePalette(t.id);
                          setShowMobileToolsDropdown(false);
                        }}
                        className={`p-1.5 rounded-xl border text-[10px] font-bold flex items-center space-x-1.5 ${
                          themePalette === t.id
                            ? 'bg-sky-500/20 text-sky-600 dark:text-sky-300 border-sky-400'
                            : 'bg-slate-50 dark:bg-white/5 border-transparent text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0 shadow-xs"
                          style={{ backgroundColor: t.accentHex }}
                        />
                        <span className="truncate">{t.name.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE SUB-BAR (CLEAN BREADCRUMB & CONTEXT WITHOUT OVERFLOW) */}
      <div className="xl:hidden bg-slate-50/90 dark:bg-[#12223a]/90 border-t border-slate-200/80 dark:border-white/5 px-3 py-1.5 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-1.5 min-w-0 truncate">
          <Sparkles className="w-3.5 h-3.5 text-sky-500 shrink-0" />
          <span className="font-bold text-slate-800 dark:text-white truncate text-[11px] sm:text-xs">
            {getViewTitle()}
          </span>
        </div>
        <div className="text-[10px] text-slate-400 dark:text-slate-400 shrink-0 pl-2">
          <span className="text-emerald-500 font-bold">Aktif</span>
        </div>
      </div>

      {/* UNIT & PARTICIPANT SWITCHER DROPDOWN (FULL MODAL-LIKE MENU) */}
      {showUserDropdown && (
        <div className="absolute left-3 sm:left-4 top-16 mt-2 w-80 sm:w-96 bg-white dark:bg-[#162740] rounded-3xl shadow-2xl border border-slate-200 dark:border-white/15 p-3 z-50 text-xs animate-fadeIn">
          {/* Header Card with Photo & Email */}
          <div className="p-3 bg-gradient-to-r from-sky-500/10 to-indigo-500/10 rounded-2xl border border-sky-500/20 mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center space-x-2.5 truncate">
              <div className="relative group shrink-0">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-sky-400"
                />
                <button
                  type="button"
                  onClick={() => {
                    setShowProfileModal(true);
                    setShowUserDropdown(false);
                  }}
                  className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center text-[10px] shadow cursor-pointer hover:scale-110 transition-transform"
                  title="Ganti Foto Profil"
                >
                  <Camera className="w-2.5 h-2.5" />
                </button>
              </div>
              <div className="truncate">
                <div className="font-black text-slate-900 dark:text-white text-xs truncate">
                  {currentUser.name}
                </div>
                <div className="text-[10px] text-sky-600 dark:text-sky-300 font-bold truncate">
                  Asal Struktur: {currentUser.unit}
                </div>
                <div className="text-[10px] text-slate-400 truncate font-mono">
                  {currentUser.email}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowProfileModal(true);
                setShowUserDropdown(false);
              }}
              className="px-2.5 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-[11px] font-bold shadow-sm transition-all shrink-0 flex items-center space-x-1 cursor-pointer"
            >
              <Camera className="w-3 h-3" />
              <span>Foto</span>
            </button>
          </div>

          <div className="px-1 pb-1.5 flex items-center justify-between text-slate-500 dark:text-slate-400 font-bold text-[11px]">
            <span className="flex items-center space-x-1">
              <Building2 className="w-3.5 h-3.5 text-sky-400" />
              <span>Daftar Unit KAC &amp; Shaf 2 (ka01-ka14)</span>
            </span>
            <span className="text-[10px] font-mono">{allUsers.length} Unit</span>
          </div>

          {/* Unit list */}
          <div className="max-h-72 overflow-y-auto space-y-1 p-1 custom-scrollbar">
            {allUsers.map((u) => {
              const isSelected = u.id === currentUser.id;
              return (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => {
                    switchUser(u.id);
                    setShowUserDropdown(false);
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-sky-500/20 text-sky-600 dark:text-sky-300 font-bold border border-sky-500/40'
                      : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 truncate mr-2">
                    <img
                      src={u.avatar}
                      alt={u.name}
                      className="w-7 h-7 rounded-full object-cover ring-1 ring-sky-400/40 shrink-0"
                    />
                    <div className="truncate">
                      <div className="font-bold text-[12px] truncate flex items-center space-x-1.5">
                        <span>{u.unit}</span>
                        {(u.email === 'stafkacpubdn@gmail.com' || u.email === 'pubdnkac@gmail.com') && (
                          <span className="text-[9px] px-1 py-0.2 rounded bg-purple-500/20 text-purple-600 dark:text-purple-300 font-bold border border-purple-500/30">
                            Admin
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                        {u.name} • <span className="font-mono">{u.email}</span>
                      </div>
                    </div>
                  </div>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
