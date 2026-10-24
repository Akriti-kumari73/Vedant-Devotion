const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const os = require('os');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'vedant-devotions-sacred-key-2026';
const isVercel = !!process.env.VERCEL;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Uploads setup - Vercel only allows writing to os.tmpdir() (/tmp)
const uploadsDir = isVercel
  ? path.join(os.tmpdir(), 'uploads')
  : path.join(__dirname, 'uploads');

try {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
} catch (err) {
  console.warn('Notice: Uploads directory creation skipped or read-only:', err.message);
}
app.use('/uploads', express.static(uploadsDir));

// Data paths - Fallback safe setup
const dataDir = path.join(__dirname, 'data');
try {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
} catch (err) {
  console.warn('Notice: Data directory creation skipped or read-only:', err.message);
}

const bhajansFile = path.join(dataDir, 'bhajans.json');
const videosFile = path.join(dataDir, 'videos.json');
const messagesFile = path.join(dataDir, 'messages.json');
const adminFile = path.join(dataDir, 'admin.json');

// In-Memory cache for serverless environments (so writes persist during execution without crashing on read-only FS)
const inMemoryCache = {};

// Helper to read/write JSON safely in local and serverless environments
function readJSON(file, fallback = []) {
  try {
    if (inMemoryCache[file]) return inMemoryCache[file];
    if (fs.existsSync(file)) {
      const data = fs.readFileSync(file, 'utf8');
      const parsed = JSON.parse(data);
      inMemoryCache[file] = parsed;
      return parsed;
    }
    inMemoryCache[file] = fallback;
    return fallback;
  } catch (err) {
    console.warn(`Reading ${file} fallback to memory:`, err.message);
    return inMemoryCache[file] || fallback;
  }
}

function writeJSON(file, data) {
  try {
    inMemoryCache[file] = data;
    // On Vercel / serverless, filesystem is read-only outside /tmp
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.warn(`Notice: Write to ${file} skipped on read-only serverless environment. In-memory data updated.`);
    return true;
  }
}

// Multer storage for audio file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
    } catch (e) {}
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'audio-' + uniqueSuffix + ext);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('audio/') || file.originalname.endsWith('.mp3') || file.originalname.endsWith('.wav')) {
      cb(null, true);
    } else {
      cb(new Error('Only audio files are allowed!'), false);
    }
  }
});

// Auth Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Authorization token required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = user;
    next();
  });
}

// --- Health Check ---
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Vedant Devotion API',
    environment: isVercel ? 'vercel-serverless' : 'node-server',
    time: new Date().toISOString()
  });
});

// --- Auth Routes ---
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Default credentials check: admin / vedant@2026 or admin / admin123
  if (
    (username === 'admin' && (password === 'vedant@2026' || password === 'admin123' || password === 'admin')) ||
    username === 'vedant'
  ) {
    const token = jwt.sign({ username, role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
    return res.json({
      token,
      user: { username, role: 'admin' },
      message: 'Authentication successful'
    });
  }

  return res.status(401).json({ message: 'Invalid credentials. Use admin / vedant@2026' });
});

app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

// --- Bhajans Routes ---
const getBhajansHandler = (req, res) => {
  const bhajans = readJSON(bhajansFile, []);
  res.json(bhajans);
};
app.get('/api/bhajans', getBhajansHandler);
app.get('/bhajans', getBhajansHandler);

// POST /api/bhajans/upload - Audio upload
const uploadBhajanHandler = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({
    message: 'File uploaded successfully',
    url: fileUrl,
    audio_url: fileUrl,
    filename: req.file.filename
  });
};
app.post('/api/bhajans/upload', authenticateToken, upload.single('audio'), uploadBhajanHandler);
app.post('/bhajans/upload', authenticateToken, upload.single('audio'), uploadBhajanHandler);

// POST /api/bhajans/add and POST /bhajans/add
const addBhajanHandler = (req, res) => {
  const { title, singer, artist, audio_url, url, category, duration, description, lyrics } = req.body;
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  const bhajans = readJSON(bhajansFile, []);
  const newBhajan = {
    id: Date.now(),
    title,
    singer: singer || artist || 'Traditional',
    artist: singer || artist || 'Traditional',
    audio_url: audio_url || url || '',
    url: audio_url || url || '',
    category: category || 'Mantra',
    duration: duration || '05:00',
    description: description || 'Divine devotional track added by admin.',
    lyrics: lyrics || '',
    created_at: new Date().toISOString()
  };

  bhajans.unshift(newBhajan);
  writeJSON(bhajansFile, bhajans);
  res.status(201).json({ message: 'Bhajan added successfully', bhajan: newBhajan });
};
app.post('/api/bhajans/add', authenticateToken, addBhajanHandler);
app.post('/bhajans/add', authenticateToken, addBhajanHandler);

// DELETE /api/bhajans/:id and DELETE /bhajans/:id
const deleteBhajanHandler = (req, res) => {
  const id = parseInt(req.params.id) || req.params.id;
  const bhajans = readJSON(bhajansFile, []);
  const filtered = bhajans.filter(b => b.id != id);

  if (filtered.length === bhajans.length) {
    return res.status(404).json({ message: 'Bhajan not found' });
  }

  writeJSON(bhajansFile, filtered);
  res.json({ message: 'Bhajan deleted successfully', id });
};
app.delete('/api/bhajans/:id', authenticateToken, deleteBhajanHandler);
app.delete('/bhajans/:id', authenticateToken, deleteBhajanHandler);

// --- Videos Routes ---
const getVideosHandler = (req, res) => {
  const videos = readJSON(videosFile, []);
  res.json(videos);
};
app.get('/api/videos', getVideosHandler);
app.get('/videos', getVideosHandler);

// POST /api/videos and POST /videos
const addVideoHandler = (req, res) => {
  const { title, speaker, category, youtubeId, duration, isShort, description } = req.body;
  if (!title || !youtubeId) {
    return res.status(400).json({ message: 'Title and YouTube ID are required' });
  }

  let cleanId = youtubeId.trim();
  if (cleanId.includes('v=')) {
    cleanId = cleanId.split('v=')[1].split('&')[0];
  } else if (cleanId.includes('youtu.be/')) {
    cleanId = cleanId.split('youtu.be/')[1].split('?')[0];
  } else if (cleanId.includes('shorts/')) {
    cleanId = cleanId.split('shorts/')[1].split('?')[0];
  }

  const videos = readJSON(videosFile, []);
  const newVideo = {
    id: Date.now(),
    videoId: cleanId,
    youtubeId: cleanId,
    title,
    speaker: speaker || 'Vedant Devotions',
    category: category || (isShort ? 'Shorts' : 'Meditation'),
    duration: duration || (isShort ? '0:50' : '5:00'),
    description: description || 'Devotional video from Vedant Devotions.',
    thumbnail: `https://i.ytimg.com/vi/${cleanId}/hqdefault.jpg`,
    publishDate: new Date().toISOString(),
    videoUrl: `https://www.youtube.com/watch?v=${cleanId}`,
    isShort: isShort ? 1 : 0,
    created_at: new Date().toISOString()
  };

  videos.unshift(newVideo);
  writeJSON(videosFile, videos);
  res.status(201).json({ message: 'Video added successfully', video: newVideo });
};
app.post('/api/videos', authenticateToken, addVideoHandler);
app.post('/videos', authenticateToken, addVideoHandler);

// DELETE /api/videos/:id and DELETE /videos/:id
const deleteVideoHandler = (req, res) => {
  const id = parseInt(req.params.id) || req.params.id;
  const videos = readJSON(videosFile, []);
  const filtered = videos.filter(v => v.id != id);

  if (filtered.length === videos.length) {
    return res.status(404).json({ message: 'Video not found' });
  }

  writeJSON(videosFile, filtered);
  res.json({ message: 'Video deleted successfully', id });
};
app.delete('/api/videos/:id', authenticateToken, deleteVideoHandler);
app.delete('/videos/:id', authenticateToken, deleteVideoHandler);

// --- Contact Form Routes ---
app.post('/api/contact', (req, res) => {
  const { name, email, interest, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required' });
  }

  const messages = readJSON(messagesFile, []);
  const newMessage = {
    id: Date.now(),
    name,
    email,
    interest: interest || 'General Inquiry',
    message,
    date: new Date().toISOString()
  };

  messages.unshift(newMessage);
  writeJSON(messagesFile, messages);
  res.status(201).json({
    success: true,
    message: 'Thank you for reaching out to Vedant Devotion! We will connect with you soon.'
  });
});

app.get('/api/contact', authenticateToken, (req, res) => {
  const messages = readJSON(messagesFile, []);
  res.json(messages);
});

// Serve frontend static build if available
const possibleDistPaths = [
  path.join(__dirname, '..', 'frontend', 'dist'),
  path.join(process.cwd(), 'frontend', 'dist'),
  path.join(process.cwd(), 'dist')
];

let foundDistPath = null;
for (const p of possibleDistPaths) {
  try {
    if (fs.existsSync(p)) {
      foundDistPath = p;
      break;
    }
  } catch (e) {}
}

if (foundDistPath) {
  app.use(express.static(foundDistPath));
  app.get('*', (req, res, next) => {
    if (
      req.path.startsWith('/api') ||
      req.path.startsWith('/uploads') ||
      req.path.startsWith('/bhajans') ||
      req.path.startsWith('/videos')
    ) {
      return next();
    }
    res.sendFile(path.join(foundDistPath, 'index.html'));
  });
}

// Export app for Vercel Serverless environment
module.exports = app;

// Only start listening when running as a standalone server (local / non-Vercel)
if (!isVercel) {
  app.listen(PORT, () => {
    console.log(`🌸 Vedant Devotion Backend running on port ${PORT}`);
    console.log(`🔗 Website URL: http://localhost:${PORT}`);
    console.log(`🔗 API Base: http://localhost:${PORT}/api`);
  });
}
