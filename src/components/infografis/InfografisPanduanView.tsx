import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Target,
  Flame,
  Award,
  Layers,
  CheckCircle2,
  TrendingUp,
  LayoutGrid,
  Bot,
  Users,
  WifiOff,
  FileSpreadsheet,
  FileDown,
  Compass,
  ArrowRight,
  ShieldCheck,
  Zap,
  Printer,
  ChevronRight,
  HelpCircle,
  Clock,
  Swords,
  Trophy,
  Share2,
  Smartphone,
  Eye,
  Sliders,
  Database,
  Building2,
  Lock,
  Palette,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const InfografisPanduanView: React.FC = () => {
  const { setActiveView, setShowReportModal, setShowGoogleSyncModal, currentUser } = useApp();
  const [activeTab, setActiveTab] = useState<'silabus' | 'metode' | 'tatacara' | 'fitur'>('silabus');
  const [showInfografisLink, setShowInfografisLink] = useState(false);
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans">
      {/* ======================================================== */}
      {/* HERO HEADER INFOGRAFIS                                   */}
      {/* ======================================================== */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#172b47] via-[#1a3459] to-[#0f1d31] border border-sky-500/30 p-6 md:p-8 text-white shadow-2xl">
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-sky-500/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-purple-500/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
              <span>Infografis Resmi &amp; Panduan Ekosistem</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handlePrint}
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all flex items-center space-x-1.5 shadow-sm cursor-pointer"
                title="Cetak infografis atau simpan sebagai dokumen PDF"
              >
                <Printer className="w-3.5 h-3.5 text-sky-300" />
                <span>Cetak / Unduh PDF</span>
              </button>
            </div>
          </div>

              <button
                type="button"
                onClick={() => setShowInfografisLink((prev) => !prev)}
                className="px-3.5 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold border border-sky-300/40 transition-all flex items-center space-x-1.5 shadow-sm cursor-pointer"
                aria-expanded={showInfografisLink}
              >
                <span>Infografis Aplikasi</span>
                <ChevronRight
                  className={`w-3.5 h-3.5 transition-transform ${
                    showInfografisLink ? 'rotate-90' : ''
                  }`}
                />
              </button>

{showInfografisLink && (
  <div className="rounded-2xl border border-sky-400/30 bg-white/10 p-4 sm:p-5 space-y-4 animate-fadeIn">
    <div>
      <h3 className="text-sm font-black text-white">
        Infografis KAC Communicator Academy
      </h3>
      <p className="text-xs text-slate-300 mt-1">
        Infografis resmi aplikasi dan panduan penggunaannya.
      </p>
    </div>

    <img
      src={`${import.meta.env.BASE_URL}assets/aistudio/KAC_Communicator_Academy_Infographic_Poster__1__3f169a04.png`}
      alt="Infografis KAC Communicator Academy"
      className="w-full h-auto rounded-xl border border-white/20"
      loading="lazy"
    />

    <a
      href={`${import.meta.env.BASE_URL}assets/aistudio/KAC_Communicator_Academy_Infographic_Poster__1__3f169a04.png`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 hover:bg-amber-300 px-4 py-3 text-sm font-extrabold text-slate-900 transition-all shadow-md"
    >
      <BookOpen className="w-4 h-4" />
      <span>Lihat Infografis Ukuran Penuh</span>
      <ChevronRight className="w-4 h-4" />
    </a>
  </div>
)}

          <div className="max-w-3xl space-y-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight bg-gradient-to-r from-white via-slate-100 to-sky-200 bg-clip-text text-transparent">
              KAC Communicator Academy
            </h1>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed font-normal">
              Platform Mandiri &amp; Adaptif Pembelajaran, Pelatihan Komunikasi Persuasif Pengabaran, Penanaman Habit 21 Hari, dan Eskalasi Silabus Berjenjang Shaf 2 (ka01–ka14).
            </p>
          </div>

          {/* Key metrics counter strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-[11px] text-slate-400 font-medium">Jenjang Kaderisasi</div>
              <div className="text-lg md:text-xl font-black text-sky-400">3 Kelas Utama</div>
              <div className="text-[10px] text-slate-400">Newbie • Runner • Master</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-[11px] text-slate-400 font-medium">Metode Pelatihan</div>
              <div className="text-lg md:text-xl font-black text-emerald-400">21-Day Habit</div>
              <div className="text-[10px] text-slate-400">Formula 5P+1R Mandiri</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-[11px] text-slate-400 font-medium">Bank Soal Asesmen</div>
              <div className="text-lg md:text-xl font-black text-purple-400">150 Butir</div>
              <div className="text-[10px] text-slate-400">Reflektif &amp; Taktis Lapangan</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-[11px] text-slate-400 font-medium">Cakupan Unit</div>
              <div className="text-lg md:text-xl font-black text-amber-400">15 Unit Kerja</div>
              <div className="text-[10px] text-slate-400">Pusat &amp; Shaf 2 (ka01–ka14)</div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4 TAB NAVIGASI INFOGRAFIS                                 */}
      {/* ======================================================== */}
      <div className="flex items-center space-x-1.5 sm:space-x-2 border-b border-slate-200 dark:border-white/10 pb-2 overflow-x-auto custom-scrollbar">
        <button
          type="button"
          onClick={() => setActiveTab('silabus')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 flex items-center space-x-2 cursor-pointer ${
            activeTab === 'silabus'
              ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25 border border-sky-400'
              : 'bg-white dark:bg-[#172b47] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>1. Arsitektur Silabus &amp; Eskalasi</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('metode')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 flex items-center space-x-2 cursor-pointer ${
            activeTab === 'metode'
              ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25 border border-sky-400'
              : 'bg-white dark:bg-[#172b47] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>2. Metodologi Pembelajaran 4 Pilar</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('tatacara')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 flex items-center space-x-2 cursor-pointer ${
            activeTab === 'tatacara'
              ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25 border border-sky-400'
              : 'bg-white dark:bg-[#172b47] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>3. Tata Cara Penggunaan SOP</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('fitur')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 flex items-center space-x-2 cursor-pointer ${
            activeTab === 'fitur'
              ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25 border border-sky-400'
              : 'bg-white dark:bg-[#172b47] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>4. Direktori Lengkap Seluruh Fitur</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: ARSITEKTUR SILABUS & TAHAPAN ESKALASI             */}
      {/* ======================================================== */}
      {activeTab === 'silabus' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Header Deskriptif */}
          <div className="p-5 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-1">
            <h2 className="text-base font-black text-slate-800 dark:text-white flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-sky-500" />
              <span>Hierarki Tangga Kemahiran: Know How ➔ Do How ➔ Show How</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Setiap jenjang memiliki standar kompetensi, bobot asesmen, modul flipbook resmi, dan target KPI yang terukur (*measurable*).
            </p>
          </div>

          {/* 3 Jenjang Kelas Utama */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* 1. NEWBIE CLASS */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-emerald-500/10 via-emerald-500/5 to-white dark:to-[#172b47] border-2 border-emerald-500/40 shadow-lg space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                    LEVEL 1 • DASAR
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    Base KPI A
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    NEWBIE CLASS
                  </h3>
                  <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                    Materi Teoritis (Know How)
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Menanamkan pondasi pemahaman konsep, etika komunikasi pengabaran, identifikasi kepribadian audiens, dan kesiapan mental kader pemula.
                </p>

                <div className="space-y-2 pt-2 border-t border-emerald-500/20 text-xs">
                  <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span><strong>Flipbook E-Book:</strong> Heyzine `c8cf26fe26`</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span><strong>Asesmen 50 Soal:</strong> Skor Kelulusan Min. 80%</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span><strong>Tugas Praktik:</strong> 1st CTA (Alpha Role Play 21 Hari)</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveView('newbie_materi')}
                className="w-full mt-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-500/25 flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
              >
                <span>Buka Materi Know How</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 2. RUNNER CLASS */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-purple-500/10 via-purple-500/5 to-white dark:to-[#172b47] border-2 border-purple-500/40 shadow-lg space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30">
                    LEVEL 2 • MENENGAH
                  </span>
                  <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">
                    Stair KPI B
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    RUNNER CLASS
                  </h3>
                  <div className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wide">
                    Materi Praktis (Do How)
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Mentransformasikan teori menjadi refleks lapangan, kelenturan taktis menghadapi penolakan audiens (*objection handling*), dan negosiasi persuasif.
                </p>

                <div className="space-y-2 pt-2 border-t border-purple-500/20 text-xs">
                  <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0" />
                    <span><strong>Flipbook E-Book:</strong> Heyzine `84475c68c3`</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0" />
                    <span><strong>Asesmen 50 Soal:</strong> Skor Kelulusan Min. 85%</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0" />
                    <span><strong>Tugas Praktik:</strong> 2nd CTA (Beta Role Play 21 Hari)</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveView('runner_materi')}
                className="w-full mt-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-500/25 flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
              >
                <span>Buka Materi Do How</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 3. MASTER CLASS */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-white dark:to-[#172b47] border-2 border-amber-500/40 shadow-lg space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                    LEVEL 3 • STRATEGIS
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                    Roof KPI C
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    MASTER CLASS
                  </h3>
                  <div className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                    Materi Strategis (Show How)
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Puncak keteladanan narasi publik (*living benchmark*), arsitektur diplomasi tingkat tinggi, kepemimpinan pengabaran, dan kemampuan mementor kader baru.
                </p>

                <div className="space-y-2 pt-2 border-t border-amber-500/20 text-xs">
                  <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                    <span><strong>Flipbook E-Book:</strong> Heyzine `02dcdf4956`</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                    <span><strong>Asesmen 50 Soal:</strong> Skor Kelulusan Min. 90%</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                    <span><strong>Tugas Praktik:</strong> 3rd CTA &amp; Mentoring 2 Kader</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveView('master_materi')}
                className="w-full mt-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md shadow-amber-500/25 flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
              >
                <span>Buka Materi Show How</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Modul Spesialis: Bite The Bullets */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase text-rose-500 tracking-wider">
                  MODUL SPESIALIS TEMATIK
                </span>
                <h3 className="text-base font-black text-slate-800 dark:text-white">
                  BITE THE BULLETS • Keterampilan Taktis Inti
                </h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-500 font-bold border border-rose-500/30">
                5 Modul Aksi
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-1">
                <div className="font-bold text-rose-600 dark:text-rose-400">1. Elevator Pitch</div>
                <p className="text-slate-500 dark:text-slate-300 text-[11px]">
                  Menyampaikan inti gagasan KAC dalam 60 detik padat, memikat, dan terstruktur.
                </p>
                <div className="text-[10px] text-rose-400 font-mono">Heyzine `34b7c06852`</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/5 space-y-1">
                <div className="font-bold text-slate-800 dark:text-slate-200">2. Pra-Pengabaran</div>
                <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                  Profiling audiens, pemetaan kebutuhan, serta persiapan mental dan dokumen pengabaran.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/5 space-y-1">
                <div className="font-bold text-slate-800 dark:text-slate-200">3. Materi Pengabaran</div>
                <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                  Artikulasi pesan kunci, jembatan empati, dan pembuktian dampak program KAC.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/5 space-y-1">
                <div className="font-bold text-slate-800 dark:text-slate-200">4. Materi Pembinaan</div>
                <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                  Pendampingan pasca-pengabaran, konsolidasi kader Shaf 2, dan transfer nilai.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/5 space-y-1">
                <div className="font-bold text-slate-800 dark:text-slate-200">5. AORA Framework</div>
                <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                  Metode Action-Oriented Result Assessment untuk evaluasi dampak nyata komunikasi.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: METODOLOGI PEMBELAJARAN 4 PILAR                   */}
      {/* ======================================================== */}
      {activeTab === 'metode' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-5 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-1">
            <h2 className="text-base font-black text-slate-800 dark:text-white flex items-center space-x-2">
              <Target className="w-5 h-5 text-emerald-500" />
              <span>Siklus Pembelajaran Terintegrasi (Self-Learning Pedagogy)</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Menggabungkan kesadaran diri (*self-awareness*), e-book interaktif, pembiasaan 21 hari, serta validasi ganda oleh AI dan sesama kader.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* PILAR 1: PENGENALAN DIRI & KEMAMPUAN DASAR */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-sky-500/20 text-sky-500 border border-sky-500/30 flex items-center justify-center font-black">
                1
              </div>
              <h3 className="text-base font-bold text-slate-800 dark:text-white">
                Pengenalan Diri &amp; Radar 7 Kompetensi
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed">
                Sebelum memulai materi, peserta mengenali profil komunikasi dan kecepatan belajar adaptif (*Standar, Cepat, Mendalam, Akselerasi*). Sistem memetakan 7 dimensi kompetensi:
              </p>
              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                  • Kemampuan Menyimak (Listening)
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                  • Kejelasan Vokal (Verbal &amp; Artikulasi)
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                  • Bahasa Tubuh (Non-Verbal &amp; Kontak Mata)
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                  • Ketepatan Pesan (Clarity &amp; Substansi)
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                  • Kehangatan Empati (Empathy Connection)
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                  • Penanganan Keberatan (Objection Handling)
                </div>
              </div>
            </div>

            {/* PILAR 2: PEMBELAJARAN TEORI INTERAKTIF */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-500 border border-indigo-500/30 flex items-center justify-center font-black">
                2
              </div>
              <h3 className="text-base font-bold text-slate-800 dark:text-white">
                Teori Interaktif &amp; E-Book Terintegrasi Halaman
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed">
                Materi disajikan lewat uraian bab terstruktur dan modul e-book Heyzine digital yang terbuka langsung di halaman (*in-page embed*):
              </p>
              <div className="space-y-2 pt-1 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                  <span><strong>Bebas Blokir:</strong> Iframe embed teroptimasi tanpa kendala pemblokiran browser.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex items-start space-x-2">
                  <Smartphone className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Sensor Landscape HP:</strong> Notifikasi pintar otomatis menyarankan putar posisi layar mendatar agar modul terbaca 2 halaman penuh.</span>
                </div>
              </div>
            </div>

            {/* PILAR 3: HABIT TRACKING 21 HARI (5P+1R) */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 flex items-center justify-center font-black">
                3
              </div>
              <h3 className="text-base font-bold text-slate-800 dark:text-white">
                Pelatihan Praktik 21 Hari Berbasis Formula 5P+1R
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed">
                Komunikasi persuasif tidak cukup hanya dipahami; ia harus menjadi kebiasaan refleks harian (*subconscious habit*) melalui latihan disiplin 21 hari:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] pt-1">
                <div className="p-2 rounded-xl bg-sky-500/10 text-sky-700 dark:text-sky-300 font-bold border border-sky-500/20">
                  1. Pijakan (Hook)
                </div>
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-700 dark:text-purple-300 font-bold border border-purple-500/20">
                  2. Pokok Masalah
                </div>
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-500/20">
                  3. Penawaran Solusi
                </div>
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-300 font-bold border border-amber-500/20">
                  4. Penegasan Dampak
                </div>
                <div className="p-2 rounded-xl bg-rose-500/10 text-rose-700 dark:text-rose-300 font-bold border border-rose-500/20">
                  5. Panggilan Aksi (CTA)
                </div>
                <div className="p-2 rounded-xl bg-teal-500/10 text-teal-700 dark:text-teal-300 font-bold border border-teal-500/20">
                  +1R: Refleksi Evaluasi
                </div>
              </div>
            </div>

            {/* PILAR 4: EVALUASI VALIDASI GANDA */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-500 border border-purple-500/30 flex items-center justify-center font-black">
                4
              </div>
              <h3 className="text-base font-bold text-slate-800 dark:text-white">
                Validasi Ganda: AI Coach Lab &amp; Human Peer Review
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed">
                Setiap naskah atau rekaman latihan diuji melalui dua mekanisme objektif untuk menjamin kualitas pengabaran di lapangan:
              </p>
              <div className="space-y-2 pt-1 text-xs">
                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-800 dark:text-purple-200">
                  <strong>• AI Coach Studio (`/coach`):</strong> Menilai 6 rubrik secara instan (Kesesuaian 5P+1R, Kejelasan, Empati, Efektivitas Waktu 60s, Nada Suara, Kesiapan Lapangan).
                </div>
                <div className="p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-800 dark:text-teal-200">
                  <strong>• Ruang Human Review (`/human`):</strong> Review sejawat dengan instrumen rubrik DENGAR (Dengar, Evaluasi, Nilai, Gandakan empati, Aksi rekomendasi).
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: TATA CARA PENGGUNAAN APLIKASI (SOP PENGGUNA)       */}
      {/* ======================================================== */}
      {activeTab === 'tatacara' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-5 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-1">
            <h2 className="text-base font-black text-slate-800 dark:text-white flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-sky-500" />
              <span>Panduan Langkah Demi Langkah Penggunaan Aplikasi (SOP)</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Alur baku bagi peserta dan koordinator dalam menjalani proses pelatihan mandiri setiap hari.
            </p>
          </div>

          <div className="space-y-3">
            {/* Step 1 */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm flex items-start space-x-4">
              <div className="w-8 h-8 rounded-xl bg-sky-500 text-white font-black flex items-center justify-center shrink-0 text-sm">
                1
              </div>
              <div className="space-y-1 flex-1">
                <h4 className="font-bold text-slate-800 dark:text-white text-sm">
                  Pilih Unit &amp; Identitas Peserta
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Buka bilah atas (*Navbar*), klik chip identitas peserta untuk memilih unit kerja Anda (misal: <em>KAC Pusat</em> atau <em>Shaf 2: ka01–ka14</em>). Foto profil dapat diganti langsung lewat ikon kamera.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm flex items-start space-x-4">
              <div className="w-8 h-8 rounded-xl bg-sky-500 text-white font-black flex items-center justify-center shrink-0 text-sm">
                2
              </div>
              <div className="space-y-1 flex-1">
                <h4 className="font-bold text-slate-800 dark:text-white text-sm">
                  Pelajari Materi &amp; Buka Flipbook di Halaman
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Masuk ke menu <strong>NEWBIE &gt; Materi</strong>. Klik tombol <code>OPEN FLIPBOOK KNOW HOW</code>. Flipbook e-book Heyzine akan langsung terbuka di halaman. Jika menggunakan HP, putar layar ke posisi Landscape agar tampilan buku terlihat 2 halaman penuh yang tajam.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm flex items-start space-x-4">
              <div className="w-8 h-8 rounded-xl bg-sky-500 text-white font-black flex items-center justify-center shrink-0 text-sm">
                3
              </div>
              <div className="space-y-1 flex-1">
                <h4 className="font-bold text-slate-800 dark:text-white text-sm">
                  Ikuti Asesmen Berbobot 50 Soal
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Pindah ke sub-tab <strong>Assessment</strong>. Jawab 50 butir soal reflektif dan situasional. Capai skor minimal 80% untuk membuka sertifikat kelulusan Level 1 dan membuka modul penugasan berikutnya.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm flex items-start space-x-4">
              <div className="w-8 h-8 rounded-xl bg-sky-500 text-white font-black flex items-center justify-center shrink-0 text-sm">
                4
              </div>
              <div className="space-y-1 flex-1">
                <h4 className="font-bold text-slate-800 dark:text-white text-sm">
                  Jalankan Habit Tracker 21 Hari &amp; Studio Latihan
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Buka menu <strong>Elevator Pitch</strong> atau klik tombol <strong>21-Day Habit Lab</strong> di dock bawah. Latih naskah 60 detik dengan formula 5P+1R, hitung waktu dengan timer terintegrasi, dan simpan catatan refleksi harian untuk mempertahankan rekor streak.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm flex items-start space-x-4">
              <div className="w-8 h-8 rounded-xl bg-sky-500 text-white font-black flex items-center justify-center shrink-0 text-sm">
                5
              </div>
              <div className="space-y-1 flex-1">
                <h4 className="font-bold text-slate-800 dark:text-white text-sm">
                  Gunakan Mode Luring Saat Berada di Lapangan Tanpa Sinyal
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Saat bertugas di pelosok tanpa jaringan internet, klik tombol <code>Luring Aktif</code> di bilah atas. Seluruh materi, asesmen, dan pencatatan habit tetap berfungsi 100% secara offline. Begitu sinyal tersedia, klik <strong>Sinkronisasi Cloud</strong> untuk memperbarui data pusat.
                </p>
              </div>
            </div>

            {/* Step 6 */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm flex items-start space-x-4">
              <div className="w-8 h-8 rounded-xl bg-sky-500 text-white font-black flex items-center justify-center shrink-0 text-sm">
                6
              </div>
              <div className="space-y-1 flex-1">
                <h4 className="font-bold text-slate-800 dark:text-white text-sm">
                  Sinkronisasi Tri-Platform &amp; Unduh Laporan Eksekutif
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Klik tombol <strong>Sheets &amp; GitHub</strong> di bilah atas untuk mencadangkan data ke Google Spreadsheet dan Google Apps Script. Koordinator dapat mengunduh <strong>Laporan PDF</strong> untuk dilaporkan kepada jajaran Pimpinan.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: DIREKTORI LENGKAP SELURUH FITUR APLIKASI           */}
      {/* ======================================================== */}
      {activeTab === 'fitur' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-5 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-1">
            <h2 className="text-base font-black text-slate-800 dark:text-white flex items-center space-x-2">
              <Zap className="w-5 h-5 text-amber-500" />
              <span>Katalog &amp; Direktori Lengkap 12 Fitur Utama Ekosistem</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Daftar seluruh kapabilitas teknologi dan modul operasional yang tersedia di dalam KAC Communicator Academy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* 1 */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-2">
              <div className="w-9 h-9 rounded-xl bg-sky-500/15 text-sky-500 flex items-center justify-center">
                <LayoutGrid className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-800 dark:text-white text-sm">
                1. Executive Summary &amp; Dasbor Kinerja
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Menyajikan ringkasan metrik eksekutif, tingkat kelulusan tiap jenjang, dan statistik komprehensif bagi pemangku kebijakan.
              </p>
            </div>

            {/* 2 */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-800 dark:text-white text-sm">
                2. Real-Time Monitoring 15 Unit Kerja
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Pemantauan langsung progres harian anggota di 15 unit (Pusat &amp; ka01–ka14), lengkap dengan filter unit dan persentase kepatuhan.
              </p>
            </div>

            {/* 3 */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-2">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/15 text-indigo-500 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-800 dark:text-white text-sm">
                3. Analytic Evaluasi IPOOI
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Analisis mendalam 5 pilar efektivitas pelatihan: <em>Input, Process, Output, Outcome,</em> dan <em>Impact</em> nyata pada pengabaran.
              </p>
            </div>

            {/* 4 */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-2">
              <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-500 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-800 dark:text-white text-sm">
                4. Integrated Heyzine Flipbook Readers
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Viewer e-book interaktif di dalam halaman untuk 4 modul resmi, dilengkapi sensor rotasi otomatis dan panduan landscape di HP.
              </p>
            </div>

            {/* 5 */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-2">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center">
                <Flame className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-800 dark:text-white text-sm">
                5. 21-Day Habit Lab &amp; Formula 5P+1R
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Tracker harian 21 hari pembentukan kebiasaan, timer countdown latihan 60 detik, pencatatan refleksi, dan penghitung streak.
              </p>
            </div>

            {/* 6 */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-2">
              <div className="w-9 h-9 rounded-xl bg-rose-500/15 text-rose-500 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-800 dark:text-white text-sm">
                6. AI Coach Lab (`/coach`)
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Instruktur AI yang mengevaluasi naskah latihan berdasarkan 6 rubrik objektif secara instan dengan panduan perbaikan kalimat.
              </p>
            </div>

            {/* 7 */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-2">
              <div className="w-9 h-9 rounded-xl bg-teal-500/15 text-teal-500 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-800 dark:text-white text-sm">
                7. Ruang Human Review (`/human`)
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Fasilitas telaah dan validasi sejawat antar sesama kader pengabaran menggunakan instrumen rubrik baku DENGAR.
              </p>
            </div>

            {/* 8 */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-2">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center">
                <WifiOff className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-800 dark:text-white text-sm">
                8. Mode Luring / Offline Mode 100%
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Kemampuan menjalankan aplikasi tanpa jaringan internet. Materi, kuis, dan habit data tersimpan aman di penyimpanan lokal HP.
              </p>
            </div>

            {/* 9 */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-800 dark:text-white text-sm">
                9. Sinkronisasi Google Sheets &amp; Apps Script
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Integrasi dua arah ke Google Sheets untuk rekapitulasi nilai dan basis data otomatis, serta panduan token git sync.
              </p>
            </div>

            {/* 10 */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-2">
              <div className="w-9 h-9 rounded-xl bg-sky-500/15 text-sky-500 flex items-center justify-center">
                <FileDown className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-800 dark:text-white text-sm">
                10. Generator Laporan Progres PDF
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Pembuatan berkas laporan resmi berformat cetak rapi (*print-ready PDF*) yang merangkum skor, jam belajar, dan radar kompetensi.
              </p>
            </div>

            {/* 11 */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-2">
              <div className="w-9 h-9 rounded-xl bg-yellow-500/15 text-yellow-500 flex items-center justify-center">
                <Trophy className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-800 dark:text-white text-sm">
                11. Gamifikasi, Duel 1v1 &amp; Papan Peringkat
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Sistem poin XP, level kemahiran, rekor streak, duel interaktif antar teman, dan klasemen Top 15 untuk memacu antusiasme belajar.
              </p>
            </div>

            {/* 12 */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-2">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/15 text-indigo-500 flex items-center justify-center">
                <Palette className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-800 dark:text-white text-sm">
                12. 6 Tema Kontras &amp; Mobile Thumb Dock
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Pilihan 6 tema visual berstandar aksesibilitas WCAG AA, serta floating dock navigasi bawah untuk kemudahan pengoperasian di smartphone.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER CALL TO ACTION */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-700 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base font-black flex items-center justify-center sm:justify-start space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-300" />
            <span>Siap Memulai Proses Belajar &amp; Pengabaran?</span>
          </h3>
          <p className="text-xs text-slate-200">
            Pilih materi sesuai jenjang Anda atau mulai latihan mandiri di 21-Day Habit Lab sekarang.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            type="button"
            onClick={() => setActiveView('newbie_materi')}
            className="px-4 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-xs shadow-md transition-all cursor-pointer"
          >
            Mulai Dari Newbie Class
          </button>
          <button
            type="button"
            onClick={() => setActiveView('elevator_habit_lab')}
            className="px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-extrabold text-xs border border-white/30 transition-all cursor-pointer"
          >
            Buka Habit Lab 21D
          </button>
        </div>
      </div>
    </div>
  );
};
