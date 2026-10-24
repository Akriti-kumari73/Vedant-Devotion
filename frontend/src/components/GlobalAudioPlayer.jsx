import React, { useState } from 'react';
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
  Disc,
  ChevronUp,
  ChevronDown,
  X,
  Sparkles
} from 'lucide-react';

export default function GlobalAudioPlayer() {
  const { isDark } = useTheme();
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isRepeating,
    showLyricsModal,
    togglePlay,
    nextTrack,
    prevTrack,
    seekTo,
    setVolume,
    toggleMute,
    setIsRepeating,
    setShowLyricsModal,
  } = useData();

  const [isMinimized, setIsMinimized] = useState(false);

  if (!currentTrack) return null;

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <>
      {/* Minimized Floating Pill Indicator */}
      {isMinimized && (
        <div className="fixed bottom-5 right-5 z-40 animate-bounce">
          <button
            onClick={() => setIsMinimized(false)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-full gradient-saffron-gold text-white shadow-2xl shadow-saffron-500/40 border border-amber-300/40 cursor-pointer hover:scale-105 transition-transform"
          >
            <Disc
              size={18}
              className={`text-amber-100 ${isPlaying ? 'animate-spin' : ''}`}
              style={{ animationDuration: '4s' }}
            />
            <span className="font-cinzel text-xs font-bold truncate max-w-[150px]">
              {currentTrack.title}
            </span>
            <ChevronUp size={16} />
          </button>
        </div>
      )}

      {/* Main Persistent Bottom Player Bar */}
      {!isMinimized && (
        <div className="fixed bottom-0 left-0 right-0 z-40 px-3 sm:px-6 pb-3 pt-1 pointer-events-none">
          <div
            className={`pointer-events-auto max-w-6xl mx-auto rounded-3xl border transition-all duration-300 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)] ${
              isDark
                ? 'glass-luxury-dark border-amber-500/30'
                : 'glass-luxury-light border-amber-500/40 bg-white/95'
            }`}
          >
            {/* Top Glowing Progress Line */}
            <div className="relative w-full h-1 bg-stone-700/20">
              <div
                className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 transition-all duration-150"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="px-4 sm:px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
              {/* Left: Track Details & Spinning Mandala Disc */}
              <div className="flex items-center gap-3.5 w-full md:w-1/3">
                <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl gradient-saffron-gold flex items-center justify-center flex-shrink-0 shadow-md shadow-saffron-500/25 overflow-hidden">
                  <Disc
                    size={24}
                    className={`text-white transition-transform duration-700 ${
                      isPlaying ? 'animate-spin' : ''
                    }`}
                    style={{ animationDuration: '5s' }}
                  />
                </div>

                <div className="overflow-hidden space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-amber-500 font-cinzel">
                      {currentTrack.category || 'Mantra'}
                    </span>
                    {isPlaying && (
                      <div className="flex items-end gap-0.5 h-2.5">
                        <span className="w-0.5 bg-amber-500 rounded-full wave-bar-1" />
                        <span className="w-0.5 bg-amber-500 rounded-full wave-bar-2" />
                        <span className="w-0.5 bg-amber-500 rounded-full wave-bar-3" />
                        <span className="w-0.5 bg-amber-500 rounded-full wave-bar-4" />
                      </div>
                    )}
                  </div>
                  <h4 className="font-cinzel text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 truncate">
                    {currentTrack.title}
                  </h4>
                  <p className="font-outfit text-[11px] text-stone-500 dark:text-stone-400 truncate">
                    {currentTrack.singer || currentTrack.artist || 'Traditional'}
                  </p>
                </div>
              </div>

              {/* Center: Playback Controls & Scrub Bar */}
              <div className="flex flex-col items-center gap-1.5 w-full md:w-5/12">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsRepeating(!isRepeating)}
                    title={isRepeating ? 'Disable Repeat' : 'Repeat'}
                    className={`p-1.5 rounded-full transition-colors ${
                      isRepeating ? 'text-amber-500' : 'text-stone-400 hover:text-amber-500'
                    }`}
                  >
                    <Repeat size={15} />
                  </button>

                  <button
                    onClick={prevTrack}
                    title="Previous"
                    className="p-1.5 text-stone-600 dark:text-stone-300 hover:text-amber-500 transition-colors"
                  >
                    <SkipBack size={18} />
                  </button>

                  <button
                    onClick={togglePlay}
                    title={isPlaying ? 'Pause' : 'Play'}
                    className="w-10 h-10 rounded-full gradient-saffron-gold text-white flex items-center justify-center shadow-lg shadow-saffron-500/30 hover:scale-108 active:scale-95 transition-transform"
                  >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                  </button>

                  <button
                    onClick={nextTrack}
                    title="Next"
                    className="p-1.5 text-stone-600 dark:text-stone-300 hover:text-amber-500 transition-colors"
                  >
                    <SkipForward size={18} />
                  </button>

                  {currentTrack.lyrics && (
                    <button
                      onClick={() => setShowLyricsModal(true)}
                      title="Sacred Lyrics"
                      className="px-2.5 py-1 rounded-full border border-amber-500/30 text-amber-500 hover:bg-amber-500/10 text-[10px] font-bold font-cinzel flex items-center gap-1 transition-colors"
                    >
                      <FileText size={12} />
                      <span className="hidden sm:inline">Lyrics</span>
                    </button>
                  )}
                </div>

                {/* Scrubber slider & time display */}
                <div className="w-full flex items-center gap-2 text-[10px] font-outfit text-stone-500">
                  <span className="w-8 text-right">{formatTime(currentTime)}</span>
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={currentTime}
                    onChange={(e) => seekTo(parseFloat(e.target.value))}
                    className="w-full h-1 bg-stone-300 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <span className="w-8">{formatTime(duration)}</span>
                </div>
              </div>

              {/* Right: Volume & Minimize Toggle */}
              <div className="hidden md:flex items-center justify-end gap-3 w-1/3">
                <div className="flex items-center gap-2 text-stone-400">
                  <button onClick={toggleMute} className="hover:text-amber-500">
                    {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-18 h-1 bg-stone-300 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>

                <button
                  onClick={() => setIsMinimized(true)}
                  title="Minimize Player"
                  className="p-1.5 rounded-full text-stone-400 hover:text-stone-200 hover:bg-stone-500/10 transition-colors ml-2"
                >
                  <ChevronDown size={17} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sacred Lyrics Drawer / Modal */}
      {showLyricsModal && currentTrack?.lyrics && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setShowLyricsModal(false)}
        >
          <div
            className={`w-full max-w-lg rounded-3xl p-6 sm:p-8 border shadow-2xl relative max-h-[85vh] overflow-y-auto ${
              isDark
                ? 'glass-luxury-dark border-amber-500/30 text-stone-200'
                : 'glass-luxury-light bg-white border-amber-400/50 text-stone-800'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-amber-500/20">
              <div className="flex items-center gap-2.5">
                <Sparkles size={18} className="text-amber-500" />
                <div>
                  <span className="text-[10px] font-cinzel font-bold text-amber-500 uppercase tracking-widest block">
                    Sacred Stotram & Lyrics
                  </span>
                  <h3 className="font-cinzel text-lg font-bold text-stone-900 dark:text-stone-100">
                    {currentTrack.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setShowLyricsModal(false)}
                className="p-1.5 rounded-full hover:bg-amber-500/20 text-stone-400 hover:text-amber-500"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-6 space-y-4 font-outfit text-sm leading-loose whitespace-pre-line text-stone-700 dark:text-stone-300 text-center tracking-wide">
              {currentTrack.lyrics}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
