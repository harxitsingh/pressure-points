import React, { useState } from 'react';
import { Clock, Users, HeartHandshake, Compass, Wind, HelpCircle, CheckCircle2, RotateCcw, ArrowRight, ShieldCheck, Sparkles, Timer } from 'lucide-react';

const challengeOptions = [
  {
    id: 'deadlines',
    icon: <Clock className="w-5 h-5" />,
    label: 'I have too many deadlines.',
    tag: 'COGNITIVE SATURATION',
    acknowledgment: "Your brain is attempting to hold 8 competing emergencies simultaneously. Panic is a predictable response to overload, not a character flaw.",
    immediateAction: "Get the tasks out of your head and onto physical paper.",
    firstStep: "Write down the next 3 deadlines. Circle only the single one due soonest. Close or minimize everything else.",
    followUp: "Set a 15-minute timer. Work on only that circled task until the chime sounds.",
    timePresets: [5, 15, 25]
  },
  {
    id: 'comparison',
    icon: <Users className="w-5 h-5" />,
    label: 'I keep comparing myself with others.',
    tag: 'DEFICIT DISTORTION',
    acknowledgment: "Someone else's progress is not a measurement of your worth. You are watching their curated highlight reel while drowning in your own unedited backstage.",
    immediateAction: "Sever the comparison feed and reclaim your own compass.",
    firstStep: "Close Instagram, LinkedIn, and peer group chats for the next 4 hours.",
    followUp: "Write down one personal goal that mattered to you before you checked anyone else's profile today.",
    timePresets: [5, 15, 25]
  },
  {
    id: 'family',
    icon: <HeartHandshake className="w-5 h-5" />,
    label: 'I am afraid of disappointing my family.',
    tag: 'RELATIONAL WEIGHT',
    acknowledgment: "Carrying parental sacrifices as a personal debt is exhausting. Most people who love you would rather know you are human than watch you break down in silence.",
    immediateAction: "Untangle their hopes from your self-worth.",
    firstStep: "Write down the exact sentence you are terrified of hearing or saying. Putting it into words shrinks the monster.",
    followUp: "Remind yourself: You cannot honor anyone by destroying your mental foundation in the process.",
    timePresets: [5, 15, 25]
  },
  {
    id: 'future',
    icon: <Compass className="w-5 h-5" />,
    label: 'I am worried about placements and my future.',
    tag: 'HORIZON TERROR',
    acknowledgment: "Your entire 40-year career is not decided this semester. Trying to solve your whole future tonight only paralyzes your hands today.",
    immediateAction: "Reduce the colossal horizon to one actionable micro-brick.",
    firstStep: "Choose one interview topic, one bug to fix in a project, or one practice problem to complete.",
    followUp: "Commit to this single brick. The wall will emerge brick by brick, not all at once.",
    timePresets: [5, 15, 25]
  },
  {
    id: 'exhausted',
    icon: <Wind className="w-5 h-5" />,
    label: 'I feel exhausted and need a pause.',
    tag: 'NERVOUS SYSTEM DEPLETION',
    acknowledgment: "Burnout is not healed by another productivity hack or Pomodoro app. When the battery is at 2%, running diagnostic software just kills the phone faster.",
    immediateAction: "Grant yourself an unearned, guilt-free pause.",
    firstStep: "Step away from the screen right now. Drink a glass of water, look out a window, or stretch your neck and shoulders.",
    followUp: "Visit the guided breathing room below for 60 seconds of gentle unhurried pacing.",
    timePresets: [5, 15, 25]
  },
  {
    id: 'start',
    icon: <HelpCircle className="w-5 h-5" />,
    label: "I don't know where to start.",
    tag: 'ANALYSIS PARALYSIS',
    acknowledgment: "When everything feels equally important and massive, doing nothing is the body's default freeze response. Any movement forward breaks the freeze.",
    immediateAction: "Pick the absolute smallest, almost ridiculously easy task.",
    firstStep: "Open the document, write the title, or clear off your desk workspace. Do something that requires less than 2 minutes.",
    followUp: "Once the momentum starts, let inertia carry you into the next 10 minutes.",
    timePresets: [5, 15, 25]
  }
];

export default function SupportSteps() {
  const [selectedId, setSelectedId] = useState('deadlines');
  const [selectedMinutes, setSelectedMinutes] = useState(15);
  const [isCompleted, setIsCompleted] = useState(false);

  const activeChallenge = challengeOptions.find(c => c.id === selectedId) || challengeOptions[0];

  const handleSelectChallenge = (id) => {
    setSelectedId(id);
    setIsCompleted(false);
  };

  const handleComplete = () => {
    setIsCompleted(true);
  };

  const handleRestart = () => {
    setIsCompleted(false);
  };

  return (
    <section 
      id="support-steps" 
      className="bg-[#F7F7F5] min-h-screen py-28 px-6 sm:px-10 md:px-16 lg:px-24 flex flex-col justify-center items-center border-t border-[#E2E0DC] relative overflow-hidden text-[#171717]"
    >
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #D8D5CE 1px, transparent 0)`,
            backgroundSize: '36px 36px'
          }}
        />
      </div>

      <div className="max-w-6xl w-full mx-auto relative z-10">
        
        {/* Movement Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#E96B50]"></span>
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#E96B50] font-bold">
              MOVEMENT IV
            </span>
            <span className="text-xs text-[#B5B3AD] font-mono">//</span>
            <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#686868]">
              THE RELEASE (PART I)
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#171717] mb-4">
            WHAT WOULD HELP YOU <span className="font-editorial italic font-normal text-[#171717] underline decoration-[#B8D9CF] decoration-wavy decoration-2">RIGHT NOW?</span>
          </h2>

          <p className="text-[#686868] text-base sm:text-lg font-light">
            Select what you are facing right now. Receive an unpressured, realistic micro-action you can take in the next 15 minutes.
          </p>
        </div>

        {/* Guided Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: The 6 Challenge Options */}
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            <span className="text-xs font-mono uppercase tracking-widest text-[#686868] mb-1 px-1">
              CHOOSE YOUR PRESENT REALITY:
            </span>

            {challengeOptions.map((option) => {
              const isSelected = selectedId === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectChallenge(option.id)}
                  className={`w-full text-left p-4 sm:p-4.5 rounded-xs border transition-all duration-300 flex items-center justify-between cursor-pointer group ${
                    isSelected 
                      ? 'border-[#171717] bg-[#FFFFFF] text-[#171717] shadow-md ring-1 ring-[#171717] translate-x-1' 
                      : 'border-[#E2E0DC] bg-[#FFFFFF] text-[#686868] hover:border-[#171717] hover:text-[#171717]'
                  }`}
                  aria-pressed={isSelected}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`transition-colors ${isSelected ? 'text-[#E96B50]' : 'text-[#888888] group-hover:text-[#171717]'}`}>
                      {option.icon}
                    </div>
                    <div>
                      <p className={`font-medium text-sm sm:text-base tracking-wide ${isSelected ? 'text-[#171717]' : 'text-[#333333]'}`}>
                        {option.label}
                      </p>
                      <span className="text-[10px] font-mono text-[#888888] block mt-0.5">
                        {option.tag}
                      </span>
                    </div>
                  </div>

                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                    isSelected ? 'border-[#171717] bg-[#171717] text-[#FFFFFF]' : 'border-[#E2E0DC]'
                  }`}>
                    {isSelected && <CheckCircle2 size={12} strokeWidth={3} />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Guided Resolution Workbench */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <div className="bg-[#FFFFFF] border border-[#E2E0DC] p-8 sm:p-10 rounded-xs shadow-xl relative overflow-hidden flex flex-col justify-between h-full">
              
              {!isCompleted ? (
                <>
                  {/* Card Header & Empathy Acknowledgment */}
                  <div>
                    <div className="flex items-center justify-between border-b border-[#E2E0DC] pb-3 mb-6 text-xs font-mono">
                      <span className="text-[#E96B50] flex items-center gap-1.5 font-bold">
                        <span className="w-2 h-2 rounded-full bg-[#E96B50] animate-pulse"></span>
                        ACTIONABLE RELIEF WORKBENCH
                      </span>
                      <span className="text-[#686868]">{activeChallenge.tag}</span>
                    </div>

                    {/* Empathetic Framing */}
                    <div className="mb-6 p-4 bg-[#FAF9F5] border-l-2 border-[#E96B50] rounded-r-xs">
                      <p className="text-sm text-[#444444] font-light leading-relaxed">
                        {activeChallenge.acknowledgment}
                      </p>
                    </div>

                    {/* The Immediate Action Principle */}
                    <div className="mb-6">
                      <span className="text-xs font-mono uppercase tracking-widest text-[#E96B50] block mb-1 font-bold">
                        THE PRINCIPLE:
                      </span>
                      <h3 className="text-xl sm:text-2xl font-light text-[#171717] leading-snug">
                        "{activeChallenge.immediateAction}"
                      </h3>
                    </div>

                    {/* Two Manageable Steps */}
                    <div className="space-y-4 mb-8">
                      <div className="p-4 bg-[#FAF9F5] border border-[#E2E0DC] rounded-xs">
                        <span className="text-xs font-mono text-[#386B5D] font-bold block mb-1">
                          STEP 01 // FIRST IMMEDIATE STEP
                        </span>
                        <p className="text-sm text-[#171717] leading-relaxed font-light">
                          {activeChallenge.firstStep}
                        </p>
                      </div>

                      <div className="p-4 bg-[#FAF9F5] border border-[#E2E0DC] rounded-xs">
                        <span className="text-xs font-mono text-[#686868] font-bold block mb-1">
                          STEP 02 // OPTIONAL FOLLOW-UP
                        </span>
                        <p className="text-sm text-[#555555] leading-relaxed font-light">
                          {activeChallenge.followUp}
                        </p>
                      </div>
                    </div>

                    {/* Time Commitment Selector */}
                    <div className="mb-6 pt-4 border-t border-[#E2E0DC]">
                      <div className="flex items-center justify-between mb-3 text-xs font-mono">
                        <span className="text-[#686868] flex items-center gap-1.5">
                          <Timer size={14} className="text-[#E96B50]" />
                          CHOOSE REALISTIC TIME COMMITMENT:
                        </span>
                        <span className="text-[#171717] font-bold">{selectedMinutes} MINUTES ONLY</span>
                      </div>
                      
                      <div className="flex gap-3">
                        {activeChallenge.timePresets.map((mins) => (
                          <button
                            key={mins}
                            onClick={() => setSelectedMinutes(mins)}
                            className={`flex-1 py-2.5 rounded-xs text-xs font-mono font-semibold transition-all cursor-pointer ${
                              selectedMinutes === mins
                                ? 'bg-[#171717] text-[#FFFFFF] shadow-sm'
                                : 'bg-[#FAF9F5] border border-[#E2E0DC] text-[#686868] hover:border-[#171717] hover:text-[#171717]'
                            }`}
                          >
                            {mins} MINS
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Completion Action Button */}
                  <div className="pt-4 border-t border-[#E2E0DC] flex items-center justify-between gap-4">
                    <button
                      onClick={handleComplete}
                      className="px-6 py-3.5 bg-[#171717] text-[#FFFFFF] font-semibold text-xs tracking-wider uppercase rounded-xs hover:bg-[#E96B50] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <Sparkles size={15} />
                      <span>Commit To This {selectedMinutes}-Min Action</span>
                    </button>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-[#686868]">
                      <ShieldCheck size={14} className="text-[#386B5D]" />
                      <span>No pressure beyond this</span>
                    </div>
                  </div>
                </>
              ) : (
                /* Completion State: Reinforcing Progress Without Guilt */
                <div className="py-12 flex flex-col items-center justify-center text-center animate-fade-in my-auto">
                  <div className="w-16 h-16 rounded-full bg-[#B8D9CF]/30 border border-[#7BAE9F] text-[#171717] flex items-center justify-center mb-6">
                    <CheckCircle2 size={32} />
                  </div>

                  <span className="text-xs font-mono tracking-widest text-[#E96B50] uppercase block mb-2 font-bold">
                    INTENTION SECURED // {selectedMinutes} MINUTES
                  </span>

                  <h3 className="text-3xl sm:text-4xl font-light text-[#171717] mb-4">
                    You chose a realistic next step.
                  </h3>

                  <p className="text-[#686868] text-base sm:text-lg max-w-md mx-auto leading-relaxed mb-8 font-light">
                    The entire future does not have to be solved today. By isolating just one micro-task for {selectedMinutes} minutes, you broke the freeze.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={handleRestart}
                      className="px-6 py-3 border border-[#E2E0DC] text-[#171717] text-xs font-mono tracking-wider uppercase rounded-xs hover:border-[#171717] transition-colors cursor-pointer flex items-center justify-center gap-2 bg-[#FFFFFF]"
                    >
                      <RotateCcw size={14} />
                      <span>Explore Another Challenge</span>
                    </button>

                    <button
                      onClick={() => {
                        if (window.__lenis) {
                          window.__lenis.scrollTo('#breathing-space', { duration: 1.2 });
                        } else {
                          document.getElementById('breathing-space')?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="px-6 py-3 bg-[#171717] text-[#FFFFFF] text-xs font-mono font-bold tracking-wider uppercase rounded-xs hover:bg-[#E96B50] transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                    >
                      <span>Take A Breather Now</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>

        {/* Responsible Non-Clinical Footnote */}
        <div className="mt-16 text-center max-w-2xl mx-auto border-t border-[#E2E0DC] pt-6">
          <p className="text-[#888888] text-xs font-mono leading-relaxed">
            GROUNDED ACADEMIC ADAPTATION // NOT A SUBSTITUTE FOR PSYCHOLOGICAL CARE // IF PRESSURE BECOMES OVERWHELMING, REACH OUT TO A QUALIFIED COUNSELOR OR MENTOR
          </p>
        </div>

      </div>
    </section>
  );
}
