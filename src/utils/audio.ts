/**
 * AUDIO SYSTEM FOR ROYAL INDIAN WEDDING INVITATION
 * - Temple Bell Sound Synthesis via Web Audio API (Zero lag, zero network failure)
 * - Background Soundtrack Player with smooth fades and user gesture unlocks
 */

class SoundManager {
  private audioCtx: AudioContext | null = null;
  private bgAudio: HTMLAudioElement | null = null;
  private isMuted: boolean = false;
  private isPlaying: boolean = false;
  private listeners: Set<(playing: boolean, muted: boolean) => void> = new Set();

  constructor() {
    // Lazy initialized on first user interaction
  }

  private initAudioContext() {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  /**
   * Synthesize a sacred resonant Indian temple bell chime
   */
  public playTempleChime() {
    if (this.isMuted) return;
    try {
      this.initAudioContext();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;
      // Frequencies simulating a sacred bronze temple bell (ghanta)
      const freqs = [587.33, 880, 1174.66, 1760, 2349.32]; // D5 and bright overtone series
      const gains = [0.4, 0.25, 0.15, 0.08, 0.04];
      const decays = [3.5, 2.8, 2.0, 1.2, 0.8];

      const masterGain = this.audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.5, now);
      masterGain.connect(this.audioCtx.destination);

      freqs.forEach((freq, i) => {
        if (!this.audioCtx) return;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        // Slight detune for metallic bronze shimmer
        osc.frequency.setValueAtTime(freq + (i * 1.5), now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(gains[i], now + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + decays[i]);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(now);
        osc.stop(now + decays[i]);
      });
    } catch {
      // AudioContext could be blocked by browser policy
    }
  }

  /**
   * Start the traditional background wedding music
   */
  public initBackgroundMusic(trackUrl: string) {
    if (this.bgAudio) return;

    this.bgAudio = new Audio(trackUrl);
    this.bgAudio.loop = true;
    this.bgAudio.preload = 'auto';
    this.bgAudio.volume = 0; // will fade in

    this.bgAudio.addEventListener('error', () => {
      console.warn('Background wedding audio could not be loaded, continuing gracefully.');
    });
  }

  public async playMusic(): Promise<boolean> {
    this.initAudioContext();
    if (!this.bgAudio) return false;

    try {
      this.bgAudio.muted = this.isMuted;
      await this.bgAudio.play();
      this.isPlaying = true;
      this.fadeIn();
      this.notify();
      return true;
    } catch (err) {
      console.warn('Audio play was prevented by browser:', err);
      this.isPlaying = false;
      this.notify();
      return false;
    }
  }

  public pauseMusic() {
    if (!this.bgAudio) return;
    this.bgAudio.pause();
    this.isPlaying = false;
    this.notify();
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.bgAudio) {
      this.bgAudio.muted = this.isMuted;
    }
    this.notify();
    return this.isMuted;
  }

  private fadeIn(targetVolume = 0.7, durationMs = 2000) {
    if (!this.bgAudio) return;
    const start = performance.now();
    const tick = (now: number) => {
      if (!this.bgAudio || this.isMuted) return;
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / durationMs);
      this.bgAudio.volume = progress * targetVolume;
      if (progress < 1 && this.isPlaying) {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
  }

  public subscribe(listener: (playing: boolean, muted: boolean) => void) {
    this.listeners.add(listener);
    listener(this.isPlaying, this.isMuted);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(cb => cb(this.isPlaying, this.isMuted));
  }

  public attachGestureUnlock() {
    // 1. Try immediate playback (works in some browsers or when user refreshed after interaction)
    this.playMusic().catch(() => {});

    // 2. Prepare one-time unlock on first user scroll, touch, or key
    const unlock = () => {
      this.playTempleChime();
      this.playMusic().catch(() => {});
      window.removeEventListener('scroll', unlock);
      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('wheel', unlock);
      window.removeEventListener('keydown', unlock);
    };

    window.addEventListener('scroll', unlock, { passive: true, once: true });
    window.addEventListener('touchstart', unlock, { passive: true, once: true });
    window.addEventListener('pointerdown', unlock, { passive: true, once: true });
    window.addEventListener('wheel', unlock, { passive: true, once: true });
    window.addEventListener('keydown', unlock, { passive: true, once: true });
  }

  public getStatus() {
    return {
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
    };
  }
}

export const soundManager = new SoundManager();
