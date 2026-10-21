import React, { useState } from 'react';
import {
  LayoutGrid,
  FileText,
  CircleDot,
  Award,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Compass,
  FileSpreadsheet,
  Megaphone,
  HeartHandshake,
  SearchCode,
  Sliders,
  KeyRound,
  LogOut,
  Users,
  Trophy,
  Swords,
  MessageSquareQuote,
  Sparkles,
  Activity,
  Flame,
  Edit3,
  Camera,
  Bot,
  ShieldCheck,
  Target,
  X,
  Disc,
  BarChart2,
  BookOpen,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ActiveView } from '../types';

interface SidebarProps {
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile }) => {
  const {
    activeView,
    setActiveView,
    currentUser,
    setShowCompetitionModal,
    setShowLeaderboardModal,
    setShowProfileModal,
    setShowGoogleSyncModal,
    addNotification,
    isContentAdmin,
  } = useApp();

  const [openNewbie, setOpenNewbie] = useState(true);
  const [openRunner, setOpenRunner] = useState(false);
  const [openMaster, setOpenMaster] = useState(false);
  const [openBullets, setOpenBullets] = useState(false);

  const handleNav = (view: ActiveView) => {
    try {
      if (view === 'elevator_coach') {
        window.history.pushState(null, '', '/coach');
      } else if (view === 'elevator_human') {
        window.history.pushState(null, '', '/human');
      } else if (view === 'elevator_habit_lab') {
        window.history.pushState(null, '', '/lab');
      }
    } catch {}
    setActiveView(view);
    if (onCloseMobile) onCloseMobile();
  };

  const isNavActive = (view: ActiveView) => activeView === view;

  // Active item style: Luxury minimalist line highlight
  const getItemClasses = (view: ActiveView) => {
    const active = isNavActive(view);
    return `w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-150 text-left cursor-pointer text-xs font-medium ${
      active
        ? 'bg-white/[0.08] text-white border-l-2 border-sky-400 pl-2.5 font-semibold shadow-xs'
        : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]'
    }`;
  };

  return (
    <aside className="w-72 bg-[#0c1421] text-slate-200 flex flex-col h-full select-none border-r border-white/[0.06] shadow-2xl overflow-hidden font-sans">
      {/* Top Branding Header (Luxury Executive Minimalist) */}
      <div className="p-4 border-b border-white/[0.06] bg-[#09101a]/70 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5 truncate mr-2">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-400/25 flex items-center justify-center shadow-xs shrink-0">
              <Sparkles className="w-4 h-4 text-sky-400" />
            </div>
            <div className="truncate">
              <div className="font-bold tracking-tight text-white text-sm leading-tight truncate">
                Communicator Academy
              </div>
              <div className="text-[11px] text-slate-400 font-medium tracking-wide truncate">
                Shaf 2 · ka01–ka14
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 shrink-0">
            <span className="text-[9px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider bg-sky-500/15 text-sky-300 border border-sky-500/30">
              KAC
            </span>
            {onCloseMobile && (
              <button
                type="button"
                onClick={onCloseMobile}
                className="p-1 rounded-lg bg-white/[0.06] hover:bg-red-500/20 hover:text-red-300 text-slate-400 border border-white/10 transition-all cursor-pointer"
                aria-label="Tutup menu navigasi"
                title="Tutup Menu"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Scrollable Navigation Area */}
      <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-4 custom-scrollbar text-xs">
        {/* ========================================================= */}
        {/* UTAMA: INFOGRAFIS & PANDUAN LENGKAP                       */}
        {/* ========================================================= */}
        <div>
          <button
            type="button"
            onClick={() => handleNav('panduan_infografis')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all cursor-pointer border ${
              isNavActive('panduan_infografis')
                ? 'bg-sky-500/20 text-sky-200 border-sky-400/40 font-semibold'
                : 'bg-white/[0.03] text-slate-300 hover:text-white hover:bg-white/[0.06] border-white/[0.06]'
            }`}
          >
            <div className="flex items-center space-x-2.5 truncate">
              <BookOpen className="w-4 h-4 text-sky-400 shrink-0" />
              <span className="font-bold truncate">Infografis &amp; Panduan</span>
            </div>
            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
              SOP
            </span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* 1. IKHTISAR EKSEKUTIF (DASHBOARD)                        */}
        {/* ========================================================= */}
        <div>
          <div className="px-3 pb-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Ikhtisar Eksekutif
          </div>
          <div className="space-y-0.5">
            <button
              type="button"
              onClick={() => handleNav('dashboard_executive')}
              className={getItemClasses('dashboard_executive')}
            >
              <div className="flex items-center space-x-2.5 truncate">
                <LayoutGrid className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span className="truncate">Executive Summary</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleNav('dashboard_peserta')}
              className={getItemClasses('dashboard_peserta')}
            >
              <div className="flex items-center space-x-2.5 truncate">
                <Activity className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">Monitoring 15 Unit</span>
              </div>
              <span className="text-[9px] font-mono text-emerald-400">Real-Time</span>
            </button>

            <button
              type="button"
              onClick={() => handleNav('dashboard_ipooi')}
              className={getItemClasses('dashboard_ipooi')}
            >
              <div className="flex items-center space-x-2.5 truncate">
                <Disc className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span className="truncate">Analitik (IPOOI)</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleNav('dashboard_graphic')}
              className={getItemClasses('dashboard_graphic')}
            >
              <div className="flex items-center space-x-2.5 truncate">
                <BarChart2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span className="truncate">Grafik &amp; Perkembangan</span>
              </div>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. JENJANG KADERISASI KOMUNIKATOR                        */}
        {/* ========================================================= */}
        <div>
          <div className="px-3 pb-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Jenjang Kaderisasi
          </div>
          <div className="space-y-1">
            {/* NEWBIE CLASS ACCORDION */}
            <div className="rounded-xl overflow-hidden border border-white/[0.04] bg-white/[0.01]">
              <button
                type="button"
                onClick={() => setOpenNewbie(!openNewbie)}
                className="w-full flex items-center justify-between px-3 py-2 text-left text-slate-300 hover:text-white hover:bg-white/[0.03] font-semibold text-xs transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-2 truncate">
                  <span className="text-emerald-400 shrink-0">
                    {openNewbie ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  </span>
                  <span className="truncate">Newbie (Know How)</span>
                </div>
                <span className="text-[9px] font-mono text-slate-400">KPI A</span>
              </button>

              {openNewbie && (
                <div className="border-l border-white/[0.08] ml-4 pl-1.5 py-1 space-y-0.5">
                  <button
                    type="button"
                    onClick={() => handleNav('newbie_materi')}
                    className={getItemClasses('newbie_materi')}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <FileText className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">Materi &amp; Flipbook</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNav('newbie_assessment')}
                    className={getItemClasses('newbie_assessment')}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <CircleDot className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">Asesmen 50 Soal</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNav('newbie_result')}
                    className={getItemClasses('newbie_result')}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <Award className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span className="truncate">Hasil &amp; Sertifikat</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNav('newbie_cta')}
                    className={getItemClasses('newbie_cta')}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <ArrowRight className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span className="truncate">1st CTA (21 Hari Alpha)</span>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* RUNNER CLASS ACCORDION */}
            <div className="rounded-xl overflow-hidden border border-white/[0.04] bg-white/[0.01]">
              <button
                type="button"
                onClick={() => setOpenRunner(!openRunner)}
                className="w-full flex items-center justify-between px-3 py-2 text-left text-slate-300 hover:text-white hover:bg-white/[0.03] font-semibold text-xs transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-2 truncate">
                  <span className="text-purple-400 shrink-0">
                    {openRunner ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  </span>
                  <span className="truncate">Runner (Do How)</span>
                </div>
                <span className="text-[9px] font-mono text-slate-400">KPI B</span>
              </button>

              {openRunner && (
                <div className="border-l border-white/[0.08] ml-4 pl-1.5 py-1 space-y-0.5">
                  <button
                    type="button"
                    onClick={() => handleNav('runner_materi')}
                    className={getItemClasses('runner_materi')}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <FileText className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span className="truncate">Materi &amp; Flipbook</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNav('runner_assessment')}
                    className={getItemClasses('runner_assessment')}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <CircleDot className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">Asesmen 50 Soal</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNav('runner_result')}
                    className={getItemClasses('runner_result')}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <Award className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span className="truncate">Hasil &amp; Rekomendasi</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNav('runner_cta')}
                    className={getItemClasses('runner_cta')}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <ArrowRight className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span className="truncate">2nd CTA (21 Hari Beta)</span>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* MASTER CLASS ACCORDION */}
            <div className="rounded-xl overflow-hidden border border-white/[0.04] bg-white/[0.01]">
              <button
                type="button"
                onClick={() => setOpenMaster(!openMaster)}
                className="w-full flex items-center justify-between px-3 py-2 text-left text-slate-300 hover:text-white hover:bg-white/[0.03] font-semibold text-xs transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-2 truncate">
                  <span className="text-amber-400 shrink-0">
                    {openMaster ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  </span>
                  <span className="truncate">Master (Show How)</span>
                </div>
                <span className="text-[9px] font-mono text-slate-400">KPI C</span>
              </button>

              {openMaster && (
                <div className="border-l border-white/[0.08] ml-4 pl-1.5 py-1 space-y-0.5">
                  <button
                    type="button"
                    onClick={() => handleNav('master_materi')}
                    className={getItemClasses('master_materi')}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <FileText className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">Materi &amp; Flipbook</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNav('master_assessment')}
                    className={getItemClasses('master_assessment')}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <CircleDot className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">Asesmen 50 Soal</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNav('master_result')}
                    className={getItemClasses('master_result')}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <Award className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span className="truncate">Sertifikat Master</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNav('master_cta')}
                    className={getItemClasses('master_cta')}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <ArrowRight className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span className="truncate">3rd CTA (Delta Mentoring)</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. STUDIO PRAKTIK & MODUL TAKTIS                         */}
        {/* ========================================================= */}
        <div>
          <div className="px-3 pb-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Studio &amp; Modul Taktis
          </div>
          <div className="space-y-0.5">
            <button
              type="button"
              onClick={() => handleNav('bullet_elevator')}
              className={getItemClasses('bullet_elevator')}
            >
              <div className="flex items-center space-x-2.5 truncate">
                <Compass className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span className="truncate">Elevator Pitch (Flipbook)</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleNav('elevator_habit_lab')}
              className={getItemClasses('elevator_habit_lab')}
            >
              <div className="flex items-center space-x-2.5 truncate">
                <Target className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">21D Habit Lab (5P+1R)</span>
              </div>
              <span className="text-[9px] font-mono text-emerald-400">21D</span>
            </button>

            <button
              type="button"
              onClick={() => handleNav('elevator_coach')}
              className={getItemClasses('elevator_coach')}
            >
              <div className="flex items-center space-x-2.5 truncate">
                <Bot className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span className="truncate">AI Coach Lab</span>
              </div>
              <span className="text-[9px] font-mono text-purple-400">/coach</span>
            </button>

            <button
              type="button"
              onClick={() => handleNav('elevator_human')}
              className={getItemClasses('elevator_human')}
            >
              <div className="flex items-center space-x-2.5 truncate">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span className="truncate">Human Review (DENGAR)</span>
              </div>
              <span className="text-[9px] font-mono text-teal-400">/human</span>
            </button>

            {/* BITE THE BULLETS TEMATIK (Collapsible) */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setOpenBullets(!openBullets)}
                className="w-full flex items-center justify-between px-3 py-1.5 text-left text-slate-400 hover:text-white text-[11px] font-medium transition-colors cursor-pointer"
              >
                <span className="truncate">Modul Taktis Lainnya</span>
                <span className="text-slate-400">
                  {openBullets ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                </span>
              </button>

              {openBullets && (
                <div className="border-l border-white/[0.08] ml-4 pl-1.5 py-0.5 space-y-0.5">
                  <button
                    type="button"
                    onClick={() => handleNav('bullet_pra')}
                    className={getItemClasses('bullet_pra')}
                  >
                    <span className="truncate">Pra-Pengabaran</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNav('bullet_pengabaran')}
                    className={getItemClasses('bullet_pengabaran')}
                  >
                    <span className="truncate">Materi Pengabaran</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNav('bullet_pembinaan')}
                    className={getItemClasses('bullet_pembinaan')}
                  >
                    <span className="truncate">Materi Pembinaan</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNav('bullet_aora')}
                    className={getItemClasses('bullet_aora')}
                  >
                    <span className="truncate">AORA Framework</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 4. KOMUNITAS & KOMPETISI                                 */}
        {/* ========================================================= */}
        <div>
          <div className="px-3 pb-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Komunitas &amp; Tantangan
          </div>
          <div className="space-y-0.5">
            <button
              type="button"
              onClick={() => handleNav('forum_komunitas')}
              className={getItemClasses('forum_komunitas')}
            >
              <div className="flex items-center space-x-2.5 truncate">
                <MessageSquareQuote className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span className="truncate">Forum Diskusi</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setShowCompetitionModal(true)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all text-left text-xs cursor-pointer"
            >
              <div className="flex items-center space-x-2.5 truncate">
                <Swords className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">Duel 1v1 Antar Teman</span>
              </div>
              <span className="text-[9px] font-bold px-1 rounded bg-amber-500/20 text-amber-300">
                LIVE
              </span>
            </button>

            <button
              type="button"
              onClick={() => setShowLeaderboardModal(true)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all text-left text-xs cursor-pointer"
            >
              <div className="flex items-center space-x-2.5 truncate">
                <Trophy className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                <span className="truncate">Papan Peringkat Global</span>
              </div>
              <span className="text-[9px] font-mono text-yellow-400">TOP 15</span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 5. PENGATURAN & SINKRONISASI                             */}
        {/* ========================================================= */}
        <div>
          <div className="px-3 pb-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Pengaturan &amp; Sistem
          </div>
          <div className="space-y-0.5">
            <button
              type="button"
              onClick={() => {
                setShowGoogleSyncModal(true);
                if (onCloseMobile) onCloseMobile();
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-400 hover:text-emerald-300 hover:bg-white/[0.04] transition-all text-left text-xs cursor-pointer"
            >
              <div className="flex items-center space-x-2.5 truncate">
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">Koneksi Sheets &amp; GitHub</span>
              </div>
              <span className="text-[9px] font-mono text-emerald-400">SYNC</span>
            </button>

            <button
              type="button"
              onClick={() => handleNav('setting_tampilan')}
              className={getItemClasses('setting_tampilan')}
            >
              <div className="flex items-center space-x-2.5 truncate">
                <Sliders className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">Pengaturan Tampilan</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleNav('setting_password')}
              className={getItemClasses('setting_password')}
            >
              <div className="flex items-center space-x-2.5 truncate">
                <KeyRound className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">Ganti Password</span>
              </div>
            </button>

            {isContentAdmin && (
              <button
                type="button"
                onClick={() => handleNav('setting_content_editor')}
                className={getItemClasses('setting_content_editor')}
              >
                <div className="flex items-center space-x-2.5 truncate">
                  <Edit3 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span className="truncate">Edit Konten Live (Admin)</span>
                </div>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                addNotification('Sesi Berakhir', 'Anda telah keluar dari sesi saat ini.', 'info');
              }}
              className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-rose-400/80 hover:text-rose-300 hover:bg-rose-500/[0.08] transition-all text-left text-xs cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Keluar</span>
            </button>
          </div>
        </div>
      </div>

      {/* User Footer Profile Card (Minimalist Luxury) */}
      <div className="p-3 border-t border-white/[0.06] bg-[#09101a]/70 backdrop-blur-md">
        <div className="flex items-center justify-between space-x-2.5">
          <div className="relative group shrink-0">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover ring-1 ring-sky-400/40"
            />
            <button
              type="button"
              onClick={() => setShowProfileModal(true)}
              className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-sky-500 hover:bg-sky-400 text-white flex items-center justify-center shadow-xs cursor-pointer"
              title="Ganti Foto Profil"
            >
              <Camera className="w-2.5 h-2.5" />
            </button>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-white truncate">{currentUser.name}</div>
            <div className="text-[10px] text-slate-400 truncate flex items-center space-x-1.5">
              <span className="text-sky-400 font-mono">{currentUser.unit}</span>
              <span>·</span>
              <span className="text-amber-400 font-bold">{currentUser.totalXp} XP</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
