import React, { useState } from 'react';
import {
  Flame,
  CheckCircle2,
  Calendar,
  Sparkles,
  Award,
  ChevronRight,
  Save,
  MessageSquare,
  HelpCircle,
  Clock,
  Filter,
  Check,
  Share2,
  ThumbsUp,
  Smile,
  ShieldCheck,
  Send,
  FileCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DayHabit21 } from '../../types';

export const HabitProgram21Days: React.FC = () => {
  const { habits21, updateDayHabit21, currentUser, triggerCelebration, addNotification } = useApp();

  const [activeWeekFilter, setActiveWeekFilter] = useState<'all' | 'w1' | 'w2' | 'w3' | 'pending'>('all');
  const [activeDayModal, setActiveDayModal] = useState<DayHabit21 | null>(null);
  const [modalStatus, setModalStatus] = useState<DayHabit21['status']>('selesai');
  const [modalNote, setModalNote] = useState('');

  const [rubricScores, setRubricScores] = useState({
    kejelasan: 2,
    relevansi: 2,
    mendengarkan: 3,
    pemeriksaan: 2,
  });

  const completedDays = habits21.filter((h) => h.status === 'selesai').length;
  const attemptedDays = habits21.filter((h) => h.status === 'dicoba_sebagian').length;
  const progressPercent = Math.round((completedDays / 21) * 100);

  const filteredHabits = habits21.filter((h) => {
    if (activeWeekFilter === 'w1') return h.day >= 1 && h.day <= 7;
    if (activeWeekFilter === 'w2') return h.day >= 8 && h.day <= 14;
    if (activeWeekFilter === 'w3') return h.day >= 15 && h.day <= 21;
    if (activeWeekFilter === 'pending') return h.status === 'belum_dilakukan';
    return true;
  });

  const handleOpenDayModal = (h: DayHabit21) => {
    setActiveDayModal(h);
    setModalStatus(h.status);
    setModalNote(h.note || '');
  };

  const handleSaveDay = () => {
    if (!activeDayModal) return;
    updateDayHabit21(activeDayModal.day, modalStatus, modalNote);
    setActiveDayModal(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Overview & Philosophy */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#192b45] via-[#1c385c] to-[#142338] border border-rose-500/30 text-white shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold mb-2">
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              <span>Program Kebiasaan 21 Hari (Alpha Role Play)</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-white">
              KENALI DIRI • LATIH LANGKAH KECIL • RAYAKAN KEMAJUAN
            </h2>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
              Tujuan program adalah membentuk kebiasaan kecil yang realistis dan mengukur kemajuan secara bertahap. Bila satu hari terlewat, lanjutkan kembali tanpa hukuman atau rasa gagal.
            </p>
          </div>
          {/* Quick Progress Ring / Card */}
          <div className="p-4 rounded-2xl bg-white/10 border border-white/15 flex items-center space-x-4 shrink-0">
            <div className="text-center">
              <span className="text-2xl font-black text-rose-400">{completedDays}/21</span>
              <span className="text-[10px] text-slate-300 block font-semibold uppercase">Hari Tuntas</span>
            </div>
            <div className="border-r border-white/15 h-8" />
            <div className="text-center">
              <span className="text-2xl font-black text-amber-400">{progressPercent}%</span>
              <span className="text-[10px] text-slate-300 block font-semibold uppercase">Kemajuan</span>
            </div>
          </div>
        </div>

        {/* Milestone Indicator Bar */}
        <div className="pt-2 border-t border-white/10">
          <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
            <span className="text-slate-300">Milestone Perkembangan 21 Hari:</span>
            <span className="text-sky-300">
              {completedDays >= 21
                ? '🏆 Menuntaskan Siklus Penuh!'
                : completedDays >= 14
                ? '⭐ Tahap Berkembang (Minggu 2)'
                : completedDays >= 7
                ? '🌿 Tahap Bertahan (Minggu 1)'
                : '🚀 Tahap Mulai'}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
            <div className={`p-2 rounded-xl border ${completedDays >= 1 ? 'bg-sky-500/20 border-sky-400 text-sky-200 font-bold' : 'bg-white/5 border-white/10 text-slate-400'}`}>
              Hari 1: Mulai
            </div>
            <div className={`p-2 rounded-xl border ${completedDays >= 7 ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold' : 'bg-white/5 border-white/10 text-slate-400'}`}>
              Hari 7: Bertahan
            </div>
            <div className={`p-2 rounded-xl border ${completedDays >= 14 ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-bold' : 'bg-white/5 border-white/10 text-slate-400'}`}>
              Hari 14: Berkembang
            </div>
            <div className={`p-2 rounded-xl border ${completedDays >= 21 ? 'bg-rose-500/20 border-rose-400 text-rose-200 font-bold' : 'bg-white/5 border-white/10 text-slate-400'}`}>
              Hari 21: Tuntas
            </div>
          </div>
        </div>
      </div>

      {/* Week Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm">
          <button
            onClick={() => setActiveWeekFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeWeekFilter === 'all'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-white'
            }`}
          >
            Semua (21 Hari)
          </button>
          <button
            onClick={() => setActiveWeekFilter('w1')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeWeekFilter === 'w1'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-white'
            }`}
          >
            Minggu 1 (Hari 1-7)
          </button>
          <button
            onClick={() => setActiveWeekFilter('w2')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeWeekFilter === 'w2'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-white'
            }`}
          >
            Minggu 2 (Hari 8-14)
          </button>
          <button
            onClick={() => setActiveWeekFilter('w3')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeWeekFilter === 'w3'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-white'
            }`}
          >
            Minggu 3 (Hari 15-21)
          </button>
          <button
            onClick={() => setActiveWeekFilter('pending')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeWeekFilter === 'pending'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-white'
            }`}
          >
            Belum Dilakukan
          </button>
        </div>
        <span className="text-[11px] text-slate-400">
          Klik pada kartu hari untuk mencatat bukti & status praktik
        </span>
      </div>

      {/* 21 Days Interactive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredHabits.map((h) => {
          const isDone = h.status === 'selesai';
          const isPartial = h.status === 'dicoba_sebagian';
          const isNoOpp = h.status === 'tidak_ada_kesempatan';

          let statusBadge = (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-slate-400">
              Belum Dilakukan
            </span>
          );
          if (isDone) {
            statusBadge = (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center space-x-1">
                <Check className="w-3 h-3" />
                <span>Selesai</span>
              </span>
            );
          } else if (isPartial) {
            statusBadge = (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                Dicoba Sebagian
              </span>
            );
          } else if (isNoOpp) {
            statusBadge = (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-500/20 text-slate-400 border border-slate-500/30">
                Tidak Ada Kesempatan
              </span>
            );
          }

          return (
            <div
              key={h.day}
              onClick={() => handleOpenDayModal(h)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 flex flex-col justify-between ${
                isDone
                  ? 'bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/30 shadow-sm'
                  : 'bg-white dark:bg-[#172b47] border-slate-200 dark:border-white/10 hover:border-sky-400/40'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-lg bg-rose-500/15 text-rose-500 dark:text-rose-400 flex items-center justify-center text-xs font-black">
                    #{h.day}
                  </span>
                  {statusBadge}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800 dark:text-white leading-snug">
                    {h.focus}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    {h.lightTask}
                  </p>
                </div>
              </div>
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-white/5 text-xs">
                <div className="flex justify-between items-center text-[11px] text-slate-400">
                  <span>Bukti Praktik:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">{h.proofType}</span>
                </div>
                {h.note ? (
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-[#12223a] text-[11px] text-slate-600 dark:text-slate-300 italic line-clamp-2">
                    "{h.note}"
                  </div>
                ) : (
                  <div className="text-[11px] text-sky-500 hover:underline">
                    + Klik untuk mengisi bukti praktik
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Rubrik Kualitas Komunikasi */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
          <div>
            <h3 className="font-bold text-base text-slate-800 dark:text-white flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-sky-400" />
              <span>Rubrik Evaluasi Kualitas Komunikasi (Awal vs Hari 7, 14, 21)</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Evaluasi 4 indikator perilaku komunikasi untuk melihat perkembangan nyata tanpa angka mutlak
            </p>
          </div>
          <span className="text-xs font-bold text-sky-400">Level 1 Rubrik</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          {/* Kejelasan */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-100 dark:border-white/5 space-y-2">
            <span className="font-bold text-slate-800 dark:text-white block">1. Kejelasan Pesan</span>
            <div className="space-y-1">
              {[
                { score: 1, label: 'Perlu Dukungan (Inti sulit dikenali)' },
                { score: 2, label: 'Berkembang (Inti cukup jelas)' },
                { score: 3, label: 'Cukup Baik (Inti jelas & ringkas)' },
              ].map((lvl) => (
                <button
                  key={lvl.score}
                  onClick={() => setRubricScores({ ...rubricScores, kejelasan: lvl.score })}
                  className={`w-full p-2 rounded-xl text-left text-[11px] transition-all ${
                    rubricScores.kejelasan === lvl.score
                      ? 'bg-sky-500 text-white font-bold'
                      : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {lvl.score} • {lvl.label}
                </button>
              ))}
            </div>
          </div>
          {/* Relevansi */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-100 dark:border-white/5 space-y-2">
            <span className="font-bold text-slate-800 dark:text-white block">2. Relevansi Konteks</span>
            <div className="space-y-1">
              {[
                { score: 1, label: 'Belum sesuai situasi audiens' },
                { score: 2, label: 'Sebagian sesuai situasi' },
                { score: 3, label: 'Sesuai kebutuhan lawan bicara' },
              ].map((lvl) => (
                <button
                  key={lvl.score}
                  onClick={() => setRubricScores({ ...rubricScores, relevansi: lvl.score })}
                  className={`w-full p-2 rounded-xl text-left text-[11px] transition-all ${
                    rubricScores.relevansi === lvl.score
                      ? 'bg-indigo-500 text-white font-bold'
                      : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {lvl.score} • {lvl.label}
                </button>
              ))}
            </div>
          </div>
          {/* Mendengarkan */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-100 dark:border-white/5 space-y-2">
            <span className="font-bold text-slate-800 dark:text-white block">3. Mendengarkan Utuh</span>
            <div className="space-y-1">
              {[
                { score: 1, label: 'Sering melewatkan inti cerita' },
                { score: 2, label: 'Memahami sebagian besar ide' },
                { score: 3, label: 'Merangkum dengan tepat' },
              ].map((lvl) => (
                <button
                  key={lvl.score}
                  onClick={() => setRubricScores({ ...rubricScores, mendengarkan: lvl.score })}
                  className={`w-full p-2 rounded-xl text-left text-[11px] transition-all ${
                    rubricScores.mendengarkan === lvl.score
                      ? 'bg-emerald-500 text-white font-bold'
                      : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {lvl.score} • {lvl.label}
                </button>
              ))}
            </div>
          </div>
          {/* Pemeriksaan Pemahaman */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-100 dark:border-white/5 space-y-2">
            <span className="font-bold text-slate-800 dark:text-white block">4. Cek Pemahaman</span>
            <div className="space-y-1">
              {[
                { score: 1, label: 'Belum pernah memeriksa' },
                { score: 2, label: 'Sesekali memeriksa pesan' },
                { score: 3, label: 'Memastikan pesan dipahami' },
              ].map((lvl) => (
                <button
                  key={lvl.score}
                  onClick={() => setRubricScores({ ...rubricScores, pemeriksaan: lvl.score })}
                  className={`w-full p-2 rounded-xl text-left text-[11px] transition-all ${
                    rubricScores.pemeriksaan === lvl.score
                      ? 'bg-amber-500 text-white font-bold'
                      : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {lvl.score} • {lvl.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="p-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-xs text-sky-700 dark:text-sky-300 flex items-center justify-between">
          <span>Kenyamanan bukan satu-satunya tanda keberhasilan. Kemajuan diakui dari tindakan yang dicoba!</span>
          <button
            onClick={() => {
              triggerCelebration();
              addNotification('Rubrik Tersimpan', 'Skor rubrik perkembangan komunikasi telah dicatat.', 'achievement');
            }}
            className="px-3.5 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs"
          >
            Simpan Evaluasi Rubrik
          </button>
        </div>
      </div>
    </div>
  );
};
