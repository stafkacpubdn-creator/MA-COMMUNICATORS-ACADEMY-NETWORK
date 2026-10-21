import React, { useState } from 'react';
import {
  BarChart3,
  PieChart as PieIcon,
  TrendingUp,
  Activity,
  Layers,
  Award,
  Zap,
  Filter,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GraphicChartPie: React.FC = () => {
  const { currentUser, allUsers, habits, userAssessmentResults } = useApp();
  const [timeRange, setTimeRange] = useState<'7hari' | '30hari'>('7hari');

  const days7 = [
    { day: 'Senin', hours: 1.8, target: 2.0, shafAvg: 1.5, quizScore: 85 },
    { day: 'Selasa', hours: 2.2, target: 2.0, shafAvg: 1.6, quizScore: 90 },
    { day: 'Rabu', hours: 1.5, target: 2.0, shafAvg: 1.4, quizScore: 82 },
    { day: 'Kamis', hours: 2.5, target: 2.0, shafAvg: 1.8, quizScore: 95 },
    { day: 'Jumat', hours: 2.0, target: 2.0, shafAvg: 1.5, quizScore: 88 },
    { day: 'Sabtu', hours: 2.7, target: 2.0, shafAvg: 2.1, quizScore: 92 },
    { day: 'Minggu (Hari Ini)', hours: currentUser.dailyLearningHours, target: 2.0, shafAvg: 1.7, quizScore: currentUser.comprehensionRate },
  ];

  const moduleBreakdown = [
    { label: 'Newbie (Know How)', percentage: 35, color: '#38bdf8', xp: '1,450 XP' },
    { label: 'Runner (Do How)', percentage: 30, color: '#818cf8', xp: '1,200 XP' },
    { label: 'Master (Show How)', percentage: 20, color: '#c084fc', xp: '800 XP' },
    { label: 'Bite The Bullets', percentage: 15, color: '#34d399', xp: '600 XP' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Filter & Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-indigo-400" />
            <span>Grafik Kemajuan Belajar, Chart & Distribusi Pie</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Pemantauan visual aktivitas belajar mandiri harian & perbandingan rata-rata Shaf 2
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Rentang:</span>
          </span>
          <div className="bg-slate-100 dark:bg-white/10 p-1 rounded-xl flex space-x-1 text-xs">
            <button
              onClick={() => setTimeRange('7hari')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                timeRange === '7hari'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-white'
              }`}
            >
              7 Hari Terakhir
            </button>
            <button
              onClick={() => setTimeRange('30hari')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                timeRange === '30hari'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-white'
              }`}
            >
              30 Hari
            </button>
          </div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Bar Chart of Daily Learning Hours vs Target */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-white/10 pb-3">
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white text-sm">
                Grafik Jam Belajar Harian ({currentUser.unit}) vs Rata-rata Shaf 2
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Garis putus-putus menunjukkan target minimum 2.0 jam/hari
              </p>
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <span className="flex items-center space-x-1.5 text-sky-400">
                <span className="w-3 h-3 rounded bg-sky-500 inline-block" />
                <span>{currentUser.unit}</span>
              </span>
              <span className="flex items-center space-x-1.5 text-slate-400">
                <span className="w-3 h-3 rounded bg-slate-400/50 inline-block" />
                <span>Rata-rata Shaf 2</span>
              </span>
            </div>
          </div>

          {/* Interactive SVG Bar Chart */}
          <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 pt-6 px-2">
            {days7.map((item, idx) => {
              const maxScale = 3.0;
              const userHeightPercent = Math.min(100, (item.hours / maxScale) * 100);
              const avgHeightPercent = Math.min(100, (item.shafAvg / maxScale) * 100);
              return (
                <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] bg-slate-900 text-white px-2 py-1 rounded-md mb-2 pointer-events-none whitespace-nowrap shadow-lg">
                    {item.hours} jam ({item.quizScore}%)
                  </div>
                  <div className="w-full flex items-end justify-center gap-1 h-44">
                    <div
                      className="w-1/2 max-w-[20px] bg-gradient-to-t from-sky-600 to-sky-400 rounded-t-lg transition-all duration-500 group-hover:brightness-110"
                      style={{ height: `${userHeightPercent}%` }}
                    />
                    <div
                      className="w-1/2 max-w-[20px] bg-slate-400/30 dark:bg-slate-600/40 rounded-t-lg transition-all duration-500"
                      style={{ height: `${avgHeightPercent}%` }}
                    />
                  </div>
                  <div className="mt-3 text-[11px] font-medium text-slate-500 dark:text-slate-400 text-center truncate w-full">
                    {item.day.split(' ')[0]}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 text-sky-600 dark:text-sky-300">
              <Zap className="w-4 h-4 text-sky-400 shrink-0" />
              <span>
                Produktivitas {currentUser.unit} berada <strong className="font-bold">22% di atas rata-rata</strong> Shaf 2 pekan ini!
              </span>
            </div>
            <span className="font-bold text-sky-500">Kinerja A+</span>
          </div>
        </div>

        {/* Right 1 Col: Donut / Pie Chart for Module Distribution */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-white/10 pb-3">
            <h3 className="font-bold text-slate-800 dark:text-white text-sm flex items-center space-x-1.5">
              <PieIcon className="w-4 h-4 text-emerald-400" />
              <span>Distribusi Modul Pembelajaran</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Proporsi waktu dan energi belajar mandiri
            </p>
          </div>

          <div className="flex items-center justify-center py-2">
            <div className="relative w-44 h-44">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#38bdf8"
                  strokeWidth="18"
                  strokeDasharray="35 65"
                  strokeDashoffset="0"
                  className="hover:opacity-80 transition-opacity"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#818cf8"
                  strokeWidth="18"
                  strokeDasharray="30 70"
                  strokeDashoffset="-35"
                  className="hover:opacity-80 transition-opacity"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#c084fc"
                  strokeWidth="18"
                  strokeDasharray="20 80"
                  strokeDashoffset="-65"
                  className="hover:opacity-80 transition-opacity"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#34d399"
                  strokeWidth="18"
                  strokeDasharray="15 85"
                  strokeDashoffset="-85"
                  className="hover:opacity-80 transition-opacity"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl font-black text-slate-800 dark:text-white">
                  100%
                </span>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">
                  Komprehensif
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            {moduleBreakdown.map((m, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5"
              >
                <div className="flex items-center space-x-2">
                  <span
                    className="w-3 h-3 rounded-md shrink-0"
                    style={{ backgroundColor: m.color }}
                  />
                  <span className="font-medium text-slate-700 dark:text-slate-200">
                    {m.label}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-slate-400 font-mono text-[11px]">{m.xp}</span>
                  <span className="font-bold text-slate-800 dark:text-white">
                    {m.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row: Asesmen & Kecepatan Respons Detail */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-800 dark:text-white text-sm flex items-center space-x-2">
          <Activity className="w-4 h-4 text-sky-400" />
          <span>Matriks Kinerja Kuis Adaptif & Respons Waktu per Jenjang</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-100 dark:border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-sky-500">NEWBIE (Know How)</span>
              <span className="font-bold text-emerald-400">Skor: {userAssessmentResults.newbie?.score ?? 95}%</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Tingkat Kesulitan: <strong className="text-slate-700 dark:text-slate-200">{userAssessmentResults.newbie?.difficultyReached ?? 'Sulit'}</strong>
            </div>
            <div className="w-full bg-slate-200 dark:bg-white/10 h-2 rounded-full overflow-hidden">
              <div className="bg-sky-500 h-full rounded-full" style={{ width: `${userAssessmentResults.newbie?.score ?? 95}%` }} />
            </div>
            <div className="text-[11px] text-slate-400">Rata-rata waktu per soal: 16 detik</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-100 dark:border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-indigo-500">RUNNER (Do How)</span>
              <span className="font-bold text-emerald-400">Skor: {userAssessmentResults.runner?.score ?? 88}%</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Tingkat Kesulitan: <strong className="text-slate-700 dark:text-slate-200">{userAssessmentResults.runner?.difficultyReached ?? 'Sedang'}</strong>
            </div>
            <div className="w-full bg-slate-200 dark:bg-white/10 h-2 rounded-full overflow-hidden">
              <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${userAssessmentResults.runner?.score ?? 88}%` }} />
            </div>
            <div className="text-[11px] text-slate-400">Rata-rata waktu per soal: 22 detik</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-100 dark:border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-purple-500">MASTER (Show How)</span>
              <span className="font-bold text-purple-400">
                Skor: {userAssessmentResults.master?.score ?? 94}%
              </span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Tingkat Kesulitan: <strong className="text-slate-700 dark:text-slate-200">{userAssessmentResults.master?.difficultyReached ?? 'Sulit'}</strong>
            </div>
            <div className="w-full bg-slate-200 dark:bg-white/10 h-2 rounded-full overflow-hidden">
              <div className="bg-purple-500 h-full rounded-full" style={{ width: `${userAssessmentResults.master?.score ?? 94}%` }} />
            </div>
            <div className="text-[11px] text-slate-400">Target skor kelulusan: ≥ 90% (LULUS)</div>
          </div>
        </div>
      </div>
    </div>
  );
};
