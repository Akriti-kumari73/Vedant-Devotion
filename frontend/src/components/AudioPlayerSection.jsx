import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Volume2,
  VolumeX,
  FileText,
  Music,
  Disc,
  Sparkles
} from 'lucide-react';

export default function AudioPlayerSection({ showFullList = false }) {
  const { isDark } = useTheme();
  const {
    bhajans,
    loading,
    currentTrack,
    currentTrackIndex,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isRepeating,
    playTrack,
    togglePlay,
    nextTrack,
    prevTrack,
    seekTo,
    setVolume,
    toggleMute,
    setIsRepeating,
    setShowLyricsModal,
  } = useData();

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  if (loading && bhajans.length === 0) {
    return (
      <div className="py-20 text-center">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="font-cinzel text-sm text-amber-500">Loading Sacred Bhajans...</p>
      </div>
    );
  }

  const displayedBhajans = showFullList ? bhajans : bhajans.slice(0, 6);

  return (
    <section id="bhajans" className="py-20 px-4 max-w-7xl mx-auto space-y-12">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs uppercase font-bold tracking-[0.25em] text-amber-500 font-cinzel">
          ॥ DEVOTIONAL BHAJANS ॥
        </span>
        <h2 className="font-cinzel text-3xl sm:text-4xl font-bold">
          Sacred Melodies for <span className="gold-text-gradient">Inner Peace</span>
        </h2>
        <p className="font-outfit text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-light">
          Immerse yourself in soul-stirring bhajans, sacred chants, and mantras sung with pure devotion.
        </p>
      </div>

      {/* Main Elevated Audio Player Deck */}
      {currentTrack && (
        <div
          className={`p-6 sm:p-9 rounded-3xl border transition-all duration-300 relative overflow-hidden shadow-2xl card-hover-lift ${
            isDark
              ? 'glass-luxury-dark border-amber-500/25'
              : 'glass-luxury-light bg-white border-amber-400/50'
          }`}
        >
          {/* Subtle Ambient Gold Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Disc Artwork & Track Meta */}
            <div className="lg:col-span-5 flex items-center gap-5">
              <div
                className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex-shrink-0 overflow-hidden border-2 border-amber-400/40 flex items-center justify-center gradient-saffron-gold shadow-lg shadow-amber-500/25 ${
                  isPlaying ? 'animate-pulse' : ''
                }`}
              >
                <Disc
                  size={44}
                  className={`text-white transition-transform duration-700 ${
                    isPlaying ? 'animate-spin' : ''
                  }`}
                  style={{ animationDuration: '6s' }}
                />
              </div>

              <div className="space-y-1 overflow-hidden">
                <div className="inline-block px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider text-amber-500 font-cinzel">
                  {currentTrack.category || 'Mantra'}
                </div>
                <h3 className="font-cinzel text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 truncate">
                  {currentTrack.title}
                </h3>
                <p className="font-outfit text-xs sm:text-sm text-stone-500 dark:text-stone-400 truncate">
                  {currentTrack.singer || currentTrack.artist || 'Traditional'}
                </p>

                {/* Animated Equalizer Waves */}
                {isPlaying && (
                  <div className="flex items-end gap-1 h-3 pt-1">
                    <span className="w-1 bg-amber-500 rounded-full wave-bar-1" />
                    <span className="w-1 bg-amber-500 rounded-full wave-bar-2" />
                    <span className="w-1 bg-amber-500 rounded-full wave-bar-3" />
                    <span className="w-1 bg-amber-500 rounded-full wave-bar-4" />
                  </div>
                )}
              </div>
            </div>

            {/* Right: Controls & Scrub Bar */}
            <div className="lg:col-span-7 space-y-4">
              {/* Scrub Progress Bar */}
              <div className="space-y-1.5">
                <div className="relative w-full">
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={currentTime}
                    onChange={(e) => seekTo(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-stone-300 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    style={{
                      background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${progressPercent}%, ${
                        isDark ? '#44403c' : '#d6d3d1'
                      } ${progressPercent}%, ${isDark ? '#44403c' : '#d6d3d1'} 100%)`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-outfit text-stone-500">
                  <span>{formatTime(currentTime)}</span>
                  <span>{currentTrack.duration || formatTime(duration)}</span>
                </div>
              </div>

              {/* Action Buttons Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                <div className="flex items-center gap-3 sm:gap-5 mx-auto sm:mx-0">
                  <button
                    onClick={() => setIsRepeating(!isRepeating)}
                    title={isRepeating ? 'Disable Repeat' : 'Repeat Track'}
                    className={`p-2 rounded-full transition-colors cursor-pointer ${
                      isRepeating ? 'text-amber-500 bg-amber-500/10' : 'text-stone-400 hover:text-amber-500'
                    }`}
                  >
                    <Repeat size={18} />
                  </button>

                  <button
                    onClick={prevTrack}
                    title="Previous Track"
                    className="p-2.5 rounded-full text-stone-700 dark:text-stone-300 hover:text-amber-500 hover:bg-amber-500/10 transition-colors cursor-pointer"
                  >
                    <SkipBack size={20} />
                  </button>

                  <button
                    onClick={togglePlay}
                    title={isPlaying ? 'Pause' : 'Play'}
                    className="w-13 h-13 rounded-full gradient-saffron-gold text-white flex items-center justify-center shadow-xl shadow-amber-500/35 hover:scale-108 active:scale-95 transition-all cursor-pointer border border-amber-300/40"
                  >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-0.5" />}
                  </button>

                  <button
                    onClick={nextTrack}
                    title="Next Track"
                    className="p-2.5 rounded-full text-stone-700 dark:text-stone-300 hover:text-amber-500 hover:bg-amber-500/10 transition-colors cursor-pointer"
                  >
                    <SkipForward size={20} />
                  </button>

                  {/* Lyrics Button */}
                  {currentTrack.lyrics && (
                    <button
                      onClick={() => setShowLyricsModal(true)}
                      title="Read Lyrics"
                      className="px-3 py-1.5 rounded-full border border-amber-500/30 text-amber-500 hover:bg-amber-500/10 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <FileText size={14} />
                      <span>Lyrics</span>
                    </button>
                  )}
                </div>

                {/* Volume Slider */}
                <div className="flex items-center gap-2 text-stone-400">
                  <button onClick={toggleMute} title={isMuted ? 'Unmute' : 'Mute'} className="hover:text-amber-500">
                    {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-20 sm:w-24 h-1 bg-stone-300 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bhajans Playlist Grid with Luxury Cards */}
      <div className="space-y-4">
        <h3 className="font-cinzel text-lg font-bold text-stone-800 dark:text-stone-200">
          Featured Sacred Tracks
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedBhajans.map((track, idx) => {
            const isCurrent = idx === currentTrackIndex;
            return (
              <div
                key={track.id || idx}
                onClick={() => playTrack(idx)}
                className={`p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 cursor-pointer group card-hover-lift ${
                  isCurrent
                    ? 'border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/15'
                    : isDark
                    ? 'glass-luxury-dark border-amber-500/15 hover:border-amber-400/40 hover:bg-stone-900/80'
                    : 'glass-luxury-light bg-white border-amber-300/40 hover:border-amber-500 hover:bg-amber-50/50'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 ${
                    isCurrent
                      ? 'gradient-saffron-gold text-white shadow-md'
                      : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                  }`}
                >
                  {isCurrent && isPlaying ? (
                    <Pause size={18} />
                  ) : (
                    <Play size={18} className="ml-0.5" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4
                      className={`text-sm font-cinzel font-bold truncate ${
                        isCurrent
                          ? 'text-amber-500'
                          : 'text-stone-800 dark:text-stone-200 group-hover:text-amber-500'
                      }`}
                    >
                      {track.title}
                    </h4>
                    <span className="text-[11px] font-outfit text-stone-400 flex-shrink-0">
                      {track.duration}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-stone-500 mt-1">
                    <span className="truncate">{track.singer || track.artist}</span>
                    <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase font-cinzel">
                      {track.category}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Button to Full Sanctuary */}
      {!showFullList && (
        <div className="text-center pt-4">
          <Link
            to="/bhajans"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-cinzel text-xs font-bold tracking-widest text-white gradient-saffron-gold shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 hover:scale-105 transition-all duration-300 border border-amber-300/40"
          >
            <Music size={16} />
            <span>LISTEN TO ALL BHAJANS</span>
          </Link>
        </div>
      )}
    </section>
  );
}
