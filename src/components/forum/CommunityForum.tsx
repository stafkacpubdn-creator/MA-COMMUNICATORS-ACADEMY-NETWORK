import React, { useState } from 'react';
import {
  MessageSquare,
  Heart,
  Share2,
  Plus,
  Send,
  Sparkles,
  Filter,
  MessageCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ForumPost } from '../../types';

export const CommunityForum: React.FC = () => {
  const { forumPosts, addForumPost, toggleLikePost, addCommentToPost, currentUser } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<ForumPost['category']>('Tips Belajar');
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');

  const categories = ['Semua', 'Pra-Pengabaran', 'Elevator Pitch', 'Pembinaan', 'AORA', 'Tips Belajar'];

  const filteredPosts = forumPosts.filter((p) => {
    if (activeCategory === 'Semua') return true;
    return p.category === activeCategory;
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;
    addForumPost(newTitle.trim(), newContent.trim(), newCategory);
    setNewTitle('');
    setNewContent('');
    setShowNewPostModal(false);
  };

  const handleSendComment = (postId: string) => {
    if (!commentText.trim()) return;
    addCommentToPost(postId, commentText.trim());
    setCommentText('');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-sky-400" />
            <span>Forum Diskusi Komunitas KAC & Shaf 2</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Ruang kolaborasi untuk berbagi pengalaman lapangan, insight AORA, dan solusi pengabaran
          </p>
        </div>
        <button
          onClick={() => setShowNewPostModal(true)}
          className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs shadow-md shadow-sky-500/25 flex items-center space-x-1.5 transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Bagikan Pengalaman / Post Baru</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
              activeCategory === cat
                ? 'bg-sky-500 text-white font-bold shadow-sm'
                : 'bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Post List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="p-6 rounded-3xl bg-white dark:bg-[#172b47] border border-slate-200 dark:border-white/10 shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={post.authorAvatar}
                  alt={post.authorName}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-sky-400/40"
                />
                <div>
                  <div className="font-bold text-xs md:text-sm text-slate-800 dark:text-white">
                    {post.authorName}
                  </div>
                  <div className="text-[11px] text-sky-500 dark:text-sky-300">
                    {post.authorUnit} • <span className="text-slate-400">{post.timestamp}</span>
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-500 dark:text-sky-300 border border-sky-500/20">
                {post.category}
              </span>
            </div>

            <div>
              <h3 className="font-bold text-sm md:text-base text-slate-800 dark:text-white mb-1.5">
                {post.title}
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {post.content}
              </p>
            </div>

            <div className="flex items-center space-x-6 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-white/10 pt-3">
              <button
                onClick={() => toggleLikePost(post.id)}
                className={`flex items-center space-x-1.5 transition-colors ${
                  post.likedByMe ? 'text-rose-500 font-bold' : 'hover:text-rose-500'
                }`}
              >
                <Heart className={`w-4 h-4 ${post.likedByMe ? 'fill-rose-500' : ''}`} />
                <span>{post.likes} Suka</span>
              </button>
              <button
                onClick={() =>
                  setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)
                }
                className="flex items-center space-x-1.5 hover:text-sky-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{post.comments.length} Tanggapan</span>
              </button>
            </div>

            {activeCommentPostId === post.id && (
              <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-white/5">
                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {post.comments.map((comm) => (
                    <div
                      key={comm.id}
                      className="p-3 rounded-2xl bg-slate-50 dark:bg-[#12223a] text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                        <span>
                          {comm.authorName} ({comm.authorUnit})
                        </span>
                        <span className="text-[10px] text-slate-400 font-normal">
                          {comm.timestamp}
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300">{comm.text}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Tuliskan tanggapan atau masukan..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendComment(post.id)}
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                  <button
                    onClick={() => handleSendComment(post.id)}
                    className="p-2 rounded-xl bg-sky-500 text-white hover:bg-sky-400 shadow-md transition-all"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {showNewPostModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1a2d4b] rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-white/10 space-y-4">
            <h3 className="font-bold text-base text-slate-800 dark:text-white">
              Tulis Postingan Diskusi Baru
            </h3>
            <form onSubmit={handleCreatePost} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Kategori
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#12223a] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white focus:outline-none"
                >
                  <option value="Tips Belajar">Tips Belajar Mandiri</option>
                  <option value="Pra-Pengabaran">Pra-Pengabaran</option>
                  <option value="Elevator Pitch">Elevator Pitch</option>
                  <option value="Pembinaan">Pembinaan Kader</option>
                  <option value="AORA">Metodologi AORA</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Judul Topik
                </label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Cara Menjawab Keraguan Audiens tentang..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Isi Pembahasan & Pengalaman
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tuliskan kronologi singkat, respon audiens, dan solusi yang Anda terapkan..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewPostModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold shadow-md shadow-sky-500/25"
                >
                  Terbitkan Diskusi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
