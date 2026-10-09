import React, { useState } from 'react';
import { BookOpen, Users, Heart, AlertTriangle, Compass, RefreshCw, Sparkles, Check, Activity } from 'lucide-react';
import { useExperienceStore } from '../store/useExperienceStore';

const pressureSources = [
  {
    id: 'academic',
    label: 'Academic Expectations',
    visualDesc: 'Contracting time rings & cognitive saturation',
    detail: 'Finals, assignment pile-ups, GPA retention, 11:59 PM deadlines',
    icon: <BookOpen className="w-5 h-5" />,
    weight: 22,
    tip: 'Choose one small task. Just one. Work on it for 20 focused minutes, then permit yourself to stop for 5.'
  },
  {
    id: 'comparison',
    label: 'Comparison With Peers',
    visualDesc: 'Conflicting mirrored axes & divergent sightlines',
    detail: 'LinkedIn offers, peer test scores, feeling chronically behind',
    icon: <Users className="w-5 h-5" />,
    weight: 20,
    tip: 'Step away from comparison feeds for 24 hours. Their public highlight reel deliberately omits their private anxiety.'
  },
  {
    id: 'family',
    label: 'Family Expectations',
    visualDesc: 'Downward gravitational plumb-lines & shoulder anchors',
    detail: 'Parental sacrifices, family honor, unspoken repayment debt',
    icon: <Heart className="w-5 h-5" />,
    weight: 20,
    tip: 'Write down what you wish you could say honestly. You do not need to send it yet—just untangle it from your own voice.'
  },
  {
    id: 'failure',
    label: 'Fear of Failure',
    visualDesc: 'Seismic fracture lines & core instability',
    detail: 'Backlogs, rejected applications, impostor syndrome terror',
    icon: <AlertTriangle className="w-5 h-5" />,
    weight: 20,
    tip: 'Identify one action you can take despite the uncertainty. True strength in college is showing up for the next hour.'
  },
  {
    id: 'future',
    label: 'Uncertainty About The Future',
    visualDesc: 'Drifting divergent vectors & horizon distortion',
    detail: 'Placements, career roadmap confusion, existential dread',
    icon: <Compass className="w-5 h-5" />,
    weight: 18,
    tip: 'Focus only on the immediate next step. You are building a lifelong trajectory, not answering your whole life today.'
  }
];

export default function PressureMeter() {
  const [selected, setSelected] = useState(['academic', 'comparison', 'future']);
  const [showTip, setShowTip] = useState(false);
  const [isReleasing, setIsReleasing] = useState(false);
  const [released, setReleased] = useState(false);

  const toggleSelection = (id) => {
    if (released) setReleased(false);
    setSelected(prev => {
      const next = prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id];
      if (next.length === 0) setShowTip(false);
      return next;
    });
    // Sync with global 3D scene & audio store
    useExperienceStore.getState().togglePressure(id);
  };

  const handleReset = () => {
    setIsReleasing(true);
    setTimeout(() => {
      setSelected([]);
      setShowTip(false);
      setIsReleasing(false);
      setReleased(true);
      useExperienceStore.getState().resetPressures();
    }, 600);
  };

  const totalLoad = selected.reduce((sum, id) => {
    const item = pressureSources.find(p => p.id === id);
    return sum + (item ? item.weight : 0);
  }, 0);

  const getReflectiveInsight = () => {
    const count = selected.length;
    if (released && count === 0) {
      return "You loosened the tension threads. Notice how space opens up when you set down the invisible weight.";
    }
    if (count === 0) {
      return "Select the pressures you are currently carrying to render their physical tension geometry.";
    }
    if (count === 1) {
      return "A single isolated pressure is already heavy. Acknowledging it openly is the first boundary against burnout.";
    }
    if (count === 2 || count === 3) {
      return "Multiple competing demands are intersecting. Your mind is dividing energy across too many fronts.";
    }
    return "All vectors are firing simultaneously. It takes immense resilience just to function under this degree of saturation.";
  };

  const primarySelected = selected.length > 0 
    ? pressureSources.find(p => p.id === selected[0])
    : null;

  return (
    <section 
      id="pressure-meter" 
      className="bg-[#F7F7F5] text-[#171717] py-20 md:py-28 px-6 sm:px-10 md:px-16 lg:px-24 font-sans relative overflow-hidden border-t border-[#E2E0DC]"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="25%" x2="100%" y2="25%" stroke="#E2E0DC" strokeWidth="0.6" strokeDasharray="4 8" />
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#E2E0DC" strokeWidth="0.6" strokeDasharray="4 8" />
          <line x1="0" y1="75%" x2="100%" y2="75%" stroke="#E2E0DC" strokeWidth="0.6" strokeDasharray="4 8" />
          <line x1="33%" y1="0" x2="33%" y2="100%" stroke="#E2E0DC" strokeWidth="0.6" strokeDasharray="4 8" />
          <line x1="66%" y1="0" x2="66%" y2="100%" stroke="#E2E0DC" strokeWidth="0.6" strokeDasharray="4 8" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Movement Marker & Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#E96B50]"></span>
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#E96B50] font-bold">
              MOVEMENT II
            </span>
            <span className="text-xs text-[#686868] font-mono">//</span>
            <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#686868]">
              THE WEIGHT
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight mb-4 text-[#171717]">
            EVERYTHING YOU'RE <span className="font-editorial italic font-normal text-[#E96B50]">CARRYING.</span>
          </h2>
          
          <p className="text-[#686868] text-base sm:text-lg transition-opacity duration-500 min-h-[2.5rem] font-light leading-relaxed max-w-2xl mx-auto">
            {getReflectiveInsight()}
          </p>
        </div>

        {/* Dynamic Cumulative Tension Bar */}
        <div className="max-w-xl mx-auto mb-10 bg-[#FFFFFF] border border-[#E2E0DC] p-3.5 sm:p-4 rounded-xs shadow-xs">
          <div className="flex justify-between items-center text-xs font-mono mb-2">
            <span className="text-[#686868] flex items-center gap-1.5 font-medium">
              <Activity size={13} className={totalLoad > 50 ? "text-[#E96B50] animate-pulse" : "text-[#7BAE9F]"} />
              INTERNAL TENSION INDEX:
            </span>
            <span className={`font-bold font-mono ${totalLoad > 65 ? 'text-[#E96B50]' : totalLoad > 0 ? 'text-[#171717]' : 'text-[#686868]'}`}>
              {totalLoad}% LOAD • {selected.length} OF 5 THREADS TAUT
            </span>
          </div>
          
          <div className="w-full h-2 bg-[#EAE8E3] rounded-full overflow-hidden border border-[#E2E0DC]">
            <div 
              className={`h-full transition-all duration-700 ease-out ${
                totalLoad > 65 ? 'bg-[#E96B50]' : 'bg-[#171717]'
              }`}
              style={{ width: `${totalLoad}%` }}
            />
          </div>
        </div>

        {/* The Spatial Tension Installation: Two Balanced Connected Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Pressure Selectors */}
          <div className="lg:col-span-6 flex flex-col gap-2.5">
            <div className="flex items-center justify-between px-1 mb-1">
              <span className="text-xs font-mono uppercase tracking-widest text-[#686868]">
                ACTIVE PRESSURE THREADS:
              </span>
              <span className="text-[11px] font-mono text-[#E96B50] font-bold">
                {selected.length} SELECTED
              </span>
            </div>

            {pressureSources.map((source) => {
              const isSelected = selected.includes(source.id);
              return (
                <button
                  key={source.id}
                  onClick={() => toggleSelection(source.id)}
                  className={`flex items-start justify-between p-4 text-left rounded-xs border transition-all duration-200 outline-none cursor-pointer group ${
                    isSelected 
                      ? 'border-2 border-[#171717] bg-[#FFFFFF] text-[#171717] shadow-sm translate-x-1' 
                      : 'border border-[#E2E0DC] bg-[#FFFFFF] text-[#686868] hover:border-[#171717] hover:text-[#171717]'
                  }`}
                  aria-pressed={isSelected}
                >
                  <div className="flex items-start gap-3.5">
                    <div className={`mt-0.5 transition-colors duration-200 ${isSelected ? 'text-[#E96B50]' : 'text-[#686868] group-hover:text-[#171717]'}`}>
                      {source.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold tracking-wide text-sm sm:text-base ${isSelected ? 'text-[#171717]' : 'text-[#4A4A4A]'}`}>
                          {source.label}
                        </span>
                      </div>
                      <span className="block text-[11px] font-mono text-[#E96B50] font-semibold mt-0.5">
                        ↳ {source.visualDesc}
                      </span>
                      <span className="block text-xs text-[#686868] mt-1 font-light leading-relaxed">
                        {source.detail}
                      </span>
                    </div>
                  </div>

                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-1 transition-colors ${
                    isSelected ? 'border-[#E96B50] bg-[#E96B50] text-[#FFFFFF]' : 'border-[#E2E0DC]'
                  }`}>
                    {isSelected && <Check size={12} strokeWidth={3} />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Generative Vector Artwork Installation & Action Suite */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            <div className="w-full bg-[#FFFFFF] border border-[#E2E0DC] rounded-xs shadow-md p-5 sm:p-6 flex flex-col items-center">
              
              {/* Outer Coordinate Header */}
              <div className="w-full flex justify-between items-center pb-3 mb-3 border-b border-[#E2E0DC] font-mono text-[10px] text-[#686868]">
                <span className="flex items-center gap-1.5 text-[#E96B50] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E96B50] animate-pulse"></span>
                  [VECTOR_PLOT // ACTIVE_TENSION: {totalLoad}%]
                </span>
                <span>[FIG. 02 // TENSION CORE]</span>
              </div>

              {/* The Generative Vector Pressure Artwork (Enlarged and Dynamic) */}
              <div className={`relative w-full max-w-[380px] sm:max-w-[420px] aspect-square flex items-center justify-center transition-all duration-500 bg-[#FAF9F6] rounded-xs border border-[#EAE8E3] ${
                isReleasing ? 'scale-105 filter blur-xs opacity-40' : 'scale-100 opacity-100'
              }`}>
                <svg className="w-full h-full overflow-visible p-4" viewBox="0 0 320 320">
                  <defs>
                    <radialGradient id="weightAuraLight" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#E96B50" stopOpacity={selected.length > 0 ? "0.15" : "0.01"} />
                      <stop offset="70%" stopColor="#E96B50" stopOpacity={selected.length > 0 ? "0.04" : "0"} />
                      <stop offset="100%" stopColor="#FAF9F6" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Ambient Core Stress Aura */}
                  <circle cx="160" cy="160" r="145" fill="url(#weightAuraLight)" className="animate-breath-halo" />

                  {/* Base Architectural Coordinate Grids */}
                  <line x1="160" y1="15" x2="160" y2="305" stroke="#E2E0DC" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="15" y1="160" x2="305" y2="160" stroke="#E2E0DC" strokeWidth="1" strokeDasharray="3 3" />
                  <circle cx="160" cy="160" r="120" fill="none" stroke="#E2E0DC" strokeWidth="0.8" />
                  <circle cx="160" cy="160" r="70" fill="none" stroke="#E2E0DC" strokeWidth="0.6" strokeDasharray="2 4" />

                  {/* Base Human Form Silhouette Line */}
                  <g 
                    className="transition-all duration-500" 
                    stroke={selected.length > 0 ? "#171717" : "#A8A6A0"} 
                    strokeWidth="1.8" 
                    fill="none"
                  >
                    {/* Head posture */}
                    <path d="M150,115 C150,88 170,88 170,115 C170,128 165,134 160,142 L160,158" />
                    {/* Stooped shoulders carrying the physical load */}
                    <path d="M125,178 C140,162 152,160 160,160 C168,160 180,162 195,178" />
                    {/* Taut spinal axis */}
                    <line x1="160" y1="160" x2="160" y2="230" />
                  </g>

                  {/* 1. ACADEMIC EXPECTATIONS: Tight contracting time rings & orbital loops */}
                  {selected.includes('academic') && (
                    <g className="animate-spin" style={{ animationDuration: '22s', transformOrigin: '160px 110px' }}>
                      <ellipse cx="160" cy="110" rx="44" ry="15" fill="none" stroke="#E96B50" strokeWidth="1.6" strokeDasharray="6 3" />
                      <ellipse cx="160" cy="110" rx="60" ry="20" fill="none" stroke="#E96B50" strokeWidth="1" opacity="0.7" strokeDasharray="3 4" />
                      <circle cx="204" cy="110" r="3" fill="#E96B50" />
                      <circle cx="116" cy="110" r="2.5" fill="#E96B50" />
                    </g>
                  )}

                  {/* 2. COMPARISON WITH PEERS: Opposing mirrored vectors & converging crosshairs */}
                  {selected.includes('comparison') && (
                    <g>
                      <line x1="45" y1="115" x2="125" y2="115" stroke="#E96B50" strokeWidth="1.8" strokeDasharray="4 2" />
                      <line x1="275" y1="115" x2="195" y2="115" stroke="#E96B50" strokeWidth="1.8" strokeDasharray="4 2" />
                      <polygon points="128,115 120,112 120,118" fill="#E96B50" />
                      <polygon points="192,115 200,112 200,118" fill="#E96B50" />
                      <ellipse cx="160" cy="115" rx="28" ry="28" fill="none" stroke="#E96B50" strokeWidth="1" strokeDasharray="3 6" opacity="0.8" />
                    </g>
                  )}

                  {/* 3. FAMILY EXPECTATIONS: Heavy gravitational plumb-lines anchoring shoulders */}
                  {selected.includes('family') && (
                    <g>
                      <line x1="135" y1="35" x2="135" y2="155" stroke="#7BAE9F" strokeWidth="2.2" strokeDasharray="7 3" />
                      <line x1="185" y1="35" x2="185" y2="155" stroke="#7BAE9F" strokeWidth="2.2" strokeDasharray="7 3" />
                      <polygon points="135,165 130,154 140,154" fill="#7BAE9F" />
                      <polygon points="185,165 180,154 190,154" fill="#7BAE9F" />
                      <line x1="115" y1="165" x2="205" y2="165" stroke="#7BAE9F" strokeWidth="1.8" opacity="0.9" />
                    </g>
                  )}

                  {/* 4. FEAR OF FAILURE: Jagged seismic core fracture across chest */}
                  {selected.includes('failure') && (
                    <g className="animate-thread-vibrate">
                      <path 
                        d="M125,195 L142,195 L148,180 L154,210 L160,186 L166,206 L172,195 L195,195" 
                        fill="none" 
                        stroke="#E96B50" 
                        strokeWidth="2.5" 
                      />
                      <circle cx="160" cy="196" r="18" fill="none" stroke="#E96B50" strokeWidth="1" strokeDasharray="2 3" opacity="0.75" />
                    </g>
                  )}

                  {/* 5. UNCERTAINTY ABOUT THE FUTURE: Drifting divergent vector rays */}
                  {selected.includes('future') && (
                    <g opacity="0.9">
                      <line x1="185" y1="138" x2="290" y2="90" stroke="#7BAE9F" strokeWidth="1.8" strokeDasharray="8 4" />
                      <line x1="190" y1="160" x2="300" y2="160" stroke="#7BAE9F" strokeWidth="1.5" strokeDasharray="5 3" />
                      <line x1="185" y1="182" x2="290" y2="230" stroke="#7BAE9F" strokeWidth="1.8" strokeDasharray="10 4" />
                      <circle cx="290" cy="90" r="3" fill="#7BAE9F" />
                      <circle cx="300" cy="160" r="3" fill="#7BAE9F" />
                      <circle cx="290" cy="230" r="3" fill="#7BAE9F" />
                    </g>
                  )}

                  {/* Tension Web Connections */}
                  {selected.length >= 2 && (
                    <path 
                      d={`M160,110 Q${160 + (selected.length * 9)},150 160,195`} 
                      fill="none" 
                      stroke="#E96B50" 
                      strokeWidth="1.4" 
                      strokeDasharray="3 3"
                      opacity="0.8"
                    />
                  )}
                </svg>

                {/* Zero State / Post-Release Calm Message */}
                {selected.length === 0 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 pointer-events-none">
                    <span className="font-handwriting text-2xl sm:text-3xl text-[#7BAE9F]">
                      {released ? "Tension threads loosened." : "Select pressure threads."}
                    </span>
                    <span className="text-xs font-mono text-[#686868] mt-2 max-w-xs">
                      {released ? "You took the first pause. That is where agency begins." : "Witness the physical geometry of your invisible burden."}
                    </span>
                  </div>
                )}
              </div>

              {/* Integrated Action Suite & Grounded Advice */}
              <div className="w-full mt-4 pt-4 border-t border-[#E2E0DC] flex flex-col items-center">
                
                {selected.length > 0 && !showTip && (
                  <button
                    onClick={() => setShowTip(true)}
                    className="w-full py-3.5 px-5 bg-[#171717] text-[#FFFFFF] font-semibold text-xs font-mono tracking-[0.16em] uppercase rounded-xs hover:bg-[#E96B50] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Sparkles size={15} />
                    <span>Reveal Realistic Next Step</span>
                  </button>
                )}

                {/* Actionable Insight Box */}
                {showTip && primarySelected && (
                  <div className="w-full bg-[#FAF9F5] border border-[#E2E0DC] p-5 rounded-xs shadow-sm text-left animate-fade-in relative">
                    <div className="flex items-center justify-between border-b border-[#E2E0DC] pb-2.5 mb-3">
                      <span className="text-xs font-mono text-[#E96B50] uppercase tracking-wider flex items-center gap-1.5 font-bold">
                        <span className="w-2 h-2 rounded-full bg-[#E96B50]"></span>
                        GROUNDED RESOLUTION // {primarySelected.label}
                      </span>
                    </div>
                    
                    <blockquote className="text-[#171717] text-sm sm:text-base font-light leading-relaxed mb-3">
                      "{primarySelected.tip}"
                    </blockquote>
                    
                    <p className="text-[11px] text-[#686868] border-t border-[#E2E0DC] pt-2 font-mono">
                      You do not have to conquer the whole semester today. Just the next 20 minutes.
                    </p>
                  </div>
                )}

                {/* Reset & Release Mechanism */}
                {selected.length > 0 && (
                  <button
                    onClick={handleReset}
                    className="mt-3 flex items-center gap-2 text-[#686868] hover:text-[#E96B50] text-xs font-mono uppercase tracking-widest transition-colors duration-200 cursor-pointer py-1 font-medium"
                  >
                    <RefreshCw size={12} className={isReleasing ? 'animate-spin' : ''} />
                    <span>Release Weights / Dissolve Tension</span>
                  </button>
                )}

              </div>

            </div>

          </div>

        </div>

        {/* Responsible Disclaimer */}
        <div className="mt-12 text-center border-t border-[#E2E0DC] pt-6">
          <p className="text-[#686868] text-xs font-mono max-w-xl mx-auto">
            REFLECTIVE FINE-ART EXERCISE // NOT A CLINICAL DIAGNOSTIC // RUNS LOCALLY IN YOUR BROWSER
          </p>
        </div>

      </div>
    </section>
  );
}
