import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Flame,
  Award,
  Zap,
  Layers,
  ChevronRight,
  TrendingUp,
  Activity,
  ShieldCheck,
  Building2,
  FileText,
  Printer,
  X,
  RefreshCw,
  BarChart3,
  Calendar,
  AlertCircle,
  Eye,
  Sparkles,
  FileSpreadsheet,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserProfile } from '../../types';

export const ParticipantProgressDashboard: React.FC = () => {
  const {
    allUsers,
    currentUser,
    switchUser,
    addNotification,
    triggerCelebration,
    setShowGoogleSyncModal,
  } = useApp();

  const [search, setSearch] = useState('');
  const [filterLevel, setFilterLevel] = useState<'all' | 'level1' | 'level2' | 'level3'>('all');
  const [filterUnit, setFilterUnit] = useState<'all' | 'pusat' | 'shaf2'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'master_ready' | 'runner_active' | 'need_mentoring'>('all');
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [selectedParticipant, setSelectedParticipant] = useState<UserProfile | null>(null);
  const [isLiveSimulating, setIsLiveSimulating] = useState(false);

  // Filter logic
  const filteredUsers = allUsers.filter((u) => {
    if (filterUnit === 'pusat' && u.unitCode !== 'PUSAT') return false;
    if (filterUnit === 'shaf2' && u.unitCode === 'PUSAT') return false;

    if (filterLevel === 'level1' && u.level !== 1) return false;
    if (filterLevel === 'level2' && u.level !== 2) return false;
    if (filterLevel === 'level3' && u.level !== 3) return false;

    if (filterStatus === 'master_ready' && !u.classProgress.master.passed) return false;
    if (filterStatus === 'runner_active' && (!u.classProgress.runner.passed || u.classProgress.master.passed)) return false;
    if (filterStatus === 'need_mentoring' && u.comprehensionRate >= 80) return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      return u.name.toLowerCase().includes(q) || u.unit.toLowerCase().includes(q) || u.unitCode.toLowerCase().includes(q);
    }
    return true;
  });

  // Aggregate stats
  const totalUsersCount = allUsers.length;
  const avgComprehension = Math.round(allUsers.reduce((acc, u) => acc + u.comprehensionRate, 0) / totalUsersCount);
  const totalMasterCount = allUsers.filter((u) => u.classProgress.master.passed).length;
  const totalRunnerCount = allUsers.filter((u) => u.classProgress.runner.passed).length;
  const totalNewbieCount = allUsers.filter((u) => u.classProgress.newbie.passed).length;
  const totalLearningHours = Math.round(allUsers.reduce((acc, u) => acc + u.dailyLearningHours, 0) * 10) / 10;

  const handleSimulateLiveUpdate = () => {
    setIsLiveSimulating(true);
    addNotification('Sinkronisasi Lapangan...', 'Menerima data telemetri interaksi terbaru dari unit shaf 2...', 'info');
    setTimeout(() => {
      setIsLiveSimulating(false);
      triggerCelebration();
      addNotification('Data Real-Time Terperinci Diperbarui', '3 unit shaf baru saja menyelesaikan simulasi role-play lapangan!', 'achievement');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#11243e] via-[#16335c] to-[#0e1d33] border border-sky-500/30 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-semibold mb-2">
            <Activity className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            <span>Pusat Kendali Progres Belajar Real-Time (Live Telemetri)</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-white">
            Dashboard Progres Peserta KAC & Shaf 2 (ka01 - ka14)
          </h2>
          <p className="text-xs md:text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
            Pantau perkembangan kemampuan komunikasi 15 unit secara terperinci: status asesmen 3 tingkat (Newbie, Runner, Master), rekor 21-Day Habit Tracker, dan radar 8 keterampilan lapangan.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={() => setShowGoogleSyncModal(true)}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/25 flex items-center space-x-2 transition-all hover:scale-105 cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-200" />
            <span>Koneksi Google Sheets &amp; GitHub</span>
          </button>
          <button
            onClick={handleSimulateLiveUpdate}
            disabled={isLiveSimulating}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-sky-500/25 flex items-center space-x-2 transition-all hover:scale-105 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isLiveSimulating ? 'animate-spin' : ''}`} />
            <span>{isLiveSimulating ? 'Memperbarui...' : 'Simulasi Update Real-Time'}</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Peserta Aktif */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Total Unit Terpantau
            </span>
            <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-black text-slate-800 dark:text-white">
              {totalUsersCount}
            </span>
            <span className="text-xs text-slate-400 font-semibold">Unit (Pusat + ka01-ka14)</span>
          </div>
          <div className="text-[11px] text-emerald-500 flex items-center space-x-1 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>100% Terintegrasi Real-Time</span>
          </div>
        </div>

        {/* Card 2: Rata-Rata Pemahaman */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Rata-Rata Pemahaman
            </span>
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-black text-indigo-400">
              {avgComprehension}%
            </span>
            <span className="text-xs text-emerald-500 font-bold">+5.3% pekan ini</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${avgComprehension}%` }} />
          </div>
        </div>

        {/* Card 3: Kelulusan 3 Tingkat */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Kualifikasi Bertingkat
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center space-x-3 text-xs pt-0.5">
            <div>
              <span className="text-[10px] text-slate-400 block">L1 Newbie</span>
              <strong className="text-sky-400 font-black text-sm">{totalNewbieCount}/15</strong>
            </div>
            <div className="border-r border-slate-200 dark:border-white/10 h-6" />
            <div>
              <span className="text-[10px] text-slate-400 block">L2 Runner</span>
              <strong className="text-indigo-400 font-black text-sm">{totalRunnerCount}/15</strong>
            </div>
            <div className="border-r border-slate-200 dark:border-white/10 h-6" />
            <div>
              <span className="text-[10px] text-slate-400 block">L3 Master</span>
              <strong className="text-purple-400 font-black text-sm">{totalMasterCount}/15</strong>
            </div>
          </div>
          <div className="text-[11px] text-slate-400">
            Eskalasi berjenjang terverifikasi
          </div>
        </div>

        {/* Card 4: Total Jam Belajar Kolektif */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Jam Belajar Harian Kolektif
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-black text-emerald-400">
              {totalLearningHours}j
            </span>
            <span className="text-xs text-slate-400 font-medium">/ 30.0j target shaf</span>
          </div>
          <div className="text-[11px] text-slate-400 flex items-center space-x-1">
            <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
            <span>Streak tertinggi: 15 hari (ka03)</span>
          </div>
        </div>
      </div>

      {/* Filter and View Controls Bar */}
      <div className="p-5 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-xs">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Cari nama peserta, unit ka01 s/d ka14, atau KAC Pusat..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs"
            />
          </div>

          {/* View mode toggle */}
          <div className="flex items-center space-x-2 self-end lg:self-auto">
            <div className="p-1 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex space-x-1">
              <button
                onClick={() => setViewMode('card')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  viewMode === 'card'
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-white'
                }`}
              >
                Kartu Unit
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  viewMode === 'table'
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-white'
                }`}
              >
                Matriks Tabel
              </button>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 dark:border-white/5 text-xs">
          {/* Unit Scope */}
          <span className="text-slate-400 font-bold text-[11px] uppercase mr-1">Unit:</span>
          <button
            onClick={() => setFilterUnit('all')}
            className={`px-2.5 py-1 rounded-xl font-semibold transition-all ${
              filterUnit === 'all' ? 'bg-sky-500 text-white font-bold' : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300'
            }`}
          >
            Semua (15)
          </button>
          <button
            onClick={() => setFilterUnit('pusat')}
            className={`px-2.5 py-1 rounded-xl font-semibold transition-all ${
              filterUnit === 'pusat' ? 'bg-sky-500 text-white font-bold' : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300'
            }`}
          >
            KAC Pusat (1)
          </button>
          <button
            onClick={() => setFilterUnit('shaf2')}
            className={`px-2.5 py-1 rounded-xl font-semibold transition-all ${
              filterUnit === 'shaf2' ? 'bg-sky-500 text-white font-bold' : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300'
            }`}
          >
            Shaf 2: ka01 - ka14 (14)
          </button>

          <span className="text-slate-300 dark:text-slate-600 mx-1">|</span>

          {/* Level Filter */}
          <span className="text-slate-400 font-bold text-[11px] uppercase mr-1">Jenjang:</span>
          <button
            onClick={() => setFilterLevel('all')}
            className={`px-2.5 py-1 rounded-xl font-semibold transition-all ${
              filterLevel === 'all' ? 'bg-indigo-500 text-white font-bold' : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300'
            }`}
          >
            Semua Level
          </button>
          <button
            onClick={() => setFilterLevel('level3')}
            className={`px-2.5 py-1 rounded-xl font-semibold transition-all ${
              filterLevel === 'level3' ? 'bg-purple-500 text-white font-bold' : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300'
            }`}
          >
            Level 3 Master ({allUsers.filter((u) => u.level === 3).length})
          </button>
          <button
            onClick={() => setFilterLevel('level2')}
            className={`px-2.5 py-1 rounded-xl font-semibold transition-all ${
              filterLevel === 'level2' ? 'bg-indigo-500 text-white font-bold' : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300'
            }`}
          >
            Level 2 Runner ({allUsers.filter((u) => u.level === 2).length})
          </button>
          <button
            onClick={() => setFilterLevel('level1')}
            className={`px-2.5 py-1 rounded-xl font-semibold transition-all ${
              filterLevel === 'level1' ? 'bg-sky-500 text-white font-bold' : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300'
            }`}
          >
            Level 1 Newbie ({allUsers.filter((u) => u.level === 1).length})
          </button>
        </div>
      </div>

      {/* ================= VIEW 1: PARTICIPANT CARDS ================= */}
      {viewMode === 'card' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((u) => {
            const isCurrent = u.id === currentUser.id;
            return (
              <div
                key={u.id}
                className={`p-5 rounded-3xl border transition-all space-y-4 relative flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-sky-500/10 dark:bg-sky-500/15 border-sky-400 shadow-md shadow-sky-500/10 ring-1 ring-sky-400/40'
                    : 'bg-white dark:bg-[#172b47] border-slate-200 dark:border-white/10 hover:border-sky-400/40 hover:shadow-sm'
                }`}
              >
                <div className="space-y-3">
                  {/* Participant Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center space-x-3">
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="w-11 h-11 rounded-2xl object-cover ring-2 ring-sky-400/40 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center space-x-1.5">
                          <h4 className="font-extrabold text-sm text-slate-800 dark:text-white truncate">
                            {u.unit}
                          </h4>
                          {isCurrent && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-sky-500 text-white font-bold shrink-0">
                              Akun Aktif
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {u.name}
                        </p>
                      </div>
                    </div>
                    {/* Level Pill */}
                    <span
                      className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase shrink-0 border ${
                        u.level === 3
                          ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                          : u.level === 2
                          ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                          : 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                      }`}
                    >
                      Level {u.level}
                    </span>
                  </div>

                  {/* 3 Classes Progress Indicators */}
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-100 dark:border-white/5 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 font-semibold">Status 3 Jenjang:</span>
                      <span className="text-amber-400 font-mono font-bold">{u.totalXp} XP</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
                      {/* Newbie */}
                      <div
                        className={`p-1.5 rounded-xl border ${
                          u.classProgress.newbie.passed
                            ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 font-bold'
                            : 'bg-white/5 border-white/5 text-slate-500'
                        }`}
                      >
                        <span className="block font-bold">Newbie</span>
                        <span>{u.classProgress.newbie.passed ? `${u.classProgress.newbie.score}%` : 'Belum'}</span>
                      </div>
                      {/* Runner */}
                      <div
                        className={`p-1.5 rounded-xl border ${
                          u.classProgress.runner.passed
                            ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300 font-bold'
                            : 'bg-white/5 border-white/5 text-slate-500'
                        }`}
                      >
                        <span className="block font-bold">Runner</span>
                        <span>{u.classProgress.runner.passed ? `${u.classProgress.runner.score}%` : 'Proses'}</span>
                      </div>
                      {/* Master */}
                      <div
                        className={`p-1.5 rounded-xl border ${
                          u.classProgress.master.passed
                            ? 'bg-purple-500/20 border-purple-500/40 text-purple-300 font-bold'
                            : 'bg-white/5 border-white/5 text-slate-500'
                        }`}
                      >
                        <span className="block font-bold">Master</span>
                        <span>{u.classProgress.master.passed ? `${u.classProgress.master.score}%` : 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  {/* 21-Day Habit Progress bar for Current Tier */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">
                        {u.level === 3 ? 'Delta 21 Hari (Mentoring)' : u.level === 2 ? 'Beta 21 Hari (Lapangan)' : 'Alpha 21 Hari (Fondasi)'}:
                      </span>
                      <span className="font-bold text-slate-700 dark:text-slate-200">
                        {u.level === 3
                          ? `${u.classProgress.master.habitDaysDone}/21 hari`
                          : u.level === 2
                          ? `${u.classProgress.runner.habitDaysDone}/21 hari`
                          : `${u.classProgress.newbie.habitDaysDone}/21 hari`}
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-white/10 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          u.level === 3 ? 'bg-purple-500' : u.level === 2 ? 'bg-indigo-500' : 'bg-sky-500'
                        }`}
                        style={{
                          width: `${Math.round(
                            ((u.level === 3
                              ? u.classProgress.master.habitDaysDone
                              : u.level === 2
                              ? u.classProgress.runner.habitDaysDone
                              : u.classProgress.newbie.habitDaysDone) /
                              21) *
                              100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Quick Skills Mini Badges */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                    <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-white/5">
                      <span className="text-slate-400">Pemahaman</span>
                      <strong className="text-emerald-400">{u.comprehensionRate}%</strong>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-white/5">
                      <span className="text-slate-400">Jam Belajar</span>
                      <strong className="text-sky-400">{u.dailyLearningHours}j/hari</strong>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedParticipant(u)}
                    className="flex-1 py-2 px-3 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 text-sky-400 hover:text-sky-300 font-bold text-xs flex items-center justify-center space-x-1.5 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Lihat Rapor Detail</span>
                  </button>
                  <button
                    onClick={() => switchUser(u.id)}
                    className="py-2 px-3 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all"
                    title="Beralih peran ke anggota ini"
                  >
                    Beralih
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ================= VIEW 2: PARTICIPANT TABLE ================= */}
      {viewMode === 'table' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[750px]">
            <thead className="bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-300 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3 rounded-l-xl">Unit & Nama</th>
                <th className="p-3">Jenjang</th>
                <th className="p-3">L1 Newbie</th>
                <th className="p-3">L2 Runner</th>
                <th className="p-3">L3 Master</th>
                <th className="p-3">21-Day Habit</th>
                <th className="p-3">Pemahaman</th>
                <th className="p-3">Total XP</th>
                <th className="p-3 text-right rounded-r-xl">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                  <td className="p-3">
                    <div className="flex items-center space-x-2.5">
                      <img src={u.avatar} alt={u.name} className="w-7 h-7 rounded-full object-cover ring-1 ring-sky-400" />
                      <div>
                        <div className="font-bold text-slate-800 dark:text-white">{u.unit}</div>
                        <div className="text-[11px] text-slate-400">{u.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="font-bold text-sky-400">Level {u.level}</span>
                  </td>
                  <td className="p-3">
                    <span className={`font-bold ${u.classProgress.newbie.passed ? 'text-emerald-400' : 'text-slate-400'}`}>
                      {u.classProgress.newbie.passed ? `${u.classProgress.newbie.score}%` : 'Belum'}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`font-bold ${u.classProgress.runner.passed ? 'text-indigo-400' : 'text-slate-400'}`}>
                      {u.classProgress.runner.passed ? `${u.classProgress.runner.score}%` : 'Belum'}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`font-bold ${u.classProgress.master.passed ? 'text-purple-400' : 'text-slate-400'}`}>
                      {u.classProgress.master.passed ? `${u.classProgress.master.score}%` : 'Belum'}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="font-semibold text-slate-300">
                      {u.level === 3 ? u.classProgress.master.habitDaysDone : u.level === 2 ? u.classProgress.runner.habitDaysDone : u.classProgress.newbie.habitDaysDone}/21 hari
                    </span>
                  </td>
                  <td className="p-3 font-bold text-emerald-400">{u.comprehensionRate}%</td>
                  <td className="p-3 font-mono font-bold text-amber-400">{u.totalXp} XP</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => setSelectedParticipant(u)}
                      className="px-3 py-1.5 rounded-xl bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 font-bold text-[11px] transition-colors"
                    >
                      Rapor Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= MODAL: RAPOR DETAIL INDIVIDUAL ================= */}
      {selectedParticipant && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-[#172b47] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-white/10 space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-4">
              <div className="flex items-center space-x-3.5">
                <img
                  src={selectedParticipant.avatar}
                  alt={selectedParticipant.name}
                  className="w-12 h-12 rounded-2xl object-cover ring-2 ring-sky-400"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-sky-400">
                      Rapor Kemampuan Komunikasi Terperinci
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold">
                      {selectedParticipant.totalXp} XP
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-800 dark:text-white">
                    {selectedParticipant.unit} • {selectedParticipant.name}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedParticipant(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 8 Skills Radar Breakdown */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-slate-800 dark:text-white flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4 text-sky-400" />
                  <span>Matriks Radar 8 Keterampilan Komunikasi Real-Time</span>
                </h4>
                <span className="text-xs text-emerald-400 font-bold">
                  Indeks: {selectedParticipant.comprehensionRate}/100
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                {[
                  { label: 'Mendengarkan Aktif', val: selectedParticipant.skillsRadar.listening, color: 'bg-cyan-500' },
                  { label: 'Komunikasi Verbal', val: selectedParticipant.skillsRadar.verbal, color: 'bg-sky-500' },
                  { label: 'Bahasa Tubuh', val: selectedParticipant.skillsRadar.nonVerbal, color: 'bg-teal-500' },
                  { label: 'Kejelasan Pesan', val: selectedParticipant.skillsRadar.clarity, color: 'bg-emerald-500' },
                  { label: 'Empati Sosial', val: selectedParticipant.skillsRadar.empathy, color: 'bg-rose-500' },
                  { label: 'Objection Handling', val: selectedParticipant.skillsRadar.objectionHandling, color: 'bg-indigo-500' },
                  { label: 'Negosiasi Lapangan', val: selectedParticipant.skillsRadar.fieldNegotiation, color: 'bg-purple-500' },
                  { label: 'Mentoring & Krisis', val: selectedParticipant.skillsRadar.mentoringLeadership, color: 'bg-amber-500' },
                ].map((sk, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-100 dark:border-white/5 space-y-1">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-400 truncate">{sk.label}</span>
                      <strong className="text-slate-800 dark:text-white font-bold">{sk.val}%</strong>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                      <div className={`${sk.color} h-full rounded-full`} style={{ width: `${sk.val}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assessment Progress in 3 tiers */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/5 space-y-3 text-xs">
              <h4 className="font-bold text-slate-800 dark:text-white">
                Status Rekomendasi Kelulusan 3 Tingkat
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 space-y-1">
                  <div className="flex justify-between">
                    <span className="font-bold text-sky-400">Level 1 Newbie</span>
                    <span className="text-emerald-400 font-bold">{selectedParticipant.classProgress.newbie.passed ? 'LULUS' : 'PROSES'}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">Skor Asesmen: {selectedParticipant.classProgress.newbie.score}%</div>
                  <div className="text-[11px] text-slate-400">Alpha Habit: {selectedParticipant.classProgress.newbie.habitDaysDone}/21 hari</div>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 space-y-1">
                  <div className="flex justify-between">
                    <span className="font-bold text-indigo-400">Level 2 Runner</span>
                    <span className="text-indigo-400 font-bold">{selectedParticipant.classProgress.runner.passed ? 'LULUS' : 'PROSES'}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">Skor Asesmen: {selectedParticipant.classProgress.runner.score}%</div>
                  <div className="text-[11px] text-slate-400">Beta Habit: {selectedParticipant.classProgress.runner.habitDaysDone}/21 hari</div>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 space-y-1">
                  <div className="flex justify-between">
                    <span className="font-bold text-purple-400">Level 3 Master</span>
                    <span className="text-purple-400 font-bold">{selectedParticipant.classProgress.master.passed ? 'LULUS' : 'PENDING'}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">Skor Asesmen: {selectedParticipant.classProgress.master.score}%</div>
                  <div className="text-[11px] text-slate-400">Delta Habit: {selectedParticipant.classProgress.master.habitDaysDone}/21 hari</div>
                </div>
              </div>
            </div>

            {/* Mentor Recommendation Note */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-500/10 to-indigo-500/10 border border-sky-500/20 text-xs space-y-1.5">
              <div className="flex items-center space-x-2 text-sky-400 font-bold">
                <Sparkles className="w-4 h-4" />
                <span>Rekomendasi Pembinaan Khusus dari Kordinator KAC Pusat:</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Unit {selectedParticipant.unit} ({selectedParticipant.name}) telah menunjukkan keistiqamahan tinggi pada pilar komunikasi verbal dan empati. Disarankan untuk memperbanyak simulasi penanganan objeksi tandem bersama unit ka yang berdekatan wilayahnya.
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100 dark:border-white/10">
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center space-x-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Rapor Individual</span>
              </button>
              <button
                onClick={() => {
                  switchUser(selectedParticipant.id);
                  setSelectedParticipant(null);
                }}
                className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs shadow-md shadow-sky-500/25 flex items-center space-x-1.5"
              >
                <span>Masuk & Belajar Sebagai Unit Ini</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
