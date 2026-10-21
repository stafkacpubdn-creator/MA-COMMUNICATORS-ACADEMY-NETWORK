import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { ExecutiveSummary } from './components/dashboard/ExecutiveSummary';
import { ParticipantProgressDashboard } from './components/dashboard/ParticipantProgressDashboard';
import { GraphicChartPie } from './components/dashboard/GraphicChartPie';
import { AnalyticIPOOI } from './components/dashboard/AnalyticIPOOI';
import { CalendarTaskManager } from './components/dashboard/CalendarTaskManager';
import { ClassDetailView } from './components/learning/ClassDetailView';
import { BiteTheBulletsView } from './components/bullets/BiteTheBulletsView';
import { AppearanceSettings } from './components/settings/AppearanceSettings';
import { PasswordSettings } from './components/settings/PasswordSettings';
import { DapurSetting } from './components/settings/DapurSetting';
import { CommunityForum } from './components/forum/CommunityForum';
import { CompetitionMode } from './components/gamification/CompetitionMode';
import { LeaderboardModal } from './components/gamification/LeaderboardModal';
import { ProgressReportModal } from './components/reports/ProgressReportModal';
import { ProfilePictureModal } from './components/profile/ProfilePictureModal';
import { LiveContentEditor } from './components/admin/LiveContentEditor';
import { GoogleIntegrationModal } from './components/sync/GoogleIntegrationModal';
import { ElevatorHabitLabView } from './components/elevatorLab/ElevatorHabitLabView';
import { InfografisPanduanView } from './components/infografis/InfografisPanduanView';
import { WifiOff, Sparkles, X, Megaphone, Menu, LayoutGrid, Target, Compass, Bot } from 'lucide-react';

const MainLayout: React.FC = () => {
  const {
    activeView,
    setActiveView,
    isOfflineMode,
    setIsOfflineMode,
    showProfileModal,
    setShowProfileModal,
    showGoogleSyncModal,
    setShowGoogleSyncModal,
    globalAnnouncement,
  } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dismissBanner, setDismissBanner] = useState(false);

  // Sync URL routes (/coach, /human, /lab)
  useEffect(() => {
    const handleLocation = () => {
      const path = (window.location.pathname || '').toLowerCase();
      const hash = (window.location.hash || '').toLowerCase();
      if (path.includes('/coach') || hash.includes('/coach')) {
        setActiveView('elevator_coach');
      } else if (path.includes('/human') || hash.includes('/human')) {
        setActiveView('elevator_human');
      } else if (path.includes('/lab') || hash.includes('/lab')) {
        setActiveView('elevator_habit_lab');
      }
    };
    handleLocation();
    window.addEventListener('popstate', handleLocation);
    window.addEventListener('hashchange', handleLocation);
    return () => {
      window.removeEventListener('popstate', handleLocation);
      window.removeEventListener('hashchange', handleLocation);
    };
  }, [setActiveView]);

  // Render view router
  const renderView = () => {
    switch (activeView) {
      case 'dashboard_executive':
        return (
          <div className="space-y-6">
            <ExecutiveSummary />
            <CalendarTaskManager />
          </div>
        );
      case 'dashboard_peserta':
        return <ParticipantProgressDashboard />;
      case 'dashboard_graphic':
        return <GraphicChartPie />;
      case 'dashboard_ipooi':
        return (
          <div className="space-y-6">
            <AnalyticIPOOI />
            <CalendarTaskManager />
          </div>
        );

      // NEWBIE (Know How - Base KPI A)
      case 'newbie_materi':
        return <ClassDetailView levelId="newbie" subTab="materi" />;
      case 'newbie_assessment':
        return <ClassDetailView levelId="newbie" subTab="assessment" />;
      case 'newbie_result':
        return <ClassDetailView levelId="newbie" subTab="result" />;
      case 'newbie_cta':
        return <ClassDetailView levelId="newbie" subTab="cta" />;

      // RUNNER (Do How - Stair KPI B)
      case 'runner_materi':
        return <ClassDetailView levelId="runner" subTab="materi" />;
      case 'runner_assessment':
        return <ClassDetailView levelId="runner" subTab="assessment" />;
      case 'runner_result':
        return <ClassDetailView levelId="runner" subTab="result" />;
      case 'runner_cta':
        return <ClassDetailView levelId="runner" subTab="cta" />;

      // MASTER (Show How - Roof KPI C)
      case 'master_materi':
        return <ClassDetailView levelId="master" subTab="materi" />;
      case 'master_assessment':
        return <ClassDetailView levelId="master" subTab="assessment" />;
      case 'master_result':
        return <ClassDetailView levelId="master" subTab="result" />;
      case 'master_cta':
        return <ClassDetailView levelId="master" subTab="cta" />;

      // BITE THE BULLETS
      case 'bullet_elevator':
        return <BiteTheBulletsView bulletId="elevator-pitch" />;
      case 'bullet_pra':
        return <BiteTheBulletsView bulletId="pra-pengabaran" />;
      case 'bullet_pengabaran':
        return <BiteTheBulletsView bulletId="materi-pengabaran" />;
      case 'bullet_pembinaan':
        return <BiteTheBulletsView bulletId="materi-pembinaan" />;
      case 'bullet_aora':
        return <BiteTheBulletsView bulletId="aora" />;

      // ELEVATOR PITCH HABIT LAB (21-DAY HABIT LAB & AI/HUMAN COACHING)
      case 'elevator_habit_lab':
        return <ElevatorHabitLabView initialTab="beranda" />;
      case 'elevator_coach':
        return <ElevatorHabitLabView initialTab="studio" />;
      case 'elevator_human':
        return <ElevatorHabitLabView initialTab="review" />;

      // COMMUNITY & FORUM
      case 'forum_komunitas':
        return <CommunityForum />;

      // SETTINGS
      case 'setting_tampilan':
        return <AppearanceSettings />;
      case 'setting_password':
        return <PasswordSettings />;
      case 'setting_member_admin':
        return <DapurSetting />;
      case 'setting_content_editor':
        return <LiveContentEditor />;

      // INFOGRAFIS & PANDUAN EKOSISTEM
      case 'panduan_infografis':
        return <InfografisPanduanView />;

      default:
        return <ExecutiveSummary />;
    }
  };

  return (
    <div className="flex h-screen w-full font-sans overflow-hidden transition-colors duration-200">
      {/* Permanent Desktop Sidebar */}
      <div className="hidden lg:block shrink-0 h-full">
        <Sidebar />
      </div>

      {/* Mobile Slide-Over Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-10 w-80 max-w-[85vw] h-full shadow-2xl flex flex-col">
            <Sidebar onCloseMobile={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <Navbar onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />

        {/* Global Announcement Marquee / Banner (if set) */}
        {globalAnnouncement && !dismissBanner && (
          <div className="bg-gradient-to-r from-sky-600 via-indigo-600 to-sky-700 text-white px-4 py-2 text-xs flex items-center justify-between shadow-sm border-b border-sky-400/30">
            <div className="flex items-center space-x-2.5 truncate">
              <Megaphone className="w-4 h-4 text-amber-300 shrink-0 animate-bounce" />
              <span className="truncate font-medium">{globalAnnouncement}</span>
            </div>
            <button
              onClick={() => setDismissBanner(true)}
              className="p-1 rounded-lg hover:bg-white/20 text-white/80 hover:text-white shrink-0 ml-2"
              title="Tutup banner sementara"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Offline Mode Alert Banner (if active) */}
        {isOfflineMode && (
          <div className="bg-amber-500/20 text-amber-900 dark:text-amber-200 border-b border-amber-500/30 px-4 py-2 text-xs flex items-center justify-between transition-all">
            <div className="flex items-center space-x-2">
              <WifiOff className="w-4 h-4 text-amber-500 animate-pulse" />
              <span>
                <strong>Mode Luring Aktif:</strong> Materi pembelajaran, modul kuis, dan habit tracker tersimpan lokal di perangkat Anda. Akses 100% tanpa jaringan internet.
              </span>
            </div>
            <button
              onClick={() => setIsOfflineMode(false)}
              className="text-amber-700 dark:text-amber-300 font-bold underline text-[11px]"
            >
              Kembali Online
            </button>
          </div>
        )}

        {/* Dynamic Route Body */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto pb-24 lg:pb-12">
            {renderView()}
          </div>
        </main>
      </div>

      {/* Mobile Floating Thumb Navigation Bar (Always Accessible on Smartphone) */}
      <div className="lg:hidden fixed bottom-3 left-3 right-3 z-40 pointer-events-auto">
        <div className="bg-[#0c1421]/95 backdrop-blur-xl border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.6)] rounded-2xl px-3 py-2 flex items-center justify-between text-white">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs shadow-sm active:scale-95 transition-all cursor-pointer"
            aria-label="Buka Menu Sidebar"
          >
            <Menu className="w-4 h-4 text-white" />
            <span className="tracking-wide">Menu Sidebar</span>
          </button>

          <div className="flex items-center space-x-1">
            <button
              type="button"
              onClick={() => setActiveView('dashboard_executive')}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                activeView === 'dashboard_executive'
                  ? 'bg-sky-500/30 text-sky-300 border border-sky-400/40'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
              title="Dashboard Eksekutif"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setActiveView('elevator_habit_lab')}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                activeView === 'elevator_habit_lab'
                  ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-400/40'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
              title="21-Day Habit Lab"
            >
              <Target className="w-4 h-4 text-emerald-400" />
            </button>
            <button
              type="button"
              onClick={() => setActiveView('elevator_coach')}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                activeView === 'elevator_coach'
                  ? 'bg-purple-500/30 text-purple-300 border border-purple-400/40'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
              title="AI Coach Studio"
            >
              <Bot className="w-4 h-4 text-purple-400" />
            </button>
            <button
              type="button"
              onClick={() => setActiveView('bullet_elevator')}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                activeView === 'bullet_elevator'
                  ? 'bg-rose-500/30 text-rose-300 border border-rose-400/40'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
              title="Elevator Pitch Flipbook"
            >
              <Compass className="w-4 h-4 text-rose-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Global Interactive Modals */}
      <CompetitionMode />
      <LeaderboardModal />
      <ProgressReportModal />
      <ProfilePictureModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
      <GoogleIntegrationModal
        isOpen={showGoogleSyncModal}
        onClose={() => setShowGoogleSyncModal(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
