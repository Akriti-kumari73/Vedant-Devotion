import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import { Play, Music, Sparkles, Compass, Heart, Sun, Flame } from 'lucide-react';

export default function Hero({ onListenBhajans, onWatchVideos }) {
  const { isDark } = useTheme();
  const { playTrack, bhajans } = useData();
  const navigate = useNavigate();

  const [activeMood, setActiveMood] = useState('Meditation');

  const moods = [
    { id: 'Meditation', label: 'Deep Meditation', icon: Compass, trackIdx: 0 },
    { id: 'Aarti', label: 'Morning Aarti', icon: Sun, trackIdx: 1 },
    { id: 'Kirtan', label: 'Krishna Kirtan', icon: Heart, trackIdx: 3 },
    { id: 'Energy', label: 'Shiva Chants', icon: Flame, trackIdx: 0 },
  ];

  const handleMoodSelect = (mood) => {
    setActiveMood(mood.id);
    if (bhajans && bhajans.length > 0) {
      playTrack(mood.trackIdx % bhajans.length);
    }
  };

  const handleListen = () => {
    if (onListenBhajans) onListenBhajans();
    else navigate('/bhajans');
  };

  const handleWatch = () => {
    if (onWatchVideos) onWatchVideos();
    else navigate('/videos');
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4 pt-12 pb-24 text-center">
      {/* Layer 1: Outer Rotating Mandala */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-10 dark:opacity-15">
        <img
          src="/assets/mandala.svg"
          alt="Sacred Mandala"
          className="w-[700px] h-[700px] sm:w-[950px] sm:h-[950px] max-w-none animate-royal-spin object-contain"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/assets/mandala_meditation-CGVxVgm5.svg';
          }}
        />
      </div>

      {/* Layer 2: Inner Counter-Rotating Mandala Ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-8 dark:opacity-12">
        <img
          src="/assets/mandala.svg"
          alt="Sacred Mandala Inner"
          className="w-[450px] h-[450px] sm:w-[600px] sm:h-[600px] max-w-none animate-reverse-spin object-contain"
        />
      </div>

      {/* Layer 3: Radiant Celestial Pulsing Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[620px] h-96 sm:h-[620px] bg-gradient-radial from-amber-500/25 via-orange-500/10 to-transparent rounded-full blur-3xl pointer-events-none animate-celestial-pulse" />

      {/* Main Content Deck */}
      <div className="relative z-10 max-w-4xl mx-auto space-y-7">
        {/* Sanskrit Inscription Pill */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-amber-500/35 glass-luxury-dark text-amber-400 text-xs sm:text-sm font-semibold tracking-widest uppercase font-cinzel shadow-lg shadow-amber-500/15">
          <Sparkles size={15} className="text-amber-400 animate-pulse" />
          <span>॥ ॐ श्री सच्चिदानन्दाय नमः ॥</span>
        </div>

        {/* Hero Headings */}
        <div className="space-y-3">
          <span className="text-xs sm:text-sm uppercase font-bold tracking-[0.3em] text-amber-500 font-cinzel block">
            SACRED MELODIES • VEDIC WISDOM • CELESTIAL PEACE
          </span>

          <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-wider leading-tight">
            <span className="text-stone-900 dark:text-stone-100">VEDANT </span>
            <span className="gold-text-gradient">DEVOTIONS</span>
          </h1>

          <p className="font-cinzel text-lg sm:text-2xl font-medium text-stone-800 dark:text-stone-200 max-w-2xl mx-auto leading-snug">
            Where Ancient Wisdom Finds Its Voice Through Music
          </p>
        </div>

        {/* Hero Narrative */}
        <p className="font-outfit text-sm sm:text-base text-stone-600 dark:text-stone-400 leading-relaxed font-light max-w-2xl mx-auto">
          Immerse your spirit in a world of pure devotion. Crafted with reverence for Sanatan
          Dharma, timeless mantras, soulful bhajans, and uplifting imagery designed to awaken inner
          peace.
        </p>

        {/* Interactive Divine Mood Bar */}
        <div className="pt-2">
          <p className="text-[11px] font-cinzel uppercase font-bold text-stone-500 mb-3 tracking-widest">
            Select Your Sacred Atmosphere
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {moods.map((m) => {
              const Icon = m.icon;
              const isSelected = activeMood === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => handleMoodSelect(m)}
                  className={`px-4 py-2 rounded-full text-xs font-cinzel font-semibold flex items-center gap-2 transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'gradient-saffron-gold text-white shadow-lg shadow-amber-500/30 scale-105'
                      : isDark
                      ? 'bg-stone-900/70 text-stone-300 border border-amber-500/20 hover:border-amber-500/50 hover:text-amber-400'
                      : 'bg-white/80 text-stone-700 border border-amber-400/30 hover:border-amber-400 hover:text-amber-600'
                  }`}
                >
                  <Icon size={14} className={isSelected ? 'text-white' : 'text-amber-500'} />
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Primary Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={handleListen}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full font-cinzel text-xs sm:text-sm font-bold tracking-widest text-white gradient-saffron-gold shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-amber-300/40"
          >
            <Music size={17} />
            <span>LISTEN SACRED BHAJANS</span>
          </button>

          <button
            onClick={handleWatch}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full font-cinzel text-xs sm:text-sm font-bold tracking-widest border transition-all duration-300 cursor-pointer ${
              isDark
                ? 'border-amber-500/35 text-stone-200 hover:bg-amber-500/10 hover:text-amber-300 hover:border-amber-400'
                : 'border-amber-500/50 text-stone-800 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-500'
            }`}
          >
            <Play size={17} className="text-amber-500" />
            <span>WATCH DEVOTIONAL VIDEOS</span>
          </button>
        </div>

        {/* Premium Stat Badges with Gold Foil Accents */}
        <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-center border-t border-amber-500/15">
          <div className="p-3 rounded-2xl">
            <p className="font-cinzel text-2xl sm:text-3xl font-extrabold gold-text-gradient">88+</p>
            <p className="text-[10px] font-outfit uppercase tracking-wider text-stone-500 mt-0.5">Devotional Videos</p>
          </div>
          <div className="p-3 rounded-2xl">
            <p className="font-cinzel text-2xl sm:text-3xl font-extrabold gold-text-gradient">108</p>
            <p className="text-[10px] font-outfit uppercase tracking-wider text-stone-500 mt-0.5">Sacred Japa Beads</p>
          </div>
          <div className="p-3 rounded-2xl">
            <p className="font-cinzel text-2xl sm:text-3xl font-extrabold gold-text-gradient">24/7</p>
            <p className="text-[10px] font-outfit uppercase tracking-wider text-stone-500 mt-0.5">Sanatan Chants</p>
          </div>
          <div className="p-3 rounded-2xl">
            <p className="font-cinzel text-2xl sm:text-3xl font-extrabold gold-text-gradient">∞</p>
            <p className="text-[10px] font-outfit uppercase tracking-wider text-stone-500 mt-0.5">Infinite Inner Peace</p>
          </div>
        </div>
      </div>
    </section>
  );
}
