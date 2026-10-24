import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Bell, Sparkles, RotateCcw, Volume2, X, Compass, Heart } from 'lucide-react';

// Web Audio API pure resonant Temple Bell Chime
function playTempleBell() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    // Fundamental frequencies for a rich Tibetan/Indian bronze temple bell
    const freqs = [520, 840, 1260, 2100];
    const now = ctx.currentTime;

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Bell decay envelope
      const decay = 2.5 + idx * 0.5;
      gain.gain.setValueAtTime(0.3 / (idx + 1), now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + decay);
    });
  } catch (e) {
    console.log('AudioContext not allowed yet:', e);
  }
}

export default function DivineSanctuaryWidgets() {
  const { isDark } = useTheme();
  const [bellRinging, setBellRinging] = useState(false);
  const [showJapaModal, setShowJapaModal] = useState(false);

  // Japa State
  const [beadCount, setBeadCount] = useState(0);
  const [completedMalas, setCompletedMalas] = useState(0);
  const [selectedMantra, setSelectedMantra] = useState('ॐ नमः शिवाय');

  const mantras = [
    { name: 'Om Namah Shivaya', text: 'ॐ नमः शिवाय' },
    { name: 'Maha Mantra', text: 'हरे कृष्ण हरे राम' },
    { name: 'Gayatri Mantra', text: 'ॐ भूर्भुवः स्वः' },
    { name: 'Maha Mrityunjaya', text: 'ॐ त्र्यम्बकं यजामहे' },
  ];

  const handleRingBell = () => {
    playTempleBell();
    setBellRinging(true);
    setTimeout(() => setBellRinging(false), 1200);
  };

  const handleBeadClick = () => {
    if (beadCount + 1 >= 108) {
      setBeadCount(0);
      setCompletedMalas((prev) => prev + 1);
    } else {
      setBeadCount((prev) => prev + 1);
    }
  };

  const handleResetJapa = () => {
    setBeadCount(0);
    setCompletedMalas(0);
  };

  return (
    <>
      {/* Floating Sacred Tools Bar */}
      <div className="flex items-center gap-2">
        {/* Virtual Temple Bell */}
        <button
          onClick={handleRingBell}
          title="Ring Sacred Temple Bell (मंदिर की घंटी)"
          className={`relative p-2.5 rounded-full border transition-all duration-300 cursor-pointer group ${
            bellRinging
              ? 'scale-125 border-amber-400 bg-amber-400/20 text-amber-400 shadow-xl shadow-amber-500/50'
              : isDark
              ? 'border-amber-500/20 text-stone-300 hover:text-amber-400 hover:border-amber-500/40 bg-stone-900/60'
              : 'border-amber-400/40 text-stone-700 hover:text-amber-600 hover:border-amber-400 bg-white/70'
          }`}
        >
          <Bell
            size={17}
            className={`transition-transform duration-300 ${
              bellRinging ? 'rotate-[-20deg]' : 'group-hover:rotate-12'
            }`}
          />
          {bellRinging && (
            <span className="absolute inset-0 rounded-full border-2 border-amber-400 animate-ping pointer-events-none" />
          )}
        </button>

        {/* Digital Japa Mala Trigger */}
        <button
          onClick={() => setShowJapaModal(true)}
          title="Digital Japa Mala (मंत्र जाप)"
          className={`px-3 py-1.5 rounded-full border transition-all duration-300 text-xs font-cinzel font-semibold flex items-center gap-1.5 cursor-pointer ${
            isDark
              ? 'border-amber-500/20 text-stone-300 hover:text-amber-400 hover:border-amber-500/40 bg-stone-900/60'
              : 'border-amber-400/40 text-stone-700 hover:text-amber-600 hover:border-amber-400 bg-white/70'
          }`}
        >
          <Sparkles size={14} className="text-amber-500" />
          <span className="hidden sm:inline">Japa Mala</span>
          {completedMalas > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-white text-[10px]">
              {completedMalas}
            </span>
          )}
        </button>
      </div>

      {/* Digital Japa Modal */}
      {showJapaModal && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setShowJapaModal(false)}
        >
          <div
            className={`w-full max-w-md rounded-3xl p-6 sm:p-8 border shadow-2xl relative text-center space-y-6 ${
              isDark
                ? 'glass-luxury-dark border-amber-500/30 text-stone-100'
                : 'glass-luxury-light bg-white border-amber-400/50 text-stone-800'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-amber-500/20">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-amber-500" />
                <h3 className="font-cinzel text-lg font-bold text-amber-500">
                  Digital Japa Mala (108 Beads)
                </h3>
              </div>
              <button
                onClick={() => setShowJapaModal(false)}
                className="p-1 rounded-full hover:bg-amber-500/10 text-stone-400"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mantra Selector */}
            <div className="flex flex-wrap gap-1.5 justify-center">
              {mantras.map((m) => (
                <button
                  key={m.name}
                  onClick={() => setSelectedMantra(m.text)}
                  className={`px-3 py-1 rounded-full text-xs font-cinzel transition-all cursor-pointer ${
                    selectedMantra === m.text
                      ? 'gradient-saffron-gold text-white font-bold shadow-md'
                      : 'bg-stone-500/10 text-stone-400 hover:text-amber-400'
                  }`}
                >
                  {m.name}
                </button>
              ))}
            </div>

            {/* Sacred Mantra Focus Display */}
            <div className="py-2">
              <p className="font-cinzel text-2xl sm:text-3xl font-extrabold gold-text-gradient tracking-wide">
                {selectedMantra}
              </p>
            </div>

            {/* Circular Tap Counter */}
            <div className="flex flex-col items-center justify-center">
              <div
                onClick={handleBeadClick}
                className="w-36 h-36 rounded-full border-4 border-amber-500/30 flex flex-col items-center justify-center cursor-pointer select-none relative group hover:scale-105 active:scale-95 transition-all gradient-saffron-gold text-white shadow-2xl shadow-amber-500/30"
              >
                <span className="text-[10px] uppercase font-bold tracking-widest font-cinzel text-amber-200">
                  TAP TO CHANT
                </span>
                <span className="font-cinzel text-4xl font-black mt-1">
                  {beadCount}
                </span>
                <span className="text-[10px] text-amber-100 font-outfit">
                  of 108 Beads
                </span>
              </div>

              {/* Mala Completed counter */}
              <div className="mt-4 flex items-center justify-between w-full px-4 text-xs font-outfit text-stone-500">
                <span>Completed Malas: <strong className="text-amber-500 font-cinzel text-sm">{completedMalas}</strong></span>
                <button
                  onClick={handleResetJapa}
                  className="flex items-center gap-1 hover:text-amber-500 transition-colors cursor-pointer"
                >
                  <RotateCcw size={13} />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
