import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useExperienceStore } from '../store/useExperienceStore';

export default function BreathingParticleField({ isBreathing = false }) {
  const pointsRef = useRef();
  const fftData = useExperienceStore((state) => state.fftData);

  // Generate 45,000 high-density volumetric particle points in concentric halo rings
  const { positions, baseRadii, speeds, phaseOffsets } = useMemo(() => {
    const count = 45000;
    const pos = new Float32Array(count * 3);
    const radii = new Float32Array(count);
    const spd = new Float32Array(count);
    const offsets = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const radius = 1.0 + Math.pow(Math.random(), 1.8) * 4.5;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 1.5 * (1.0 / (radius * 0.5));

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = height;
      pos[i * 3 + 2] = Math.sin(angle) * radius;

      radii[i] = radius;
      spd[i] = 0.2 + Math.random() * 0.5;
      offsets[i] = Math.random() * Math.PI * 2;
    }

    return { positions: pos, baseRadii: radii, speeds: spd, phaseOffsets: offsets };
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const time = state.clock.elapsedTime;
    const bass = fftData[1] ? fftData[1] / 255.0 : 0.0;

    // Breathing expansion factor: smooth 4s inhale / 4s exhale oscillation
    const breathFactor = 1.0 + Math.sin(time * 0.785) * 0.35; // 0.785 rad/s = 8-sec full cycle
    const audioReactiveScale = 1.0 + bass * 0.25;

    pointsRef.current.rotation.y += 0.08 * delta;
    pointsRef.current.rotation.x = Math.sin(time * 0.3) * 0.08;

    const currentScale = breathFactor * audioReactiveScale;
    pointsRef.current.scale.set(currentScale, currentScale, currentScale);
  });

  return (
    <points ref={pointsRef} position={[0, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#B8D9CF"
        transparent={true}
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
