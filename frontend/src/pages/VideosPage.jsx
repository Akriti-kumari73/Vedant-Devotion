import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import VideoModal from '../components/VideoModal';
import { Search, Play, Video as VideoIcon, Sparkles } from 'lucide-react';

export default function VideosPage() {
  const { isDark } = useTheme();
  const { videos, loading } = useData();

  const [selectedTab, setSelectedTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);

  const tabs = ['All', 'Videos', 'Shorts', 'Meditation', 'Kirtan'];

  const filteredVideos = videos.filter((video) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      video.title.toLowerCase().includes(q) ||
      (video.speaker && video.speaker.toLowerCase().includes(q)) ||
      (video.description && video.description.toLowerCase().includes(q));

    let matchesTab = true;
    if (selectedTab === 'Shorts') matchesTab = !!video.isShort;
    else if (selectedTab === 'Videos') matchesTab = !video.isShort;
    else if (selectedTab !== 'All') matchesTab = video.category === selectedTab;

    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-10 py-8 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-saffron-500/30 glass-saffron text-saffron-600 dark:text-saffron-400 text-xs font-semibold tracking-widest uppercase font-cinzel">
          <VideoIcon size={14} />
          <span>SACRED VISUAL MEDIA</span>
        </div>
        <h1 className="font-cinzel text-3xl sm:text-5xl font-extrabold tracking-wider">
          Devotional <span className="gradient-text-saffron-gold">Videos & Shorts</span>
        </h1>
        <p className="font-outfit text-sm text-stone-600 dark:text-stone-400 font-light">
          Watch divine discourses, chants, meditative music videos, and sacred status shorts.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-5 py-2 rounded-full font-cinzel text-xs font-bold tracking-widest transition-all duration-300 cursor-pointer ${
                selectedTab === tab
                  ? 'text-white gradient-saffron-gold shadow-md'
                  : isDark
                  ? 'bg-stone-900 text-stone-400 hover:text-saffron-400 border border-saffron-500/15'
                  : 'bg-white text-stone-600 hover:text-saffron-600 border border-saffron-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search videos, mantras, keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 rounded-full text-xs font-outfit border transition-all focus:outline-none focus:border-saffron-500 ${
              isDark
                ? 'bg-stone-900/80 border-saffron-500/20 text-stone-100 placeholder:text-stone-500'
                : 'bg-white border-saffron-200 text-stone-900 placeholder:text-stone-400'
            }`}
          />
        </div>
      </div>

      {/* Count summary */}
      <div className="flex items-center justify-between text-xs text-stone-500 border-b border-saffron-500/10 pb-3 font-outfit">
        <span>Showing {filteredVideos.length} videos</span>
        <span>Click any card to play</span>
      </div>

      {/* Grid of Videos */}
      {filteredVideos.length === 0 ? (
        <div className="py-20 text-center space-y-3">
          <p className="font-cinzel text-lg font-bold text-stone-400">No videos found</p>
          <p className="text-xs text-stone-500 font-outfit">
            Try searching for a different sacred term or choose "All".
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredVideos.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedVideo(item)}
              className={`group rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 shadow-lg cursor-pointer flex flex-col ${
                isDark
                  ? 'bg-stone-900/60 border-saffron-500/15 hover:border-saffron-500/40 hover:shadow-saffron-500/10'
                  : 'bg-white border-saffron-200 hover:border-saffron-400 hover:shadow-saffron-500/15'
              }`}
            >
              {/* Thumbnail Container */}
              <div
                className={`relative overflow-hidden bg-black ${
                  item.isShort ? 'aspect-[9/14]' : 'aspect-video'
                }`}
              >
                <img
                  src={
                    item.thumbnail ||
                    `https://img.youtube.com/vi/${item.youtubeId || item.videoId}/hqdefault.jpg`
                  }
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://img.youtube.com/vi/${
                      item.youtubeId || item.videoId
                    }/mqdefault.jpg`;
                  }}
                />

                {/* Play button overlay */}
                <div className="absolute inset-0 bg-black/35 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full gradient-saffron-gold text-white flex items-center justify-center shadow-lg group-hover:scale-115 transition-transform duration-300">
                    <Play size={20} className="ml-0.5" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-sm text-[10px] font-bold text-white font-outfit">
                  {item.duration || (item.isShort ? '0:50' : '5:00')}
                </div>

                {/* Shorts Badge */}
                {item.isShort ? (
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-red-600/80 backdrop-blur-sm text-[9px] font-bold text-white font-cinzel uppercase tracking-wider">
                    Shorts
                  </div>
                ) : null}
              </div>

              {/* Title & Info */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-cinzel font-bold text-saffron-500 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="font-cinzel text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-saffron-500 transition-colors line-clamp-2 mt-1">
                    {item.title}
                  </h3>
                </div>
                <div className="pt-3 mt-2 border-t border-saffron-500/10 flex items-center justify-between text-[11px] text-stone-400 font-outfit">
                  <span>{item.speaker || 'Vedant Devotions'}</span>
                  <span className="text-saffron-500 font-semibold group-hover:translate-x-0.5 transition-transform">
                    Watch ›
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Embedded Video Modal */}
      {selectedVideo && (
        <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      )}
    </div>
  );
}
