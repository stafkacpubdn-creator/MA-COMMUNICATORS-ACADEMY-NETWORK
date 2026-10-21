import React, { useState, useEffect } from 'react';
import {
  X,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  Share2,
  CheckCircle2,
  BookOpen,
  Volume2,
  Ear,
  MessageSquare,
  Eye,
  Target,
  Heart,
  RefreshCw,
  Sparkles,
  Layers,
  Check,
  ChevronRight,
  Info,
} from 'lucide-react';

interface InfografisKomunikasiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SkillDetail {
  id: number;
  title: string;
  subtitle: string;
  englishTitle: string;
  icon: React.ReactNode;
  color: string;
  bgGlow: string;
  borderColor: string;
  tag: string;
  description: string;
  dos: string[];
  donts: string[];
  kpiIndicator: string;
  exampleScenario: string;
}

const SKILLS_DATA: SkillDetail[] = [
  {
    id: 1,
    title: 'Mendengarkan Aktif',
    subtitle: 'Menyimak dengan empati dan perhatian penuh',
    englishTitle: 'Active Listening',
    icon: <Ear className="w-6 h-6 text-cyan-400" />,
    color: 'text-cyan-400',
    bgGlow: 'from-cyan-500/20 to-blue-500/10',
    borderColor: 'border-cyan-500/40',
    tag: 'Fondasi Utama',
    description: 'Kemampuan memberi perhatian 100% kepada lawan bicara tanpa terdistraksi, menangkap pesan verbal maupun emosional di balik perkataan, serta tidak memotong pembicaraan.',
    dos: [
      'Lakukan kontak mata yang bersahabat dan anggukan tanda mengerti.',
      'Buat ringkasan atau parafrase: "Maksud Anda seperti ini... benar?"',
      'Fokus penuh tanpa memegang gadget saat lawan bicara berbicara.',
    ],
    donts: [
      'Menyela atau memotong pembicaraan sebelum tuntas.',
      'Menyiapkan sanggahan dalam pikiran saat orang lain masih berbicara.',
      'Menilai atau menghakimi secara terburu-buru.',
    ],
    kpiIndicator: 'Mampu merekap 3 poin inti pesan lawan bicara secara akurat 100%.',
    exampleScenario: 'Saat anggota shaf menyampaikan keluhan kendala lapangan, dengarkan tanpa menyela selama 3 menit pertama, lalu validasi perasaannya.',
  },
  {
    id: 2,
    title: 'Komunikasi Verbal yang Jelas',
    subtitle: 'Artikulasi terstruktur, nada tepat, dan diksi santun',
    englishTitle: 'Clear Verbal Communication',
    icon: <MessageSquare className="w-6 h-6 text-sky-400" />,
    color: 'text-sky-400',
    bgGlow: 'from-sky-500/20 to-blue-600/10',
    borderColor: 'border-sky-500/40',
    tag: 'Artikulasi & Nada',
    description: 'Menyampaikan gagasan dengan kalimat lugas, artikulasi vokal yang jelas, kecepatan bicara yang teratur, dan pilihan kata yang mudah dipahami audiens.',
    dos: [
      'Gunakan struktur: Masalah -> Alasan -> Solusi/Tindakan.',
      'Atur tempo bicara (120-140 kata/menit) dan berikan jeda strategis.',
      'Sesuaikan gaya bahasa dengan latar belakang lawan bicara.',
    ],
    donts: [
      'Menggunakan jargon rumit yang tidak dipahami rekan bicara.',
      'Bicara monoton dengan nada datar atau membentak.',
      'Bicara berputar-putar tanpa titik kesimpulan yang jelas.',
    ],
    kpiIndicator: 'Pesan instruksi dipahami dan dapat diulang kembali tanpa miskonsepsi.',
    exampleScenario: 'Memberikan pengarahan SOP harian kepada tim dengan 3 poin kunci bernomor yang mudah dicatat.',
  },
  {
    id: 3,
    title: 'Isyarat Non-Verbal',
    subtitle: 'Bahasa tubuh, ekspresi wajah, dan kontak mata selaras',
    englishTitle: 'Non-Verbal Cues',
    icon: <Eye className="w-6 h-6 text-teal-400" />,
    color: 'text-teal-400',
    bgGlow: 'from-teal-500/20 to-emerald-500/10',
    borderColor: 'border-teal-500/40',
    tag: 'Body Language',
    description: 'Lebih dari 55% pesan dipengaruhi oleh bahasa tubuh. Sikap terbuka, senyum proporsional, dan posisi duduk/berdiri memperkuat kepercayaan dan wibawa.',
    dos: [
      'Pertahankan postur tubuh tegap namun rileks dan terbuka (tidak melipat tangan).',
      'Ekspresi wajah hangat, selaras dengan nada pesan yang disampaikan.',
      'Gunakan gestur tangan terbuka untuk menegaskan poin penting.',
    ],
    donts: [
      'Melihat jam tangan atau smartphone berulang kali.',
      'Menyilangkan tangan di dada atau memalingkan wajah.',
      'Ekspresi cemberut saat mendiskusikan topik kerja sama.',
    ],
    kpiIndicator: 'Membangun impresi kredibel dan keterbukaan dalam 10 detik pertama interaksi.',
    exampleScenario: 'Menyambut rekan atau mitra dengan senyum tulus, postur tegak, dan jabat tangan atau salam hangat.',
  },
  {
    id: 4,
    title: 'Kejelasan & Keringkasan',
    subtitle: 'Prinsip to-the-point tanpa mengurangi substansi',
    englishTitle: 'Clarity & Conciseness',
    icon: <Target className="w-6 h-6 text-emerald-400" />,
    color: 'text-emerald-400',
    bgGlow: 'from-emerald-500/20 to-green-600/10',
    borderColor: 'border-emerald-500/40',
    tag: 'Efisiensi Pesan',
    description: 'Menyampaikan inti persoalan dengan hemat kata (prinsip KISS: Keep It Simple and Straightforward), langsung pada inti sasaran sehingga menghemat waktu dan tenaga.',
    dos: [
      'Mulai dengan pesan utama atau kesimpulan di awal (Bottom Line Up Front).',
      'Hilangkan kata-kata pengisi (filler words seperti "eee...", "anu").',
      'Gunakan data angka yang presisi dibanding kata-kata spekulatif.',
    ],
    donts: [
      'Mengulang-ulang kalimat yang sama dengan variasi kata berbeda.',
      'Menyisipkan informasi tidak relevan yang mengaburkan pesan inti.',
      'Menulis laporan panjang tanpa ringkasan eksekutif.',
    ],
    kpiIndicator: 'Waktu penyampaian briefing selesai dalam waktu < 5 menit dengan akurasi 100%.',
    exampleScenario: 'Pelaporan status KPI harian langsung merinci: Target tercapai, Deviasi, Rencana Mitigasi dalam 3 baris.',
  },
  {
    id: 5,
    title: 'Empati & Kecerdasan Emosional',
    subtitle: 'Memahami perasaan dan sudut pandang rekan bicara',
    englishTitle: 'Empathy',
    icon: <Heart className="w-6 h-6 text-rose-400" />,
    color: 'text-rose-400',
    bgGlow: 'from-rose-500/20 to-pink-600/10',
    borderColor: 'border-rose-500/40',
    tag: 'Emotional Resonance',
    description: 'Menempatkan diri pada posisi orang lain, memvalidasi emosi dan perjuangan mereka sebelum menawarkan koreksi, serta memperlakukan lawan bicara dengan penghargaan setara.',
    dos: [
      'Akui emosi lawan bicara: "Saya memahami situasi ini cukup menantang bagi Anda."',
      'Fokus mencari solusi bersama daripada menyalahkan personal.',
      'Tunjukkan perhatian tulus terhadap kondisi fisik dan psikologis rekan.',
    ],
    donts: [
      'Mengabaikan atau meremehkan keluhan: "Ah, segitu saja kok berat."',
      'Langsung menceramahi tanpa memahami konteks kesulitan rekan.',
      'Menjadikan diri sendiri pusat perbandingan.',
    ],
    kpiIndicator: 'Tingkat kepercayaan tim dan keterbukaan konsultasi meningkat signifikan.',
    exampleScenario: 'Saat anggota terlambat menyelesaikan tugas, tanyakan terlebih dahulu kendala yang dihadapi sebelum memberikan arahan koreksi.',
  },
  {
    id: 6,
    title: 'Umpan Balik Konstruktif',
    subtitle: 'Memberi masukan solutif dan terbuka menerima kritik',
    englishTitle: 'Constructive Feedback',
    icon: <RefreshCw className="w-6 h-6 text-amber-400" />,
    color: 'text-amber-400',
    bgGlow: 'from-amber-500/20 to-orange-600/10',
    borderColor: 'border-amber-500/40',
    tag: 'Feedback Loop',
    description: 'Komunikasi adalah proses dua arah yang membutuhkan siklus umpan balik teratur. Memberikan masukan spesifik yang membangun dan menerima saran evaluasi secara lapang dada.',
    dos: [
      'Gunakan metode SBI (Situation - Behavior - Impact).',
      'Fokus pada tindakan objektif, bukan menyerang karakter pribadi.',
      'Ucapkan terima kasih saat menerima kritik dan catat poin perbaikannya.',
    ],
    donts: [
      'Memberikan kritik di depan umum yang mempermalukan rekan.',
      'Menolak masukan dengan sikap defensif atau reaktif.',
      'Hanya mengkritik tanpa memberikan alternatif solusi konkret.',
    ],
    kpiIndicator: 'Perbaikan performa terukur terlihat dalam siklus 7 hari pasca evaluasi.',
    exampleScenario: 'Evaluasi mingguan shaf 2 dilakukan dengan format apresiasi 2 pencapaian + 1 rekomendasi peningkatan terukur.',
  },
];

export const InfografisKomunikasiModal: React.FC<InfografisKomunikasiModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'poster' | 'interactive' | 'checklist'>('poster');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedSkillId, setSelectedSkillId] = useState<number>(1);
  const [checklist, setChecklist] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: false,
    4: true,
    5: false,
    6: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentSkill = SKILLS_DATA.find((s) => s.id === selectedSkillId) || SKILLS_DATA[0];
  const toggleCheck = (id: number) => {
    setChecklist((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const completedCount = Object.values(checklist).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / SKILLS_DATA.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`relative flex flex-col w-full bg-[#0d1829] border border-cyan-500/30 rounded-3xl shadow-2xl shadow-cyan-950/50 overflow-hidden transition-all duration-300 ${
          isFullscreen
            ? 'h-[98vh] max-w-[98vw]'
            : 'max-h-[92vh] max-w-5xl'
        }`}
      >
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-cyan-500/20 bg-gradient-to-r from-[#0c1f38] via-[#0e2747] to-[#0c1f38]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/40 shadow-inner">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-400">
                  Referensi Pembelajaran Visual • Level 1
                </span>
                <span className="text-[9px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded-full font-bold">
                  RESMI
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white tracking-wide">
                6 KETERAMPILAN KOMUNIKASI DASAR
              </h3>
            </div>
          </div>
          {/* Action buttons on header */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors"
              title={isFullscreen ? 'Keluar Layar Penuh' : 'Perbesar Layar Penuh'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/30 transition-all"
              title="Tutup Infografis"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Selection Subheader */}
        <div className="flex flex-wrap items-center justify-between px-5 py-2.5 bg-slate-900/60 border-b border-white/5 gap-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('poster')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'poster'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Poster Infografis Visual (HD)</span>
            </button>
            <button
              onClick={() => setActiveTab('interactive')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'interactive'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Diagram & Bedah 6 Modul</span>
            </button>
            <button
              onClick={() => setActiveTab('checklist')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'checklist'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Checklist Harian ({completedCount}/6)</span>
            </button>
          </div>
          {activeTab === 'poster' && (
            <div className="flex items-center space-x-1.5 text-xs bg-slate-800/80 px-2 py-1 rounded-xl border border-slate-700/60">
              <button
                onClick={() => setZoomLevel((z) => Math.max(60, z - 20))}
                className="p-1 rounded hover:bg-slate-700 text-slate-300"
                title="Perkecil (-)"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-cyan-400 font-bold px-1.5 text-[11px] min-w-[45px] text-center">
                {zoomLevel}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(200, z + 20))}
                className="p-1 rounded hover:bg-slate-700 text-slate-300"
                title="Perbesar (+)"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoomLevel(100)}
                className="p-1 rounded hover:bg-slate-700 text-slate-300 ml-1"
                title="Reset Ukuran (100%)"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Modal Body Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
          {/* ================= TAB 1: POSTER INFOGRAFIS ================= */}
          {activeTab === 'poster' && (
            <div className="space-y-6">
              {/* Infographic Poster Viewer Canvas with Vector Infographic Layout */}
              <div className="relative rounded-3xl bg-gradient-to-br from-[#071324] via-[#0b1c36] to-[#071324] border border-cyan-500/25 p-6 overflow-auto flex flex-col items-center justify-center min-h-[380px] sm:min-h-[460px] shadow-inner space-y-6">
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Kurikulum Resmi Communicator Academy</span>
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-wide">
                    6 KETERAMPILAN KOMUNIKASI DASAR
                  </h3>
                  <p className="text-xs text-slate-300">
                    Enam pilar fundamental yang wajib diinternalisasi sebelum melangkah ke praktik lapangan.
                  </p>
                </div>

                {/* 6 Circular Interconnected Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl pt-2">
                  {SKILLS_DATA.map((skill) => (
                    <div
                      key={skill.id}
                      onClick={() => {
                        setSelectedSkillId(skill.id);
                        setActiveTab('interactive');
                      }}
                      className="p-4 rounded-2xl bg-[#0f213a] border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-950/40 transition-all cursor-pointer group space-y-2.5 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="w-7 h-7 rounded-xl bg-cyan-500/20 text-cyan-400 font-mono font-black text-xs flex items-center justify-center">
                            0{skill.id}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-300 font-mono">
                            {skill.tag}
                          </span>
                        </div>
                        <h5 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                          {skill.title}
                        </h5>
                        <p className="text-xs text-slate-400 line-clamp-2">
                          {skill.subtitle}
                        </p>
                      </div>
                      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-cyan-400 font-bold">
                        <span>Pelajari Detail</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 2: DIAGRAM & BEDAH 6 MODUL ================= */}
          {activeTab === 'interactive' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Skills Selector List */}
              <div className="lg:col-span-5 space-y-2.5">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Daftar 6 Keterampilan Inti:
                </div>
                {SKILLS_DATA.map((skill) => {
                  const isSelected = skill.id === selectedSkillId;
                  return (
                    <button
                      key={skill.id}
                      onClick={() => setSelectedSkillId(skill.id)}
                      className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                        isSelected
                          ? `bg-gradient-to-r ${skill.bgGlow} ${skill.borderColor} shadow-lg ring-1 ring-cyan-400`
                          : 'bg-[#0f1d33] border-white/5 hover:border-cyan-500/30 text-slate-300 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                            isSelected
                              ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400'
                              : 'bg-white/5 text-slate-400 border border-white/10'
                          }`}
                        >
                          0{skill.id}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-white">
                              {skill.title}
                            </span>
                            <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-white/10 text-slate-300 font-mono">
                              {skill.tag}
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {skill.englishTitle}
                          </div>
                        </div>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          isSelected ? 'text-cyan-400 translate-x-1' : 'text-slate-500'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Right Detail Card for Selected Skill */}
              <div className="lg:col-span-7 p-6 rounded-3xl bg-[#0f213a] border border-cyan-500/30 shadow-xl space-y-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/40 shadow-inner">
                      {currentSkill.icon}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-black uppercase tracking-wider text-cyan-400">
                          Modul #0{currentSkill.id} • {currentSkill.englishTitle}
                        </span>
                        <span className="text-[9px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded-full font-bold">
                          {currentSkill.tag}
                        </span>
                      </div>
                      <h4 className="text-lg font-black text-white">
                        {currentSkill.title}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {currentSkill.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#091424] border border-cyan-500/20 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentSkill.description}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
                    <div className="text-xs font-bold text-emerald-400 flex items-center space-x-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Praktik Positif (Do's)</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {currentSkill.dos.map((d, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-2">
                    <div className="text-xs font-bold text-rose-400 flex items-center space-x-1.5">
                      <X className="w-4 h-4" />
                      <span>Hal yang Dihindari (Don'ts)</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {currentSkill.donts.map((d, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <span className="text-rose-400 font-bold">•</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/20 flex items-center space-x-2.5">
                    <Target className="w-4 h-4 text-cyan-400 shrink-0" />
                    <div>
                      <strong className="text-cyan-300">Target KPI: </strong>
                      <span className="text-slate-300">{currentSkill.kpiIndicator}</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/20 flex items-center space-x-2.5">
                    <Info className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <strong className="text-amber-300">Skenario Praktik: </strong>
                      <span className="text-slate-300">{currentSkill.exampleScenario}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 3: CHECKLIST HARIAN ================= */}
          {activeTab === 'checklist' && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="p-5 rounded-3xl bg-gradient-to-r from-cyan-950/60 to-blue-950/40 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-base font-black text-white">
                    Checklist Penerapan 6 Keterampilan Komunikasi Hari Ini
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Tandai keterampilan yang sudah berhasil Anda terapkan dalam komunikasi shaf & tugas harian.
                  </p>
                </div>
                <div className="flex items-center space-x-3 shrink-0">
                  <div className="text-right">
                    <span className="text-2xl font-black text-cyan-400 font-mono">
                      {progressPercent}%
                    </span>
                    <span className="block text-[10px] text-slate-400 uppercase font-bold">
                      {completedCount} dari 6 Selesai
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                {SKILLS_DATA.map((skill) => {
                  const isChecked = !!checklist[skill.id];
                  return (
                    <div
                      key={skill.id}
                      onClick={() => toggleCheck(skill.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isChecked
                          ? 'bg-cyan-950/40 border-cyan-500/50 text-white shadow-sm'
                          : 'bg-[#0f1e33] border-white/5 hover:border-cyan-500/30 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3.5">
                        <div
                          className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
                            isChecked
                              ? 'bg-cyan-500 border-cyan-400 text-slate-950'
                              : 'bg-white/5 border-white/20 text-transparent'
                          }`}
                        >
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-white">
                              {skill.title}
                            </span>
                            <span className="text-[10px] text-cyan-400 font-mono font-semibold">
                              ({skill.englishTitle})
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {skill.subtitle}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                          isChecked
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        {isChecked ? 'Tuntas' : 'Belum'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-cyan-500/20 bg-[#0a1424] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Infografis Resmi Kurikulum Communicator Academy Shaf 2</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-all self-end"
          >
            Selesai Menyimak
          </button>
        </div>
      </div>
    </div>
  );
};
