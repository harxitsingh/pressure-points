import React, { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { FluidVertexShader, FluidFragmentShader } from '../shaders/fluidSimulationShader';
import { useExperienceStore } from '../store/useExperienceStore';

export default function FluidFieldMesh() {
  const meshRef = useRef();
  const materialRef = useRef();
  const { size } = useThree();

  const tensionScore = useExperienceStore((state) => state.tensionScore);
  const scrollProgress = useExperienceStore((state) => state.scrollProgress);
  const fftData = useExperienceStore((state) => state.fftData);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uMouse: { value: new THREE.Vector2(size.width / 2, size.height / 2) },
    uScrollProgress: { value: 0 },
    uAudioBass: { value: 0 },
    uTension: { value: 0.3 }
  }), [size.width, size.height]);

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uResolution.value.set(state.size.width, state.size.height);

    const mouseX = (state.pointer.x * 0.5 + 0.5) * state.size.width;
    const mouseY = (state.pointer.y * 0.5 + 0.5) * state.size.height;
    materialRef.current.uniforms.uMouse.value.set(mouseX, mouseY);

    const bass = fftData[0] ? fftData[0] / 255.0 : 0.0;
    materialRef.current.uniforms.uAudioBass.value = bass;

    materialRef.current.uniforms.uScrollProgress.value = scrollProgress;
    materialRef.current.uniforms.uTension.value = tensionScore / 100.0;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <planeGeometry args={[20, 20]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={FluidVertexShader}
        fragmentShader={FluidFragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}
