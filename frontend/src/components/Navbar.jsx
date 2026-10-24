import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import DivineSanctuaryWidgets from './DivineSanctuaryWidgets';
import { Sun, Moon, Menu, X, Shield, Music, Video, Sparkles, Phone, Info, Home } from 'lucide-react';

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { isPlaying, currentTrack } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'About', path: '/about', icon: Info },
    { label: 'Bhajans', path: '/bhajans', icon: Music },
    { label: 'Videos', path: '/videos', icon: Video },
    { label: 'Quotes', path: '/quotes', icon: Sparkles },
    { label: 'Contact', path: '/contact', icon: Phone },
  ];

  const handleNavClick = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <header className="sticky top-4 z-50 px-3 sm:px-6 w-full max-w-7xl mx-auto">
      <nav
        className={`w-full rounded-full transition-all duration-300 px-4 sm:px-6 py-2.5 flex items-center justify-between border ${
          isDark
            ? 'glass-luxury-dark border-amber-500/25 shadow-2xl shadow-black/80'
            : 'glass-luxury-light bg-white/90 border-amber-500/35 shadow-xl shadow-amber-500/10'
        }`}
      >
        {/* Brand / Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-3 group focus:outline-none flex-shrink-0"
        >
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-amber-400/50 p-0.5 bg-gradient-to-tr from-orange-500 via-amber-400 to-yellow-300 group-hover:scale-105 transition-transform duration-300 shadow-md shadow-amber-500/25">
            <img
              src="/assets/logo.png"
              alt="Vedant Devotion"
              className="w-full h-full object-cover rounded-full bg-stone-900"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/vedant.png';
              }}
            />
            {isPlaying && (
              <span className="absolute inset-0 rounded-full border border-amber-300 animate-ping opacity-75 pointer-events-none" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-cinzel text-base sm:text-lg font-bold tracking-wider leading-tight gold-text-gradient group-hover:brightness-110 transition-all">
              VEDANT
            </span>
            <span
              className={`font-outfit text-[10px] tracking-widest font-semibold uppercase ${
                isDark ? 'text-amber-400/80' : 'text-stone-600'
              }`}
            >
              Devotions
            </span>
          </div>
        </NavLink>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.label}
                to={item.path}
                className={`relative px-4 py-2 rounded-full font-outfit text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 ${
                  isActive
                    ? 'text-amber-500 font-semibold bg-amber-500/10 shadow-inner'
                    : isDark
                    ? 'text-stone-300 hover:text-amber-400 hover:bg-white/5'
                    : 'text-stone-700 hover:text-amber-600 hover:bg-amber-500/5'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Right Action Bar: Sanctuary Widgets (Temple Bell, Japa), Theme, Admin, Menu */}
        <div className="flex items-center gap-2">
          {/* Temple Bell & Japa Widgets */}
          <DivineSanctuaryWidgets />

          {/* Admin link */}
          <NavLink
            to="/admin"
            title="Admin Portal"
            className={`p-2.5 rounded-full border transition-all duration-300 cursor-pointer ${
              location.pathname === '/admin'
                ? 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/30'
                : isDark
                ? 'border-amber-500/20 text-stone-400 hover:text-amber-400 hover:border-amber-500/40 bg-stone-900/60'
                : 'border-amber-400/30 text-stone-600 hover:text-amber-600 hover:border-amber-400 bg-white/70'
            }`}
          >
            <Shield size={16} />
          </NavLink>

          {/* Theme switch button */}
          <button
            onClick={toggleTheme}
            type="button"
            title={isDark ? 'Switch to Serene Light' : 'Switch to Peaceful Dark'}
            aria-label="Toggle Theme"
            className={`p-2.5 rounded-full border transition-all duration-300 cursor-pointer ${
              isDark
                ? 'bg-stone-900/80 text-amber-300 border-amber-500/20 hover:bg-stone-850 hover:text-amber-200'
                : 'bg-white/90 text-amber-600 border-amber-400/40 hover:bg-amber-50 hover:text-amber-700'
            }`}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            title="Toggle Menu"
            aria-label="Toggle Menu"
            className={`lg:hidden p-2.5 rounded-full border transition-all duration-300 ${
              isDark
                ? 'bg-stone-900/80 text-stone-300 border-amber-500/20 hover:text-amber-400'
                : 'bg-white/90 text-stone-700 border-amber-400/40 hover:text-amber-600'
            }`}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden mt-3 rounded-2xl p-4 transition-all duration-300 shadow-2xl ${
            isDark
              ? 'glass-luxury-dark border border-amber-500/25 bg-stone-950/98'
              : 'glass-luxury-light border border-amber-400/40 bg-white/98'
          }`}
        >
          <div className="flex flex-col space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.path)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-outfit text-sm font-medium transition-all text-left ${
                    isActive
                      ? 'text-amber-500 font-bold bg-amber-500/10 border-l-4 border-amber-500'
                      : isDark
                      ? 'text-stone-300 hover:text-amber-400 hover:bg-stone-900'
                      : 'text-stone-700 hover:text-amber-600 hover:bg-amber-50'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-amber-500' : 'text-stone-400'} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <div className="pt-2 border-t border-amber-500/15">
              <button
                onClick={() => handleNavClick('/admin')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-outfit text-sm font-medium transition-all text-left ${
                  location.pathname === '/admin'
                    ? 'text-amber-500 font-bold bg-amber-500/10'
                    : isDark
                    ? 'text-stone-300 hover:text-amber-400'
                    : 'text-stone-700 hover:text-amber-600'
                }`}
              >
                <Shield size={18} className="text-amber-500" />
                <span>Admin Portal</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
