export const ParticleTextVertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uScatterRadius;
  uniform float uScatterStrength;
  uniform float uAudioFreq;
  uniform float uTension;

  attribute vec3 aTargetPosition;
  attribute float aRandomSeed;

  varying vec3 vPosition;
  varying float vDistanceToMouse;
  varying float vSeed;

  void main() {
    vSeed = aRandomSeed;
    vec3 pos = aTargetPosition;

    // Subtle idle breathing oscillation
    pos.y += sin(uTime * 1.5 + aRandomSeed * 6.28) * 0.04;
    pos.x += cos(uTime * 1.1 + aRandomSeed * 3.14) * 0.03;

    // High cognitive tension jitter
    if (uTension > 0.4) {
      float jitterStrength = (uTension - 0.4) * 0.08;
      pos.x += (fract(sin(uTime * 30.0 + aRandomSeed * 100.0) * 43758.5453) - 0.5) * jitterStrength;
      pos.y += (fract(cos(uTime * 25.0 + aRandomSeed * 120.0) * 23421.6312) - 0.5) * jitterStrength;
    }

    // Audio FFT pulse reaction
    pos += normal * (uAudioFreq * 0.15);

    // Boids Mouse Repulsion Physics
    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    vec2 diff = worldPos.xy - uMouse;
    float dist = length(diff);
    vDistanceToMouse = dist;

    if (dist < uScatterRadius && dist > 0.001) {
      float force = (1.0 - dist / uScatterRadius) * uScatterStrength;
      vec2 dir = normalize(diff);
      
      // Scatter violently away like startled boids
      worldPos.xy += dir * force;
      worldPos.z += sin(dist * 10.0 - uTime * 4.0) * force * 0.5;
    }

    vPosition = worldPos.xyz;
    vec4 mvPosition = viewMatrix * worldPos;
    gl_PointSize = (14.0 / -mvPosition.z) * (1.0 + uAudioFreq * 0.8);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const ParticleTextFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uBaseColor;
  uniform vec3 uTensionColor;
  uniform float uTension;

  varying vec3 vPosition;
  varying float vDistanceToMouse;
  varying float vSeed;

  void main() {
    // Make circular particles with soft anti-aliased edge
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    if (dist > 0.5) discard;
    
    float alpha = smoothstep(0.5, 0.1, dist);

    // Color gradient between calm ivory and anxious coral based on tension
    vec3 color = mix(uBaseColor, uTensionColor, uTension);

    // Subtle edge glow on mouse proximity
    if (vDistanceToMouse < 1.5) {
      color = mix(color, vec3(1.0, 0.9, 0.85), (1.5 - vDistanceToMouse) * 0.5);
    }

    gl_FragColor = vec4(color, alpha * 0.88);
  }
`;
