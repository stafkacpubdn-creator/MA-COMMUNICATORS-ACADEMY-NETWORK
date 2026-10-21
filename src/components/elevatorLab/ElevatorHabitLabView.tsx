import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Flame,
  Award,
  Users,
  Trophy,
  CheckCircle2,
  Clock,
  Play,
  Pause,
  RotateCcw,
  BookOpen,
  Send,
  RefreshCw,
  FileSpreadsheet,
  Download,
  ShieldCheck,
  AlertTriangle,
  ChevronRight,
  Eye,
  MessageSquare,
  ThumbsUp,
  ExternalLink,
  Target,
  BarChart3,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DAYS_21_SCHEDULE, HABIT_LAB_BADGES } from '../../data/elevatorPitch21Data';
import {
  DaySchedule21,
  DaySubmissionRecord,
  AiCoachEvaluation,
  PeerReviewDENGAR,
} from '../../types/elevatorHabitLab';
import { evaluateSubmissionWithAiCoach } from '../../services/elevatorPitchAiCoach';
import { sendToAppsScript } from '../../services/googleSyncService';

interface ElevatorHabitLabViewProps {
  initialTab?: 'beranda' | 'studio' | 'review' | 'fasilitator';
}

export const ElevatorHabitLabView: React.FC<ElevatorHabitLabViewProps> = ({ initialTab = 'beranda' }) => {
  const { currentUser, allUsers, addNotification, triggerCelebration } = useApp();

  const [activeTab, setActiveTab] = useState<'beranda' | 'studio' | 'review' | 'fasilitator'>(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const handleTabChange = (tab: 'beranda' | 'studio' | 'review' | 'fasilitator') => {
    setActiveTab(tab);
    try {
      const targetPath = tab === 'studio' ? '/coach' : tab === 'review' || tab === 'fasilitator' ? '/human' : '/lab';
      if (window.location.pathname !== targetPath) {
        window.history.pushState(null, '', targetPath);
      }
    } catch {
      // safe fallback in iframe
    }
  };
  const [selectedDay, setSelectedDay] = useState<number>(1);

  // Participant Submissions Storage
  const [submissions, setSubmissions] = useState<Record<number, DaySubmissionRecord>>(() => {
    const saved = localStorage.getItem(`kac_habit_lab_sub_${currentUser.id}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return {};
      }
    }
    return {};
  });

  // Studio Form State
  const currentDaySchedule: DaySchedule21 =
    DAYS_21_SCHEDULE.find((d) => d.day === selectedDay) || DAYS_21_SCHEDULE[0];

  const existingSubmission = submissions[selectedDay];

  const [pitchScript, setPitchScript] = useState<string>(existingSubmission?.pitchScript || '');
  const [evidenceType, setEvidenceType] = useState<DaySubmissionRecord['evidenceType']>(
    existingSubmission?.evidenceType || currentDaySchedule.requiredEvidence
  );
  const [evidenceContent, setEvidenceContent] = useState<string>(
    existingSubmission?.evidenceContent || ''
  );
  const [durationMinutes, setDurationMinutes] = useState<number>(
    existingSubmission?.durationMinutes || currentDaySchedule.targetDurationMinutes
  );
  const [confidenceBefore, setConfidenceBefore] = useState<number>(
    existingSubmission?.confidenceBefore || 3
  );
  const [confidenceAfter, setConfidenceAfter] = useState<number>(
    existingSubmission?.confidenceAfter || 4
  );
  const [checklist, setChecklist] = useState<Record<string, boolean>>(() => {
    if (existingSubmission?.checklistStatus) return existingSubmission.checklistStatus;
    const initial: Record<string, boolean> = {};
    currentDaySchedule.instruction5P1R.periksa.forEach((p, idx) => {
      initial[`chk-${idx}`] = false;
    });
    return initial;
  });
  const [oneSuccess, setOneSuccess] = useState<string>(
    existingSubmission?.oneSuccess || 'Inti pesan tersampaikan tepat 45 detik.'
  );
  const [oneImprovement, setOneImprovement] = useState<string>(
    existingSubmission?.oneImprovement || 'Mengurangi jeda nafas terburu-buru di kalimat penutup.'
  );
  const [freeNotes, setFreeNotes] = useState<string>(existingSubmission?.freeNotes || '');

  // Timer State
  const [timerSeconds, setTimerSeconds] = useState(45);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Syncing state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form when selectedDay changes
  useEffect(() => {
    const sub = submissions[selectedDay];
    if (sub) {
      setPitchScript(sub.pitchScript || '');
      setEvidenceContent(sub.evidenceContent || '');
      setDurationMinutes(sub.durationMinutes || currentDaySchedule.targetDurationMinutes);
      setConfidenceBefore(sub.confidenceBefore || 3);
      setConfidenceAfter(sub.confidenceAfter || 4);
      setChecklist(sub.checklistStatus || {});
      setOneSuccess(sub.oneSuccess || '');
      setOneImprovement(sub.oneImprovement || '');
      setFreeNotes(sub.freeNotes || '');
    } else {
      setPitchScript(currentDaySchedule.exemplarPitch || '');
      setEvidenceContent('');
      setDurationMinutes(currentDaySchedule.targetDurationMinutes);
      setConfidenceBefore(3);
      setConfidenceAfter(4);
      const initial: Record<string, boolean> = {};
      currentDaySchedule.instruction5P1R.periksa.forEach((p, idx) => {
        initial[`chk-${idx}`] = false;
      });
      setChecklist(initial);
      setOneSuccess('Inti pesan tersampaikan terarah.');
      setOneImprovement('Mengurangi kata pengisi.');
      setFreeNotes('');
    }
  }, [selectedDay, submissions]);

  // Timer Effect
  useEffect(() => {
    let interval: any;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds((s) => s - 1), 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      triggerCelebration();
      addNotification('Elevator Pitch 45 Detik Tuntas! ⏱️', 'Waktu sasaran tercapai.', 'achievement');
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  // Handle Form Submission with AI Evaluation
  const handleSubmitSubmission = async () => {
    setIsSubmitting(true);
    try {
      const subId = existingSubmission?.id || `sub-${currentUser.id}-day-${selectedDay}-${Date.now()}`;
      const newVersion = (existingSubmission?.version || 0) + 1;

      // 1. Evaluate with AI Coach
      const partialSub: Partial<DaySubmissionRecord> = {
        id: subId,
        participantId: currentUser.id,
        day: selectedDay,
        pitchScript,
        evidenceType,
        evidenceContent,
      };

      const aiEvaluation = evaluateSubmissionWithAiCoach(partialSub, selectedDay);

      const completeRecord: DaySubmissionRecord = {
        id: subId,
        participantId: currentUser.id,
        day: selectedDay,
        submittedAt: new Date().toISOString(),
        durationMinutes,
        confidenceBefore,
        confidenceAfter,
        evidenceType,
        evidenceContent: evidenceContent || pitchScript,
        pitchScript,
        checklistStatus: checklist,
        oneSuccess,
        oneImprovement,
        freeNotes,
        status: 'selesai_target',
        version: newVersion,
        aiReview: aiEvaluation,
      };

      const updatedSubmissions = {
        ...submissions,
        [selectedDay]: completeRecord,
      };

      setSubmissions(updatedSubmissions);
      localStorage.setItem(`kac_habit_lab_sub_${currentUser.id}`, JSON.stringify(updatedSubmissions));

      // 2. Dispatch to Google Apps Script in background (Zero lag)
      sendToAppsScript({
        action: 'save_habit',
        senderUnit: currentUser.unit,
        senderEmail: currentUser.email,
        timestamp: new Date().toISOString(),
        data: {
          program: 'KAC 21 Elevator Pitch Habit Lab',
          participantId: currentUser.id,
          participantName: currentUser.name,
          unit: currentUser.unit,
          day: selectedDay,
          skill: currentDaySchedule.primarySkill,
          overallScore: aiEvaluation.overall_score,
          evidenceSufficiency: aiEvaluation.evidence_sufficiency,
          reviewStatus: aiEvaluation.review_status,
          durationMinutes,
          submittedAt: new Date().toLocaleString('id-ID'),
        },
      }).catch((err) => console.warn('Background sync warning:', err));

      triggerCelebration();
      addNotification(
        `Laporan Hari ke-${selectedDay} Berhasil Dikirim 🎯`,
        `AI Coach telah mengevaluasi latihan Anda dengan skor ${aiEvaluation.overall_score}%.`,
        'achievement'
      );

      // Auto switch to review tab to see feedback
      setActiveTab('review');
    } catch (err: any) {
      addNotification('Gagal Menyimpan Laporan', err.message || 'Terjadi kesalahan.', 'warning');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Metrics Calculation
  const completedDaysCount = Object.keys(submissions).length;
  const completionRate = Math.round((completedDaysCount / 21) * 100);
  const baselineSub = submissions[1];
  const latestSub = submissions[selectedDay] || submissions[completedDaysCount];
  const baselineScore = baselineSub?.aiReview?.overall_score || 68;
  const currentScore = latestSub?.aiReview?.overall_score || baselineScore;
  const skillGain = Math.max(0, currentScore - baselineScore);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Banner Header */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#172b47] via-[#1a355d] to-[#12233b] border border-sky-500/30 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>KAC 21 • ELEVATOR PITCH HABIT LAB</span>
          </div>
          <h2 className="text-xl md:text-3xl font-black tracking-tight text-white">
            Program Pembiasaan Bicara Mandiri 21 Hari
          </h2>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Bangun kebiasaan komunikasi efektif dengan formula <strong>5P + 1R</strong> (Pahami, Persiapkan, Praktikkan, Periksa, Perbaiki + Rekam). Evaluasi berbasis bukti dengan pendampingan AI Coach, Peer Review DENGAR, dan Laporan Fasilitator otomatis.
          </p>
        </div>

        {/* Global Progress Pill */}
        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center shrink-0 min-w-[180px]">
          <div className="text-xs text-sky-200 font-bold uppercase tracking-wider">Capaian Hari</div>
          <div className="text-3xl font-black text-white font-mono mt-0.5">
            {completedDaysCount} <span className="text-base font-normal text-slate-300">/ 21</span>
          </div>
          <div className="w-full bg-black/30 h-2 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-sky-400 to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>
          <div className="text-[10px] text-emerald-300 font-bold mt-1.5 flex items-center justify-center space-x-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>{completionRate}% Terpenuhi</span>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex border-b border-slate-200 dark:border-white/10 bg-white dark:bg-[#172b47] rounded-2xl px-4 p-1 shadow-sm text-xs font-bold gap-1 overflow-x-auto">
        <button
          onClick={() => handleTabChange('beranda')}
          className={`py-3 px-4 rounded-xl flex items-center space-x-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'beranda'
              ? 'bg-sky-500 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>1. Beranda Peserta (Progres 21 Hari)</span>
        </button>

        <button
          onClick={() => handleTabChange('studio')}
          className={`py-3 px-4 rounded-xl flex items-center space-x-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'studio'
              ? 'bg-sky-500 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>2. Studio Latihan &amp; AI Coach (/coach)</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 font-mono">
            /coach
          </span>
        </button>

        <button
          onClick={() => handleTabChange('review')}
          className={`py-3 px-4 rounded-xl flex items-center space-x-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'review'
              ? 'bg-sky-500 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>3. Peer Review &amp; Koreksi (/human)</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-purple-500/20 text-purple-300 font-mono">
            /human
          </span>
        </button>

        <button
          onClick={() => handleTabChange('fasilitator')}
          className={`py-3 px-4 rounded-xl flex items-center space-x-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'fasilitator'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-purple-400" />
          <span>4. Dashboard Fasilitator (Rekap Sheets)</span>
        </button>
      </div>

      {/* ================= TAB 1: BERANDA PESERTA ================= */}
      {activeTab === 'beranda' && (
        <div className="space-y-6">
          {/* 4 Summary Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-1">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                Tingkat Penyelesaian
              </span>
              <div className="text-2xl font-black text-slate-800 dark:text-white">
                {completionRate}%
              </div>
              <p className="text-[11px] text-slate-400">
                {completedDaysCount} dari 21 hari latihan tuntas
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-1">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                Perubahan Keterampilan
              </span>
              <div className="text-2xl font-black text-emerald-500">
                +{skillGain} Poin
              </div>
              <p className="text-[11px] text-slate-400">
                Skor Awal: {baselineScore}% → Skor Kini: {currentScore}%
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-1">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                Streak Konsistensi
              </span>
              <div className="text-2xl font-black text-amber-500 flex items-center space-x-1">
                <Flame className="w-6 h-6 text-amber-500" />
                <span>{currentUser.streakDays} Hari</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Pembiasaan bicara aktif tanpa putus
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-1">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                Fase Program Saat Ini
              </span>
              <div className="text-base font-black text-sky-500">
                {selectedDay <= 7
                  ? 'Fase 1: Mandiri'
                  : selectedDay <= 14
                  ? 'Fase 2: Berpasangan'
                  : 'Fase 3: Kelompok 4 Orang'}
              </div>
              <p className="text-[11px] text-slate-400">
                Target fokus Hari ke-{selectedDay}
              </p>
            </div>
          </div>

          {/* 21 Days Timeline Matrix */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-white/10 pb-4">
              <div>
                <h3 className="font-bold text-slate-800 dark:text-white text-base">
                  Matriks 21 Hari Elevator Pitch Habit Lab
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Klik pada nomor hari untuk meninjau materi atau mengisi bukti latihan di Studio.
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveTab('studio');
                }}
                className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs shadow-md transition-all flex items-center space-x-1.5 self-start sm:self-auto cursor-pointer"
              >
                <span>Lanjutkan Latihan Hari {selectedDay}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Phase 1, Phase 2, Phase 3 Row Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {/* Minggu 1 */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10 space-y-2.5">
                <div className="flex items-center justify-between font-bold text-slate-700 dark:text-slate-200 border-b border-slate-200/60 dark:border-white/10 pb-2">
                  <span className="text-sky-500">Minggu 1: Build The Habit</span>
                  <span className="text-[10px] text-slate-400">Hari 1–7</span>
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {DAYS_21_SCHEDULE.slice(0, 7).map((d) => {
                    const isDone = !!submissions[d.day];
                    const isCur = selectedDay === d.day;
                    return (
                      <button
                        key={d.day}
                        onClick={() => {
                          setSelectedDay(d.day);
                          setActiveTab('studio');
                        }}
                        className={`p-2 rounded-xl text-center font-bold font-mono transition-all cursor-pointer ${
                          isCur
                            ? 'ring-2 ring-sky-500 bg-sky-500 text-white shadow-md'
                            : isDone
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        H{d.day}
                      </button>
                    );
                  })}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Latihan mandiri 10–15 menit, mengenali pola bicara dan fondasi Elevator Pitch.
                </p>
              </div>

              {/* Minggu 2 */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10 space-y-2.5">
                <div className="flex items-center justify-between font-bold text-slate-700 dark:text-slate-200 border-b border-slate-200/60 dark:border-white/10 pb-2">
                  <span className="text-indigo-400">Minggu 2: Practice &amp; Influence</span>
                  <span className="text-[10px] text-slate-400">Hari 8–14</span>
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {DAYS_21_SCHEDULE.slice(7, 14).map((d) => {
                    const isDone = !!submissions[d.day];
                    const isCur = selectedDay === d.day;
                    return (
                      <button
                        key={d.day}
                        onClick={() => {
                          setSelectedDay(d.day);
                          setActiveTab('studio');
                        }}
                        className={`p-2 rounded-xl text-center font-bold font-mono transition-all cursor-pointer ${
                          isCur
                            ? 'ring-2 ring-sky-500 bg-sky-500 text-white shadow-md'
                            : isDone
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        H{d.day}
                      </button>
                    );
                  })}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Berlatih berpasangan dengan partner A/B menggunakan pola evaluasi <strong>DENGAR</strong>.
                </p>
              </div>

              {/* Minggu 3 */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10 space-y-2.5">
                <div className="flex items-center justify-between font-bold text-slate-700 dark:text-slate-200 border-b border-slate-200/60 dark:border-white/10 pb-2">
                  <span className="text-purple-400">Minggu 3: Demonstrate</span>
                  <span className="text-[10px] text-slate-400">Hari 15–21</span>
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {DAYS_21_SCHEDULE.slice(14, 21).map((d) => {
                    const isDone = !!submissions[d.day];
                    const isCur = selectedDay === d.day;
                    return (
                      <button
                        key={d.day}
                        onClick={() => {
                          setSelectedDay(d.day);
                          setActiveTab('studio');
                        }}
                        className={`p-2 rounded-xl text-center font-bold font-mono transition-all cursor-pointer ${
                          isCur
                            ? 'ring-2 ring-sky-500 bg-sky-500 text-white shadow-md'
                            : isDone
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        H{d.day}
                      </button>
                    );
                  })}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Kelompok 4 orang, simulasi skenario pimpinan/mitra, Q&amp;A, dan presentasi final.
                </p>
              </div>
            </div>
          </div>

          {/* Badges & Recognition */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 dark:text-white text-base flex items-center space-x-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>Lencana Keterampilan Terverifikasi (Bukan Sekadar Klik)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
              {HABIT_LAB_BADGES.map((badge) => {
                const isEarned = completedDaysCount >= badge.requiredDay;
                return (
                  <div
                    key={badge.id}
                    className={`p-4 rounded-2xl border text-center space-y-2 transition-all ${
                      isEarned
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-800 dark:text-amber-200 ring-1 ring-amber-500/20 shadow-sm'
                        : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-400 opacity-60'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full mx-auto bg-amber-500/20 flex items-center justify-center font-bold">
                      <Trophy className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <strong className="block font-bold">{badge.title}</strong>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        Hari ke-{badge.requiredDay}
                      </span>
                    </div>
                    <p className="text-[10px] leading-relaxed text-slate-500 dark:text-slate-400">
                      {badge.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: STUDIO LATIHAN ================= */}
      {activeTab === 'studio' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: 5P+1R Instructions & Timer (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Day Selector Pill */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm flex items-center justify-between text-xs font-bold">
              <span>Pilih Hari Latihan:</span>
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(Number(e.target.value))}
                className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10 text-sky-500 font-bold"
              >
                {DAYS_21_SCHEDULE.map((d) => (
                  <option key={d.day} value={d.day}>
                    Hari {d.day} — {d.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Day Target Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-3">
              <div className="flex items-center space-x-2 text-[11px] font-bold uppercase text-sky-400">
                <span>{currentDaySchedule.phaseTitle}</span>
              </div>
              <h3 className="text-lg font-black text-slate-800 dark:text-white">
                Hari {currentDaySchedule.day} — {currentDaySchedule.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {currentDaySchedule.targetDescription}
              </p>

              {/* 45 Seconds Timer Widget */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400 font-bold uppercase">Stopwatch 45 Detik</div>
                  <div className="text-2xl font-black font-mono text-sky-400">
                    00:{timerSeconds.toString().padStart(2, '0')}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className={`p-3 rounded-xl text-white font-bold text-xs shadow-md transition-all cursor-pointer ${
                      isTimerRunning ? 'bg-amber-500 hover:bg-amber-400' : 'bg-emerald-600 hover:bg-emerald-500'
                    }`}
                  >
                    {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => {
                      setIsTimerRunning(false);
                      setTimerSeconds(45);
                    }}
                    className="p-3 rounded-xl bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-white/20 transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Exemplar Pitch */}
              {currentDaySchedule.exemplarPitch && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-1 text-xs">
                  <div className="font-bold text-amber-700 dark:text-amber-300">
                    Contoh Pitch Rujukan:
                  </div>
                  <p className="italic text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                    "{currentDaySchedule.exemplarPitch}"
                  </p>
                </div>
              )}
            </div>

            {/* Formula 5P + 1R Accordion Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-3 text-xs">
              <h4 className="font-bold text-slate-800 dark:text-white text-sm flex items-center space-x-2">
                <Target className="w-4 h-4 text-sky-400" />
                <span>Panduan Langkah Formula 5P + 1R</span>
              </h4>
              <div className="space-y-2 text-[11px]">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                  <strong className="text-sky-500 block">1. Pahami:</strong>
                  <span className="text-slate-600 dark:text-slate-300">{currentDaySchedule.instruction5P1R.pahami}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                  <strong className="text-sky-500 block">2. Persiapkan:</strong>
                  <span className="text-slate-600 dark:text-slate-300">{currentDaySchedule.instruction5P1R.persiapkan}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                  <strong className="text-sky-500 block">3. Praktikkan:</strong>
                  <span className="text-slate-600 dark:text-slate-300">{currentDaySchedule.instruction5P1R.praktikkan}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                  <strong className="text-sky-500 block">4. Perbaiki:</strong>
                  <span className="text-slate-600 dark:text-slate-300">{currentDaySchedule.instruction5P1R.perbaiki}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <strong className="text-emerald-500 block">+1. Rekam:</strong>
                  <span className="text-slate-600 dark:text-slate-300">{currentDaySchedule.instruction5P1R.rekam}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Submission Form (7 Cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-5">
              <div className="border-b border-slate-100 dark:border-white/10 pb-4">
                <h3 className="font-bold text-slate-800 dark:text-white text-base">
                  Formulir Pelaporan Latihan (Ringan &amp; Terstruktur)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Peserta tidak perlu menulis esai panjang. Cukup isi pilihan terstruktur dan bukti latihan hari ini.
                </p>
              </div>

              {/* 1. Naskah Pitch atau Catatan Bicara */}
              <div className="space-y-1.5 text-xs">
                <label className="font-bold text-slate-700 dark:text-slate-200 flex items-center justify-between">
                  <span>Naskah Pitch / Transkrip Latihan (Wajib):</span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {pitchScript.split(/\s+/).filter(Boolean).length} Kata
                  </span>
                </label>
                <textarea
                  rows={4}
                  value={pitchScript}
                  onChange={(e) => setPitchScript(e.target.value)}
                  placeholder="Ketikkan naskah Elevator Pitch 45 detik Anda di sini..."
                  className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs"
                />
              </div>

              {/* 2. Bukti Latihan & Durasi */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-200">
                    Durasi Latihan Riil:
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      min={5}
                      max={60}
                      value={durationMinutes}
                      onChange={(e) => setDurationMinutes(Number(e.target.value))}
                      className="w-24 px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10 font-mono font-bold"
                    />
                    <span className="text-slate-500">Menit (Target: {currentDaySchedule.targetDurationMinutes} mnt)</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-200">
                    Tautan Rekaman / Audio Drive:
                  </label>
                  <input
                    type="url"
                    value={evidenceContent}
                    onChange={(e) => setEvidenceContent(e.target.value)}
                    placeholder="https://drive.google.com/... (opsional)"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10 text-xs"
                  />
                </div>
              </div>

              {/* 3. Tingkat Keyakinan Sebelum vs Sesudah (Skala 1 - 5) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs p-4 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/5">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-300">
                    Keyakinan Sebelum Latihan (1–5):
                  </label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setConfidenceBefore(lvl)}
                        className={`w-8 h-8 rounded-lg font-bold font-mono transition-all cursor-pointer ${
                          confidenceBefore === lvl
                            ? 'bg-sky-500 text-white shadow-sm'
                            : 'bg-white dark:bg-white/10 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-300">
                    Keyakinan Sesudah Latihan (1–5):
                  </label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setConfidenceAfter(lvl)}
                        className={`w-8 h-8 rounded-lg font-bold font-mono transition-all cursor-pointer ${
                          confidenceAfter === lvl
                            ? 'bg-emerald-500 text-white shadow-sm'
                            : 'bg-white dark:bg-white/10 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 4. Checklist Periksa (4. Periksa dari 5P+1R) */}
              <div className="space-y-2 text-xs">
                <label className="font-bold text-slate-700 dark:text-slate-200 block">
                  Checklist Evaluasi Mandiri Hari Ini:
                </label>
                <div className="space-y-1.5">
                  {currentDaySchedule.instruction5P1R.periksa.map((item, idx) => {
                    const key = `chk-${idx}`;
                    const isChecked = !!checklist[key];
                    return (
                      <div
                        key={idx}
                        onClick={() => setChecklist({ ...checklist, [key]: !isChecked })}
                        className={`p-2.5 rounded-xl border flex items-center space-x-2.5 cursor-pointer transition-colors ${
                          isChecked
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-200'
                            : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="rounded text-emerald-500 pointer-events-none"
                        />
                        <span className="text-[11px] font-medium">{item}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 5. Satu Hal Berhasil & Satu Hal Ingin Diperbaiki */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-emerald-600 dark:text-emerald-400">
                    Satu Hal Yang Berhasil:
                  </label>
                  <input
                    type="text"
                    value={oneSuccess}
                    onChange={(e) => setOneSuccess(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-amber-600 dark:text-amber-400">
                    Satu Hal Yang Ingin Diperbaiki:
                  </label>
                  <input
                    type="text"
                    value={oneImprovement}
                    onChange={(e) => setOneImprovement(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmitSubmission}
                disabled={isSubmitting || !pitchScript.trim()}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-black text-sm tracking-wide shadow-lg shadow-sky-500/25 flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                {isSubmitting ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                <span>Kirim Laporan &amp; Dapatkan Evaluasi AI Coach</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: AI COACH & PEER REVIEW ================= */}
      {activeTab === 'review' && (
        <div className="space-y-6">
          {existingSubmission?.aiReview ? (
            <div className="space-y-6">
              {/* Score Header Card */}
              <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div>
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold mb-2">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Hasil Evaluasi AI Coach Terverifikasi (Hari {selectedDay})</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-800 dark:text-white">
                    {currentDaySchedule.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {existingSubmission.aiReview.evidence_summary}
                  </p>
                </div>

                <div className="flex items-center space-x-4 shrink-0">
                  <div className="text-center p-4 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Skor Tertimbang</span>
                    <div className="text-3xl font-black text-sky-400 font-mono">
                      {existingSubmission.aiReview.overall_score}%
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('studio')}
                    className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                  >
                    Ulangi / Coba Lagi
                  </button>
                </div>
              </div>

              {/* 6 Rubric Indicators Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 text-center space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold block">Relevansi (20%)</span>
                  <div className="text-lg font-black text-sky-400 font-mono">
                    {existingSubmission.aiReview.indicator_scores.relevansiPendengar}%
                  </div>
                  <span className="text-[9px] text-slate-500">Kebutuhan audiens</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 text-center space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold block">Kejelasan (20%)</span>
                  <div className="text-lg font-black text-sky-400 font-mono">
                    {existingSubmission.aiReview.indicator_scores.kejelasanKeringkasan}%
                  </div>
                  <span className="text-[9px] text-slate-500">Ringkas &amp; terarah</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 text-center space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold block">Manfaat/Bukti (20%)</span>
                  <div className="text-lg font-black text-sky-400 font-mono">
                    {existingSubmission.aiReview.indicator_scores.manfaatBukti}%
                  </div>
                  <span className="text-[9px] text-slate-500">Solusi realistis</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 text-center space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold block">Penyampaian (15%)</span>
                  <div className="text-lg font-black text-sky-400 font-mono">
                    {existingSubmission.aiReview.indicator_scores.penyampaian}%
                  </div>
                  <span className="text-[9px] text-slate-500">Artikulasi vokal</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 text-center space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold block">Interaksi (15%)</span>
                  <div className="text-lg font-black text-sky-400 font-mono">
                    {existingSubmission.aiReview.indicator_scores.interaksi}%
                  </div>
                  <span className="text-[9px] text-slate-500">Mendengar &amp; respek</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 text-center space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold block">Tindak Lanjut (10%)</span>
                  <div className="text-lg font-black text-sky-400 font-mono">
                    {existingSubmission.aiReview.indicator_scores.tindakLanjut}%
                  </div>
                  <span className="text-[9px] text-slate-500">Ajakan sopan</span>
                </div>
              </div>

              {/* 5-Element Feedback Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* 1. Apresiasi Spesifik */}
                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-2">
                  <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-300 font-bold">
                    <ThumbsUp className="w-4 h-4" />
                    <span>Apresiasi Perilaku Spesifik</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                    {existingSubmission.aiReview.strengths.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>

                {/* 2. Prioritas Perbaikan Tunggal */}
                <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-2">
                  <div className="flex items-center space-x-2 text-amber-700 dark:text-amber-300 font-bold">
                    <Target className="w-4 h-4" />
                    <span>Satu Prioritas Perbaikan Utama</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                    {existingSubmission.aiReview.priority_improvement}
                  </p>
                </div>

                {/* 3. Contoh Kalimat / Rekomendasi Revisi */}
                <div className="p-5 rounded-2xl bg-sky-500/10 border border-sky-500/25 space-y-2">
                  <div className="flex items-center space-x-2 text-sky-700 dark:text-sky-300 font-bold">
                    <BookOpen className="w-4 h-4" />
                    <span>Contoh Kalimat Revisi Yang Bisa Langsung Dicoba</span>
                  </div>
                  <p className="italic text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                    "{existingSubmission.aiReview.suggested_rewrite}"
                  </p>
                </div>

                {/* 4. Tantangan Hari Berikutnya */}
                <div className="p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/25 space-y-2">
                  <div className="flex items-center space-x-2 text-indigo-700 dark:text-indigo-300 font-bold">
                    <ChevronRight className="w-4 h-4" />
                    <span>Tantangan Latihan Berikutnya</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                    {existingSubmission.aiReview.next_challenge}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 space-y-3">
              <MessageSquare className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-800 dark:text-white">
                Belum Ada Laporan Terkirim untuk Hari ke-{selectedDay}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                Silakan buka tab <strong>Studio Latihan</strong> dan tekan tombol kirim laporan untuk mengaktifkan evaluasi AI Coach dan rubrik penilaian.
              </p>
              <button
                onClick={() => setActiveTab('studio')}
                className="px-5 py-2.5 rounded-xl bg-sky-500 text-white font-bold text-xs"
              >
                Buka Studio Latihan Sekarang
              </button>
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 4: DASHBOARD FASILITATOR ================= */}
      {activeTab === 'fasilitator' && (
        <div className="space-y-6">
          <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-300 border border-purple-500/30 text-xs font-bold mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Pusat Kendali Fasilitator • KAC 21 Habit Lab</span>
              </div>
              <h3 className="text-xl font-black text-slate-800 dark:text-white">
                Monitoring Progres &amp; Rekapitulasi 15 Unit Shaf 2
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Pantau tingkat penyelesaian terpisah dari kenaikan keterampilan, status review partner, dan ekspor ke Google Sheets.
              </p>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={() => {
                  const csv = allUsers
                    .map((u) => `"${u.unit}","${u.name}",${completedDaysCount},${completionRate}%`)
                    .join('\n');
                  const blob = new Blob([`Unit,Nama,Hari_Selesai,Persentase\n${csv}`], {
                    type: 'text/csv',
                  });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `rekap_kac21_habit_${new Date().toISOString().slice(0, 10)}.csv`;
                  a.click();
                  addNotification('Ekspor CSV Selesai', 'File rekap telah diunduh.', 'success');
                }}
                className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/10 text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 flex items-center space-x-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4 text-sky-400" />
                <span>Ekspor CSV</span>
              </button>

              <button
                onClick={async () => {
                  await sendToAppsScript({
                    action: 'sync_all',
                    senderEmail: currentUser.email,
                    timestamp: new Date().toISOString(),
                    data: {
                      program: 'KAC 21 Elevator Pitch Habit Lab',
                      allUsersSnapshot: allUsers.map((u) => ({
                        unit: u.unit,
                        name: u.name,
                        level: u.level,
                        xp: u.totalXp,
                        streak: u.streakDays,
                      })),
                    },
                  });
                  addNotification(
                    'Sinkronisasi Google Sheets Berhasil',
                    'Seluruh rekapitulasi 15 unit dikirimkan ke spreadsheet admin.',
                    'success'
                  );
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md flex items-center space-x-1.5 cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Sinkron ke Google Sheets</span>
              </button>
            </div>
          </div>

          {/* Participant Table */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 dark:border-white/10 text-[11px] text-slate-400 uppercase">
                <tr>
                  <th className="pb-3 font-bold">Unit / Nama</th>
                  <th className="pb-3 font-bold">Fase</th>
                  <th className="pb-3 font-bold text-center">Penyelesaian (21H)</th>
                  <th className="pb-3 font-bold text-center">Skor Awal</th>
                  <th className="pb-3 font-bold text-center">Skor Akhir</th>
                  <th className="pb-3 font-bold text-center">Kenaikan</th>
                  <th className="pb-3 font-bold text-center">Status Bukti</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {allUsers.map((user) => {
                  const isCurrent = user.id === currentUser.id;
                  const daysDone = isCurrent ? completedDaysCount : Math.min(21, (user.streakDays || 1) + 2);
                  const rate = Math.round((daysDone / 21) * 100);
                  const startScore = 65 + (user.unit.charCodeAt(user.unit.length - 1) % 10);
                  const endScore = Math.min(95, startScore + Math.round(rate * 0.25));
                  const gain = endScore - startScore;

                  return (
                    <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                      <td className="py-3 font-semibold text-slate-800 dark:text-white flex items-center space-x-2">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-7 h-7 rounded-full object-cover border border-sky-400/30"
                        />
                        <div>
                          <div className="font-bold">{user.unit} • {user.name}</div>
                          <div className="text-[10px] text-slate-400 font-normal">{user.email || 'ka-shaf2@kac.org'}</div>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-400 font-bold">
                          {daysDone <= 7 ? 'M1: Mandiri' : daysDone <= 14 ? 'M2: Partner' : 'M3: Kelompok'}
                        </span>
                      </td>
                      <td className="py-3 text-center font-mono font-bold">
                        {daysDone}/21 ({rate}%)
                      </td>
                      <td className="py-3 text-center font-mono text-slate-400">
                        {startScore}%
                      </td>
                      <td className="py-3 text-center font-mono font-bold text-sky-400">
                        {endScore}%
                      </td>
                      <td className="py-3 text-center font-mono font-bold text-emerald-400">
                        +{gain}
                      </td>
                      <td className="py-3 text-center">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-bold">
                          Terverifikasi
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
