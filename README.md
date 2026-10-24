# 🌸 Vedant Devotions (वेदान्त डिवोशन)

A fullstack digital sanctuary dedicated to the eternal wisdom of Sanatan Dharma, spiritual growth, and devotional expression, matching [https://www.vedantdevotions.com/](https://www.vedantdevotions.com/).

---

## 🚀 Tech Stack

- **Frontend**: React.js (Vite + React 18, React Router v6)
- **Styling**: CSS & Tailwind CSS (Cinzel & Outfit typography, Saffron & Gold spiritual palette, Glassmorphism, Dark/Light modes)
- **Icons**: Lucide React
- **Backend**: Node.js + Express
- **Storage & Uploads**: Multer for audio uploads, JSON database with persistent storage
- **Authentication**: JWT & Bcrypt for Admin portal

---

## ✨ Features & Pages

1. **Header & Navigation**:
   - Floating glass pill navigation bar (`rounded-full`, sticky).
   - Authentic Vedant Devotion logo.
   - Smooth navigation: Home, About, Bhajans, Videos, Quotes, Contact, Admin.
   - Serene Light / Peaceful Dark theme toggle (`isDark`).
   - Mobile responsive drawer menu.

2. **Home Page (`/`)**:
   - **Hero Section**: Sacred rotating Mandala, golden glowing aura, divine taglines:
     - *"Sacred melodies to elevate the soul"*
     - *"Where Ancient Wisdom Finds Its Voice Through Music"*
     - *"Bringing Devotion to Life by Inspiring Spiritual Growth Through Powerful and Soulful Imagery"*
   - **About Section**:
     - 4 Divine Deity Cards: Shri Krishna, Devadhidev Mahadev, Maryada Purushottam Ram, Sankat Mochan Hanuman with authentic artwork.
     - 4 Core Pillars: Ancient Wisdom & Heritage, Melodies of the Divine, Amplifying New Voices, Experience & Devotion.
     - Mission, Vision & Goal.
   - **Featured Bhajans Player**:
     - Interactive Audio Player Deck with Play/Pause, Next/Previous track, Repeat, Seek bar, Volume slider, Mute/Unmute, and live animated sound bars.
     - Sacred Lyrics modal in Hindi/Sanskrit.
   - **Devotional Videos & Shorts Showcase**:
     - Categorized filter pills (All, Meditation, Shorts, Kirtan).
     - YouTube embeds with custom video modal supporting widescreen 16:9 videos and vertical 9:16 Shorts.
   - **Daily Vedic Shlok**:
     - Bhagavad Gita & Upanishad shloks with Devanagari script, English transliteration, English translation, "READ NEXT", "Copy Shlok", and "Share Shlok".
   - **Sanctuary Collaboration Banner**.

3. **About Page (`/about`)**:
   - Detailed history, philosophy of Vedanta (*Veda-Anta*), Advaita roots, and artist empowerment platform.

4. **Bhajans Sanctuary Page (`/bhajans`)**:
   - Dedicated music sanctuary with full audio player deck, search bar, category filters, and track list.

5. **Videos & Shorts Page (`/videos`)**:
   - Video library containing 88+ devotional chants, meditation music, and status shorts with instant search and playback.

6. **Daily Quotes Page (`/quotes`)**:
   - Interactive daily verse card plus a grid of all sacred Vedic teachings from Bhagavad Gita, Isha Upanishad, and Maha Upanishad (*Vasudhaiva Kutumbakam*).

7. **Contact Page (`/contact`)**:
   - Contact form (Name, Email, Interest dropdown, Message).
   - Submits to backend API (`POST /api/contact`) with instant feedback.
   - Sanctuary address and direct email care.

8. **Admin Portal (`/admin` and `/login`)**:
   - Secure login with JWT authentication.
   - **Demo Credentials**:
     - **Username**: `admin`
     - **Password**: `vedant@2026`
   - Dashboard Statistics (Total Bhajans, Videos, Shorts, Inquiries).
   - **Add/Delete Bhajans**: Audio upload (`.mp3`, `.wav`) or external URL, Title, Singer, Category, Duration, Description, Lyrics.
   - **Add/Delete Videos**: YouTube ID/URL, Title, Speaker, Category, Duration, Shorts toggle, Description.
   - **View Inquiries**: Real-time list of messages submitted by devotees and collaborators.

9. **Footer**:
   - Spiritual branding, quick links, legal modals (Privacy Policy, Licensing, Terms & Conditions, Disclaimer), social media links, and dedication to the eternal wisdom of Sanatan Dharma.

---

## 🛠️ How to Run

### Option 1: Quick Single-Command Start (Backend + Frontend)

From the project root directory:

```bash
# 1. Start the unified server (port 5000)
npm start
```
Open **[http://localhost:5000](http://localhost:5000)** in your browser!

---

### Option 2: Full Dev Mode with Hot Reloading

Run backend and frontend independently in development:

#### Terminal 1: Backend (Port 5000)
```bash
cd backend
npm install   # If not already installed
node server.js
```

#### Terminal 2: Frontend (Port 5173 with Vite)
```bash
cd frontend
npm install   # If not already installed
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser!

---

## 📂 Project Structure

```
Vedant-Devotion/
├── backend/
│   ├── data/
│   │   ├── admin.json          # Admin credentials
│   │   ├── bhajans.json        # Persistent Bhajans database
│   │   ├── messages.json       # Contact messages
│   │   └── videos.json         # Persistent Videos database
│   ├── uploads/                # User uploaded audio tracks
│   ├── package.json
│   └── server.js               # Express API and static server
├── frontend/
│   ├── public/
│   │   ├── assets/             # Authentic images & mandala SVG
│   │   ├── logo.png
│   │   └── vedant.png
│   ├── src/
│   │   ├── components/         # Navbar, Footer, Hero, AudioPlayer, VideoModal, etc.
│   │   ├── context/            # ThemeContext & DataContext
│   │   ├── pages/              # Home, About, Bhajans, Videos, Quotes, Contact, Admin, Login
│   │   ├── App.jsx             # React Router routing
│   │   ├── index.css           # Tailwind + Custom spiritual glassmorphism styles
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── package.json                # Root automation scripts
└── README.md
```
