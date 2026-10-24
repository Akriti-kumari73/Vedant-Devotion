import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import AudioPlayerSection from '../components/AudioPlayerSection';
import { Search, Music, Sparkles } from 'lucide-react';

export default function BhajansPage() {
  const { isDark } = useTheme();
  const { bhajans, loading } = useData();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Track index from route navigation if passed
  const initialIndex = location.state?.trackIndex || 0;

  const categories = ['All', 'Mantra', 'Krishna', 'Meditation'];

  const filteredBhajans = bhajans.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.singer && b.singer.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (b.category && b.category.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCat =
      selectedCategory === 'All' ? true : b.category === selectedCategory;

    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-12 py-8 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-saffron-500/30 glass-saffron text-saffron-600 dark:text-saffron-400 text-xs font-semibold tracking-widest uppercase font-cinzel">
          <Music size={14} />
          <span>MELODIES OF TRANQUILITY</span>
        </div>
        <h1 className="font-cinzel text-3xl sm:text-5xl font-extrabold tracking-wider">
          Sacred <span className="gradient-text-saffron-gold">Bhajans Sanctuary</span>
        </h1>
        <p className="font-outfit text-sm text-stone-600 dark:text-stone-400 font-light">
          Immerse in the eternal sounds of Vedic chanting, Krishna kirtans, and Mahadev stotrams.
        </p>
      </div>

      {/* Main Player Component */}
      <AudioPlayerSection showFullList={true} initialTrackIndex={initialIndex} />

      {/* Search & Category Filter Section */}
      <div className="space-y-6 pt-8 border-t border-saffron-500/15">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-cinzel text-xs font-bold tracking-wider transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat
                    ? 'text-white gradient-saffron-gold shadow-md'
                    : isDark
                    ? 'bg-stone-900 text-stone-400 hover:text-saffron-400 border border-saffron-500/15'
                    : 'bg-white text-stone-600 hover:text-saffron-600 border border-saffron-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search bhajans or artists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-full text-xs font-outfit border transition-all focus:outline-none focus:border-saffron-500 ${
                isDark
                  ? 'bg-stone-900/80 border-saffron-500/20 text-stone-100 placeholder:text-stone-500'
                  : 'bg-white border-saffron-200 text-stone-900 placeholder:text-stone-400'
              }`}
            />
          </div>
        </div>

        {/* Results summary */}
        <p className="text-xs text-stone-500 font-outfit">
          Showing {filteredBhajans.length} of {bhajans.length} devotional tracks
        </p>
      </div>
    </div>
  );
}
