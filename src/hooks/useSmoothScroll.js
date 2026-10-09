import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useExperienceStore } from '../store/useExperienceStore';
import { soundscape } from '../audio/SoundscapeEngine';

gsap.registerPlugin(ScrollTrigger);

export function useSmoothScroll() {
  const setMovement = useExperienceStore((state) => state.setMovement);
  const setScrollProgress = useExperienceStore((state) => state.setScrollProgress);
  const tensionScore = useExperienceStore((state) => state.tensionScore);

  useEffect(() => {
    // Check reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      useExperienceStore.getState().setReducedMotion(true);
      return;
    }

    // Initialize Lenis Smooth Inertial Scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    window.__lenis = lenis;

    lenis.on('scroll', (e) => {
      ScrollTrigger.update();
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? e.scroll / maxScroll : 0;
      setScrollProgress(progress);
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // GSAP ScrollTrigger Configuration for Movement Sync
    const movements = [
      { id: 'hero', movement: 'I' },
      { id: 'pressure-meter', movement: 'II' },
      { id: 'unsaid-wall', movement: 'III' },
      { id: 'breathing-space', movement: 'IV' },
    ];

    movements.forEach(({ id, movement }) => {
      const element = document.getElementById(id);
      if (element) {
        ScrollTrigger.create({
          trigger: element,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => {
            setMovement(movement);
            soundscape.updateMood(movement, tensionScore);
          },
          onEnterBack: () => {
            setMovement(movement);
            soundscape.updateMood(movement, tensionScore);
          },
        });
      }
    });

    return () => {
      window.__lenis = null;
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [setMovement, setScrollProgress, tensionScore]);
}
