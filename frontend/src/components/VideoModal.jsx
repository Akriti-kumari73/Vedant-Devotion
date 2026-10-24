import React, { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { X } from 'lucide-react';

export default function VideoModal({ video, onClose }) {
  const { isDark } = useTheme();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!video) return null;

  const videoId = video.youtubeId || video.videoId;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="fixed top-5 right-5 sm:top-6 sm:right-6 p-2.5 rounded-full bg-white/10 hover:bg-saffron-500/30 text-white hover:text-saffron-400 transition-all cursor-pointer z-50 shadow-xl"
        title="Close Video"
        aria-label="Close Video"
      >
        <X size={22} />
      </button>

      {/* Modal Dialog Body */}
      <div
        className={`w-full rounded-2xl overflow-hidden border p-3 sm:p-4 shadow-2xl relative transition-all duration-300 my-auto ${
          video.isShort ? 'max-w-[340px] md:max-w-[380px]' : 'max-w-4xl'
        } ${isDark ? 'glass-dark border-saffron-500/20' : 'glass-light bg-stone-900 border-saffron-300/40'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Responsive Video Frame */}
        <div
          className={`relative w-full rounded-xl overflow-hidden bg-black shadow-inner ${
            video.isShort ? 'aspect-[9/16]' : 'aspect-video'
          }`}
        >
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>

        {/* Video Info */}
        <div className="p-3 sm:p-4 pt-4 text-left">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-saffron-500 font-cinzel">
              {video.category || 'Meditation'} • {video.speaker || 'Vedant Devotions'}
            </span>
            {video.isShort ? (
              <span className="px-2 py-0.5 rounded-full bg-red-600/20 text-red-400 text-[9px] font-bold uppercase font-cinzel">
                Shorts
              </span>
            ) : null}
          </div>
          <h3
            className={`font-cinzel text-base sm:text-lg font-bold mt-1.5 leading-snug ${
              isDark ? 'text-stone-100' : 'text-stone-100'
            }`}
          >
            {video.title}
          </h3>
          {video.description && (
            <p className="text-xs text-stone-400 mt-2 leading-relaxed font-outfit line-clamp-3">
              {video.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
