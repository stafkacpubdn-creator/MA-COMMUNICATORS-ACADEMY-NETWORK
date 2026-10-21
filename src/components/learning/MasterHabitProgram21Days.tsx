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
  Crown,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DayHabit21 } from '../../types';

export const MasterHabitProgram21Days: React.FC = () => {
  const { habits21Master, updateDayHabit21Master, currentUser, triggerCelebration, addNotification } = useApp();

  const [activeWeekFilter, setActiveWeekFilter] = useState<'all' | 'w1' | 'w2' | 'w3' | 'pending'>('all');
  const [activeDayModal, setActiveDayModal] = useState<DayHabit21 | null>(null);
  const [modalStatus, setModalStatus] = useState<DayHabit21['status']>('selesai');
  const [modalNote, setModalNote] = useState('');

  const [rubricScores, setRubricScores] = useState({
    kapasitasCoaching: 3,
    deEskalasiKrisis: 3,
    delegasiKemandirian: 2,
    dampakIPOOI: 3,
  });

  const completedDays = habits21Master.filter((h) => h.status === 'selesai').length;
  const attemptedDays = habits21Master.filter((h) => h.status === 'dicoba_sebagian').length;
  const progressPercent = Math.round((completedDays / 21) * 100);

  const filteredHabits = habits21Master.filter((h) => {
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
    updateDayHabit21Master(activeDayModal.day, modalStatus, modalNote);
    setActiveDayModal(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Overview */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#201538] via-[#2f1b52] to-[#170e2b] border border-purple-500/30 text-white shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-semibold mb-2">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>Program Kepemimpinan & Mentoring 21 Hari (Delta Role Play)</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-white">
              KETELADANAN SHOW HOW • COACHING KADER • KETAHANAN KRISIS
            </h2>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
              Tingkat Master memusatkan energi pada pembentukan kader baru, penanganan krisis narasi publik, dan audit jaminan mutu sistem komunikasi KAC secara komprehensif.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 border border-white/15 flex items-center space-x-4 shrink-0">
            <div className="text-center">
              <span className="text-2xl font-black text-purple-300">{completedDays}/21</span>
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
            <span className="text-slate-300">Milestone Kepemimpinan Delta:</span>
            <span className="text-purple-300">
              {completedDays >= 21
                ? '👑 Puncak Keteladanan Paripurna Master Communicator!'
                : completedDays >= 14
                ? '⭐ Tahap Validasi Kemandirian Kader'
                : completedDays >= 7
                ? '🌿 Tahap Audit Narasi & Coaching Dasar'
                : '🚀 Tahap Inisiasi Master'}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
            <div className={`p-2 rounded-xl border ${completedDays >= 1 ? 'bg-purple-500/20 border-purple-400 text-purple-200 font-bold' : 'bg-white/5 border-white/10 text-slate-400'}`}>
              Hari 1: Visi Kepemimpinan
            </div>
            <div className={`p-2 rounded-xl border ${completedDays >= 7 ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold' : 'bg-white/5 border-white/10 text-slate-400'}`}>
              Hari 7: Delegasi Tim
            </div>
            <div className={`p-2 rounded-xl border ${completedDays >= 14 ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-bold' : 'bg-white/5 border-white/10 text-slate-400'}`}>
              Hari 14: Diplomasi Lembaga
            </div>
            <div className={`p-2 rounded-xl border ${completedDays >= 21 ? 'bg-amber-400/30 border-amber-400 text-amber-300 font-black' : 'bg-white/5 border-white/10 text-slate-400'}`}>
              Hari 21: Ikrar Master
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
                ? 'bg-purple-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-white'
            }`}
          >
            Semua (21 Hari)
          </button>
          <button
            onClick={() => setActiveWeekFilter('w1')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeWeekFilter === 'w1'
                ? 'bg-purple-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-white'
            }`}
          >
            Minggu 1 (Hari 1-7: Visi & Coaching)
          </button>
          <button
            onClick={() => setActiveWeekFilter('w2')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeWeekFilter === 'w2'
                ? 'bg-purple-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-white'
            }`}
          >
            Minggu 2 (Hari 8-14: Delegasi & Krisis)
          </button>
          <button
            onClick={() => setActiveWeekFilter('w3')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeWeekFilter === 'w3'
                ? 'bg-purple-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-white'
            }`}
          >
            Minggu 3 (Hari 15-21: Diplomasi & Ikrar)
          </button>
          <button
            onClick={() => setActiveWeekFilter('pending')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeWeekFilter === 'pending'
                ? 'bg-purple-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-white'
            }`}
          >
            Belum Dilakukan
          </button>
        </div>
        <span className="text-[11px] text-slate-400">
          Klik kartu hari untuk mencatat bukti kepemimpinan & mentoring
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
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center space-x-1">
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
                  ? 'bg-purple-500/5 dark:bg-purple-500/10 border-purple-500/30 shadow-sm'
                  : 'bg-white dark:bg-[#172b47] border-slate-200 dark:border-white/10 hover:border-purple-400/40'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center text-xs font-black">
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
                  <span>Bukti Kepemimpinan:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">{h.proofType}</span>
                </div>
                {h.note ? (
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-[#12223a] text-[11px] text-slate-600 dark:text-slate-300 italic line-clamp-2">
                    "{h.note}"
                  </div>
                ) : (
                  <div className="text-[11px] text-purple-400 hover:underline">
                    + Klik untuk mencatat bukti kepemimpinan
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Rubrik Evaluasi Kematangan Kepemimpinan Master */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
          <div>
            <h3 className="font-bold text-base text-slate-800 dark:text-white flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-purple-400" />
              <span>Rubrik Evaluasi Kematangan Kepemimpinan Komunikator (Master Delta)</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Evaluasi 4 pilar keteladanan Show How dalam membentuk kader mandiri dan mengawal narasi gerakan
            </p>
          </div>
          <span className="text-xs font-bold text-purple-400">Level 3 Rubrik</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          {/* Kapasitas Coaching */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-100 dark:border-white/5 space-y-2">
            <span className="font-bold text-slate-800 dark:text-white block">1. Kapasitas Coaching</span>
            <div className="space-y-1">
              {[
                { score: 1, label: 'Masih sering mendikte instruksi' },
                { score: 2, label: 'Menggunakan active questioning' },
                { score: 3, label: 'Membangun kesadaran mandiri kader' },
              ].map((lvl) => (
                <button
                  key={lvl.score}
                  onClick={() => setRubricScores({ ...rubricScores, kapasitasCoaching: lvl.score })}
                  className={`w-full p-2 rounded-xl text-left text-[11px] transition-all ${
                    rubricScores.kapasitasCoaching === lvl.score
                      ? 'bg-purple-500 text-white font-bold'
                      : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {lvl.score} • {lvl.label}
                </button>
              ))}
            </div>
          </div>
          {/* De-eskalasi Krisis */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-100 dark:border-white/5 space-y-2">
            <span className="font-bold text-slate-800 dark:text-white block">2. De-eskalasi Krisis</span>
            <div className="space-y-1">
              {[
                { score: 1, label: 'Gugup saat dihadapkan konflik' },
                { score: 2, label: 'Mampu merilis klarifikasi tepat' },
                { score: 3, label: 'Ahli rekonsiliasi & pendingin suasana' },
              ].map((lvl) => (
                <button
                  key={lvl.score}
                  onClick={() => setRubricScores({ ...rubricScores, deEskalasiKrisis: lvl.score })}
                  className={`w-full p-2 rounded-xl text-left text-[11px] transition-all ${
                    rubricScores.deEskalasiKrisis === lvl.score
                      ? 'bg-indigo-500 text-white font-bold'
                      : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {lvl.score} • {lvl.label}
                </button>
              ))}
            </div>
          </div>
          {/* Delegasi Kemandirian */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-100 dark:border-white/5 space-y-2">
            <span className="font-bold text-slate-800 dark:text-white block">3. Delegasi Kemandirian</span>
            <div className="space-y-1">
              {[
                { score: 1, label: 'Semua harus lewat tangan sendiri' },
                { score: 2, label: 'Mendelegasikan tugas terstruktur' },
                { score: 3, label: 'Kader mampu berjalan tanpa figur sentral' },
              ].map((lvl) => (
                <button
                  key={lvl.score}
                  onClick={() => setRubricScores({ ...rubricScores, delegasiKemandirian: lvl.score })}
                  className={`w-full p-2 rounded-xl text-left text-[11px] transition-all ${
                    rubricScores.delegasiKemandirian === lvl.score
                      ? 'bg-emerald-500 text-white font-bold'
                      : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {lvl.score} • {lvl.label}
                </button>
              ))}
            </div>
          </div>
          {/* Dampak IPOOI */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-100 dark:border-white/5 space-y-2">
            <span className="font-bold text-slate-800 dark:text-white block">4. Dampak IPOOI Wilayah</span>
            <div className="space-y-1">
              {[
                { score: 1, label: 'Laporan sebatas absensi formalitas' },
                { score: 2, label: 'Menganalisis rasio Output & Outcome' },
                { score: 3, label: 'Mentransformasi Impact Index nyata' },
              ].map((lvl) => (
                <button
                  key={lvl.score}
                  onClick={() => setRubricScores({ ...rubricScores, dampakIPOOI: lvl.score })}
                  className={`w-full p-2 rounded-xl text-left text-[11px] transition-all ${
                    rubricScores.dampakIPOOI === lvl.score
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
        <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-700 dark:text-purple-300 flex items-center justify-between">
          <span>Kematangan Master diakui dari seberapa banyak pemimpin baru yang berhasil Anda lahirkan!</span>
          <button
            onClick={() => {
              triggerCelebration();
              addNotification('Rubrik Master Tersimpan', 'Skor rubrik kematangan kepemimpinan telah direkam.', 'achievement');
            }}
            className="px-3.5 py-1.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs"
          >
            Simpan Evaluasi Rubrik Master
          </button>
        </div>
      </div>

      {/* Modal for Recording Daily Habit Proof */}
      {activeDayModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1a2d4b] rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">
                  Hari ke-{activeDayModal.day} (Master Delta)
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
              <span className="text-slate-400 font-semibold block">Tugas Kepemimpinan & Mentoring:</span>
              <p className="text-slate-700 dark:text-slate-200 font-medium">
                {activeDayModal.lightTask}
              </p>
              <div className="text-[11px] text-purple-400 font-bold pt-1">
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
                        ? 'bg-purple-500 text-white border-purple-500 shadow-sm'
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
                Catatan Bukti Kepemimpinan (Hasil Supervisi & Dampak):
              </label>
              <textarea
                rows={3}
                placeholder="Contoh: 'Melakukan sesi coaching 30 menit dengan kader ka03 mengenai penanganan keraguan tokoh masyarakat; merumuskan 3 solusi bersama...'"
                value={modalNote}
                onChange={(e) => setModalNote(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                className="flex-1 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs shadow-md shadow-purple-500/25 flex items-center justify-center space-x-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Catatan Kepemimpinan</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
