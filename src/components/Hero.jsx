import React, { useEffect, useState } from 'react';
import { ChevronDown, ArrowDownRight, ShieldAlert, Clock } from 'lucide-react';
import heroImg from '../assets/student_hero.jpg';

export default function Hero({ onBreathingClick }) {
  const [mounted, setMounted] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 12;
    const y = (clientY / window.innerHeight - 0.5) * 12;
    setMousePos({ x, y });
  };

  const handleScrollToPressure = () => {
    document.getElementById('pressure-meter')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="hero" 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full bg-[#F7F7F5] text-[#171717] flex flex-col justify-between overflow-hidden px-6 sm:px-10 md:px-16 lg:px-24 pt-20 pb-12 selection:bg-[#E96B50]/20"
    >
      <style>{`
        @keyframes fineGlitchVibe {
          0%, 100% { transform: translateY(0); filter: drop-shadow(0 0 0 rgba(233,107,80,0)); }
          15% { transform: translateY(-1px) translateX(1px); }
          45% { transform: translateY(1px) translateX(-1px); filter: drop-shadow(0 0 4px rgba(233,107,80,0.3)); }
          75% { transform: translateY(0); }
        }
        .animate-fine-vibe {
          animation: fineGlitchVibe 6s ease-in-out infinite;
        }
        .tape-strip-mini {
          background: rgba(226, 224, 220, 0.8);
          box-shadow: 0 1px 2px rgba(0,0,0,0.06);
        }
      `}</style>

      {/* Tension Thread Vector Matrix - Delicate Light Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="archGrid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#E2E0DC" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#archGrid)" />

          {/* Minimalist Studio Tension Threads */}
          <line x1="0" y1="35%" x2="100%" y2="38%" stroke="#E96B50" strokeWidth="0.75" strokeDasharray="6 8" opacity="0.4" />
          <line x1="15%" y1="0" x2="85%" y2="100%" stroke="#E2E0DC" strokeWidth="0.5" />
          <circle cx="68%" cy="42%" r="220" fill="none" stroke="#B8D9CF" strokeWidth="0.6" strokeDasharray="3 6" opacity="0.6" />
        </svg>
      </div>

      {/* Top Movement Header & Editorial Metatags */}
      <header className={`relative z-20 flex flex-wrap items-center justify-between border-b border-[#E2E0DC] pb-4 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#E96B50]"></span>
          <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#E96B50] font-bold">
            MOVEMENT I
          </span>
          <span className="text-xs text-[#686868] font-mono">//</span>
          <h2 className="text-xs uppercase tracking-[0.2em] font-mono text-[#686868]">
            THE MASK (SURFACE HARMONY)
          </h2>
        </div>
        <div className="hidden sm:flex items-center gap-6 text-xs text-[#686868] font-mono">
          <span>EXHIBIT 01: UNRECORDED REALITY</span>
          <span>•</span>
          <span className="text-[#171717] font-semibold">CONCEALED COGNITIVE LOAD</span>
        </div>
      </header>

      {/* Main Hero Spatial Canvas */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center my-auto py-8">
        
        {/* Left Column: Bold Asymmetric Headline & Editorial Typography */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          
          <div className={`transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-mono text-[#E96B50] border border-[#E96B50]/30 bg-[#E96B50]/8 rounded-xs font-semibold">
              <ShieldAlert size={13} />
              <span>THE INVISIBLE WEIGHT YOU CANNOT SEE</span>
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.2rem] xl:text-[5.8rem] font-black tracking-tight leading-[0.92] text-[#171717] mb-6">
            <span className={`block transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              YOU SAID
            </span>
            <span className={`block transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              YOU WERE <span className="font-editorial italic font-normal text-[#E96B50] animate-fine-vibe relative inline-block">
                FINE.
                {/* Tension underline vector */}
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#E96B50]/70" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0,8 Q50,0 100,8" fill="none" stroke="currentColor" strokeWidth="2.5" />
                </svg>
              </span>
            </span>
          </h1>

          {/* Handwritten Whispered Layer */}
          <div className={`mb-6 transition-all duration-700 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <p className="font-handwriting text-2xl sm:text-3xl text-[#686868] -rotate-1 tracking-wide">
              (and everyone believed the performance, so you kept carrying it alone)
            </p>
          </div>

          {/* Supporting Copy */}
          <div className={`transition-all duration-700 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <p className="text-base sm:text-lg md:text-xl text-[#686868] max-w-xl leading-relaxed mb-8 font-light">
              Deadlines. Expectations. Comparison. The quiet battles nobody sees behind smiling hallway greetings and polished online resumes.
            </p>
          </div>

          {/* Action Navigation CTAs */}
          <div className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-4 transition-all duration-700 delay-600 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <button 
              onClick={handleScrollToPressure}
              className="group px-7 py-4 bg-[#171717] text-[#FFFFFF] font-semibold text-xs font-mono tracking-[0.18em] uppercase rounded-xs hover:bg-[#E96B50] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer shadow-md"
            >
              <span>Explore The Pressure</span>
              <ArrowDownRight size={17} className="group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
            </button>

            <button 
              onClick={onBreathingClick}
              className="px-7 py-4 border border-[#E2E0DC] text-[#171717] font-medium text-xs font-mono tracking-[0.18em] uppercase rounded-xs hover:border-[#171717] hover:bg-[#FFFFFF] transition-all duration-300 text-center cursor-pointer shadow-xs"
            >
              Take A Breath
            </button>
          </div>

        </div>

        {/* Right Column: Layered Student Dossier Collage */}
        <div className={`lg:col-span-5 relative mt-8 lg:mt-0 flex justify-center transition-all duration-1000 delay-400 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          
          <div 
            className="relative w-full max-w-md lg:max-w-none transition-transform duration-300 ease-out"
            style={{
              transform: `translate(${mousePos.x}px, ${mousePos.y}px)`
            }}
          >
            {/* Archival Frame Wrapper in Crisp White Paper */}
            <div className="relative rounded-xs border border-[#E2E0DC] bg-[#FFFFFF] shadow-xl p-2.5 sm:p-3">
              
              {/* Corner Registration Ticks */}
              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#171717]"></div>
              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#171717]"></div>
              <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#171717]"></div>
              <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#171717]"></div>

              {/* Header Ticker */}
              <div className="flex items-center justify-between px-2 py-1.5 mb-2 border-b border-[#E2E0DC] text-[10px] font-mono text-[#686868]">
                <span>CASEFILE // DESK #4 • 02:47 AM</span>
                <span className="flex items-center gap-1 text-[#E96B50] font-bold"><Clock size={11} /> CRITICAL MASS</span>
              </div>

              {/* The Cinematic Student Photograph */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F0EFEB] rounded-xs">
                <img 
                  src={heroImg} 
                  alt="University student late at night overwhelmed by study and deadlines" 
                  onLoad={() => setImgLoaded(true)}
                  className={`w-full h-full object-cover object-center filter contrast-[1.04] brightness-[0.98] transition-opacity duration-700 ${imgLoaded ? 'opacity-100' : 'opacity-80'}`}
                  onError={(e) => {
                    e.currentTarget.src = '/student_hero.jpg';
                  }}
                />
                
                {/* Tension crosshair overlay */}
                <div className="absolute top-3 right-3 pointer-events-none opacity-80 font-mono text-[9px] text-[#171717] bg-[#FFFFFF]/85 px-1.5 py-0.5 rounded-xs border border-[#E2E0DC]">
                  ⊕ TENSION_VECTOR: 88.4%
                </div>
              </div>

              {/* Dossier Footer Data */}
              <div className="px-2 py-2 mt-2 flex justify-between items-center text-xs font-mono">
                <span className="text-[#686868] text-[11px]">SUBJECT: ADVANCED MECHANICS & CODE</span>
                <span className="text-[#E96B50] text-[11px] font-bold">STATE: SILENT BURNOUT</span>
              </div>
            </div>

            {/* Tactile Fragment 1: The 11:59 PM Sticky Note */}
            <div 
              className="absolute -top-5 -right-2 sm:-right-4 bg-[#FAF7EC] text-[#171717] p-3 shadow-lg rounded-xs border border-[#E8E2D0] w-44 sm:w-52 transform rotate-2 animate-paper-drift pointer-events-none z-20"
              style={{ '--rot': '2deg' }}
            >
              <div className="w-10 h-2.5 tape-strip-mini absolute -top-1 left-1/2 -translate-x-1/2"></div>
              <div className="flex justify-between items-center text-[9px] font-mono text-[#c23d2e] mb-1 font-bold">
                <span>DUE 11:59 PM</span>
                <span>PENDING</span>
              </div>
              <p className="font-handwriting text-base sm:text-lg leading-tight font-bold text-[#171717]">
                "Still need 2 more modules. Is everyone else already asleep?"
              </p>
            </div>

            {/* Tactile Fragment 2: The Comparison Note */}
            <div 
              className="absolute -bottom-6 -left-2 sm:-left-5 bg-[#FFFFFF] text-[#171717] p-3.5 shadow-lg rounded-xs border border-[#E2E0DC] max-w-[230px] sm:max-w-[260px] transform -rotate-1 animate-paper-drift z-20"
              style={{ '--rot': '-1deg', animationDelay: '1.5s' }}
            >
              <div className="w-10 h-2.5 tape-strip-mini absolute -top-1 left-4"></div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E96B50]"></span>
                <span className="text-[9px] font-mono tracking-widest text-[#E96B50] uppercase font-bold">Comparison Echo</span>
              </div>
              <p className="font-handwriting text-base sm:text-lg text-[#171717] leading-snug">
                "Another offer post on LinkedIn. I feel like I'm falling behind every hour."
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Movement Transition Anchor Bar */}
      <footer className={`relative z-10 flex items-center justify-between pt-4 border-t border-[#E2E0DC] text-xs text-[#686868] transition-all duration-700 delay-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        <span className="font-mono hidden sm:inline">PROCEED INTO MOVEMENT II: THE ACCUMULATION OF WEIGHT</span>
        <button 
          onClick={handleScrollToPressure}
          className="flex items-center gap-2 mx-auto sm:mx-0 text-[#171717] hover:text-[#E96B50] transition-colors font-medium group cursor-pointer"
        >
          <span className="font-mono text-xs tracking-wider">SCROLL TO EXAMINE TENSION</span>
          <ChevronDown size={16} className="animate-bounce text-[#E96B50]" />
        </button>
        <span className="font-mono hidden sm:inline">AN ART-DIRECTED DIGITAL EXPERIENCE</span>
      </footer>

    </section>
  );
}
