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
  Crown,
  ShieldCheck,
  Zap,
  Target,
  RefreshCw,
  Sparkles,
  Layers,
  Check,
  ChevronRight,
  Info,
  Award,
} from 'lucide-react';

interface InfografisKepemimpinanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PilarKepemimpinan {
  id: number;
  title: string;
  subtitle: string;
  englishTitle: string;
  category: string;
  description: string;
  coreRule: string;
  dos: string[];
  donts: string[];
  mentoringFramework: string;
  kpiTarget: string;
}

const PILAR_MASTER_DATA: PilarKepemimpinan[] = [
  {
    id: 1,
    title: 'Arsitektur Narasi Pemersatu',
    subtitle: 'Merumuskan pesan skala besar yang mengikis polarisasi dan menumbuhkan harapan',
    englishTitle: 'Unifying Public Narrative',
    category: 'Visi & Narasi Publik',
    description: 'Master komunikator mampu melihat melampaui perbedaan teknis dan menyusun "Cerita Kita Bersama" (Public Storytelling) yang menyentuh nurani lintas kelompok.',
    coreRule: 'Kisah Diri (Story of Self) + Kisah Kita (Story of Us) + Kisah Kebutuhan Mendesak Sekarang (Story of Now).',
    dos: [
      'Gunakan diksi yang merangkul dan tidak mengasingkan pihak mana pun.',
      'Fokus pada cita-cita kesejahteraan umat dan kepedulian sosial.',
      'Sajikan bukti integritas keteladanan sebelum menyuarakan seruan aksi.',
    ],
    donts: [
      'Memakai retorika kebencian atau politik adu domba.',
      'Bicara dengan kesombongan moral (moral superiority).',
      'Mengabaikan sensitivitas budaya daerah setempat.',
    ],
    mentoringFramework: 'Membimbing kader yunior menyusun naskah pidato 5 menit yang berakar pada nilai ketulusan.',
    kpiTarget: 'Mampu menyusun Manifesto Narasi Wilayah yang dipatuhi 100% oleh 14 unit shaf 2.',
  },
  {
    id: 2,
    title: 'Mentoring Transformasional (GROW)',
    subtitle: 'Membina kemandirian kader baru tanpa menciptakan ketergantungan personal',
    englishTitle: 'Transformational Mentorship',
    category: 'Kaderisasi Berkelanjutan',
    description: 'Seorang Master tidak mencetak pengikut, melainkan mencetak pemimpin baru. Menggunakan kerangka GROW (Goal, Reality, Options, Will) untuk memantik refleksi mandiri kader.',
    coreRule: 'Tanya Lebih Banyak, Dikte Lebih Sedikit. Biarkan kader menemukan solusinya sendiri.',
    dos: [
      'Ajukan pertanyaan pemicu: "Apa yang sudah berjalan baik dan apa yang ingin kamu coba berbeda?"',
      'Validasi usaha kader sebelum memberikan masukan perbaikan.',
      'Beri ruang aman untuk salah dan belajar dari proses nyata.',
    ],
    donts: [
      'Mengambil alih tugas pembicara saat kader sedang berproses.',
      'Membandingkan kader dengan standar pribadi Master di masa lalu.',
      'Memberikan kritik tajam di depan forum umum.',
    ],
    mentoringFramework: 'Sesi one-on-one coaching mingguan selama 30 menit dengan lembar evaluasi bertahap.',
    kpiTarget: 'Meluluskan minimal 2 kader Newbie naik menjadi komunikator mandiri Runner.',
  },
  {
    id: 3,
    title: 'Manajemen Krisis & De-Eskalasi 60 Menit',
    subtitle: 'Protokol penanganan rumor, fitnah, dan gesekan di ranah publik',
    englishTitle: 'Crisis Communication & De-escalation',
    category: 'Manajemen Krisis',
    description: 'Ketika terjadi kegaduhan narasi publik atau penolakan massal, Master bertindak sebagai pendingin suasana dengan protokol 4 tahap: Verifikasi Fakta, Jeda Tenang, Pernyataan Simpatik, dan Dialog Tertutup.',
    coreRule: 'Dinginkan dengan Empati, Luruskan dengan Data, Selesaikan dengan Silaturahmi Terhormat.',
    dos: [
      'Klarifikasi resmi dirilis dalam waktu < 60 menit dengan persetujuan KAC Pusat.',
      'Kondisikan seluruh anggota shaf agar satu komando dan tidak terpancing debat online.',
      'Kunjungi pihak yang keberatan secara langsung dengan niat mendengarkan.',
    ],
    donts: [
      'Membuat bantahan defensif yang menyerang balik pihak pengkritik.',
      'Membiarkan anggota membuat klarifikasi liar di akun medsos pribadi.',
      'Menutupi data kekeliruan internal bila memang terjadi.',
    ],
    mentoringFramework: 'Simulasi gladi posko penanganan isu sensitif bersama koordinator unit ka.',
    kpiTarget: 'Waktu respon de-eskalasi < 60 menit dengan tingkat redam konflik 100%.',
  },
  {
    id: 4,
    title: 'Diplomasi Tokoh & Kolaborasi Strategis',
    subtitle: 'Membangun aliansi kemitraan dengan pemangku kepentingan kunci',
    englishTitle: 'Strategic Stakeholder Diplomacy',
    category: 'Lobi & Aliansi',
    description: 'Kecakapan duduk sejajar dengan tokoh adat, pemuka agama, akademisi, dan pimpinan daerah untuk membuka pintu kerja sama pembinaan yang bermartabat.',
    coreRule: 'Mencari Titik Temu Kepentingan Luhur (Shared Noble Purpose) Tanpa Menggadaikan Prinsip.',
    dos: [
      'Pahami profil, kepedulian utama, dan legacy yang diinginkan oleh sang tokoh.',
      'Bangun komunikasi informal berkelanjutan bukan hanya saat ada butuh.',
      'Bawa portofolio dampak nyata KAC di lingkungan masyarakat binaan.',
    ],
    donts: [
      'Terjebak pada lobi transaksional atau politik praktis sesaat.',
      'Bersikap menggurui di hadapan tokoh yang lebih senior.',
      'Menjanjikan hal-hal yang berada di luar kapasitas gerakan.',
    ],
    mentoringFramework: 'Pendampingan tandem saat audiensi ke kantor kepala desa atau majelis ulama.',
    kpiTarget: 'Menjalin nota kesepahaman silaturahmi dengan minimal 3 simpul tokoh regional.',
  },
  {
    id: 5,
    title: 'Audit Mutu Komunikasi & Rantai IPOOI',
    subtitle: 'Menjamin akurasi dampak dari alokasi Input hingga transformasi Impact',
    englishTitle: 'IPOOI Quality Assurance Audit',
    category: 'Penjaminan Mutu',
    description: 'Master bertanggung jawab menjaga kesehatan ekosistem: meneliti apakah waktu belajar (Input) dan kuis (Process) benar-benar meningkatkan penerimaan masyarakat (Outcome) dan kedewasaan jamaah (Impact).',
    coreRule: 'Data Lapangan Adalah Kompas Kejujuran. Perbaiki Strategi Bila Hasil Tidak Sesuai Target.',
    dos: [
      'Lakukan audit bulanan pada dashboard analitik shaf 2.',
      'Identifikasi unit yang mengalami perlambatan dan berikan intervensi pembinaan khusus.',
      'Perbarui modul jika pola demografi audiens mengalami pergeseran zaman.',
    ],
    donts: [
      'Memanipulasi angka laporan agar terlihat sukses di atas kertas.',
      'Hanya puas pada angka kehadiran tanpa melihat perubahan akhlak.',
      'Mengabaikan keluhan lapangan dari para kader garis depan.',
    ],
    mentoringFramework: 'Rapat koordinasi dewan audit mutu bersama seluruh koordinator ka.',
    kpiTarget: 'Menjaga Indeks Dampak KAC (Impact Index) di atas 85% secara konsisten.',
  },
  {
    id: 6,
    title: 'Keteladanan Karakter & Integritas Moral',
    subtitle: 'Show How: Menjadi teladan hidup yang menginspirasi sebelum berucap',
    englishTitle: 'Living Exemplar & Moral Authority',
    category: 'Karakter Master',
    description: 'Kekuatan terbesar seorang Master bukan pada kefasihan lidahnya, melainkan pada keselarasan mutlak antara apa yang diucapkannya di panggung dengan akhlak kesehariannya.',
    coreRule: 'Perilaku Kita Adalah Pesan Pengabaran Yang Paling Keras Terdengar.',
    dos: [
      'Disiplin waktu, tepati janji, dan bersikap rendah hati di tengah pencapaian besar.',
      'Sedia meminta maaf dengan tulus jika ada kekurangan.',
      'Terus belajar dan tidak pernah merasa paling pintar.',
    ],
    donts: [
      'Menuntut penghormatan atau fasilitas khusus dari anggota.',
      'Bermuka dua di depan dan di belakang jamaah.',
      'Mengorbankan integritas demi popularitas semu.',
    ],
    mentoringFramework: 'Pemberian keteladanan langsung saat turun ke tengah masyarakat.',
    kpiTarget: 'Skor keteladanan moral dinilai 100% kredibel oleh seluruh dewan penguji.',
  },
];

export const InfografisKepemimpinanModal: React.FC<InfografisKepemimpinanModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'poster' | 'detail' | 'checklist'>('poster');
  const [selectedPilarId, setSelectedPilarId] = useState<number>(1);
  const [checklist, setChecklist] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: false,
    5: true,
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

  const currentPilar = PILAR_MASTER_DATA.find((p) => p.id === selectedPilarId) || PILAR_MASTER_DATA[0];
  const toggleCheck = (id: number) => {
    setChecklist((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const completedCount = Object.values(checklist).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / PILAR_MASTER_DATA.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative flex flex-col w-full bg-[#120d24] border border-purple-500/30 rounded-3xl shadow-2xl shadow-purple-950/50 overflow-hidden max-h-[92vh] max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-purple-500/20 bg-gradient-to-r from-[#170e30] via-[#241345] to-[#170e30]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/40 shadow-inner">
              <Crown className="w-5 h-5 text-amber-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-400">
                  Panduan Strategis • Level 3 Master (Show How)
                </span>
                <span className="text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">
                  ROOF KPI C
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white tracking-wide">
                ARSITEKTUR NARASI STRATEGIS & KEPEMIMPINAN SHOW HOW
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/30 transition-all"
            title="Tutup Modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Subheader */}
        <div className="flex flex-wrap items-center justify-between px-5 py-2.5 bg-slate-900/60 border-b border-white/5 gap-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('poster')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'poster'
                  ? 'bg-gradient-to-r from-purple-500 to-amber-500 text-white shadow-md shadow-purple-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Bagan Pilar Kepemimpinan</span>
            </button>
            <button
              onClick={() => setActiveTab('detail')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'detail'
                  ? 'bg-gradient-to-r from-purple-500 to-amber-500 text-white shadow-md shadow-purple-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Protokol Krisis & Mentoring</span>
            </button>
            <button
              onClick={() => setActiveTab('checklist')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'checklist'
                  ? 'bg-gradient-to-r from-purple-500 to-amber-500 text-white shadow-md shadow-purple-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Audit Mutu Master ({completedCount}/6)</span>
            </button>
          </div>
        </div>

        {/* Body Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
          {/* TAB 1: VISUAL POSTER MATRIX */}
          {activeTab === 'poster' && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-gradient-to-br from-[#1a1133] via-[#241344] to-[#140b29] border border-purple-500/30 shadow-xl space-y-6">
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-400">
                    Puncak Kompetensi Komunikator KAC
                  </span>
                  <h4 className="text-xl font-black text-white">
                    6 PILAR KEPEMIMPINAN KOMUNIKASI & MANAJEMEN KRISIS
                  </h4>
                  <p className="text-xs text-slate-300">
                    Melahirkan kader mandiri, memimpin orkestrasi narasi massal, dan mengawal kestabilan gerakan.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                  {PILAR_MASTER_DATA.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        setSelectedPilarId(p.id);
                        setActiveTab('detail');
                      }}
                      className="p-5 rounded-2xl bg-[#1b1236] border border-purple-500/20 hover:border-amber-400/60 hover:bg-purple-950/40 transition-all cursor-pointer group space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="w-7 h-7 rounded-lg bg-amber-400/20 text-amber-300 text-xs font-black flex items-center justify-center font-mono">
                            0{p.id}
                          </span>
                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono">
                            {p.category}
                          </span>
                        </div>
                        <h5 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors">
                          {p.title}
                        </h5>
                        <p className="text-xs text-slate-400 line-clamp-2">
                          {p.subtitle}
                        </p>
                      </div>
                      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-amber-400 font-bold">
                        <span>Lihat Protokol Detail</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DETAIL PROTOCOL */}
          {activeTab === 'detail' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Daftar 6 Pilar Master:
                </div>
                {PILAR_MASTER_DATA.map((p) => {
                  const isSelected = p.id === selectedPilarId;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPilarId(p.id)}
                      className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-purple-500/20 border-purple-400 text-white shadow-lg ring-1 ring-amber-400'
                          : 'bg-[#181130] border-white/5 hover:border-purple-500/30 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 truncate">
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                          isSelected ? 'bg-amber-400 text-slate-900' : 'bg-white/5 text-slate-400'
                        }`}>
                          0{p.id}
                        </span>
                        <div className="truncate">
                          <div className="text-xs font-bold truncate text-white">{p.title}</div>
                          <div className="text-[10px] text-slate-400 truncate">{p.category}</div>
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`} />
                    </button>
                  );
                })}
              </div>

              <div className="lg:col-span-7 p-6 rounded-3xl bg-[#1b1236] border border-purple-500/30 shadow-xl space-y-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-black uppercase text-amber-400">
                      Pilar #0{currentPilar.id} • {currentPilar.category}
                    </span>
                  </div>
                  <h4 className="text-lg font-black text-white">{currentPilar.title}</h4>
                  <p className="text-xs text-slate-400">{currentPilar.subtitle}</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-xs">
                  <span className="font-bold text-amber-300 block mb-0.5">Kaidah Emas Master:</span>
                  <p className="text-white font-mono font-semibold">{currentPilar.coreRule}</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#130b26] border border-white/5 text-xs text-slate-300 leading-relaxed">
                  {currentPilar.description}
                </div>

                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/30 text-xs space-y-1">
                  <strong className="text-amber-300 block">Metodologi Mentoring & Praktik:</strong>
                  <p className="text-slate-200">{currentPilar.mentoringFramework}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-1">
                    <span className="font-bold text-emerald-400 block">Kaidah Sukses (Do's):</span>
                    <ul className="space-y-1 text-slate-300">
                      {currentPilar.dos.map((d, i) => (
                        <li key={i}>• {d}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-3 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-1">
                    <span className="font-bold text-rose-400 block">Pantangan (Don'ts):</span>
                    <ul className="space-y-1 text-slate-300">
                      {currentPilar.donts.map((d, i) => (
                        <li key={i}>• {d}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/20 text-xs flex items-center space-x-2">
                  <Target className="w-4 h-4 text-purple-400 shrink-0" />
                  <div>
                    <strong className="text-purple-300">Target Roof KPI C: </strong>
                    <span className="text-slate-300">{currentPilar.kpiTarget}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: AUDIT MUTU */}
          {activeTab === 'checklist' && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="p-5 rounded-3xl bg-gradient-to-r from-purple-950/60 to-amber-950/40 border border-purple-500/30 flex items-center justify-between">
                <div>
                  <h4 className="text-base font-black text-white">
                    Audit Kesiapan Kepemimpinan Show How
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Pastikan seluruh pilar kepemimpinan aktif dijalankan dalam supervisi regional.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-amber-400 font-mono">{progressPercent}%</span>
                  <span className="block text-[10px] text-slate-400 uppercase font-bold">{completedCount}/6 Pilar Tuntas</span>
                </div>
              </div>

              <div className="space-y-2.5">
                {PILAR_MASTER_DATA.map((p) => {
                  const isChecked = !!checklist[p.id];
                  return (
                    <div
                      key={p.id}
                      onClick={() => toggleCheck(p.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isChecked
                          ? 'bg-purple-950/40 border-purple-500/50 text-white'
                          : 'bg-[#181130] border-white/5 hover:border-purple-500/30 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3.5">
                        <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
                          isChecked ? 'bg-amber-400 border-amber-300 text-slate-900' : 'bg-white/5 border-white/20 text-transparent'
                        }`}>
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">{p.title}</div>
                          <p className="text-xs text-slate-400 mt-0.5">{p.subtitle}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                        isChecked ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}>
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
        <div className="px-5 py-3 border-t border-purple-500/20 bg-[#0d071c] flex items-center justify-between text-xs text-slate-400">
          <span>Roof KPI C • Standar Mutu Tertinggi Master Communicator KAC</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs"
          >
            Selesai Menyimak
          </button>
        </div>
      </div>
    </div>
  );
};
