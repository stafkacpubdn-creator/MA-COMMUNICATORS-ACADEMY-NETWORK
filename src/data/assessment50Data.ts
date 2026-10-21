import { DimensionScore, RecommendationItem, DayHabit21 } from '../types';

export interface ReflectiveQuestion {
  id: number;
  dimensionId: 'D1' | 'D2' | 'D3' | 'D4' | 'D5';
  dimensionTitle: string;
  statement: string;
}

export const ASSESSMENT_OPTIONS = [
  { key: 'a', label: 'Saya hampir tidak mengalami hal ini', score: 0, desc: 'Hambatan hampir tidak terjadi' },
  { key: 'b', label: 'Sesekali terjadi', score: 1, desc: 'Hambatan sesekali terjadi' },
  { key: 'c', label: 'Cukup sering terjadi', score: 2, desc: 'Hambatan cukup sering terjadi' },
  { key: 'd', label: 'Terjadi pada sebagian besar kesempatan', score: 3, desc: 'Hambatan sering memengaruhi keseharian' },
  { key: 'e', label: 'Saya tidak tahu harus menjawab apa', score: null, desc: 'Tidak dihitung; tandai untuk ditinjau' },
];

export const DIMENSIONS_INFO: Record<'D1' | 'D2' | 'D3' | 'D4' | 'D5', { title: string; desc: string }> = {
  D1: {
    title: 'Memahami dan mengingat ilmu',
    desc: 'Kemampuan mengingat konsep, menyederhanakan materi dengan bahasa sendiri, dan menarik inti pesan.',
  },
  D2: {
    title: 'Memulai dan menjalankan percakapan',
    desc: 'Kemampuan membuka sapaan, mengajukan pertanyaan alami, dan menyampaikan ide secara ringkas.',
  },
  D3: {
    title: 'Kekhawatiran dan kenyamanan',
    desc: 'Pengelolaan rasa cemas akan penilaian orang lain, ketakutan dianggap sok tahu, dan kegugupan saat berbicara.',
  },
  D4: {
    title: 'Keyakinan dan kesiapan mencoba',
    desc: 'Kesiapan melangkah tanpa menunggu kesempurnaan, meredam keraguan diri, dan memulai dari langkah sederhana.',
  },
  D5: {
    title: 'Praktik dan konsistensi',
    desc: 'Membangun rutinitas latihan harian, mencatat bukti tindakan, dan kembali berlatih setelah jeda.',
  },
};

export const QUESTIONS_50: ReflectiveQuestion[] = [
  // D1. Memahami dan mengingat ilmu (1 - 10)
  { id: 1, dimensionId: 'D1', dimensionTitle: 'Memahami dan mengingat ilmu', statement: 'Selesai belajar, saya masih kesulitan menjelaskan inti materi dengan bahasa sendiri.' },
  { id: 2, dimensionId: 'D1', dimensionTitle: 'Memahami dan mengingat ilmu', statement: 'Saya perlu melihat catatan berulang kali untuk mengingat hal utama yang baru dipelajari.' },
  { id: 3, dimensionId: 'D1', dimensionTitle: 'Memahami dan mengingat ilmu', statement: 'Saya bingung menghubungkan materi yang dipelajari dengan kejadian sehari-hari.' },
  { id: 4, dimensionId: 'D1', dimensionTitle: 'Memahami dan mengingat ilmu', statement: 'Saya sering merasa sudah memahami materi, tetapi kesulitan saat diminta menjelaskannya.' },
  { id: 5, dimensionId: 'D1', dimensionTitle: 'Memahami dan mengingat ilmu', statement: 'Saya jarang mencoba mengingat kembali materi tanpa membuka catatan.' },
  { id: 6, dimensionId: 'D1', dimensionTitle: 'Memahami dan mengingat ilmu', statement: 'Saya kesulitan memilih bagian paling penting dari materi yang ingin saya bagikan.' },
  { id: 7, dimensionId: 'D1', dimensionTitle: 'Memahami dan mengingat ilmu', statement: 'Saya menunda berbagi karena belum yakin bagian mana dari materi yang benar-benar saya pahami.' },
  { id: 8, dimensionId: 'D1', dimensionTitle: 'Memahami dan mengingat ilmu', statement: 'Saya sulit membuat contoh sederhana untuk menjelaskan suatu gagasan.' },
  { id: 9, dimensionId: 'D1', dimensionTitle: 'Memahami dan mengingat ilmu', statement: 'Saya mudah lupa pada materi yang sudah lama tidak digunakan.' },
  { id: 10, dimensionId: 'D1', dimensionTitle: 'Memahami dan mengingat ilmu', statement: 'Saya belum terbiasa merangkum materi menjadi satu atau dua pesan utama.' },

  // D2. Memulai dan menjalankan percakapan (11 - 20)
  { id: 11, dimensionId: 'D2', dimensionTitle: 'Memulai dan menjalankan percakapan', statement: 'Saya bingung menentukan kalimat pertama saat ingin memulai percakapan.' },
  { id: 12, dimensionId: 'D2', dimensionTitle: 'Memulai dan menjalankan percakapan', statement: 'Saya sering menunggu orang lain memulai percakapan lebih dahulu.' },
  { id: 13, dimensionId: 'D2', dimensionTitle: 'Memulai dan menjalankan percakapan', statement: 'Saya kesulitan menemukan pertanyaan yang membuat percakapan berlanjut secara alami.' },
  { id: 14, dimensionId: 'D2', dimensionTitle: 'Memulai dan menjalankan percakapan', statement: 'Saya bingung kapan waktu yang tepat untuk menyampaikan sesuatu yang saya pelajari.' },
  { id: 15, dimensionId: 'D2', dimensionTitle: 'Memulai dan menjalankan percakapan', statement: 'Saya kesulitan menjelaskan ide secara singkat dan mudah dipahami.' },
  { id: 16, dimensionId: 'D2', dimensionTitle: 'Memulai dan menjalankan percakapan', statement: 'Saat percakapan berhenti sejenak, saya tidak tahu bagaimana melanjutkannya.' },
  { id: 17, dimensionId: 'D2', dimensionTitle: 'Memulai dan menjalankan percakapan', statement: 'Saya sulit menyesuaikan cara bicara dengan orang yang berbeda usia atau latar belakang.' },
  { id: 18, dimensionId: 'D2', dimensionTitle: 'Memulai dan menjalankan percakapan', statement: 'Saya lebih sering menyampaikan banyak hal sekaligus daripada menyusunnya secara bertahap.' },
  { id: 19, dimensionId: 'D2', dimensionTitle: 'Memulai dan menjalankan percakapan', statement: 'Saya kesulitan menyampaikan pendapat tanpa terdengar memaksa atau merendahkan orang lain.' },
  { id: 20, dimensionId: 'D2', dimensionTitle: 'Memulai dan menjalankan percakapan', statement: 'Saya belum terbiasa memeriksa apakah lawan bicara memahami maksud saya.' },

  // D3. Kekhawatiran dan kenyamanan (21 - 30)
  { id: 21, dimensionId: 'D3', dimensionTitle: 'Kekhawatiran dan kenyamanan', statement: 'Saya khawatir orang lain akan menilai saya secara negatif saat berbicara.' },
  { id: 22, dimensionId: 'D3', dimensionTitle: 'Kekhawatiran dan kenyamanan', statement: 'Saya takut dianggap sok tahu ketika membagikan sesuatu yang baru dipelajari.' },
  { id: 23, dimensionId: 'D3', dimensionTitle: 'Kekhawatiran dan kenyamanan', statement: 'Saya membayangkan kemungkinan buruk sebelum mencoba memulai percakapan.' },
  { id: 24, dimensionId: 'D3', dimensionTitle: 'Kekhawatiran dan kenyamanan', statement: 'Saya memikirkan kesalahan yang mungkin terjadi sampai akhirnya mengurungkan niat berbicara.' },
  { id: 25, dimensionId: 'D3', dimensionTitle: 'Kekhawatiran dan kenyamanan', statement: 'Saya tetap memikirkan tanggapan orang lain setelah percakapan selesai.' },
  { id: 26, dimensionId: 'D3', dimensionTitle: 'Kekhawatiran dan kenyamanan', statement: 'Saat gugup, saya sulit berkonsentrasi pada isi pembicaraan.' },
  { id: 27, dimensionId: 'D3', dimensionTitle: 'Kekhawatiran dan kenyamanan', statement: 'Saya merasa tidak nyaman ketika perhatian orang lain tertuju kepada saya.' },
  { id: 28, dimensionId: 'D3', dimensionTitle: 'Kekhawatiran dan kenyamanan', statement: 'Saya khawatir orang lain tidak tertarik, sehingga memilih untuk tidak menyampaikan pesan.' },
  { id: 29, dimensionId: 'D3', dimensionTitle: 'Kekhawatiran dan kenyamanan', statement: 'Saya menghindari kesempatan berbicara karena tidak ingin merasa malu.' },
  { id: 30, dimensionId: 'D3', dimensionTitle: 'Kekhawatiran dan kenyamanan', statement: 'Saya sulit kembali mencoba setelah percakapan sebelumnya terasa kurang menyenangkan.' },

  // D4. Keyakinan dan kesiapan mencoba (31 - 40)
  { id: 31, dimensionId: 'D4', dimensionTitle: 'Keyakinan dan kesiapan mencoba', statement: 'Saya merasa harus menguasai seluruh materi sebelum berani membagikan bagian kecil yang sudah dipahami.' },
  { id: 32, dimensionId: 'D4', dimensionTitle: 'Keyakinan dan kesiapan mencoba', statement: 'Saya meragukan kemampuan sendiri meskipun sudah memahami inti materi.' },
  { id: 33, dimensionId: 'D4', dimensionTitle: 'Keyakinan dan kesiapan mencoba', statement: 'Saya takut salah menjelaskan, sehingga lebih memilih diam.' },
  { id: 34, dimensionId: 'D4', dimensionTitle: 'Keyakinan dan kesiapan mencoba', statement: 'Saya merasa harus berbicara dengan sempurna agar orang lain mau mendengarkan.' },
  { id: 35, dimensionId: 'D4', dimensionTitle: 'Keyakinan dan kesiapan mencoba', statement: 'Saya kesulitan memulai jika belum ada contoh kalimat yang bisa saya ikuti.' },
  { id: 36, dimensionId: 'D4', dimensionTitle: 'Keyakinan dan kesiapan mencoba', statement: 'Saya sulit percaya bahwa latihan kecil dapat membantu kemampuan saya berkembang.' },
  { id: 37, dimensionId: 'D4', dimensionTitle: 'Keyakinan dan kesiapan mencoba', statement: 'Saya cenderung membandingkan kemampuan komunikasi saya dengan orang yang lebih mahir.' },
  { id: 38, dimensionId: 'D4', dimensionTitle: 'Keyakinan dan kesiapan mencoba', statement: 'Saya menganggap satu percakapan yang tidak lancar sebagai tanda bahwa saya belum mampu.' },
  { id: 39, dimensionId: 'D4', dimensionTitle: 'Keyakinan dan kesiapan mencoba', statement: 'Saya sulit menentukan langkah pertama yang cukup sederhana untuk dicoba.' },
  { id: 40, dimensionId: 'D4', dimensionTitle: 'Keyakinan dan kesiapan mencoba', statement: 'Saya membutuhkan kepastian bahwa orang lain akan merespons dengan baik sebelum mulai berbagi.' },

  // D5. Praktik dan konsistensi (41 - 50)
  { id: 41, dimensionId: 'D5', dimensionTitle: 'Praktik dan konsistensi', statement: 'Saya sering berniat berlatih komunikasi, tetapi akhirnya menundanya.' },
  { id: 42, dimensionId: 'D5', dimensionTitle: 'Praktik dan konsistensi', statement: 'Setelah mengikuti pembelajaran, saya jarang menggunakan ilmunya dalam kehidupan sehari-hari.' },
  { id: 43, dimensionId: 'D5', dimensionTitle: 'Praktik dan konsistensi', statement: 'Saya tidak memiliki waktu atau pemicu rutin untuk berlatih komunikasi.' },
  { id: 44, dimensionId: 'D5', dimensionTitle: 'Praktik dan konsistensi', statement: 'Saya mudah berhenti berlatih ketika tidak melihat hasil dengan cepat.' },
  { id: 45, dimensionId: 'D5', dimensionTitle: 'Praktik dan konsistensi', statement: 'Saya sering menunggu suasana yang sempurna sebelum mulai mencoba.' },
  { id: 46, dimensionId: 'D5', dimensionTitle: 'Praktik dan konsistensi', statement: 'Saya lupa meninjau kembali materi setelah sesi pembelajaran selesai.' },
  { id: 47, dimensionId: 'D5', dimensionTitle: 'Praktik dan konsistensi', statement: 'Saya jarang mencatat praktik yang sudah dilakukan dan hal yang perlu diperbaiki.' },
  { id: 48, dimensionId: 'D5', dimensionTitle: 'Praktik dan konsistensi', statement: 'Saya kesulitan melanjutkan kebiasaan latihan setelah satu atau dua hari terlewat.' },
  { id: 49, dimensionId: 'D5', dimensionTitle: 'Praktik dan konsistensi', statement: 'Saya tidak tahu cara menilai apakah kemampuan komunikasi saya mulai berkembang.' },
  { id: 50, dimensionId: 'D5', dimensionTitle: 'Praktik dan konsistensi', statement: 'Saya sering menganggap latihan kecil tidak cukup berarti, sehingga tidak melakukannya.' },
];

export function calculateAssessmentScores(answers: Record<number, string>): {
  dimensionScores: Record<string, DimensionScore>;
  overallReadiness: number;
  recommendations: RecommendationItem[];
  personalMessage: string;
  firstStep: string;
} {
  const dimensions: ('D1' | 'D2' | 'D3' | 'D4' | 'D5')[] = ['D1', 'D2', 'D3', 'D4', 'D5'];
  const dimensionScores: Record<string, DimensionScore> = {};

  dimensions.forEach((dim) => {
    const dimQuestions = QUESTIONS_50.filter((q) => q.dimensionId === dim);
    let validCount = 0;
    let sumScore = 0;

    dimQuestions.forEach((q) => {
      const ansKey = answers[q.id];
      const opt = ASSESSMENT_OPTIONS.find((o) => o.key === ansKey);
      if (opt && opt.score !== null) {
        sumScore += opt.score;
        validCount += 1;
      }
    });

    if (validCount < 7) {
      dimensionScores[dim] = {
        dimensionId: dim,
        title: DIMENSIONS_INFO[dim].title,
        score: Math.round(validCount > 0 ? (sumScore / validCount) * 10 : 0),
        validCount,
        status: 'belum_cukup',
        description: 'Data belum cukup untuk disimpulkan',
        suggestedAction: 'Tinjau kembali beberapa pertanyaan atau jadwalkan percakapan singkat dengan fasilitator.',
      };
    } else {
      const avg = sumScore / validCount;
      const finalScore = Math.min(30, Math.round(avg * 10));
      let status: 'rendah' | 'sedang' | 'tinggi' = 'rendah';
      let description = 'Hambatan jarang dilaporkan';
      let suggestedAction = 'Pertahankan kekuatan; tetap praktik.';

      if (finalScore >= 20) {
        status = 'tinggi';
        description = 'Hambatan cukup sering dilaporkan';
        suggestedAction = 'Jadikan prioritas latihan bertahap.';
      } else if (finalScore >= 10) {
        status = 'sedang';
        description = 'Hambatan muncul pada situasi tertentu';
        suggestedAction = 'Pilih satu latihan yang relevan.';
      }

      dimensionScores[dim] = {
        dimensionId: dim,
        title: DIMENSIONS_INFO[dim].title,
        score: finalScore,
        validCount,
        status,
        description,
        suggestedAction,
      };
    }
  });

  const validDims = Object.values(dimensionScores).filter((d) => d.status !== 'belum_cukup');
  const avgBarrier = validDims.length > 0 ? validDims.reduce((acc, d) => acc + d.score, 0) / validDims.length : 15;
  const overallReadiness = Math.max(40, Math.min(98, Math.round(100 - (avgBarrier / 30) * 50)));

  const recommendations: RecommendationItem[] = [];

  if (dimensionScores['D1']?.score >= 15) {
    recommendations.push({
      pattern: 'Sulit mengingat atau merangkum materi',
      hypothesis: 'Penguatan pemahaman dan ingatan',
      firstPractice: 'Jelaskan satu konsep dengan bahasa sendiri selama 60 detik.',
    });
  }
  if (dimensionScores['D2']?.score >= 15) {
    recommendations.push({
      pattern: 'Paham materi tetapi sulit menyusun kata atau membuka percakapan',
      hypothesis: 'Keterampilan menyusun pesan & membuka percakapan',
      firstPractice: 'Gunakan pola: inti pesan, contoh, manfaat. Latih sapaan pembuka santun.',
    });
  }
  if (dimensionScores['D3']?.score >= 15) {
    recommendations.push({
      pattern: 'Tahu apa yang ingin disampaikan tetapi khawatir dinilai',
      hypothesis: 'Kenyamanan dan latihan bertahap',
      firstPractice: 'Mulai berbagi dengan orang yang dipercaya; targetkan mencoba, bukan respons tertentu.',
    });
  }
  if (dimensionScores['D4']?.score >= 15) {
    recommendations.push({
      pattern: 'Meragukan kesiapan atau menunggu sempurna sebelum mencoba',
      hypothesis: 'Keyakinan bertahap dari langkah kecil',
      firstPractice: 'Lakukan satu percakapan sederhana tanpa menunggu kalimat sempurna.',
    });
  }
  if (dimensionScores['D5']?.score >= 15) {
    recommendations.push({
      pattern: 'Mampu mencoba tetapi sering menunda',
      hypothesis: 'Pembentukan kebiasaan',
      firstPractice: 'Tautkan latihan 3 menit pada rutinitas tetap setiap pagi.',
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      pattern: 'Kompetensi dasar relatif seimbang dan stabil',
      hypothesis: 'Konsistensi praktik rutin',
      firstPractice: 'Pertahankan praktik harian dan mulai eksperimen variasi audiens yang lebih luas.',
    });
  }

  const personalMessage =
    'Anda sedang membangun kebiasaan untuk mulai berbagi. Dari jawaban Anda, terlihat bahwa Anda memahami sebagian materi, tetapi terkadang masih ragu ketika harus menyampaikannya. Ini bukan label tentang diri Anda; ini petunjuk untuk memilih latihan yang sesuai.';

  const firstStep =
    'Langkah pertama: pilih satu hal yang sudah Anda pahami, jelaskan dalam tiga kalimat, lalu bagikan kepada orang yang tepat. Kita akan melihat kemajuan dari tindakan yang dilakukan, bukan dari kesempurnaan.';

  return {
    dimensionScores,
    overallReadiness,
    recommendations,
    personalMessage,
    firstStep,
  };
}

export const INITIAL_21_DAYS_HABIT: DayHabit21[] = [
  {
    day: 1,
    focus: 'Kenali titik awal',
    lightTask: 'Tuliskan satu situasi komunikasi yang terasa mudah dan satu yang terasa sulit.',
    proofType: 'Catatan awal',
    status: 'selesai',
    note: 'Mudah saat ngobrol santai dengan kawan dekat; sulit saat diminta bicara formal di hadapan tokoh masyarakat.',
  },
  {
    day: 2,
    focus: 'Ingat kembali ilmu',
    lightTask: 'Jelaskan satu konsep yang baru dipelajari dengan bahasa sendiri.',
    proofType: 'Penjelasan 30 - 60 detik',
    status: 'selesai',
    note: 'Merekam suara 45 detik merangkum kaidah 3V (Verbal, Vokal, Visual).',
  },
  {
    day: 3,
    focus: 'Ringkas pesan',
    lightTask: 'Ubah satu materi menjadi tiga kalimat: inti, contoh, manfaat.',
    proofType: 'Tiga kalimat',
    status: 'selesai',
    note: 'Inti: KAC wadah silaturahmi. Contoh: Halaqah rutin sepekan sekali. Manfaat: Mempererat kepedulian bersama.',
  },
  {
    day: 4,
    focus: 'Latih suara',
    lightTask: 'Bacakan atau rekam penjelasan singkat; dengarkan kembali dengan ramah pada diri sendiri.',
    proofType: 'Satu rekaman atau latihan',
    status: 'selesai',
    note: 'Mendengarkan rekaman perkenalan diri, nada sudah cukup santun dan tenang.',
  },
  {
    day: 5,
    focus: 'Sapa dan bertanya',
    lightTask: 'Mulai sapaan atau ajukan pertanyaan sederhana yang sesuai situasi.',
    proofType: 'Satu inisiatif',
    status: 'selesai',
    note: 'Menyapa tetangga baru saat kerja bakti dan menanyakan asal kota.',
  },
  {
    day: 6,
    focus: 'Dengarkan dengan utuh',
    lightTask: 'Dengarkan orang lain tanpa memotong, lalu rangkum inti jawabannya.',
    proofType: 'Satu rangkuman',
    status: 'selesai',
    note: 'Mendengarkan cerita rekan ka02 selama 5 menit tanpa memotong pembicaraan.',
  },
  {
    day: 7,
    focus: 'Refleksi minggu pertama',
    lightTask: 'Catat hal yang mulai mudah, hal yang masih sulit, dan satu penyesuaian.',
    proofType: 'Refleksi mingguan',
    status: 'selesai',
    note: 'Mulai mudah menyapa; masih sulit mengelola jeda saat lawan bicara diam sejenak.',
  },
  {
    day: 8,
    focus: 'Latih pembuka percakapan',
    lightTask: 'Gunakan sapaan, pertanyaan terbuka, atau komentar relevan tentang situasi.',
    proofType: 'Satu pembuka',
    status: 'belum_dilakukan',
    note: '',
  },
  {
    day: 9,
    focus: 'Jelaskan dengan contoh',
    lightTask: 'Jelaskan satu ide dengan contoh yang dekat dengan keseharian.',
    proofType: 'Satu contoh',
    status: 'belum_dilakukan',
    note: '',
  },
  {
    day: 10,
    focus: 'Berbagi dalam lingkaran aman',
    lightTask: 'Bagikan satu hal bermanfaat kepada orang yang dipercaya.',
    proofType: 'Satu praktik berbagi',
    status: 'belum_dilakukan',
    note: '',
  },
  {
    day: 11,
    focus: 'Coba meski belum sempurna',
    lightTask: 'Lakukan satu percakapan sederhana tanpa menunggu kalimat sempurna.',
    proofType: 'Satu upaya',
    status: 'belum_dilakukan',
    note: '',
  },
  {
    day: 12,
    focus: 'Kelola jeda',
    lightTask: 'Sebelum berbicara, berhenti sejenak, tentukan inti pesan, lalu sampaikan perlahan.',
    proofType: 'Satu praktik sadar',
    status: 'belum_dilakukan',
    note: '',
  },
  {
    day: 13,
    focus: 'Periksa pemahaman',
    lightTask: 'Tanyakan dengan sopan apakah pesan sudah jelas atau perlu dijelaskan lagi.',
    proofType: 'Satu pemeriksaan',
    status: 'belum_dilakukan',
    note: '',
  },
  {
    day: 14,
    focus: 'Refleksi minggu kedua',
    lightTask: 'Bandingkan praktik minggu ini dengan minggu pertama; pilih satu perbaikan.',
    proofType: 'Refleksi mingguan',
    status: 'belum_dilakukan',
    note: '',
  },
  {
    day: 15,
    focus: 'Sesuaikan bahasa',
    lightTask: 'Jelaskan satu ide dengan cara yang sesuai bagi lawan bicara.',
    proofType: 'Satu penyesuaian',
    status: 'belum_dilakukan',
    note: '',
  },
  {
    day: 16,
    focus: 'Minta umpan balik',
    lightTask: 'Minta satu saran spesifik tentang kejelasan atau alur pesan.',
    proofType: 'Satu masukan',
    status: 'belum_dilakukan',
    note: '',
  },
  {
    day: 17,
    focus: 'Praktikkan ilmu',
    lightTask: 'Gunakan satu prinsip komunikasi dalam percakapan nyata yang sesuai.',
    proofType: 'Satu penerapan',
    status: 'belum_dilakukan',
    note: '',
  },
  {
    day: 18,
    focus: 'Mulai lagi setelah jeda',
    lightTask: 'Jika pernah melewatkan latihan, mulai kembali dengan tugas terkecil.',
    proofType: 'Satu latihan ulang',
    status: 'belum_dilakukan',
    note: '',
  },
  {
    day: 19,
    focus: 'Bagikan pemahaman',
    lightTask: 'Jelaskan satu materi singkat dan beri ruang untuk pertanyaan.',
    proofType: 'Satu sesi berbagi',
    status: 'belum_dilakukan',
    note: '',
  },
  {
    day: 20,
    focus: 'Tinjau kemajuan',
    lightTask: 'Catat tiga perubahan perilaku yang benar-benar terjadi, sekecil apa pun.',
    proofType: 'Tiga bukti kemajuan',
    status: 'belum_dilakukan',
    note: '',
  },
  {
    day: 21,
    focus: 'Rayakan dan lanjutkan',
    lightTask: 'Bandingkan baseline dengan hari ini, pilih kebiasaan yang ingin dipertahankan.',
    proofType: 'Rencana lanjutan',
    status: 'belum_dilakukan',
    note: '',
  },
];
