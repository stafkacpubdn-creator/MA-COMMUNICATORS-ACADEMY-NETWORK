import { DimensionScore, RecommendationItem, DayHabit21 } from '../types';

export interface ReflectiveQuestion {
  id: number;
  dimensionId: 'M1' | 'M2' | 'M3' | 'M4' | 'M5';
  dimensionTitle: string;
  statement: string;
}

export const MASTER_ASSESSMENT_OPTIONS = [
  { key: 'a', label: 'Saya hampir tidak mengalami hambatan strategis ini', score: 0, desc: 'Kepemimpinan komunikasi telah teruji dan berjalan alami' },
  { key: 'b', label: 'Sesekali mengalami kendala pada situasi kompleks', score: 1, desc: 'Dapat menyelesaikan dengan pertimbangan matang' },
  { key: 'c', label: 'Cukup sering menghadapi kesulitan', score: 2, desc: 'Memerlukan supervisi dewan pembina KAC' },
  { key: 'd', label: 'Hambatan signifikan dalam peran Show How', score: 3, desc: 'Tantangan utama dalam memimpin dan melatih kader' },
  { key: 'e', label: 'Belum pernah memegang tanggung jawab ini', score: null, desc: 'Tandai untuk modul pembekalan khusus' },
];

export const MASTER_DIMENSIONS_INFO: Record<'M1' | 'M2' | 'M3' | 'M4' | 'M5', { title: string; desc: string }> = {
  M1: {
    title: 'Visi Komunikasi & Narasi Publik Skala Besar',
    desc: 'Kemampuan merumuskan narasi pemersatu, orkestrasi pesan massal, dan menjaga keselarasan visi KAC di tingkat regional.',
  },
  M2: {
    title: 'Mentoring & Coaching Kader Komunikator Yunior',
    desc: 'Keahlian mendiagnosis hambatan mental kader (Newbie/Runner), memberikan umpan balik konstruktif, dan menumbuhkan kemandirian.',
  },
  M3: {
    title: 'Manajemen Krisis Komunikasi & Resolusi Konflik',
    desc: 'Ketenangan dan ketegasan saat menangani mispersepsi publik, meredam polarisasi, dan melakukan framing rekonsiliatif.',
  },
  M4: {
    title: 'Diplomasi, Lobi & Kolaborasi Lintas Tokoh/Lembaga',
    desc: 'Membangun aliansi strategis dengan pimpinan masyarakat, birokrasi, dan lembaga kemasyarakatan dengan integritas tinggi.',
  },
  M5: {
    title: 'Audit Komunikasi & Penjaminan Mutu IPOOI',
    desc: 'Menganalisis efektivitas kurikulum dan rantai dampak Input-Process-Output-Outcome-Impact secara obyektif dan berbasis data.',
  },
};

export const MASTER_QUESTIONS_50: ReflectiveQuestion[] = [
  // M1: Visi Komunikasi & Narasi Publik Skala Besar (1 - 10)
  { id: 1, dimensionId: 'M1', dimensionTitle: 'Visi Komunikasi & Narasi Publik Skala Besar', statement: 'Saya kesulitan menyederhanakan visi besar KAC menjadi pesan publik yang menggetarkan hati massa.' },
  { id: 2, dimensionId: 'M1', dimensionTitle: 'Visi Komunikasi & Narasi Publik Skala Besar', statement: 'Ketika berbicara di depan forum besar, saya cenderung terjebak pada detail teknis daripada inspirasi nilai luhur.' },
  { id: 3, dimensionId: 'M1', dimensionTitle: 'Visi Komunikasi & Narasi Publik Skala Besar', statement: 'Saya belum terbiasa merancang strategi kampanye komunikasi terpadu untuk target audiensi multi-generasi.' },
  { id: 4, dimensionId: 'M1', dimensionTitle: 'Visi Komunikasi & Narasi Publik Skala Besar', statement: 'Saya merasa kewalahan menjaga konsistensi nada bicara (tone of voice) gerakan di berbagai kanal publik.' },
  { id: 5, dimensionId: 'M1', dimensionTitle: 'Visi Komunikasi & Narasi Publik Skala Besar', statement: 'Saya kesulitan menyusun narasi alternatif yang mampu menyaingi narasi apatisme atau pesimisme sosial di masyarakat.' },
  { id: 6, dimensionId: 'M1', dimensionTitle: 'Visi Komunikasi & Narasi Publik Skala Besar', statement: 'Saya sering kesulitan membaca tren psikologi massa dan isu strategis yang sedang hangat diperbincangkan publik.' },
  { id: 7, dimensionId: 'M1', dimensionTitle: 'Visi Komunikasi & Narasi Publik Skala Besar', statement: 'Saya belum yakin mampu merumuskan Manifesto Komunikasi Wilayah yang dapat dipedomani oleh seluruh unit ka01-ka14.' },
  { id: 8, dimensionId: 'M1', dimensionTitle: 'Visi Komunikasi & Narasi Publik Skala Besar', statement: 'Dalam pidato resmi, saya merasa belum mampu memadukan antara kekuatan retorika dengan bukti kerja nyata di lapangan.' },
  { id: 9, dimensionId: 'M1', dimensionTitle: 'Visi Komunikasi & Narasi Publik Skala Besar', statement: 'Saya kesulitan menyelaraskan narasi lokal tiap shaf dengan arahan strategis kepemimpinan KAC Pusat.' },
  { id: 10, dimensionId: 'M1', dimensionTitle: 'Visi Komunikasi & Narasi Publik Skala Besar', statement: 'Saya jarang mengevaluasi dampak psikologis jangka panjang dari sebuah kampanye komunikasi massal.' },

  // M2: Mentoring & Coaching Kader Komunikator Yunior (11 - 20)
  { id: 11, dimensionId: 'M2', dimensionTitle: 'Mentoring & Coaching Kader Komunikator Yunior', statement: 'Saya kesulitan mendiagnosis apakah kegagalan seorang kader baru disebabkan oleh mental block atau minimnya teknik.' },
  { id: 12, dimensionId: 'M2', dimensionTitle: 'Mentoring & Coaching Kader Komunikator Yunior', statement: 'Dalam sesi evaluasi, saya cenderung menceramahi kader daripada mengajukan pertanyaan pemicu kesadaran diri.' },
  { id: 13, dimensionId: 'M2', dimensionTitle: 'Mentoring & Coaching Kader Komunikator Yunior', statement: 'Saya merasa tidak sabar ketika kader yunior berulang kali melakukan kesalahan komunikasi yang sama di lapangan.' },
  { id: 14, dimensionId: 'M2', dimensionTitle: 'Mentoring & Coaching Kader Komunikator Yunior', statement: 'Saya kesulitan memberikan kritik korektif yang tajam tanpa meruntuhkan rasa percaya diri kader binaan.' },
  { id: 15, dimensionId: 'M2', dimensionTitle: 'Mentoring & Coaching Kader Komunikator Yunior', statement: 'Saya belum memiliki rencana kurikulum mentoring individual yang disesuaikan dengan tipe kepribadian tiap anggota.' },
  { id: 16, dimensionId: 'M2', dimensionTitle: 'Mentoring & Coaching Kader Komunikator Yunior', statement: 'Saya sering mengambil alih tugas pembicara saat kader sedang praktik daripada membiarkan mereka belajar dari proses.' },
  { id: 17, dimensionId: 'M2', dimensionTitle: 'Mentoring & Coaching Kader Komunikator Yunior', statement: 'Saya kesulitan mengukur kapan seorang kader Newbie sudah benar-benar siap mandiri naik ke tingkat Runner.' },
  { id: 18, dimensionId: 'M2', dimensionTitle: 'Mentoring & Coaching Kader Komunikator Yunior', statement: 'Saya belum terbiasa melakukan sesi debriefing pasca-tugas yang mendalam dalam suasana hangat dan suportif.' },
  { id: 19, dimensionId: 'M2', dimensionTitle: 'Mentoring & Coaching Kader Komunikator Yunior', statement: 'Saya merasa canggung ketika harus mendampingi kader yang usianya jauh lebih senior dari saya secara personal.' },
  { id: 20, dimensionId: 'M2', dimensionTitle: 'Mentoring & Coaching Kader Komunikator Yunior', statement: 'Saya kesulitan melatih kader untuk tidak bergantung pada kehadiran saya sebagai figur sentral di lapangan.' },

  // M3: Manajemen Krisis Komunikasi & Resolusi Konflik (21 - 30)
  { id: 21, dimensionId: 'M3', dimensionTitle: 'Manajemen Krisis Komunikasi & Resolusi Konflik', statement: 'Saat terjadi misinformasi atau fitnah terbuka terhadap KAC, saya terpancing untuk bereaksi emosional seketika.' },
  { id: 22, dimensionId: 'M3', dimensionTitle: 'Manajemen Krisis Komunikasi & Resolusi Konflik', statement: 'Saya bingung menentukan kapan harus merilis klarifikasi resmi dan kapan harus mendiamkan provokasi demi de-eskalasi.' },
  { id: 23, dimensionId: 'M3', dimensionTitle: 'Manajemen Krisis Komunikasi & Resolusi Konflik', statement: 'Saya kesulitan menjadi penengah netral ketika terjadi gesekan pandangan tajam antar anggota di internal shaf.' },
  { id: 24, dimensionId: 'M3', dimensionTitle: 'Manajemen Krisis Komunikasi & Resolusi Konflik', statement: 'Dalam situasi krisis lapangan, saya kesulitan mengondisikan seluruh anggota agar satu suara dan tidak berspekulasi liar.' },
  { id: 25, dimensionId: 'M3', dimensionTitle: 'Manajemen Krisis Komunikasi & Resolusi Konflik', statement: 'Saya belum menguasai teknik framing rekonsiliatif yang mampu mengubah perselisihan menjadi kesepakatan damai.' },
  { id: 26, dimensionId: 'M3', dimensionTitle: 'Manajemen Krisis Komunikasi & Resolusi Konflik', statement: 'Saya merasa tertekan saat harus berhadapan dengan wartawan, aparat, atau pemuka masyarakat yang bernada intimidatif.' },
  { id: 27, dimensionId: 'M3', dimensionTitle: 'Manajemen Krisis Komunikasi & Resolusi Konflik', statement: 'Saya sering kesulitan membedakan antara fakta krisis obyektif dengan rumor berlebihan yang dibesar-besarkan pihak luar.' },
  { id: 28, dimensionId: 'M3', dimensionTitle: 'Manajemen Krisis Komunikasi & Resolusi Konflik', statement: 'Saya belum memiliki protokol darurat penanganan krisis narasi yang siap diaktifkan dalam waktu 1 jam.' },
  { id: 29, dimensionId: 'M3', dimensionTitle: 'Manajemen Krisis Komunikasi & Resolusi Konflik', statement: 'Pasca krisis reda, saya sering melupakan proses pemulihan trauma komunikasi dan rehabilitasi citra gerakan.' },
  { id: 30, dimensionId: 'M3', dimensionTitle: 'Manajemen Krisis Komunikasi & Resolusi Konflik', statement: 'Saya kesulitan menyampaikan permohonan maaf secara terhormat jika memang terdapat kekeliruan teknis dari pihak internal.' },

  // M4: Diplomasi, Lobi & Kolaborasi Lintas Tokoh/Lembaga (31 - 40)
  { id: 31, dimensionId: 'M4', dimensionTitle: 'Diplomasi, Lobi & Kolaborasi Lintas Tokoh/Lembaga', statement: 'Saya merasa rendah diri atau canggung saat harus duduk sejajar dengan tokoh masyarakat, akademisi, atau pejabat tinggi.' },
  { id: 32, dimensionId: 'M4', dimensionTitle: 'Diplomasi, Lobi & Kolaborasi Lintas Tokoh/Lembaga', statement: 'Saya kesulitan menemukan titik temu kepentingan (common ground) antara misi KAC dengan agenda program pihak lain.' },
  { id: 33, dimensionId: 'M4', dimensionTitle: 'Diplomasi, Lobi & Kolaborasi Lintas Tokoh/Lembaga', statement: 'Bahasa diplomasi saya terkadang terlalu kaku dan kurang luwes dalam membangun lobi informal di luar meja rapat.' },
  { id: 34, dimensionId: 'M4', dimensionTitle: 'Diplomasi, Lobi & Kolaborasi Lintas Tokoh/Lembaga', statement: 'Saya belum menguasai etika protokoler dan tata krama komunikasi resmi di tingkat kelembagaan formal.' },
  { id: 35, dimensionId: 'M4', dimensionTitle: 'Diplomasi, Lobi & Kolaborasi Lintas Tokoh/Lembaga', statement: 'Dalam negosiasi kemitraan, saya sering terburu-buru menyepakati komitmen tanpa menimbang risiko jangka panjang.' },
  { id: 36, dimensionId: 'M4', dimensionTitle: 'Diplomasi, Lobi & Kolaborasi Lintas Tokoh/Lembaga', statement: 'Saya kesulitan memelihara jejaring hubungan strategis dengan para tokoh kunci saat tidak ada kepentingan mendesak.' },
  { id: 37, dimensionId: 'M4', dimensionTitle: 'Diplomasi, Lobi & Kolaborasi Lintas Tokoh/Lembaga', statement: 'Saya merasa bingung bagaimana menjaga independensi nilai KAC saat harus bermitra dengan pihak yang memiliki orientasi berbeda.' },
  { id: 38, dimensionId: 'M4', dimensionTitle: 'Diplomasi, Lobi & Kolaborasi Lintas Tokoh/Lembaga', statement: 'Saya kesulitan menyusun nota kesepahaman (MoU) atau proposal kerja sama pembinaan yang berbobot dan profesional.' },
  { id: 39, dimensionId: 'M4', dimensionTitle: 'Diplomasi, Lobi & Kolaborasi Lintas Tokoh/Lembaga', statement: 'Saya belum terbiasa melakukan diplomasi budaya yang menghargai adat istiadat setempat tanpa melanggar syariat.' },
  { id: 40, dimensionId: 'M4', dimensionTitle: 'Diplomasi, Lobi & Kolaborasi Lintas Tokoh/Lembaga', statement: 'Saya sering kesulitan meyakinkan tokoh sentral agar bersedia membuka pintu bagi kader-kader muda KAC di wilayahnya.' },

  // M5: Audit Komunikasi & Penjaminan Mutu IPOOI (41 - 50)
  { id: 41, dimensionId: 'M5', dimensionTitle: 'Audit Komunikasi & Penjaminan Mutu IPOOI', statement: 'Saya kesulitan membaca data analitik IPOOI dan menerjemahkannya menjadi instruksi operasional yang konkret.' },
  { id: 42, dimensionId: 'M5', dimensionTitle: 'Audit Komunikasi & Penjaminan Mutu IPOOI', statement: 'Saya sering hanya fokus pada angka Input (jam belajar) tanpa menimbang apakah Output sudah bertransformasi menjadi Outcome.' },
  { id: 43, dimensionId: 'M5', dimensionTitle: 'Audit Komunikasi & Penjaminan Mutu IPOOI', statement: 'Saya kesulitan mengidentifikasi titik kebocoran efektivitas pengabaran pada unit shaf yang performanya tertinggal.' },
  { id: 44, dimensionId: 'M5', dimensionTitle: 'Audit Komunikasi & Penjaminan Mutu IPOOI', statement: 'Saya belum memiliki metodologi audit berkala untuk menilai kelayakan retensi materi pembinaan di lapangan.' },
  { id: 45, dimensionId: 'M5', dimensionTitle: 'Audit Komunikasi & Penjaminan Mutu IPOOI', statement: 'Saya merasa enggan melakukan teguran berbasis data kepada pimpinan unit yang tidak memenuhi standar Roof KPI C.' },
  { id: 46, dimensionId: 'M5', dimensionTitle: 'Audit Komunikasi & Penjaminan Mutu IPOOI', statement: 'Saya kesulitan menyusun instrumen evaluasi kualitatif yang mengukur kedewasaan akhlak dan integritas komunikator.' },
  { id: 47, dimensionId: 'M5', dimensionTitle: 'Audit Komunikasi & Penjaminan Mutu IPOOI', statement: 'Saya belum mampu memproyeksikan indeks dampak KAC (Impact Index) untuk 6 bulan ke depan secara ilmiah.' },
  { id: 48, dimensionId: 'M5', dimensionTitle: 'Audit Komunikasi & Penjaminan Mutu IPOOI', statement: 'Saya jarang melakukan kalibrasi instrumen penilaian antar dewan penguji agar standar kelulusan adil dan seragam.' },
  { id: 49, dimensionId: 'M5', dimensionTitle: 'Audit Komunikasi & Penjaminan Mutu IPOOI', statement: 'Saya kesulitan menyajikan laporan eksekutif berkala yang ringkas, bernas, dan meyakinkan dewan pimpinan pusat.' },
  { id: 50, dimensionId: 'M5', dimensionTitle: 'Audit Komunikasi & Penjaminan Mutu IPOOI', statement: 'Saya sering menunda pembaruan kurikulum pelatihan meskipun data lapangan menunjukkan pola audiens telah bergeser.' },
];

export function calculateMasterScores(answers: Record<number, string>): {
  dimensionScores: Record<string, DimensionScore>;
  overallReadiness: number;
  recommendations: RecommendationItem[];
  personalMessage: string;
  firstStep: string;
} {
  const dimensions: ('M1' | 'M2' | 'M3' | 'M4' | 'M5')[] = ['M1', 'M2', 'M3', 'M4', 'M5'];
  const dimensionScores: Record<string, DimensionScore> = {};

  dimensions.forEach((dim) => {
    const dimQuestions = MASTER_QUESTIONS_50.filter((q) => q.dimensionId === dim);
    let validCount = 0;
    let sumScore = 0;

    dimQuestions.forEach((q) => {
      const ansKey = answers[q.id];
      const opt = MASTER_ASSESSMENT_OPTIONS.find((o) => o.key === ansKey);
      if (opt && opt.score !== null) {
        sumScore += opt.score;
        validCount += 1;
      }
    });

    if (validCount < 7) {
      dimensionScores[dim] = {
        dimensionId: dim,
        title: MASTER_DIMENSIONS_INFO[dim].title,
        score: Math.round(validCount > 0 ? (sumScore / validCount) * 10 : 0),
        validCount,
        status: 'belum_cukup',
        description: 'Data strategis belum cukup untuk disimpulkan',
        suggestedAction: 'Lengkapi seluruh kuesioner asesmen kepemimpinan Show How.',
      };
    } else {
      const avg = sumScore / validCount;
      const finalScore = Math.min(30, Math.round(avg * 10));
      let status: 'rendah' | 'sedang' | 'tinggi' = 'rendah';
      let description = 'Kapasitas strategis terverifikasi sangat matang & berwibawa';
      let suggestedAction = 'Pertahankan keteladanan; pimpin kaderisasi regional.';

      if (finalScore >= 20) {
        status = 'tinggi';
        description = 'Menghadapi hambatan signifikan dalam kepemimpinan komunikasi dan orkestrasi skala luas';
        suggestedAction = 'Jadikan pendampingan krisis dan mentoring intensif sebagai prioritas utama.';
      } else if (finalScore >= 10) {
        status = 'sedang';
        description = 'Kapasitas kepemimpinan baik namun perlu penguatan pada resolusi krisis dan diplomasi tingkat tinggi';
        suggestedAction = 'Latih simulasi mediasi konflik dan orkestrasi pesan massal.';
      }

      dimensionScores[dim] = {
        dimensionId: dim,
        title: MASTER_DIMENSIONS_INFO[dim].title,
        score: finalScore,
        validCount,
        status,
        description,
        suggestedAction,
      };
    }
  });

  const validDims = Object.values(dimensionScores).filter((d) => d.status !== 'belum_cukup');
  const avgBarrier = validDims.length > 0 ? validDims.reduce((acc, d) => acc + d.score, 0) / validDims.length : 12;
  const overallReadiness = Math.max(50, Math.min(99, Math.round(100 - (avgBarrier / 30) * 45)));

  const recommendations: RecommendationItem[] = [];

  if (dimensionScores['M1']?.score >= 15) {
    recommendations.push({
      pattern: 'Kesulitan menyusun narasi publik yang menyatukan dan menginspirasi massa',
      hypothesis: 'Arsitektur narasi strategis & public rhetoric',
      firstPractice: 'Rancang Manifesto Komunikasi Wilayah dalam 5 poin bernas berorientasi solusi persatuan.',
    });
  }
  if (dimensionScores['M2']?.score >= 15) {
    recommendations.push({
      pattern: 'Cenderung mendikte daripada meng-coaching kader komunikator baru',
      hypothesis: 'Keterampilan Mentoring Transformasional & Active Questioning',
      firstPractice: 'Gunakan kerangka GROW (Goal, Reality, Options, Will) dalam sesi mentoring mingguan.',
    });
  }
  if (dimensionScores['M3']?.score >= 15) {
    recommendations.push({
      pattern: 'Reaktif dan gugup saat menghadapi krisis misinformasi di ranah publik',
      hypothesis: 'Protokol mitigasi krisis & de-eskalasi narasi',
      firstPractice: 'Susun Standard Operating Procedure (SOP) 60 menit respon krisis komunikasi wilayah.',
    });
  }
  if (dimensionScores['M4']?.score >= 15) {
    recommendations.push({
      pattern: 'Canggung dalam diplomasi kelembagaan dan lobi tokoh masyarakat kunci',
      hypothesis: 'Keterampilan diplomasi strategis & stakeholder engagement',
      firstPractice: 'Susun peta tokoh pengaruh (Stakeholder Power-Interest Matrix) di wilayah tugas Anda.',
    });
  }
  if (dimensionScores['M5']?.score >= 15) {
    recommendations.push({
      pattern: 'Kurang terbiasa mengaudit data IPOOI untuk perbaikan mutu kader',
      hypothesis: 'Kompetensi Audit Kualitas Komunikasi & Metrik Dampak',
      firstPractice: 'Lakukan audit berkala rasio keberhasilan pengabaran-pembinaan di 3 unit ka binaan Anda.',
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      pattern: 'Kematangan kepemimpinan komunikasi berada pada level teladan paripurna',
      hypothesis: 'Peran Master Fasilitator Utama & Dewan Kehormatan',
      firstPractice: 'Bimbing calon Master baru dan wakili KAC dalam forum dialog lintas organisasi strategis.',
    });
  }

  const personalMessage =
    'Selamat! Evaluasi Show How Anda membuktikan kedewasaan seorang komunikator tingkat Master. Anda tidak sekadar terampil berbicara dan tangguh di lapangan, tetapi mampu menjadi arsitek narasi, mengawal ketenangan di tengah krisis, dan melahirkan kader-kader komunikator masa depan.';

  const firstStep =
    'Langkah Strategis Master: Jalankan Program Kepemimpinan & Mentoring 21 Hari (Delta Role Play) untuk membina 2 kader baru dan mengaudit sistem mutu komunikasi shaf secara berkelanjutan.';

  return {
    dimensionScores,
    overallReadiness,
    recommendations,
    personalMessage,
    firstStep,
  };
}

// 21-Day Delta Role Play Habit Program (Strategic Leadership & Mentoring Escalation)
export const INITIAL_MASTER_21_DAYS_HABIT: DayHabit21[] = [
  {
    day: 1,
    focus: 'Pemetaan Visi Kepemimpinan',
    lightTask: 'Tuliskan visi komunikasi kepemimpinan Anda untuk 1 tahun ke depan dan diagnosis kesiapan unit shaf 2 binaan Anda.',
    proofType: 'Dokumen Visi Komunikasi 1 Lembar',
    status: 'selesai',
    note: 'Menyusun visi "Shaf 2 Berdaya, Berempati, dan Berintegritas" dengan sasaran 80% kader lulus level Runner.',
  },
  {
    day: 2,
    focus: 'Audit Narasi & Framing Wilayah',
    lightTask: 'Tinjau materi pengabaran yang beredar di wilayah tugas Anda; pastikan tidak ada redaksi yang rawan disalahpahami.',
    proofType: 'Laporan koreksi narasi publik',
    status: 'selesai',
    note: 'Memperbaiki 2 terminologi yang berpotensi memicu debat kusir di media sosial lokal.',
  },
  {
    day: 3,
    focus: 'Sesi Coaching Kader Yunior 1',
    lightTask: 'Lakukan sesi coaching 30 menit dengan 1 anggota Newbie menggunakan metode mendengarkan aktif dan pertanyaan terbuka.',
    proofType: 'Lembar catatan GROW coaching',
    status: 'selesai',
    note: 'Mendampingi kader ka04 yang mengalami demam panggung; merumuskan latihan 3 kalimat harian.',
  },
  {
    day: 4,
    focus: 'Simulasi Mitigasi Krisis (Drill 1)',
    lightTask: 'Rancang pernyataan pers atau siaran klarifikasi 200 kata untuk merespons rumor fitnah yang mencemarkan nama baik gerakan.',
    proofType: 'Draf siaran pers rekonsiliatif',
    status: 'selesai',
    note: 'Pernyataan menyejukkan dengan 3 fakta otentik dan ajakan silaturahmi terbuka.',
  },
  {
    day: 5,
    focus: 'Diplomasi Tokoh Masyarakat',
    lightTask: 'Lakukan audiensi informal dengan 1 tokoh pemuka masyarakat untuk membangun silaturahmi tanpa pamrih politis.',
    proofType: 'Catatan poin dialog kesepahaman',
    status: 'selesai',
    note: 'Bertemu ketua RW dan tokoh agama setempat; menyepakati program kerja bakti pemuda bersama.',
  },
  {
    day: 6,
    focus: 'Audit Metrik IPOOI Mingguan',
    lightTask: 'Bandingkan data Input-Process-Output 3 unit shaf; rumuskan 1 intervensi taktis bagi unit yang mengalami perlambatan.',
    proofType: 'Lembar audit IPOOI regional',
    status: 'selesai',
    note: 'Menemukan unit ka08 terkendala waktu kuis; menjadwalkan klinik latihan pendampingan.',
  },
  {
    day: 7,
    focus: 'Refleksi Kepemimpinan Minggu 1',
    lightTask: 'Evaluasi dampak keteladanan Anda: apakah kader binaan semakin mandiri atau justru semakin bergantung pada Anda.',
    proofType: 'Refleksi Show How mingguan',
    status: 'selesai',
    note: 'Kader binaan mulai berani memimpin forum tanpa kehadiran fisik saya; tanda delegasi berhasil.',
  },
  {
    day: 8,
    focus: 'Kaderisasi Berjenjang: Delegasi Tugas',
    lightTask: 'Beri mandat kepada 1 anggota Runner untuk memimpin simulasi role play di unitnya dan amati dari kejauhan.',
    proofType: 'Form observasi delegasi',
    status: 'belum_dilakukan',
    note: '',
  },
  {
    day: 9,
    focus: 'Mediasi Konflik Internal',
    lightTask: 'Fasilitasi dialog antara dua anggota yang berbeda pendapat mengenai strategi pendekatan lapangan.',
    proofType: 'Kesepakatan bersama mediasi',
    status: 'belum_dilakukan',
    note: '',
  },
  {
    day: 10,
    focus: 'Desain Kampanye Komunikasi Terpadu',
    lightTask: 'Rancang kampanye silaturahmi serentak untuk 5 unit shaf dengan tema kepedulian sosial kemasyarakatan.',
    proofType: 'Proposal kampanye terpadu',
    status: 'belum_dilakukan',
    note: '',
  },
  {
    day: 11,
    focus: 'Uji Mental Master: Dialog Kritis',
    lightTask: 'Lakukan simulasi debat kehormatan di hadapan dewan penilai KAC untuk menguji ketenangan saat dipojokkan.',
    proofType: 'Transkrip de-eskalasi narasi',
    status: 'belum_dilakukan',
    note: '',
  },
  {
    day: 12,
    focus: 'Coaching Berkelanjutan Kader 2',
    lightTask: 'Bimbing kader kedua dalam membedah matriks AORA lapangan dan cara menyusun rencana aksi terukur.',
    proofType: 'Lembar verifikasi AORA kader',
    status: 'belum_dilakukan',
    note: '',
  },
  {
    day: 13,
    focus: 'Penyusunan Modul Praktis Mandiri',
    lightTask: 'Tuliskan satu modul suplemen berbasis kearifan lokal untuk memperkaya khazanah kurikulum KAC.',
    proofType: 'Draf modul suplemen 2 halaman',
    status: 'belum_dilakukan',
    note: '',
  },
  {
    day: 14,
    focus: 'Evaluasi Kepemimpinan Minggu 2',
    lightTask: 'Ukur pertumbuhan indeks kepercayaan masyarakat terhadap unit-unit shaf di bawah supervisi Anda.',
    proofType: 'Kalkulasi indeks trust publik',
    status: 'belum_dilakukan',
    note: '',
  },
  {
    day: 15,
    focus: 'Jejaring Lintas Lembaga',
    lightTask: 'Buka komunikasi resmi dengan lembaga sosial atau kemanusiaan mitra untuk kolaborasi program pembinaan.',
    proofType: 'Surat inisiasi kolaborasi',
    status: 'belum_dilakukan',
    note: '',
  },
  {
    day: 16,
    focus: 'Pengawalan Roof KPI C Shaf 2',
    lightTask: 'Pastikan seluruh anggota di wilayah Anda menyelesaikan kewajiban tracker harian dan asesmen bertingkat.',
    proofType: 'Rekapitulasi kepatuhan KPI',
    status: 'belum_dilakukan',
    note: '',
  },
  {
    day: 17,
    focus: 'Klinik Retorika & Vokal Master',
    lightTask: 'Berikan masterclass vokal dan bahasa tubuh berwibawa bagi para perwakilan shaf 2.',
    proofType: 'Dokumentasi masterclass',
    status: 'belum_dilakukan',
    note: '',
  },
  {
    day: 18,
    focus: 'Simulasi Krisis Multi-Pihak',
    lightTask: 'Pecahkan studi kasus konflik horizontal di masyarakat dengan skenario penanganan terpadu 3 tahap.',
    proofType: 'Solusi tertulis penanganan krisis',
    status: 'belum_dilakukan',
    note: '',
  },
  {
    day: 19,
    focus: 'Validasi Kemandirian Kader Binaan',
    lightTask: 'Uji dua kader yang Anda bimbing dalam ujian lapangan nyata tanpa bantuan sedikit pun dari Anda.',
    proofType: 'Lembar kelulusan kader mandiri',
    status: 'belum_dilakukan',
    note: '',
  },
  {
    day: 20,
    focus: 'Penyusunan Rapor Dampak IPOOI',
    lightTask: 'Kompilasikan capaian Outcome dan Impact dari seluruh unit binaan Anda untuk diserahkan ke KAC Pusat.',
    proofType: 'Laporan eksekutif IPOOI regional',
    status: 'belum_dilakukan',
    note: '',
  },
  {
    day: 21,
    focus: 'Sumpah Master Communicator & Puncak Show How',
    lightTask: 'Ucapkan ikrar kesetiaan pada integritas korps komunikator dan resmikan penyerahan estafet kaderisasi ke generasi penerus.',
    proofType: 'Piagam Master Communicator',
    status: 'belum_dilakukan',
    note: '',
  },
];
