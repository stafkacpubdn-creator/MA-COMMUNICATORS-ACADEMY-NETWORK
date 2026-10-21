import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import {
  UserProfile,
  ActiveView,
  LessonContent,
  QuizQuestion,
  HabitItem,
  BulletModule,
  CalendarEvent,
  ForumPost,
  IPOOIData,
  AssessmentResult,
  DayHabit21,
  ReflectiveQuestionItem,
  ThemePalette,
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_LESSONS,
  INITIAL_QUIZZES,
  INITIAL_HABITS,
  INITIAL_BULLETS,
  INITIAL_IPOOI,
  INITIAL_CALENDAR_EVENTS,
  INITIAL_FORUM_POSTS,
} from '../data/initialData';
import {
  INITIAL_21_DAYS_HABIT,
  calculateAssessmentScores,
  QUESTIONS_50,
} from '../data/assessment50Data';
import {
  INITIAL_RUNNER_21_DAYS_HABIT,
  calculateRunnerScores,
  RUNNER_QUESTIONS_50,
} from '../data/runnerAssessment50Data';
import {
  INITIAL_MASTER_21_DAYS_HABIT,
  calculateMasterScores,
  MASTER_QUESTIONS_50,
} from '../data/masterAssessment50Data';
import { AUTHORIZED_CONTENT_ADMINS, isAuthorizedAdmin } from '../data/initialData';
import { sendToAppsScript } from '../services/googleSyncService';

interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'achievement' | 'reminder' | 'streak' | 'info' | 'success' | 'warning';
  timestamp: string;
}

interface AppContextType {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  currentUser: UserProfile;
  switchUser: (userId: string) => void;
  allUsers: UserProfile[];
  updateUserProfilePicture: (userId: string, newAvatarUrl: string) => void;
  showProfileModal: boolean;
  setShowProfileModal: (val: boolean) => void;
  showGoogleSyncModal: boolean;
  setShowGoogleSyncModal: (val: boolean) => void;
  isContentAdmin: boolean;

  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  themePalette: ThemePalette;
  setThemePalette: (theme: ThemePalette) => void;
  isOfflineMode: boolean;
  setIsOfflineMode: (val: boolean) => void;
  isSyncing: boolean;
  triggerCloudSync: () => void;
  lastSyncedTime: string;

  lessons: Record<'newbie' | 'runner' | 'master', LessonContent>;
  updateLesson: (levelId: 'newbie' | 'runner' | 'master', updated: LessonContent) => void;

  questions50Newbie: ReflectiveQuestionItem[];
  questions50Runner: ReflectiveQuestionItem[];
  questions50Master: ReflectiveQuestionItem[];
  updateQuestions50: (level: 'newbie' | 'runner' | 'master', questions: ReflectiveQuestionItem[]) => void;
  updateDayHabit21Template: (level: 'newbie' | 'runner' | 'master', habits: DayHabit21[]) => void;
  globalAnnouncement: string;
  setGlobalAnnouncement: (text: string) => void;
  resetAllContentToDefault: () => void;

  quizzes: Record<'newbie' | 'runner' | 'master', QuizQuestion[]>;
  updateQuizzes: (levelId: 'newbie' | 'runner' | 'master', list: QuizQuestion[]) => void;
  userAssessmentResults: Record<string, AssessmentResult | null>;
  saveAssessmentResult: (levelId: 'newbie' | 'runner' | 'master', result: AssessmentResult) => void;

  habits: HabitItem[];
  toggleHabit: (habitId: string) => void;
  updateHabitList: (habits: HabitItem[]) => void;

  habits21: DayHabit21[];
  updateDayHabit21: (day: number, status: DayHabit21['status'], note: string) => void;

  habits21Runner: DayHabit21[];
  updateDayHabit21Runner: (day: number, status: DayHabit21['status'], note: string) => void;

  habits21Master: DayHabit21[];
  updateDayHabit21Master: (day: number, status: DayHabit21['status'], note: string) => void;

  bullets: Record<string, BulletModule>;
  updateBulletModule: (id: string, module: BulletModule) => void;

  ipooiData: IPOOIData;
  updateIPOOI: (data: Partial<IPOOIData>) => void;

  calendarEvents: CalendarEvent[];
  addCalendarEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  toggleEventCompleted: (id: string) => void;
  deleteCalendarEvent: (id: string) => void;
  exportToICS: () => void;

  forumPosts: ForumPost[];
  addForumPost: (title: string, content: string, category: ForumPost['category']) => void;
  toggleLikePost: (postId: string) => void;
  addCommentToPost: (postId: string, text: string) => void;

  notifications: ToastNotification[];
  addNotification: (title: string, message: string, type?: ToastNotification['type']) => void;
  triggerCelebration: () => void;

  resetMenuConfig: (menuKey: string) => void;
  exportAllSettingsBackup: () => void;
  importSettingsBackup: (jsonStr: string) => boolean;

  showLeaderboardModal: boolean;
  setShowLeaderboardModal: (val: boolean) => void;
  showCompetitionModal: boolean;
  setShowCompetitionModal: (val: boolean) => void;
  showReportModal: boolean;
  setShowReportModal: (val: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard_executive');

  const [themePalette, setThemePaletteState] = useState<ThemePalette>(() => {
    const saved = localStorage.getItem('kac_theme_palette');
    if (saved && ['navy', 'light', 'emerald', 'amethyst', 'sepia', 'onyx'].includes(saved)) {
      return saved as ThemePalette;
    }
    const savedDark = localStorage.getItem('kac_dark_mode');
    return savedDark === 'false' ? 'light' : 'navy';
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('kac_dark_mode');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const setThemePalette = (theme: ThemePalette) => {
    setThemePaletteState(theme);
    localStorage.setItem('kac_theme_palette', theme);
    const isDark = theme !== 'light' && theme !== 'sepia';
    setIsDarkMode(isDark);
  };

  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(() => {
    return localStorage.getItem('kac_offline_mode') === 'true';
  });

  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncedTime, setLastSyncedTime] = useState('Sinkron: Otomatis (Cloud)');

  // Users
  const [allUsers, setAllUsers] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem('kac_users_list');
    if (!saved) return INITIAL_USERS;
    try {
      const parsed: UserProfile[] = JSON.parse(saved);
      const hasPubdn = parsed.some((u) => u.email === 'pubdnkac@gmail.com');
      let result = parsed.map((u) => {
        let name = u.name;
        if (name.includes('Ust. Rachmat Hidayat') || name.includes('Rachmat Hidayat')) {
          name = name.replace(/Ust\.\s*Rachmat Hidayat/g, 'Bung Abram Hanif').replace(/Rachmat Hidayat/g, 'Bung Abram Hanif');
        }
        if (!name.startsWith('Bung ')) {
          name = `Bung ${name}`;
        }
        let email = u.email;
        if (u.id === 'user-pusat' || email === 'kac.pusat@communicator.org') {
          email = 'stafkacpubdn@gmail.com';
        }
        return {
          ...u,
          name,
          email,
          classProgress: u.classProgress || {
            newbie: { passed: true, score: 88, completedAt: '2026-09-28', habitDaysDone: 21 },
            runner: { passed: u.level >= 2, score: u.level >= 2 ? 85 : 0, habitDaysDone: u.level >= 2 ? 14 : 0 },
            master: { passed: u.level >= 3, score: u.level >= 3 ? 90 : 0, habitDaysDone: u.level >= 3 ? 12 : 0 },
          },
          skillsRadar: u.skillsRadar || {
            listening: 85,
            verbal: 86,
            nonVerbal: 82,
            clarity: 88,
            empathy: 87,
            objectionHandling: 84,
            fieldNegotiation: 83,
            mentoringLeadership: 76,
          },
        };
      });
      if (!hasPubdn) {
        const pubdnUser = INITIAL_USERS.find((u) => u.email === 'pubdnkac@gmail.com');
        if (pubdnUser) result.push(pubdnUser);
      }
      return result;
    } catch {
      return INITIAL_USERS;
    }
  });

  const [currentUserId, setCurrentUserId] = useState<string>(() => {
    return localStorage.getItem('kac_current_user_id') || 'user-pusat';
  });

  const currentUser = allUsers.find((u) => u.id === currentUserId) || allUsers[0];

  // Profile Picture management
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [showGoogleSyncModal, setShowGoogleSyncModal] = useState<boolean>(false);

  const updateUserProfilePicture = (userId: string, newAvatarUrl: string) => {
    setAllUsers((prev) => {
      const updated = prev.map((u) => (u.id === userId ? { ...u, avatar: newAvatarUrl } : u));
      localStorage.setItem('kac_users_list', JSON.stringify(updated));
      return updated;
    });
  };

  // Content Admin check for stafkacpubdn@gmail.com and pubdnkac@gmail.com
  const isContentAdmin = isAuthorizedAdmin(currentUser.email);

  // Dynamic 50 Questions (Newbie, Runner, Master)
  const [questions50Newbie, setQuestions50Newbie] = useState<ReflectiveQuestionItem[]>(() => {
    const saved = localStorage.getItem('kac_questions_newbie');
    return saved ? JSON.parse(saved) : QUESTIONS_50;
  });

  const [questions50Runner, setQuestions50Runner] = useState<ReflectiveQuestionItem[]>(() => {
    const saved = localStorage.getItem('kac_questions_runner');
    return saved ? JSON.parse(saved) : RUNNER_QUESTIONS_50;
  });

  const [questions50Master, setQuestions50Master] = useState<ReflectiveQuestionItem[]>(() => {
    const saved = localStorage.getItem('kac_questions_master');
    return saved ? JSON.parse(saved) : MASTER_QUESTIONS_50;
  });

  const updateQuestions50 = (level: 'newbie' | 'runner' | 'master', questions: ReflectiveQuestionItem[]) => {
    if (level === 'newbie') {
      setQuestions50Newbie(questions);
      localStorage.setItem('kac_questions_newbie', JSON.stringify(questions));
    } else if (level === 'runner') {
      setQuestions50Runner(questions);
      localStorage.setItem('kac_questions_runner', JSON.stringify(questions));
    } else {
      setQuestions50Master(questions);
      localStorage.setItem('kac_questions_master', JSON.stringify(questions));
    }
  };

  // Global Announcement
  const [globalAnnouncement, setGlobalAnnouncementState] = useState<string>(() => {
    return (
      localStorage.getItem('kac_global_announcement') ||
      '📢 Program Akselerasi Pelatihan Komunikasi Terpadu Shaf 2 (ka01-ka14) Berjalan Aktif • Damai Sejahtera & Puji Tuan'
    );
  });

  const setGlobalAnnouncement = (text: string) => {
    setGlobalAnnouncementState(text);
    localStorage.setItem('kac_global_announcement', text);
  };

  // Lessons
  const [lessons, setLessons] = useState<Record<'newbie' | 'runner' | 'master', LessonContent>>(() => {
    const saved = localStorage.getItem('kac_lessons_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (
          !parsed.newbie?.flipbookUrl ||
          parsed.newbie.flipbookUrl.includes('communicator-basic') ||
          parsed.newbie.flipbookUrl.includes('84475c68c3')
        ) {
          parsed.newbie.flipbookUrl = 'https://heyzine.com/flip-book/c8cf26fe26.html';
        }
        if (
          !parsed.master?.flipbookUrl ||
          parsed.master.flipbookUrl.includes('communicator-basic') ||
          parsed.master.flipbookUrl.includes('84475c68c3')
        ) {
          parsed.master.flipbookUrl = 'https://heyzine.com/flip-book/02dcdf4956.html';
        }
        return parsed;
      } catch {
        return INITIAL_LESSONS;
      }
    }
    return INITIAL_LESSONS;
  });

  // Quizzes
  const [quizzes, setQuizzes] = useState<Record<'newbie' | 'runner' | 'master', QuizQuestion[]>>(() => {
    const saved = localStorage.getItem('kac_quizzes_config');
    return saved ? JSON.parse(saved) : INITIAL_QUIZZES;
  });

  // User Assessment Results (All 3 Tiers)
  const [userAssessmentResults, setUserAssessmentResults] = useState<Record<string, AssessmentResult | null>>(() => {
    const saved = localStorage.getItem(`kac_results_${currentUserId}`);
    if (saved) return JSON.parse(saved);

    // Initial baseline sample calculation for Newbie
    const newbieAnswers: Record<number, string> = {
      1: 'b', 2: 'a', 3: 'b', 4: 'b', 5: 'a', 6: 'b', 7: 'a', 8: 'b', 9: 'a', 10: 'b',
      11: 'b', 12: 'b', 13: 'b', 14: 'a', 15: 'b', 16: 'c', 17: 'b', 18: 'b', 19: 'a', 20: 'b',
      21: 'b', 22: 'b', 23: 'c', 24: 'b', 25: 'a', 26: 'b', 27: 'c', 28: 'b', 29: 'a', 30: 'b',
      31: 'c', 32: 'b', 33: 'b', 34: 'c', 35: 'b', 36: 'a', 37: 'b', 38: 'b', 39: 'b', 40: 'c',
      41: 'c', 42: 'b', 43: 'c', 44: 'b', 45: 'c', 46: 'b', 47: 'c', 48: 'b', 49: 'b', 50: 'a',
    };
    const newbieScored = calculateAssessmentScores(newbieAnswers);

    // Initial sample calculation for Runner
    const runnerAnswers: Record<number, string> = {
      1: 'a', 2: 'b', 3: 'a', 4: 'b', 5: 'b', 6: 'a', 7: 'b', 8: 'b', 9: 'a', 10: 'b',
      11: 'b', 12: 'a', 13: 'b', 14: 'b', 15: 'a', 16: 'b', 17: 'b', 18: 'b', 19: 'a', 20: 'a',
      21: 'b', 22: 'b', 23: 'a', 24: 'b', 25: 'b', 26: 'a', 27: 'b', 28: 'a', 29: 'b', 30: 'b',
      31: 'b', 32: 'a', 33: 'b', 34: 'b', 35: 'a', 36: 'a', 37: 'b', 38: 'b', 39: 'a', 40: 'b',
      41: 'b', 42: 'b', 43: 'a', 44: 'b', 45: 'b', 46: 'a', 47: 'b', 48: 'a', 49: 'b', 50: 'b',
    };
    const runnerScored = calculateRunnerScores(runnerAnswers);

    // Initial sample calculation for Master
    const masterAnswers: Record<number, string> = {
      1: 'a', 2: 'a', 3: 'b', 4: 'a', 5: 'b', 6: 'a', 7: 'a', 8: 'b', 9: 'a', 10: 'a',
      11: 'b', 12: 'a', 13: 'b', 14: 'a', 15: 'b', 16: 'a', 17: 'a', 18: 'b', 19: 'a', 20: 'a',
      21: 'a', 22: 'b', 23: 'a', 24: 'a', 25: 'b', 26: 'a', 27: 'a', 28: 'b', 29: 'a', 30: 'a',
      31: 'a', 32: 'b', 33: 'a', 34: 'a', 35: 'b', 36: 'a', 37: 'a', 38: 'b', 39: 'a', 40: 'a',
      41: 'a', 42: 'a', 43: 'b', 44: 'a', 45: 'b', 46: 'a', 47: 'a', 48: 'b', 49: 'a', 50: 'a',
    };
    const masterScored = calculateMasterScores(masterAnswers);

    return {
      newbie: {
        score: newbieScored.overallReadiness,
        totalQuestions: 50,
        passed: true,
        date: '2026-09-20',
        difficultyReached: 'Sedang',
        timeSpentSeconds: 420,
        feedback: newbieScored.personalMessage,
        dimensionScores: newbieScored.dimensionScores,
        answers: newbieAnswers,
        recommendations: newbieScored.recommendations,
        personalMessage: newbieScored.personalMessage,
        firstStep: newbieScored.firstStep,
        badges: ['Berani Memulai', 'Pesan Makin Jelas'],
      },
      runner: {
        score: runnerScored.overallReadiness,
        totalQuestions: 50,
        passed: true,
        date: '2026-10-02',
        difficultyReached: 'Sedang',
        timeSpentSeconds: 490,
        feedback: runnerScored.personalMessage,
        dimensionScores: runnerScored.dimensionScores,
        answers: runnerAnswers,
        recommendations: runnerScored.recommendations,
        personalMessage: runnerScored.personalMessage,
        firstStep: runnerScored.firstStep,
        badges: ['Penakluk Objeksi', 'Negosiator Tangkas'],
      },
      master: {
        score: masterScored.overallReadiness,
        totalQuestions: 50,
        passed: true,
        date: '2026-10-12',
        difficultyReached: 'Sulit',
        timeSpentSeconds: 540,
        feedback: masterScored.personalMessage,
        dimensionScores: masterScored.dimensionScores,
        answers: masterAnswers,
        recommendations: masterScored.recommendations,
        personalMessage: masterScored.personalMessage,
        firstStep: masterScored.firstStep,
        badges: ['Master Communicator', 'Arsitek Narasi', 'Pemimpin Krisis'],
      },
    };
  });

  // 21-Day Habit Tracking Programs (Alpha, Beta, Delta)
  const [habits21, setHabits21] = useState<DayHabit21[]>(() => {
    const saved = localStorage.getItem(`kac_habits21_${currentUserId}`);
    return saved ? JSON.parse(saved) : INITIAL_21_DAYS_HABIT;
  });

  const [habits21Runner, setHabits21Runner] = useState<DayHabit21[]>(() => {
    const saved = localStorage.getItem(`kac_habits21_runner_${currentUserId}`);
    return saved ? JSON.parse(saved) : INITIAL_RUNNER_21_DAYS_HABIT;
  });

  const [habits21Master, setHabits21Master] = useState<DayHabit21[]>(() => {
    const saved = localStorage.getItem(`kac_habits21_master_${currentUserId}`);
    return saved ? JSON.parse(saved) : INITIAL_MASTER_21_DAYS_HABIT;
  });

  const updateDayHabit21 = (day: number, status: DayHabit21['status'], note: string) => {
    setHabits21((prev) => {
      const updated = prev.map((item) =>
        item.day === day ? { ...item, status, note, date: new Date().toISOString().slice(0, 10) } : item
      );
      localStorage.setItem(`kac_habits21_${currentUserId}`, JSON.stringify(updated));
      return updated;
    });
    if (status === 'selesai') {
      triggerCelebration();
      addNotification('Tugas Alpha 21 Hari Tuntas! 🎉', `Hari ke-${day} berhasil diselesaikan dan dicatat.`, 'achievement');
    } else {
      addNotification('Kemajuan Disimpan', `Catatan hari ke-${day} telah diperbarui.`, 'info');
    }
  };

  const updateDayHabit21Runner = (day: number, status: DayHabit21['status'], note: string) => {
    setHabits21Runner((prev) => {
      const updated = prev.map((item) =>
        item.day === day ? { ...item, status, note, date: new Date().toISOString().slice(0, 10) } : item
      );
      localStorage.setItem(`kac_habits21_runner_${currentUserId}`, JSON.stringify(updated));
      return updated;
    });
    if (status === 'selesai') {
      triggerCelebration();
      addNotification('Tugas Beta Lapangan Tuntas! ⚡', `Hari ke-${day} berhasil diselesaikan di lapangan.`, 'achievement');
    } else {
      addNotification('Kemajuan Disimpan', `Catatan hari ke-${day} telah diperbarui.`, 'info');
    }
  };

  const updateDayHabit21Master = (day: number, status: DayHabit21['status'], note: string) => {
    setHabits21Master((prev) => {
      const updated = prev.map((item) =>
        item.day === day ? { ...item, status, note, date: new Date().toISOString().slice(0, 10) } : item
      );
      localStorage.setItem(`kac_habits21_master_${currentUserId}`, JSON.stringify(updated));
      return updated;
    });
    if (status === 'selesai') {
      triggerCelebration();
      addNotification('Tugas Delta Mentoring Tuntas! 👑', `Hari ke-${day} sesi mentoring berhasil dicatat.`, 'achievement');
    } else {
      addNotification('Kemajuan Disimpan', `Catatan hari ke-${day} telah diperbarui.`, 'info');
    }
  };

  const updateDayHabit21Template = (level: 'newbie' | 'runner' | 'master', updatedList: DayHabit21[]) => {
    if (level === 'newbie') {
      setHabits21(updatedList);
      localStorage.setItem(`kac_habits21_${currentUserId}`, JSON.stringify(updatedList));
    } else if (level === 'runner') {
      setHabits21Runner(updatedList);
      localStorage.setItem(`kac_habits21_runner_${currentUserId}`, JSON.stringify(updatedList));
    } else {
      setHabits21Master(updatedList);
      localStorage.setItem(`kac_habits21_master_${currentUserId}`, JSON.stringify(updatedList));
    }
    addNotification('Kurikulum Diperbarui', `Rangkaian tugas 21 Hari ${level.toUpperCase()} berhasil disimpan.`, 'success');
  };

  const resetAllContentToDefault = () => {
    setLessons(INITIAL_LESSONS);
    localStorage.removeItem('kac_lessons_config');
    setQuizzes(INITIAL_QUIZZES);
    localStorage.removeItem('kac_quizzes_config');
    setBullets(INITIAL_BULLETS);
    localStorage.removeItem('kac_bullets_config');
    setQuestions50Newbie(QUESTIONS_50);
    localStorage.removeItem('kac_questions_newbie');
    setQuestions50Runner(RUNNER_QUESTIONS_50);
    localStorage.removeItem('kac_questions_runner');
    setQuestions50Master(MASTER_QUESTIONS_50);
    localStorage.removeItem('kac_questions_master');
  };

  // Habits
  const [habits, setHabits] = useState<HabitItem[]>(() => {
    const saved = localStorage.getItem('kac_habits_config');
    return saved ? JSON.parse(saved) : INITIAL_HABITS;
  });

  // Bullets
  const [bullets, setBullets] = useState<Record<string, BulletModule>>(() => {
    const saved = localStorage.getItem('kac_bullets_config');
    return saved ? JSON.parse(saved) : INITIAL_BULLETS;
  });

  // IPOOI
  const [ipooiData, setIpooiData] = useState<IPOOIData>(() => {
    const saved = localStorage.getItem('kac_ipooi_config');
    return saved ? JSON.parse(saved) : INITIAL_IPOOI;
  });

  // Calendar
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(() => {
    const saved = localStorage.getItem('kac_calendar_events');
    return saved ? JSON.parse(saved) : INITIAL_CALENDAR_EVENTS;
  });

  // Forum
  const [forumPosts, setForumPosts] = useState<ForumPost[]>(() => {
    const saved = localStorage.getItem('kac_forum_posts');
    if (!saved) return INITIAL_FORUM_POSTS;
    try {
      const parsed: ForumPost[] = JSON.parse(saved);
      return parsed.map((p) => {
        let authorName = p.authorName;
        if (authorName.includes('Ust. Rachmat Hidayat') || authorName.includes('Rachmat Hidayat')) {
          authorName = authorName.replace(/Ust\.\s*Rachmat Hidayat/g, 'Bung Abram Hanif').replace(/Rachmat Hidayat/g, 'Bung Abram Hanif');
        }
        if (!authorName.startsWith('Bung ')) {
          authorName = `Bung ${authorName}`;
        }
        return { ...p, authorName };
      });
    } catch {
      return INITIAL_FORUM_POSTS;
    }
  });

  // Modals
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);
  const [showCompetitionModal, setShowCompetitionModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  // Toast Notifications
  const [notifications, setNotifications] = useState<ToastNotification[]>([
    {
      id: 'notif-1',
      title: 'Target Harian Selesai! 🎉',
      message: 'Alpha Habit Tracker telah terisi penuh untuk hari ini.',
      type: 'achievement',
      timestamp: '10m lalu',
    },
    {
      id: 'notif-2',
      title: 'Agenda Penting Mendatang',
      message: 'Evaluasi Mingguan KAC Pusat & Shaf 2 besok pukul 19:30 WIB.',
      type: 'reminder',
      timestamp: '1j lalu',
    },
    {
      id: 'notif-3',
      title: 'Streak Belajar 14 Hari! 🔥',
      message: 'Pertahankan konsistensi belajar Anda menuju predikat Master.',
      type: 'streak',
      timestamp: '3j lalu',
    },
  ]);

  // Sync theme to local storage and document element
  useEffect(() => {
    localStorage.setItem('kac_dark_mode', JSON.stringify(isDarkMode));
    localStorage.setItem('kac_theme_palette', themePalette);
    document.documentElement.setAttribute('data-theme', themePalette);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode, themePalette]);

  useEffect(() => {
    localStorage.setItem('kac_offline_mode', isOfflineMode ? 'true' : 'false');
  }, [isOfflineMode]);

  useEffect(() => {
    localStorage.setItem('kac_current_user_id', currentUserId);
  }, [currentUserId]);

  useEffect(() => {
    localStorage.setItem('kac_users_list', JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    localStorage.setItem('kac_lessons_config', JSON.stringify(lessons));
  }, [lessons]);

  useEffect(() => {
    localStorage.setItem('kac_quizzes_config', JSON.stringify(quizzes));
  }, [quizzes]);

  useEffect(() => {
    localStorage.setItem('kac_habits_config', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('kac_bullets_config', JSON.stringify(bullets));
  }, [bullets]);

  useEffect(() => {
    localStorage.setItem('kac_ipooi_config', JSON.stringify(ipooiData));
  }, [ipooiData]);

  useEffect(() => {
    localStorage.setItem('kac_calendar_events', JSON.stringify(calendarEvents));
  }, [calendarEvents]);

  useEffect(() => {
    localStorage.setItem('kac_forum_posts', JSON.stringify(forumPosts));
  }, [forumPosts]);

  // When switching user
  const switchUser = (userId: string) => {
    setCurrentUserId(userId);
    const saved = localStorage.getItem(`kac_results_${userId}`);
    if (saved) {
      setUserAssessmentResults(JSON.parse(saved));
    }

    const savedHabits21 = localStorage.getItem(`kac_habits21_${userId}`);
    if (savedHabits21) {
      setHabits21(JSON.parse(savedHabits21));
    }

    const savedHabits21Runner = localStorage.getItem(`kac_habits21_runner_${userId}`);
    if (savedHabits21Runner) {
      setHabits21Runner(JSON.parse(savedHabits21Runner));
    }

    const savedHabits21Master = localStorage.getItem(`kac_habits21_master_${userId}`);
    if (savedHabits21Master) {
      setHabits21Master(JSON.parse(savedHabits21Master));
    }

    const targetUser = allUsers.find((u) => u.id === userId);
    if (targetUser) {
      addNotification(
        'Akun Dialihkan',
        `Sekarang melihat data sebagai ${targetUser.unit} - ${targetUser.name}`,
        'info'
      );
    }
  };

  const addNotification = (title: string, message: string, type: ToastNotification['type'] = 'info') => {
    const newNotif: ToastNotification = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title,
      message,
      type,
      timestamp: 'Baru saja',
    };
    setNotifications((prev) => [newNotif, ...prev.slice(0, 9)]);
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#818cf8', '#34d399', '#fbbf24', '#f43f5e'],
      });
    } catch {
      // fallback
    }
  };

  const triggerCloudSync = async () => {
    setIsSyncing(true);
    try {
      const payload = {
        action: 'sync_all' as const,
        senderEmail: currentUser.email || 'stafkacpubdn@gmail.com',
        timestamp: new Date().toISOString(),
        data: {
          users: allUsers,
          activeUser: currentUser.id,
          syncedAt: new Date().toLocaleString('id-ID'),
        },
      };
      await sendToAppsScript(payload);
      const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
      setLastSyncedTime(`Sinkron: Google Sheets (${timeStr} WIB)`);
      addNotification('Sinkronisasi Google Sheets Berhasil', 'Data progres dan nilai 15 unit telah dipancarkan ke Google Sheets via Apps Script.', 'success');
    } catch {
      const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
      setLastSyncedTime(`Sinkron: Lokal (${timeStr} WIB)`);
    } finally {
      setIsSyncing(false);
    }
  };

  const updateLesson = (levelId: 'newbie' | 'runner' | 'master', updated: LessonContent) => {
    setLessons((prev) => ({ ...prev, [levelId]: updated }));
    addNotification('Dapur Setting: Materi Diperbarui', `Materi untuk ${updated.subtitle} berhasil disimpan.`, 'info');
  };

  const updateQuizzes = (levelId: 'newbie' | 'runner' | 'master', list: QuizQuestion[]) => {
    setQuizzes((prev) => ({ ...prev, [levelId]: list }));
    addNotification('Dapur Setting: Kuis Diperbarui', `Bank soal untuk ${levelId.toUpperCase()} diperbarui (${list.length} butir).`, 'info');
  };

  const saveAssessmentResult = (levelId: 'newbie' | 'runner' | 'master', result: AssessmentResult) => {
    setUserAssessmentResults((prev) => {
      const next = { ...prev, [levelId]: result };
      localStorage.setItem(`kac_results_${currentUserId}`, JSON.stringify(next));
      return next;
    });

    setAllUsers((prevUsers) =>
      prevUsers.map((u) => {
        if (u.id === currentUserId) {
          const addedXp = result.passed ? 350 : 100;
          const newLevel = result.passed && levelId === 'runner' ? Math.max(u.level, 2) : result.passed && levelId === 'master' ? 3 : u.level;
          const updatedClassProgress = {
            ...u.classProgress,
            [levelId]: {
              ...u.classProgress[levelId],
              passed: result.passed,
              score: result.score,
              completedAt: new Date().toISOString().slice(0, 10),
            },
          };
          return {
            ...u,
            totalXp: u.totalXp + addedXp,
            level: newLevel,
            comprehensionRate: Math.min(100, Math.round((u.comprehensionRate * 2 + result.score) / 3)),
            classProgress: updatedClassProgress,
          };
        }
        return u;
      })
    );

    if (result.passed) {
      triggerCelebration();
      addNotification('Selamat! Asesmen Lulus 🏆', `Anda meraih nilai ${result.score}% di tingkat ${levelId.toUpperCase()}!`, 'achievement');
    } else {
      addNotification('Asesmen Selesai', `Skor: ${result.score}%. Silakan pelajari kembali modul untuk memperkuat kompetensi.`, 'info');
    }

    // Auto-sync ke Google Sheets via Apps Script di latar belakang
    sendToAppsScript({
      action: 'save_assessment',
      senderUnit: currentUser.unit,
      senderEmail: currentUser.email,
      timestamp: new Date().toISOString(),
      data: {
        userId: currentUserId,
        userName: currentUser.name,
        userUnit: currentUser.unit,
        level: levelId,
        score: result.score,
        passed: result.passed,
        dimensionScores: result.dimensionScores,
        completedAt: new Date().toLocaleString('id-ID'),
      },
    }).catch(() => {});
  };

  const toggleHabit = (habitId: string) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === habitId) {
          const nextVal = !h.completedToday;
          const today = '2026-10-14';
          return {
            ...h,
            completedToday: nextVal,
            history: { ...h.history, [today]: nextVal },
          };
        }
        return h;
      })
    );
    addNotification('Habit Tracker Diperbarui', 'Pencatatan aktivitas harian Anda telah disimpan.', 'streak');
  };

  const updateHabitList = (newHabits: HabitItem[]) => {
    setHabits(newHabits);
    addNotification('Dapur Setting: Habit Tracker', 'Konfigurasi tracker Alpha, Beta, Delta berhasil diperbarui.', 'info');
  };

  const updateBulletModule = (id: string, module: BulletModule) => {
    setBullets((prev) => ({ ...prev, [id]: module }));
    addNotification('Dapur Setting: Bite The Bullets', `Modul ${module.title} berhasil diperbarui.`, 'info');
  };

  const updateIPOOI = (data: Partial<IPOOIData>) => {
    setIpooiData((prev) => ({ ...prev, ...data }));
    addNotification('Dapur Setting: Analitik IPOOI', 'Parameter metrik Input-Process-Output-Outcome-Impact berhasil disesuaikan.', 'info');
  };

  const addCalendarEvent = (event: Omit<CalendarEvent, 'id'>) => {
    const newEv: CalendarEvent = {
      ...event,
      id: `cal-${Date.now()}`,
    };
    setCalendarEvents((prev) => [newEv, ...prev]);
    addNotification('Agenda Ditambahkan', `${event.title} dijadwalkan pada ${event.date} pukul ${event.time} WIB.`, 'reminder');
  };

  const toggleEventCompleted = (id: string) => {
    setCalendarEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, completed: !e.completed } : e))
    );
  };

  const deleteCalendarEvent = (id: string) => {
    setCalendarEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const exportToICS = () => {
    const icsLines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//KAC Communicator Academy//ID',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
    ];
    calendarEvents.forEach((ev) => {
      const cleanDate = ev.date.replace(/-/g, '');
      const cleanTime = (ev.time || '10:00').replace(/:/g, '') + '00';
      icsLines.push('BEGIN:VEVENT');
      icsLines.push(`UID:${ev.id}@communicator.kac.org`);
      icsLines.push(`DTSTAMP:${cleanDate}T${cleanTime}Z`);
      icsLines.push(`DTSTART:${cleanDate}T${cleanTime}`);
      icsLines.push(`SUMMARY:${ev.title}`);
      icsLines.push(`DESCRIPTION:Prioritas: ${ev.urgency} | Kategori: ${ev.category} - KAC Communicator Academy`);
      icsLines.push('END:VEVENT');
    });
    icsLines.push('END:VCALENDAR');

    const blob = new Blob([icsLines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kac_agenda_${new Date().toISOString().slice(0, 10)}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addNotification('Ekspor Kalender Berhasil', 'File .ics siap diimpor ke Google Calendar atau Microsoft Outlook.', 'info');
  };

  const addForumPost = (title: string, content: string, category: ForumPost['category']) => {
    const newPost: ForumPost = {
      id: `post-${Date.now()}`,
      authorName: currentUser.name,
      authorUnit: currentUser.unit,
      authorAvatar: currentUser.avatar,
      timestamp: 'Baru saja',
      title,
      content,
      category,
      likes: 0,
      likedByMe: false,
      comments: [],
    };
    setForumPosts((prev) => [newPost, ...prev]);
    addNotification('Postingan Terbit', 'Pengalaman Anda telah dibagikan ke komunitas KAC & Shaf 2.', 'info');
  };

  const toggleLikePost = (postId: string) => {
    setForumPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const nextLiked = !p.likedByMe;
          return {
            ...p,
            likedByMe: nextLiked,
            likes: nextLiked ? p.likes + 1 : Math.max(0, p.likes - 1),
          };
        }
        return p;
      })
    );
  };

  const addCommentToPost = (postId: string, text: string) => {
    setForumPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [
              ...p.comments,
              {
                id: `c-${Date.now()}`,
                authorName: currentUser.name,
                authorUnit: currentUser.unit,
                text,
                timestamp: 'Baru saja',
              },
            ],
          };
        }
        return p;
      })
    );
  };

  const resetMenuConfig = (menuKey: string) => {
    if (menuKey === 'newbie' || menuKey === 'runner' || menuKey === 'master') {
      setLessons((prev) => ({ ...prev, [menuKey]: INITIAL_LESSONS[menuKey as 'newbie' | 'runner' | 'master'] }));
      setQuizzes((prev) => ({ ...prev, [menuKey]: INITIAL_QUIZZES[menuKey as 'newbie' | 'runner' | 'master'] }));
    } else if (menuKey === 'bullets') {
      setBullets(INITIAL_BULLETS);
    } else if (menuKey === 'habits') {
      setHabits(INITIAL_HABITS);
    } else if (menuKey === 'ipooi') {
      setIpooiData(INITIAL_IPOOI);
    } else if (menuKey === 'calendar') {
      setCalendarEvents(INITIAL_CALENDAR_EVENTS);
    }
    addNotification('Konfigurasi Direset', `Dapur setting untuk menu "${menuKey}" dikembalikan ke default tanpa mengganggu menu lain.`, 'info');
  };

  const exportAllSettingsBackup = () => {
    const backup = {
      timestamp: new Date().toISOString(),
      lessons,
      quizzes,
      habits,
      bullets,
      ipooiData,
      calendarEvents,
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kac_backup_dapur_setting_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addNotification('Backup Berhasil', 'Seluruh konfigurasi menu telah diekspor sebagai file JSON.', 'info');
  };

  const importSettingsBackup = (jsonStr: string): boolean => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.lessons) setLessons(data.lessons);
      if (data.quizzes) setQuizzes(data.quizzes);
      if (data.habits) setHabits(data.habits);
      if (data.bullets) setBullets(data.bullets);
      if (data.ipooiData) setIpooiData(data.ipooiData);
      if (data.calendarEvents) setCalendarEvents(data.calendarEvents);
      addNotification('Restorasi Sukses', 'Semua konfigurasi menu berhasil dimuat dari backup!', 'achievement');
      return true;
    } catch {
      addNotification('Gagal Impor', 'Format file backup JSON tidak valid.', 'reminder');
      return false;
    }
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        currentUser,
        switchUser,
        allUsers,
        isDarkMode,
        setIsDarkMode,
        themePalette,
        setThemePalette,
        isOfflineMode,
        setIsOfflineMode,
        isSyncing,
        triggerCloudSync,
        lastSyncedTime,
        lessons,
        updateLesson,
        quizzes,
        updateQuizzes,
        userAssessmentResults,
        saveAssessmentResult,
        habits,
        toggleHabit,
        updateHabitList,
        habits21,
        updateDayHabit21,
        habits21Runner,
        updateDayHabit21Runner,
        habits21Master,
        updateDayHabit21Master,
        bullets,
        updateBulletModule,
        ipooiData,
        updateIPOOI,
        calendarEvents,
        addCalendarEvent,
        toggleEventCompleted,
        deleteCalendarEvent,
        exportToICS,
        forumPosts,
        addForumPost,
        toggleLikePost,
        addCommentToPost,
        notifications,
        addNotification,
        triggerCelebration,
        resetMenuConfig,
        exportAllSettingsBackup,
        importSettingsBackup,
        showLeaderboardModal,
        setShowLeaderboardModal,
        showCompetitionModal,
        setShowCompetitionModal,
        showReportModal,
        setShowReportModal,
        updateUserProfilePicture,
        showProfileModal,
        setShowProfileModal,
        showGoogleSyncModal,
        setShowGoogleSyncModal,
        isContentAdmin,
        questions50Newbie,
        questions50Runner,
        questions50Master,
        updateQuestions50,
        updateDayHabit21Template,
        globalAnnouncement,
        setGlobalAnnouncement,
        resetAllContentToDefault,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
