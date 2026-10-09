import { create } from 'zustand';

export const useExperienceStore = create((set, get) => ({
  // Core Narrative Movement State
  currentMovement: 'I', // 'I' | 'II' | 'III' | 'IV'
  scrollProgress: 0,
  
  // Cognitive Load & Tension Physics
  tensionScore: 40, // 0 - 100
  selectedPressures: ['academic', 'comparison'],
  droppedWeights: ['academic', 'comparison'],
  
  // Audio & FFT Analysis
  audioEnabled: false,
  audioMuted: true,
  audioIntensity: 0.3,
  fftData: new Uint8Array(32),

  // Cursor Inertia & Physical Drag
  cursor: { x: 0, y: 0, targetX: 0, targetY: 0, drag: 1 },
  isExhaustedDrag: false,

  // Hardware Capability & Accessibility
  prefersReducedMotion: false,
  qualityTier: 'high', // 'high' | 'medium' | 'low'

  // Actions
  setMovement: (movement) => set({ currentMovement: movement }),
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  
  togglePressure: (id) => {
    const current = get().selectedPressures;
    const exists = current.includes(id);
    const next = exists ? current.filter((p) => p !== id) : [...current, id];
    
    // Calculate new cognitive tension score (0 to 100)
    const newScore = Math.min(100, next.length * 20);
    
    set({
      selectedPressures: next,
      tensionScore: newScore,
      // If added, register for 3D physical drop
      droppedWeights: exists ? get().droppedWeights.filter(w => w !== id) : [...get().droppedWeights, id],
      isExhaustedDrag: newScore >= 60,
    });
  },

  resetPressures: () => set({
    selectedPressures: [],
    droppedWeights: [],
    tensionScore: 0,
    isExhaustedDrag: false
  }),

  setAudioEnabled: (enabled) => set({ audioEnabled: enabled }),
  setAudioMuted: (muted) => set({ audioMuted: muted }),
  setFFTData: (data) => set({ fftData: data }),
  
  updateCursor: (coords) => set((state) => ({
    cursor: { ...state.cursor, ...coords }
  })),

  setReducedMotion: (reduced) => set({
    prefersReducedMotion: reduced,
    qualityTier: reduced ? 'low' : 'high'
  }),
}));
