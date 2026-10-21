export type UserRole = 'member' | 'admin';
export type UnitType = 'KAC_PUSAT' | 'SHAF_2';

export interface UserProfile {
  id: string;
  name: string;
  unit: string; // 'KAC (Pusat)' or 'Shaf 2 (ka01)' .. 'Shaf 2 (ka14)'
  unitCode: string; // 'PUSAT', 'ka01', ..., 'ka14'
  role: UserRole;
  avatar: string;
  email: string;
  streakDays: number;
  totalXp: number;
  level: number;
  adaptiveSpeed: 'Standar' | 'Cepat' | 'Mendalam' | 'Akselerasi';
  comprehensionRate: number; // percentage e.g. 88
  dailyLearningHours: number;
  lastActive: string;
  // Participant progress tracking details
  classProgress: {
    newbie: { passed: boolean; score: number; completedAt?: string; habitDaysDone: number };
    runner: { passed: boolean; score: number; completedAt?: string; habitDaysDone: number };
    master: { passed: boolean; score: number; completedAt?: string; habitDaysDone: number };
  };
  skillsRadar: {
    listening: number; // 0-100
    verbal: number;
    nonVerbal: number;
    clarity: number;
    empathy: number;
    objectionHandling: number;
    fieldNegotiation: number;
    mentoringLeadership: number;
  };
}

export interface ReflectiveQuestionItem {
  id: number;
  dimensionId: string;
  dimensionTitle: string;
  statement: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'Mudah' | 'Sedang' | 'Sulit';
  category: string;
}

export interface DimensionScore {
  dimensionId: string;
  title: string;
  score: number; // 0 - 30
  validCount: number;
  status: 'rendah' | 'sedang' | 'tinggi' | 'belum_cukup';
  description: string;
  suggestedAction: string;
}

export interface RecommendationItem {
  pattern: string;
  hypothesis: string;
  firstPractice: string;
}

export interface AssessmentResult {
  score: number;
  totalQuestions: number;
  passed: boolean;
  date: string;
  difficultyReached: 'Mudah' | 'Sedang' | 'Sulit';
  timeSpentSeconds: number;
  feedback: string;
  dimensionScores?: Record<string, DimensionScore>;
  answers?: Record<number, string>; // question index -> 'a' | 'b' | 'c' | 'd' | 'e'
  recommendations?: RecommendationItem[];
  personalMessage?: string;
  firstStep?: string;
  badges?: string[];
}

export interface DayHabit21 {
  day: number;
  focus: string;
  lightTask: string;
  proofType: string;
  status: 'selesai' | 'dicoba_sebagian' | 'belum_dilakukan' | 'tidak_ada_kesempatan';
  note: string;
  date?: string;
}

export interface HabitItem {
  id: string;
  title: string;
  description: string;
  targetPerDay: number;
  completedToday: boolean;
  history: { [dateStr: string]: boolean };
  category: 'Alpha' | 'Beta' | 'Delta';
}

export interface LessonContent {
  id: string;
  levelId: 'newbie' | 'runner' | 'master';
  title: string;
  subtitle: string;
  kpiCode: string; // 'Base KPI A', 'Stair KPI B', 'Roof KPI C'
  kpiTarget: string;
  estimatedMinutes: number;
  sections: {
    heading: string;
    body: string;
    callout?: string;
    keyTakeaway: string;
  }[];
  practicalExamples: string[];
  flipbookUrl?: string;
}

export interface BulletModule {
  id: 'elevator-pitch' | 'pra-pengabaran' | 'materi-pengabaran' | 'materi-pembinaan' | 'aora';
  title: string;
  tagline: string;
  description: string;
  checklistItems: { id: string; text: string; done: boolean }[];
  frameworkSteps: { title: string; desc: string; tips: string }[];
  notes: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  urgency: 'Tinggi' | 'Sedang' | 'Rendah';
  category: 'Belajar' | 'Evaluasi' | 'Pengabaran' | 'Pembinaan' | 'Kompetisi';
  completed: boolean;
  syncedToGoogle: boolean;
}

export interface ForumPost {
  id: string;
  authorName: string;
  authorUnit: string;
  authorAvatar: string;
  timestamp: string;
  title: string;
  content: string;
  category: 'Pra-Pengabaran' | 'Elevator Pitch' | 'Pembinaan' | 'AORA' | 'Tips Belajar';
  likes: number;
  likedByMe: boolean;
  comments: {
    id: string;
    authorName: string;
    authorUnit: string;
    text: string;
    timestamp: string;
  }[];
}

export interface IPOOIData {
  input: {
    totalHours: number;
    targetHours: number;
    attendanceRate: number;
    materialsReadCount: number;
    notes: string;
  };
  process: {
    quizAttempts: number;
    averageQuizTime: number;
    aoraSimulationsCompleted: number;
    discussionParticipationCount: number;
    notes: string;
  };
  output: {
    certificationsEarned: number;
    averageAssessmentScore: number;
    alphaBetaDeltaStreak: number;
    passedLevelsCount: number;
    notes: string;
  };
  outcome: {
    pengabaranFieldSuccessRate: number; // %
    pembinaanRetentionRate: number; // %
    confidenceScore: number; // scale 1-100
    notes: string;
  };
  impact: {
    communicatorMaturityLevel: 'Emerging' | 'Competent' | 'Advanced' | 'Expert';
    shafReadinessScore: number; // %
    kacOverallImpactIndex: number; // %
    notes: string;
  };
}

export type ActiveView =
  | 'dashboard_executive'
  | 'dashboard_graphic'
  | 'dashboard_ipooi'
  | 'dashboard_peserta'
  | 'newbie_materi'
  | 'newbie_assessment'
  | 'newbie_result'
  | 'newbie_cta'
  | 'runner_materi'
  | 'runner_assessment'
  | 'runner_result'
  | 'runner_cta'
  | 'master_materi'
  | 'master_assessment'
  | 'master_result'
  | 'master_cta'
  | 'bullet_elevator'
  | 'bullet_pra'
  | 'bullet_pengabaran'
  | 'bullet_pembinaan'
  | 'bullet_aora'
  | 'elevator_habit_lab'
  | 'elevator_coach'
  | 'elevator_human'
  | 'setting_tampilan'
  | 'setting_password'
  | 'setting_member_admin'
  | 'setting_content_editor'
  | 'forum_komunitas'
  | 'kompetisi_teman'
  | 'panduan_infografis';

export type ThemePalette = 'navy' | 'light' | 'emerald' | 'amethyst' | 'sepia' | 'onyx';

export interface ThemeOption {
  id: ThemePalette;
  name: string;
  subtitle: string;
  description: string;
  isDark: boolean;
  bgHex: string;
  cardHex: string;
  accentHex: string;
  textHex: string;
  contrastTag: string;
}

