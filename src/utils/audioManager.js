import bgMusicFile from '../assets/music/bgmusic.mp3';
import swingFile from '../assets/music/swing.mp3';
import clickFile from '../assets/music/click.mp3';

let isAudioEnabled = false;
let audioListeners = [];

export const subscribeToAudioState = (cb) => {
  audioListeners.push(cb);
  cb(isAudioEnabled);
  return () => {
    audioListeners = audioListeners.filter(l => l !== cb);
  };
};

const notifyAudioState = () => {
  audioListeners.forEach(cb => cb(isAudioEnabled));
};

let bgMusicAudio = null;
let swingAudio = null;
let clickAudio = null;

// Initialize audio objects
export const initAudio = () => {
  if (typeof window === 'undefined') return;

  if (!bgMusicAudio) {
    bgMusicAudio = new Audio(bgMusicFile);
    bgMusicAudio.loop = true;
    bgMusicAudio.volume = 0.4; // A bit softer for BG music
  }

  if (!swingAudio) {
    swingAudio = new Audio(swingFile);
    swingAudio.volume = 0.6;
  }

  if (!clickAudio) {
    clickAudio = new Audio(clickFile);
    clickAudio.volume = 0.7;
  }
};

// Start or toggle Background Music (Triggered via Logo or Noir mode)
export const playBackgroundMusic = () => {
  initAudio();
  
  if (!isAudioEnabled) {
    isAudioEnabled = true;
    notifyAudioState();
    
    if (bgMusicAudio) {
      bgMusicAudio.play().catch(err => {
        console.warn('Audio playback blocked by browser policies:', err);
      });
    }
  } else {
    if (bgMusicAudio && bgMusicAudio.paused) {
      bgMusicAudio.play().catch(() => {});
    }
  }
};

export const stopBackgroundMusic = () => {
  if (bgMusicAudio && !bgMusicAudio.paused) {
    bgMusicAudio.pause();
  }
  isAudioEnabled = false;
  notifyAudioState();
};

export const toggleBackgroundMusic = (forceState) => {
  initAudio();
  
  if (forceState === undefined) {
    isAudioEnabled = !isAudioEnabled;
  } else {
    isAudioEnabled = forceState;
  }
  notifyAudioState();

  if (isAudioEnabled) {
    bgMusicAudio?.play().catch(err => console.warn('Audio playback blocked:', err));
  } else {
    bgMusicAudio?.pause();
  }
};

// Play swing sound
export const playSwingSound = () => {
  if (!isAudioEnabled) return; // Only play if audio globally enabled
  
  initAudio();
  if (swingAudio) {
    swingAudio.currentTime = 0; // Reset to start
    swingAudio.play().catch(() => {});
  }
};

// Play click sound
export const playClickSound = () => {
  if (!isAudioEnabled) return; // Only play if audio globally enabled

  initAudio();
  if (clickAudio) {
    clickAudio.currentTime = 0; // Reset to start
    clickAudio.play().catch(() => {});
  }
};

// Global click listener to automatically trigger UI click sounds
if (typeof window !== 'undefined') {
  window.addEventListener('click', (e) => {
    // Check if the clicked target is interactive like a link or a button
    // or if it has an onClick handler (heuristically, cursor: pointer can't be checked synchronously easily, but tags can)
    const target = e.target;
    if (
      target.closest('button') || 
      target.closest('a') || 
      target.closest('[role="button"]')
    ) {
      playClickSound();
    }
  });
}
