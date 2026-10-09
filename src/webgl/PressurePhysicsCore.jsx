import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Physics, RigidBody, BallCollider } from '@react-three/rapier';
import { useExperienceStore } from '../store/useExperienceStore';

// 3D Geometry representations for each pressure type
function PressureWeightMesh({ type }) {
  switch (type) {
    case 'academic':
      return (
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshStandardMaterial color="#F26B4F" roughness={0.3} metalness={0.8} />
        </mesh>
      );
    case 'comparison':
      return (
        <mesh castShadow receiveShadow>
          <octahedronGeometry args={[0.9, 0]} />
          <meshStandardMaterial color="#d9563c" roughness={0.1} metalness={0.9} />
        </mesh>
      );
    case 'family':
      return (
        <mesh castShadow receiveShadow>
          <coneGeometry args={[0.9, 1.6, 6]} />
          <meshStandardMaterial color="#B8D9CF" roughness={0.4} metalness={0.6} />
        </mesh>
      );
    case 'failure':
      return (
        <mesh castShadow receiveShadow>
          <dodecahedronGeometry args={[0.85, 0]} />
          <meshStandardMaterial color="#c23d2e" roughness={0.5} wireframe={false} />
        </mesh>
      );
    case 'future':
    default:
      return (
        <mesh castShadow receiveShadow>
          <torusGeometry args={[0.7, 0.28, 16, 32]} />
          <meshStandardMaterial color="#ece8dc" roughness={0.2} metalness={0.7} />
        </mesh>
      );
  }
}

export default function PressurePhysicsCore() {
  const coreRef = useRef();
  const selectedPressures = useExperienceStore((state) => state.selectedPressures);
  const tensionScore = useExperienceStore((state) => state.tensionScore);

  useFrame((state, delta) => {
    if (coreRef.current) {
      // Rotation speed and tremor increase with tension score
      const tremor = (tensionScore / 100) * 0.05;
      coreRef.current.rotation.y += (0.4 + tensionScore * 0.02) * delta;
      coreRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2.0) * tremor;
      coreRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 2.5) * tremor;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <Physics gravity={[0, -9.81, 0]}>
        
        {/* Central Core: The Student's Mind Under Load */}
        <RigidBody type="fixed" colliders={false} position={[0, -0.5, 0]}>
          <BallCollider args={[1.5]} />
          <group ref={coreRef}>
            {/* Inner glowing icosahedron */}
            <mesh>
              <icosahedronGeometry args={[1.4, 1]} />
              <meshStandardMaterial
                color={tensionScore > 50 ? '#F26B4F' : '#1c1c1c'}
                emissive={tensionScore > 50 ? '#F26B4F' : '#171717'}
                emissiveIntensity={tensionScore / 60}
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>

            {/* Outer wireframe shell indicating structural strain */}
            <mesh>
              <icosahedronGeometry args={[1.55, 1]} />
              <meshBasicMaterial
                color={tensionScore > 50 ? '#F26B4F' : '#B8D9CF'}
                wireframe={true}
                transparent={true}
                opacity={0.4 + (tensionScore / 100) * 0.5}
              />
            </mesh>
          </group>
        </RigidBody>

        {/* Dynamic Falling Weights: Drop onto the core as user toggles pressures */}
        {selectedPressures.map((pressureId, index) => {
          const spawnX = (Math.sin(index * 1.5) * 0.8);
          const spawnZ = (Math.cos(index * 1.5) * 0.8);
          const spawnY = 3.5 + index * 1.6;

          return (
            <RigidBody
              key={pressureId}
              position={[spawnX, spawnY, spawnZ]}
              restitution={0.35}
              friction={0.8}
              linearDamping={0.4}
              angularDamping={0.3}
            >
              <PressureWeightMesh type={pressureId} />
            </RigidBody>
          );
        })}

        {/* Invisible containment boundary to prevent bodies flying off-screen */}
        <RigidBody type="fixed" position={[0, -3.5, 0]}>
          <mesh visible={false}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshBasicMaterial />
          </mesh>
        </RigidBody>
      </Physics>
    </group>
  );
}
