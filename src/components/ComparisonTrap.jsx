import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SlidersHorizontal, Eye, EyeOff } from 'lucide-react';

export default function ComparisonTrap() {
  const [position, setPosition] = useState(60);
  const [isDragging, setIsDragging] = useState(false);
  const [mobileView, setMobileView] = useState('see');
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const newPosition = Math.max(10, Math.min(90, (x / rect.width) * 100));
    setPosition(newPosition);
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e) => handleMove(e.clientX);
    const onTouchMove = (e) => handleMove(e.touches[0].clientX);
    const onEnd = () => setIsDragging(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onEnd);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, [isDragging, handleMove]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      setPosition(p => Math.max(10, p - 5));
    } else if (e.key === 'ArrowRight') {
      setPosition(p => Math.min(90, p + 5));
    }
  };

  return (
    <section 
      id="comparison-trap" 
      className="py-24 md:py-32 px-6 sm:px-10 md:px-16 lg:px-24 bg-[#F7F7F5] overflow-hidden border-t border-[#E2E0DC] relative"
    >
      {/* Background Architectural Vector Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="30%" x2="100%" y2="30%" stroke="#E2E0DC" strokeWidth="0.6" strokeDasharray="6 6" />
          <line x1="0" y1="70%" x2="100%" y2="70%" stroke="#E2E0DC" strokeWidth="0.6" strokeDasharray="6 6" />
          <circle cx="50%" cy="50%" r="380" fill="none" stroke="#B8D9CF" strokeWidth="0.6" strokeDasharray="4 8" opacity="0.5" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col items-center relative z-10">
        
        {/* Movement Header */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#7BAE9F]"></span>
          <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#7BAE9F] font-bold">
            MOVEMENT III
          </span>
          <span className="text-xs text-[#686868] font-mono">//</span>
          <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#686868]">
            THE RECOGNITION (PART II)
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-light text-center mb-5 max-w-4xl leading-tight text-[#171717]">
          YOU'RE COMPARING YOUR CHAPTER 2 TO <span className="font-editorial italic font-normal text-[#E96B50]">SOMEONE ELSE'S CHAPTER 20.</span>
        </h2>

        <p className="text-[#686868] text-base sm:text-lg text-center max-w-2xl mb-10 font-light leading-relaxed">
          We judge our private doubts against everyone else's public highlights. Drag the interactive comparison lens to unmask the unrecorded human experience.
        </p>

        {/* Quick Position Presets */}
        <div className="flex items-center gap-2 mb-8 bg-[#FFFFFF] border border-[#E2E0DC] p-1.5 rounded-full text-xs font-mono shadow-xs">
          <span className="px-3 text-[#686868] hidden sm:inline">PERSPECTIVE:</span>
          <button
            onClick={() => setPosition(25)}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              position < 35 ? 'bg-[#171717] text-[#FFFFFF] font-bold shadow-xs' : 'text-[#686868] hover:text-[#171717]'
            }`}
          >
            Behind The Scenes
          </button>
          <button
            onClick={() => setPosition(50)}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              position >= 35 && position <= 65 ? 'bg-[#171717] text-[#FFFFFF] font-bold shadow-xs' : 'text-[#686868] hover:text-[#171717]'
            }`}
          >
            Balanced 50/50
          </button>
          <button
            onClick={() => setPosition(75)}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              position > 65 ? 'bg-[#E96B50] text-[#FFFFFF] font-bold shadow-xs' : 'text-[#686868] hover:text-[#171717]'
            }`}
          >
            Curated Feed
          </button>
        </div>

        {/* Mobile View: Toggleable Perspectives & Clean Stacking */}
        <div className="md:hidden w-full flex flex-col items-center">
          <div className="flex gap-2 mb-6 w-full max-w-sm bg-[#FFFFFF] p-1.5 rounded-xs border border-[#E2E0DC] shadow-xs">
            <button
              onClick={() => setMobileView('see')}
              className={`flex-1 py-3 text-xs font-mono font-semibold rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                mobileView === 'see' ? 'bg-[#171717] text-[#FFFFFF]' : 'text-[#686868]'
              }`}
            >
              <Eye size={14} className={mobileView === 'see' ? 'text-[#E96B50]' : ''} />
              <span>WHAT YOU SEE</span>
            </button>
            <button
              onClick={() => setMobileView('dont-see')}
              className={`flex-1 py-3 text-xs font-mono font-semibold rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                mobileView === 'dont-see' ? 'bg-[#171717] text-[#FFFFFF]' : 'text-[#686868]'
              }`}
            >
              <EyeOff size={14} className={mobileView === 'dont-see' ? 'text-[#7BAE9F]' : ''} />
              <span>WHAT YOU DON'T SEE</span>
            </button>
          </div>
          
          <div className="w-full relative min-h-[380px] rounded-xs overflow-hidden border border-[#E2E0DC] shadow-md">
            {mobileView === 'see' ? (
              <div className="h-full bg-[#FFFFFF] p-6 sm:p-8 flex flex-col justify-between text-[#171717]">
                <div>
                  <div className="flex items-center justify-between border-b border-[#E2E0DC] pb-3 mb-5">
                    <span className="text-[#E96B50] font-mono text-xs font-bold tracking-widest flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#E96B50]"></span>
                      THE CURATED HIGHLIGHT REEL
                    </span>
                    <span className="text-[#686868] text-[10px] font-mono">PUBLIC FEED</span>
                  </div>
                  <div className="space-y-4 text-base sm:text-lg font-light text-[#171717]">
                    <p className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-[#E96B50] rounded-full shrink-0 mt-2"></span>
                      <span>Tier-1 internship announcement post</span>
                    </p>
                    <p className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-[#E96B50] rounded-full shrink-0 mt-2"></span>
                      <span>Flawless semester GPA certificate</span>
                    </p>
                    <p className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-[#E96B50] rounded-full shrink-0 mt-2"></span>
                      <span>Aesthetic 6 AM study routine vlog</span>
                    </p>
                    <p className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-[#E96B50] rounded-full shrink-0 mt-2"></span>
                      <span>Poised, articulate seminar answers</span>
                    </p>
                  </div>
                </div>
                <div className="text-[11px] font-mono text-[#686868] pt-4 border-t border-[#E2E0DC] mt-6">
                  What algorithms are deliberately optimized to broadcast.
                </div>
              </div>
            ) : (
              <div className="h-full bg-[#F2F7F5] p-6 sm:p-8 flex flex-col justify-between text-[#171717]">
                <div>
                  <div className="flex items-center justify-between border-b border-[#D8E6E1] pb-3 mb-5">
                    <span className="text-[#3D6B5F] font-mono text-xs font-bold tracking-widest flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#7BAE9F]"></span>
                      THE COMPLETE HUMAN CONTEXT
                    </span>
                    <span className="text-[#3D6B5F] text-[10px] font-mono font-semibold">UNRECORDED</span>
                  </div>
                  <div className="space-y-4 text-base sm:text-lg font-light text-[#24332F]">
                    <p className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-[#7BAE9F] rounded-full shrink-0 mt-2"></span>
                      <span>52 silent rejection emails before the single offer</span>
                    </p>
                    <p className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-[#7BAE9F] rounded-full shrink-0 mt-2"></span>
                      <span>Terrifying self-doubt and impostor fatigue</span>
                    </p>
                    <p className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-[#7BAE9F] rounded-full shrink-0 mt-2"></span>
                      <span>Critical support received from mentors & friends</span>
                    </p>
                    <p className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-[#7BAE9F] rounded-full shrink-0 mt-2"></span>
                      <span>Still wondering what they truly want out of life</span>
                    </p>
                  </div>
                </div>
                <div className="text-[11px] font-mono text-[#3D6B5F] pt-4 border-t border-[#D8E6E1] mt-6">
                  Success does not mean absence of struggle.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Desktop View: Interactive Split Dual-Column Workbench (NO CLIPPING, LIGHT THEME) */}
        <div 
          ref={containerRef}
          className="hidden md:flex relative w-full max-w-5xl h-[520px] select-none rounded-xs overflow-hidden border border-[#E2E0DC] shadow-lg bg-[#FAF9F6]"
        >
          {/* Left Panel: Public Highlight Reel */}
          <div 
            className="h-full bg-[#FFFFFF] p-8 lg:p-12 flex flex-col justify-between border-r border-[#E2E0DC] transition-[width] duration-75 relative z-0"
            style={{ width: `${position}%`, minWidth: '280px' }}
          >
            <div>
              <div className="flex items-center justify-between border-b border-[#E2E0DC] pb-3 mb-6">
                <span className="text-[#E96B50] font-mono text-xs font-bold tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E96B50]"></span>
                  WHAT YOU SEE // THE SOCIAL BROADCAST
                </span>
                <span className="text-[#686868] text-[10px] font-mono font-medium">FEED STATS</span>
              </div>
              
              <div className="space-y-4 text-lg lg:text-xl font-light text-[#171717]">
                <div className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E96B50] mt-2.5 shrink-0" />
                  <p>"Thrilled to announce my upcoming summer internship!"</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E96B50] mt-2.5 shrink-0" />
                  <p>Dean's honor list certificate photograph</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E96B50] mt-2.5 shrink-0" />
                  <p>Aesthetic 6 AM coffee study routine vlogs</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E96B50] mt-2.5 shrink-0" />
                  <p>Poised, articulate seminar contributions</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E2E0DC] text-xs font-mono text-[#686868] flex justify-between items-center">
              <span>The curated 1% that feeds comparison algorithms</span>
              <span className="text-[#E96B50] font-bold">{Math.round(position)}% WEIGHT</span>
            </div>
          </div>

          {/* Draggable Divider Handle with Fine Gradient & Easy Grab */}
          <div 
            className="absolute top-0 bottom-0 w-8 z-30 flex items-center justify-center cursor-ew-resize group"
            style={{ left: `calc(${position}% - 16px)` }}
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
          >
            {/* Fine Vertical Line */}
            <div className="w-[2px] h-full bg-gradient-to-b from-[#E96B50] via-[#171717] to-[#7BAE9F]" />
            
            {/* Draggable Button Handle */}
            <div 
              className="absolute w-8 h-14 bg-[#171717] border border-[#171717] text-[#FFFFFF] rounded-xs flex flex-col items-center justify-center shadow-md group-hover:scale-110 group-active:scale-95 transition-transform"
              tabIndex={0}
              onKeyDown={handleKeyDown}
              role="slider"
              aria-valuenow={Math.round(position)}
              aria-valuemin={15}
              aria-valuemax={85}
              aria-label="Comparison reality lens divider"
            >
              <SlidersHorizontal size={14} className="text-[#E96B50]" />
            </div>
          </div>

          {/* Right Panel: The Complete Human Context */}
          <div 
            className="h-full bg-[#F2F7F5] p-8 lg:p-12 flex flex-col justify-between transition-[width] duration-75 relative z-0 flex-1"
            style={{ minWidth: '280px' }}
          >
            <div>
              <div className="flex items-center justify-between border-b border-[#D8E6E1] pb-3 mb-6">
                <span className="text-[#3D6B5F] font-mono text-xs font-bold tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#7BAE9F]"></span>
                  WHAT YOU DON'T SEE // THE COMPLETE CONTEXT
                </span>
                <span className="text-[#3D6B5F] text-[10px] font-mono font-bold">UNRECORDED</span>
              </div>
              
              <div className="space-y-4 text-lg lg:text-xl font-light text-[#24332F]">
                <div className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7BAE9F] mt-2.5 shrink-0" />
                  <p>52 silent rejection emails before the single offer</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7BAE9F] mt-2.5 shrink-0" />
                  <p>Crippling late-night self-doubt and impostor terror</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7BAE9F] mt-2.5 shrink-0" />
                  <p>Behind-the-scenes guidance from mentors and friends</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7BAE9F] mt-2.5 shrink-0" />
                  <p>Still wondering what direction is actually authentic</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#D8E6E1] text-xs font-mono text-[#3D6B5F] flex justify-between items-center font-medium">
              <span>Success is rarely solitary, and never effortless</span>
              <span className="font-bold">{Math.round(100 - position)}% WEIGHT</span>
            </div>
          </div>
        </div>

        {/* Thoughtful Philosophical Closing Subnote */}
        <div className="mt-12 max-w-2xl text-center">
          <p className="font-handwriting text-2xl sm:text-3xl text-[#686868] leading-relaxed">
            "You are comparing your chaotic, unedited rehearsal to someone else's opening night."
          </p>
        </div>

      </div>
    </section>
  );
}
