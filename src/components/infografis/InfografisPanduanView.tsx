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
