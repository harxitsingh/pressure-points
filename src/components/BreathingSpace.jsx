import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Sparkles, ArrowDown } from 'lucide-react';
import reliefImg from '../assets/student_relief.jpg';

export default function BreathingSpace() {
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState('paused'); // 'paused', 'inhale', 'hold', 'exhale'
  const [cycleCount, setCycleCount] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  
  const timerRef = useRef(null);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const listener = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    if (isRunning) {
      if (phase === 'paused') {
        setPhase('inhale');
      }
      
      // 4-second Inhale -> 4-second Exhale organic pacing
      timerRef.current = setInterval(() => {
        setPhase((prevPhase) => {
          if (prevPhase === 'inhale') {
            return 'exhale';
          } else {
            setCycleCount((c) => c + 1);
            return 'inhale';
          }
        });
      }, 4000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setPhase('paused');
    setCycleCount(0);
    clearInterval(timerRef.current);
  };

  const getScale = () => {
    if (prefersReducedMotion) return 1;
    if (phase === 'inhale') return 1.28;
    if (phase === 'exhale') return 0.72;
    return 0.72;
  };

  const getPhaseText = () => {
    if (!isRunning && phase === 'paused') return 'READY TO PAUSE?';
    if (phase === 'inhale') return 'IN-HALE GENTLY...';
    if (phase === 'exhale') return 'RELEASE & LET GO...';
    return '';
  };

  const handleContinue = () => {
    document.getElementById('final-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="breathing-space" 
      className="bg-[#FAF9F5] py-24 md:py-32 px-6 sm:px-10 md:px-16 lg:px-24 min-h-[85vh] flex flex-col justify-center items-center text-center relative overflow-hidden border-t border-[#E2E0DC]"
    >
      {/* Background Soft Sage Diffusion Aura */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#B8D9CF]/35 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-5xl mx-auto w-full relative z-10 flex flex-col items-center">
        
        {/* Movement Marker */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#7BAE9F]"></span>
          <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#7BAE9F] font-bold">
            MOVEMENT IV
          </span>
          <span className="text-xs text-[#686868] font-mono">//</span>
          <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#686868]">
            THE RELEASE (PART II)
          </span>
        </div>

        {/* Section Headline */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-light text-[#171717] mb-4 tracking-tight">
          PAUSE. <span className="font-editorial italic font-normal text-[#171717]">YOU'RE ALLOWED TO.</span>
        </h2>

        <p className="text-[#686868] text-base sm:text-lg max-w-xl mb-12 font-light leading-relaxed">
          An optional moment of visual and physiological release. Follow the expanding halo for 3 calm breaths.
        </p>

        {/* Visual Composition: Serene Morning Photograph & Expanding Breath Halo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center w-full max-w-5xl mb-12">
          
          {/* Left Column: Serene Fine-Art Photograph */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative rounded-xs overflow-hidden border border-[#E2E0DC] bg-[#FFFFFF] shadow-lg max-w-md w-full p-2.5 sm:p-3">
              {/* Corner Registration Ticks */}
              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#171717]"></div>
              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#171717]"></div>
              <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#171717]"></div>
              <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#171717]"></div>

              <div className="aspect-[4/3] w-full overflow-hidden relative rounded-xs bg-[#FAF9F6]">
                <img 
                  src={reliefImg} 
                  alt="Student taking a quiet breath by morning dawn window" 
                  onLoad={() => setImgLoaded(true)}
                  className={`w-full h-full object-cover object-center filter contrast-[1.02] brightness-100 transition-opacity duration-700 ${imgLoaded ? 'opacity-100' : 'opacity-85'}`}
                  onError={(e) => {
                    e.currentTarget.src = '/student_relief.jpg';
                  }}
                />
                <div className="absolute top-3 left-3 pointer-events-none opacity-85 font-mono text-[9px] text-[#171717] bg-[#FFFFFF]/85 px-1.5 py-0.5 rounded-xs border border-[#E2E0DC]">
                  ⊕ STATE: EXPIRATION // AUTONOMIC RESET
                </div>
              </div>
              <div className="p-2.5 mt-1.5 bg-[#FAF9F6] border-t border-[#E2E0DC] flex justify-between items-center text-xs font-mono text-[#686868]">
                <span className="text-[#3D6B5F] flex items-center gap-1.5 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7BAE9F] animate-pulse"></span>
                  EXHIBIT 02: THE BREATH OF DAWN
                </span>
                <span>07:12 AM</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Breathing Halo Field */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            
            <div className="relative flex items-center justify-center w-64 h-64 sm:w-76 sm:h-76 my-4">
              
              {/* Outer Subtle Ambient Ring 1 */}
              <div 
                className="absolute inset-0 rounded-full border border-[#B8D9CF] pointer-events-none"
                style={{
                  transform: `scale(${getScale() * 1.22})`,
                  transition: prefersReducedMotion ? 'none' : 'transform 4s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />

              {/* Mid Concentric Ring 2 */}
              <div 
                className="absolute inset-4 rounded-full border border-[#7BAE9F]/60 pointer-events-none"
                style={{
                  transform: `scale(${getScale() * 1.1})`,
                  transition: prefersReducedMotion ? 'none' : 'transform 4s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />

              {/* Main Glowing Halo Circle 3 */}
              <div 
                className="absolute inset-8 rounded-full border-2 border-[#171717] shadow-[0_0_35px_rgba(184,217,207,0.45)] bg-[#B8D9CF]/25 pointer-events-none"
                style={{
                  transform: `scale(${getScale()})`,
                  transition: prefersReducedMotion ? 'none' : 'transform 4s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
              
              {/* Inner Breath Core Indicator */}
              <div className="z-10 flex flex-col items-center justify-center px-4 select-none">
                <span className="text-[#171717] font-mono text-sm sm:text-base font-bold tracking-widest uppercase transition-opacity duration-500">
                  {getPhaseText()}
                </span>
                <span className="text-xs font-mono text-[#3D6B5F] mt-1.5 font-bold">
                  {isRunning ? (phase === 'inhale' ? '4 SECONDS IN' : '4 SECONDS OUT') : 'CLICK START TO BEGIN'}
                </span>
              </div>
            </div>

            {/* Breathing Interaction Controls */}
            <div className="flex flex-col items-center gap-4 mt-4 w-full">
              <div className="flex items-center gap-3.5">
                <button
                  onClick={toggleTimer}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xs bg-[#171717] text-[#FFFFFF] font-semibold text-xs font-mono tracking-wider uppercase hover:bg-[#E96B50] transition-all cursor-pointer shadow-md"
                  aria-label={isRunning ? 'Pause breathing exercise' : 'Start breathing exercise'}
                >
                  {isRunning ? (
                    <>
                      <Pause size={15} />
                      <span>PAUSE CYCLE</span>
                    </>
                  ) : (
                    <>
                      <Play size={15} />
                      <span>START BREATHING</span>
                    </>
                  )}
                </button>
                
                <button
                  onClick={resetTimer}
                  className="flex items-center gap-2 px-5 py-3.5 rounded-xs border border-[#E2E0DC] text-[#171717] hover:border-[#171717] hover:bg-[#FFFFFF] text-xs font-mono tracking-wider uppercase transition-all cursor-pointer shadow-2xs"
                  aria-label="Reset breathing exercise"
                >
                  <RotateCcw size={14} />
                  <span>RESET</span>
                </button>
              </div>
              
              <div className="text-[#686868] text-xs font-mono mt-1 font-medium">
                COMPLETED BREATHS: <span className="text-[#171717] font-bold font-mono">{cycleCount}</span>
              </div>
            </div>

          </div>

        </div>

        {/* Narrative Encouragement & Clear Exit Option */}
        <div className="space-y-4 max-w-xl">
          <p className="text-[#686868] text-base sm:text-lg font-light leading-relaxed">
            You don't have to figure everything out in this moment.
          </p>
          
          {cycleCount >= 3 && (
            <p className="text-[#3D6B5F] text-xl font-medium animate-fade-in flex items-center justify-center gap-2 font-handwriting">
              <Sparkles size={18} />
              <span>One small step is still progress. You made space for yourself today.</span>
            </p>
          )}

          <div className="pt-4">
            <button
              onClick={handleContinue}
              className="text-[#686868] hover:text-[#171717] text-xs font-mono tracking-widest uppercase transition-colors cursor-pointer inline-flex items-center gap-2 font-medium"
            >
              <span>CONTINUE TO FINAL RESOLUTION</span>
              <ArrowDown size={14} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
