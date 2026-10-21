import React from 'react';
import {
  FileDown,
  Printer,
  X,
  Award,
  CheckCircle,
  Building2,
  Calendar,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProgressReportModal: React.FC = () => {
  const {
    currentUser,
    userAssessmentResults,
    habits,
    ipooiData,
    showReportModal,
    setShowReportModal,
  } = useApp();

  if (!showReportModal) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-[#172b47] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-white/10 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Controls Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3 print:hidden">
          <div className="flex items-center space-x-2">
            <FileDown className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-slate-800 dark:text-white text-base">
              Laporan Kemajuan Belajar Eksekutif (PDF Ready)
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/25 flex items-center space-x-1.5 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              onClick={() => setShowReportModal(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div id="printable-report" className="space-y-6 text-slate-800 dark:text-slate-100 print:text-black">
          {/* Document Header */}
          <div className="border-b-2 border-slate-800 dark:border-white/20 pb-4 flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase font-mono font-bold tracking-widest text-sky-500">
                KAC COMMUNICATOR ACADEMY
              </div>
              <h1 className="text-xl font-black tracking-tight">
                LAPORAN KEMAJUAN BELAJAR & KOMPETENSI
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pusat Pembinaan Komunikator KAC & Unit Shaf 2 (ka01 - ka14)
              </p>
            </div>
            <div className="text-right text-xs">
              <div className="font-bold">Dokumen Resmi No: KAC/REP/2026-X</div>
              <div className="text-slate-400 text-[11px]">Tanggal: 14 Oktober 2026</div>
            </div>
          </div>

          {/* Student Profile Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/5 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Nama Peserta</span>
              <strong className="text-sm font-bold">{currentUser.name}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Unit Kerja</span>
              <strong className="text-sm font-bold text-sky-500">{currentUser.unit}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Tingkat / XP</span>
              <strong className="text-sm font-bold text-amber-500">Level {currentUser.level} ({currentUser.totalXp} XP)</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Kecepatan Adaptif</span>
              <strong className="text-sm font-bold text-emerald-500">{currentUser.adaptiveSpeed}</strong>
            </div>
          </div>

          {/* Assessment Breakdown Table */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
              I. Ringkasan Kelulusan Asesmen Bertingkat
            </h4>
            <div className="border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 font-bold">
                  <tr>
                    <th className="p-2.5">Jenjang Kelas</th>
                    <th className="p-2.5">KPI Terkait</th>
                    <th className="p-2.5">Skor Asesmen</th>
                    <th className="p-2.5">Tingkat Kesulitan</th>
                    <th className="p-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  <tr>
                    <td className="p-2.5 font-bold">NEWBIE (Know How)</td>
                    <td className="p-2.5">Base KPI A</td>
                    <td className="p-2.5 text-emerald-500 font-bold">{userAssessmentResults.newbie?.score ?? 95}%</td>
                    <td className="p-2.5">{userAssessmentResults.newbie?.difficultyReached ?? 'Sulit'}</td>
                    <td className="p-2.5 font-bold text-emerald-500">LULUS</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">RUNNER (Do How)</td>
                    <td className="p-2.5">Stair KPI B</td>
                    <td className="p-2.5 text-emerald-500 font-bold">{userAssessmentResults.runner?.score ?? 88}%</td>
                    <td className="p-2.5">{userAssessmentResults.runner?.difficultyReached ?? 'Sedang'}</td>
                    <td className="p-2.5 font-bold text-emerald-500">LULUS</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">MASTER (Show How)</td>
                    <td className="p-2.5">Roof KPI C</td>
                    <td className="p-2.5 text-purple-400 font-bold">
                      {userAssessmentResults.master?.score ?? 94}%
                    </td>
                    <td className="p-2.5">{userAssessmentResults.master?.difficultyReached ?? 'Sulit'}</td>
                    <td className="p-2.5 font-bold text-purple-400">LULUS</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* IPOOI Status */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
              II. Matriks Kinerja Terpadu IPOOI
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
              <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20">
                <span className="text-[10px] text-slate-400 block font-bold">INPUT</span>
                <strong className="text-sm text-sky-500">{ipooiData.input.totalHours} Jam Belajar</strong>
              </div>
              <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                <span className="text-[10px] text-slate-400 block font-bold">PROCESS</span>
                <strong className="text-sm text-indigo-400">{ipooiData.process.quizAttempts}x Percobaan</strong>
              </div>
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <span className="text-[10px] text-slate-400 block font-bold">OUTPUT</span>
                <strong className="text-sm text-amber-500">{ipooiData.output.averageAssessmentScore}% Nilai</strong>
              </div>
              <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20">
                <span className="text-[10px] text-slate-400 block font-bold">OUTCOME</span>
                <strong className="text-sm text-teal-400">{ipooiData.outcome.pengabaranFieldSuccessRate}% Pengabaran</strong>
              </div>
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20">
                <span className="text-[10px] text-slate-400 block font-bold">IMPACT</span>
                <strong className="text-sm text-rose-400">{ipooiData.impact.communicatorMaturityLevel}</strong>
              </div>
            </div>
          </div>

          {/* Signatures */}
          <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex justify-between text-xs text-center">
            <div className="w-48 space-y-8">
              <span className="text-slate-400">Peserta yang Bersangkutan</span>
              <div className="border-b border-slate-400 pt-6 font-bold">{currentUser.name}</div>
              <div className="text-[10px] text-slate-400">{currentUser.unit}</div>
            </div>
            <div className="w-48 space-y-8">
              <span className="text-slate-400">Kordinator Pelatihan KAC</span>
              <div className="border-b border-slate-400 pt-6 font-bold">Bung Abram Hanif</div>
              <div className="text-[10px] text-slate-400">KAC (Pusat)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
