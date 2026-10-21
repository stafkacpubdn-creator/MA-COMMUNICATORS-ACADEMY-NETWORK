import React from 'react';
import {
  Award,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Target,
  Compass,
  CheckCircle2,
  Clock,
  RotateCcw,
  BookOpen,
  Layers,
  Heart,
  TrendingUp,
  FileCheck,
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RUNNER_DIMENSIONS_INFO } from '../../data/runnerAssessment50Data';

interface RunnerResultViewProps {
  onStart21Days: () => void;
  onRetake: () => void;
}

export const RunnerResultView: React.FC<RunnerResultViewProps> = ({ onStart21Days, onRetake }) => {
  const { currentUser, userAssessmentResults } = useApp();
  const result = userAssessmentResults.runner;

  const dimensionScores = result?.dimensionScores || {
    R1: { dimensionId: 'R1', title: 'Pemetaan Karakter Audiens & Lingkungan', score: 11, validCount: 10, status: 'sedang', description: 'Keterampilan taktis cukup baik namun perlu pengayaan observasi', suggestedAction: 'Lakukan pra-pemetaan 5 menit sebelum dialog.' },
    R2: { dimensionId: 'R2', title: 'Eksekusi Pembuka & Ice Breaking Spontan', score: 9, validCount: 10, status: 'rendah', description: 'Refleks pembuka dialog santun dan hangat', suggestedAction: 'Pertahankan spontanitas sapaan pembuka.' },
    R3: { dimensionId: 'R3', title: 'Objection Handling & Rebuttal di Bawah Tekanan', score: 14, validCount: 10, status: 'sedang', description: 'Kecepatan respon < 5 detik mulai terbentuk stabil', suggestedAction: 'Latih pola Feel-Felt-Found pada isu sensitif.' },
    R4: { dimensionId: 'R4', title: 'Artikulasi Solutif & Framing Dialogis Dua Arah', score: 12, validCount: 10, status: 'sedang', description: 'Keseimbangan dialog 60/40 terjaga dengan baik', suggestedAction: 'Perbanyak pertanyaan terbuka di akhir dialog.' },
    R5: { dimensionId: 'R5', title: 'Ketahanan Menghadapi Penolakan & Konsistensi Follow-Up', score: 16, validCount: 10, status: 'sedang', description: 'Perlu disiplin pencatatan kartu kendali pasca penolakan', suggestedAction: 'Terapkan prinsip Next Door Reset saat di lapangan.' },
  };

  const recommendations = result?.recommendations || [
    {
      pattern: 'Emosi mudah terpancing atau bingung saat audiens melontarkan bantahan',
      hypothesis: 'Manajemen stres & teknik Objection Handling taktis',
      firstPractice: 'Terapkan jeda napas 3 detik dan metode Feel-Felt-Found: "Saya sangat memahami apa yang bapak rasakan..."',
    },
    {
      pattern: 'Drop semangat pasca penolakan dan follow-up tidak konsisten',
      hypothesis: 'Resiliensi mental komunikator & manajemen kartu kendali',
      firstPractice: 'Terapkan aturan "Next Door Reset": anggap penolakan sebagai data statistik penguat mental.',
    },
  ];

  const badges = [
    { name: 'Penakluk Objeksi', desc: 'Mampu merespons 3 bantahan tipikal secara santun < 5 detik', icon: '🛡️' },
    { name: 'Negosiator Tangkas', desc: 'Membuka dialog dan memetakan kebutuhan audiens seketika', icon: '⚡' },
    { name: 'Juru Bicara Lapangan', desc: 'Konsisten menyelesaikan simulasi tandem shaf 2', icon: '🎯' },
    { name: 'Pembangun Jejaring', desc: 'Menjaga tindak lanjut kartu kendali silaturahmi', icon: '🤝' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner Overview */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#17203d] via-[#1a2b58] to-[#121c38] border border-indigo-500/30 text-white shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold mb-2">
              <Zap className="w-3.5 h-3.5" />
              <span>Hasil Asesmen Intermediate Level 2 Terverifikasi</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-white">
              Peta Kesiapan Taktis Lapangan: {currentUser.name}
            </h2>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl mt-1">
              Unit: <strong className="text-white">{currentUser.unit}</strong> | Mengukur ketangkasan Do How, penanganan keberatan, dan resiliensi di medan interaksi nyata.
            </p>
          </div>
          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={onRetake}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/20 flex items-center space-x-1.5 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Ulangi Asesmen</span>
            </button>
            <button
              onClick={onStart21Days}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 flex items-center space-x-2 transition-all hover:scale-105"
            >
              <span>Mulai 21 Hari Simulasi Lapangan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Card */}
        <div className="p-5 rounded-2xl bg-white/10 border border-white/15 space-y-3">
          <div className="text-sm md:text-base font-bold text-indigo-200 leading-snug">
            "{result?.personalMessage || 'Performa Do How Anda mencerminkan kematangan komunikator praktisi lapangan. Anda tidak lagi sekadar menghafal teori, melainkan siap membaca ritme sosial masyarakat, mengatasi bantahan dengan santun, dan menjaga daya tahan di garis depan pengabaran Shaf 2.'}"
          </div>
          <div className="text-xs md:text-sm text-slate-200 italic border-l-2 border-indigo-400 pl-3">
            {result?.firstStep || 'Langkah Taktis Berikutnya: Jalankan Program Simulasi Lapangan 21 Hari (Beta Role Play) dengan fokus pada rebuttal drill 5 detik dan penutupan kesepakatan silaturahmi berkala.'}
          </div>
        </div>
      </div>

      {/* 5 Dimensions Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-base text-slate-800 dark:text-white flex items-center space-x-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>Skor 5 Dimensi Ketangkasan Taktis Lapangan (0 - 30)</span>
          </h3>
          <span className="text-xs text-slate-400">
            Skor lebih rendah = Hambatan taktis lebih minim
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(['R1', 'R2', 'R3', 'R4', 'R5'] as const).map((dimKey) => {
            const dim = dimensionScores[dimKey];
            if (!dim) return null;
            const isHigh = dim.score >= 20;
            const isModerate = dim.score >= 10 && dim.score < 20;
            const badgeColor = isHigh
              ? 'bg-rose-500/15 text-rose-500 dark:text-rose-400 border-rose-500/30'
              : isModerate
              ? 'bg-amber-500/15 text-amber-500 dark:text-amber-400 border-amber-500/30'
              : 'bg-emerald-500/15 text-emerald-500 dark:text-emerald-400 border-emerald-500/30';
            const barColor = isHigh ? 'bg-rose-500' : isModerate ? 'bg-indigo-500' : 'bg-emerald-500';
            return (
              <div
                key={dimKey}
                className="p-5 rounded-2xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-400">{dimKey}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeColor}`}>
                    {dim.score}/30 | {dim.description}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800 dark:text-white">
                    {dim.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {RUNNER_DIMENSIONS_INFO[dimKey].desc}
                  </p>
                </div>
                {/* Score bar */}
                <div className="space-y-1">
                  <div className="w-full bg-slate-100 dark:bg-white/10 h-2 rounded-full overflow-hidden">
                    <div
                      className={`${barColor} h-full rounded-full transition-all duration-500`}
                      style={{ width: `${Math.min(100, (dim.score / 30) * 100)}%` }}
                    />
                  </div>
                </div>
                {/* Suggested Action */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#12223a] border border-slate-100 dark:border-white/5 text-[11px] text-slate-600 dark:text-slate-300">
                  <strong className="text-indigo-400 block mb-0.5">Rekomendasi Tindakan:</strong>
                  <span>{dim.suggestedAction}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mesin Rekomendasi Taktis */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
        <h3 className="font-extrabold text-base text-slate-800 dark:text-white flex items-center space-x-2">
          <Compass className="w-4 h-4 text-indigo-400" />
          <span>Hasil Mesin Rekomendasi Latihan Taktis Berdasarkan Pola Hambatan</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-100 dark:border-white/5 space-y-2 text-xs"
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-500">
                Pola Terdeteksi: {rec.pattern}
              </div>
              <div className="font-bold text-slate-800 dark:text-white text-sm">
                Hipotesis Kebutuhan: {rec.hypothesis}
              </div>
              <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 dark:text-indigo-300 leading-relaxed">
                <strong>Latihan Taktis Utama:</strong> {rec.firstPractice}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Runner Badges */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
        <h3 className="font-extrabold text-base text-slate-800 dark:text-white flex items-center space-x-2">
          <Award className="w-4 h-4 text-purple-400" />
          <span>Lencana Kemajuan Taktis Lapangan (Runner Badges)</span>
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Apresiasi pencapaian Do How: keberanian menghadapi situasi riil di lapangan masyarakat.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {badges.map((b, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-center space-y-1.5"
            >
              <span className="text-2xl block">{b.icon}</span>
              <div className="font-bold text-xs text-slate-800 dark:text-white">{b.name}</div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug">{b.desc}</p>
            </div>
          ))}
        </div>
        <div className="pt-4 flex justify-end">
          <button
            onClick={onStart21Days}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold text-xs shadow-md shadow-indigo-500/25 flex items-center space-x-2 transition-all hover:scale-105"
          >
            <span>Lanjutkan ke Program Simulasi Lapangan 21 Hari (Beta)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
