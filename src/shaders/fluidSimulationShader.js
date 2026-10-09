export const FluidVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

export const FluidFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uScrollProgress;
  uniform float uAudioBass;
  uniform float uTension;

  varying vec2 vUv;

  // 2D Hash function
  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  // Simplex-style Gradient Noise
  float gnoise(in vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
                   dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
               mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
                   dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
  }

  // 4-Octave Fractional Brownian Motion (fBm)
  float fbm(in vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 4; ++i) {
      v += a * gnoise(p);
      p = rot * p * 2.0 + vec2(100.0);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 st = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
    
    // Slow temporal drift
    float t = uTime * 0.15;
    
    // Mouse ripple ripple displacement
    vec2 mouseNorm = (uMouse / uResolution) - vec2(0.5);
    float mouseDist = length(st - mouseNorm);
    float mouseRipple = sin(mouseDist * 18.0 - uTime * 3.0) * exp(-mouseDist * 3.5) * 0.15;
    
    st += mouseRipple;

    // Domain Warping using multi-stage fBm
    vec2 q = vec2(
      fbm(st + vec2(0.0, t * 0.5)),
      fbm(st + vec2(5.2, 1.3 - t * 0.3))
    );

    vec2 r = vec2(
      fbm(st + 4.0 * q + vec2(1.7, 9.2) + 0.15 * t),
      fbm(st + 4.0 * q + vec2(8.3, 2.8) + 0.126 * t)
    );

    // Dynamic fluid field density
    float f = fbm(st + 4.0 * r + (uAudioBass * 0.2));

    // Dynamic Palette Interpolation across Movements
    // Movement I & II: Dark Charcoal (#171717) & Coral (#F26B4F)
    vec3 colCharcoal = vec3(0.09, 0.09, 0.09);
    vec3 colCoral = vec3(0.949, 0.42, 0.31);
    
    // Movement IV: Bioluminescent Sage (#B8D9CF) & Warm Ivory (#F7F5EF)
    vec3 colSage = vec3(0.72, 0.85, 0.81);
    vec3 colIvory = vec3(0.968, 0.96, 0.937);

    // Compute release factor based on scroll progress (0.0 to 1.0)
    float releaseFactor = smoothstep(0.65, 0.95, uScrollProgress);

    vec3 backgroundTension = mix(colCharcoal, colCoral * 0.3, clamp(f * f * 2.0, 0.0, 1.0));
    vec3 backgroundRelief = mix(vec3(0.07, 0.11, 0.10), colSage * 0.4, clamp(f * f * 2.0, 0.0, 1.0));

    vec3 finalColor = mix(backgroundTension, backgroundRelief, releaseFactor);

    // Highlight swirls with soft bioluminescence
    finalColor += mix(colCoral, colSage, releaseFactor) * (pow(f, 3.0) * 0.35);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;
