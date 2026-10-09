import React, { useState } from 'react';
import { Volume2, VolumeX, Download } from 'lucide-react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useExperienceStore } from './store/useExperienceStore';
import { soundscape } from './audio/SoundscapeEngine';

import SceneCanvas from './webgl/SceneCanvas';
import MagneticExhaustionCursor from './components/MagneticExhaustionCursor';
import StudentPrescriptionModal from './components/StudentPrescriptionModal';

import Hero from './components/Hero';
import PressureMeter from './components/PressureMeter';
import UnsaidWall from './components/UnsaidWall';
import ComparisonTrap from './components/ComparisonTrap';
import BreathingSpace from './components/BreathingSpace';
import SupportSteps from './components/SupportSteps';
import FinalSection from './components/FinalSection';
import Footer from './components/Footer';

function App() {
  // Initialize Lenis Smooth Scrolling and GSAP Movement Synchronization
  useSmoothScroll();

  const currentMovement = useExperienceStore((state) => state.currentMovement);
  const audioEnabled = useExperienceStore((state) => state.audioEnabled);
  const tensionScore = useExperienceStore((state) => state.tensionScore);

  const [prescriptionOpen, setPrescriptionOpen] = useState(false);

  const scrollToMovement = (id) => {
    if (window.__lenis) {
      window.__lenis.scrollTo('#' + id, { duration: 1.2 });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBreathingClick = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo('#breathing-space', { duration: 1.2 });
    } else {
      document.getElementById('breathing-space')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleAudio = () => {
    soundscape.toggle();
    soundscape.updateMood(currentMovement, tensionScore);
  };

  return (
    <div className="bg-[#F7F7F5] min-h-screen text-[#171717] relative selection:bg-[#E96B50]/20">
      
      {/* Physics-Based Magnetic Cursor */}
      <MagneticExhaustionCursor />

      {/* Background React Three Fiber 3D WebGL Canvas */}
      <SceneCanvas />

      {/* Exhibition Top Bar / Navigation Rail */}
      <nav 
        className="fixed top-0 left-0 right-0 z-50 bg-[#F7F7F5]/90 backdrop-blur-md border-b border-[#E2E0DC] px-6 sm:px-10 py-3.5 flex items-center justify-between text-xs font-mono transition-all duration-300"
        aria-label="Exhibition movements navigation"
      >
        {/* Exhibition Logo */}
        <div 
          onClick={() => scrollToMovement('hero')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <span className="w-2 h-2 rounded-full bg-[#E96B50]"></span>
          <span className="font-bold tracking-[0.2em] text-[#171717] group-hover:text-[#E96B50] transition-colors">
            PRESSURE POINTS
          </span>
          <span className="hidden sm:inline text-[#686868]">// STUDIO EDITION</span>
        </div>

        {/* Narrative Movement Indicators (Desktop) */}
        <div className="hidden md:flex items-center gap-6 text-[11px] tracking-wider">
          <button 
            onClick={() => scrollToMovement('hero')}
            className={`transition-colors cursor-pointer flex items-center gap-1.5 ${currentMovement === 'I' ? 'text-[#171717] font-bold border-b-2 border-[#E96B50]' : 'text-[#686868] hover:text-[#171717]'}`}
          >
            <span>I.</span>
            <span>THE MASK</span>
          </button>

          <span className="text-[#D0CEC9]">•</span>

          <button 
            onClick={() => scrollToMovement('pressure-meter')}
            className={`transition-colors cursor-pointer flex items-center gap-1.5 ${currentMovement === 'II' ? 'text-[#171717] font-bold border-b-2 border-[#E96B50]' : 'text-[#686868] hover:text-[#171717]'}`}
          >
            <span>II.</span>
            <span>THE WEIGHT</span>
          </button>

          <span className="text-[#D0CEC9]">•</span>

          <button 
            onClick={() => scrollToMovement('unsaid-wall')}
            className={`transition-colors cursor-pointer flex items-center gap-1.5 ${currentMovement === 'III' ? 'text-[#171717] font-bold border-b-2 border-[#7BAE9F]' : 'text-[#686868] hover:text-[#171717]'}`}
          >
            <span>III.</span>
            <span>THE RECOGNITION</span>
          </button>

          <span className="text-[#D0CEC9]">•</span>

          <button 
            onClick={() => scrollToMovement('breathing-space')}
            className={`transition-colors cursor-pointer flex items-center gap-1.5 ${currentMovement === 'IV' ? 'text-[#171717] font-bold border-b-2 border-[#7BAE9F]' : 'text-[#686868] hover:text-[#171717]'}`}
          >
            <span>IV.</span>
            <span>THE RELEASE</span>
          </button>
        </div>

        {/* Right Action Suite: Audio Engine & Download Prescription */}
        <div className="flex items-center gap-3">
          {/* Spatial Web Audio Engine Toggle */}
          <button
            onClick={handleToggleAudio}
            className={`flex items-center gap-2 px-3 py-1.5 border rounded-xs text-[11px] font-mono tracking-wider transition-all cursor-pointer ${
              audioEnabled 
                ? 'border-[#171717] text-[#171717] bg-[#B8D9CF]/30' 
                : 'border-[#E2E0DC] text-[#686868] hover:border-[#171717] hover:text-[#171717]'
            }`}
            title="Toggle procedural audio soundscape"
          >
            {audioEnabled ? <Volume2 size={13} className="text-[#E96B50]" /> : <VolumeX size={13} />}
            <span className="hidden sm:inline">{audioEnabled ? 'SOUND: ON' : 'SOUND: OFF'}</span>
          </button>

          {/* Quick Prescription Export Button */}
          <button 
            onClick={() => setPrescriptionOpen(true)}
            className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 bg-[#171717] text-[#F7F7F5] hover:bg-[#E96B50] transition-all rounded-xs text-[11px] font-mono font-bold tracking-wider cursor-pointer shadow-sm"
          >
            <Download size={12} />
            <span>PRESCRIPTION</span>
          </button>
        </div>
      </nav>

      {/* Main DOM Layer (Transparent background allows 3D WebGL to bleed through) */}
      <main className="relative z-10">
        <Hero onBreathingClick={handleBreathingClick} />
        <PressureMeter />
        <UnsaidWall />
        <ComparisonTrap />
        <BreathingSpace />
        <SupportSteps />
        <FinalSection onOpenPrescription={() => setPrescriptionOpen(true)} />
      </main>

      <Footer />

      {/* Personalized High-Res Prescription Download Modal */}
      <StudentPrescriptionModal 
        isOpen={prescriptionOpen} 
        onClose={() => setPrescriptionOpen(false)} 
      />
    </div>
  );
}

export default App;
