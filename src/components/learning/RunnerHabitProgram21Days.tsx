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
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DayHabit21 } from '../../types';

export const RunnerHabitProgram21Days: React.FC = () => {
  const { habits21Runner, updateDayHabit21Runner, currentUser, triggerCelebration, addNotification } = useApp();

  const [activeWeekFilter, setActiveWeekFilter] = useState<'all' | 'w1' | 'w2' | 'w3' | 'pending'>('all');
  const [activeDayModal, setActiveDayModal] = useState<DayHabit21 | null>(null);
  const [modalStatus, setModalStatus] = useState<DayHabit21['status']>('selesai');
  const [modalNote, setModalNote] = useState('');

  const [rubricScores, setRubricScores] = useState({
    kecepatanRespon: 3,
    ketenanganEmosi: 2,
    teknikObjection: 3,
    komitmenClosing: 2,
  });

  const completedDays = habits21Runner.filter((h) => h.status === 'selesai').length;
  const attemptedDays = habits21Runner.filter((h) => h.status === 'dicoba_sebagian').length;
  const progressPercent = Math.round((completedDays / 21) * 100);

  const filteredHabits = habits21Runner.filter((h) => {
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
    updateDayHabit21Runner(activeDayModal.day, modalStatus, modalNote);
    setActiveDayModal(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Overview */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#17203d] via-[#1c2e5c] to-[#121c38] border border-indigo-500/30 text-white shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold mb-2">
              <Zap className="w-3.5 h-3.5 text-indigo-400" />
              <span>Program Simulasi Lapangan 21 Hari (Beta Role Play)</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-white">
              REFLEKS CEPAT • OBJECTION HANDLING • PENETRASI LAPANGAN SHAF 2
            </h2>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
              Program 21 hari tingkat Runner melatih ketahanan mental saat berhadapan langsung dengan penolakan nyata, simulasi tandem berpasangan, dan penguncian komitmen tindak lanjut.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 border border-white/15 flex items-center space-x-4 shrink-0">
            <div className="text-center">
              <span className="text-2xl font-black text-indigo-400">{completedDays}/21</span>
              <span className="text-[10px] text-slate-300 block font-semibold uppercase">Hari Tuntas</span>
            </div>
            <div className="border-r border-white/15 h-8" />
            <div className="text-center">
              <span className="text-2xl font-black text-amber-400">{progressPercent}%</span>
              <span className="text-[10px] text-slate-300 block font-semibold uppercase">Kemajuan</span>
            </div>
          </div>
        </div>

        {/* Milestone Indicator */}
        <div className="pt-2 border-t border-white/10">
          <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
            <span className="text-slate-300">Milestone Simulasi Lapangan Beta:</span>
            <span className="text-indigo-300">
              {completedDays >= 21
                ? '🏆 Lulus Kualifikasi Eksekutor Lapangan Penuh!'
                : completedDays >= 14
                ? '⭐ Tahap Uji Stres & Rebuttal Lanjutan'
                : completedDays >= 7
                ? '🌿 Tahap Pembuka Spontan & Observasi'
                : '🚀 Tahap Pemula Taktis'}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
            <div className={`p-2 rounded-xl border ${completedDays >= 1 ? 'bg-indigo-500/20 border-indigo-400 text-indigo-200 font-bold' : 'bg-white/5 border-white/10 text-slate-400'}`}>
              Hari 1: Audit Refleks
            </div>
            <div className={`p-2 rounded-xl border ${completedDays >= 7 ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold' : 'bg-white/5 border-white/10 text-slate-400'}`}>
              Hari 7: Rebuttal &lt; 5s
            </div>
            <div className={`p-2 rounded-xl border ${completedDays >= 14 ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-bold' : 'bg-white/5 border-white/10 text-slate-400'}`}>
              Hari 14: Simulasi Stres
            </div>
            <div className={`p-2 rounded-xl border ${completedDays >= 21 ? 'bg-purple-500/20 border-purple-400 text-purple-200 font-bold' : 'bg-white/5 border-white/10 text-slate-400'}`}>
              Hari 21: Tuntas Runner
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
                ? 'bg-indigo-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-white'
            }`}
          >
            Semua (21 Hari)
          </button>
          <button
            onClick={() => setActiveWeekFilter('w1')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeWeekFilter === 'w1'
                ? 'bg-indigo-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-white'
            }`}
          >
            Minggu 1 (Hari 1-7: Observasi & Pembuka)
          </button>
          <button
            onClick={() => setActiveWeekFilter('w2')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeWeekFilter === 'w2'
                ? 'bg-indigo-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-white'
            }`}
          >
            Minggu 2 (Hari 8-14: Objeksi & Rebuttal)
          </button>
          <button
            onClick={() => setActiveWeekFilter('w3')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeWeekFilter === 'w3'
                ? 'bg-indigo-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-white'
            }`}
          >
            Minggu 3 (Hari 15-21: Penetrasi & Closing)
          </button>
          <button
            onClick={() => setActiveWeekFilter('pending')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeWeekFilter === 'pending'
                ? 'bg-indigo-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-white'
            }`}
          >
            Belum Dilakukan
          </button>
        </div>
        <span className="text-[11px] text-slate-400">
          Klik kartu hari untuk mengisi bukti praktik lapangan
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
                  : 'bg-white dark:bg-[#172b47] border-slate-200 dark:border-white/10 hover:border-indigo-400/40'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-lg bg-indigo-500/15 text-indigo-400 flex items-center justify-center text-xs font-black">
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
                  <span>Bukti Lapangan:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">{h.proofType}</span>
                </div>
                {h.note ? (
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-[#12223a] text-[11px] text-slate-600 dark:text-slate-300 italic line-clamp-2">
                    "{h.note}"
                  </div>
                ) : (
                  <div className="text-[11px] text-indigo-400 hover:underline">
                    + Klik untuk mencatat bukti lapangan
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Rubrik Evaluasi Ketangkasan Lapangan */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
          <div>
            <h3 className="font-bold text-base text-slate-800 dark:text-white flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
              <span>Rubrik Evaluasi Ketangkasan Komunikasi Lapangan (Runner Beta)</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Evaluasi 4 indikator ketangkasan Do How saat menghadapi dinamika dan penolakan langsung di lapangan
            </p>
          </div>
          <span className="text-xs font-bold text-indigo-400">Level 2 Rubrik</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          {/* Kecepatan Respon */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-100 dark:border-white/5 space-y-2">
            <span className="font-bold text-slate-800 dark:text-white block">1. Kecepatan Respon</span>
            <div className="space-y-1">
              {[
                { score: 1, label: 'Gugup & ragu (> 10 detik)' },
                { score: 2, label: 'Cukup tangkas (5-10 detik)' },
                { score: 3, label: 'Refleks spontan & tenang (< 5 detik)' },
              ].map((lvl) => (
                <button
                  key={lvl.score}
                  onClick={() => setRubricScores({ ...rubricScores, kecepatanRespon: lvl.score })}
                  className={`w-full p-2 rounded-xl text-left text-[11px] transition-all ${
                    rubricScores.kecepatanRespon === lvl.score
                      ? 'bg-indigo-500 text-white font-bold'
                      : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {lvl.score} • {lvl.label}
                </button>
              ))}
            </div>
          </div>
          {/* Ketenangan Emosi */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-100 dark:border-white/5 space-y-2">
            <span className="font-bold text-slate-800 dark:text-white block">2. Ketenangan Emosi</span>
            <div className="space-y-1">
              {[
                { score: 1, label: 'Mudah terpancing debat kusir' },
                { score: 2, label: 'Mampu menahan nada bicara' },
                { score: 3, label: 'Tetap tersenyum & empati penuh' },
              ].map((lvl) => (
                <button
                  key={lvl.score}
                  onClick={() => setRubricScores({ ...rubricScores, ketenanganEmosi: lvl.score })}
                  className={`w-full p-2 rounded-xl text-left text-[11px] transition-all ${
                    rubricScores.ketenanganEmosi === lvl.score
                      ? 'bg-purple-500 text-white font-bold'
                      : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {lvl.score} • {lvl.label}
                </button>
              ))}
            </div>
          </div>
          {/* Teknik Objection */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-100 dark:border-white/5 space-y-2">
            <span className="font-bold text-slate-800 dark:text-white block">3. Teknik Objection</span>
            <div className="space-y-1">
              {[
                { score: 1, label: 'Membantah tanpa validasi' },
                { score: 2, label: 'Memahami teknik Feel-Felt-Found' },
                { score: 3, label: 'Mahir pivot & solutif memikat' },
              ].map((lvl) => (
                <button
                  key={lvl.score}
                  onClick={() => setRubricScores({ ...rubricScores, teknikObjection: lvl.score })}
                  className={`w-full p-2 rounded-xl text-left text-[11px] transition-all ${
                    rubricScores.teknikObjection === lvl.score
                      ? 'bg-emerald-500 text-white font-bold'
                      : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {lvl.score} • {lvl.label}
                </button>
              ))}
            </div>
          </div>
          {/* Komitmen Closing */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-100 dark:border-white/5 space-y-2">
            <span className="font-bold text-slate-800 dark:text-white block">4. Komitmen Closing</span>
            <div className="space-y-1">
              {[
                { score: 1, label: 'Dialog berakhir mengambang' },
                { score: 2, label: 'Mendapat kontak WhatsApp' },
                { score: 3, label: 'Menyepakati jadwal temu kedua' },
              ].map((lvl) => (
                <button
                  key={lvl.score}
                  onClick={() => setRubricScores({ ...rubricScores, komitmenClosing: lvl.score })}
                  className={`w-full p-2 rounded-xl text-left text-[11px] transition-all ${
                    rubricScores.komitmenClosing === lvl.score
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
        <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-700 dark:text-indigo-300 flex items-center justify-between">
          <span>Keberhasilan diukur dari konsistensi membuka silaturahmi baru setiap pekan!</span>
          <button
            onClick={() => {
              triggerCelebration();
              addNotification('Rubrik Runner Tersimpan', 'Skor rubrik ketangkasan lapangan telah direkam.', 'achievement');
            }}
            className="px-3.5 py-1.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs"
          >
            Simpan Evaluasi Rubrik Runner
          </button>
        </div>
      </div>

      {/* Modal for Recording Daily Habit Proof */}
      {activeDayModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1a2d4b] rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                  Hari ke-{activeDayModal.day} (Runner Beta)
                </span>
                <h3 className="font-extrabold text-base text-slate-800 dark:text-white">
                  {activeDayModal.focus}
                </h3>
              </div>
              <button
                onClick={() => setActiveDayModal(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#12223a] text-xs space-y-1">
              <span className="text-slate-400 font-semibold block">Tugas Praktik Lapangan:</span>
              <p className="text-slate-700 dark:text-slate-200 font-medium">
                {activeDayModal.lightTask}
              </p>
              <div className="text-[11px] text-indigo-400 font-bold pt-1">
                Bukti Yang Diharapkan: {activeDayModal.proofType}
              </div>
            </div>
            {/* Status Selection */}
            <div className="space-y-1.5 text-xs">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                Status Pelaksanaan:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { key: 'selesai', label: 'Selesai Dilakukan' },
                  { key: 'dicoba_sebagian', label: 'Dicoba Sebagian' },
                  { key: 'belum_dilakukan', label: 'Belum Dilakukan' },
                  { key: 'tidak_ada_kesempatan', label: 'Tidak Ada Kesempatan' },
                ].map((st) => (
                  <button
                    key={st.key}
                    type="button"
                    onClick={() => setModalStatus(st.key as any)}
                    className={`p-2.5 rounded-xl text-left text-xs font-semibold border transition-all ${
                      modalStatus === st.key
                        ? 'bg-indigo-500 text-white border-indigo-500 shadow-sm'
                        : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>
            {/* Note / Proof text */}
            <div className="space-y-1.5 text-xs">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                Catatan Bukti Lapangan (Hasil Respon Audiens & Analisis):
              </label>
              <textarea
                rows={3}
                placeholder="Contoh: 'Tuan rumah awalnya ragu karena mengira ada biaya, setelah dijelaskan dengan Feel-Felt-Found beliau menyambut hangat...'"
                value={modalNote}
                onChange={(e) => setModalNote(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveDayModal(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 font-semibold text-xs"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSaveDay}
                className="flex-1 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs shadow-md shadow-indigo-500/25 flex items-center justify-center space-x-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Catatan Lapangan</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
