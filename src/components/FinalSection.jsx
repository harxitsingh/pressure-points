import React, { useState, useRef } from 'react';
import { Sparkles, RefreshCw, ArrowUp, Heart } from 'lucide-react';

const affirmations = [
  'I am allowed to learn at my own pace.',
  'Rest is not a failure.',
  'I can ask for help.',
  'My next step matters more than someone else\'s timeline.',
  'I don\'t have to have it all figured out right now.',
  'I am doing better than I think.'
];

export default function FinalSection({ onOpenPrescription }) {
  const [currentAffirmation, setCurrentAffirmation] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const prevIndex = useRef(-1);

  const handleRemindMe = () => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * affirmations.length);
    } while (nextIndex === prevIndex.current && affirmations.length > 1);
    
    prevIndex.current = nextIndex;
    setIsAnimating(false);
    
    setTimeout(() => {
      setCurrentAffirmation(affirmations[nextIndex]);
      setIsAnimating(true);
    }, 60);
  };

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="final-section" 
      className="min-h-screen bg-gradient-to-b from-[#F7F7F5] via-[#FAF9F6] to-[#F0EFEB] flex flex-col items-center justify-center px-6 sm:px-10 md:px-16 lg:px-24 py-24 md:py-32 text-center relative overflow-hidden border-t border-[#E2E0DC] text-[#171717]"
    >
      {/* Background Soft Glow & Untangled Halo Motif */}
      <div className="absolute inset-0 pointer-events-none opacity-40 flex items-center justify-center">
        <svg viewBox="0 0 600 600" className="w-[600px] h-[600px] animate-rotate-slow" style={{ animationDuration: '65s' }}>
          <circle cx="300" cy="300" r="190" fill="none" stroke="#B8D9CF" strokeWidth="1.2" strokeDasharray="4 8" />
          <circle cx="300" cy="300" r="270" fill="none" stroke="#E96B50" strokeWidth="1" strokeDasharray="6 6" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center z-10">
        
        {/* Movement Marker */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#E96B50]"></span>
          <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#E96B50] font-bold">
            MOVEMENT IV
          </span>
          <span className="text-xs text-[#B5B3AD] font-mono">//</span>
          <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#686868]">
            THE RESOLUTION
          </span>
        </div>
        
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-[#171717] mb-6 leading-[1.02] tracking-tight">
          YOU ARE MORE THAN YOUR <span className="font-editorial italic font-normal text-[#171717] underline decoration-[#B8D9CF] decoration-wavy decoration-2">NEXT RESULT.</span>
        </h2>
        
        <p className="text-[#686868] text-lg sm:text-xl md:text-2xl max-w-2xl mb-8 leading-relaxed font-light">
          Your worth is not a rank, a package, a percentage, or someone else's timeline.
        </p>
        
        <p className="font-handwriting text-3xl sm:text-4xl text-[#E96B50] mb-12">
          Come for the pressure. Leave with the power.
        </p>

        {!currentAffirmation ? (
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button 
              onClick={handleRemindMe}
              className="group px-8 py-4 bg-[#171717] text-[#FFFFFF] text-xs font-mono font-bold tracking-[0.2em] uppercase rounded-xs hover:bg-[#E96B50] transition-all duration-300 shadow-xl cursor-pointer flex items-center gap-3"
            >
              <Sparkles size={16} />
              <span>Remind Me Of This</span>
            </button>
            {onOpenPrescription && (
              <button 
                onClick={onOpenPrescription}
                className="px-7 py-4 border border-[#171717] text-[#171717] hover:bg-[#171717] hover:text-[#FFFFFF] text-xs font-mono font-bold tracking-[0.2em] uppercase rounded-xs transition-all duration-300 cursor-pointer flex items-center gap-2 bg-[#FFFFFF]"
              >
                <span>Export Care Prescription</span>
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center w-full max-w-2xl animate-fade-in">
            <div 
              className={`p-8 sm:p-10 bg-[#FFFFFF] border border-[#E2E0DC] rounded-xs shadow-xl transition-all duration-700 ease-out w-full ${
                isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              <div className="flex items-center justify-between border-b border-[#E2E0DC] pb-3 mb-4">
                <span className="text-[10px] font-mono tracking-widest text-[#E96B50] uppercase flex items-center gap-1.5 font-bold">
                  <Heart size={12} className="text-[#E96B50] fill-[#E96B50]" />
                  GROUNDING AFFIRMATION FOR THE JOURNEY
                </span>
                <span className="text-[10px] font-mono text-[#888888]">TAKE THIS WITH YOU</span>
              </div>

              <blockquote className="font-editorial italic text-2xl sm:text-4xl text-[#171717] leading-snug my-4">
                "{currentAffirmation}"
              </blockquote>

              <p className="text-xs font-mono text-[#686868] mt-4 pt-3 border-t border-[#E2E0DC]">
                Save this thought in your pocket the next time pressure asks you to perform.
              </p>
            </div>
            
            <button 
              onClick={handleRemindMe}
              className="mt-6 text-[#686868] hover:text-[#171717] text-xs font-mono tracking-widest uppercase transition-colors cursor-pointer flex items-center gap-2"
            >
              <RefreshCw size={13} />
              <span>Draw Another Reminder</span>
            </button>
          </div>
        )}

        {/* Back to top anchor */}
        <div className="mt-16 pt-8 border-t border-[#E2E0DC] w-full max-w-md flex justify-center">
          <button
            onClick={scrollToTop}
            className="text-xs font-mono text-[#888888] hover:text-[#171717] transition-colors flex items-center gap-2 cursor-pointer"
          >
            <ArrowUp size={14} />
            <span>RETURN TO THE BEGINNING</span>
          </button>
        </div>

      </div>
    </section>
  );
}
