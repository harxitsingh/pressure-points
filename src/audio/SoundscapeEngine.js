import { useExperienceStore } from '../store/useExperienceStore';

class SoundscapeEngine {
  constructor() {
    this.ctx = null;
    this.analyser = null;
    this.droneOsc1 = null;
    this.droneOsc2 = null;
    this.binauralOsc = null;
    this.filter = null;
    this.gainNode = null;
    this.isPlaying = false;
    this.animationFrame = null;
    this.fftArray = new Uint8Array(32);
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();

    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 64;
    this.analyser.smoothingTimeConstant = 0.85;

    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.001, this.ctx.currentTime);

    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(140, this.ctx.currentTime);

    // Setup Osc 1: Tension Sub-Drone (55Hz A1)
    this.droneOsc1 = this.ctx.createOscillator();
    this.droneOsc1.type = 'sawtooth';
    this.droneOsc1.frequency.setValueAtTime(55, this.ctx.currentTime);

    // Setup Osc 2: Detuned Tension Shimmer (55.4Hz)
    this.droneOsc2 = this.ctx.createOscillator();
    this.droneOsc2.type = 'sine';
    this.droneOsc2.frequency.setValueAtTime(55.4, this.ctx.currentTime);

    // Setup Binaural Wave for Movement IV (432Hz Healing Theta Beat)
    this.binauralOsc = this.ctx.createOscillator();
    this.binauralOsc.type = 'sine';
    this.binauralOsc.frequency.setValueAtTime(432, this.ctx.currentTime);
    const binauralGain = this.ctx.createGain();
    binauralGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.binauralGain = binauralGain;

    // Routing
    this.droneOsc1.connect(this.filter);
    this.droneOsc2.connect(this.filter);
    this.filter.connect(this.gainNode);

    this.binauralOsc.connect(this.binauralGain);
    this.binauralGain.connect(this.gainNode);

    this.gainNode.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);

    this.droneOsc1.start();
    this.droneOsc2.start();
    this.binauralOsc.start();

    this.startAnalysisLoop();
  }

  toggle() {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isPlaying = !this.isPlaying;
    const targetGain = this.isPlaying ? 0.22 : 0.001;
    this.gainNode.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.4);
    useExperienceStore.getState().setAudioMuted(!this.isPlaying);
    useExperienceStore.getState().setAudioEnabled(this.isPlaying);
  }

  updateMood(movement, tensionScore) {
    if (!this.ctx || !this.isPlaying) return;

    if (movement === 'IV') {
      // Transition to peaceful binaural frequency & open resonant filter
      this.filter.frequency.setTargetAtTime(800, this.ctx.currentTime, 1.2);
      this.binauralGain.gain.setTargetAtTime(0.18, this.ctx.currentTime, 1.0);
      this.droneOsc1.frequency.setTargetAtTime(108, this.ctx.currentTime, 1.5);
    } else {
      // Tension Drone: Low frequency hum that gets denser as tension rises
      const baseFreq = 50 + (tensionScore * 0.4);
      this.filter.frequency.setTargetAtTime(120 + tensionScore * 3, this.ctx.currentTime, 0.3);
      this.droneOsc1.frequency.setTargetAtTime(baseFreq, this.ctx.currentTime, 0.3);
      this.binauralGain.gain.setTargetAtTime(0.001, this.ctx.currentTime, 0.5);
    }
  }

  startAnalysisLoop() {
    const loop = () => {
      if (this.analyser && this.isPlaying) {
        this.analyser.getByteFrequencyData(this.fftArray);
        useExperienceStore.getState().setFFTData(this.fftArray);
      }
      this.animationFrame = requestAnimationFrame(loop);
    };
    loop();
  }
}

export const soundscape = new SoundscapeEngine();
