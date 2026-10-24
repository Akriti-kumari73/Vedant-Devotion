import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { X, ShieldCheck } from 'lucide-react';

export default function LegalModal({ type, onClose }) {
  const { isDark } = useTheme();

  const contentMap = {
    privacy: {
      title: 'Privacy Policy',
      content: `At Vedant Devotions, we deeply respect your personal privacy. When you browse our sacred platform, listen to devotional bhajans, watch videos, or submit messages through our contact sanctuary, we collect only the minimum required information to provide you with the best spiritual experience.
      
      1. Information Collection: We collect information you provide directly to us (e.g., name and email via contact inquiry).
      2. Use of Information: We use contact information solely to respond to your queries, collaborations, and devotional feedback. We never sell or distribute your data.
      3. Security: We implement standard industry security practices to keep your data safe.
      4. Cookies: We use local storage for your theme preference (Light/Dark mode) and smooth player state.`,
    },
    licensing: {
      title: 'Licensing & Copyright Information',
      content: `All devotional bhajans, sacred chants, and video productions hosted or displayed on Vedant Devotions are protected by applicable intellectual property and copyright laws.
      
      1. Original Productions: Audio, videos, artwork, and creative assets produced under the Vedant Devotions banner are copyright © Vedant Devotions.
      2. Artist Rights: We respect the intellectual and spiritual property of independent artists and lyricists featured on our platform.
      3. Personal Devotion: You may freely stream, listen, and share links to our content for non-commercial, personal spiritual devotion.
      4. Commercial Licensing: For synchronization, broadcasts, or commercial usage, written permission must be obtained from contact@vedantdevotions.com.`,
    },
    terms: {
      title: 'Terms & Conditions',
      content: `Welcome to Vedant Devotions. By using our website and digital services, you agree to comply with the following sacred guidelines:
      
      1. Respectful Conduct: Users agree to maintain a peaceful, respectful, and reverent atmosphere in all communications.
      2. Intellectual Integrity: Reproduction or redistribution of original audio or video files without authorization is prohibited.
      3. Availability: We strive to maintain continuous spiritual service, but make no guarantees of uninterrupted access during maintenance.
      4. Amendments: Terms may be updated periodically to reflect platform expansions and community growth.`,
    },
    disclaimer: {
      title: 'Spiritual Disclaimer',
      content: `The devotional content, bhajans, shloks, mantras, and Vedic teachings provided on Vedant Devotions are curated for spiritual growth, meditation, mindfulness, and cultural enlightenment.
      
      1. Spiritual Guidance: Content is intended as devotional reflection and should not substitute for professional medical, legal, or psychological counsel.
      2. Ancient Texts: Interpretations of the Vedas, Upanishads, and Puranas reflect traditional spiritual perspectives meant to inspire inner harmony and global unity (Vasudhaiva Kutumbakam).`,
    },
  };

  const item = contentMap[type] || contentMap.privacy;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-2xl rounded-2xl p-6 md:p-8 border shadow-2xl relative transition-all duration-300 max-h-[85vh] overflow-y-auto ${
          isDark
            ? 'glass-dark border-saffron-500/30 text-stone-200'
            : 'glass-light bg-white/95 border-saffron-300/60 text-stone-800'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-saffron-500/20">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-saffron-500" size={24} />
            <h3 className="font-cinzel text-xl font-bold text-saffron-500">
              {item.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-saffron-500/20 text-stone-400 hover:text-saffron-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-5 space-y-4 font-outfit text-sm leading-relaxed whitespace-pre-line text-stone-400">
          {item.content}
        </div>

        <div className="mt-8 pt-4 border-t border-saffron-500/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full font-cinzel text-xs font-bold tracking-wider text-white gradient-saffron-gold shadow-md hover:brightness-105 transition-all"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}
