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
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DIMENSIONS_INFO } from '../../data/assessment50Data';

interface NewbieResultViewProps {
  onStart21Days: () => void;
  onRetake: () => void;
}

export const NewbieResultView: React.FC<NewbieResultViewProps> = ({ onStart21Days, onRetake }) => {
  const { currentUser, userAssessmentResults } = useApp();
  const result = userAssessmentResults.newbie;

  const dimensionScores = result?.dimensionScores || {
    D1: { dimensionId: 'D1', title: 'Memahami dan mengingat ilmu', score: 14, validCount: 10, status: 'sedang', description: 'Hambatan muncul pada situasi tertentu', suggestedAction: 'Pilih satu latihan yang relevan.' },
    D2: { dimensionId: 'D2', title: 'Memulai dan menjalankan percakapan', score: 16, validCount: 10, status: 'sedang', description: 'Hambatan muncul pada situasi tertentu', suggestedAction: 'Latih sapaan, pertanyaan terbuka, dan tindak lanjut.' },
    D3: { dimensionId: 'D3', title: 'Kekhawatiran dan kenyamanan', score: 12, validCount: 10, status: 'sedang', description: 'Hambatan muncul pada situasi tertentu', suggestedAction: 'Mulai berbagi dengan orang yang dipercaya; targetkan mencoba, bukan respons tertentu.' },
    D4: { dimensionId: 'D4', title: 'Keyakinan dan kesiapan mencoba', score: 18, validCount: 10, status: 'sedang', description: 'Hambatan muncul pada situasi tertentu', suggestedAction: 'Lakukan satu percakapan sederhana tanpa menunggu kalimat sempurna.' },
    D5: { dimensionId: 'D5', title: 'Praktik dan konsistensi', score: 21, validCount: 10, status: 'tinggi', description: 'Hambatan cukup sering dilaporkan', suggestedAction: 'Tautkan latihan 3 menit pada rutinitas tetap.' },
  };

  const recommendations = result?.recommendations || [
    {
      pattern: 'Paham materi tetapi sulit menyusun kata',
      hypothesis: 'Keterampilan menyusun pesan',
      firstPractice: 'Gunakan pola: inti pesan, contoh, manfaat.',
    },
    {
      pattern: 'Mampu mencoba tetapi sering menunda',
      hypothesis: 'Pembentukan kebiasaan',
      firstPractice: 'Tautkan latihan 3 menit pada rutinitas tetap setiap pagi.',
    },
  ];

  const badges = [
    { name: 'Berani Memulai', desc: 'Menyelesaikan asesmen baseline 50 pertanyaan', icon: '🌱' },
    { name: 'Pesan Makin Jelas', desc: 'Mengenali struktur pesan 3 kalimat', icon: '✨' },
    { name: 'Pendengar yang Hadir', desc: 'Berkomitmen menyimak tanpa memotong', icon: '👂' },
    { name: 'Konsisten Bertumbuh', desc: 'Siap menuntaskan siklus 21 hari', icon: '🔥' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner Overview */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#172d4d] via-[#1a3860] to-[#132742] border border-sky-500/30 text-white shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hasil Asesmen Baseline Level 1 Terverifikasi</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-white">
              Peta Perkembangan Komunikasi: {currentUser.name}
            </h2>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl mt-1">
              Unit: <strong className="text-white">{currentUser.unit}</strong> • Mengukur pengalaman komunikasi 30 hari terakhir untuk menentukan langkah latihan terbaik.
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
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-white font-bold text-xs shadow-lg shadow-rose-500/25 flex items-center space-x-2 transition-all hover:scale-105"
            >
              <span>Mulai Kebiasaan 21 Hari</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Prescribed Result Format */}
        <div className="p-5 rounded-2xl bg-white/10 border border-white/15 space-y-3">
          <div className="text-sm md:text-base font-bold text-sky-200 leading-snug">
            "{result?.personalMessage || 'Anda sedang membangun kebiasaan untuk mulai berbagi. Dari jawaban Anda, terlihat bahwa Anda memahami sebagian materi, tetapi terkadang masih ragu ketika harus menyampaikannya. Ini bukan label tentang diri Anda; ini petunjuk untuk memilih latihan yang sesuai.'}"
          </div>
          <div className="text-xs md:text-sm text-slate-200 italic border-l-2 border-amber-400 pl-3">
            {result?.firstStep || 'Langkah pertama: pilih satu hal yang sudah Anda pahami, jelaskan dalam tiga kalimat, lalu bagikan kepada orang yang tepat. Kita akan melihat kemajuan dari tindakan yang dilakukan, bukan dari kesempurnaan.'}
          </div>
        </div>
      </div>

      {/* 5 Dimensions Visual Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-base text-slate-800 dark:text-white flex items-center space-x-2">
            <Layers className="w-4 h-4 text-sky-400" />
            <span>Skor Analitik 5 Dimensi Komunikasi (0 - 30)</span>
          </h3>
          <span className="text-xs text-slate-400">
            Skor lebih rendah = Hambatan lebih jarang
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(['D1', 'D2', 'D3', 'D4', 'D5'] as const).map((dimKey) => {
            const dim = dimensionScores[dimKey];
            if (!dim) return null;
            const isHigh = dim.score >= 20;
            const isModerate = dim.score >= 10 && dim.score < 20;
            const badgeColor = isHigh
              ? 'bg-rose-500/15 text-rose-500 dark:text-rose-400 border-rose-500/30'
              : isModerate
              ? 'bg-amber-500/15 text-amber-500 dark:text-amber-400 border-amber-500/30'
              : 'bg-emerald-500/15 text-emerald-500 dark:text-emerald-400 border-emerald-500/30';
            const barColor = isHigh ? 'bg-rose-500' : isModerate ? 'bg-amber-500' : 'bg-emerald-500';
            return (
              <div
                key={dimKey}
                className="p-5 rounded-2xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-400">{dimKey}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeColor}`}>
                    {dim.score}/30 • {dim.description}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800 dark:text-white">
                    {dim.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {DIMENSIONS_INFO[dimKey].desc}
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
                  <strong className="text-sky-500 block mb-0.5">Tindakan Disarankan:</strong>
                  <span>{dim.suggestedAction}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mesin Rekomendasi */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
        <h3 className="font-extrabold text-base text-slate-800 dark:text-white flex items-center space-x-2">
          <Compass className="w-4 h-4 text-amber-400" />
          <span>Hasil Mesin Rekomendasi Latihan Berdasarkan Pola Hambatan</span>
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
              <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-700 dark:text-sky-300 leading-relaxed">
                <strong>Latihan Pertama:</strong> {rec.firstPractice}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
        <h3 className="font-extrabold text-base text-slate-800 dark:text-white flex items-center space-x-2">
          <Award className="w-4 h-4 text-emerald-400" />
          <span>Apresiasi & Lencana Kemajuan (Non-Judgmental Badges)</span>
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Diberikan atas kemauan mencoba dan belajar langkah kecil, bukan perbandingan dengan orang lain.
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
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-white font-bold text-xs shadow-md shadow-rose-500/25 flex items-center space-x-2 transition-all hover:scale-105"
          >
            <span>Lanjutkan ke Program Kebiasaan 21 Hari</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
