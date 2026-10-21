import React, { useState } from 'react';
import {
  Trophy,
  Flame,
  Award,
  TrendingUp,
  X,
  Search,
  Filter,
  Medal,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LeaderboardModal: React.FC = () => {
  const { allUsers, currentUser, showLeaderboardModal, setShowLeaderboardModal } = useApp();
  const [filterType, setFilterType] = useState<'all' | 'shaf2' | 'pusat'>('all');
  const [search, setSearch] = useState('');

  if (!showLeaderboardModal) return null;

  const sortedUsers = [...allUsers].sort((a, b) => b.totalXp - a.totalXp);
  const filtered = sortedUsers.filter((u) => {
    if (filterType === 'shaf2' && u.unitCode === 'PUSAT') return false;
    if (filterType === 'pusat' && u.unitCode !== 'PUSAT') return false;
    if (search.trim()) {
      return (
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.unit.toLowerCase().includes(search.toLowerCase())
      );
    }
    return true;
  });

  const top3 = sortedUsers.slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#172b47] rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 dark:border-white/10 space-y-5 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-yellow-500/20 text-yellow-400 flex items-center justify-center">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 dark:text-white text-base">
                Papan Peringkat Global KAC & Shaf 2
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pemeringkatan berdasarkan perolehan XP, konsistensi habit, dan akurasi asesmen
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowLeaderboardModal(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Podium Top 3 */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-2">
          {/* #2 */}
          {top3[1] && (
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10 text-center flex flex-col items-center justify-end relative group">
              <span className="w-6 h-6 rounded-full bg-slate-400 text-slate-900 font-black text-xs flex items-center justify-center mb-1">
                2
              </span>
              <img
                src={top3[1].avatar}
                alt={top3[1].name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-400"
              />
              <div className="text-xs font-bold text-slate-800 dark:text-white mt-1 truncate w-full">
                {top3[1].unit}
              </div>
              <div className="text-[11px] font-mono text-amber-400 font-bold">
                {top3[1].totalXp} XP
              </div>
            </div>
          )}
          {/* #1 Winner */}
          {top3[0] && (
            <div className="p-4 rounded-3xl bg-gradient-to-b from-yellow-500/20 to-amber-500/10 border-2 border-yellow-400/50 text-center flex flex-col items-center justify-end relative shadow-lg">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-amber-500 text-slate-900 font-black text-xs flex items-center justify-center mb-1 shadow-md shadow-yellow-500/30">
                👑
              </div>
              <img
                src={top3[0].avatar}
                alt={top3[0].name}
                className="w-16 h-16 rounded-full object-cover ring-4 ring-yellow-400 shadow-md"
              />
              <div className="text-xs font-extrabold text-slate-800 dark:text-white mt-1.5 truncate w-full">
                {top3[0].unit}
              </div>
              <div className="text-xs font-mono text-yellow-400 font-black">
                {top3[0].totalXp} XP
              </div>
            </div>
          )}
          {/* #3 */}
          {top3[2] && (
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10 text-center flex flex-col items-center justify-end relative group">
              <span className="w-6 h-6 rounded-full bg-amber-700 text-white font-black text-xs flex items-center justify-center mb-1">
                3
              </span>
              <img
                src={top3[2].avatar}
                alt={top3[2].name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-amber-700"
              />
              <div className="text-xs font-bold text-slate-800 dark:text-white mt-1 truncate w-full">
                {top3[2].unit}
              </div>
              <div className="text-[11px] font-mono text-amber-400 font-bold">
                {top3[2].totalXp} XP
              </div>
            </div>
          )}
        </div>

        {/* Filter & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex space-x-1 bg-slate-100 dark:bg-white/5 p-1 rounded-xl w-full sm:w-auto">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-lg font-medium flex-1 sm:flex-none ${
                filterType === 'all'
                  ? 'bg-sky-500 text-white font-bold'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Semua (15 Unit)
            </button>
            <button
              onClick={() => setFilterType('shaf2')}
              className={`px-3 py-1.5 rounded-lg font-medium flex-1 sm:flex-none ${
                filterType === 'shaf2'
                  ? 'bg-sky-500 text-white font-bold'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Shaf 2 (ka01-ka14)
            </button>
            <button
              onClick={() => setFilterType('pusat')}
              className={`px-3 py-1.5 rounded-lg font-medium flex-1 sm:flex-none ${
                filterType === 'pusat'
                  ? 'bg-sky-500 text-white font-bold'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              KAC Pusat
            </button>
          </div>
          <div className="relative w-full sm:w-56">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari anggota / unit..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-800 dark:text-white focus:outline-none"
            />
          </div>
        </div>

        {/* Scrollable Rank Table */}
        <div className="flex-1 overflow-y-auto space-y-1.5 custom-scrollbar pr-1">
          {filtered.map((u, idx) => {
            const isMe = u.id === currentUser.id;
            return (
              <div
                key={u.id}
                className={`p-3 rounded-2xl border transition-all flex items-center justify-between text-xs ${
                  isMe
                    ? 'bg-sky-500/15 border-sky-500/40 font-bold'
                    : 'bg-slate-50 dark:bg-[#12223a] border-slate-100 dark:border-white/5 text-slate-700 dark:text-slate-200'
                }`}
              >
                <div className="flex items-center space-x-3 truncate">
                  <span className="w-6 text-center font-bold text-slate-400 font-mono text-[11px]">
                    #{idx + 1}
                  </span>
                  <img
                    src={u.avatar}
                    alt={u.name}
                    className="w-8 h-8 rounded-full object-cover ring-1 ring-sky-400/40 shrink-0"
                  />
                  <div className="truncate">
                    <div className="font-bold text-slate-800 dark:text-white truncate flex items-center space-x-1.5">
                      <span>{u.unit}</span>
                      {isMe && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-sky-500 text-white">
                          Anda
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {u.name}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 shrink-0 text-right">
                  <div className="hidden sm:block">
                    <div className="text-[11px] text-slate-400">Pemahaman</div>
                    <div className="font-bold text-emerald-400">{u.comprehensionRate}%</div>
                  </div>
                  <div className="flex items-center space-x-1 text-orange-400 font-semibold text-[11px]">
                    <Flame className="w-3.5 h-3.5 fill-orange-400" />
                    <span>{u.streakDays}h</span>
                  </div>
                  <div className="min-w-[70px]">
                    <span className="font-mono font-black text-amber-400 text-sm">
                      {u.totalXp}
                    </span>
                    <span className="text-[10px] text-slate-400 ml-0.5">XP</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
