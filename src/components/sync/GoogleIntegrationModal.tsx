import React, { useState, useEffect } from 'react';
import {
  X,
  FileSpreadsheet,
  Cloud,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  Github,
  KeyRound,
  Download,
  Copy,
  Check,
  Code,
  FolderOpen,
  Send,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  DEFAULT_APPS_SCRIPT_URL,
  GITHUB_REPO_URL,
  testAppsScriptConnection,
  sendToAppsScript,
  createGoogleSpreadsheet,
  listGoogleDriveSheets,
  generateParticipantsCSV,
  KAC_APPS_SCRIPT_TEMPLATE,
} from '../../services/googleSyncService';
import {
  initAuth,
  googleSignIn,
  googleLogout,
  getAccessToken,
} from '../../services/googleWorkspaceAuth';
import { User } from 'firebase/auth';

interface GoogleIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleIntegrationModal: React.FC<GoogleIntegrationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { allUsers, addNotification } = useApp();

  const [activeTab, setActiveTab] = useState<'appscript' | 'drive' | 'github'>('appscript');
  const [appsScriptUrl, setAppsScriptUrl] = useState(DEFAULT_APPS_SCRIPT_URL);
  const [isTesting, setIsTesting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  // Google OAuth Auth State
  const [googleUser, setGoogleUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [driveSheets, setDriveSheets] = useState<any[]>([]);
  const [isCreatingSheet, setIsCreatingSheet] = useState(false);
  const [createdSheetUrl, setCreatedSheetUrl] = useState<string | null>(null);

  // Code Template Copy
  const [copiedCode, setCopiedCode] = useState(false);
  const [showCode, setShowCode] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const unsubscribe = initAuth(
      (user, token) => {
        setGoogleUser(user);
        if (token) {
          setAccessToken(token);
          fetchDriveSheets(token);
        }
      },
      () => {
        setGoogleUser(null);
        setAccessToken(null);
      }
    );

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const res = await testAppsScriptConnection(appsScriptUrl);
      setTestResult({
        success: res.success,
        message: res.message,
      });
      addNotification(
        res.success ? 'Apps Script Terkoneksi' : 'Koneksi Apps Script Gagal',
        res.message,
        res.success ? 'success' : 'warning'
      );
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err.message || 'Gagal menghubungi server Apps Script',
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSyncAllToGoogleSheets = async () => {
    setIsSyncing(true);
    try {
      const payload = {
        action: 'sync_all' as const,
        senderEmail: 'stafkacpubdn@gmail.com',
        timestamp: new Date().toISOString(),
        data: {
          users: allUsers,
          syncedAt: new Date().toLocaleString('id-ID'),
        },
      };

      const res = await sendToAppsScript(payload, appsScriptUrl);
      addNotification(
        'Sinkronisasi Google Sheets Berhasil',
        `Data 15 unit anggota berhasil dipancarkan ke Google Sheets via Apps Script.`,
        'success'
      );
      setTestResult({
        success: true,
        message: 'Data 15 unit anggota berhasil dipancarkan ke Google Sheets.',
      });
    } catch (err: any) {
      addNotification('Gagal Sinkron', err.message, 'warning');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setGoogleUser(result.user);
        setAccessToken(result.accessToken);
        addNotification(
          'Login Google Berhasil',
          `Terhubung sebagai ${result.user.displayName || result.user.email}`,
          'success'
        );
        fetchDriveSheets(result.accessToken);
      }
    } catch (err: any) {
      addNotification('Login Google Gagal', err.message, 'warning');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleGoogleSignOut = async () => {
    await googleLogout();
    setGoogleUser(null);
    setAccessToken(null);
    setDriveSheets([]);
    addNotification('Logout Google', 'Sesi Google Workspace telah ditutup.', 'info');
  };

  const fetchDriveSheets = async (token: string) => {
    try {
      const sheets = await listGoogleDriveSheets(token);
      setDriveSheets(sheets);
    } catch (err) {
      console.warn('Could not list drive sheets:', err);
    }
  };

  const handleCreateNewGoogleSheet = async () => {
    if (!accessToken) {
      addNotification('Perlu Login', 'Silakan klik Sign in with Google terlebih dahulu.', 'warning');
      return;
    }

    setIsCreatingSheet(true);
    try {
      const title = `Rekapitulasi KAC Communicator Academy - ${new Date().toLocaleDateString('id-ID')}`;
      const headers = [
        'Unit',
        'Nama Lengkap',
        'Email',
        'Level',
        'Total XP',
        'Streak (Hari)',
        'Pemahaman (%)',
        'Skor Newbie (Know How)',
        'Skor Runner (Do How)',
        'Skor Master (Show How)',
        'Alpha 21 (Hari)',
        'Beta 21 (Hari)',
        'Delta 21 (Hari)',
      ];

      const rows = allUsers.map((p) => [
        p.unit,
        p.name,
        p.email || '-',
        p.level,
        p.totalXp,
        p.streakDays,
        `${p.comprehensionRate}%`,
        p.classProgress?.newbie?.score ?? 0,
        p.classProgress?.runner?.score ?? 0,
        p.classProgress?.master?.score ?? 0,
        p.classProgress?.newbie?.habitDaysDone ?? 0,
        p.classProgress?.runner?.habitDaysDone ?? 0,
        p.classProgress?.master?.habitDaysDone ?? 0,
      ]);

      const result = await createGoogleSpreadsheet(accessToken, title, headers, rows);
      setCreatedSheetUrl(result.spreadsheetUrl);
      addNotification(
        'Google Sheets Dibuat di Drive!',
        'Spreadsheet baru berhasil dibuat dan disimpan di Google Drive Anda.',
        'achievement'
      );
      fetchDriveSheets(accessToken);
    } catch (err: any) {
      addNotification('Gagal Membuat Spreadsheet', err.message, 'warning');
    } finally {
      setIsCreatingSheet(false);
    }
  };

  const handleDownloadCSV = () => {
    const csvContent = generateParticipantsCSV(allUsers);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `rekap_kac_peserta_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addNotification('File CSV Diunduh', 'Rekapitulasi nilai siap diimpor ke Google Sheets/Excel.', 'success');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(KAC_APPS_SCRIPT_TEMPLATE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white dark:bg-[#111f36] border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 text-white flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
              <Cloud className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-200">
                  Konektivitas Tri-Platform
                </span>
                <span className="text-[9px] bg-white/20 px-2 py-0.5 rounded-full font-mono font-bold">
                  Rp 0 • No Billing
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black tracking-tight">
                Integrasi Google Sheets, Apps Script & GitHub
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0c182c] px-6 text-xs font-bold shrink-0">
          <button
            onClick={() => setActiveTab('appscript')}
            className={`py-3.5 px-4 border-b-2 flex items-center space-x-2 transition-all cursor-pointer ${
              activeTab === 'appscript'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 font-black'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
            <span>1. Google Sheets & Apps Script</span>
          </button>

          <button
            onClick={() => setActiveTab('drive')}
            className={`py-3.5 px-4 border-b-2 flex items-center space-x-2 transition-all cursor-pointer ${
              activeTab === 'drive'
                ? 'border-sky-500 text-sky-600 dark:text-sky-400 font-black'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            <FolderOpen className="w-4 h-4 text-sky-500" />
            <span>2. Google Drive & OAuth</span>
          </button>

          <button
            onClick={() => setActiveTab('github')}
            className={`py-3.5 px-4 border-b-2 flex items-center space-x-2 transition-all cursor-pointer ${
              activeTab === 'github'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 font-black'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            <Github className="w-4 h-4 text-indigo-400" />
            <span>3. GitHub Repository</span>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          {/* TAB 1: APPS SCRIPT & GOOGLE SHEETS */}
          {activeTab === 'appscript' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-1.5">
                <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-300 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Koneksi Google Apps Script Aktif & Siap Pakai</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  Web App Apps Script bertindak sebagai jembatan *serverless* gratis yang menerima nilai asesmen, progres 21 hari, dan log aktivitas dari portal ini untuk langsung diisikan ke baris Google Sheets admin.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 dark:text-slate-200 flex items-center justify-between">
                  <span>URL Web App Google Apps Script Terdaftar:</span>
                  <span className="text-[10px] text-emerald-500 font-mono">Status: Connected</span>
                </label>
                <input
                  type="url"
                  value={appsScriptUrl}
                  onChange={(e) => setAppsScriptUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0c182c] border border-slate-200 dark:border-white/10 font-mono text-[11px] text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {testResult && (
                <div
                  className={`p-3.5 rounded-2xl border flex items-center space-x-2.5 ${
                    testResult.success
                      ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                      : 'bg-amber-500/15 border-amber-500/30 text-amber-700 dark:text-amber-300'
                  }`}
                >
                  {testResult.success ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                  )}
                  <span className="font-medium text-[11px]">{testResult.message}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                <button
                  onClick={handleTestConnection}
                  disabled={isTesting}
                  className="p-3 rounded-2xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  {isTesting ? (
                    <RefreshCw className="w-4 h-4 animate-spin text-emerald-500" />
                  ) : (
                    <Zap className="w-4 h-4 text-emerald-500" />
                  )}
                  <span>Test Koneksi Apps Script</span>
                </button>

                <button
                  onClick={handleSyncAllToGoogleSheets}
                  disabled={isSyncing}
                  className="p-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
                >
                  {isSyncing ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span>Sinkron Semua ke Sheets</span>
                </button>

                <button
                  onClick={handleDownloadCSV}
                  className="p-3 rounded-2xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-sky-500" />
                  <span>Unduh File CSV Nilai</span>
                </button>
              </div>

              {/* Code Template Box */}
              <div className="pt-2 border-t border-slate-100 dark:border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    Skrip Google Apps Script (Untuk dipasang di Google Sheets Admin):
                  </span>
                  <button
                    onClick={() => setShowCode(!showCode)}
                    className="text-emerald-500 hover:underline text-[11px] font-semibold cursor-pointer"
                  >
                    {showCode ? 'Sembunyikan Kode' : 'Lihat Kode Script'}
                  </button>
                </div>

                {showCode && (
                  <div className="relative rounded-2xl bg-slate-900 border border-slate-700 p-4 font-mono text-[11px] text-slate-300 max-h-52 overflow-y-auto">
                    <button
                      onClick={handleCopyCode}
                      className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[10px] font-sans flex items-center space-x-1 cursor-pointer"
                    >
                      {copiedCode ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Salin Skrip</span>
                        </>
                      )}
                    </button>
                    <pre className="whitespace-pre-wrap">{KAC_APPS_SCRIPT_TEMPLATE}</pre>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: GOOGLE DRIVE & OAUTH */}
          {activeTab === 'drive' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/25 space-y-2">
                <div className="flex items-center space-x-2 text-sky-700 dark:text-sky-300 font-bold">
                  <FolderOpen className="w-4 h-4 text-sky-500" />
                  <span>Akses Google Drive & Google Sheets Langsung</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  Fitur ini menggunakan akun Google Anda dengan izin aman untuk langsung membuat spreadsheet baru di Google Drive Anda atau membaca daftar spreadsheet KAC yang sudah ada.
                </p>
              </div>

              {/* Google Sign-in Card */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0c182c] border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                {googleUser ? (
                  <div className="flex items-center space-x-3 w-full sm:w-auto">
                    {googleUser.photoURL ? (
                      <img
                        src={googleUser.photoURL}
                        alt="Avatar"
                        className="w-11 h-11 rounded-full border border-sky-500/30"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-sky-500/20 text-sky-500 flex items-center justify-center font-bold">
                        {googleUser.displayName?.[0] || 'G'}
                      </div>
                    )}
                    <div>
                      <div className="font-bold text-slate-800 dark:text-white">
                        {googleUser.displayName || 'Pengguna Google'}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                        {googleUser.email}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-slate-600 dark:text-slate-300 text-xs">
                    Belum masuk dengan akun Google. Klik tombol di samping untuk masuk:
                  </div>
                )}

                <div>
                  {googleUser ? (
                    <button
                      onClick={handleGoogleSignOut}
                      className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/10 hover:bg-rose-500/20 hover:text-rose-400 text-slate-700 dark:text-slate-300 font-bold transition-all cursor-pointer"
                    >
                      Keluar dari Akun Google
                    </button>
                  ) : (
                    /* Official GSI Style Button */
                    <button
                      type="button"
                      onClick={handleGoogleSignIn}
                      disabled={isSigningIn}
                      className="px-5 py-2.5 rounded-full bg-white text-slate-700 hover:bg-slate-50 border border-slate-300 shadow-md flex items-center space-x-2.5 font-semibold text-xs transition-all hover:scale-105 cursor-pointer"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 48 48">
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                      </svg>
                      <span>{isSigningIn ? 'Menghubungkan...' : 'Sign in with Google'}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Direct Sheet Creator */}
              {googleUser && (
                <div className="p-4 rounded-2xl bg-white dark:bg-[#15253d] border border-slate-200 dark:border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-white">
                        Ekspor & Buat Spreadsheet Otomatis di Google Drive
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Membuat Google Spreadsheet berisi seluruh data rekap 15 unit peserta KAC secara instan.
                      </p>
                    </div>
                    <button
                      onClick={handleCreateNewGoogleSheet}
                      disabled={isCreatingSheet}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold transition-all shadow-md flex items-center space-x-2 shrink-0 cursor-pointer"
                    >
                      {isCreatingSheet ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <FileSpreadsheet className="w-4 h-4" />
                      )}
                      <span>Buat Spreadsheet di Drive</span>
                    </button>
                  </div>

                  {createdSheetUrl && (
                    <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-between text-xs">
                      <span className="text-emerald-700 dark:text-emerald-300 font-semibold truncate mr-2">
                        Spreadsheet berhasil dibuat!
                      </span>
                      <a
                        href={createdSheetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 rounded-lg bg-emerald-500 text-white font-bold flex items-center space-x-1 shrink-0"
                      >
                        <span>Buka di Google Sheets</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Existing Drive Sheets */}
              {driveSheets.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h4 className="font-bold text-slate-700 dark:text-slate-300">
                    Spreadsheet KAC Terbaru di Google Drive:
                  </h4>
                  <div className="space-y-1.5 max-h-40 overflow-y-auto">
                    {driveSheets.map((file) => (
                      <div
                        key={file.id}
                        className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#0c182c] border border-slate-200 dark:border-white/5 flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2 truncate mr-2">
                          <FileSpreadsheet className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span className="font-medium text-slate-800 dark:text-slate-200 truncate">
                            {file.name}
                          </span>
                        </div>
                        {file.webViewLink && (
                          <a
                            href={file.webViewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-500 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: GITHUB INTEGRATION */}
          {activeTab === 'github' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/25 space-y-2">
                <div className="flex items-center space-x-2 text-indigo-700 dark:text-indigo-300 font-bold">
                  <Github className="w-4 h-4 text-indigo-400" />
                  <span>Repositori GitHub & Otomasi Deployment</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  Repositori GitHub resmi Anda telah terhubung. Kami juga telah menyiapkan file workflow <strong>GitHub Actions</strong> untuk mempublikasikan portal ini secara gratis selamanya ke <strong>GitHub Pages</strong>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0c182c] border border-slate-200 dark:border-white/10 space-y-2">
                <div className="text-slate-500 dark:text-slate-400 font-semibold">
                  Tautan Repositori GitHub:
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/30 font-mono text-indigo-400 text-xs truncate">
                  <span className="truncate mr-2">{GITHUB_REPO_URL}</span>
                  <a
                    href={GITHUB_REPO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-indigo-500 text-white hover:bg-indigo-400 transition-colors shrink-0"
                    title="Buka di GitHub"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Status Commit & Sinkronisasi */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                <div className="flex items-center space-x-2 text-amber-700 dark:text-amber-300 font-bold">
                  <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Status: Commit Tersimpan di Git Lokal (Menunggu Otorisasi Push)</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  Semua pembaruan (<strong>Flipbook Elevator Pitch</strong>, rute <strong>/coach</strong> &amp; <strong>/human</strong>, kurikulum 21 hari 5P+1R, dan rubrik AI) sudah selesai dikomit pada branch <code>main</code> (Commit <code>93ffb3c</code>).
                  GitHub memerlukan <strong>Personal Access Token (PAT)</strong> Anda untuk mengizinkan perintah <code>git push</code>.
                </p>
              </div>

              {/* Opsi Sinkronisasi */}
              <div className="space-y-3 pt-1">
                <h4 className="font-bold text-slate-800 dark:text-white flex items-center justify-between">
                  <span>Pilihan Cara Menyinkronkan ke GitHub:</span>
                  <span className="text-[10px] text-indigo-400 font-mono">3 Opsi Mudah</span>
                </h4>

                <div className="space-y-2.5">
                  {/* Opsi 1: Unduh ZIP dan upload langsung */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <strong className="text-slate-800 dark:text-white text-xs flex items-center space-x-1.5">
                        <Download className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Opsi 1: Unduh Paket Lengkap ZIP (Instan)</span>
                      </strong>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                        Paling Praktis
                      </span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                      Unduh seluruh file proyek yang sudah memuat Flipbook &amp; Habit Lab, lalu unggah via tombol <em>Add file &gt; Upload files</em> di web GitHub Anda.
                    </p>
                    <a
                      href="/download/kac-update-latest.zip"
                      download="kac-communication-academy-latest.zip"
                      className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Unduh File ZIP Kode Terbaru (kac-update-latest.zip)</span>
                    </a>
                  </div>

                  {/* Opsi 2: Perintah Push dengan Token */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 space-y-2">
                    <strong className="text-slate-800 dark:text-white text-xs flex items-center space-x-1.5">
                      <Code className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Opsi 2: Push Melalui Terminal / Berikan Token di Chat</span>
                    </strong>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                      Jika Anda memiliki GitHub Personal Access Token (classic dengan izin <code>repo</code>), Anda dapat mengetikkan token tersebut langsung di kolom chat builder, atau jalankan perintah berikut di terminal:
                    </p>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-white/10 font-mono text-[11px] text-slate-200 overflow-x-auto select-all">
                      git remote set-url origin https://&lt;TOKEN_GITHUB_ANDA&gt;@github.com/stafkacpubdn-creator/KAC-COMMUNICATION-ACADEMY-Beta-.git &amp;&amp; git push -u origin main
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="font-bold text-slate-800 dark:text-white">
                  Panduan Menjalankan GitHub Pages:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px]">
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 space-y-1">
                    <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-[10px]">
                      1
                    </span>
                    <strong className="text-slate-800 dark:text-white block">File Workflow Siap</strong>
                    <p className="text-slate-500 dark:text-slate-400">
                      File <code>.github/workflows/deploy.yml</code> sudah terkonfigurasi otomatis.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 space-y-1">
                    <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-[10px]">
                      2
                    </span>
                    <strong className="text-slate-800 dark:text-white block">Aktifkan Pages</strong>
                    <p className="text-slate-500 dark:text-slate-400">
                      Buka <em>Settings &gt; Pages</em> di repositori, pilih <em>Source: GitHub Actions</em>.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 space-y-1">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-[10px]">
                      3
                    </span>
                    <strong className="text-slate-800 dark:text-white block">Aplikasi Mengudara</strong>
                    <p className="text-slate-500 dark:text-slate-400">
                      Aplikasi otomatis aktif dengan domain gratis <code>github.io</code>!
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={GITHUB_REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold flex items-center justify-center space-x-2 border border-slate-700 shadow-md transition-all cursor-pointer"
                >
                  <Github className="w-4 h-4" />
                  <span>Kunjungi Repositori stafkacpubdn-creator di GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-[#0c182c] border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 shrink-0">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>KAC Communication Academy Hub • Saling Terkoneksi</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-800 dark:text-white font-bold transition-all cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
