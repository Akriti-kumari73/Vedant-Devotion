import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import QuotesSection, { sacredQuotes } from '../components/QuotesSection';
import { Sparkles, Copy, Check, Share2, BookOpen } from 'lucide-react';

export default function QuotesPage() {
  const { isDark } = useTheme();
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (quote) => {
    const text = `${quote.sanskrit}\n\n${quote.transliteration}\n\n"${quote.translation}"\n— ${quote.source}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(quote.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleShare = (quote) => {
    if (navigator.share) {
      navigator.share({
        title: `Daily Shlok - Vedant Devotion`,
        text: `"${quote.sanskrit}"\nTranslation: ${quote.translation} — ${quote.source}`,
        url: window.location.href,
      }).catch((e) => console.log(e));
    } else {
      handleCopy(quote);
    }
  };

  return (
    <div className="space-y-16 py-8 px-4 max-w-7xl mx-auto">
      {/* Interactive Daily Card */}
      <QuotesSection />

      {/* Grid of All Sacred Shloks */}
      <section className="space-y-8 max-w-5xl mx-auto pt-8 border-t border-saffron-500/15">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase font-bold tracking-[0.2em] text-saffron-500 font-cinzel">
            SACRED REPOSITORY
          </span>
          <h3 className="font-cinzel text-2xl sm:text-3xl font-bold">
            All Sacred Verses & Teachings
          </h3>
          <p className="font-outfit text-xs sm:text-sm text-stone-500">
            Meditate upon each verse with reverence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sacredQuotes.map((q) => (
            <div
              key={q.id}
              className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between space-y-5 ${
                isDark
                  ? 'glass-dark border-saffron-500/15'
                  : 'glass-light bg-white border-saffron-200 shadow-md'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-cinzel font-bold text-saffron-500 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen size={12} />
                    {q.source}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopy(q)}
                      className="p-1.5 rounded-full hover:bg-saffron-500/10 text-stone-400 hover:text-saffron-500 transition-colors"
                      title="Copy Shlok"
                    >
                      {copiedId === q.id ? (
                        <Check size={15} className="text-emerald-500" />
                      ) : (
                        <Copy size={15} />
                      )}
                    </button>
                    <button
                      onClick={() => handleShare(q)}
                      className="p-1.5 rounded-full hover:bg-saffron-500/10 text-stone-400 hover:text-saffron-500 transition-colors"
                      title="Share Shlok"
                    >
                      <Share2 size={15} />
                    </button>
                  </div>
                </div>

                <p className="font-cinzel text-base sm:text-lg font-bold leading-relaxed whitespace-pre-line text-stone-900 dark:text-stone-100">
                  {q.sanskrit}
                </p>

                <p className="text-xs font-outfit italic text-saffron-600/90 dark:text-saffron-400/90 whitespace-pre-line">
                  {q.transliteration}
                </p>

                <p className="text-xs sm:text-sm font-outfit text-stone-600 dark:text-stone-300 leading-relaxed pt-2 border-t border-saffron-500/10">
                  "{q.translation}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
