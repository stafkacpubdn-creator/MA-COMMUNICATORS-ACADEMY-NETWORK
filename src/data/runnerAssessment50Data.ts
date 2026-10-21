import { DimensionScore, RecommendationItem, DayHabit21 } from '../types';

export interface ReflectiveQuestion {
  id: number;
  dimensionId: 'R1' | 'R2' | 'R3' | 'R4' | 'R5';
  dimensionTitle: string;
  statement: string;
}

export const RUNNER_ASSESSMENT_OPTIONS = [
  { key: 'a', label: 'Saya hampir tidak mengalami kendala ini', score: 0, desc: 'Keterampilan taktis sudah menjadi refleks spontan' },
  { key: 'b', label: 'Sesekali mengalami kendala', score: 1, desc: 'Terkadang ragu pada kondisi lapangan dinamis' },
  { key: 'c', label: 'Cukup sering mengalami kendala', score: 2, desc: 'Membutuhkan waktu adaptasi dan latihan lebih' },
  { key: 'd', label: 'Terjadi pada sebagian besar interaksi lapangan', score: 3, desc: 'Hambatan utama dalam eksekusi Do How' },
  { key: 'e', label: 'Belum pernah mengalami situasi ini', score: null, desc: 'Tandai untuk simulasi laboratorium' },
];

export const RUNNER_DIMENSIONS_INFO: Record<'R1' | 'R2' | 'R3' | 'R4' | 'R5', { title: string; desc: string }> = {
  R1: {
    title: 'Pemetaan Karakter Audiens & Lingkungan',
    desc: 'Kemampuan membaca situasi sosial, profil lawan bicara dalam hitungan menit, dan mendeteksi resistensi tersembunyi.',
  },
  R2: {
    title: 'Eksekusi Pembuka & Ice Breaking Spontan',
    desc: 'Keterampilan mencairkan kebekuan dalam 30 detik pertama dengan narasi relevan tanpa terlihat canggung atau formalitas kaku.',
  },
  R3: {
    title: 'Objection Handling & Rebuttal di Bawah Tekanan',
    desc: 'Ketangkasan menanggapi bantahan, prasangka, atau kritik pedas dengan kepala dingin, teknik pivot, dan nada menenangkan.',
  },
  R4: {
    title: 'Artikulasi Solutif & Framing Dialogis Dua Arah',
    desc: 'Menawarkan solusi konkret KAC tanpa menggurui, mengarahkan pembicaraan dari perdebatan buntu menuju kolaborasi konstruktif.',
  },
  R5: {
    title: 'Ketahanan Menghadapi Penolakan & Konsistensi Follow-Up',
    desc: 'Resiliensi mental saat menghadapi penolakan mentah-mentah, pencatatan log interaksi, dan follow-up silaturahmi berkala.',
  },
};

export const RUNNER_QUESTIONS_50: ReflectiveQuestion[] = [
  // R1: Pemetaan Karakter Audiens & Lingkungan (1 - 10)
  { id: 1, dimensionId: 'R1', dimensionTitle: 'Pemetaan Karakter Audiens & Lingkungan', statement: 'Saat tiba di lokasi baru, saya kesulitan membaca atmosfer sosial dan suasana hati calon lawan bicara.' },
  { id: 2, dimensionId: 'R1', dimensionTitle: 'Pemetaan Karakter Audiens & Lingkungan', statement: 'Saya cenderung menyamaratakan cara pendekatan ke semua orang tanpa melihat latar belakang budaya atau usia.' },
  { id: 3, dimensionId: 'R1', dimensionTitle: 'Pemetaan Karakter Audiens & Lingkungan', statement: 'Saya kesulitan menangkap tanda-tanda non-verbal ketika lawan bicara mulai merasa tidak nyaman atau terburu-buru.' },
  { id: 4, dimensionId: 'R1', dimensionTitle: 'Pemetaan Karakter Audiens & Lingkungan', statement: 'Saya bingung membedakan antara audiens yang benar-benar menolak dengan audiens yang hanya ingin menguji ketulusan kita.' },
  { id: 5, dimensionId: 'R1', dimensionTitle: 'Pemetaan Karakter Audiens & Lingkungan', statement: 'Saya sering melewatkan detail lingkungan sekitar (seperti foto keluarga, hobi, atau aktivitas) yang bisa jadi bahan obrolan hangat.' },
  { id: 6, dimensionId: 'R1', dimensionTitle: 'Pemetaan Karakter Audiens & Lingkungan', statement: 'Saya merasa tegang ketika harus berkomunikasi di wilayah yang memiliki polarisasi opini cukup tajam.' },
  { id: 7, dimensionId: 'R1', dimensionTitle: 'Pemetaan Karakter Audiens & Lingkungan', statement: 'Saya kesulitan mengidentifikasi siapa pengambil keputusan atau tokoh kunci di dalam suatu kelompok masyarakat.' },
  { id: 8, dimensionId: 'R1', dimensionTitle: 'Pemetaan Karakter Audiens & Lingkungan', statement: 'Saya jarang melakukan pra-observasi atau bertanya pada warga sekitar sebelum memulai dialog dengan target utama.' },
  { id: 9, dimensionId: 'R1', dimensionTitle: 'Pemetaan Karakter Audiens & Lingkungan', statement: 'Saya mudah kehilangan fokus ketika kondisi fisik tempat pertemuan bising atau penuh distraksi.' },
  { id: 10, dimensionId: 'R1', dimensionTitle: 'Pemetaan Karakter Audiens & Lingkungan', statement: 'Saya kesulitan menyusun hipotesis kebutuhan warga sebelum memulai pembicaraan mendalam.' },

  // R2: Eksekusi Pembuka & Ice Breaking Spontan (11 - 20)
  { id: 11, dimensionId: 'R2', dimensionTitle: 'Eksekusi Pembuka & Ice Breaking Spontan', statement: 'Kalimat sapaan pertama saya sering terdengar terlalu kaku seperti salesman atau petugas resmi.' },
  { id: 12, dimensionId: 'R2', dimensionTitle: 'Eksekusi Pembuka & Ice Breaking Spontan', statement: 'Saya memerlukan waktu lebih dari 2 menit hanya untuk mencari topik obrolan ringan yang relevan.' },
  { id: 13, dimensionId: 'R2', dimensionTitle: 'Eksekusi Pembuka & Ice Breaking Spontan', statement: 'Ketika lawan bicara hanya menjawab dengan satu kata (ya/tidak), saya langsung bingung melanjutkan pembicaraan.' },
  { id: 14, dimensionId: 'R2', dimensionTitle: 'Eksekusi Pembuka & Ice Breaking Spontan', statement: 'Saya kesulitan memuji hal positif milik lawan bicara secara tulus tanpa terkesan basa-basi berlebihan.' },
  { id: 15, dimensionId: 'R2', dimensionTitle: 'Eksekusi Pembuka & Ice Breaking Spontan', statement: 'Saya sering terburu-buru masuk ke topik inti pengabaran sebelum frekuensi emosional audiens terbuka.' },
  { id: 16, dimensionId: 'R2', dimensionTitle: 'Eksekusi Pembuka & Ice Breaking Spontan', statement: 'Bahasa tubuh saya masih kaku (tangan mengepal, berdiri tegak tanpa relaksasi) di menit-menit awal pertemuan.' },
  { id: 17, dimensionId: 'R2', dimensionTitle: 'Eksekusi Pembuka & Ice Breaking Spontan', statement: 'Saya merasa canggung memanfaatkan humor cerdas untuk meredakan kecurigaan awal lawan bicara.' },
  { id: 18, dimensionId: 'R2', dimensionTitle: 'Eksekusi Pembuka & Ice Breaking Spontan', statement: 'Ketika orang yang saya tuju sedang sibuk, saya kesulitan meminta waktu 3 menit dengan cara yang simpatik.' },
  { id: 19, dimensionId: 'R2', dimensionTitle: 'Eksekusi Pembuka & Ice Breaking Spontan', statement: 'Saya jarang menggunakan analogi lokal yang akrab dengan keseharian audiens sebagai jembatan pembuka.' },
  { id: 20, dimensionId: 'R2', dimensionTitle: 'Eksekusi Pembuka & Ice Breaking Spontan', statement: 'Saya sering lupa menanyakan nama dan kabar keluarga lawan bicara saat pertama kali berkenalan.' },

  // R3: Objection Handling & Rebuttal di Bawah Tekanan (21 - 30)
  { id: 21, dimensionId: 'R3', dimensionTitle: 'Objection Handling & Rebuttal di Bawah Tekanan', statement: 'Detak jantung saya langsung berdegup kencang dan emosi terpancing ketika audiens melontarkan kritik pedas.' },
  { id: 22, dimensionId: 'R3', dimensionTitle: 'Objection Handling & Rebuttal di Bawah Tekanan', statement: 'Saya membutuhkan waktu berpikir lebih dari 10 detik saat menghadapi penolakan langsung di lapangan.' },
  { id: 23, dimensionId: 'R3', dimensionTitle: 'Objection Handling & Rebuttal di Bawah Tekanan', statement: 'Saya cenderung mendebat kata per kata pernyataan lawan bicara daripada memvalidasi kekhawatirannya terlebih dahulu.' },
  { id: 24, dimensionId: 'R3', dimensionTitle: 'Objection Handling & Rebuttal di Bawah Tekanan', statement: 'Ketika dituduh sok suci atau memiliki agenda tersembunyi, saya defensif dan membalas dengan nada meninggi.' },
  { id: 25, dimensionId: 'R3', dimensionTitle: 'Objection Handling & Rebuttal di Bawah Tekanan', statement: 'Saya belum menguasai teknik "Feel-Felt-Found" (memahami perasaan, menceritakan pengalaman serupa, lalu menemukan solusi).' },
  { id: 26, dimensionId: 'R3', dimensionTitle: 'Objection Handling & Rebuttal di Bawah Tekanan', statement: 'Saat audiens membawa data atau berita miring, saya kesulitan meluruskannya dengan data pembanding yang tenang.' },
  { id: 27, dimensionId: 'R3', dimensionTitle: 'Objection Handling & Rebuttal di Bawah Tekanan', statement: 'Saya sering terjebak dalam perdebatan kusir panjang yang sebenarnya tidak esensial bagi misi pengabaran.' },
  { id: 28, dimensionId: 'R3', dimensionTitle: 'Objection Handling & Rebuttal di Bawah Tekanan', statement: 'Saya merasa bersalah atau menganggap diri gagal jika tidak berhasil mematahkan keraguan lawan bicara seketika.' },
  { id: 29, dimensionId: 'R3', dimensionTitle: 'Objection Handling & Rebuttal di Bawah Tekanan', statement: 'Saya kesulitan membelokkan arah pembicaraan dari topik provokatif kembali ke substansi utama KAC.' },
  { id: 30, dimensionId: 'R3', dimensionTitle: 'Objection Handling & Rebuttal di Bawah Tekanan', statement: 'Saya belum terbiasa mencatat pola bantahan baru untuk didiskusikan bersama tim evaluasi shaf 2.' },

  // R4: Artikulasi Solutif & Framing Dialogis Dua Arah (31 - 40)
  { id: 31, dimensionId: 'R4', dimensionTitle: 'Artikulasi Solutif & Framing Dialogis Dua Arah', statement: 'Penyampaian saya di lapangan seringkali mendominasi pembicaraan sehingga lawan bicara hanya menjadi pendengar pasif.' },
  { id: 32, dimensionId: 'R4', dimensionTitle: 'Artikulasi Solutif & Framing Dialogis Dua Arah', statement: 'Saya kesulitan mengaitkan ajaran KAC dengan solusi atas problem riil yang sedang dihadapi keluarga binaan.' },
  { id: 33, dimensionId: 'R4', dimensionTitle: 'Artikulasi Solutif & Framing Dialogis Dua Arah', statement: 'Pilihan kata yang saya gunakan di lapangan terkadang terlalu berbau literatur teks dan kurang membumi.' },
  { id: 34, dimensionId: 'R4', dimensionTitle: 'Artikulasi Solutif & Framing Dialogis Dua Arah', statement: 'Saya bingung merumuskan kesepakatan kecil bersama audiens di akhir sesi dialog.' },
  { id: 35, dimensionId: 'R4', dimensionTitle: 'Artikulasi Solutif & Framing Dialogis Dua Arah', statement: 'Saya kesulitan mengatur intonasi suara agar tetap berwibawa namun tetap memancarkan kelembutan dan keramahan.' },
  { id: 36, dimensionId: 'R4', dimensionTitle: 'Artikulasi Solutif & Framing Dialogis Dua Arah', statement: 'Saya sering menyampaikan solusi sebelum benar-benar mendengarkan apa akar masalah sesungguhnya.' },
  { id: 37, dimensionId: 'R4', dimensionTitle: 'Artikulasi Solutif & Framing Dialogis Dua Arah', statement: 'Saya kesulitan mengajak lawan bicara untuk berbicara jujur tentang apa yang sebenarnya mereka butuhkan.' },
  { id: 38, dimensionId: 'R4', dimensionTitle: 'Artikulasi Solutif & Framing Dialogis Dua Arah', statement: 'Saya belum terbiasa menggunakan pertanyaan terbuka berbobot seperti "Menurut pandangan Bapak, bagaimana sebaiknya...?"' },
  { id: 39, dimensionId: 'R4', dimensionTitle: 'Artikulasi Solutif & Framing Dialogis Dua Arah', statement: 'Ketika lawan bicara setuju, saya sering lupa mengunci komitmen dengan langkah tindak lanjut yang spesifik.' },
  { id: 40, dimensionId: 'R4', dimensionTitle: 'Artikulasi Solutif & Framing Dialogis Dua Arah', statement: 'Saya merasa kesulitan menyampaikan naskah komprehensif KAC dalam waktu di bawah 10 menit secara runut.' },

  // R5: Ketahanan Menghadapi Penolakan & Konsistensi Follow-Up (41 - 50)
  { id: 41, dimensionId: 'R5', dimensionTitle: 'Ketahanan Menghadapi Penolakan & Konsistensi Follow-Up', statement: 'Setelah mengalami penolakan kasar di satu rumah/lokasi, semangat saya langsung anjlok untuk melanjutkan ke titik berikutnya.' },
  { id: 42, dimensionId: 'R5', dimensionTitle: 'Ketahanan Menghadapi Penolakan & Konsistensi Follow-Up', statement: 'Saya sering menunda-nunda menghubungi kembali kontak yang sebelumnya sudah menunjukkan minat awal.' },
  { id: 43, dimensionId: 'R5', dimensionTitle: 'Ketahanan Menghadapi Penolakan & Konsistensi Follow-Up', statement: 'Saya tidak memiliki catatan sistematis (kartu kendali) mengenai riwayat dialog dan tanggal follow-up yang rapi.' },
  { id: 44, dimensionId: 'R5', dimensionTitle: 'Ketahanan Menghadapi Penolakan & Konsistensi Follow-Up', statement: 'Saya mudah menyerah jika kontak binaan tidak merespons pesan WhatsApp atau panggilan telepon 2 kali berturut-turut.' },
  { id: 45, dimensionId: 'R5', dimensionTitle: 'Ketahanan Menghadapi Penolakan & Konsistensi Follow-Up', statement: 'Saya kesulitan menjaga konsistensi silaturahmi tanpa terkesan mengejar-ngejar atau memaksa audiens.' },
  { id: 46, dimensionId: 'R5', dimensionTitle: 'Ketahanan Menghadapi Penolakan & Konsistensi Follow-Up', statement: 'Saya merasa cemas saat harus melakukan kunjungan kedua (follow-up) tanpa membawa topik baru yang segar.' },
  { id: 47, dimensionId: 'R5', dimensionTitle: 'Ketahanan Menghadapi Penolakan & Konsistensi Follow-Up', statement: 'Saya sering lupa memperbarui informasi kendala lapangan ke koordinator ka atau aplikasi.' },
  { id: 48, dimensionId: 'R5', dimensionTitle: 'Ketahanan Menghadapi Penolakan & Konsistensi Follow-Up', statement: 'Saya kesulitan menjaga stamina fisik dan mental ketika harus melakukan simulasi lapangan seharian penuh.' },
  { id: 49, dimensionId: 'R5', dimensionTitle: 'Ketahanan Menghadapi Penolakan & Konsistensi Follow-Up', statement: 'Saya belum memiliki rutinitas dekompresi psikologis yang sehat setelah menyelesaikan interaksi yang melelahkan.' },
  { id: 50, dimensionId: 'R5', dimensionTitle: 'Ketahanan Menghadapi Penolakan & Konsistensi Follow-Up', statement: 'Saya menganggap kontak yang belum membuka pintu sebagai kegagalan permanen daripada bibit masa depan.' },
];

export function calculateRunnerScores(answers: Record<number, string>): {
  dimensionScores: Record<string, DimensionScore>;
  overallReadiness: number;
  recommendations: RecommendationItem[];
  personalMessage: string;
  firstStep: string;
} {
  const dimensions: ('R1' | 'R2' | 'R3' | 'R4' | 'R5')[] = ['R1', 'R2', 'R3', 'R4', 'R5'];
  const dimensionScores: Record<string, DimensionScore> = {};

  dimensions.forEach((dim) => {
    const dimQuestions = RUNNER_QUESTIONS_50.filter((q) => q.dimensionId === dim);
    let validCount = 0;
    let sumScore = 0;

    dimQuestions.forEach((q) => {
      const ansKey = answers[q.id];
      const opt = RUNNER_ASSESSMENT_OPTIONS.find((o) => o.key === ansKey);
      if (opt && opt.score !== null) {
        sumScore += opt.score;
        validCount += 1;
      }
    });

    if (validCount < 7) {
      dimensionScores[dim] = {
        dimensionId: dim,
        title: RUNNER_DIMENSIONS_INFO[dim].title,
        score: Math.round(validCount > 0 ? (sumScore / validCount) * 10 : 0),
        validCount,
        status: 'belum_cukup',
        description: 'Data taktis belum cukup untuk disimpulkan',
        suggestedAction: 'Lengkapi seluruh simulasi kasus taktis lapangan.',
      };
    } else {
      const avg = sumScore / validCount;
      const finalScore = Math.min(30, Math.round(avg * 10));
      let status: 'rendah' | 'sedang' | 'tinggi' = 'rendah';
      let description = 'Taktik lapangan sangat matang & spontan';
      let suggestedAction = 'Pertahankan ketangkasan dan bimbing rekan tandem Anda.';

      if (finalScore >= 20) {
        status = 'tinggi';
        description = 'Sering mengalami kebuntuan saat berhadapan langsung dengan penolakan';
        suggestedAction = 'Prioritaskan role-play simulasi penolakan 5 detik setiap hari.';
      } else if (finalScore >= 10) {
        status = 'sedang';
        description = 'Keterampilan taktis cukup baik namun masih memerlukan stabilitas di bawah tekanan';
        suggestedAction = 'Latih teknik pivot dan variasi pembuka dialog.';
      }

      dimensionScores[dim] = {
        dimensionId: dim,
        title: RUNNER_DIMENSIONS_INFO[dim].title,
        score: finalScore,
        validCount,
        status,
        description,
        suggestedAction,
      };
    }
  });

  const validDims = Object.values(dimensionScores).filter((d) => d.status !== 'belum_cukup');
  const avgBarrier = validDims.length > 0 ? validDims.reduce((acc, d) => acc + d.score, 0) / validDims.length : 14;
  const overallReadiness = Math.max(45, Math.min(99, Math.round(100 - (avgBarrier / 30) * 48)));

  const recommendations: RecommendationItem[] = [];

  if (dimensionScores['R1']?.score >= 15) {
    recommendations.push({
      pattern: 'Kesulitan profiling karakter dan membaca gestur resistensi audiens',
      hypothesis: 'Keterampilan observasi lapangan (Observation Sensitivity)',
      firstPractice: 'Lakukan pra-pemetaan 5 menit sebelum mengetuk pintu: amati simbol budaya dan aktivitas sekitar.',
    });
  }
  if (dimensionScores['R2']?.score >= 15) {
    recommendations.push({
      pattern: 'Pembuka dialog kaku dan canggung saat mencairkan suasana',
      hypothesis: 'Kelenturan ice-breaking dan spontanitas sapaan hangat',
      firstPractice: 'Gunakan teknik "Puji Tulus 1 Hal": apresiasi suasana kediaman atau keramahan tuan rumah dalam 20 detik pertama.',
    });
  }
  if (dimensionScores['R3']?.score >= 15) {
    recommendations.push({
      pattern: 'Emosi mudah terpancing atau bingung saat audiens melontarkan bantahan',
      hypothesis: 'Manajemen stres & teknik Objection Handling taktis',
      firstPractice: 'Terapkan jeda napas 3 detik dan metode Feel-Felt-Found: "Saya sangat memahami apa yang bapak rasakan..."',
    });
  }
  if (dimensionScores['R4']?.score >= 15) {
    recommendations.push({
      pattern: 'Terlalu mendominasi bicara dan kurang mengunci komitmen bersama',
      hypothesis: 'Keseimbangan dialog 60/40 dan penutupan solutif',
      firstPractice: 'Bicara maksimal 40% waktu, dengarkan 60% waktu, dan ajukan pertanyaan terbuka penutup.',
    });
  }
  if (dimensionScores['R5']?.score >= 15) {
    recommendations.push({
      pattern: 'Drop semangat pasca penolakan dan follow-up tidak konsisten',
      hypothesis: 'Resiliensi mental komunikator & manajemen kartu kendali',
      firstPractice: 'Terapkan aturan "Next Door Reset": anggap penolakan sebagai data statistik penguat mental.',
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      pattern: 'Ketangkasan eksekusi lapangan sudah sangat seimbang dan presisi',
      hypothesis: 'Spesialisasi situasi ekstrem & simulasi tandem',
      firstPractice: 'Ambil peran sebagai lead speaker dalam penetrasi wilayah baru bersama anggota Newbie.',
    });
  }

  const personalMessage =
    'Performa Do How Anda mencerminkan kematangan komunikator praktisi lapangan. Anda tidak lagi sekadar menghafal teori, melainkan siap membaca ritme sosial masyarakat, mengatasi bantahan dengan santun, dan menjaga daya tahan di garis depan pengabaran Shaf 2.';

  const firstStep =
    'Langkah Taktis Berikutnya: Jalankan Program Simulasi Lapangan 21 Hari (Beta Role Play) dengan fokus pada rebuttal drill 5 detik dan penutupan kesepakatan silaturahmi berkala.';

  return {
    dimensionScores,
    overallReadiness,
    recommendations,
    personalMessage,
    firstStep,
  };
}

// 21-Day Beta Role Play Habit Program (Field Practice & Tactical Escalation)
export const INITIAL_RUNNER_21_DAYS_HABIT: DayHabit21[] = [
  {
    day: 1,
    focus: 'Audit Refleks Lapangan',
    lightTask: 'Identifikasi 3 jenis penolakan yang paling sering Anda dengar saat pengabaran dan tuliskan respon spontan lama Anda.',
    proofType: 'Daftar 3 penolakan & respon lama',
    status: 'selesai',
    note: 'Penolakan 1: "Saya sibuk", Penolakan 2: "Sudah ikut kajian lain", Penolakan 3: "Belum tertarik". Respon lama terlalu kaku.',
  },
  {
    day: 2,
    focus: 'Teknik Feel-Felt-Found',
    lightTask: 'Latih respon verbal menggunakan pola Feel-Felt-Found untuk menanggapi audiens yang mengaku belum punya waktu.',
    proofType: 'Rekaman audio 60 detik',
    status: 'selesai',
    note: 'Berlatih: "Saya sangat memahami kesibukan bapak, rekan kami dulu juga merasakan hal serupa, namun setelah 15 menit mencoba..."',
  },
  {
    day: 3,
    focus: 'Ice Breaking Spontan 30 Detik',
    lightTask: 'Latih pembuka obrolan bertema kearifan lokal tanpa menyebut kata formalitas atau promosi program di detik awal.',
    proofType: 'Naskah 3 variasi pembuka',
    status: 'selesai',
    note: 'Menyusun 3 pembuka bertema lingkungan, prestasi anak sekolah, dan kerukunan warga RT.',
  },
  {
    day: 4,
    focus: 'Kontrol Vokal di Bawah Tekanan',
    lightTask: 'Rekam simulasi menjawab pertanyaan provokatif dengan menurunkan nada vokal 1 oktaf lebih tenang dan stabil.',
    proofType: 'Rekaman audio 45 detik',
    status: 'selesai',
    note: 'Artikulasi tetap lembut saat merespons isu negatif seputar inisiatif komunikasi.',
  },
  {
    day: 5,
    focus: 'Praktik Lapangan Tandem 1',
    lightTask: 'Lakukan kunjungan audiensi lapangan berpasangan dengan rekan ka, ambil peran pengamat non-verbal selama 15 menit.',
    proofType: 'Catatan observasi bahasa tubuh audiens',
    status: 'selesai',
    note: 'Mendampingi ka01: mengamati kapan audiens mulai condong tubuh ke depan tanda tertarik.',
  },
  {
    day: 6,
    focus: 'Rebuttal Drill 5 Detik (Sesi 1)',
    lightTask: 'Uji kecepatan respon atas bantahan "Kami sudah nyaman dengan kondisi sekarang" dalam waktu < 5 detik.',
    proofType: 'Transkrip 2 kalimat respon',
    status: 'selesai',
    note: 'Respon cepat 4.2 detik: "Puji Tuan kenyamanan adalah anugerah terindah, justru kami hadir untuk saling mendukung..."',
  },
  {
    day: 7,
    focus: 'Evaluasi Taktis Minggu 1',
    lightTask: 'Bandingkan rata-rata waktu respon Anda di hari ke-1 vs hari ke-6; catat 1 pola kemajuan terpenting.',
    proofType: 'Log evaluasi mingguan',
    status: 'selesai',
    note: 'Waktu respon turun dari 12 detik menjadi 4.5 detik tanpa kehilangan rasa hormat pada lawan bicara.',
  },
  {
    day: 8,
    focus: 'Penanganan Objeksi Keuangan / Materi',
    lightTask: 'Latih dialog saat audiens menduga ada biaya atau iuran tertentu dalam program pembinaan KAC.',
    proofType: 'Transkrip klarifikasi etis',
    status: 'belum_dilakukan',
    note: '',
  },
  {
    day: 9,
    focus: 'Pembalikan Pertanyaan (Question with Question)',
    lightTask: 'Tanggapi pernyataan skeptis dengan pertanyaan mendalam yang membuat audiens berpikir tentang nilai masa depan keluarganya.',
    proofType: 'Satu simulasi dialog terarah',
    status: 'belum_dilakukan',
    note: '',
  },
  {
    day: 10,
    focus: 'Penyampaian Solusi KAC dalam 3 Menit',
    lightTask: 'Sampaikan pokok kurikulum KAC secara memikat dengan bantuan kartu media saku atau lembar ringkas.',
    proofType: 'Rekaman simulasi 3 menit',
    status: 'belum_dilakukan',
    note: '',
  },
  {
    day: 11,
    focus: 'Penetrasi Wilayah Baru',
    lightTask: 'Lakukan pemetaan rute 5 titik silaturahmi di area sasaran baru bersama koordinator unit ka.',
    proofType: 'Peta rute & target profil',
    status: 'belum_dilakukan',
    note: '',
  },
  {
    day: 12,
    focus: 'Kunci Komitmen Tindak Lanjut',
    lightTask: 'Latih kalimat penutup yang menyepakati tanggal dan jam pertemuan kedua tanpa terkesan memaksa.',
    proofType: 'Transkrip kalimat penutup',
    status: 'belum_dilakukan',
    note: '',
  },
  {
    day: 13,
    focus: 'Pembaruan Kartu Kendali Binaan',
    lightTask: 'Catat seluruh riwayat respon 3 kontak lapangan ke sistem log harian digital dengan keterangan detail AORA.',
    proofType: 'Log 3 kartu kendali',
    status: 'belum_dilakukan',
    note: '',
  },
  {
    day: 14,
    focus: 'Evaluasi Taktis Minggu 2 (Simulasi Stres)',
    lightTask: 'Lakukan role-play bersama instruktur di mana instruktur berperan sebagai audiens yang terus membantah tanpa henti.',
    proofType: 'Lembar skor ketenangan instruktur',
    status: 'belum_dilakukan',
    note: '',
  },
  {
    day: 15,
    focus: 'De-eskalasi Ketegangan Suasana',
    lightTask: 'Praktikkan teknik meredakan ketegangan ketika tuan rumah sedang mengalami masalah keluarga saat kita berkunjung.',
    proofType: 'Catatan empati mendalam',
    status: 'belum_dilakukan',
    note: '',
  },
  {
    day: 16,
    focus: 'Follow-Up Pesan Personal Berkala',
    lightTask: 'Kirimkan pesan sapaan damai sejahtera dan kata mutiara penguat tanpa menyinggung ajakan pertemuan kepada kontak binaan.',
    proofType: 'Teks pesan sapaan tulus',
    status: 'belum_dilakukan',
    note: '',
  },
  {
    day: 17,
    focus: 'Role-Play Rebuttal Drill (Sesi 2)',
    lightTask: 'Uji respons bantahan bertema perbedaan preferensi atau latar belakang komunitas dengan narasi inklusif KAC.',
    proofType: 'Rekaman klarifikasi inklusif',
    status: 'belum_dilakukan',
    note: '',
  },
  {
    day: 18,
    focus: 'Simulasi Lapangan Mandiri 100%',
    lightTask: 'Pimpin satu sesi silaturahmi lapangan dari pembuka, penyampaian, penanganan keberatan, hingga penutupan janji temu.',
    proofType: 'Laporan hasil pertemuan mandiri',
    status: 'belum_dilakukan',
    note: '',
  },
  {
    day: 19,
    focus: 'Sinergi Informasi Lintas Unit ka',
    lightTask: 'Bagikan 1 studi kasus penolakan yang berhasil diatasi ke forum diskusi shaf 2 agar direplikasi unit lain.',
    proofType: 'Postingan forum komunitas',
    status: 'belum_dilakukan',
    note: '',
  },
  {
    day: 20,
    focus: 'Audit Hasil Penetrasi 21 Hari',
    lightTask: 'Hitung rasio keberhasilan membuka dialog dari total titik kunjungan selama 3 pekan terakhir.',
    proofType: 'Kalkulasi rasio closing',
    status: 'belum_dilakukan',
    note: '',
  },
  {
    day: 21,
    focus: 'Sertifikasi Kesiapan Runner Tuntas',
    lightTask: 'Lakukan evaluasi akhir Stair KPI B dan siapkan transisi kompetensi menuju Master Class (Show How).',
    proofType: 'Form validasi kelulusan Runner',
    status: 'belum_dilakukan',
    note: '',
  },
];
