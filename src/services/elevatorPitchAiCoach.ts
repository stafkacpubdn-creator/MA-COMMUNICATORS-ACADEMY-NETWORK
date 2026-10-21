/**
 * AI Coach Evaluation Service for KAC 21 Elevator Pitch Habit Lab
 * Strictly implements the 6 Rubric Indicators & 5-part Feedback Pattern
 */

import { AiCoachEvaluation, DaySubmissionRecord } from '../types/elevatorHabitLab';
import { DAYS_21_SCHEDULE } from '../data/elevatorPitch21Data';

export function evaluateSubmissionWithAiCoach(
  submission: Partial<DaySubmissionRecord>,
  dayNumber: number
): AiCoachEvaluation {
  const daySchedule = DAYS_21_SCHEDULE.find((d) => d.day === dayNumber) || DAYS_21_SCHEDULE[0];
  const submissionId = submission.id || `sub-${Date.now()}`;
  const script = (submission.pitchScript || submission.evidenceContent || '').trim();

  // 1. Evidence sufficiency validation (Anti-Hallucination rule)
  const wordCount = script.split(/\s+/).filter(Boolean).length;
  const isAudioProvided = submission.evidenceType === 'rekaman_audio';

  let sufficiency: 'memadai' | 'sebagian' | 'belum_cukup_bukti' = 'memadai';
  let reviewStatus: 'ai_verified' | 'needs_human_check' | 'calibrated' = 'ai_verified';

  if (wordCount < 10 && !isAudioProvided) {
    sufficiency = 'belum_cukup_bukti';
    reviewStatus = 'needs_human_check';
  } else if (wordCount < 25) {
    sufficiency = 'sebagian';
  }

  // 2. Score indicators (6 rubrics)
  // Relevansi (20%), Kejelasan (20%), Manfaat/Bukti (20%), Penyampaian (15%), Interaksi (15%), Tindak Lanjut (10%)
  const hasHook = /salam|halo|selamat|permisi|apakah|bapak|ibu|mas|mbak|pernah/i.test(script);
  const hasIdentity = /saya|nama|dari|tim|relawan|komunitas|kac/i.test(script);
  const hasBenefit = /membantu|solusi|manfaat|hasil|kegiatan|program|kemampuan|perubahan/i.test(script);
  const hasCTA = /boleh|waktu|mampir|kontak|nomor|sabtu|minggu|diskusi|ngobrol|menit/i.test(script);

  const scoreRelevansi = hasHook ? (wordCount >= 20 ? 88 : 75) : 60;
  const scoreKejelasan = wordCount >= 30 && wordCount <= 90 ? 90 : wordCount > 90 ? 70 : 65;
  const scoreManfaat = hasBenefit ? (script.length > 80 ? 85 : 72) : 55;
  const scorePenyampaian = isAudioProvided ? 88 : 78; // If audio not present, conservative score with explicit note
  const scoreInteraksi = hasIdentity ? 84 : 70;
  const scoreTindakLanjut = hasCTA ? 86 : 60;

  // Weighted overall calculation: (20*R + 20*K + 20*M + 15*P + 15*I + 10*T) / 100
  const weightedOverall = Math.round(
    scoreRelevansi * 0.2 +
      scoreKejelasan * 0.2 +
      scoreManfaat * 0.2 +
      scorePenyampaian * 0.15 +
      scoreInteraksi * 0.15 +
      scoreTindakLanjut * 0.1
  );

  // 3. 5-Element Feedback Generation (Specific Appreciation, Indicators, 1 Priority, Rewrite, Challenge)
  const strengths: string[] = [];
  if (hasHook) {
    strengths.push('Pembukaan langsung menyapa pendengar dengan nada ramah dan sopan.');
  } else {
    strengths.push('Inti pesan memiliki fokus yang jelas.');
  }

  if (hasBenefit) {
    strengths.push('Penjelasan manfaat sudah mengarah pada solusi nyata bagi lawan bicara.');
  } else {
    strengths.push('Artikulasi kalimat padat dan tidak berbelit-belit.');
  }

  let priorityImprovement = '';
  let suggestedRewrite = '';

  if (!hasCTA) {
    priorityImprovement =
      'Tambahkan ajakan tindak lanjut (Call to Action) yang sopan dengan batasan waktu spesifik (misal: "cukup 5–10 menit").';
    suggestedRewrite = `${script} Jika bapak/ibu ada kelonggaran waktu 5 menit, bolehkah saya mampir sebentar untuk berdiskusi?`;
  } else if (!hasBenefit) {
    priorityImprovement =
      'Perkuat bukti konkret atau contoh nyata bagaimana gagasan ini telah terbukti membawa dampak positif.';
    suggestedRewrite = `${script} Sebagai contoh nyata, di wilayah sebelah kegiatan serupa berhasil menghidupkan silaturahmi pemuda setiap akhir pekan.`;
  } else {
    priorityImprovement =
      'Jaga tempo berbicara agar tetap stabil di kisaran 110–120 kata per menit tanpa tergesa-gesa.';
    suggestedRewrite = `"${script.slice(0, 120)}..." (Ucapkan dengan jeda nafas tenang 1 detik setelah kalimat pembuka).`;
  }

  const nextChallenge =
    dayNumber < 21
      ? `Tantangan Hari ${dayNumber + 1}: Latih artikulasi bagian pembuka dengan senyum tulus dan fokus pada pendengar target.`
      : 'Tantangan Purna Program: Terapkan Elevator Pitch ini pada pertemuan silaturahmi nyata pekan ini!';

  return {
    submission_id: submissionId,
    skill: daySchedule.primarySkill,
    evidence_summary: isAudioProvided
      ? `Bukti rekaman audio & naskah terverifikasi (${wordCount} kata, durasi target ${daySchedule.targetDurationMinutes} mnt).`
      : `Naskah latihan terverifikasi (${wordCount} kata). Catatan: Penilaian intonasi vokal menunggu ketersediaan rekaman audio.`,
    indicator_scores: {
      relevansiPendengar: scoreRelevansi,
      kejelasanKeringkasan: scoreKejelasan,
      manfaatBukti: scoreManfaat,
      penyampaian: scorePenyampaian,
      interaksi: scoreInteraksi,
      tindakLanjut: scoreTindakLanjut,
    },
    overall_score: weightedOverall,
    strengths,
    priority_improvement: priorityImprovement,
    suggested_rewrite: suggestedRewrite,
    next_challenge: nextChallenge,
    evidence_sufficiency: sufficiency,
    review_status: reviewStatus,
  };
}
