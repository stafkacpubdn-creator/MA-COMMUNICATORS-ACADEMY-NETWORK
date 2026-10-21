import React, { useState, useEffect } from 'react';
import {
  CircleDot,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  BookOpen,
  Info,
  Award,
  Layers,
  Check,
  Grid,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  QUESTIONS_50,
  ASSESSMENT_OPTIONS,
  DIMENSIONS_INFO,
  calculateAssessmentScores,
} from '../../data/assessment50Data';
import { AssessmentResult } from '../../types';

interface BasicAssessment50Props {
  onComplete: () => void;
}

export const BasicAssessment50: React.FC<BasicAssessment50Props> = ({ onComplete }) => {
  const { currentUser, saveAssessmentResult, triggerCelebration, addNotification, questions50Newbie } = useApp();
  const questionsList = questions50Newbie || QUESTIONS_50;

  const storageKey = `kac_assessment50_answers_${currentUser.id}`;
  const [answers, setAnswers] = useState<Record<number, string>>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [secondsSpent, setSecondsSpent] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(false);
  const [showQuestionMap, setShowQuestionMap] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsSpent((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentQ = questionsList[currentIndex] || questionsList[0];
  const totalQ = questionsList.length;

  useEffect(() => {
    const currentAnswer = answers[currentQ.id];
    setSelectedKey(currentAnswer || null);
  }, [currentIndex, answers, currentQ.id]);

  const handleSelectOption = (key: string) => {
    setSelectedKey(key);
    const nextAnswers = { ...answers, [currentQ.id]: key };
    setAnswers(nextAnswers);
    try {
      localStorage.setItem(storageKey, JSON.stringify(nextAnswers));
    } catch (e) {
      console.error(e);
    }

    if (autoAdvance) {
      setTimeout(() => {
        if (currentIndex + 1 < totalQ) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          finishAssessment(nextAnswers);
        }
      }, 500);
    }
  };

  const handleResetAnswers = () => {
    if (window.confirm('Mulai ulang asesmen dari soal nomor 1? Semua jawaban akan dikosongkan.')) {
      setAnswers({});
      setSelectedKey(null);
      setCurrentIndex(0);
      try {
        localStorage.removeItem(storageKey);
      } catch (e) {
        console.error(e);
      }
      addNotification('Asesmen Direset', 'Kuesioner siap diisi dari pertanyaan nomor 1.', 'info');
    }
  };

  const finishAssessment = (finalAnswers: Record<number, string>) => {
    const scored = calculateAssessmentScores(finalAnswers);
    const newResult: AssessmentResult = {
      score: scored.overallReadiness,
      totalQuestions: 50,
      passed: true,
      date: new Date().toISOString().slice(0, 10),
      difficultyReached: 'Sedang',
      timeSpentSeconds: secondsSpent,
      feedback: scored.personalMessage,
      dimensionScores: scored.dimensionScores,
      answers: finalAnswers,
      recommendations: scored.recommendations,
      personalMessage: scored.personalMessage,
      firstStep: scored.firstStep,
      badges: ['Berani Memulai', 'Pesan Makin Jelas'],
    };
    saveAssessmentResult('newbie', newResult);
    try {
      localStorage.removeItem(storageKey);
    } catch (e) {
      console.error(e);
    }
    triggerCelebration();
    addNotification(
      'Asesmen Selesai! 🎉',
      `50 butir kuesioner berhasil diselesaikan. Skor Kesiapan: ${scored.overallReadiness}%.`,
      'achievement'
    );
    onComplete();
  };

  const handleNext = () => {
    if (!selectedKey) return;
    if (currentIndex + 1 < totalQ) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      finishAssessment(answers);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const progressPercent = Math.round(((currentIndex + 1) / totalQ) * 100);
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Banner Notice & Controls */}
      <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-xs text-slate-700 dark:text-slate-300 leading-relaxed flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start space-x-3">
          <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold text-slate-800 dark:text-white block">
              Asesmen Baseline Level 1: Kenali Diri Tanpa Penghakiman (50 Soal)
            </strong>
            <span>
              Pilihlah salah satu dari opsi <strong>A, B, C, D, atau E</strong>. Jawaban disimpan dan Anda baru lanjut ke soal berikutnya setelah memilih jawaban.
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2 shrink-0">
          <button
            type="button"
            onClick={handleResetAnswers}
            title="Kosongkan jawaban dan mulai dari awal"
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-white dark:bg-white/10 hover:bg-rose-500/15 hover:text-rose-400 text-slate-600 dark:text-slate-300 text-[11px] font-semibold border border-slate-200 dark:border-white/10 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Mulai Ulang</span>
          </button>
          <div className="flex items-center space-x-1.5 bg-white dark:bg-white/10 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 text-[11px]">
            <span className="text-slate-600 dark:text-slate-300 font-medium">Otomatis Lanjut:</span>
            <button
              type="button"
              onClick={() => setAutoAdvance(!autoAdvance)}
              className={`w-8 h-4.5 flex items-center rounded-full p-0.5 transition-colors ${
                autoAdvance ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'
              }`}
            >
              <div
                className={`bg-white w-3.5 h-3.5 rounded-full shadow-md transform transition-transform ${
                  autoAdvance ? 'translate-x-3.5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-lg space-y-6">
        {/* Header: Progress, Timer & Dimension Tag */}
        <div className="space-y-3 border-b border-slate-100 dark:border-white/10 pb-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-lg bg-sky-500 text-white font-black text-xs tracking-wider uppercase shadow-sm shadow-sky-500/20">
                SOAL #{currentIndex + 1}
              </span>
              <span className="text-slate-500 dark:text-slate-400 font-medium text-xs">
                dari {totalQ} Pertanyaan
              </span>
              <span className="text-slate-300 dark:text-slate-600">|</span>
              <span className="text-emerald-500 font-bold">{answeredCount}/50 Terisi</span>
            </div>
            <div className="flex items-center space-x-3 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
              <span className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                <span>{Math.floor(secondsSpent / 60)}:{(secondsSpent % 60).toString().padStart(2, '0')}</span>
              </span>
              <button
                type="button"
                onClick={() => setShowQuestionMap(!showQuestionMap)}
                className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 text-[11px] font-semibold"
              >
                <Grid className="w-3 h-3 text-sky-400" />
                <span>Peta 50 Soal</span>
              </button>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-slate-100 dark:bg-white/10 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-sky-500 to-indigo-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Question Map Drawer */}
        {showQuestionMap && (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span>Navigasi Cepat 50 Pertanyaan:</span>
              <span className="text-sky-500 text-[11px]">Pilih nomor untuk meninjau/mengisi</span>
            </div>
            <div className="grid grid-cols-10 gap-1.5 pt-1">
              {questionsList.map((q, idx) => {
                const isAnswered = !!answers[q.id];
                const isCurrent = idx === currentIndex;
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => {
                      setCurrentIndex(idx);
                      setShowQuestionMap(false);
                    }}
                    className={`h-7 rounded-lg text-xs font-bold transition-all ${
                      isCurrent
                        ? 'ring-2 ring-sky-400 bg-sky-500 text-white'
                        : isAnswered
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-200 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-300'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Klasifikasi Kuesioner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-500/15 via-indigo-500/10 to-transparent border border-sky-500/25 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-sky-500 dark:text-sky-400">
              KLASIFIKASI KUESIONER
            </span>
            <span className="text-[11px] font-bold text-slate-400">
              Dimensi {currentQ.dimensionId === 'D1' ? '1' : currentQ.dimensionId === 'D2' ? '2' : currentQ.dimensionId === 'D3' ? '3' : currentQ.dimensionId === 'D4' ? '4' : '5'} dari 5 ({currentQ.dimensionId})
            </span>
          </div>
          <h4 className="text-base font-black text-slate-800 dark:text-white flex items-center space-x-2">
            <Layers className="w-4 h-4 text-sky-400 shrink-0" />
            <span>"{currentQ.dimensionTitle}"</span>
          </h4>
          <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
            {DIMENSIONS_INFO[currentQ.dimensionId as keyof typeof DIMENSIONS_INFO]?.desc || currentQ.dimensionTitle}
          </p>
        </div>

        {/* Question Statement */}
        <div className="p-5 md:p-6 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/5 space-y-1.5">
          <span className="text-[10px] uppercase font-bold tracking-wider text-amber-500">
            Pernyataan Pengalaman Komunikator (Soal #{currentIndex + 1})
          </span>
          <h3 className="text-base md:text-lg font-bold text-slate-800 dark:text-white leading-relaxed">
            "{currentQ.statement}"
          </h3>
        </div>

        {/* 5 Options: A, B, C, D, E */}
        <div className="space-y-2.5">
          {ASSESSMENT_OPTIONS.map((opt) => {
            const isSelected = selectedKey === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => handleSelectOption(opt.key)}
                className={`w-full p-4 rounded-2xl border text-left text-xs md:text-sm transition-all flex items-center justify-between group cursor-pointer ${
                  isSelected
                    ? 'bg-sky-500/20 border-sky-500 text-sky-950 dark:text-white font-bold ring-2 ring-sky-500/30 shadow-md shadow-sky-500/10'
                    : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 hover:border-sky-400/50'
                }`}
              >
                <div className="flex items-center space-x-3.5">
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30'
                        : 'bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300 group-hover:bg-sky-500/20 group-hover:text-sky-400'
                    }`}
                  >
                    {opt.key.toUpperCase()}
                  </span>
                  <div>
                    <span className="block font-semibold text-slate-800 dark:text-slate-100">
                      {opt.label}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      {opt.desc}
                    </span>
                  </div>
                </div>
                {isSelected ? (
                  <div className="flex items-center space-x-1.5 text-emerald-500 dark:text-emerald-400 font-black text-xs shrink-0 ml-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Terpilih</span>
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600 shrink-0 ml-2 group-hover:border-sky-400" />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected confirmation feedback */}
        {selectedKey ? (
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-300">
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>
                Pilihan Anda tersimpan: <strong>Opsi {selectedKey.toUpperCase()}</strong>. {autoAdvance ? 'Melanjutkan otomatis...' : 'Silakan klik tombol di bawah untuk lanjut ke soal berikutnya.'}
              </span>
            </div>
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 text-[11px] text-slate-500 dark:text-slate-400 text-center">
            Silakan pilih salah satu opsi (A, B, C, D, atau E) di atas untuk mengaktifkan tombol lanjut.
          </div>
        )}

        {/* Navigation Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/10">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center space-x-1.5 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={!selectedKey}
            className={`px-6 py-3 rounded-xl font-bold text-xs shadow-md flex items-center space-x-2 transition-all ${
              selectedKey
                ? 'bg-sky-500 hover:bg-sky-400 text-white shadow-sky-500/25 hover:scale-105 cursor-pointer'
                : 'bg-slate-200 dark:bg-white/10 text-slate-400 dark:text-slate-500 cursor-not-allowed'
            }`}
          >
            <span>
              {currentIndex + 1 < totalQ
                ? 'Lanjut ke Pertanyaan Berikutnya'
                : 'Selesaikan Asesmen & Lihat Hasil Level 1'}
            </span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
