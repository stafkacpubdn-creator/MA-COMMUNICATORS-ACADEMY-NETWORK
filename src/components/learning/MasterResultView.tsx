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
  Crown,
  Share2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MASTER_DIMENSIONS_INFO } from '../../data/masterAssessment50Data';

interface MasterResultViewProps {
  onStart21Days: () => void;
  onRetake: () => void;
}

export const MasterResultView: React.FC<MasterResultViewProps> = ({ onStart21Days, onRetake }) => {
  const { currentUser, userAssessmentResults, triggerCelebration, addNotification } = useApp();
  const result = userAssessmentResults.master;

  const dimensionScores = result?.dimensionScores || {
    M1: { dimensionId: 'M1', title: 'Visi Komunikasi & Narasi Publik Skala Besar', score: 8, validCount: 10, status: 'rendah', description: 'Arsitektur pesan publik kokoh & menginspirasi', suggestedAction: 'Pimpin perumusan Manifesto Komunikasi Wilayah.' },
    M2: { dimensionId: 'M2', title: 'Mentoring & Coaching Kader Komunikator Yunior', score: 10, validCount: 10, status: 'sedang', description: 'Kapasitas pembinaan berjalan efektif', suggestedAction: 'Gunakan metode active questioning saat supervisi.' },
    M3: { dimensionId: 'M3', title: 'Manajemen Krisis Komunikasi & Resolusi Konflik', score: 12, validCount: 10, status: 'sedang', description: 'Ketenangan de-eskalasi teruji di berbagai kasus', suggestedAction: 'Susun SOP respon krisis 60 menit.' },
    M4: { dimensionId: 'M4', title: 'Diplomasi, Lobi & Kolaborasi Lintas Tokoh/Lembaga', score: 9, validCount: 10, status: 'rendah', description: 'Jejaring strategis terpelihara dengan integritas', suggestedAction: 'Perluas kemitraan program kemasyarakatan.' },
    M5: { dimensionId: 'M5', title: 'Audit Komunikasi & Penjaminan Mutu IPOOI', score: 11, validCount: 10, status: 'sedang', description: 'Audit berbasis data dijalankan berkala', suggestedAction: 'Pantau proyeksi Impact Index 6 bulan ke depan.' },
  };

  const recommendations = result?.recommendations || [
    {
      pattern: 'Cenderung mendikte daripada meng-coaching kader komunikator baru',
      hypothesis: 'Keterampilan Mentoring Transformasional & Active Questioning',
      firstPractice: 'Gunakan kerangka GROW (Goal, Reality, Options, Will) dalam sesi mentoring mingguan.',
    },
    {
      pattern: 'Reaktif dan gugup saat menghadapi krisis misinformasi di ranah publik',
      hypothesis: 'Protokol mitigasi krisis & de-eskalasi narasi',
      firstPractice: 'Susun Standard Operating Procedure (SOP) 60 menit respon krisis komunikasi wilayah.',
    },
  ];

  const badges = [
    { name: 'Master Communicator', desc: 'Sertifikasi kompetensi paripurna KAC Show How', icon: '👑' },
    { name: 'Arsitek Narasi', desc: 'Merumuskan narasi pemersatu skala regional', icon: '🏛️' },
    { name: 'Pemimpin Krisis', desc: 'Mengawal de-eskalasi narasi dan resolusi konflik', icon: '🕊️' },
    { name: 'Pembina Teladan', desc: 'Melatih & meluluskan 2 kader mandiri baru', icon: '⭐' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner Overview */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#201538] via-[#2d1b4d] to-[#170e2b] border border-purple-500/30 text-white shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-semibold mb-2">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>Hasil Asesmen Advance Level 3 (Show How) Terverifikasi</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-white">
              Peta Kematangan Kepemimpinan & Pengaruh Publik: {currentUser.name}
            </h2>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl mt-1">
              Unit: <strong className="text-white">{currentUser.unit}</strong> | Puncak kompetensi Show How: Arsitektur narasi strategis, pembinaan kader yunior, dan resolusi krisis komunikasi.
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
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-amber-500 hover:from-purple-400 hover:to-amber-400 text-white font-bold text-xs shadow-lg shadow-purple-500/25 flex items-center space-x-2 transition-all hover:scale-105"
            >
              <span>Mulai 21 Hari Mentoring Kepemimpinan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Card */}
        <div className="p-5 rounded-2xl bg-white/10 border border-white/15 space-y-3">
          <div className="text-sm md:text-base font-bold text-purple-200 leading-snug">
            "{result?.personalMessage || 'Selamat! Evaluasi Show How Anda membuktikan kedewasaan seorang komunikator tingkat Master. Anda tidak sekadar terampil berbicara dan tangguh di lapangan, tetapi mampu menjadi arsitek narasi, mengawal ketenangan di tengah krisis, dan melahirkan kader-kader komunikator masa depan.'}"
          </div>
          <div className="text-xs md:text-sm text-slate-200 italic border-l-2 border-amber-400 pl-3">
            {result?.firstStep || 'Langkah Strategis Master: Jalankan Program Kepemimpinan & Mentoring 21 Hari (Delta Role Play) untuk membina 2 kader baru dan mengaudit sistem mutu komunikasi shaf secara berkelanjutan.'}
          </div>
        </div>
      </div>

      {/* Formal Certificate Frame for Master */}
      <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-b from-[#18112e] via-[#1b1236] to-[#100a20] border-2 border-amber-400/50 text-center text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-4 max-w-2xl mx-auto relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-500 mx-auto flex items-center justify-center text-slate-900 shadow-xl shadow-amber-400/25 text-2xl font-black">
            👑
          </div>
          <span className="text-xs uppercase tracking-widest text-amber-300 font-extrabold block">
            PIAGAM PREDIKAT MASTER COMMUNICATOR
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-white tracking-wide">
            COMMUNICATOR ACADEMY
          </h2>
          <p className="text-xs text-slate-300">
            Dengan Rahmat Allah Yang Maha Esa, dewan penguji KAC Pusat mengukuhkan:
          </p>
          <div className="text-2xl md:text-3xl font-black text-amber-300 py-1 border-b-2 border-amber-400/40 inline-block px-8">
            {currentUser.name}
          </div>
          <div className="text-xs text-purple-300 font-semibold">{currentUser.unit}</div>
          <p className="text-xs text-slate-300 leading-relaxed max-w-lg mx-auto pt-2">
            Telah memenuhi standar tertinggi <strong>MASTER Class (Show How)</strong> dan <strong>Roof KPI C</strong> dengan predikat Kematangan Kepemimpinan "Sangat Memuaskan" (Skor Evaluasi: {result?.score ?? 94}%). Berhak membimbing kader baru dan mewakili gerakan dalam forum komunikasi strategis.
          </p>
          <div className="pt-6 flex items-center justify-between text-[11px] text-slate-400 border-t border-white/10 max-w-lg mx-auto">
            <span>No. Seri: KAC-MST-2026-008</span>
            <span className="font-bold text-amber-400">Otorisasi: Dewan Pembina KAC Pusat</span>
          </div>
        </div>
      </div>

      {/* 5 Strategic Dimensions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-base text-slate-800 dark:text-white flex items-center space-x-2">
            <Layers className="w-4 h-4 text-purple-400" />
            <span>Skor 5 Dimensi Kepemimpinan Show How (0 - 30)</span>
          </h3>
          <span className="text-xs text-slate-400">
            Skor lebih rendah = Hambatan strategis lebih minim
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(['M1', 'M2', 'M3', 'M4', 'M5'] as const).map((dimKey) => {
            const dim = dimensionScores[dimKey];
            if (!dim) return null;
            const isHigh = dim.score >= 20;
            const isModerate = dim.score >= 10 && dim.score < 20;
            const badgeColor = isHigh
              ? 'bg-rose-500/15 text-rose-500 dark:text-rose-400 border-rose-500/30'
              : isModerate
              ? 'bg-amber-500/15 text-amber-500 dark:text-amber-400 border-amber-500/30'
              : 'bg-emerald-500/15 text-emerald-500 dark:text-emerald-400 border-emerald-500/30';
            const barColor = isHigh ? 'bg-rose-500' : isModerate ? 'bg-purple-500' : 'bg-emerald-500';
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
                    {MASTER_DIMENSIONS_INFO[dimKey].desc}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="w-full bg-slate-100 dark:bg-white/10 h-2 rounded-full overflow-hidden">
                    <div
                      className={`${barColor} h-full rounded-full transition-all duration-500`}
                      style={{ width: `${Math.min(100, (dim.score / 30) * 100)}%` }}
                    />
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#12223a] border border-slate-100 dark:border-white/5 text-[11px] text-slate-600 dark:text-slate-300">
                  <strong className="text-purple-400 block mb-0.5">Rekomendasi Dewan Penguji:</strong>
                  <span>{dim.suggestedAction}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mesin Rekomendasi Kepemimpinan */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
        <h3 className="font-extrabold text-base text-slate-800 dark:text-white flex items-center space-x-2">
          <Compass className="w-4 h-4 text-purple-400" />
          <span>Hasil Mesin Rekomendasi Kepemimpinan Wilayah</span>
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
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-700 dark:text-purple-300 leading-relaxed">
                <strong>Langkah Aksi Strategis:</strong> {rec.firstPractice}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Master Badges */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
        <h3 className="font-extrabold text-base text-slate-800 dark:text-white flex items-center space-x-2">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Lencana Kehormatan Master Communicator</span>
        </h3>
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
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-amber-500 hover:from-purple-400 hover:to-amber-400 text-white font-bold text-xs shadow-md shadow-purple-500/25 flex items-center space-x-2 transition-all hover:scale-105"
          >
            <span>Lanjutkan ke Program Mentoring 21 Hari (Delta Role Play)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
