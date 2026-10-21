import React, { useState, useRef } from 'react';
import {
  X,
  Camera,
  Upload,
  Link,
  Check,
  Sparkles,
  User,
  RotateCcw,
  Image as ImageIcon,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

// Curated professional communicator personas
const AVATAR_PRESETS = [
  {
    id: 'preset-1',
    label: 'Bung Eksekutif',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'preset-2',
    label: 'Bung Trainer',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'preset-3',
    label: 'Bung Negosiator',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'preset-4',
    label: 'Bung Fasilitator',
    url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'preset-5',
    label: 'Bung Analis',
    url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'preset-6',
    label: 'Bung Motivator',
    url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'preset-7',
    label: 'Bung Mentor',
    url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'preset-8',
    label: 'Bung Komunikator',
    url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80',
  },
];

interface ProfilePictureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfilePictureModal: React.FC<ProfilePictureModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { currentUser, updateUserProfilePicture, addNotification } = useApp();
  const [selectedAvatar, setSelectedAvatar] = useState<string>(currentUser.avatar);
  const [customUrl, setCustomUrl] = useState<string>('');
  const [uploadError, setUploadError] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Handle local file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError('');

    // Check size (< 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Ukuran file maksimal 5 MB.');
      return;
    }

    // Check type
    if (!file.type.startsWith('image/')) {
      setUploadError('File harus berupa gambar (JPG, PNG, WebP).');
      return;
    }

    setIsProcessing(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;

      // Create an image to compress/scale if very large for optimal localStorage performance
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 320;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.88);
          setSelectedAvatar(compressedDataUrl);
        } else {
          setSelectedAvatar(dataUrl);
        }
        setIsProcessing(false);
      };
      img.onerror = () => {
        setSelectedAvatar(dataUrl);
        setIsProcessing(false);
      };
      img.src = dataUrl;
    };

    reader.onerror = () => {
      setUploadError('Gagal membaca file gambar.');
      setIsProcessing(false);
    };

    reader.readAsDataURL(file);
  };

  const handleApplyUrl = () => {
    if (!customUrl.trim()) return;
    setSelectedAvatar(customUrl.trim());
    setCustomUrl('');
  };

  const handleSave = () => {
    updateUserProfilePicture(currentUser.id, selectedAvatar);
    addNotification(
      'Foto Profil Diperbarui',
      `Foto profil untuk ${currentUser.name} berhasil disimpan.`,
      'success'
    );
    onClose();
  };

  const handleResetDefault = () => {
    const defaultUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80';
    setSelectedAvatar(defaultUrl);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-[#172b47] rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-white/10 space-y-6 max-h-[92vh] overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/15 text-sky-500 dark:text-sky-400 flex items-center justify-center">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800 dark:text-white">
                Ganti Foto Profil
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {currentUser.name} • {currentUser.unit}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Avatar Preview Area */}
        <div className="flex flex-col items-center justify-center py-2 space-y-3">
          <div className="relative group">
            <img
              src={selectedAvatar}
              alt="Pratinjau Avatar"
              className="w-28 h-28 rounded-full object-cover shadow-xl border-4 border-white dark:border-[#243d63] ring-4 ring-sky-500/30 transition-transform duration-300 group-hover:scale-105"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-1 right-1 p-2 rounded-full bg-sky-500 text-white shadow-lg hover:bg-sky-600 transition-all cursor-pointer"
              title="Unggah dari file"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="text-center">
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center justify-center space-x-1">
              <span>Pratinjau Foto Profil</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <p className="text-[11px] text-slate-400">
              Akan tampil di navbar, forum diskusi, rapor, dan dasbor peserta.
            </p>
          </div>
        </div>

        {/* Method 1: Local File Upload */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Unggah Foto dari Perangkat
          </label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/png, image/jpeg, image/webp"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing}
            className="w-full py-3 px-4 rounded-2xl border-2 border-dashed border-slate-300 dark:border-white/20 hover:border-sky-500 dark:hover:border-sky-400 bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-200 flex items-center justify-center space-x-2 text-xs font-semibold transition-all hover:bg-sky-500/5 cursor-pointer"
          >
            <Upload className="w-4 h-4 text-sky-400" />
            <span>
              {isProcessing ? 'Memproses Gambar...' : 'Pilih Berkas Foto (JPG, PNG, WebP)'}
            </span>
          </button>
          {uploadError && (
            <p className="text-[11px] text-rose-500 font-medium">{uploadError}</p>
          )}
        </div>

        {/* Method 2: Custom URL */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Atau Tempel URL Gambar
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Link className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="https://example.com/foto-anda.jpg"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <button
              onClick={handleApplyUrl}
              disabled={!customUrl.trim()}
              className="px-3 py-2 rounded-xl bg-slate-200 dark:bg-white/10 hover:bg-sky-500 hover:text-white text-slate-700 dark:text-slate-200 text-xs font-bold transition-all disabled:opacity-40"
            >
              Terapkan
            </button>
          </div>
        </div>

        {/* Method 3: Curated Avatar Presets */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Pilihan Avatar Karakter Komunikator
          </label>
          <div className="grid grid-cols-4 gap-2.5">
            {AVATAR_PRESETS.map((preset) => {
              const isSelected = selectedAvatar === preset.url;
              return (
                <button
                  key={preset.id}
                  onClick={() => setSelectedAvatar(preset.url)}
                  className={`p-1.5 rounded-2xl border text-center transition-all relative flex flex-col items-center group cursor-pointer ${
                    isSelected
                      ? 'border-sky-500 bg-sky-500/10 ring-2 ring-sky-500/30'
                      : 'border-slate-200 dark:border-white/10 hover:border-sky-400/40 bg-slate-50 dark:bg-white/5'
                  }`}
                >
                  <img
                    src={preset.url}
                    alt={preset.label}
                    className="w-12 h-12 rounded-xl object-cover mb-1 group-hover:scale-105 transition-transform"
                  />
                  <span className="text-[10px] font-medium text-slate-700 dark:text-slate-300 truncate w-full text-center">
                    {preset.label}
                  </span>
                  {isSelected && (
                    <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-sky-500 text-white flex items-center justify-center text-[10px]">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between gap-3">
          <button
            onClick={handleResetDefault}
            className="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white flex items-center space-x-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Bawaan</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white text-xs font-bold shadow-lg shadow-sky-500/25 hover:from-sky-600 hover:to-indigo-700 transition-all flex items-center space-x-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Simpan Foto Profil</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
