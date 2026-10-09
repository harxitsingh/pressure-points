import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration, Noise } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useExperienceStore } from '../store/useExperienceStore';

import FluidFieldMesh from './FluidFieldMesh';
import ParticleTypography from './ParticleTypography';
import PressurePhysicsCore from './PressurePhysicsCore';
import BreathingParticleField from './BreathingParticleField';

export default function SceneCanvas() {
  const currentMovement = useExperienceStore((state) => state.currentMovement);
  const tensionScore = useExperienceStore((state) => state.tensionScore);
  const prefersReducedMotion = useExperienceStore((state) => state.prefersReducedMotion);

  // If user prefers reduced motion, disable 3D postprocessing and heavy canvas to conserve resources
  if (prefersReducedMotion) {
    return null;
  }

  // Calculate cognitive distortion amounts based on accumulated tension (0 - 100)
  const aberrationOffset = new THREE.Vector2(
    (tensionScore / 100) * 0.006,
    (tensionScore / 100) * 0.006
  );
  const noiseOpacity = 0.03 + (tensionScore / 100) * 0.08;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-25">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          {/* Ambient & Directional Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 8, 5]} intensity={1.2} />
          <pointLight position={[-4, -3, -2]} color="#F26B4F" intensity={tensionScore > 40 ? 1.5 : 0.4} />
          <pointLight position={[4, 3, -1]} color="#B8D9CF" intensity={0.8} />

          {/* Fullscreen Fluid Simulation Background */}
          <FluidFieldMesh />

          {/* Movement I: Particle Raymarched Typography */}
          {currentMovement === 'I' && (
            <group position={[0, 0.4, 0]}>
              <ParticleTypography />
            </group>
          )}

          {/* Movement II: Rapier 3D Rigid-Body Physics Core */}
          {currentMovement === 'II' && (
            <group position={[0, 0.2, 0]}>
              <PressurePhysicsCore />
            </group>
          )}

          {/* Movement IV: 45k-Point Bioluminescent Breathing Halo */}
          {currentMovement === 'IV' && (
            <group position={[0, 0, 0]}>
              <BreathingParticleField isBreathing={true} />
            </group>
          )}

          {/* Post-Processing Pipeline: Distortion scales dynamically with psychological pressure */}
          <EffectComposer multisampling={0}>
            <Bloom
              luminanceThreshold={0.55}
              luminanceSmoothing={0.8}
              intensity={0.7}
              mipmapBlur={true}
            />
            <ChromaticAberration
              offset={aberrationOffset}
              radialModulation={false}
              modulationOffset={0}
            />
            <Noise opacity={noiseOpacity} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
