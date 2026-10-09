import React, { useEffect, useRef, useState } from 'react';
import { useExperienceStore } from '../store/useExperienceStore';

export default function MagneticExhaustionCursor() {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);

  const isExhaustedDrag = useExperienceStore((state) => state.isExhaustedDrag);
  const currentMovement = useExperienceStore((state) => state.currentMovement);
  const tensionScore = useExperienceStore((state) => state.tensionScore);
  const prefersReducedMotion = useExperienceStore((state) => state.prefersReducedMotion);

  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const laggedPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    let animId;
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Physics Loop for Simulated Inertia and Drag
    const updatePhysics = () => {
      // Damping coefficient decreases under high tension (heavy sluggish drag)
      const isDraggingWeight = currentMovement === 'II' || isExhaustedDrag;
      const ease = isDraggingWeight ? 0.045 : 0.16;

      laggedPos.current.x += (mousePos.x - laggedPos.current.x) * ease;
      laggedPos.current.y += (mousePos.y - laggedPos.current.y) * ease;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`;
      }

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${laggedPos.current.x}px, ${laggedPos.current.y}px, 0)`;
      }

      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [mousePos, currentMovement, isExhaustedDrag, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  const isHeavy = currentMovement === 'II' || isExhaustedDrag;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block overflow-hidden">
      {/* Real-time precise cursor dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-300 ${
          isHeavy ? 'w-2 h-2 bg-[#E96B50]' : 'w-1.5 h-1.5 bg-[#171717]'
        }`}
      />

      {/* Lagging physics ring that stretches under mental exhaustion */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-500 flex items-center justify-center ${
          isHeavy 
            ? 'w-12 h-12 border-[#E96B50] bg-[#E96B50]/15 backdrop-blur-xs scale-125' 
            : 'w-7 h-7 border-[#171717]/30 bg-transparent'
        }`}
      >
        {isHeavy && (
          <span className="font-mono text-[8px] text-[#E96B50] tracking-tighter uppercase font-bold animate-pulse">
            HEAVY
          </span>
        )}
      </div>
    </div>
  );
}
