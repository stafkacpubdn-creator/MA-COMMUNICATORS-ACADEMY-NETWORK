import React, { useState } from 'react';
import {
  Swords,
  Trophy,
  Zap,
  Clock,
  CheckCircle2,
  XCircle,
  X,
  Users,
  RotateCcw,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserProfile } from '../../types';

export const CompetitionMode: React.FC = () => {
  const {
    currentUser,
    allUsers,
    showCompetitionModal,
    setShowCompetitionModal,
    triggerCelebration,
    addNotification,
  } = useApp();

  const opponents = allUsers.filter((u) => u.id !== currentUser.id);
  const [selectedOpponent, setSelectedOpponent] = useState<UserProfile>(opponents[0] || allUsers[1]);
  const [gameState, setGameState] = useState<'lobby' | 'playing' | 'result'>('lobby');
  const [round, setRound] = useState(0);
  const [myScore, setMyScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);

  const duelQuestions = [
    {
      q: 'Berapakah waktu maksimal Elevator Pitch yang ideal untuk membuka silaturahmi awal?',
      options: ['15 Detik', '45 - 60 Detik', '15 Menit', '1 Jam'],
      correct: 1,
    },
    {
      q: 'Apa kepanjangan dari metode riset lapangan AORA?',
      options: [
        'Ask, Observe, Research, Act',
        'Always Open Real Action',
        'Analyze, Order, Repeat, Assess',
        'Action Only Real Answer',
      ],
      correct: 0,
    },
    {
      q: 'Di tingkatan manakah materi Show How (mentoring kader) diajarkan?',
      options: ['Newbie Class', 'Runner Class', 'Master Class', 'Semua Jenjang'],
      correct: 2,
    },
  ];

  const handleStartDuel = () => {
    setMyScore(0);
    setOpponentScore(0);
    setRound(0);
    setGameState('playing');
  };

  const handleAnswer = (optionIdx: number) => {
    const isCorrect = optionIdx === duelQuestions[round].correct;
    const opponentCorrect = Math.random() > 0.35;
    if (isCorrect) setMyScore((prev) => prev + 100);
    if (opponentCorrect) setOpponentScore((prev) => prev + 100);

    if (round + 1 < duelQuestions.length) {
      setRound((r) => r + 1);
    } else {
      setGameState('result');
      if (isCorrect) triggerCelebration();
      addNotification('Duel Kuis 1v1 Selesai!', `Pertandingan melawan ${selectedOpponent.name} telah selesai.`, 'achievement');
    }
  };

  if (!showCompetitionModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#172b47] rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 dark:border-white/10 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Swords className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 dark:text-white text-base">
                Mode Kompetisi Antar Teman (1v1 Live Duel)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Adu kecepatan dan ketepatan pemahaman materi KAC
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowCompetitionModal(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {gameState === 'lobby' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-100 dark:border-white/5">
              <div className="text-center flex-1">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-14 h-14 rounded-full mx-auto object-cover ring-2 ring-sky-400"
                />
                <div className="font-bold text-xs text-slate-800 dark:text-white mt-1.5 truncate">
                  {currentUser.unit}
                </div>
                <span className="text-[10px] text-amber-400 font-mono font-bold">
                  {currentUser.totalXp} XP
                </span>
              </div>
              <div className="text-center px-4">
                <span className="text-xl font-black text-amber-500">VS</span>
              </div>
              <div className="text-center flex-1">
                <img
                  src={selectedOpponent.avatar}
                  alt={selectedOpponent.name}
                  className="w-14 h-14 rounded-full mx-auto object-cover ring-2 ring-rose-400"
                />
                <div className="font-bold text-xs text-slate-800 dark:text-white mt-1.5 truncate">
                  {selectedOpponent.unit}
                </div>
                <span className="text-[10px] text-amber-400 font-mono font-bold">
                  {selectedOpponent.totalXp} XP
                </span>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <label className="font-semibold text-slate-600 dark:text-slate-300">
                Pilih Lawan Tanding (KAC Pusat & Shaf 2):
              </label>
              <select
                value={selectedOpponent.id}
                onChange={(e) => {
                  const target = opponents.find((o) => o.id === e.target.value);
                  if (target) setSelectedOpponent(target);
                }}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white focus:outline-none"
              >
                {opponents.map((op) => (
                  <option key={op.id} value={op.id}>
                    {op.unit} — {op.name} ({op.totalXp} XP)
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleStartDuel}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-black text-sm shadow-lg shadow-amber-500/25 flex items-center justify-center space-x-2 transition-all hover:scale-[1.02]"
            >
              <Swords className="w-5 h-5" />
              <span>Mulai Duel Cepat (3 Ronde Kilat)</span>
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-white/10 pb-2">
              <span>RONDE {round + 1} / 3</span>
              <div className="flex space-x-4">
                <span className="text-sky-400">{currentUser.unit}: {myScore} Poin</span>
                <span className="text-rose-400">{selectedOpponent.unit}: {opponentScore} Poin</span>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-100 dark:border-white/5">
              <p className="text-sm font-bold text-slate-800 dark:text-white leading-snug">
                {duelQuestions[round].q}
              </p>
            </div>
            <div className="space-y-2 text-xs">
              {duelQuestions[round].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className="w-full p-3 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-sky-500/20 hover:border-sky-500 border border-slate-200 dark:border-white/10 text-left text-slate-800 dark:text-slate-200 transition-all font-medium flex items-center space-x-2"
                >
                  <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center text-[10px] font-bold">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span>{opt}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {gameState === 'result' && (
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-500 mx-auto flex items-center justify-center text-slate-900 shadow-xl shadow-amber-500/25">
              <Trophy className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-800 dark:text-white">
              {myScore > opponentScore
                ? 'Kemenangan Manis! 🏆'
                : myScore === opponentScore
                ? 'Hasil Imbang yang Kuat! 🤝'
                : 'Lawan Lebih Unggul Kali Ini! 💪'}
            </h3>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-100 dark:border-white/5 max-w-sm mx-auto flex justify-around text-center text-xs">
              <div>
                <span className="text-slate-400 block">{currentUser.unit}</span>
                <strong className="text-xl font-black text-sky-400">{myScore}</strong>
              </div>
              <div className="border-r border-slate-200 dark:border-white/10" />
              <div>
                <span className="text-slate-400 block">{selectedOpponent.unit}</span>
                <strong className="text-xl font-black text-rose-400">{opponentScore}</strong>
              </div>
            </div>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setGameState('lobby')}
                className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-xs font-semibold text-slate-700 dark:text-slate-200"
              >
                Ganti Lawan
              </button>
              <button
                onClick={handleStartDuel}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-bold text-xs shadow-md shadow-amber-500/25 flex items-center space-x-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Tanding Ulang</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
