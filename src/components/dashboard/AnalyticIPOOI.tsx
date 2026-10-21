import React, { useState } from 'react';
import {
  Disc,
  Sparkles,
  Layers,
  ArrowRight,
  CheckCircle2,
  Brain,
  ShieldCheck,
  TrendingUp,
  FileText,
  AlertCircle,
  RefreshCw,
  Award,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AnalyticIPOOI: React.FC = () => {
  const { ipooiData, currentUser, isOfflineMode, addNotification } = useApp();
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiReport, setAiReport] = useState<{
    summary: string;
    strengths: string[];
    weaknesses: string[];
    actionPlan: string[];
    mentorNote: string;
  } | null>({
    summary: `Berdasarkan evaluasi real-time untuk ${currentUser.unit} (${currentUser.name}), pemahaman materi adaptif berada pada kuadran "Tinggi & Konsisten" (skor 94/100). Proses internalisasi teoretis (Know How), eksekusi lapangan (Do How), dan kepemimpinan (Show How) berjalan seimbang dengan rasio keberhasilan pengabaran 78.5%.`,
    strengths: [
      'Disiplin pencatatan Alpha, Beta, dan Delta Habit Tracker konsisten dalam 14 hari terakhir.',
      'Waktu respons bantahan (rebuttal drill) sangat cepat rata-rata 4.5 detik dengan artikulasi santun.',
      'Kemampuan sintesis konsep 3V (Verbal, Vokal, Visual) di atas rata-rata unit Shaf 2 lainnya.',
    ],
    weaknesses: [
      'Simulasi tahap "Research" pada metodologi AORA masih perlu pengayaan data demografi lokal.',
      'Retensi pembinaan pasca-pengabaran di pekan ke-3 berpotensi menurun jika kartu kendali tidak diperbarui berkala.',
    ],
    actionPlan: [
      'Tingkatkan keterlibatan dalam mentoring kader baru tingkat Newbie 1x sepekan.',
      'Lakukan uji coba simulasi krisis komunikasi skenario tingkat Master sebelum akhir bulan.',
      'Sinkronisasikan catatan temuan penolakan lapangan ke forum komunitas agar menjadi studi kasus bersama.',
    ],
    mentorNote: `Unit ${currentUser.unit} direkomendasikan untuk segera memimpin sesi simulasi tandem Shaf 2 wilayah regional.`,
  });

  const handleGenerateAIAnalysis = () => {
    setIsGeneratingAI(true);
    addNotification('AI Analisis Dimulai', 'Model AI sedang mengkalkulasi matriks IPOOI dan ritme belajar Anda...', 'info');
    setTimeout(() => {
      setIsGeneratingAI(false);
      setAiReport({
        summary: `Evaluasi AI Terkini untuk ${currentUser.unit}: Tingkat kematangan komunikator terverifikasi pada level "Advanced". Peningkatan efisiensi waktu kuis adaptif sebesar 22% membuktikan penguasaan spontanitas naskah pengabaran dan kesiapan Do How.`,
        strengths: [
          `Penguasaan Base KPI A, Stair KPI B, dan Roof KPI C telah teruji dengan tingkat akurasi ${currentUser.comprehensionRate}%.`,
          'Keaktifan berbagi studi kasus di forum diskusi komunitas menginspirasi unit Shaf 2 lainnya.',
          'Pemanfaatan Elevator Pitch 45 detik sangat efektif membuka dialog dengan audiens sasaran.',
        ],
        weaknesses: [
          'Perlu penguatan pada dokumentasi tindak lanjut pembinaan ta\'limul fikrah jangka panjang.',
          'Penjadwalan agenda lapangan perlu dioptimalkan agar tidak bertumpuk di akhir pekan.',
        ],
        actionPlan: [
          'Jadwalkan 2 sesi role-play Delta Habit Tracker bersama koordinator pusat.',
          'Gunakan filter kalender urgensi tinggi untuk mengutamakan kunjungan tindak lanjut binaan.',
          'Kaji ulang rekaman simulasi Elevator Pitch untuk memperhalus intonasi vokal.',
        ],
        mentorNote: `Performa ${currentUser.name} patut diapresiasi sebagai percontohan bagi unit ka01 s/d ka14. Pertahankan konsistensi streak harian!`,
      });
      addNotification('Analisis AI Selesai', 'Laporan evaluasi komprehensif telah diperbarui.', 'achievement');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#142844] via-[#1b3558] to-[#12233b] border border-emerald-500/30 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold mb-2">
            <Disc className="w-3.5 h-3.5" />
            <span>Kerangka Kerja Evaluasi Terpadu KAC</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-white">
            Analitik IPOOI: Input, Process, Output, Outcome & Impact
          </h2>
          <p className="text-xs md:text-sm text-slate-300 max-w-2xl mt-1">
            Menghubungkan alokasi sumber daya belajar (Input) hingga transformasi kemandirian komunikator di medan pengabaran (Impact).
          </p>
        </div>
        <button
          onClick={handleGenerateAIAnalysis}
          disabled={isGeneratingAI}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs md:text-sm shadow-lg shadow-emerald-500/25 flex items-center space-x-2 transition-all hover:scale-105 shrink-0"
        >
          {isGeneratingAI ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Menganalisis Performa...</span>
            </>
          ) : (
            <>
              <Brain className="w-4 h-4" />
              <span>Perbarui Analisis AI</span>
            </>
          )}
        </button>
      </div>

      {/* 5 Stages of IPOOI Visual Chain */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {/* I - Input */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#172b47] border-t-4 border-t-sky-500 border border-slate-200 dark:border-white/10 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-400">
              STEP 1
            </span>
            <span className="text-lg font-black text-sky-500">I</span>
          </div>
          <h4 className="font-extrabold text-sm text-slate-800 dark:text-white">INPUT</h4>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>Total Jam:</span>
              <strong className="text-slate-800 dark:text-white">{ipooiData.input.totalHours}j</strong>
            </div>
            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>Kehadiran:</span>
              <strong className="text-emerald-500">{ipooiData.input.attendanceRate}%</strong>
            </div>
            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>Modul Dibaca:</span>
              <strong className="text-slate-800 dark:text-white">{ipooiData.input.materialsReadCount}</strong>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-100 dark:border-white/5 line-clamp-2">
            {ipooiData.input.notes}
          </p>
        </div>

        {/* P - Process */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#172b47] border-t-4 border-t-indigo-500 border border-slate-200 dark:border-white/10 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400">
              STEP 2
            </span>
            <span className="text-lg font-black text-indigo-500">P</span>
          </div>
          <h4 className="font-extrabold text-sm text-slate-800 dark:text-white">PROCESS</h4>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>Kuis Dicoba:</span>
              <strong className="text-slate-800 dark:text-white">{ipooiData.process.quizAttempts}x</strong>
            </div>
            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>Waktu Kuis:</span>
              <strong className="text-slate-800 dark:text-white">{ipooiData.process.averageQuizTime}s</strong>
            </div>
            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>Simulasi AORA:</span>
              <strong className="text-indigo-400">{ipooiData.process.aoraSimulationsCompleted}x</strong>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-100 dark:border-white/5 line-clamp-2">
            {ipooiData.process.notes}
          </p>
        </div>

        {/* O - Output */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#172b47] border-t-4 border-t-amber-500 border border-slate-200 dark:border-white/10 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">
              STEP 3
            </span>
            <span className="text-lg font-black text-amber-500">O</span>
          </div>
          <h4 className="font-extrabold text-sm text-slate-800 dark:text-white">OUTPUT</h4>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>Sertifikasi:</span>
              <strong className="text-slate-800 dark:text-white">{ipooiData.output.certificationsEarned} unit</strong>
            </div>
            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>Skor Rata2:</span>
              <strong className="text-amber-500">{ipooiData.output.averageAssessmentScore}%</strong>
            </div>
            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>Habit Streak:</span>
              <strong className="text-orange-500">{ipooiData.output.alphaBetaDeltaStreak} hari</strong>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-100 dark:border-white/5 line-clamp-2">
            {ipooiData.output.notes}
          </p>
        </div>

        {/* O - Outcome */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#172b47] border-t-4 border-t-teal-500 border border-slate-200 dark:border-white/10 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-400">
              STEP 4
            </span>
            <span className="text-lg font-black text-teal-500">O</span>
          </div>
          <h4 className="font-extrabold text-sm text-slate-800 dark:text-white">OUTCOME</h4>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>Pengabaran:</span>
              <strong className="text-emerald-500">{ipooiData.outcome.pengabaranFieldSuccessRate}%</strong>
            </div>
            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>Retensi Bina:</span>
              <strong className="text-teal-400">{ipooiData.outcome.pembinaanRetentionRate}%</strong>
            </div>
            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>Kepercayaan:</span>
              <strong className="text-slate-800 dark:text-white">{ipooiData.outcome.confidenceScore}/100</strong>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-100 dark:border-white/5 line-clamp-2">
            {ipooiData.outcome.notes}
          </p>
        </div>

        {/* I - Impact */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#172b47] border-t-4 border-t-rose-500 border border-slate-200 dark:border-white/10 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-400">
              STEP 5
            </span>
            <span className="text-lg font-black text-rose-500">I</span>
          </div>
          <h4 className="font-extrabold text-sm text-slate-800 dark:text-white">IMPACT</h4>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>Kedewasaan:</span>
              <strong className="text-rose-400">{ipooiData.impact.communicatorMaturityLevel}</strong>
            </div>
            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>Kesiapan Shaf:</span>
              <strong className="text-slate-800 dark:text-white">{ipooiData.impact.shafReadinessScore}%</strong>
            </div>
            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>Indeks KAC:</span>
              <strong className="text-emerald-400">{ipooiData.impact.kacOverallImpactIndex}%</strong>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-100 dark:border-white/5 line-clamp-2">
            {ipooiData.impact.notes}
          </p>
        </div>
      </div>

      {/* AI Deep Performance Analysis Output */}
      {aiReport && (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-md space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-white text-base">
                  Hasil Analisis Performa Mendalam Berbasis AI
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Evaluasi personal untuk {currentUser.name} ({currentUser.unit})
                </p>
              </div>
            </div>
            <span className="text-[10px] px-2.5 py-1 rounded-full font-bold bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/30">
              {isOfflineMode ? 'AI Engine Luring' : 'Gemini AI Evaluator'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-slate-700 dark:text-slate-200 text-xs md:text-sm leading-relaxed">
            {aiReport.summary}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
              <h4 className="font-bold text-xs text-emerald-600 dark:text-emerald-400 flex items-center space-x-1.5 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Kekuatan & Keunggulan Terverifikasi</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                {aiReport.strengths.map((s, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
              <h4 className="font-bold text-xs text-amber-600 dark:text-amber-400 flex items-center space-x-1.5 uppercase tracking-wider">
                <AlertCircle className="w-4 h-4" />
                <span>Area Pengembangan (Peluang Pertumbuhan)</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                {aiReport.weaknesses.map((w, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-100 dark:border-white/5 space-y-2">
            <h4 className="font-bold text-xs text-sky-500 dark:text-sky-400 uppercase tracking-wider flex items-center space-x-1.5">
              <TrendingUp className="w-4 h-4" />
              <span>Rekomendasi Rencana Aksi Strategis Pekan Depan</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              {aiReport.actionPlan.map((action, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 text-xs text-slate-700 dark:text-slate-200 space-y-1"
                >
                  <span className="text-[10px] font-bold text-sky-500 uppercase">
                    Langkah #{idx + 1}
                  </span>
                  <p>{action}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-500/10 to-indigo-500/10 border border-sky-500/20 flex items-start space-x-3 text-xs">
            <Award className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-slate-800 dark:text-white block">
                Catatan Resmi Evaluasi Kordinator KAC Pusat:
              </strong>
              <p className="text-slate-600 dark:text-slate-300 mt-0.5 italic">
                "{aiReport.mentorNote}"
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
