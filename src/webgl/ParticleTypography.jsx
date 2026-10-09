import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ParticleTextVertexShader, ParticleTextFragmentShader } from '../shaders/raymarchedTextShader';
import { useExperienceStore } from '../store/useExperienceStore';

export default function ParticleTypography() {
  const meshRef = useRef();
  const materialRef = useRef();
  const tensionScore = useExperienceStore((state) => state.tensionScore);
  const fftData = useExperienceStore((state) => state.fftData);

  // Generate 4,500 instanced particle points sampling letter positions
  const { positions, randomSeeds } = useMemo(() => {
    const count = 4500;
    const pos = new Float32Array(count * 3);
    const seeds = new Float32Array(count);

    // Coordinate grid sampling representing "YOU SAID YOU WERE FINE"
    let index = 0;
    
    // Line 1: YOU SAID
    for (let i = 0; i < 1800; i++) {
      const u = (Math.random() - 0.5) * 6.5;
      const v = 0.8 + (Math.random() - 0.5) * 0.9;
      const w = (Math.random() - 0.5) * 0.2;
      pos[index * 3] = u;
      pos[index * 3 + 1] = v;
      pos[index * 3 + 2] = w;
      seeds[index] = Math.random();
      index++;
    }

    // Line 2: YOU WERE FINE
    for (let i = 0; i < 2700; i++) {
      const u = (Math.random() - 0.5) * 7.5;
      const v = -0.5 + (Math.random() - 0.5) * 0.9;
      const w = (Math.random() - 0.5) * 0.2;
      pos[index * 3] = u;
      pos[index * 3 + 1] = v;
      pos[index * 3 + 2] = w;
      seeds[index] = Math.random();
      index++;
    }

    return { positions: pos, randomSeeds: seeds };
  }, []);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(999, 999) },
    uScatterRadius: { value: 2.2 },
    uScatterStrength: { value: 1.8 },
    uAudioFreq: { value: 0 },
    uTension: { value: 0.3 },
    uBaseColor: { value: new THREE.Color('#F7F5EF') },
    uTensionColor: { value: new THREE.Color('#F26B4F') }
  }), []);

  useFrame((state) => {
    if (!materialRef.current) return;

    // Update uniforms
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    
    // Normalize mouse in 3D world units
    const mouseX = (state.pointer.x * state.viewport.width) / 2;
    const mouseY = (state.pointer.y * state.viewport.height) / 2;
    materialRef.current.uniforms.uMouse.value.set(mouseX, mouseY);

    // Audio FFT bass factor
    const bass = fftData[2] ? fftData[2] / 255.0 : 0.0;
    materialRef.current.uniforms.uAudioFreq.value = bass;

    // Tension factor from Zustand store
    materialRef.current.uniforms.uTension.value = tensionScore / 100.0;
  });

  return (
    <points ref={meshRef} position={[0, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aTargetPosition"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aRandomSeed"
          count={randomSeeds.length}
          array={randomSeeds}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={ParticleTextVertexShader}
        fragmentShader={ParticleTextFragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
