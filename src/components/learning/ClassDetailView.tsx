import React, { useState } from 'react';
import {
  FileText,
  CircleDot,
  Award,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  Volume2,
  Target,
  ChevronRight,
  Crown,
  Edit3,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BasicAssessment50 } from './BasicAssessment50';
import { IntermediateAssessment50 } from './IntermediateAssessment50';
import { AdvanceAssessment50 } from './AdvanceAssessment50';
import { NewbieResultView } from './NewbieResultView';
import { RunnerResultView } from './RunnerResultView';
import { MasterResultView } from './MasterResultView';
import { HabitProgram21Days } from './HabitProgram21Days';
import { RunnerHabitProgram21Days } from './RunnerHabitProgram21Days';
import { MasterHabitProgram21Days } from './MasterHabitProgram21Days';
import { FlipbookButton } from './FlipbookButton';
import { FlipbookArsipCard } from './FlipbookArsipCard';
import { KomunikasiDasarButton } from './KomunikasiDasarButton';
import { TaktikLapanganButton } from './TaktikLapanganButton';
import { KepemimpinanStrategisButton } from './KepemimpinanStrategisButton';

interface ClassDetailViewProps {
  levelId: 'newbie' | 'runner' | 'master';
  subTab: 'materi' | 'assessment' | 'result' | 'cta';
}

export const ClassDetailView: React.FC<ClassDetailViewProps> = ({ levelId, subTab }) => {
  const { lessons, currentUser, setActiveView, addNotification, isContentAdmin } = useApp();
  const lesson = lessons[levelId];

  const [showEmbedNewbie, setShowEmbedNewbie] = useState<boolean>(false);
  const [showEmbedRunner, setShowEmbedRunner] = useState<boolean>(false);
  const [showEmbedMaster, setShowEmbedMaster] = useState<boolean>(false);

  const getSubTabTitle = (tab: 'materi' | 'assessment' | 'result' | 'cta') => {
    if (levelId === 'newbie') {
      if (tab === 'assessment') return 'Basic Assessment (50 Soal)';
      if (tab === 'materi') return 'Materi Teoritis & Base KPI A';
      if (tab === 'result') return 'Level 1 Result';
      return '1st CTA (Alpha Role Play)';
    }
    if (levelId === 'runner') {
      if (tab === 'assessment') return 'Intermediate Assessment (50 Soal Taktis)';
      if (tab === 'materi') return 'Materi Praktis & Stair KPI B';
      if (tab === 'result') return 'Level 2 Result';
      return '2nd CTA (Beta Role Play 21 Hari)';
    }
    // master
    if (tab === 'assessment') return 'Advance Assessment (50 Soal Strategis)';
    if (tab === 'materi') return 'Materi Strategis & Roof KPI C';
    if (tab === 'result') return 'Level 3 Result';
    return '3rd CTA (Delta Role Play 21 Hari)';
  };

  const getLevelColor = () => {
    if (levelId === 'newbie') return 'from-sky-500 to-indigo-600';
    if (levelId === 'runner') return 'from-indigo-500 to-purple-600';
    return 'from-purple-500 to-amber-500';
  };

  return (
    <div className="space-y-6">
      {/* Level Header Sub-Navigation */}
      <div className="p-5 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider mb-1">
            <span className={`px-2 py-0.5 rounded-md text-white bg-gradient-to-r ${getLevelColor()}`}>
              {lesson.kpiCode}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 dark:text-slate-300">Target: {lesson.kpiTarget}</span>
          </div>
          <h2 className="text-lg md:text-xl font-black text-slate-800 dark:text-white">
            {lesson.subtitle}
          </h2>
        </div>

        {/* 4 Sub-Tabs switcher buttons (Luxury Minimalist Segmented Control) */}
        <div className="flex flex-wrap items-center gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-xs">
          <button
            type="button"
            onClick={() => setActiveView(`${levelId}_materi` as any)}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
              subTab === 'materi'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/10'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{getSubTabTitle('materi')}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveView(`${levelId}_assessment` as any)}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
              subTab === 'assessment'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/10'
            }`}
          >
            <CircleDot className="w-3.5 h-3.5" />
            <span>{getSubTabTitle('assessment')}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveView(`${levelId}_result` as any)}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
              subTab === 'result'
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/10'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>{getSubTabTitle('result')}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveView(`${levelId}_cta` as any)}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
              subTab === 'cta'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/10'
            }`}
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>{getSubTabTitle('cta')}</span>
          </button>

          {isContentAdmin && (
            <button
              onClick={() => setActiveView('setting_content_editor')}
              className="px-2.5 py-1.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 text-purple-600 dark:text-purple-300 font-bold border border-purple-500/30 flex items-center space-x-1.5 transition-all text-xs cursor-pointer shadow-sm ml-1"
              title="Edit Silabus & Soal Ini Tanpa Coding"
            >
              <Edit3 className="w-3.5 h-3.5 text-purple-500" />
              <span>Edit Konten</span>
            </button>
          )}
        </div>
      </div>

      {/* ================= TAB 1: MATERI & KPI ================= */}
      {subTab === 'materi' && (
        <div className="space-y-6">
          {/* NEWBIE MATERI (KNOW HOW) BUTTONS & EMBED VIEWER */}
          {levelId === 'newbie' && (
            <div className="space-y-4">
              <FlipbookButton
                href="https://heyzine.com/flip-book/c8cf26fe26.html"
                title="Flipbook Interaktif Materi Know How"
                subtitle="COMMUNICATOR SKILL - MATERI KNOW HOW"
                buttonText="OPEN FLIPBOOK KNOW HOW"
                colorVariant="green"
                badgeText="ARSIP DOKUMEN SUMBER"
                description="Klik tombol hijau di samping untuk membuka modul referensi publikasi digital Know How langsung di halaman ini."
                modalTitle="Flipbook Know How - Communicator Basic"
                onOpenInPage={() => setShowEmbedNewbie((prev) => !prev)}
                isOpenInPage={showEmbedNewbie}
              />
              <FlipbookArsipCard
                id="flipbook-card-newbie"
                url="https://heyzine.com/flip-book/c8cf26fe26.html"
                moduleName="Materi Know How (Base KPI A)"
                colorTheme="emerald"
                tagline="Indeks resmi menuju publikasi digital Communicator Skill - Materi Know How"
                showEmbedFrame={showEmbedNewbie}
                onToggleEmbed={() => setShowEmbedNewbie((prev) => !prev)}
              />
              <KomunikasiDasarButton />
            </div>
          )}

          {/* RUNNER MATERI (DO HOW) BUTTONS & EMBED VIEWER */}
          {levelId === 'runner' && (
            <div className="space-y-4">
              <FlipbookButton
                href={lesson.flipbookUrl || 'https://heyzine.com/flip-book/84475c68c3.html'}
                title="Flipbook Interaktif Materi Do How"
                subtitle="COMMUNICATOR SKILL - MATERI DO HOW"
                buttonText="OPEN FLIPBOOK DO HOW"
                colorVariant="purple"
                badgeText="ARSIP DOKUMEN SUMBER"
                description="Klik tombol ungu di samping untuk membuka modul referensi praktis lapangan langsung di halaman ini."
                modalTitle="Flipbook Do How - Communicator Runner"
                onOpenInPage={() => setShowEmbedRunner((prev) => !prev)}
                isOpenInPage={showEmbedRunner}
              />
              <FlipbookArsipCard
                id="flipbook-card-runner"
                url={lesson.flipbookUrl || 'https://heyzine.com/flip-book/84475c68c3.html'}
                moduleName="Materi Do How (Stair KPI B)"
                colorTheme="purple"
                tagline="Indeks resmi menuju publikasi digital Communicator Skill - Materi Do How"
                showEmbedFrame={showEmbedRunner}
                onToggleEmbed={() => setShowEmbedRunner((prev) => !prev)}
              />
              <TaktikLapanganButton />
            </div>
          )}

          {/* MASTER MATERI (SHOW HOW) BUTTONS & EMBED VIEWER */}
          {levelId === 'master' && (
            <div className="space-y-4">
              <FlipbookButton
                href="https://heyzine.com/flip-book/02dcdf4956.html"
                title="Flipbook Interaktif Materi Show How"
                subtitle="COMMUNICATOR SKILL - MATERI SHOW HOW"
                buttonText="OPEN FLIPBOOK SHOW HOW"
                colorVariant="purple"
                badgeText="ARSIP DOKUMEN SUMBER"
                description="Klik tombol di samping untuk membuka modul referensi kepemimpinan strategis Show How langsung di halaman ini."
                modalTitle="Flipbook Show How - Communicator Master"
                onOpenInPage={() => setShowEmbedMaster((prev) => !prev)}
                isOpenInPage={showEmbedMaster}
              />
              <FlipbookArsipCard
                id="flipbook-card-master"
                url="https://heyzine.com/flip-book/02dcdf4956.html"
                moduleName="Materi Show How (Roof KPI C)"
                colorTheme="amber"
                tagline="Indeks resmi menuju publikasi digital Communicator Skill - Materi Show How"
                showEmbedFrame={showEmbedMaster}
                onToggleEmbed={() => setShowEmbedMaster((prev) => !prev)}
              />
              <KepemimpinanStrategisButton />
            </div>
          )}

          {/* Adaptive Reading Bar */}
          <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2 text-sky-600 dark:text-sky-300 font-semibold">
              <Zap className="w-4 h-4 text-sky-400" />
              <span>
                Mode Pembacaan Adaptif: <strong className="text-white bg-sky-500 px-2 py-0.5 rounded-md">{currentUser.adaptiveSpeed}</strong>
              </span>
              <span className="text-slate-400 hidden md:inline">• Estimasi: {lesson.estimatedMinutes} menit</span>
            </div>
            <button
              onClick={() => {
                addNotification('Audio Narasi Aktif', `Mendengarkan intisari ${lesson.title} secara otomatis.`, 'info');
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-white/10 hover:bg-slate-50 dark:hover:bg-white/20 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 font-medium"
            >
              <Volume2 className="w-3.5 h-3.5 text-sky-400" />
              <span>Simulasi Narasi Audio</span>
            </button>
          </div>

          {/* Sections List */}
          <div className="space-y-4">
            {lesson.sections.map((sec, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-3"
              >
                <h3 className="text-base md:text-lg font-bold text-slate-800 dark:text-white flex items-center space-x-2">
                  <span className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center text-xs font-black">
                    0{idx + 1}
                  </span>
                  <span>{sec.heading}</span>
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {sec.body}
                </p>
                {sec.callout && (
                  <div className="p-3.5 rounded-2xl bg-amber-500/10 border-l-4 border-amber-500 text-xs text-amber-800 dark:text-amber-200 italic">
                    {sec.callout}
                  </div>
                )}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#12223a] border border-slate-100 dark:border-white/5 flex items-center space-x-2 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    Kunci Pemahaman: {sec.keyTakeaway}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Practical Examples */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-3">
            <h4 className="font-bold text-slate-800 dark:text-white text-sm flex items-center space-x-2">
              <Target className="w-4 h-4 text-rose-400" />
              <span>Studi Kasus & Skenario Lapangan Shaf 2 ({levelId.toUpperCase()})</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {lesson.practicalExamples.map((ex, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed"
                >
                  <span className="font-bold text-sky-500 block mb-1">Kasus #{i + 1}</span>
                  {ex}
                </div>
              ))}
            </div>
            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setActiveView(`${levelId}_assessment` as any)}
                className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs shadow-md shadow-sky-500/25 flex items-center space-x-2 transition-all hover:scale-105"
              >
                <span>Uji Pemahaman: Ikuti Asesmen 50 Soal</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: 50 SOAL ADAPTIVE ASSESSMENT ================= */}
      {subTab === 'assessment' && (
        levelId === 'newbie' ? (
          <BasicAssessment50 onComplete={() => setActiveView('newbie_result')} />
        ) : levelId === 'runner' ? (
          <IntermediateAssessment50 onComplete={() => setActiveView('runner_result')} />
        ) : (
          <AdvanceAssessment50 onComplete={() => setActiveView('master_result')} />
        )
      )}

      {/* ================= TAB 3: ACHIEVEMENT & RESULT ================= */}
      {subTab === 'result' && (
        levelId === 'newbie' ? (
          <NewbieResultView
            onStart21Days={() => setActiveView('newbie_cta')}
            onRetake={() => setActiveView('newbie_assessment')}
          />
        ) : levelId === 'runner' ? (
          <RunnerResultView
            onStart21Days={() => setActiveView('runner_cta')}
            onRetake={() => setActiveView('runner_assessment')}
          />
        ) : (
          <MasterResultView
            onStart21Days={() => setActiveView('master_cta')}
            onRetake={() => setActiveView('master_assessment')}
          />
        )
      )}

      {/* ================= TAB 4: CALL TO ACTION & 21 DAYS PROGRAM ================= */}
      {subTab === 'cta' && (
        levelId === 'newbie' ? (
          <HabitProgram21Days />
        ) : levelId === 'runner' ? (
          <RunnerHabitProgram21Days />
        ) : (
          <MasterHabitProgram21Days />
        )
      )}
    </div>
  );
};
