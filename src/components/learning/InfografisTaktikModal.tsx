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
  ShieldCheck,
  Zap,
  Target,
  RefreshCw,
  Sparkles,
  Layers,
  Check,
  ChevronRight,
  Info,
  Flame,
  Swords,
  HelpCircle,
} from 'lucide-react';

interface InfografisTaktikModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TaktikDetail {
  id: number;
  title: string;
  subtitle: string;
  englishTitle: string;
  category: string;
  description: string;
  formula: string;
  dos: string[];
  donts: string[];
  rebuttalScript: string;
  kpiTarget: string;
}

const TAKTIK_DATA: TaktikDetail[] = [
  {
    id: 1,
    title: 'The Feel-Felt-Found Pivot',
    subtitle: 'Meredam resistensi dengan validasi empati dan kesamaan nasib',
    englishTitle: 'Feel-Felt-Found Technique',
    category: 'Validasi & Rebuttal',
    description: 'Metode emas untuk merespons keraguan: "Saya sangat memahami apa yang bapak rasakan (Feel), rekan-rekan kami dulu juga merasakan hal serupa (Felt), namun setelah berinteraksi langsung kami menemukan (Found)..."',
    formula: 'Validasi Emosi (Feel) + Cerita Kesamaan (Felt) + Fakta Solutif (Found)',
    dos: [
      'Turunkan intonasi vokal agar terdengar menyejukkan.',
      'Sertakan contoh nyata warga atau tokoh setempat yang kini merasakan manfaatnya.',
      'Berikan jeda agar audiens mencerna transisi narasi.',
    ],
    donts: [
      'Langsung membantah: "Bapak salah paham!"',
      'Menggunakan kata "TAPI" (ganti dengan "DAN" atau "NAMUN").',
      'Memalsukan testimoni yang tidak faktual.',
    ],
    rebuttalScript: '"Saya paham sekali bapak merasa program seperti ini menyita waktu. Rekan kami di RT 03 dulu juga merasa demikian, namun setelah mencoba sesi 15 menit, beliau justru merasa hidupnya jauh lebih tenang dan terarah."',
    kpiTarget: 'Merespons bantahan pertama dalam waktu < 4.5 detik dengan nada stabil.',
  },
  {
    id: 2,
    title: 'Question with Question (Reframing)',
    subtitle: 'Mengubah pernyataan skeptis menjadi refleksi kebutuhan personal',
    englishTitle: 'Socratic Reframing',
    category: 'Eksplorasi Kebutuhan',
    description: 'Menjawab prasangka bukan dengan sanggahan, melainkan dengan pertanyaan reflektif yang membuat audiens mengevaluasi kembali asumsinya secara mandiri.',
    formula: 'Dengar Penuh + Apresiasi Pikiran + Pertanyaan Pemantik Kesadaran',
    dos: [
      'Gunakan awalan: "Menurut pandangan bapak yang lebih berpengalaman..."',
      'Fokus pada masa depan generasi anak/keluarga audiens.',
      'Dengarkan jawaban mereka tanpa memotong.',
    ],
    donts: [
      'Bertanya dengan nada menginterogasi atau mengetes.',
      'Memojokkan audiens sampai mereka merasa malu.',
      'Mengabaikan jawaban mereka dan kembali membaca hafalan naskah.',
    ],
    rebuttalScript: '"Terima kasih atas keterbukaan bapak. Boleh kami tahu, menurut bapak apa tantangan terbesar yang sedang dihadapi generasi muda di lingkungan kita saat ini?"',
    kpiTarget: 'Mengajak audiens berbicara 60% waktu melalui pertanyaan terbuka.',
  },
  {
    id: 3,
    title: 'Acknowledge & Boomerang',
    subtitle: 'Mengubah alasan penolakan menjadi alasan terkuat untuk bergabung',
    englishTitle: 'The Boomerang Method',
    category: 'Taktik Objeksi',
    description: 'Mengambil keberatan audiens (misal: "saya orang sibuk") dan menjadikannya alasan utama mengapa materi KAC justru sangat penting bagi mereka.',
    formula: 'Akui Keberatan + Balikkan Sebagai Kebutuhan Utama + Bukti Efisiensi',
    dos: [
      'Tegaskan bahwa orang yang sangat sibuk justru paling membutuhkan manajemen ketenangan batin.',
      'Tawarkan durasi yang sangat fleksibel (misal 10 menit audio podcast mandiri).',
      'Tunjukkan efisiensi kurikulum KAC.',
    ],
    donts: [
      'Meremehkan kesibukan audiens: "Masa 15 menit saja tidak ada waktu?"',
      'Terlihat memaksa atau tidak sabar.',
      'Membandingkan dengan orang lain yang lebih sibuk.',
    ],
    rebuttalScript: '"Justru karena bapak memiliki jadwal yang luar biasa padat dan tanggung jawab besar, metode ringkas KAC ini dirancang agar bapak tetap memiliki oase ketenangan di sela kesibukan tanpa mengganggu tugas harian."',
    kpiTarget: 'Tingkat konversi audiens sibuk meningkat hingga 75%.',
  },
  {
    id: 4,
    title: 'Story Proof & Social Evidence',
    subtitle: 'Membuktikan kebenaran lewat kisah perubahan nyata di Shaf 2',
    englishTitle: 'Narrative Social Proof',
    category: 'Bukti & Kredibilitas',
    description: 'Manusia tidak membeli argumen logika murni; mereka tergerak oleh kisah perubahan nyata (before-after) dari sesama anggota masyarakat yang memiliki kesamaan profil.',
    formula: 'Karakter Serupa + Titik Balik Problem + Transformasi Nyata',
    dos: [
      'Ceritakan kisah tetangga atau tokoh yang dikenal audiens.',
      'Soroti perubahan perilaku positif (lebih sabar, harmonis, disiplin).',
      'Gunakan foto atau kutipan singkat dari portofolio resmi KAC.',
    ],
    donts: [
      'Menceritakan kisah yang terlalu dramatis dan tidak masuk akal.',
      'Menyebutkan nama orang tanpa izin privasi.',
      'Bercerita terlalu panjang melebihi 2 menit.',
    ],
    rebuttalScript: '"Di wilayah ka02 kemarin, ada seorang kepala keluarga yang awalnya sangat ragu. Setelah 2 pekan mengikuti halaqah santai, beliau sendiri yang mengajak putranya untuk ikut belajar adab komunikasi."',
    kpiTarget: 'Mampu menyampaikan 1 studi kasus perubahan dalam waktu 90 detik.',
  },
  {
    id: 5,
    title: 'De-Escalation & Emotional Neutralizer',
    subtitle: 'Mendinginkan suasana tegang saat lawan bicara agresif',
    englishTitle: 'De-escalation Protocol',
    category: 'Kontrol Situasi',
    description: 'Protokol darurat ketika audiens menolak dengan nada tinggi atau emosional. Fokus pada penurunan volume suara, pernapasan teratur, dan validasi tanpa syarat.',
    formula: 'Jeda 3 Detik + Suara Tenang Lembut + Permohonan Maaf Santun + Pamit Terhormat',
    dos: [
      'Jaga jarak fisik aman dan postur tubuh terbuka tanpa menantang.',
      'Ucapkan: "Mohon maaf jika kehadiran kami mengganggu waktu istirahat bapak."',
      'Tinggalkan kesan akhir yang sangat sopan dan salam damai sejahtera.',
    ],
    donts: [
      'Membalas dengan tatapan tajam atau bibir mencibir.',
      'Mengeluarkan argumen menyudutkan atau memojokkan audiens.',
      'Berdebat di depan tetangga atau kerumunan warga.',
    ],
    rebuttalScript: '"Baik bapak, kami sangat menghormati waktu istirahat bapak sekeluarga. Mohon dimaafkan apabila kedatangan kami kurang berkenan. Salam damai sejahtera dan semoga bapak sekeluarga senantiasa dilimpahi kesehatan."',
    kpiTarget: 'Nol insiden konflik fisik/verbal di seluruh unit shaf 2.',
  },
  {
    id: 6,
    title: 'The Soft Bridge (Jembatan Halus)',
    subtitle: 'Menghubungkan topik umum sehari-hari menuju nilai spiritual KAC',
    englishTitle: 'Conversational Bridging',
    category: 'Kelenturan Bahasa',
    description: 'Seni menghubungkan obrolan seputar cuaca, harga sembako, kesehatan, atau pendidikan anak ke pilar pembinaan akhlak KAC secara mulus tanpa sentakan tajam.',
    formula: 'Topik Keseharian -> Nilai Ketahanan Moral -> Solusi Kebersamaan KAC',
    dos: [
      'Gunakan kata sambung: "Berbicara mengenai pendidikan anak, hal tersebut sangat berkaitan erat dengan..."',
      'Tunjukkan empati terhadap beban hidup masyarakat.',
      'Sajikan solusi KAC sebagai ikhtiar gotong royong.',
    ],
    donts: [
      'Langsung melompat ke topik dalil tanpa pengantar.',
      'Menghakimi gaya hidup atau kebiasaan warga.',
      'Terlihat seperti sedang berpidato formal.',
    ],
    rebuttalScript: '"Betul sekali bu, tantangan mendidik anak di era gawai sekarang memang membutuhkan lingkungan kawan yang positif. Itulah mengapa kami di KAC menghadirkan wadah agar anak-anak saling mendukung dalam kebaikan."',
    kpiTarget: 'Transisi percakapan berlangsung mulus tanpa resistensi audiens.',
  },
  {
    id: 7,
    title: 'Micro-Commitment Closing',
    subtitle: 'Mengunci kesepakatan kecil terukur untuk membuka pintu berikutnya',
    englishTitle: 'Stepping-Stone Agreement',
    category: 'Penutupan Silaturahmi',
    description: 'Jangan menuntut komitmen besar seketika. Kuncilah kesepakatan mikro: bertukar nomor WA, meminjamkan buku saku, atau izin menyapa kembali pekan depan.',
    formula: 'Apresiasi Sesi + Pilihan Dua Opsi Waktu + Penguncian Kontak',
    dos: [
      'Tawarkan opsi alternatif: "Apakah lebih nyaman Sabtu pagi atau Minggu sore?"',
      'Catat nomor kontak dengan ejaan yang benar.',
      'Kirimkan pesan terima kasih dalam waktu 1 jam pasca pertemuan.',
    ],
    donts: [
      'Menuntut audiens langsung mendaftar atau berikrar seketika.',
      'Meninggalkan lokasi tanpa kejelasan kontak tindak lanjut.',
      'Lupa mengirimkan pesan konfirmasi.',
    ],
    rebuttalScript: '"Sebagai awal silaturahmi kita, izinkan saya menyimpan nomor WA bapak agar saya dapat mengirimkan ringkasan 3 poin tadi. Apakah bapak lebih leluasa dihubungi saat jam santai malam?"',
    kpiTarget: 'Mendapatkan kontak dan izin follow-up pada minimal 70% kunjungan.',
  },
  {
    id: 8,
    title: 'The Tandem Relay (Kerja Sama Berpasangan)',
    subtitle: 'Sinergi pembicara utama dan pengamat lapangan dalam satu tim',
    englishTitle: 'Tandem Field Synergy',
    category: 'Taktik Tim Shaf 2',
    description: 'Komunikasi lapangan optimal dilakukan berdua: Person A bertindak sebagai lead communicator, sedangkan Person B mengamati bahasa tubuh, mencatat data AORA, dan masuk memberi penguatan di momen kunci.',
    formula: 'Lead Speaker (60%) + Observer/Penyimpul (30%) + Sinkronisasi Isyarat (10%)',
    dos: [
      'Gunakan kode isyarat halus antar rekan untuk bergantian bicara.',
      'Person B memuji poin yang disampaikan Person A untuk memperkuat bobot pesan.',
      'Saling melengkapi tanpa memotong pembicaraan rekan sendiri.',
    ],
    donts: [
      'Berdebat atau saling mengoreksi di hadapan tuan rumah.',
      'Keduanya diam serentak atau keduanya bicara bersamaan.',
      'Person B sibuk bermain ponsel sendiri.',
    ],
    rebuttalScript: '"Seperti yang barusan disampaikan rekan Ahmad, kami melihat sendiri bagaimana ketulusan warga di sini. Saya ingin menambahkan sedikit contoh nyata yang terjadi di RT sebelah..."',
    kpiTarget: 'Koordinasi tim tandem terverifikasi harmonis dan kompak 100%.',
  },
];

export const InfografisTaktikModal: React.FC<InfografisTaktikModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'poster' | 'detail' | 'checklist'>('poster');
  const [selectedTaktikId, setSelectedTaktikId] = useState<number>(1);
  const [checklist, setChecklist] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: false,
    4: true,
    5: false,
    6: true,
    7: false,
    8: false,
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

  const currentTaktik = TAKTIK_DATA.find((t) => t.id === selectedTaktikId) || TAKTIK_DATA[0];
  const toggleCheck = (id: number) => {
    setChecklist((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const completedCount = Object.values(checklist).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / TAKTIK_DATA.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative flex flex-col w-full bg-[#0d1629] border border-indigo-500/30 rounded-3xl shadow-2xl shadow-indigo-950/50 overflow-hidden max-h-[92vh] max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-indigo-500/20 bg-gradient-to-r from-[#0d1b38] via-[#102347] to-[#0d1b38]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/40 shadow-inner">
              <Zap className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-400">
                  Panduan Taktis Lapangan • Level 2 Runner (Do How)
                </span>
                <span className="text-[9px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full font-bold">
                  STAIR KPI B
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white tracking-wide">
                8 TAKTIK KOMUNIKASI LAPANGAN & PENANGANAN KEBERATAN
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
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Bagan Matriks 8 Taktik</span>
            </button>
            <button
              onClick={() => setActiveTab('detail')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'detail'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Naskah & Rebuttal Drill</span>
            </button>
            <button
              onClick={() => setActiveTab('checklist')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'checklist'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Checklist Eksekusi ({completedCount}/8)</span>
            </button>
          </div>
        </div>

        {/* Body Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
          {/* TAB 1: VISUAL POSTER MATRIX */}
          {activeTab === 'poster' && (
            <div className="space-y-6">
              {/* Interactive Vector Infographic Canvas */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0c1830] via-[#102040] to-[#0c1830] border border-indigo-500/30 shadow-xl space-y-6">
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-indigo-400">
                    Sistem Eskalasi Do How Shaf 2
                  </span>
                  <h4 className="text-xl font-black text-white">
                    PETA ALUR INTERAKSI LAPANGAN & OBJECTION HANDLING
                  </h4>
                  <p className="text-xs text-slate-300">
                    Dari detik pertama menyapa hingga menutup janji temu silaturahmi lanjutan tanpa debat.
                  </p>
                </div>

                {/* 8 Grid Visual Blocks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
                  {TAKTIK_DATA.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => {
                        setSelectedTaktikId(t.id);
                        setActiveTab('detail');
                      }}
                      className="p-4 rounded-2xl bg-[#0e1f3a] border border-indigo-500/20 hover:border-indigo-400/60 hover:bg-indigo-950/40 transition-all cursor-pointer group space-y-2.5 flex flex-col justify-between"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 text-xs font-black flex items-center justify-center font-mono">
                            0{t.id}
                          </span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300 font-mono">
                            {t.category}
                          </span>
                        </div>
                        <h5 className="font-bold text-xs text-white group-hover:text-indigo-300 transition-colors">
                          {t.title}
                        </h5>
                        <p className="text-[11px] text-slate-400 line-clamp-2">
                          {t.subtitle}
                        </p>
                      </div>
                      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-indigo-400 font-bold">
                        <span>Lihat Naskah Drill</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DETAIL DRILL & SCRIPTS */}
          {activeTab === 'detail' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Selector List */}
              <div className="lg:col-span-5 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Daftar 8 Taktik Lapangan:
                </div>
                {TAKTIK_DATA.map((t) => {
                  const isSelected = t.id === selectedTaktikId;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTaktikId(t.id)}
                      className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-indigo-500/20 border-indigo-500 text-white shadow-lg ring-1 ring-indigo-400'
                          : 'bg-[#0f1d33] border-white/5 hover:border-indigo-500/30 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 truncate">
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                          isSelected ? 'bg-indigo-500 text-white' : 'bg-white/5 text-slate-400'
                        }`}>
                          0{t.id}
                        </span>
                        <div className="truncate">
                          <div className="text-xs font-bold truncate text-white">{t.title}</div>
                          <div className="text-[10px] text-slate-400 truncate">{t.category}</div>
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-indigo-400' : 'text-slate-500'}`} />
                    </button>
                  );
                })}
              </div>

              {/* Right Detail Panel */}
              <div className="lg:col-span-7 p-6 rounded-3xl bg-[#0f213a] border border-indigo-500/30 shadow-xl space-y-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-black uppercase text-indigo-400">
                      Taktik #0{currentTaktik.id} • {currentTaktik.category}
                    </span>
                  </div>
                  <h4 className="text-lg font-black text-white">{currentTaktik.title}</h4>
                  <p className="text-xs text-slate-400">{currentTaktik.subtitle}</p>
                </div>

                {/* Formula Box */}
                <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-xs">
                  <span className="font-bold text-indigo-300 block mb-0.5">Rumus Eksekusi Taktis:</span>
                  <p className="text-white font-mono font-semibold">{currentTaktik.formula}</p>
                </div>

                {/* Rebuttal Script Callout */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 text-xs space-y-1.5">
                  <div className="flex items-center space-x-2 font-bold text-amber-400">
                    <Sparkles className="w-4 h-4" />
                    <span>Contoh Naskah Rebuttal Praktik Nyata:</span>
                  </div>
                  <p className="text-slate-200 italic leading-relaxed text-sm">
                    {currentTaktik.rebuttalScript}
                  </p>
                </div>

                {/* Do's and Don'ts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-1.5">
                    <div className="font-bold text-emerald-400 flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Kaidah Sukses (Do's)</span>
                    </div>
                    <ul className="space-y-1 text-slate-300">
                      {currentTaktik.dos.map((d, i) => (
                        <li key={i} className="flex items-start space-x-1.5">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-3 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-1.5">
                    <div className="font-bold text-rose-400 flex items-center space-x-1">
                      <X className="w-3.5 h-3.5" />
                      <span>Hindari Kesalahan (Don'ts)</span>
                    </div>
                    <ul className="space-y-1 text-slate-300">
                      {currentTaktik.donts.map((d, i) => (
                        <li key={i} className="flex items-start space-x-1.5">
                          <span className="text-rose-400 font-bold">•</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-xs flex items-center space-x-2">
                  <Target className="w-4 h-4 text-indigo-400 shrink-0" />
                  <div>
                    <strong className="text-indigo-300">Target KPI B: </strong>
                    <span className="text-slate-300">{currentTaktik.kpiTarget}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CHECKLIST EKSEKUSI */}
          {activeTab === 'checklist' && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="p-5 rounded-3xl bg-gradient-to-r from-indigo-950/60 to-purple-950/40 border border-indigo-500/30 flex items-center justify-between">
                <div>
                  <h4 className="text-base font-black text-white">
                    Checklist Kesiapan Taktis Lapangan Hari Ini
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Pastikan taktik ini dikuasai sebelum turun ke titik sasaran silaturahmi shaf 2.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-indigo-400 font-mono">{progressPercent}%</span>
                  <span className="block text-[10px] text-slate-400 uppercase font-bold">{completedCount}/8 Tuntas</span>
                </div>
              </div>

              <div className="space-y-2.5">
                {TAKTIK_DATA.map((t) => {
                  const isChecked = !!checklist[t.id];
                  return (
                    <div
                      key={t.id}
                      onClick={() => toggleCheck(t.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isChecked
                          ? 'bg-indigo-950/40 border-indigo-500/50 text-white'
                          : 'bg-[#0f1e33] border-white/5 hover:border-indigo-500/30 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3.5">
                        <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
                          isChecked ? 'bg-indigo-500 border-indigo-400 text-white' : 'bg-white/5 border-white/20 text-transparent'
                        }`}>
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">{t.title}</div>
                          <p className="text-xs text-slate-400 mt-0.5">{t.subtitle}</p>
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
        <div className="px-5 py-3 border-t border-indigo-500/20 bg-[#0a1222] flex items-center justify-between text-xs text-slate-400">
          <span>Stair KPI B • Kurikulum Taktis Eksekutor Lapangan</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs"
          >
            Selesai Menyimak
          </button>
        </div>
      </div>
    </div>
  );
};
