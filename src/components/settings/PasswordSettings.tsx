import React, { useState } from 'react';
import {
  KeyRound,
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PasswordSettings: React.FC = () => {
  const { currentUser, addNotification } = useApp();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Password baru dan konfirmasi tidak cocok!');
      return;
    }
    setSuccessMsg(true);
    addNotification('Password Berhasil Diubah', 'Kredensial keamanan akun Anda telah diperbarui.', 'achievement');
    setTimeout(() => {
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setSuccessMsg(false);
    }, 2500);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-5">
        <div className="border-b border-slate-100 dark:border-white/10 pb-4">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center space-x-2">
            <KeyRound className="w-5 h-5 text-amber-400" />
            <span>Ganti Password & Keamanan Akun</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Akun: <strong className="text-slate-700 dark:text-slate-200">{currentUser.name}</strong> ({currentUser.unit})
          </p>
        </div>

        {successMsg && (
          <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center space-x-2 text-xs text-emerald-600 dark:text-emerald-300 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Password berhasil diperbarui dan disinkronkan ke seluruh sesi.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Password Saat Ini
            </label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                required
                placeholder="Masukkan password lama"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Password Baru (Minimal 8 Karakter)
            </label>
            <input
              type={showPass ? 'text' : 'password'}
              required
              minLength={8}
              placeholder="Masukkan password baru"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Konfirmasi Password Baru
            </label>
            <input
              type={showPass ? 'text' : 'password'}
              required
              minLength={8}
              placeholder="Ulangi password baru"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-white font-bold text-xs shadow-md shadow-amber-500/25 flex items-center justify-center space-x-2 transition-all hover:scale-[1.01]"
            >
              <Lock className="w-4 h-4" />
              <span>Simpan & Perbarui Password</span>
            </button>
          </div>
        </form>

        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#12223a] border border-slate-100 dark:border-white/5 text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
          <strong className="text-slate-700 dark:text-slate-300 block">Kaidah Keamanan Akun KAC:</strong>
          <p>
            Pastikan password Anda memadukan huruf kapital, angka, dan simbol untuk melindungi integritas data penilaian dan catatan pengabaran.
          </p>
        </div>
      </div>
    </div>
  );
};
