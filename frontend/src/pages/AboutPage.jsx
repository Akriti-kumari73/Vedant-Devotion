import React from 'react';
import { useTheme } from '../context/ThemeContext';
import AboutSection from '../components/AboutSection';
import { Sparkles, Shield, Heart, Music, BookOpen, Compass } from 'lucide-react';

export default function AboutPage() {
  const { isDark } = useTheme();

  return (
    <div className="space-y-16 py-8">
      {/* Page Header */}
      <div className="text-center max-w-4xl mx-auto px-4 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-saffron-500/30 glass-saffron text-saffron-600 dark:text-saffron-400 text-xs font-semibold tracking-widest uppercase font-cinzel">
          <Sparkles size={14} />
          <span>OUR SACRED STORY & ROOTS</span>
        </div>
        <h1 className="font-cinzel text-4xl sm:text-5xl font-extrabold tracking-wider">
          About <span className="gradient-text-saffron-gold">Vedant Devotions</span>
        </h1>
        <p className="font-outfit text-sm sm:text-base text-stone-600 dark:text-stone-400 max-w-2xl mx-auto font-light leading-relaxed">
          Inspired by the eternal philosophy of Advaita and the devotional traditions of Sanatan Dharma,
          Vedant Devotion is a timeless digital sanctuary designed to connect seekers with sacred
          vibrations.
        </p>
      </div>

      {/* Embedded Deep About Section */}
      <AboutSection />

      {/* Expanded Philosophy / Deeper Story */}
      <section className="max-w-5xl mx-auto px-4">
        <div
          className={`p-8 sm:p-12 rounded-3xl border space-y-6 ${
            isDark
              ? 'glass-dark border-saffron-500/20'
              : 'glass-light bg-white/90 border-saffron-300/50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full gradient-saffron-gold flex items-center justify-center text-white">
              <Compass size={20} />
            </div>
            <h3 className="font-cinzel text-2xl font-bold">The Essence of Our Name: "Vedant"</h3>
          </div>
          <p className="font-outfit text-sm leading-relaxed text-stone-600 dark:text-stone-300 font-light">
            The word <strong>Vedanta</strong> literally translates to the "culmination or end of the
            Vedas" (<em>Veda-Anta</em>). It represents the highest spiritual realization: recognizing
            the sacred unity of the individual soul (Atman) with the Supreme Reality (Brahman).
          </p>
          <p className="font-outfit text-sm leading-relaxed text-stone-600 dark:text-stone-300 font-light">
            Through devotional music (<em>Bhakti Yoga</em>), philosophical reflection (<em>Jnana Yoga</em>),
            and righteous service (<em>Karma Yoga</em>), Vedant Devotions presents these profound
            truths in forms that resonate with contemporary daily life.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-saffron-500/15">
            <div className="flex items-start gap-3">
              <Shield className="text-saffron-500 flex-shrink-0 mt-1" size={18} />
              <div>
                <h4 className="font-cinzel text-sm font-bold">Authentic Scriptural Fidelity</h4>
                <p className="text-xs text-stone-500 mt-1">
                  All shloks, mantras, and teachings are verified with authentic traditional texts.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Heart className="text-saffron-500 flex-shrink-0 mt-1" size={18} />
              <div>
                <h4 className="font-cinzel text-sm font-bold">Universal Devotion (Vasudhaiva Kutumbakam)</h4>
                <p className="text-xs text-stone-500 mt-1">
                  Welcoming every seeker regardless of background or nationality into spiritual peace.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
