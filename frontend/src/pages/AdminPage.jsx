import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import { API_BASE } from '../utils/apiConfig';
import {
  Shield,
  Music,
  Video as VideoIcon,
  MessageSquare,
  LogOut,
  Plus,
  Trash2,
  Upload,
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react';

export default function AdminPage() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const { bhajans, videos, addBhajan, deleteBhajan, addVideo, deleteVideo, uploadAudio } = useData();

  const [activeTab, setActiveTab] = useState('bhajans');
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Modals
  const [showAddBhajanModal, setShowAddBhajanModal] = useState(false);
  const [showAddVideoModal, setShowAddVideoModal] = useState(false);

  // Bhajan Form State
  const [bhajanForm, setBhajanForm] = useState({
    title: '',
    singer: '',
    category: 'Mantra',
    duration: '05:00',
    audio_url: '',
    description: '',
    lyrics: '',
  });
  const [audioFile, setAudioFile] = useState(null);
  const [isUploadingAudio, setIsUploadingAudio] = useState(false);
  const [bhajanSubmitting, setBhajanSubmitting] = useState(false);

  // Video Form State
  const [videoForm, setVideoForm] = useState({
    title: '',
    youtubeId: '',
    speaker: 'Vedant Devotions',
    category: 'Meditation',
    duration: '5:00',
    isShort: false,
    description: '',
  });
  const [videoSubmitting, setVideoSubmitting] = useState(false);

  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  // Verify Auth on mount
  useEffect(() => {
    const token = localStorage.getItem('admin-token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetch(`${API_BASE}/api/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) {
          localStorage.removeItem('admin-token');
          navigate('/login');
        }
      })
      .catch(() => {
        localStorage.removeItem('admin-token');
        navigate('/login');
      });
  }, [navigate]);

  // Fetch messages if messages tab is selected
  useEffect(() => {
    if (activeTab === 'messages') {
      const token = localStorage.getItem('admin-token');
      setLoadingMessages(true);
      fetch(`${API_BASE}/api/contact`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => (res.ok ? res.json() : []))
        .then((data) => setMessages(data))
        .catch((err) => console.error(err))
        .finally(() => setLoadingMessages(false));
    }
  }, [activeTab]);

  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    localStorage.removeItem('admin-user');
    navigate('/login');
  };

  // Handle Add Bhajan
  const handleBhajanSubmit = async (e) => {
    e.preventDefault();
    setBhajanSubmitting(true);
    setStatusMsg({ type: '', text: '' });

    try {
      let finalAudioUrl = bhajanForm.audio_url;

      // Upload file if selected
      if (audioFile) {
        setIsUploadingAudio(true);
        finalAudioUrl = await uploadAudio(audioFile);
        setIsUploadingAudio(false);
      }

      if (!finalAudioUrl) {
        throw new Error('Please provide an audio URL or select an audio file to upload.');
      }

      await addBhajan({
        ...bhajanForm,
        audio_url: finalAudioUrl,
      });

      setStatusMsg({ type: 'success', text: 'Bhajan added successfully!' });
      setShowAddBhajanModal(false);
      setBhajanForm({
        title: '',
        singer: '',
        category: 'Mantra',
        duration: '05:00',
        audio_url: '',
        description: '',
        lyrics: '',
      });
      setAudioFile(null);
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.message || 'Failed to add bhajan' });
    } finally {
      setBhajanSubmitting(false);
      setIsUploadingAudio(false);
    }
  };

  // Handle Add Video
  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    setVideoSubmitting(true);
    setStatusMsg({ type: '', text: '' });

    try {
      await addVideo(videoForm);
      setStatusMsg({ type: 'success', text: 'Video added successfully!' });
      setShowAddVideoModal(false);
      setVideoForm({
        title: '',
        youtubeId: '',
        speaker: 'Vedant Devotions',
        category: 'Meditation',
        duration: '5:00',
        isShort: false,
        description: '',
      });
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.message || 'Failed to add video' });
    } finally {
      setVideoSubmitting(false);
    }
  };

  const handleDeleteBhajan = async (id) => {
    if (window.confirm('Are you sure you want to remove this bhajan?')) {
      try {
        await deleteBhajan(id);
        setStatusMsg({ type: 'success', text: 'Bhajan deleted.' });
      } catch (err) {
        setStatusMsg({ type: 'error', text: err.message });
      }
    }
  };

  const handleDeleteVideo = async (id) => {
    if (window.confirm('Are you sure you want to remove this video?')) {
      try {
        await deleteVideo(id);
        setStatusMsg({ type: 'success', text: 'Video deleted.' });
      } catch (err) {
        setStatusMsg({ type: 'error', text: err.message });
      }
    }
  };

  return (
    <div className="space-y-8 py-8 px-4 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-saffron-500/20">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl gradient-saffron-gold flex items-center justify-center text-white shadow-md">
            <Shield size={24} />
          </div>
          <div>
            <h1 className="font-cinzel text-2xl sm:text-3xl font-bold">
              Vedant Devotion Admin
            </h1>
            <p className="font-outfit text-xs text-stone-500">
              Manage live bhajans, YouTube videos, and user inquiries
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-red-500/30 text-red-500 hover:bg-red-500/10 font-cinzel text-xs font-bold tracking-wider transition-colors cursor-pointer"
        >
          <LogOut size={15} />
          <span>LOGOUT</span>
        </button>
      </div>

      {/* Status Notifications */}
      {statusMsg.text && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between border ${
            statusMsg.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
              : 'bg-red-500/10 border-red-500/30 text-red-500'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-outfit">
            {statusMsg.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
            <span>{statusMsg.text}</span>
          </div>
          <button onClick={() => setStatusMsg({ type: '', text: '' })}>
            <X size={16} />
          </button>
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div
          className={`p-5 rounded-2xl border ${
            isDark ? 'glass-dark border-saffron-500/15' : 'glass-light bg-white border-saffron-200'
          }`}
        >
          <p className="text-[11px] font-cinzel uppercase text-saffron-500 font-bold">Total Bhajans</p>
          <p className="text-3xl font-cinzel font-bold mt-1">{bhajans.length}</p>
        </div>
        <div
          className={`p-5 rounded-2xl border ${
            isDark ? 'glass-dark border-saffron-500/15' : 'glass-light bg-white border-saffron-200'
          }`}
        >
          <p className="text-[11px] font-cinzel uppercase text-saffron-500 font-bold">Total Videos</p>
          <p className="text-3xl font-cinzel font-bold mt-1">{videos.length}</p>
        </div>
        <div
          className={`p-5 rounded-2xl border ${
            isDark ? 'glass-dark border-saffron-500/15' : 'glass-light bg-white border-saffron-200'
          }`}
        >
          <p className="text-[11px] font-cinzel uppercase text-saffron-500 font-bold">Shorts</p>
          <p className="text-3xl font-cinzel font-bold mt-1">
            {videos.filter((v) => v.isShort).length}
          </p>
        </div>
        <div
          className={`p-5 rounded-2xl border ${
            isDark ? 'glass-dark border-saffron-500/15' : 'glass-light bg-white border-saffron-200'
          }`}
        >
          <p className="text-[11px] font-cinzel uppercase text-saffron-500 font-bold">Inquiries</p>
          <p className="text-3xl font-cinzel font-bold mt-1">{messages.length || '•'}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-saffron-500/15">
        <button
          onClick={() => setActiveTab('bhajans')}
          className={`px-6 py-3 font-cinzel text-xs font-bold tracking-wider border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'bhajans'
              ? 'border-saffron-500 text-saffron-500'
              : 'border-transparent text-stone-500 hover:text-stone-300'
          }`}
        >
          <Music size={16} />
          <span>BHAJANS ({bhajans.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('videos')}
          className={`px-6 py-3 font-cinzel text-xs font-bold tracking-wider border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'videos'
              ? 'border-saffron-500 text-saffron-500'
              : 'border-transparent text-stone-500 hover:text-stone-300'
          }`}
        >
          <VideoIcon size={16} />
          <span>VIDEOS ({videos.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('messages')}
          className={`px-6 py-3 font-cinzel text-xs font-bold tracking-wider border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'messages'
              ? 'border-saffron-500 text-saffron-500'
              : 'border-transparent text-stone-500 hover:text-stone-300'
          }`}
        >
          <MessageSquare size={16} />
          <span>CONTACT INQUIRIES</span>
        </button>
      </div>

      {/* BHAJANS TAB */}
      {activeTab === 'bhajans' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-cinzel text-lg font-bold">Manage Audio Bhajans</h3>
            <button
              onClick={() => setShowAddBhajanModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-cinzel text-xs font-bold tracking-wider text-white gradient-saffron-gold shadow-md hover:scale-105 transition-all cursor-pointer"
            >
              <Plus size={15} />
              <span>ADD NEW BHAJAN</span>
            </button>
          </div>

          <div
            className={`rounded-2xl border overflow-hidden ${
              isDark ? 'glass-dark border-saffron-500/15' : 'bg-white border-saffron-200'
            }`}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-outfit">
                <thead className="bg-saffron-500/10 text-saffron-500 uppercase font-cinzel text-[11px] font-bold">
                  <tr>
                    <th className="p-4">Title</th>
                    <th className="p-4">Singer / Artist</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Duration</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-saffron-500/10">
                  {bhajans.map((b) => (
                    <tr key={b.id} className="hover:bg-saffron-500/5 transition-colors">
                      <td className="p-4 font-semibold text-stone-900 dark:text-stone-100">
                        {b.title}
                      </td>
                      <td className="p-4 text-stone-500">{b.singer || b.artist}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-0.5 rounded-full bg-saffron-500/10 text-saffron-500 text-[10px] font-bold uppercase">
                          {b.category}
                        </span>
                      </td>
                      <td className="p-4 text-stone-500">{b.duration}</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteBhajan(b.id)}
                          className="p-1.5 rounded-full text-stone-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                          title="Delete Bhajan"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIDEOS TAB */}
      {activeTab === 'videos' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-cinzel text-lg font-bold">Manage Devotional Videos</h3>
            <button
              onClick={() => setShowAddVideoModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-cinzel text-xs font-bold tracking-wider text-white gradient-saffron-gold shadow-md hover:scale-105 transition-all cursor-pointer"
            >
              <Plus size={15} />
              <span>ADD NEW VIDEO</span>
            </button>
          </div>

          <div
            className={`rounded-2xl border overflow-hidden ${
              isDark ? 'glass-dark border-saffron-500/15' : 'bg-white border-saffron-200'
            }`}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-outfit">
                <thead className="bg-saffron-500/10 text-saffron-500 uppercase font-cinzel text-[11px] font-bold">
                  <tr>
                    <th className="p-4">Thumbnail</th>
                    <th className="p-4">Title</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">YouTube ID</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-saffron-500/10">
                  {videos.map((v) => (
                    <tr key={v.id} className="hover:bg-saffron-500/5 transition-colors">
                      <td className="p-4 w-16">
                        <img
                          src={v.thumbnail}
                          alt={v.title}
                          className="w-12 h-8 rounded object-cover"
                        />
                      </td>
                      <td className="p-4 font-semibold text-stone-900 dark:text-stone-100 max-w-xs truncate">
                        {v.title}
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-0.5 rounded-full bg-saffron-500/10 text-saffron-500 text-[10px] font-bold uppercase">
                          {v.category}
                        </span>
                      </td>
                      <td className="p-4">
                        {v.isShort ? (
                          <span className="text-red-400 font-bold">Shorts</span>
                        ) : (
                          <span className="text-stone-400">Video</span>
                        )}
                      </td>
                      <td className="p-4 font-mono text-[11px] text-stone-400">
                        {v.youtubeId || v.videoId}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteVideo(v.id)}
                          className="p-1.5 rounded-full text-stone-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                          title="Delete Video"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MESSAGES TAB */}
      {activeTab === 'messages' && (
        <div className="space-y-6">
          <h3 className="font-cinzel text-lg font-bold">User Contact Inquiries</h3>

          {loadingMessages ? (
            <div className="py-12 text-center text-stone-400">Loading inquiries...</div>
          ) : messages.length === 0 ? (
            <div className="py-12 text-center text-stone-400">No contact messages received yet.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`p-6 rounded-2xl border space-y-3 ${
                    isDark ? 'glass-dark border-saffron-500/15' : 'bg-white border-saffron-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-saffron-500/10 text-saffron-500 text-[10px] font-bold uppercase font-cinzel">
                      {m.interest || 'General'}
                    </span>
                    <span className="text-[11px] text-stone-400 font-outfit">
                      {new Date(m.date).toLocaleDateString()}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-cinzel text-base font-bold text-stone-900 dark:text-stone-100">
                      {m.name}
                    </h4>
                    <a
                      href={`mailto:${m.email}`}
                      className="text-xs text-saffron-500 hover:underline"
                    >
                      {m.email}
                    </a>
                  </div>

                  <p className="text-xs text-stone-600 dark:text-stone-300 font-outfit whitespace-pre-line leading-relaxed pt-2 border-t border-saffron-500/10">
                    "{m.message}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ADD BHAJAN MODAL */}
      {showAddBhajanModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setShowAddBhajanModal(false)}
        >
          <div
            className={`w-full max-w-xl rounded-3xl p-6 sm:p-8 border shadow-2xl relative my-auto ${
              isDark
                ? 'glass-dark border-saffron-500/30 text-stone-200'
                : 'glass-light bg-white border-saffron-300 text-stone-800'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-saffron-500/20">
              <h3 className="font-cinzel text-lg font-bold text-saffron-500">Add New Bhajan</h3>
              <button
                onClick={() => setShowAddBhajanModal(false)}
                className="p-1 rounded-full hover:bg-saffron-500/10"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleBhajanSubmit} className="mt-5 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-cinzel font-bold">Track Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Achyutam Keshavam Krishna Damodaram"
                  value={bhajanForm.title}
                  onChange={(e) => setBhajanForm({ ...bhajanForm, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl text-xs border border-saffron-500/20 bg-stone-900/40 focus:outline-none focus:border-saffron-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-cinzel font-bold">Singer / Artist</label>
                  <input
                    type="text"
                    placeholder="e.g. Traditional / Jaya Kishori"
                    value={bhajanForm.singer}
                    onChange={(e) => setBhajanForm({ ...bhajanForm, singer: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl text-xs border border-saffron-500/20 bg-stone-900/40 focus:outline-none focus:border-saffron-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-cinzel font-bold">Category</label>
                  <select
                    value={bhajanForm.category}
                    onChange={(e) => setBhajanForm({ ...bhajanForm, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl text-xs border border-saffron-500/20 bg-stone-900/40 focus:outline-none focus:border-saffron-500"
                  >
                    <option value="Mantra">Mantra</option>
                    <option value="Krishna">Krishna</option>
                    <option value="Shiva">Shiva</option>
                    <option value="Ram">Ram</option>
                    <option value="Meditation">Meditation</option>
                  </select>
                </div>
              </div>

              {/* Upload audio file OR paste direct audio URL */}
              <div className="space-y-2 pt-2 border-t border-saffron-500/10">
                <label className="text-xs font-cinzel font-bold">Audio Source (File or URL) *</label>
                <div className="p-3 rounded-xl border border-dashed border-saffron-500/30 space-y-2">
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => setAudioFile(e.target.files[0])}
                    className="text-xs text-stone-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-saffron-500 file:text-white hover:file:bg-saffron-600 cursor-pointer"
                  />
                  <div className="text-[10px] text-stone-500">Or paste MP3 link below:</div>
                  <input
                    type="url"
                    placeholder="https://example.com/audio.mp3"
                    value={bhajanForm.audio_url}
                    onChange={(e) => setBhajanForm({ ...bhajanForm, audio_url: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl text-xs border border-saffron-500/20 bg-stone-900/40 focus:outline-none focus:border-saffron-500"
                  />
                </div>
              </div>

              {/* Lyrics */}
              <div className="space-y-1">
                <label className="text-xs font-cinzel font-bold">Sacred Lyrics (Optional)</label>
                <textarea
                  rows="3"
                  placeholder="Paste Hindi / Sanskrit lyrics..."
                  value={bhajanForm.lyrics}
                  onChange={(e) => setBhajanForm({ ...bhajanForm, lyrics: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl text-xs border border-saffron-500/20 bg-stone-900/40 focus:outline-none focus:border-saffron-500 resize-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddBhajanModal(false)}
                  className="px-5 py-2 rounded-full text-xs font-cinzel"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={bhajanSubmitting || isUploadingAudio}
                  className="px-6 py-2.5 rounded-full font-cinzel text-xs font-bold text-white gradient-saffron-gold shadow-md"
                >
                  {isUploadingAudio
                    ? 'Uploading Audio...'
                    : bhajanSubmitting
                    ? 'Saving Track...'
                    : 'Add Bhajan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD VIDEO MODAL */}
      {showAddVideoModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setShowAddVideoModal(false)}
        >
          <div
            className={`w-full max-w-xl rounded-3xl p-6 sm:p-8 border shadow-2xl relative my-auto ${
              isDark
                ? 'glass-dark border-saffron-500/30 text-stone-200'
                : 'glass-light bg-white border-saffron-300 text-stone-800'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-saffron-500/20">
              <h3 className="font-cinzel text-lg font-bold text-saffron-500">Add New Video</h3>
              <button
                onClick={() => setShowAddVideoModal(false)}
                className="p-1 rounded-full hover:bg-saffron-500/10"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleVideoSubmit} className="mt-5 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-cinzel font-bold">Video Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. रुद्र रुद्र महादेव 🔱 | Har Har Mahadev"
                  value={videoForm.title}
                  onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl text-xs border border-saffron-500/20 bg-stone-900/40 focus:outline-none focus:border-saffron-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-cinzel font-bold">YouTube ID or Video URL *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. xP2tM6SQv18 or https://www.youtube.com/watch?v=xP2tM6SQv18"
                  value={videoForm.youtubeId}
                  onChange={(e) => setVideoForm({ ...videoForm, youtubeId: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl text-xs border border-saffron-500/20 bg-stone-900/40 focus:outline-none focus:border-saffron-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-cinzel font-bold">Category</label>
                  <select
                    value={videoForm.category}
                    onChange={(e) => setVideoForm({ ...videoForm, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl text-xs border border-saffron-500/20 bg-stone-900/40 focus:outline-none focus:border-saffron-500"
                  >
                    <option value="Meditation">Meditation</option>
                    <option value="Shorts">Shorts</option>
                    <option value="Kirtan">Kirtan</option>
                    <option value="Mantra">Mantra</option>
                    <option value="Katha">Katha</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-cinzel font-bold">Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 1:30"
                    value={videoForm.duration}
                    onChange={(e) => setVideoForm({ ...videoForm, duration: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl text-xs border border-saffron-500/20 bg-stone-900/40 focus:outline-none focus:border-saffron-500"
                  />
                </div>
              </div>

              {/* Is Short toggle */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isShortCheck"
                  checked={videoForm.isShort}
                  onChange={(e) => setVideoForm({ ...videoForm, isShort: e.target.checked })}
                  className="rounded accent-saffron-500 cursor-pointer"
                />
                <label htmlFor="isShortCheck" className="text-xs font-cinzel cursor-pointer">
                  This is a YouTube Short (Vertical 9:16)
                </label>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-xs font-cinzel font-bold">Description</label>
                <textarea
                  rows="3"
                  placeholder="Devotional details or hashtags..."
                  value={videoForm.description}
                  onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl text-xs border border-saffron-500/20 bg-stone-900/40 focus:outline-none focus:border-saffron-500 resize-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddVideoModal(false)}
                  className="px-5 py-2 rounded-full text-xs font-cinzel"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={videoSubmitting}
                  className="px-6 py-2.5 rounded-full font-cinzel text-xs font-bold text-white gradient-saffron-gold shadow-md"
                >
                  {videoSubmitting ? 'Saving Video...' : 'Add Video'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
