import React, { useState } from 'react';
import {
  Users,
  Settings,
  Layers,
  FileCode,
  ShieldAlert,
  RotateCcw,
  Save,
  Download,
  Upload,
  Sparkles,
  CheckCircle2,
  Plus,
  Trash2,
  Edit3,
  BookOpen,
  Target,
  Compass,
  Check,
  Flame,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LessonContent, QuizQuestion, HabitItem, BulletModule } from '../../types';

export const DapurSetting: React.FC = () => {
  const {
    currentUser,
    lessons,
    updateLesson,
    quizzes,
    updateQuizzes,
    habits,
    updateHabitList,
    bullets,
    updateBulletModule,
    ipooiData,
    updateIPOOI,
    resetMenuConfig,
    exportAllSettingsBackup,
    importSettingsBackup,
    addNotification,
  } = useApp();

  const [activeDapurTab, setActiveDapurTab] = useState<'academy' | 'bullets' | 'habits' | 'ipooi' | 'backup'>('academy');
  const [selectedClass, setSelectedClass] = useState<'newbie' | 'runner' | 'master'>('newbie');
  const [selectedBullet, setSelectedBullet] = useState<string>('elevator-pitch');

  // Local draft states
  const currentLesson = lessons[selectedClass];
  const [lessonDraft, setLessonDraft] = useState<LessonContent>(currentLesson);
  const currentQuizList = quizzes[selectedClass];
  const [quizDraft, setQuizDraft] = useState<QuizQuestion[]>(currentQuizList);

  const handleSelectClass = (c: 'newbie' | 'runner' | 'master') => {
    setSelectedClass(c);
    setLessonDraft(lessons[c]);
    setQuizDraft(quizzes[c]);
  };

  const handleSaveAcademy = () => {
    updateLesson(selectedClass, lessonDraft);
    updateQuizzes(selectedClass, quizDraft);
    addNotification('Dapur Tersimpan', `Materi & Kuis untuk ${selectedClass.toUpperCase()} berhasil diperbarui secara mandiri!`, 'achievement');
  };

  // Bullets Draft
  const currentBullet = bullets[selectedBullet];
  const [bulletDraft, setBulletDraft] = useState<BulletModule>(currentBullet);

  const handleSelectBullet = (bKey: string) => {
    setSelectedBullet(bKey);
    setBulletDraft(bullets[bKey]);
  };

  const handleSaveBullet = () => {
    updateBulletModule(selectedBullet, bulletDraft);
    addNotification('Dapur Tersimpan', `Modul Bite The Bullets "${bulletDraft.title}" berhasil disimpan tanpa dampak ke menu lain.`, 'achievement');
  };

  // Habit draft
  const [habitDraft, setHabitDraft] = useState<HabitItem[]>(habits);
  const handleSaveHabits = () => {
    updateHabitList(habitDraft);
  };

  // IPOOI draft
  const [ipooiDraft, setIpooiDraft] = useState(ipooiData);
  const handleSaveIPOOI = () => {
    updateIPOOI(ipooiDraft);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        importSettingsBackup(content);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#172d4d] via-[#1a3860] to-[#132742] border border-sky-500/30 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-semibold mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Dapur Pengembang & Admin KAC (Pusat)</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-white">
            Dapur Setting Modular Independen
          </h2>
          <p className="text-xs md:text-sm text-slate-300 max-w-2xl mt-1">
            Setiap menu memiliki dapur konfigurasi terisolasi: Anda dapat mengembangkan materi, kuis, habit tracker, atau KPI secara mandiri tanpa khawatir merusak atau berdampak pada menu lainnya!
          </p>
        </div>
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={exportAllSettingsBackup}
            className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/20 flex items-center space-x-1.5 shadow-sm"
            title="Download cadangan data konfigurasi JSON"
          >
            <Download className="w-3.5 h-3.5 text-sky-400" />
            <span>Backup JSON</span>
          </button>
        </div>
      </div>

      {/* Main Dapur Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm text-xs">
        <button
          onClick={() => setActiveDapurTab('academy')}
          className={`px-4 py-2 rounded-xl font-bold flex items-center space-x-2 transition-all ${
            activeDapurTab === 'academy'
              ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
              : 'text-slate-600 dark:text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Dapur Menu 2: Communicator Academy</span>
        </button>
        <button
          onClick={() => setActiveDapurTab('bullets')}
          className={`px-4 py-2 rounded-xl font-bold flex items-center space-x-2 transition-all ${
            activeDapurTab === 'bullets'
              ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
              : 'text-slate-600 dark:text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Dapur Menu: Bite The Bullets</span>
        </button>
        <button
          onClick={() => setActiveDapurTab('habits')}
          className={`px-4 py-2 rounded-xl font-bold flex items-center space-x-2 transition-all ${
            activeDapurTab === 'habits'
              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
              : 'text-slate-600 dark:text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>Dapur Habit (Alpha/Beta/Delta)</span>
        </button>
        <button
          onClick={() => setActiveDapurTab('ipooi')}
          className={`px-4 py-2 rounded-xl font-bold flex items-center space-x-2 transition-all ${
            activeDapurTab === 'ipooi'
              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
              : 'text-slate-600 dark:text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>Dapur Menu 1: Dasbor & IPOOI</span>
        </button>
      </div>

      {/* ================= TAB 1: ACADEMY DAPUR (NEWBIE / RUNNER / MASTER) ================= */}
      {activeDapurTab === 'academy' && (
        <div className="space-y-5">
          {/* Class Sub-selector */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-slate-500 dark:text-slate-400">Pilih Jenjang:</span>
              <div className="flex space-x-1 bg-slate-100 dark:bg-white/5 p-1 rounded-xl">
                {(['newbie', 'runner', 'master'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => handleSelectClass(lvl)}
                    className={`px-3 py-1.5 rounded-lg font-bold uppercase transition-all ${
                      selectedClass === lvl
                        ? 'bg-sky-500 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:text-white'
                    }`}
                  >
                    {lvl} Class
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => resetMenuConfig(selectedClass)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-rose-500/10 text-slate-600 dark:text-slate-300 hover:text-rose-400 border border-slate-200 dark:border-white/10 text-xs font-semibold flex items-center space-x-1"
                title="Hanya reset jenjang ini, modul lain tidak terpengaruh"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset {selectedClass.toUpperCase()} Saja</span>
              </button>
              <button
                onClick={handleSaveAcademy}
                className="px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-md shadow-emerald-500/25 flex items-center space-x-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Simpan Perubahan</span>
              </button>
            </div>
          </div>

          {/* Isolated Scope Notice */}
          <div className="p-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/25 flex items-center space-x-2.5 text-xs text-sky-700 dark:text-sky-300">
            <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
            <span>
              <strong>Isolasi Dapur Aktif:</strong> Setiap perubahan judul, butir materi, dan butir kuis di bawah ini disimpan ke slot independen <code>kac_lessons_config.{selectedClass}</code> dan tidak memengaruhi Runner, Master, Bite The Bullets, atau Menu Dashboard.
            </span>
          </div>

          {/* Form: Lesson metadata */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-4 text-xs">
            <h3 className="font-bold text-sm text-slate-800 dark:text-white">
              Metadata & Target KPI ({selectedClass.toUpperCase()})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Judul Materi
                </label>
                <input
                  type="text"
                  value={lessonDraft.title}
                  onChange={(e) => setLessonDraft({ ...lessonDraft, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Kode KPI
                </label>
                <input
                  type="text"
                  value={lessonDraft.kpiCode}
                  onChange={(e) => setLessonDraft({ ...lessonDraft, kpiCode: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Target Kelulusan KPI
                </label>
                <input
                  type="text"
                  value={lessonDraft.kpiTarget}
                  onChange={(e) => setLessonDraft({ ...lessonDraft, kpiTarget: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white"
                />
              </div>
            </div>

            {/* Sub-sections editor */}
            <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-white/10">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-white">
                  Sub-Bab Materi ({lessonDraft.sections.length} Bagian)
                </span>
                <button
                  onClick={() => {
                    setLessonDraft({
                      ...lessonDraft,
                      sections: [
                        ...lessonDraft.sections,
                        {
                          heading: `Bagian Baru #${lessonDraft.sections.length + 1}`,
                          body: 'Tuliskan uraian materi di sini...',
                          keyTakeaway: 'Poin penting yang wajib diingat.',
                        },
                      ],
                    });
                  }}
                  className="px-3 py-1 rounded-xl bg-sky-500/20 text-sky-400 hover:bg-sky-500/30 font-semibold"
                >
                  + Tambah Sub-Bab
                </button>
              </div>
              {lessonDraft.sections.map((sec, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-100 dark:border-white/5 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={sec.heading}
                      onChange={(e) => {
                        const updated = [...lessonDraft.sections];
                        updated[idx].heading = e.target.value;
                        setLessonDraft({ ...lessonDraft, sections: updated });
                      }}
                      className="font-bold text-xs bg-transparent border-b border-sky-400 text-slate-800 dark:text-white w-2/3"
                    />
                    <button
                      onClick={() => {
                        const updated = lessonDraft.sections.filter((_, i) => i !== idx);
                        setLessonDraft({ ...lessonDraft, sections: updated });
                      }}
                      className="text-rose-400 hover:text-rose-300"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={sec.body}
                    onChange={(e) => {
                      const updated = [...lessonDraft.sections];
                      updated[idx].body = e.target.value;
                      setLessonDraft({ ...lessonDraft, sections: updated });
                    }}
                    className="w-full p-2 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white"
                  />
                </div>
              ))}
            </div>

            {/* Quiz Bank Editor */}
            <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-white/10">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-white">
                  Bank Soal Kuis Adaptif ({quizDraft.length} Butir Soal)
                </span>
                <button
                  onClick={() => {
                    const newQ: QuizQuestion = {
                      id: `q-${Date.now()}`,
                      question: 'Pertanyaan evaluasi baru...',
                      options: ['Pilihan A', 'Pilihan B', 'Pilihan C', 'Pilihan D'],
                      correctIndex: 0,
                      explanation: 'Penjelasan jawaban tepat...',
                      difficulty: 'Sedang',
                      category: 'Konsep Baru',
                    };
                    setQuizDraft([...quizDraft, newQ]);
                  }}
                  className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 font-semibold"
                >
                  + Tambah Soal Kuis
                </button>
              </div>
              {quizDraft.map((q, qIdx) => (
                <div
                  key={q.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-100 dark:border-white/5 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sky-400">Soal #{qIdx + 1}</span>
                    <button
                      onClick={() => {
                        setQuizDraft(quizDraft.filter((_, i) => i !== qIdx));
                      }}
                      className="text-rose-400 hover:text-rose-300"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={q.question}
                    onChange={(e) => {
                      const updated = [...quizDraft];
                      updated[qIdx].question = e.target.value;
                      setQuizDraft(updated);
                    }}
                    className="w-full p-2 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white font-medium"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    {q.options.map((opt, oIdx) => (
                      <div key={oIdx} className="flex items-center space-x-1.5">
                        <input
                          type="radio"
                          name={`correct-${q.id}`}
                          checked={q.correctIndex === oIdx}
                          onChange={() => {
                            const updated = [...quizDraft];
                            updated[qIdx].correctIndex = oIdx;
                            setQuizDraft(updated);
                          }}
                          className="accent-emerald-500"
                        />
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => {
                            const updated = [...quizDraft];
                            updated[qIdx].options[oIdx] = e.target.value;
                            setQuizDraft(updated);
                          }}
                          className="flex-1 p-1.5 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white text-[11px]"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: BULLETS DAPUR ================= */}
      {activeDapurTab === 'bullets' && (
        <div className="space-y-5">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-slate-500 dark:text-slate-400">Pilih Modul Bullets:</span>
              <select
                value={selectedBullet}
                onChange={(e) => handleSelectBullet(e.target.value)}
                className="p-2 rounded-xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white font-semibold"
              >
                <option value="elevator-pitch">Elevator Pitch</option>
                <option value="pra-pengabaran">Pra Pengabaran</option>
                <option value="materi-pengabaran">Materi Pengabaran</option>
                <option value="materi-pembinaan">Materi Pembinaan</option>
                <option value="aora">AORA (Ask, Observe, Research, Act)</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => resetMenuConfig('bullets')}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-rose-500/10 text-slate-600 dark:text-slate-300 hover:text-rose-400 border border-slate-200 dark:border-white/10 text-xs font-semibold flex items-center space-x-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Modul Bullets</span>
              </button>
              <button
                onClick={handleSaveBullet}
                className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-bold text-xs shadow-md shadow-amber-500/25 flex items-center space-x-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Simpan Modul Ini</span>
              </button>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-4 text-xs">
            <h3 className="font-bold text-sm text-slate-800 dark:text-white">
              Konfigurasi Modul: {bulletDraft.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tagline / Sub-judul
                </label>
                <input
                  type="text"
                  value={bulletDraft.tagline}
                  onChange={(e) => setBulletDraft({ ...bulletDraft, tagline: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Deskripsi Singkat
                </label>
                <input
                  type="text"
                  value={bulletDraft.description}
                  onChange={(e) => setBulletDraft({ ...bulletDraft, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white"
                />
              </div>
            </div>

            {/* Checklist items editor */}
            <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-white/10">
              <span className="font-bold text-slate-800 dark:text-white block">
                Butir Checklist Standar Lapangan:
              </span>
              {bulletDraft.checklistItems.map((chk, idx) => (
                <div key={chk.id} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={chk.text}
                    onChange={(e) => {
                      const updated = [...bulletDraft.checklistItems];
                      updated[idx].text = e.target.value;
                      setBulletDraft({ ...bulletDraft, checklistItems: updated });
                    }}
                    className="flex-1 p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white text-xs"
                  />
                  <button
                    onClick={() => {
                      const updated = bulletDraft.checklistItems.filter((_, i) => i !== idx);
                      setBulletDraft({ ...bulletDraft, checklistItems: updated });
                    }}
                    className="text-rose-400 hover:text-rose-300 p-2"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: HABITS DAPUR ================= */}
      {activeDapurTab === 'habits' && (
        <div className="space-y-5">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800 dark:text-white">
              Pengaturan Habit Tracker (Alpha, Beta, Delta)
            </span>
            <button
              onClick={handleSaveHabits}
              className="px-4 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs shadow-md shadow-rose-500/25 flex items-center space-x-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Simpan Kebiasaan</span>
            </button>
          </div>
          <div className="p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-3 text-xs">
            {habitDraft.map((h, i) => (
              <div
                key={h.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-100 dark:border-white/5 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-400 uppercase text-[10px]">
                    Kategori {h.category} Habit
                  </span>
                  <select
                    value={h.category}
                    onChange={(e) => {
                      const updated = [...habitDraft];
                      updated[i].category = e.target.value as any;
                      setHabitDraft(updated);
                    }}
                    className="bg-transparent text-[10px] text-slate-400 border border-slate-300 dark:border-white/10 rounded px-1.5 py-0.5"
                  >
                    <option value="Alpha">Alpha (Newbie)</option>
                    <option value="Beta">Beta (Runner)</option>
                    <option value="Delta">Delta (Master)</option>
                  </select>
                </div>
                <input
                  type="text"
                  value={h.title}
                  onChange={(e) => {
                    const updated = [...habitDraft];
                    updated[i].title = e.target.value;
                    setHabitDraft(updated);
                  }}
                  className="w-full p-2 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white font-semibold"
                />
                <input
                  type="text"
                  value={h.description}
                  onChange={(e) => {
                    const updated = [...habitDraft];
                    updated[i].description = e.target.value;
                    setHabitDraft(updated);
                  }}
                  className="w-full p-2 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 text-[11px]"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 4: IPOOI & DASHBOARD DAPUR ================= */}
      {activeDapurTab === 'ipooi' && (
        <div className="space-y-5">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800 dark:text-white">
              Pengaturan Bobot Metrik IPOOI & Target Harian
            </span>
            <button
              onClick={handleSaveIPOOI}
              className="px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-md shadow-emerald-500/25 flex items-center space-x-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Simpan Formula IPOOI</span>
            </button>
          </div>
          <div className="p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                  Target Jam Belajar Harian (Jam)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={ipooiDraft.input.targetHours}
                  onChange={(e) =>
                    setIpooiDraft({
                      ...ipooiDraft,
                      input: { ...ipooiDraft.input, targetHours: parseFloat(e.target.value) || 2.0 },
                    })
                  }
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                  Tingkat Kedewasaan Komunikator Default
                </label>
                <select
                  value={ipooiDraft.impact.communicatorMaturityLevel}
                  onChange={(e) =>
                    setIpooiDraft({
                      ...ipooiDraft,
                      impact: { ...ipooiDraft.impact, communicatorMaturityLevel: e.target.value as any },
                    })
                  }
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white"
                >
                  <option value="Emerging">Emerging (Dasar)</option>
                  <option value="Competent">Competent (Kompeten)</option>
                  <option value="Advanced">Advanced (Mahir)</option>
                  <option value="Expert">Expert (Pakar)</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                Catatan Eksekutif Evaluasi Input-Impact
              </label>
              <textarea
                rows={3}
                value={ipooiDraft.impact.notes}
                onChange={(e) =>
                  setIpooiDraft({
                    ...ipooiDraft,
                    impact: { ...ipooiDraft.impact, notes: e.target.value },
                  })
                }
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* Backup / Restore Section */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-3 text-xs">
        <h4 className="font-bold text-slate-800 dark:text-white flex items-center space-x-2">
          <Upload className="w-4 h-4 text-sky-400" />
          <span>Restorasi & Impor Konfigurasi JSON</span>
        </h4>
        <p className="text-slate-500 dark:text-slate-400">
          Muat seluruh konfigurasi dapur setting dari file JSON yang sebelumnya telah dicadangkan.
        </p>
        <div className="flex items-center space-x-3 pt-1">
          <label className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold cursor-pointer transition-all">
            <span>Pilih File Backup JSON</span>
            <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
          </label>
          <span className="text-[11px] text-slate-400">Format: .json cadangan resmi KAC</span>
        </div>
      </div>
    </div>
  );
};
