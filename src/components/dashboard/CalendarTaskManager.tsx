import React, { useState } from 'react';
import {
  Calendar as CalIcon,
  Plus,
  Clock,
  CheckCircle2,
  Circle,
  Trash2,
  Share2,
  Download,
  AlertTriangle,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CalendarEvent } from '../../types';

export const CalendarTaskManager: React.FC = () => {
  const {
    calendarEvents,
    addCalendarEvent,
    toggleEventCompleted,
    deleteCalendarEvent,
    exportToICS,
    addNotification,
  } = useApp();

  const [urgencyFilter, setUrgencyFilter] = useState<'Semua' | 'Tinggi' | 'Sedang' | 'Rendah'>('Semua');
  const [showAddModal, setShowAddModal] = useState(false);

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('2026-10-16');
  const [time, setTime] = useState('14:00');
  const [urgency, setUrgency] = useState<'Tinggi' | 'Sedang' | 'Rendah'>('Tinggi');
  const [category, setCategory] = useState<CalendarEvent['category']>('Belajar');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addCalendarEvent({
      title: title.trim(),
      date,
      time,
      urgency,
      category,
      completed: false,
      syncedToGoogle: true,
    });

    setTitle('');
    setShowAddModal(false);
  };

  const filteredEvents = calendarEvents.filter((e) => {
    if (urgencyFilter === 'Semua') return true;
    return e.urgency === urgencyFilter;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center space-x-2">
            <CalIcon className="w-5 h-5 text-sky-400" />
            <span>Integrasi Kalender & Manajemen Prioritas Tugas Utama</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sinkronisasi jadwal ke Google Calendar & Outlook dengan notifikasi pengingat pintar
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={exportToICS}
            className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-white/15 flex items-center space-x-1.5 transition-all shadow-sm"
            title="Download file .ics untuk Google Calendar atau Outlook"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" />
            <span>Ekspor .ICS (Google/Outlook)</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold shadow-md shadow-sky-500/20 flex items-center space-x-1.5 transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Agenda</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-1 bg-slate-100 dark:bg-white/10 p-1 rounded-xl">
          {(['Semua', 'Tinggi', 'Sedang', 'Rendah'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setUrgencyFilter(filter)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                urgencyFilter === filter
                  ? 'bg-sky-500 text-white shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-white'
              }`}
            >
              Urgensi {filter}
            </button>
          ))}
        </div>
        <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center space-x-2">
          <span className="flex items-center space-x-1 text-emerald-400">
            <Sparkles className="w-3 h-3" />
            <span>Auto-Reminder Aktif</span>
          </span>
          <span>•</span>
          <span>{filteredEvents.length} Agenda Ditemukan</span>
        </div>
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredEvents.map((ev) => {
          const urgencyColor =
            ev.urgency === 'Tinggi'
              ? 'bg-rose-500/15 text-rose-500 dark:text-rose-400 border-rose-500/30'
              : ev.urgency === 'Sedang'
              ? 'bg-amber-500/15 text-amber-500 dark:text-amber-400 border-amber-500/30'
              : 'bg-emerald-500/15 text-emerald-500 dark:text-emerald-400 border-emerald-500/30';

          return (
            <div
              key={ev.id}
              className={`p-4 rounded-2xl bg-white dark:bg-[#172b47] border shadow-sm transition-all flex items-start justify-between gap-3 ${
                ev.completed
                  ? 'opacity-60 border-slate-200 dark:border-white/5'
                  : 'border-slate-200 dark:border-white/10 hover:border-sky-400/40'
              }`}
            >
              <button
                onClick={() => toggleEventCompleted(ev.id)}
                className="mt-0.5 text-slate-400 hover:text-emerald-500 transition-colors shrink-0"
              >
                {ev.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-400" />
                )}
              </button>
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase ${urgencyColor}`}
                  >
                    {ev.urgency}
                  </span>
                  <span className="text-[10px] text-sky-500 dark:text-sky-300 font-semibold px-2 py-0.5 rounded bg-sky-500/10">
                    {ev.category}
                  </span>
                  {ev.syncedToGoogle && (
                    <span className="text-[9px] text-emerald-400 font-medium">✓ Terjadwal</span>
                  )}
                </div>
                <h4
                  className={`text-xs md:text-sm font-bold text-slate-800 dark:text-white leading-snug ${
                    ev.completed ? 'line-through text-slate-400 dark:text-slate-500' : ''
                  }`}
                >
                  {ev.title}
                </h4>
                <div className="flex items-center space-x-3 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="flex items-center space-x-1">
                    <CalIcon className="w-3 h-3" />
                    <span>{ev.date}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{ev.time} WIB</span>
                  </span>
                </div>
              </div>
              <button
                onClick={() => deleteCalendarEvent(ev.id)}
                className="text-slate-400 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition-colors shrink-0"
                title="Hapus agenda"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Add Agenda Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1a2d4b] rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
              <h3 className="font-bold text-base text-slate-800 dark:text-white flex items-center space-x-2">
                <Plus className="w-4 h-4 text-sky-400" />
                <span>Tambah Agenda & Pengingat Baru</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded-lg"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Judul Agenda / Tugas
                </label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Sesi Praktik Pengabaran Shaf 2 (ka01-ka04)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Tanggal
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Waktu (WIB)
                  </label>
                  <input
                    type="time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Tingkat Urgensi
                  </label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white focus:outline-none"
                  >
                    <option value="Tinggi">Tinggi (Mendesak & Kritis)</option>
                    <option value="Sedang">Sedang (Rutin Mingguan)</option>
                    <option value="Rendah">Rendah (Fleksibel)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Kategori
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white focus:outline-none"
                  >
                    <option value="Belajar">Belajar Mandiri</option>
                    <option value="Evaluasi">Evaluasi IPOOI</option>
                    <option value="Pengabaran">Pengabaran Lapangan</option>
                    <option value="Pembinaan">Pembinaan Kader</option>
                    <option value="Kompetisi">Kompetisi 1v1</option>
                  </select>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-[11px] text-sky-600 dark:text-sky-300">
                Agenda ini akan otomatis disinkronkan ke kalender dan memicu notifikasi pengingat sebelum waktu mulai.
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold shadow-md shadow-sky-500/25"
                >
                  Simpan Agenda
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
