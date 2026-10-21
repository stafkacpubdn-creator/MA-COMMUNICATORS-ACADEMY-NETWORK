import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Edit3,
  Save,
  RotateCcw,
  Download,
  Upload,
  Plus,
  Trash2,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  Calendar,
  Layers,
  Megaphone,
  Eye,
  Sparkles,
  ArrowRight,
  Lock,
  UserCheck,
  ChevronRight,
  Sliders,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LessonContent, BulletModule, DayHabit21 } from '../../types';
import { AUTHORIZED_CONTENT_ADMINS } from '../../data/initialData';

export const LiveContentEditor: React.FC = () => {
  const {
    currentUser,
    allUsers,
    switchUser,
    lessons,
    updateLesson,
    bullets,
    updateBulletModule,
    habits21,
    habits21Runner,
    habits21Master,
    updateDayHabit21Template,
    questions50Newbie,
    questions50Runner,
    questions50Master,
    updateQuestions50,
    globalAnnouncement,
    setGlobalAnnouncement,
    addNotification,
    triggerCelebration,
    resetAllContentToDefault,
  } = useApp();

  // Check authorization
  const userEmail = currentUser.email?.trim().toLowerCase() || '';
  const isAuthorized = AUTHORIZED_CONTENT_ADMINS.map((e) => e.toLowerCase()).includes(userEmail);

  // Active Editor Sub-tab
  const [activeTab, setActiveTab] = useState<
    'materi' | 'soal' | 'habits' | 'bullets' | 'broadcast'
  >('materi');

  // Selected level for materi, soal, habits
  const [selectedLevel, setSelectedLevel] = useState<'newbie' | 'runner' | 'master'>('newbie');

  // Selected bullet module
  const [selectedBulletId, setSelectedBulletId] = useState<string>('elevator-pitch');

  // Filter for questions dimension
  const [dimensionFilter, setDimensionFilter] = useState<string>('all');

  // Local state for draft editing
  const [draftLesson, setDraftLesson] = useState<LessonContent>(lessons[selectedLevel]);
  const [draftAnnouncement, setDraftAnnouncement] = useState(globalAnnouncement);
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);

  // Sync draft lesson when level changes
  React.useEffect(() => {
    setDraftLesson(lessons[selectedLevel]);
  }, [selectedLevel, lessons]);

  // If user is not authorized, render clear security lockout view
  if (!isAuthorized) {
    const adminUserPusat = allUsers.find((u) => u.email === 'stafkacpubdn@gmail.com');
    const adminUserPubdn = allUsers.find((u) => u.email === 'pubdnkac@gmail.com');

    return (
      <div className="max-w-3xl mx-auto py-8 px-4 space-y-6 animate-fadeIn">
        <div className="p-8 rounded-3xl bg-white dark:bg-[#172b47] border border-rose-200 dark:border-rose-500/20 shadow-xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-3xl bg-rose-500/10 text-rose-500 mx-auto flex items-center justify-center ring-8 ring-rose-500/5">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="text-xl font-black text-slate-800 dark:text-white">
              Akses Dibatasi: Dapur Edit Konten Live
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Fitur <strong>Edit Konten Langsung Tanpa Coding</strong> memiliki hak istimewa tinggi untuk memodifikasi silabus, butir soal reflektif, dan program 21 hari. Fitur ini hanya dapat diakses oleh Administrator Resmi KAC.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/5 max-w-md mx-auto text-left text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span>Akun Aktif Anda:</span>
              <span className="font-semibold text-slate-800 dark:text-white">{currentUser.name}</span>
            </div>
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span>Email:</span>
              <span className="font-mono font-bold text-rose-500">{currentUser.email || 'Tidak terdaftar'}</span>
            </div>
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span>Unit:</span>
              <span>{currentUser.unit}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 dark:border-white/5 text-[11px] text-slate-500">
              <strong>Admin Terotorisasi:</strong>
              <div className="mt-1 space-y-0.5 font-mono text-[11px] text-sky-600 dark:text-sky-400">
                <div>• stafkacpubdn@gmail.com (Bung Abram Hanif)</div>
                <div>• pubdnkac@gmail.com (Bung Ihsan Wicaksono)</div>
              </div>
            </div>
          </div>

          {/* Quick switcher buttons to authorized admin profiles for testing */}
          <div className="pt-2 space-y-2 max-w-md mx-auto">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Beralih ke Akun Administrator Terotorisasi:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {adminUserPusat && (
                <button
                  onClick={() => {
                    switchUser(adminUserPusat.id);
                    addNotification('Akses Terbuka', 'Beralih ke stafkacpubdn@gmail.com', 'success');
                  }}
                  className="p-3 rounded-2xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 dark:text-sky-300 border border-sky-500/30 text-xs font-bold transition-all text-left flex items-center space-x-2"
                >
                  <UserCheck className="w-4 h-4 shrink-0 text-sky-500" />
                  <div className="truncate">
                    <div className="font-bold">stafkacpubdn@gmail.com</div>
                    <div className="text-[10px] opacity-80">Bung Abram Hanif</div>
                  </div>
                </button>
              )}

              {adminUserPubdn && (
                <button
                  onClick={() => {
                    switchUser(adminUserPubdn.id);
                    addNotification('Akses Terbuka', 'Beralih ke pubdnkac@gmail.com', 'success');
                  }}
                  className="p-3 rounded-2xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 border border-indigo-500/30 text-xs font-bold transition-all text-left flex items-center space-x-2"
                >
                  <UserCheck className="w-4 h-4 shrink-0 text-indigo-500" />
                  <div className="truncate">
                    <div className="font-bold">pubdnkac@gmail.com</div>
                    <div className="text-[10px] opacity-80">Bung Ihsan Wicaksono</div>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle saving lesson
  const handleSaveLesson = () => {
    updateLesson(selectedLevel, draftLesson);
    addNotification(
      'Materi Berhasil Diperbarui',
      `Konten materi ${selectedLevel.toUpperCase()} Class berhasil diperbarui dan aktif secara langsung!`,
      'success'
    );
    triggerCelebration();
  };

  // Handle adding section to lesson
  const handleAddLessonSection = () => {
    setDraftLesson({
      ...draftLesson,
      sections: [
        ...draftLesson.sections,
        {
          heading: 'Bagian Materi Baru',
          body: 'Tuliskan paragraf penjelasan materi di sini secara lugas dan komprehensif.',
          callout: 'Tips Tambahan Lapangan',
          keyTakeaway: 'Poin utama yang harus diingat peserta.',
        },
      ],
    });
  };

  // Handle removing section from lesson
  const handleRemoveLessonSection = (index: number) => {
    if (draftLesson.sections.length <= 1) {
      addNotification('Peringatan', 'Minimal harus ada 1 bagian materi.', 'warning');
      return;
    }
    const updated = [...draftLesson.sections];
    updated.splice(index, 1);
    setDraftLesson({ ...draftLesson, sections: updated });
  };

  // Handle updating question statement
  const handleQuestionChange = (
    level: 'newbie' | 'runner' | 'master',
    id: number,
    newStatement: string
  ) => {
    const targetList =
      level === 'newbie'
        ? [...questions50Newbie]
        : level === 'runner'
        ? [...questions50Runner]
        : [...questions50Master];

    const idx = targetList.findIndex((q) => q.id === id);
    if (idx !== -1) {
      targetList[idx] = { ...targetList[idx], statement: newStatement };
      updateQuestions50(level, targetList);
    }
  };

  // Current questions list
  const currentQuestions =
    selectedLevel === 'newbie'
      ? questions50Newbie
      : selectedLevel === 'runner'
      ? questions50Runner
      : questions50Master;

  const filteredQuestions =
    dimensionFilter === 'all'
      ? currentQuestions
      : currentQuestions.filter((q) => q.dimensionId === dimensionFilter);

  // Current habits list
  const currentHabits =
    selectedLevel === 'newbie'
      ? habits21
      : selectedLevel === 'runner'
      ? habits21Runner
      : habits21Master;

  // Handle habit day update
  const handleHabitDayEdit = (
    dayIndex: number,
    field: 'focus' | 'lightTask' | 'proofType',
    value: string
  ) => {
    const updated = [...currentHabits];
    updated[dayIndex] = { ...updated[dayIndex], [field]: value };
    updateDayHabit21Template(selectedLevel, updated);
  };

  // Current bullet
  const currentBullet = bullets[selectedBulletId] || Object.values(bullets)[0];

  // Export full JSON backup
  const handleExportBackup = () => {
    const fullBackup = {
      version: '2.0',
      exportedAt: new Date().toISOString(),
      admin: currentUser.email,
      lessons,
      bullets,
      habits21,
      habits21Runner,
      habits21Master,
      questions50Newbie,
      questions50Runner,
      questions50Master,
      globalAnnouncement,
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `KAC_Content_Backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    addNotification('Ekspor Berhasil', 'File cadangan JSON konten telah diunduh.', 'success');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 animate-fadeIn">
      {/* Top Admin Action Bar */}
      <div className="p-5 md:p-6 rounded-3xl bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-700 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-black tracking-wider uppercase flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>Admin Terotorisasi</span>
            </span>
            <span className="text-xs text-sky-200 font-mono">
              {currentUser.email}
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-black tracking-tight flex items-center space-x-2">
            <span>Dapur Edit Konten Live (Tanpa Coding)</span>
            <Sparkles className="w-5 h-5 text-amber-300" />
          </h1>
          <p className="text-xs text-white/80 max-w-2xl leading-relaxed">
            Perbarui silabus materi belajar, 50 butir kuesioner reflektif, program kebiasaan 21 hari, dan modul Bite The Bullets secara instan tanpa perlu menyentuh kode.
          </p>
        </div>

        {/* Global Toolbar Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowPreviewModal(true)}
            className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-semibold backdrop-blur-sm transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <Eye className="w-4 h-4 text-sky-200" />
            <span>Pratinjau Live</span>
          </button>
          <button
            onClick={handleExportBackup}
            className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-semibold backdrop-blur-sm transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4 text-emerald-200" />
            <span>Ekspor JSON</span>
          </button>
          <button
            onClick={() => {
              if (window.confirm('Kembalikan seluruh materi dan butir soal ke setelan default awal?')) {
                resetAllContentToDefault();
                addNotification('Reset Berhasil', 'Konten telah dikembalikan ke standar awal.', 'info');
              }
            }}
            className="px-3 py-2 rounded-xl bg-white/10 hover:bg-rose-500/40 text-white text-xs font-medium backdrop-blur-sm transition-all flex items-center space-x-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Bawaan</span>
          </button>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex items-center space-x-1 bg-white dark:bg-[#172b47] p-1.5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('materi')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold whitespace-nowrap transition-all ${
            activeTab === 'materi'
              ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>1. Materi & Modul Kelas</span>
        </button>

        <button
          onClick={() => setActiveTab('soal')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold whitespace-nowrap transition-all ${
            activeTab === 'soal'
              ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>2. Bank Soal 50 Butir</span>
        </button>

        <button
          onClick={() => setActiveTab('habits')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold whitespace-nowrap transition-all ${
            activeTab === 'habits'
              ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>3. Kurikulum 21 Hari</span>
        </button>

        <button
          onClick={() => setActiveTab('bullets')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold whitespace-nowrap transition-all ${
            activeTab === 'bullets'
              ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>4. Bite The Bullets</span>
        </button>

        <button
          onClick={() => setActiveTab('broadcast')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold whitespace-nowrap transition-all ${
            activeTab === 'broadcast'
              ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
          }`}
        >
          <Megaphone className="w-4 h-4" />
          <span>5. Broadcast Banner</span>
        </button>
      </div>

      {/* Level Sub-Selector for tabs: materi, soal, habits */}
      {(activeTab === 'materi' || activeTab === 'soal' || activeTab === 'habits') && (
        <div className="flex items-center space-x-2 bg-slate-100 dark:bg-[#12223a] p-1.5 rounded-2xl border border-slate-200 dark:border-white/5">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 px-3 uppercase tracking-wider">
            Pilih Tingkat Kelas:
          </span>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setSelectedLevel('newbie')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedLevel === 'newbie'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              NEWBIE (Know How • Base KPI A)
            </button>
            <button
              onClick={() => setSelectedLevel('runner')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedLevel === 'runner'
                  ? 'bg-indigo-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              RUNNER (Do How • Stair KPI B)
            </button>
            <button
              onClick={() => setSelectedLevel('master')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedLevel === 'master'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              MASTER (Show How • Roof KPI C)
            </button>
          </div>
        </div>
      )}

      {/* ================= TAB 1: MATERI & MODUL KELAS ================= */}
      {activeTab === 'materi' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/10">
            <div>
              <h2 className="text-base font-bold text-slate-800 dark:text-white flex items-center space-x-2">
                <Edit3 className="w-5 h-5 text-sky-400" />
                <span>
                  Edit Materi Silabus • {selectedLevel.toUpperCase()} CLASS
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ubah judul, target kelulusan, dan uraian bab materi yang dibaca peserta.
              </p>
            </div>
            <button
              onClick={handleSaveLesson}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 hover:from-emerald-600 hover:to-teal-700 transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Materi</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-slate-300">
                Judul Modul Kelas
              </label>
              <input
                type="text"
                value={draftLesson.title}
                onChange={(e) => setDraftLesson({ ...draftLesson, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-slate-300">
                Sub-Judul / Tagline
              </label>
              <input
                type="text"
                value={draftLesson.subtitle}
                onChange={(e) => setDraftLesson({ ...draftLesson, subtitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-slate-300">
                Kode KPI
              </label>
              <input
                type="text"
                value={draftLesson.kpiCode}
                onChange={(e) => setDraftLesson({ ...draftLesson, kpiCode: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-slate-300">
                Target KPI & Standar Kelulusan
              </label>
              <input
                type="text"
                value={draftLesson.kpiTarget}
                onChange={(e) => setDraftLesson({ ...draftLesson, kpiTarget: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>Tautan Flipbook E-Book Interaktif (URL Heyzine / E-Book Reader)</span>
                <span className="text-[10px] text-purple-400 font-normal">Mendukung Heyzine Flipbook & Google Sites</span>
              </label>
              <input
                type="url"
                value={draftLesson.flipbookUrl || ''}
                onChange={(e) => setDraftLesson({ ...draftLesson, flipbookUrl: e.target.value })}
                placeholder="Contoh: https://heyzine.com/flip-book/84475c68c3.html"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <span className="text-[10px] text-slate-400">
                Default Newbie: <code className="text-emerald-400">c8cf26fe26.html</code> • Runner: <code className="text-purple-400">84475c68c3.html</code> • Master: <code className="text-amber-400">02dcdf4956.html</code>
              </span>
            </div>
          </div>

          {/* Sections List */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Daftar Bab & Uraian Materi ({draftLesson.sections.length} Bab)
              </h3>
              <button
                onClick={handleAddLessonSection}
                className="px-3 py-1.5 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 text-sky-600 dark:text-sky-300 border border-sky-500/30 text-xs font-bold transition-all flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Bab Baru</span>
              </button>
            </div>

            <div className="space-y-4">
              {draftLesson.sections.map((sec, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10 space-y-3 relative group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-500 flex items-center space-x-1">
                      <span>Bab {idx + 1}</span>
                    </span>
                    <button
                      onClick={() => handleRemoveLessonSection(idx)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-all"
                      title="Hapus Bab Ini"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-2 text-xs">
                    <input
                      type="text"
                      value={sec.heading}
                      onChange={(e) => {
                        const updated = [...draftLesson.sections];
                        updated[idx].heading = e.target.value;
                        setDraftLesson({ ...draftLesson, sections: updated });
                      }}
                      placeholder="Judul Bab Materi"
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 font-bold text-slate-800 dark:text-white"
                    />

                    <textarea
                      rows={4}
                      value={sec.body}
                      onChange={(e) => {
                        const updated = [...draftLesson.sections];
                        updated[idx].body = e.target.value;
                        setDraftLesson({ ...draftLesson, sections: updated });
                      }}
                      placeholder="Uraian isi materi pembelajaran..."
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 leading-relaxed custom-scrollbar"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                      <input
                        type="text"
                        value={sec.callout || ''}
                        onChange={(e) => {
                          const updated = [...draftLesson.sections];
                          updated[idx].callout = e.target.value;
                          setDraftLesson({ ...draftLesson, sections: updated });
                        }}
                        placeholder="Tips / Catatan Lapangan"
                        className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 text-[11px] text-amber-600 dark:text-amber-300"
                      />
                      <input
                        type="text"
                        value={sec.keyTakeaway || ''}
                        onChange={(e) => {
                          const updated = [...draftLesson.sections];
                          updated[idx].keyTakeaway = e.target.value;
                          setDraftLesson({ ...draftLesson, sections: updated });
                        }}
                        placeholder="Poin Kunci / Intisari"
                        className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 text-[11px] text-emerald-600 dark:text-emerald-300"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: BANK SOAL 50 BUTIR ================= */}
      {activeTab === 'soal' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-white/10">
            <div>
              <h2 className="text-base font-bold text-slate-800 dark:text-white flex items-center space-x-2">
                <HelpCircle className="w-5 h-5 text-indigo-400" />
                <span>
                  Bank 50 Butir Reflektif • {selectedLevel.toUpperCase()} CLASS
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Edit langsung teks pertanyaan reflektif untuk disimulasikan peserta.
              </p>
            </div>

            {/* Dimension Filter */}
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-slate-400 font-medium">Filter Dimensi:</span>
              <select
                value={dimensionFilter}
                onChange={(e) => setDimensionFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white font-semibold"
              >
                <option value="all">Semua Dimensi (50 Butir)</option>
                {selectedLevel === 'newbie' && (
                  <>
                    <option value="D1">D1: Memahami dan mengingat ilmu</option>
                    <option value="D2">D2: Memulai dan menjalankan percakapan</option>
                    <option value="D3">D3: Kekhawatiran dan kenyamanan</option>
                    <option value="D4">D4: Keyakinan dan kesiapan mencoba</option>
                    <option value="D5">D5: Praktik dan konsistensi</option>
                  </>
                )}
                {selectedLevel === 'runner' && (
                  <>
                    <option value="R1">R1: Pemetaan Karakter Audiens</option>
                    <option value="R2">R2: Penanganan Keberatan Taktis</option>
                    <option value="R3">R3: Kecepatan Respon Rebuttal</option>
                    <option value="R4">R4: Bahasa Tubuh & Ketahanan Vokal</option>
                    <option value="R5">R5: Negosiasi & Closing Lapangan</option>
                  </>
                )}
                {selectedLevel === 'master' && (
                  <>
                    <option value="M1">M1: Visi Komunikasi & Narasi Publik</option>
                    <option value="M2">M2: Manajemen Isu Sensitif & Krisis</option>
                    <option value="M3">M3: Mentoring & Transfer Kapabilitas</option>
                    <option value="M4">M4: Diplomasi Multi-Stakeholder</option>
                    <option value="M5">M5: Keteladanan & Integritas Narasi</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {/* Question List */}
          <div className="space-y-3">
            {filteredQuestions.map((q) => (
              <div
                key={q.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sky-500 flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded-lg bg-sky-500/10 border border-sky-500/20">
                      Butir #{q.id}
                    </span>
                    <span className="text-slate-600 dark:text-slate-300 font-medium">
                      [{q.dimensionId}] {q.dimensionTitle}
                    </span>
                  </span>
                  <span className="text-[10px] text-slate-400">Opsi Skala A - E</span>
                </div>

                <textarea
                  rows={2}
                  value={q.statement}
                  onChange={(e) => handleQuestionChange(selectedLevel, q.id, e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white font-medium leading-relaxed custom-scrollbar focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 3: KURIKULUM 21 HARI ================= */}
      {activeTab === 'habits' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/10">
            <div>
              <h2 className="text-base font-bold text-slate-800 dark:text-white flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-emerald-400" />
                <span>
                  Kurikulum Praktik 21 Hari •{' '}
                  {selectedLevel === 'newbie'
                    ? 'Alpha Program'
                    : selectedLevel === 'runner'
                    ? 'Beta Role Play Program'
                    : 'Delta Mentoring Program'}
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ubah fokus pembelajaran harian, penugasan ringan, dan jenis bukti verifikasi.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {currentHabits.map((habit, idx) => (
              <div
                key={habit.day}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10 space-y-3 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-amber-500 text-xs px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    Hari ke-{habit.day}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Format Bukti: <strong className="text-slate-300">{habit.proofType}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Fokus Harian
                    </label>
                    <input
                      type="text"
                      value={habit.focus}
                      onChange={(e) => handleHabitDayEdit(idx, 'focus', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white font-semibold"
                    />
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Tugas Ringan (Light Task)
                    </label>
                    <input
                      type="text"
                      value={habit.lightTask}
                      onChange={(e) => handleHabitDayEdit(idx, 'lightTask', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white font-medium"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 4: BITE THE BULLETS ================= */}
      {activeTab === 'bullets' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-white/10">
            <div>
              <h2 className="text-base font-bold text-slate-800 dark:text-white flex items-center space-x-2">
                <Layers className="w-5 h-5 text-purple-400" />
                <span>Edit SOP & Framework Bite The Bullets</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pilih modul spesifik untuk mengubah SOP checklist dan framework eksekusi.
              </p>
            </div>

            {/* Bullet Selector */}
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-slate-400 font-medium">Modul:</span>
              <select
                value={selectedBulletId}
                onChange={(e) => setSelectedBulletId(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white font-semibold"
              >
                {Object.values(bullets).map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 dark:text-slate-300">
                  Judul Modul
                </label>
                <input
                  type="text"
                  value={currentBullet.title}
                  onChange={(e) => {
                    updateBulletModule(currentBullet.id, {
                      ...currentBullet,
                      title: e.target.value,
                    });
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10 font-bold text-slate-800 dark:text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 dark:text-slate-300">
                  Tagline Ringkas
                </label>
                <input
                  type="text"
                  value={currentBullet.tagline}
                  onChange={(e) => {
                    updateBulletModule(currentBullet.id, {
                      ...currentBullet,
                      tagline: e.target.value,
                    });
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-slate-300">
                Deskripsi Operasional
              </label>
              <textarea
                rows={3}
                value={currentBullet.description}
                onChange={(e) => {
                  updateBulletModule(currentBullet.id, {
                    ...currentBullet,
                    description: e.target.value,
                  });
                }}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white leading-relaxed"
              />
            </div>

            {/* Checklist Items */}
            <div className="space-y-2 pt-2">
              <label className="font-bold text-slate-700 dark:text-slate-300 block">
                Item Checklist SOP ({currentBullet.checklistItems.length} Poin)
              </label>
              <div className="space-y-2">
                {currentBullet.checklistItems.map((item, idx) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <span className="text-slate-400 font-mono text-[11px] w-6">
                      #{idx + 1}
                    </span>
                    <input
                      type="text"
                      value={item.text}
                      onChange={(e) => {
                        const updated = [...currentBullet.checklistItems];
                        updated[idx].text = e.target.value;
                        updateBulletModule(currentBullet.id, {
                          ...currentBullet,
                          checklistItems: updated,
                        });
                      }}
                      className="flex-1 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 5: BROADCAST BANNER ================= */}
      {activeTab === 'broadcast' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/10">
            <div>
              <h2 className="text-base font-bold text-slate-800 dark:text-white flex items-center space-x-2">
                <Megaphone className="w-5 h-5 text-amber-400" />
                <span>Pengumuman & Banner Berjalan Aplikasi</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pesan ini akan tampil di bagian atas dashboard seluruh peserta (Shaf 2 ka01-ka14).
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-slate-300">
                Teks Pengumuman Global
              </label>
              <textarea
                rows={3}
                value={draftAnnouncement}
                onChange={(e) => setDraftAnnouncement(e.target.value)}
                placeholder="Tuliskan pengumuman penting bagi seluruh komunikator..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white leading-relaxed font-medium"
              />
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-200 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Megaphone className="w-4 h-4 text-amber-500" />
                <span>
                  <strong>Pratinjau Banner:</strong> {draftAnnouncement || 'Tidak ada pengumuman.'}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setGlobalAnnouncement(draftAnnouncement);
                addNotification('Pengumuman Disimpan', 'Pengumuman global berhasil disiarkan.', 'success');
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold text-xs shadow-md transition-all flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Publikasikan Banner Pengumuman</span>
            </button>
          </div>
        </div>
      )}

      {/* Live Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-[#172b47] rounded-3xl max-w-3xl w-full p-6 shadow-2xl border border-slate-200 dark:border-white/10 space-y-6 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10">
              <div className="flex items-center space-x-2">
                <Eye className="w-5 h-5 text-sky-400" />
                <h3 className="font-bold text-slate-800 dark:text-white text-sm">
                  Pratinjau Live Konten: {draftLesson.title}
                </h3>
              </div>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20">
                <div className="font-bold text-sky-500">{draftLesson.kpiCode}</div>
                <div className="text-slate-800 dark:text-white font-semibold text-sm">
                  {draftLesson.title}
                </div>
                <div className="text-slate-500 mt-1">{draftLesson.subtitle}</div>
                <div className="mt-2 text-[11px] text-emerald-500 font-bold">
                  Target: {draftLesson.kpiTarget}
                </div>
              </div>

              <div className="space-y-3">
                {draftLesson.sections.map((sec, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10 space-y-2"
                  >
                    <h4 className="font-bold text-slate-800 dark:text-white text-xs">
                      {idx + 1}. {sec.heading}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                      {sec.body}
                    </p>
                    {sec.callout && (
                      <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-300 font-medium text-[11px]">
                        💡 {sec.callout}
                      </div>
                    )}
                    {sec.keyTakeaway && (
                      <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                        ✓ Poin Utama: {sec.keyTakeaway}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex justify-end">
              <button
                onClick={() => setShowPreviewModal(false)}
                className="px-4 py-2 rounded-xl bg-sky-500 text-white text-xs font-bold"
              >
                Tutup Pratinjau
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
