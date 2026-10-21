/**
 * KAC 21: ELEVATOR PITCH HABIT LAB — Types & Schemas
 * Based on KONSEP SISTEM Habit tracker 21D (Formula 5P+1R, DENGAR, 6 Rubrik)
 */

export type HabitLabPhase = 'minggu-1' | 'minggu-2' | 'minggu-3';

export interface DailyInstruction5P1R {
  pahami: string;
  persiapkan: string;
  praktikkan: string;
  periksa: string[];
  perbaiki: string;
  rekam: string;
}

export interface DaySchedule21 {
  day: number;
  phase: HabitLabPhase;
  phaseTitle: string; // e.g. "Minggu 1 — Build the Habit"
  title: string; // e.g. "Kenali pola komunikasi"
  targetDescription: string;
  targetDurationMinutes: number; // 10-15 menit
  primarySkill: string;
  requiredEvidence: 'rekaman_audio' | 'naskah_pitch' | 'simulasi_partner' | 'observasi_kelompok';
  requiredEvidenceLabel: string;
  instruction5P1R: DailyInstruction5P1R;
  exemplarPitch?: string;
  tips: string;
}

export interface RubricScoreItem {
  score: number; // 0 - 100
  weight: number; // %
  evidenceObserved: string;
  isEvidenceSufficient: boolean;
  notes: string;
}

export interface RubricIndicators {
  relevansiPendengar: RubricScoreItem; // 20%
  kejelasanKeringkasan: RubricScoreItem; // 20%
  manfaatBukti: RubricScoreItem; // 20%
  penyampaian: RubricScoreItem; // 15%
  interaksi: RubricScoreItem; // 15%
  tindakLanjut: RubricScoreItem; // 10%
}

export interface AiCoachEvaluation {
  submission_id: string;
  skill: string;
  evidence_summary: string;
  indicator_scores: {
    relevansiPendengar: number;
    kejelasanKeringkasan: number;
    manfaatBukti: number;
    penyampaian: number;
    interaksi: number;
    tindakLanjut: number;
  };
  overall_score: number;
  strengths: string[];
  priority_improvement: string;
  suggested_rewrite: string;
  next_challenge: string;
  evidence_sufficiency: 'memadai' | 'sebagian' | 'belum_cukup_bukti';
  review_status: 'ai_verified' | 'needs_human_check' | 'calibrated';
}

export interface PeerReviewDENGAR {
  reviewerId: string;
  reviewerName: string;
  revieweeId: string;
  day: number;
  timestamp: string;
  dengar: string; // D: Dengarkan tanpa menyela
  eksplorasi: string; // E: Eksplorasi maksud
  nyatakanKekuatan: string[]; // N: 2 kekuatan perilaku
  gagaskanPerbaikan: string; // G: 1 perbaikan berdampak
  aplikasikanUlang: string; // A: Catatan pengulangan
  rekamHasil: string; // R: Hasil & kesepakatan
  score: number; // 0 - 100
}

export interface DaySubmissionRecord {
  id: string;
  participantId: string;
  day: number;
  submittedAt: string;
  durationMinutes: number;
  confidenceBefore: number; // 1 - 5
  confidenceAfter: number; // 1 - 5
  evidenceType: 'rekaman_audio' | 'naskah_pitch' | 'simulasi_partner' | 'observasi_kelompok';
  evidenceContent: string; // text or audio url / base64 or link
  pitchScript: string;
  checklistStatus: Record<string, boolean>;
  oneSuccess: string;
  oneImprovement: string;
  freeNotes?: string;
  status: 'selesai_target' | 'selesai_sebagian' | 'perlu_dijadwalkan_ulang';
  version: number;
  aiReview?: AiCoachEvaluation;
  peerReview?: PeerReviewDENGAR;
  facilitatorScore?: number;
  facilitatorNotes?: string;
}

export interface HabitLabParticipantProgress {
  participantId: string;
  programStartDate: string;
  currentDay: number;
  completedDaysCount: number; // e.g. 14 / 21
  completionRate: number; // %
  skillGainRate: number; // % (skor akhir - skor awal)
  baselineScore: number;
  currentScore: number;
  streakDays: number;
  assignedPartnerId?: string;
  assignedGroupId?: string;
  badges: string[]; // ['First Pitch', '7-Day Practice', 'Feedback Partner', 'Team Communicator', '21-Day Finisher']
  submissions: Record<number, DaySubmissionRecord>; // day -> submission
}
