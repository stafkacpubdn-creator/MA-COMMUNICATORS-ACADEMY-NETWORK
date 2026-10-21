import React from 'react';
import {
  TrendingUp,
  Clock,
  CheckCircle,
  Flame,
  Zap,
  Target,
  ArrowUpRight,
  BookOpen,
  Calendar,
  Sparkles,
  Swords,
  Layers,
  Activity,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ExecutiveSummary: React.FC = () => {
  const {
    currentUser,
    setActiveView,
    habits,
    userAssessmentResults,
    calendarEvents,
    setShowCompetitionModal,
    setShowReportModal,
  } = useApp();

  const completedHabits = habits.filter((h) => h.completedToday).length;
  const habitPercentage = Math.round((completedHabits / habits.length) * 100) || 0;

  const upcomingEvents = calendarEvents
    .filter((e) => !e.completed)
    .sort((a, b) => a.date.localeCompare(b.date));
  const nextEvent = upcomingEvents[0];

  const passedCount = Object.values(userAssessmentResults).filter((r) => r?.passed).length;

  return (
    <div className="space-y-6">
      {/* Executive Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#173052] via-[#1a3860] to-[#122844] border border-sky-500/30 shadow-2xl p-6 md:p-8 text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-400/20 text-sky-300 border border-sky-400/30 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sistem Pembelajaran Mandiri Adaptif Real-Time</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
              Selamat Belajar, <span className="text-sky-300">{currentUser.name}</span>
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Unit <strong className="text-white">{currentUser.unit}</strong> saat ini berada di tingkat pemahaman{' '}
              <span className="text-emerald-400 font-bold">{currentUser.comprehensionRate}%</span> dengan kecepatan adaptif{' '}
              <span className="text-amber-400 font-bold">{currentUser.adaptiveSpeed}</span>. Kurikulum menyesuaikan materi secara real-time.
            </p>
          </div>
          {/* Quick CTA Actions */}
          <div className="flex flex-wrap lg:flex-col gap-2.5 shrink-0">
            <button
              onClick={() => setActiveView('dashboard_peserta')}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold text-xs md:text-sm shadow-lg shadow-emerald-500/25 flex items-center space-x-2 transition-all hover:scale-[1.02]"
            >
              <Activity className="w-4 h-4" />
              <span>Dashboard Progres Peserta</span>
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </button>
            <button
              onClick={() => setActiveView('newbie_materi')}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold text-xs md:text-sm shadow-lg shadow-sky-500/25 flex items-center space-x-2 transition-all hover:scale-[1.02]"
            >
              <BookOpen className="w-4 h-4" />
              <span>Lanjutkan Materi</span>
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </button>
            <button
              onClick={() => setShowCompetitionModal(true)}
              className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs md:text-sm border border-white/20 flex items-center space-x-2 transition-all hover:scale-[1.02]"
            >
              <Swords className="w-4 h-4 text-amber-400" />
              <span>Tantangan Duel 1v1</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Key Executive Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#192f4e] border border-slate-200 dark:border-white/10 shadow-sm relative overflow-hidden group hover:border-sky-400/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Pemahaman Real-Time
            </span>
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-500 dark:text-sky-400 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-800 dark:text-white">
              {currentUser.comprehensionRate}%
            </span>
            <span className="text-xs font-semibold text-emerald-500 flex items-center">
              +4.2% pekan ini
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-1">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Mode: {currentUser.adaptiveSpeed}</span>
          </div>
          <div className="mt-3 w-full bg-slate-100 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-sky-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${currentUser.comprehensionRate}%` }}
            />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#192f4e] border border-slate-200 dark:border-white/10 shadow-sm relative overflow-hidden group hover:border-indigo-400/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Jam Belajar Harian
            </span>
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-800 dark:text-white">
              {currentUser.dailyLearningHours}j
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">/ target 2.0j</span>
          </div>
          <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            {currentUser.dailyLearningHours >= 2.0 ? '✓ Target tercapai optimal' : 'Tinggal 20 menit lagi'}
          </div>
          <div className="mt-3 w-full bg-slate-100 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-indigo-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (currentUser.dailyLearningHours / 2.0) * 100)}%` }}
            />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#192f4e] border border-slate-200 dark:border-white/10 shadow-sm relative overflow-hidden group hover:border-emerald-400/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Habit Tracker Hari Ini
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-800 dark:text-white">
              {completedHabits}/{habits.length}
            </span>
            <span className="text-xs font-semibold text-emerald-500">{habitPercentage}%</span>
          </div>
          <div className="mt-2 text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-1">
            <Flame className="w-3.5 h-3.5 text-orange-500" />
            <span>Streak: {currentUser.streakDays} hari beruntun</span>
          </div>
          <div className="mt-3 w-full bg-slate-100 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${habitPercentage}%` }}
            />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#192f4e] border border-slate-200 dark:border-white/10 shadow-sm relative overflow-hidden group hover:border-purple-400/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Akademi & XP
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-500 dark:text-purple-400 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-800 dark:text-white">
              {currentUser.totalXp}
            </span>
            <span className="text-xs font-bold text-amber-500">XP</span>
          </div>
          <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            {passedCount} dari 3 Level Asesmen Lulus
          </div>
          <div className="mt-3 w-full bg-slate-100 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-purple-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${(passedCount / 3) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white text-base">
                Evaluasi Kinerja Harian & Penyesuaian Adaptif
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Analisis real-time berdasarkan kecepatan baca dan akurasi kuis
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-sky-500/15 text-sky-600 dark:text-sky-300 text-xs font-semibold border border-sky-500/25">
              Live Tracker
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-100 dark:border-white/5 space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                Tingkat Kecepatan
              </span>
              <div className="text-lg font-bold text-sky-500 dark:text-sky-400">
                {currentUser.adaptiveSpeed}
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                Materi dipadatkan dengan fokus pengayaan konsep aplikatif.
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-100 dark:border-white/5 space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                Rekomendasi AI Harian
              </span>
              <div className="text-lg font-bold text-emerald-500 dark:text-emerald-400">
                Simulasi AORA
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                Perdalam tahap Ask & Observe untuk pengabaran wilayah baru.
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-100 dark:border-white/5 space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                Status Kesiapan Shaf
              </span>
              <div className="text-lg font-bold text-indigo-500 dark:text-indigo-400">
                Siap Lapangan
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                Telah memenuhi standar Base KPI A dan Stair KPI B.
              </p>
            </div>
          </div>
          {/* Curriculum Quick Nav Cards */}
          <div className="pt-2">
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
              Jalur Pembelajaran 3 Tingkat
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => setActiveView('newbie_materi')}
                className="p-3 rounded-2xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/20 text-left transition-all group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-sky-500 dark:text-sky-400 uppercase">
                    Level 1
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <div className="font-bold text-xs text-slate-800 dark:text-white truncate">
                  NEWBIE Class
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Know How • Base KPI A
                </div>
              </button>
              <button
                onClick={() => setActiveView('runner_materi')}
                className="p-3 rounded-2xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-left transition-all group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 uppercase">
                    Level 2
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <div className="font-bold text-xs text-slate-800 dark:text-white truncate">
                  RUNNER Class
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Do How • Stair KPI B
                </div>
              </button>
              <button
                onClick={() => setActiveView('master_materi')}
                className="p-3 rounded-2xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-left transition-all group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-purple-500 dark:text-purple-400 uppercase">
                    Level 3
                  </span>
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                </div>
                <div className="font-bold text-xs text-slate-800 dark:text-white truncate">
                  MASTER Class
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Show How • Roof KPI C
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-sky-400" />
                <h3 className="font-bold text-slate-800 dark:text-white text-sm">
                  Agenda Prioritas
                </h3>
              </div>
              <span className="text-[10px] text-emerald-500 font-semibold">
                Google / Outlook Ready
              </span>
            </div>
            {nextEvent ? (
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500 text-white">
                    Urgensi {nextEvent.urgency}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    {nextEvent.date} • {nextEvent.time} WIB
                  </span>
                </div>
                <div className="font-bold text-xs text-slate-800 dark:text-white">
                  {nextEvent.title}
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-300">
                  Kategori: {nextEvent.category} • Notifikasi aktif
                </div>
              </div>
            ) : (
              <div className="p-4 text-center text-xs text-slate-400">
                Tidak ada agenda mendesak saat ini.
              </div>
            )}
            {/* Habit Quick Toggles */}
            <div className="space-y-1.5 pt-1">
              <div className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                Alpha & Beta Habit Cepat
              </div>
              {habits.slice(0, 3).map((h) => (
                <div
                  key={h.id}
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-xs"
                >
                  <span className="truncate pr-2 text-slate-700 dark:text-slate-200">
                    {h.title}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      h.completedToday
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {h.completedToday ? 'Selesai' : 'Belum'}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-2 border-t border-slate-100 dark:border-white/10 flex gap-2">
            <button
              onClick={() => setActiveView('dashboard_ipooi')}
              className="flex-1 py-2 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-xs font-semibold text-slate-700 dark:text-slate-200 text-center transition-all"
            >
              Lihat IPOOI
            </button>
            <button
              onClick={() => setShowReportModal(true)}
              className="flex-1 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-xs font-semibold text-sky-600 dark:text-sky-300 text-center transition-all border border-sky-500/30"
            >
              Unduh Laporan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
