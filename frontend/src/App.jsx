import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GlobalAudioPlayer from './components/GlobalAudioPlayer';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import BhajansPage from './pages/BhajansPage';
import VideosPage from './pages/VideosPage';
import QuotesPage from './pages/QuotesPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col justify-between selection:bg-amber-500 selection:text-white pb-20">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/bhajans" element={<BhajansPage />} />
                <Route path="/videos" element={<VideosPage />} />
                <Route path="/quotes" element={<QuotesPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<HomePage />} />
              </Routes>
            </main>
            <Footer />
            {/* Global Persistent Audio Player */}
            <GlobalAudioPlayer />
          </div>
        </BrowserRouter>
      </DataProvider>
    </ThemeProvider>
  );
}
