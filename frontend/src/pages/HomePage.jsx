import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import AudioPlayerSection from '../components/AudioPlayerSection';
import QuotesSection from '../components/QuotesSection';
import VideoModal from '../components/VideoModal';
import { Play, Sparkles, Video as VideoIcon, ArrowRight, Sun, Flame, Heart } from 'lucide-react';

export default function HomePage() {
  const { isDark } = useTheme();
  const { videos } = useData();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoCategory, setVideoCategory] = useState('All');

  const categories = ['All', 'Meditation', 'Shorts', 'Kirtan'];

  const filteredVideos = videos
    .filter((v) => {
      if (videoCategory === 'All') return true;
      if (videoCategory === 'Shorts') return v.isShort;
      return v.category === videoCategory;
    })
    .slice(0, 8);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-16">
      {/* Royal Hero Section */}
      <Hero
        onListenBhajans={() => scrollToSection('bhajans')}
        onWatchVideos={() => scrollToSection('videos')}
      />

      {/* Museum-Grade About Section */}
      <AboutSection />

      {/* Featured Audio Player Section */}
      <AudioPlayerSection showFullList={false} />

      {/* Cinematic Devotional Videos Showcase */}
      <section id="videos" className="py-20 px-4 max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-1.5">
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-amber-500 font-cinzel">
              ॥ SACRED VISUAL THEATRE ॥
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold">
              Visualizing the <span className="gold-text-gradient">Divine Essence</span>
            </h2>
            <p className="font-outfit text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-light">
              Watch uplifting chanting, meditation visuals, sacred mantras, and soul-elevating shorts.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setVideoCategory(cat)}
                className={`px-5 py-2 rounded-full font-cinzel text-xs font-bold tracking-wider transition-all duration-300 cursor-pointer ${
                  videoCategory === cat
                    ? 'text-white gradient-saffron-gold shadow-lg shadow-amber-500/25 scale-105'
                    : isDark
                    ? 'glass-luxury-dark text-stone-400 hover:text-amber-400 border border-amber-500/15'
                    : 'glass-luxury-light bg-white text-stone-600 hover:text-amber-600 border border-amber-400/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Videos Grid with Luxury Dark Glass and Gold Ripple Hover */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredVideos.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedVideo(item)}
              className={`group rounded-3xl overflow-hidden border transition-all duration-500 shadow-xl cursor-pointer flex flex-col card-hover-lift ${
                isDark
                  ? 'glass-luxury-dark border-amber-500/20 hover:border-amber-400/60'
                  : 'glass-luxury-light bg-white border-amber-400/40 hover:border-amber-500'
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
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://img.youtube.com/vi/${
                      item.youtubeId || item.videoId
                    }/mqdefault.jpg`;
                  }}
                />

                {/* Golden Overlay & Radiant Play Button */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-13 h-13 rounded-full gradient-saffron-gold text-white flex items-center justify-center shadow-xl shadow-amber-500/40 group-hover:scale-115 transition-transform duration-300 border border-amber-300/50">
                    <Play size={22} className="ml-0.5" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-bold text-amber-200 font-cinzel border border-amber-400/20">
                  {item.duration || (item.isShort ? '0:50' : '5:00')}
                </div>

                {/* Shorts Badge */}
                {item.isShort ? (
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-red-600/90 backdrop-blur-md text-[9px] font-bold text-white font-cinzel uppercase tracking-wider shadow-md">
                    Shorts
                  </div>
                ) : null}
              </div>

              {/* Title & Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-cinzel font-bold text-amber-500 uppercase tracking-wider block">
                    {item.category}
                  </span>
                  <h3 className="font-cinzel text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-500 transition-colors line-clamp-2 mt-1 leading-snug">
                    {item.title}
                  </h3>
                </div>
                <div className="pt-3 mt-3 border-t border-amber-500/15 flex items-center justify-between text-[11px] text-stone-400 font-outfit">
                  <span className="truncate">{item.speaker || 'Vedant Devotions'}</span>
                  <span className="text-amber-500 font-semibold group-hover:translate-x-1 transition-transform flex-shrink-0">
                    Watch ›
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Videos Button */}
        <div className="text-center pt-6">
          <Link
            to="/videos"
            className="inline-flex items-center gap-2 px-9 py-3.5 rounded-full font-cinzel text-xs font-bold tracking-widest text-white gradient-saffron-gold shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105 transition-all duration-300 border border-amber-300/40"
          >
            <VideoIcon size={16} />
            <span>EXPLORE ALL 88+ DEVOTIONAL VIDEOS</span>
          </Link>
        </div>
      </section>

      {/* Daily Shlok & Sacred Wisdom Section */}
      <QuotesSection />

      {/* Luxury Golden Sanctuary Callout Banner */}
      <section className="px-4 max-w-7xl mx-auto py-12">
        <div
          className={`relative rounded-3xl p-8 sm:p-14 overflow-hidden border text-center space-y-6 card-hover-lift ${
            isDark
              ? 'glass-luxury-dark border-amber-500/30'
              : 'glass-luxury-light bg-gradient-to-r from-amber-50/80 via-orange-50/60 to-amber-50/80 border-amber-400/50'
          }`}
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 w-16 h-16 mx-auto rounded-2xl gradient-saffron-gold text-white flex items-center justify-center shadow-xl shadow-amber-500/35 border border-amber-300/40">
            <Sparkles size={32} />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-amber-500 font-cinzel block">
              ॥ ARTIST & DEVOTEE SANCTUARY ॥
            </span>
            <h2 className="font-cinzel text-2xl sm:text-4xl font-bold">
              Join Us On This Soulful Journey
            </h2>
            <p className="font-outfit text-sm text-stone-600 dark:text-stone-300 font-light leading-relaxed">
              Whether you are a devotee seeking inner quietude, a scholar exploring Vedic truths, or a
              musician wishing to release devotional singing, Vedant Devotions welcomes you to our
              sacred digital home.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/contact"
              className="px-9 py-3.5 rounded-full font-cinzel text-xs font-bold tracking-widest text-white gradient-saffron-gold shadow-xl shadow-amber-500/30 hover:scale-105 transition-all flex items-center gap-2 border border-amber-300/40"
            >
              <span>CONNECT WITH US</span>
              <ArrowRight size={15} />
            </Link>
            <Link
              to="/about"
              className={`px-9 py-3.5 rounded-full font-cinzel text-xs font-bold tracking-widest border transition-all ${
                isDark
                  ? 'border-amber-500/30 text-stone-200 hover:bg-amber-500/10 hover:border-amber-400'
                  : 'border-amber-500/40 text-stone-800 hover:bg-white'
              }`}
            >
              LEARN OUR SACRED STORY
            </Link>
          </div>
        </div>
      </section>

      {/* Video Modal Popup */}
      {selectedVideo && (
        <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      )}
    </div>
  );
}
