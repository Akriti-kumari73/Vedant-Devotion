import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef
} from 'react';
import { defaultBhajans, defaultVideos } from '../data/fallbackData';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [videos, setVideos] = useState(defaultVideos);
  const [bhajans, setBhajans] = useState(() =>
    defaultBhajans.map((item) => ({
      ...item,
      artist: item.singer || item.artist || 'Traditional',
      url: item.audio_url?.startsWith('http')
        ? item.audio_url
        : `${window.location.origin}${item.audio_url}`
    }))
  );
  const [loading, setLoading] = useState(false);
  const [dataErrors, setDataErrors] = useState({ videos: null, bhajans: null });

  // --- Global Audio Player State ---
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const [showLyricsModal, setShowLyricsModal] = useState(false);
  const [playerExpanded, setPlayerExpanded] = useState(false);

  // Hidden Global Audio Element Ref
  const audioRef = useRef(null);

  // Fetch Bhajans
  const fetchBhajans = useCallback(async () => {
    try {
      const res = await fetch('/api/bhajans');
      if (!res.ok) throw new Error(`Bhajans API failed: ${res.status}`);
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const mapped = data.map((item) => ({
          ...item,
          artist: item.singer || item.artist || 'Traditional',
          url: item.audio_url?.startsWith('http')
            ? item.audio_url
            : `${window.location.origin}${item.audio_url}`
        }));
        setBhajans(mapped);
      }
      setDataErrors((prev) => ({ ...prev, bhajans: null }));
    } catch (err) {
      // Quietly preserve pre-bundled sacred bhajans
      console.warn('API bhajans not reachable, using bundled sacred tracks:', err.message);
    }
  }, []);

  // Fetch Videos
  const fetchVideos = useCallback(async () => {
    try {
      const res = await fetch('/api/videos');
      if (!res.ok) throw new Error(`Videos API failed: ${res.status}`);
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setVideos(data);
      }
      setDataErrors((prev) => ({ ...prev, videos: null }));
    } catch (err) {
      // Quietly preserve pre-bundled sacred videos
      console.warn('API videos not reachable, using bundled sacred videos:', err.message);
    }
  }, []);

  const refreshAll = useCallback(async () => {
    setLoading(true);
    await Promise.allSettled([fetchBhajans(), fetchVideos()]);
    setLoading(false);
  }, [fetchBhajans, fetchVideos]);

  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  // Current active track object
  const currentTrack = bhajans[currentTrackIndex] || null;

  // Handle track source reload
  useEffect(() => {
    if (audioRef.current && currentTrack?.url) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current
          .play()
          .catch((err) => console.log('Autoplay prevented/error:', err));
      }
    }
  }, [currentTrackIndex, currentTrack?.url]);

  // Play a specific track by index
  const playTrack = (index) => {
    if (index >= 0 && index < bhajans.length) {
      if (index === currentTrackIndex) {
        togglePlay();
      } else {
        setCurrentTrackIndex(index);
        setIsPlaying(true);
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.play().catch(console.error);
          }
        }, 50);
      }
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('Play error:', err));
    }
  };

  const pauseTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) =>
      prev === bhajans.length - 1 ? 0 : prev + 1
    );
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) =>
      prev === 0 ? bhajans.length - 1 : prev - 1
    );
  };

  const seekTo = (seconds) => {
    if (audioRef.current) {
      audioRef.current.currentTime = seconds;
      setCurrentTime(seconds);
    }
  };

  const setVolume = (val) => {
    setVolumeState(val);
    setIsMuted(val === 0);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume || 0.8;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const handleEnded = () => {
    if (isRepeating && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      nextTrack();
    }
  };

  // Video Management
  const addVideo = async (videoData) => {
    try {
      const token = localStorage.getItem('admin-token');
      const res = await fetch('/api/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(videoData)
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to add video');
      }
      await fetchVideos();
      return true;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const deleteVideo = async (id) => {
    try {
      const token = localStorage.getItem('admin-token');
      const res = await fetch(`/api/videos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to delete video');
      }
      setVideos((prev) => prev.filter((v) => v.id !== id));
      return true;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // Bhajan Management
  const uploadAudio = async (file) => {
    try {
      const token = localStorage.getItem('admin-token');
      const formData = new FormData();
      formData.append('audio', file);
      const res = await fetch('/api/bhajans/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Audio upload failed');
      }
      const data = await res.json();
      return data.audio_url || data.url;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const addBhajan = async (bhajanData) => {
    try {
      const token = localStorage.getItem('admin-token');
      const res = await fetch('/api/bhajans/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(bhajanData)
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to add bhajan');
      }
      await fetchBhajans();
      return true;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const deleteBhajan = async (id) => {
    try {
      const token = localStorage.getItem('admin-token');
      const res = await fetch(`/api/bhajans/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to delete bhajan');
      }
      setBhajans((prev) => prev.filter((b) => b.id !== id));
      return true;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return (
    <DataContext.Provider
      value={{
        videos,
        bhajans,
        loading,
        dataErrors,
        refreshAll,
        // Global Audio state
        currentTrack,
        currentTrackIndex,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        isRepeating,
        showLyricsModal,
        playerExpanded,
        playTrack,
        pauseTrack,
        togglePlay,
        nextTrack,
        prevTrack,
        seekTo,
        setVolume,
        toggleMute,
        setIsRepeating,
        setShowLyricsModal,
        setPlayerExpanded,
        // Admin CRUD
        addVideo,
        deleteVideo,
        uploadAudio,
        addBhajan,
        deleteBhajan
      }}
    >
      {/* Persistent HTML5 Audio Tag */}
      <audio
        ref={audioRef}
        src={currentTrack?.url || currentTrack?.audio_url}
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            setDuration(audioRef.current.duration || 0);
          }
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration || 0);
          }
        }}
        onEnded={handleEnded}
      />
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
