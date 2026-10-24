import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Mail, Send, CheckCircle2, Phone, MapPin, Sparkles, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const { isDark } = useTheme();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: 'General Inquiry',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const interests = [
    'General Inquiry',
    'Artist Collaboration',
    'Bhajan & Music Submission',
    'Devotional Video Project',
    'Feedback & Blessings',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to send message. Please try again.');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', interest: 'General Inquiry', message: '' });
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 py-8 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-saffron-500/30 glass-saffron text-saffron-600 dark:text-saffron-400 text-xs font-semibold tracking-widest uppercase font-cinzel">
          <Mail size={14} />
          <span>CONNECT WITH SANCTUARY</span>
        </div>
        <h1 className="font-cinzel text-3xl sm:text-5xl font-extrabold tracking-wider">
          Contact <span className="gradient-text-saffron-gold">Vedant Devotions</span>
        </h1>
        <p className="font-outfit text-sm text-stone-600 dark:text-stone-400 font-light max-w-2xl mx-auto">
          We warmly welcome artists, devotees, collaborators, and seekers. Reach out to discuss
          devotional creations, music releases, or to share your thoughts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
        {/* Left: Sanctuary Details & Philosophy */}
        <div className="lg:col-span-5 space-y-6">
          <div
            className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
              isDark
                ? 'glass-dark border-saffron-500/20'
                : 'glass-light bg-white border-saffron-300/60 shadow-lg'
            }`}
          >
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-saffron-500 font-cinzel">
                Sanctuary Address & Care
              </span>
              <h3 className="font-cinzel text-xl font-bold mt-1 text-stone-900 dark:text-stone-100">
                Spiritual Communications
              </h3>
            </div>

            <p className="font-outfit text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
              Vedant Devotions is dedicated to uplifting consciousness. Whether you represent a temple,
              are an independent musician, or have questions regarding our projects, our team is here
              to serve.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl gradient-saffron-gold flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                  <Mail size={17} />
                </div>
                <div>
                  <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-saffron-500">
                    Email Sanctuary
                  </h4>
                  <a
                    href="mailto:contact@vedantdevotions.com"
                    className="text-xs sm:text-sm font-outfit text-stone-700 dark:text-stone-300 hover:text-saffron-500 transition-colors"
                  >
                    contact@vedantdevotions.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl gradient-saffron-gold flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                  <MapPin size={17} />
                </div>
                <div>
                  <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-saffron-500">
                    Sacred Roots
                  </h4>
                  <p className="text-xs sm:text-sm font-outfit text-stone-700 dark:text-stone-300">
                    Vedic Cultural & Devotional Heritage, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl gradient-saffron-gold flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                  <Sparkles size={17} />
                </div>
                <div>
                  <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-saffron-500">
                    Artist Submissions
                  </h4>
                  <p className="text-xs sm:text-sm font-outfit text-stone-700 dark:text-stone-300">
                    Singers & lyricists may submit demos for release on our platforms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-7">
          <div
            className={`p-6 sm:p-10 rounded-3xl border shadow-xl ${
              isDark
                ? 'glass-dark border-saffron-500/20'
                : 'glass-light bg-white border-saffron-300/60'
            }`}
          >
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="font-cinzel text-2xl font-bold text-stone-900 dark:text-stone-100">
                  Dhanyavaad! Message Received
                </h3>
                <p className="font-outfit text-sm text-stone-600 dark:text-stone-400 max-w-md mx-auto">
                  Thank you for reaching out to Vedant Devotions. Our team will review your devotional inquiry
                  and respond shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full font-cinzel text-xs font-bold text-white gradient-saffron-gold shadow-md hover:scale-105 transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <h3 className="font-cinzel text-xl font-bold text-stone-900 dark:text-stone-100">
                    Send Us a Message
                  </h3>
                  <p className="font-outfit text-xs text-stone-500">
                    Fill in your details below and we will get back to you promptly.
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-outfit">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="font-cinzel text-xs font-bold text-stone-700 dark:text-stone-300">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aarav Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl text-xs font-outfit border transition-all focus:outline-none focus:border-saffron-500 ${
                        isDark
                          ? 'bg-stone-900/80 border-saffron-500/20 text-stone-100 placeholder:text-stone-500'
                          : 'bg-white border-saffron-200 text-stone-900 placeholder:text-stone-400'
                      }`}
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="font-cinzel text-xs font-bold text-stone-700 dark:text-stone-300">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. aarav@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl text-xs font-outfit border transition-all focus:outline-none focus:border-saffron-500 ${
                        isDark
                          ? 'bg-stone-900/80 border-saffron-500/20 text-stone-100 placeholder:text-stone-500'
                          : 'bg-white border-saffron-200 text-stone-900 placeholder:text-stone-400'
                      }`}
                    />
                  </div>
                </div>

                {/* Interest Dropdown */}
                <div className="space-y-1.5">
                  <label className="font-cinzel text-xs font-bold text-stone-700 dark:text-stone-300">
                    Subject / Purpose of Inquiry
                  </label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl text-xs font-outfit border transition-all focus:outline-none focus:border-saffron-500 cursor-pointer ${
                      isDark
                        ? 'bg-stone-900 border-saffron-500/20 text-stone-100'
                        : 'bg-white border-saffron-200 text-stone-900'
                    }`}
                  >
                    {interests.map((item) => (
                      <option key={item} value={item} className={isDark ? 'bg-stone-900 text-stone-200' : 'bg-white text-stone-800'}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="font-cinzel text-xs font-bold text-stone-700 dark:text-stone-300">
                    Your Devotional Message *
                  </label>
                  <textarea
                    rows="5"
                    required
                    placeholder="Write your thoughts, questions, or collaboration details..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl text-xs font-outfit border transition-all focus:outline-none focus:border-saffron-500 resize-none ${
                      isDark
                        ? 'bg-stone-900/80 border-saffron-500/20 text-stone-100 placeholder:text-stone-500'
                        : 'bg-white border-saffron-200 text-stone-900 placeholder:text-stone-400'
                    }`}
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl font-cinzel text-xs font-bold tracking-widest text-white gradient-saffron-gold shadow-lg shadow-saffron-500/25 hover:shadow-saffron-500/40 hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send size={15} />
                  <span>{isSubmitting ? 'SENDING INQUIRY...' : 'SUBMIT DEVOTIONAL INQUIRY'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
