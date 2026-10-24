import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Copy, Check, Share2, Sparkles, BookOpen } from 'lucide-react';

export const sacredQuotes = [
  {
    id: 1,
    source: 'Bhagavad Gita • Chapter 2, Verse 47',
    sanskrit: `कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।
मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥`,
    transliteration: `karmaṇy-evādhikāras te mā phaleṣu kadācana
mā karma-phala-hetur bhūr mā te saṅgo 'stv akarmaṇi`,
    translation: `You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results of your activities, nor be attached to inaction.`,
  },
  {
    id: 2,
    source: 'Isha Upanishad • Invocation',
    sanskrit: `ॐ पूर्णमदः पूर्णमिदं पूर्णात्पूर्णमुदच्यते।
पूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते॥`,
    transliteration: `oṃ pūrṇamadaḥ pūrṇamidaṃ pūrṇātpūrṇamudacyate
pūrṇasya pūrṇamādāya pūrṇamevāvaśiṣyate`,
    translation: `Om. That is infinite, and this is infinite. The infinite proceeds from the infinite. Then, taking the infinitude of the infinite, it remains as the infinite alone. Om Peace! Peace! Peace!`,
  },
  {
    id: 3,
    source: 'Bhagavad Gita • Chapter 6, Verse 5',
    sanskrit: `उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।
आत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥`,
    transliteration: `uddhared ātmanātmānaṁ nātmānam avasādayet
ātmaiva hy ātmano bandhur ātmaiva ripur ātmanaḥ`,
    translation: `Elevate yourself through your own mind, and not degrade yourself. For the mind is the friend of the self, and the mind is the enemy of the self.`,
  },
  {
    id: 4,
    source: 'Maha Upanishad • Chapter 6, Verse 71',
    sanskrit: `अयं बन्धुरयंनेति गणना लघुचेतसाम्।
उदारचरितानां तु वसुधैव कुटुम्बकम्॥`,
    transliteration: `ayaṁ bandhurayaṁneti gaṇanā laghucetasām
udāracaritānāṁ tu vasudhaiva kuṭumbakam`,
    translation: `"This is my relative and that is a stranger" is the calculation of narrow-minded people. For the magnanimous, the entire earth is indeed one single family.`,
  },
];

export default function QuotesSection() {
  const { isDark } = useTheme();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const currentQuote = sacredQuotes[currentIdx];

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % sacredQuotes.length);
  };

  const handleCopy = () => {
    const textToCopy = `${currentQuote.sanskrit}\n\n${currentQuote.transliteration}\n\n"${currentQuote.translation}"\n— ${currentQuote.source}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Daily Shlok - Vedant Devotion`,
          text: `"${currentQuote.sanskrit}"\nTranslation: ${currentQuote.translation} — ${currentQuote.source}`,
          url: window.location.href,
        })
        .catch((e) => console.log(e));
    } else {
      handleCopy();
    }
  };

  return (
    <section id="quotes" className="py-20 px-4 max-w-5xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs uppercase font-bold tracking-[0.25em] text-amber-500 font-cinzel">
          ॥ SACRED VEDIC WISDOM ॥
        </span>
        <h2 className="font-cinzel text-3xl sm:text-4xl font-bold">
          Daily <span className="gold-text-gradient">Vedic Shloks</span>
        </h2>
        <p className="font-outfit text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-light">
          Timeless verses from the Bhagavad Gita and Upanishads to illuminate your consciousness.
        </p>
      </div>

      {/* Main Elevated Quote Card */}
      <div
        className={`relative p-8 sm:p-14 rounded-3xl border transition-all duration-500 shadow-2xl overflow-hidden card-hover-lift ${
          isDark
            ? 'glass-luxury-dark border-amber-500/25'
            : 'glass-luxury-light bg-white border-amber-400/50'
        }`}
      >
        {/* Glow & Large Sacred Om Watermark */}
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-4 right-6 text-8xl sm:text-9xl font-serif text-amber-500/5 select-none pointer-events-none font-bold">
          ॐ
        </div>

        <div className="relative z-10 space-y-7 text-center max-w-3xl mx-auto">
          {/* Source Tag */}
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-500 font-cinzel text-xs font-bold tracking-wider">
            <BookOpen size={13} />
            <span>{currentQuote.source}</span>
          </div>

          {/* Sanskrit Text in Gold Shimmer */}
          <div className="py-2">
            <p className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold leading-relaxed tracking-wide text-stone-900 dark:text-stone-100 whitespace-pre-line">
              {currentQuote.sanskrit}
            </p>
          </div>

          {/* Transliteration */}
          <p className="font-outfit text-xs sm:text-sm italic text-amber-600 dark:text-amber-400 tracking-wide whitespace-pre-line">
            {currentQuote.transliteration}
          </p>

          {/* Meaning / Translation */}
          <div
            className={`p-6 rounded-2xl border text-sm sm:text-base leading-relaxed font-outfit ${
              isDark
                ? 'bg-stone-900/70 border-amber-500/15 text-stone-300'
                : 'bg-amber-50/70 border-amber-400/30 text-stone-800'
            }`}
          >
            <span className="font-cinzel font-bold text-xs uppercase tracking-widest text-amber-500 block mb-1.5">
              Sacred Meaning
            </span>
            "{currentQuote.translation}"
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-3.5 pt-3">
            <button
              onClick={handleCopy}
              className={`p-3.5 rounded-full border transition-all duration-300 cursor-pointer flex items-center justify-center ${
                isDark
                  ? 'border-amber-500/25 text-stone-300 hover:bg-amber-500/10 hover:text-amber-400'
                  : 'border-amber-400/40 text-stone-600 hover:bg-amber-50 hover:text-amber-600'
              }`}
              title="Copy Shlok"
            >
              {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
            </button>

            <button
              onClick={handleNext}
              className="px-9 py-3.5 rounded-full font-cinzel font-bold text-xs tracking-widest text-white gradient-saffron-gold shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:brightness-105 active:scale-95 transition-all duration-300 cursor-pointer border border-amber-300/40"
            >
              READ NEXT SHLOK
            </button>

            <button
              onClick={handleShare}
              className={`p-3.5 rounded-full border transition-all duration-300 cursor-pointer flex items-center justify-center ${
                isDark
                  ? 'border-amber-500/25 text-stone-300 hover:bg-amber-500/10 hover:text-amber-400'
                  : 'border-amber-400/40 text-stone-600 hover:bg-amber-50 hover:text-amber-600'
              }`}
              title="Share Shlok"
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
