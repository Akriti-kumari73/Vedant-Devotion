import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import LegalModal from './LegalModal';
import { Sparkles, Shield, Heart } from 'lucide-react';

export default function Footer() {
  const { isDark } = useTheme();
  const [activeLegal, setActiveLegal] = useState(null);

  const quickLinks = [
    { label: 'About Us', path: '/about' },
    { label: 'All Devotional Videos', path: '/videos' },
    { label: 'Sacred Bhajans Sanctuary', path: '/bhajans' },
    { label: 'Daily Quotes & Shloks', path: '/quotes' },
    { label: 'Contact Us', path: '/contact' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', key: 'privacy' },
    { label: 'Licensing & Copyright', key: 'licensing' },
    { label: 'Terms & Conditions', key: 'terms' },
    { label: 'Spiritual Disclaimer', key: 'disclaimer' },
  ];

  return (
    <>
      <footer
        className={`mt-24 border-t transition-colors duration-500 ${
          isDark
            ? 'bg-[#060504] border-amber-500/15 text-stone-400'
            : 'bg-white/90 border-amber-400/30 text-stone-600'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Column 1: Brand & Sacred Mission */}
            <div className="space-y-4 lg:col-span-1">
              <div className="flex items-center gap-3">
                <div className="w-13 h-13 rounded-full overflow-hidden border-2 border-amber-400/40 p-0.5 bg-gradient-to-tr from-orange-500 via-amber-400 to-yellow-300 shadow-lg shadow-amber-500/20">
                  <img
                    src="/assets/logo.png"
                    alt="Vedant Devotion"
                    className="w-full h-full object-cover rounded-full bg-stone-900"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/vedant.png';
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-cinzel text-lg font-bold gold-text-gradient tracking-wider">
                    VEDANT DEVOTIONS
                  </h3>
                  <p className="text-[10px] font-outfit uppercase tracking-widest text-amber-500/80 font-semibold">
                    Sacred Melodies & Wisdom
                  </p>
                </div>
              </div>
              <p className="text-xs leading-relaxed font-outfit text-stone-500">
                A digital sanctuary inspired by the eternal teachings of Sanatan Dharma, the Vedas,
                and Puranas. We empower devotional artists and spread spiritual peace across the world.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://youtube.com/@vedantdevotions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full border border-amber-500/25 hover:border-amber-400 hover:text-amber-400 transition-all text-stone-400 hover:scale-105"
                  title="YouTube Channel"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full border border-amber-500/25 hover:border-amber-400 hover:text-amber-400 transition-all text-stone-400 hover:scale-105"
                  title="Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full border border-amber-500/25 hover:border-amber-400 hover:text-amber-400 transition-all text-stone-400 hover:scale-105"
                  title="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.6 5H18V0h-3.808C10.595 0 9 1.582 9 4.615V8z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="font-cinzel text-sm font-bold tracking-widest text-amber-500 uppercase mb-4">
                Sacred Navigation
              </h4>
              <ul className="space-y-2.5 text-xs font-outfit">
                {quickLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.path}
                      className="hover:text-amber-400 transition-colors duration-200 flex items-center gap-2"
                    >
                      <span className="text-amber-500/60 font-serif">›</span> {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Legal & Trust */}
            <div>
              <h4 className="font-cinzel text-sm font-bold tracking-widest text-amber-500 uppercase mb-4">
                Trust & Guidelines
              </h4>
              <ul className="space-y-2.5 text-xs font-outfit">
                {legalLinks.map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => setActiveLegal(item.key)}
                      className="hover:text-amber-400 transition-colors duration-200 flex items-center gap-2 text-left cursor-pointer"
                    >
                      <span className="text-amber-500/60 font-serif">›</span> {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Devotional Blessing */}
            <div>
              <h4 className="font-cinzel text-sm font-bold tracking-widest text-amber-500 uppercase mb-4">
                Devotional Sanctuary
              </h4>
              <div
                className={`p-5 rounded-2xl border ${
                  isDark ? 'glass-luxury-dark border-amber-500/20' : 'bg-amber-50/60 border-amber-400/40'
                }`}
              >
                <p className="font-cinzel text-xs font-bold text-amber-500 mb-1">
                  सर्वे भवन्तु सुखिनः।
                </p>
                <p className="text-[11px] font-outfit text-stone-400 italic">
                  "May all sentient beings be peaceful, happy, and free from suffering."
                </p>
                <div className="mt-3 text-[11px] text-stone-500 space-y-1">
                  <p>🕉️ Dedicated to Sanatan Dharma</p>
                  <p>📧 contact@vedantdevotions.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-amber-500/10 flex flex-col md:flex-row items-center justify-between text-xs text-stone-500 gap-4 text-center md:text-left">
            <div>
              <p>© 2026 Vedant Devotions. All Rights Reserved.</p>
              <p className="text-[11px] text-stone-400 mt-0.5">
                • Inspiring Peace • Sharing Wisdom • Enriching Lives •
              </p>
            </div>
            <div className="flex items-center gap-2 text-stone-400">
              <span className="text-amber-500 text-sm">🕉️</span>
              <span>Dedicated to the Eternal Wisdom of</span>
              <span className="font-bold gold-text-gradient font-cinzel">Sanatan Dharma</span>
            </div>
          </div>
        </div>
      </footer>

      {activeLegal && (
        <LegalModal type={activeLegal} onClose={() => setActiveLegal(null)} />
      )}
    </>
  );
}
