import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { BookOpen, Music, Users, Sparkles, Compass, Target, Heart, Shield } from 'lucide-react';

export default function AboutSection() {
  const { isDark } = useTheme();

  const deities = [
    {
      name: 'Shri Krishna',
      role: 'Divine Love & Bhagavad Gita Wisdom',
      image: '/assets/krishna-eHEgZu0z.jpg',
      quote: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।',
      translation: 'Established in divine yoga, perform your actions with pure devotion.',
    },
    {
      name: 'Devadhidev Mahadev',
      role: 'Infinite Consciousness & Cosmic Peace',
      image: '/assets/shiva-CEOaWJkO.jpg',
      quote: 'कर्पूरगौरं करुणावतारं संसारसारम्।',
      translation: 'The embodiment of compassion, pure as camphor, ruler of consciousness.',
    },
    {
      name: 'Maryada Purushottam Ram',
      role: 'Righteousness, Truth & Dharma',
      image: '/assets/ram-BJOnTOUS.jpg',
      quote: 'रघुकुल रीति सदा चलि आई, प्राण जाहुँ बरु बचनु न जाई।',
      translation: 'The timeless standard of honor, truth, and righteous conduct.',
    },
    {
      name: 'Sankat Mochan Hanuman',
      role: 'Unshakable Devotion & Strength',
      image: '/assets/hanuman-CEcv-a8j.jpg',
      quote: 'मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम्।',
      translation: 'Swift as the mind, master of senses, foremost among the wise.',
    },
  ];

  const pillars = [
    {
      icon: BookOpen,
      title: 'Ancient Wisdom & Heritage',
      description:
        'Rooted in the timeless teachings of the Vedas, Upanishads, and Puranas, exploring sacred traditions and divine narratives to enrich modern spiritual life.',
    },
    {
      icon: Music,
      title: 'Melodies of the Divine',
      description:
        'Devotion speaks to the soul through sacred music. Soulful bhajans, meditative kirtans, and primordial mantras engineered for tranquility.',
    },
    {
      icon: Users,
      title: 'Amplifying New Voices',
      description:
        'A dedicated sanctuary empowering emerging devotional singers, lyricists, and classical musicians to share their offerings globally.',
    },
    {
      icon: Sparkles,
      title: 'Aesthetic Reverence',
      description:
        'Every visual, melody, and chant is curated with artistic elegance, meditative depth, and rigorous authenticity honoring Sanatan Dharma.',
    },
  ];

  return (
    <section id="about" className="py-20 px-4 max-w-7xl mx-auto space-y-16">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase font-bold tracking-[0.25em] text-amber-500 font-cinzel">
          ॥ ABOUT VEDANT DEVOTION ॥
        </span>
        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold">
          Where Ancient Wisdom Finds Its{' '}
          <span className="gold-text-gradient">Voice Through Music</span>
        </h2>
        <p className="font-outfit text-sm sm:text-base text-stone-600 dark:text-stone-400 font-light leading-relaxed">
          Vedant Devotion is a digital sanctuary dedicated to the eternal philosophy of Sanatan Dharma.
          Through devotional videos, soul-stirring bhajans, and inspiring sacred art, we guide seekers
          on an uplifting inner journey.
        </p>
      </div>

      {/* 4 Divine Deities - Museum Gallery Style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {deities.map((item, idx) => (
          <div
            key={item.name}
            className={`group relative rounded-3xl overflow-hidden border transition-all duration-500 card-hover-lift ${
              isDark
                ? 'glass-luxury-dark border-amber-500/25 hover:border-amber-400/60'
                : 'glass-luxury-light bg-white border-amber-400/40 hover:border-amber-500'
            }`}
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-stone-950">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

              {/* Top Deity Order Badge */}
              <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-amber-400/40 text-[9px] font-cinzel font-bold text-amber-300 uppercase">
                Divine #{idx + 1}
              </div>

              {/* Bottom Inscription */}
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <h3 className="font-cinzel text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-tight">
                  {item.name}
                </h3>
                <p className="text-xs text-amber-100/90 font-outfit">{item.role}</p>
                <div className="pt-2 border-t border-amber-400/20 text-[11px] text-amber-200/90 font-cinzel italic line-clamp-1">
                  "{item.quote}"
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4 Core Pillars - Luxury Filigree Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 pt-4">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.title}
              className={`p-7 sm:p-9 rounded-3xl border transition-all duration-300 card-hover-lift ${
                isDark
                  ? 'glass-luxury-dark border-amber-500/20 hover:border-amber-500/50'
                  : 'glass-luxury-light bg-white border-amber-400/35 hover:border-amber-500 hover:shadow-xl hover:shadow-amber-500/10'
              }`}
            >
              <div className="w-13 h-13 rounded-2xl gradient-saffron-gold flex items-center justify-center text-white mb-6 shadow-lg shadow-amber-500/25">
                <Icon size={26} />
              </div>
              <h3 className="font-cinzel text-xl font-bold mb-3 text-stone-900 dark:text-stone-100">
                {pillar.title}
              </h3>
              <p className="font-outfit text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-light">
                {pillar.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Mission / Vision / Goal - Divine Triad */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div
          className={`p-7 rounded-3xl border text-center space-y-3 card-hover-lift ${
            isDark
              ? 'glass-luxury-dark border-amber-500/20'
              : 'glass-luxury-light bg-white border-amber-400/35'
          }`}
        >
          <div className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center bg-amber-500/10 border border-amber-500/30 text-amber-500 shadow-sm">
            <Compass size={22} />
          </div>
          <h4 className="font-cinzel text-lg font-bold text-amber-500">Our Mission</h4>
          <p className="font-outfit text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            To preserve, honor, and illuminate the sacred heritage of Sanatan Dharma through uplifting
            devotional music, sacred shloks, and transformative media.
          </p>
        </div>

        <div
          className={`p-7 rounded-3xl border text-center space-y-3 card-hover-lift ${
            isDark
              ? 'glass-luxury-dark border-amber-500/20'
              : 'glass-luxury-light bg-white border-amber-400/35'
          }`}
        >
          <div className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center bg-amber-500/10 border border-amber-500/30 text-amber-500 shadow-sm">
            <Target size={22} />
          </div>
          <h4 className="font-cinzel text-lg font-bold text-amber-500">Our Vision</h4>
          <p className="font-outfit text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            To become a global spiritual sanctuary where seekers worldwide connect with inner peace,
            timeless Vedic wisdom, and divine melodies.
          </p>
        </div>

        <div
          className={`p-7 rounded-3xl border text-center space-y-3 card-hover-lift ${
            isDark
              ? 'glass-luxury-dark border-amber-500/20'
              : 'glass-luxury-light bg-white border-amber-400/35'
          }`}
        >
          <div className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center bg-amber-500/10 border border-amber-500/30 text-amber-500 shadow-sm">
            <Heart size={22} />
          </div>
          <h4 className="font-cinzel text-lg font-bold text-amber-500">Our Goal</h4>
          <p className="font-outfit text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            To bridge traditional Vedic knowledge with contemporary digital accessibility, fostering a
            vibrant global community bound by harmony and love.
          </p>
        </div>
      </div>
    </section>
  );
}
