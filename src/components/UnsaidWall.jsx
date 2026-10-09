import React, { useState } from 'react';
import { Heart, ChevronDown, ChevronUp, Pin } from 'lucide-react';

const archiveItems = [
  { 
    id: 1, 
    indexCode: "ARCHIVE // 014",
    text: "Everyone thinks I'm doing well. I'm barely keeping up.",
    intimateContext: "Spoken under breath in the 3rd floor library stairway. When professors praise your previous semester performance, admitting that you are drowning feels like a confession of fraud.",
    tag: "IMPOSTOR VENEER",
    tapeColor: "rgba(242, 107, 79, 0.3)",
    rotation: "-1.5deg",
    size: "large",
    initialRelate: 218
  },
  { 
    id: 2, 
    indexCode: "ARCHIVE // 027",
    text: "I am proud of my friend, but I am scared I am falling behind.",
    intimateContext: "The notification pinged during lunch. You cheered, hugged them, and spent the entire bus ride home quietly wondering if your own timeline has already expired.",
    tag: "COMPARISON ACHE",
    tapeColor: "rgba(184, 217, 207, 0.35)",
    rotation: "1.8deg",
    size: "medium",
    initialRelate: 184
  },
  { 
    id: 3, 
    indexCode: "ARCHIVE // 033",
    text: "I need a break, but I feel guilty taking one.",
    intimateContext: "Sitting on the bed on Sunday afternoon, looking at the ceiling while your brain calculates the three chapters you aren't reading. Rest feels like an unearned luxury.",
    tag: "INTERNALIZED URGENCY",
    tapeColor: "rgba(247, 245, 239, 0.3)",
    rotation: "-2deg",
    size: "large",
    initialRelate: 295
  },
  { 
    id: 4, 
    indexCode: "ARCHIVE // 049",
    text: "I don't know what I want to do with my life.",
    intimateContext: "Surrounded by peers who have 5-year corporate roadmaps memorized down to the quarter, while you are still trying to figure out which subjects you genuinely care about.",
    tag: "HORIZON VOID",
    tapeColor: "rgba(242, 107, 79, 0.25)",
    rotation: "1.2deg",
    size: "medium",
    initialRelate: 247
  },
  { 
    id: 5, 
    indexCode: "ARCHIVE // 058",
    text: "I wish someone would ask how I actually am.",
    intimateContext: "Not the casual 'how are you' traded while rushing to lecture, but the kind where someone waits for the real answer without checking their watch.",
    tag: "UNSEEN FATIGUE",
    tapeColor: "rgba(184, 217, 207, 0.4)",
    rotation: "-1deg",
    size: "medium",
    initialRelate: 191
  },
  { 
    id: 6, 
    indexCode: "ARCHIVE // 064",
    text: "What if all this effort still isn't enough?",
    intimateContext: "The late nights, the skipped meals, the sacrificed weekends. The terror isn't working hard—it's the thought of giving everything and arriving at an empty doorway.",
    tag: "EXISTENTIAL STAKES",
    tapeColor: "rgba(247, 245, 239, 0.35)",
    rotation: "2deg",
    size: "large",
    initialRelate: 312
  }
];

export default function UnsaidWall() {
  const [expandedId, setExpandedId] = useState(null);
  const [relates, setRelates] = useState(() => {
    const map = {};
    archiveItems.forEach(item => {
      map[item.id] = { count: item.initialRelate, active: false };
    });
    return map;
  });

  const toggleExpand = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const handleRelate = (e, id) => {
    e.stopPropagation();
    setRelates(prev => {
      const current = prev[id];
      return {
        ...prev,
        [id]: {
          count: current.active ? current.count - 1 : current.count + 1,
          active: !current.active
        }
      };
    });
  };

  const colSpans = [
    'lg:col-span-7',
    'lg:col-span-5',
    'lg:col-span-5',
    'lg:col-span-7',
    'lg:col-span-6',
    'lg:col-span-6',
  ];

  const marginalNotes = [
    '— whispered outside lecture hall 302',
    '— scrolling LinkedIn at 1:15 AM',
    '— staring at the ceiling on Sunday afternoon',
    '— career fair conversation aftermath',
    '— after saying "I\'m good, you?" for the 4th time today',
    '— staring at the assignment submit countdown'
  ];

  return (
    <section 
      id="unsaid-wall" 
      className="w-full bg-[#F7F7F5] py-24 md:py-32 px-6 sm:px-10 md:px-16 lg:px-24 overflow-hidden border-t border-[#E2E0DC] relative"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #D0CEC9 1px, transparent 0)`,
            backgroundSize: '36px 36px'
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col relative z-10">
        
        {/* Movement Header */}
        <div className="mb-14 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#7BAE9F]"></span>
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#7BAE9F] font-bold">
              MOVEMENT III
            </span>
            <span className="text-xs text-[#686868] font-mono">//</span>
            <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#686868]">
              THE RECOGNITION (PART I)
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light leading-tight tracking-tight mb-4 text-[#171717]">
            THINGS WE DON'T ALWAYS <span className="font-editorial italic font-normal text-[#171717]">SAY OUT LOUD.</span>
          </h2>

          <p className="text-[#686868] text-base sm:text-lg font-light max-w-2xl mx-auto leading-relaxed">
            An archival installation of unspoken student experiences. Click any entry to inspect its context, or indicate your resonance.
          </p>
        </div>

        {/* Editorial Collage Layout (Asymmetric, Varied Scale, Deliberate Rhythm) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {archiveItems.map((item, idx) => {
            const isExpanded = expandedId === item.id;
            const relateState = relates[item.id] || { count: item.initialRelate, active: false };
            const spanClass = colSpans[idx % colSpans.length];
            const cardBg = idx % 2 === 0 ? 'bg-[#FFFFFF]' : 'bg-[#FAF9F6]';

            return (
              <div 
                key={item.id}
                onClick={() => toggleExpand(item.id)}
                className={`${spanClass} relative ${cardBg} border transition-all duration-300 p-6 sm:p-7 rounded-xs cursor-pointer group shadow-sm hover:shadow-lg ${
                  isExpanded 
                    ? 'border-[#171717] ring-1 ring-[#171717]/20 -translate-y-1' 
                    : 'border-[#E2E0DC] hover:border-[#171717] hover:-translate-y-1'
                }`}
                style={{
                  transform: isExpanded ? 'none' : `rotate(${item.rotation})`
                }}
              >
                {/* Archival Tape Stamp at Top */}
                <div 
                  className="w-14 h-3.5 absolute -top-1.5 left-8 archival-tape pointer-events-none border border-[#D0CEC9]"
                  style={{ backgroundColor: 'rgba(235, 233, 227, 0.85)' }}
                />

                {/* Card Top Metadata */}
                <div className="flex items-center justify-between border-b border-[#E2E0DC] pb-3 mb-4 text-[11px] font-mono">
                  <span className="text-[#686868] flex items-center gap-1.5 font-medium">
                    <Pin size={12} className="text-[#E96B50]" />
                    {item.indexCode}
                  </span>
                  <span className="text-[#E96B50] tracking-wider font-bold">
                    [{item.tag}]
                  </span>
                </div>

                {/* Primary Student Thought */}
                <blockquote className={`text-[#171717] leading-snug font-light mb-3 ${
                  item.size === 'large' ? 'text-xl sm:text-2xl lg:text-[1.65rem]' : 'text-lg sm:text-xl'
                }`}>
                  "{item.text}"
                </blockquote>

                {/* Handwritten Margins Accent */}
                <p className="font-handwriting text-sm sm:text-base text-[#686868] mb-4 select-none">
                  {marginalNotes[idx]}
                </p>

                {/* Expandable Intimate Context Layer */}
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isExpanded ? 'max-h-60 opacity-100 mb-4' : 'max-h-0 opacity-0 mb-0'
                }`}>
                  <div className="p-4 bg-[#F2F1ED] border-l-2 border-[#171717] rounded-r-xs">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#171717] block mb-1 font-bold">
                      UNSPOKEN CONTEXT
                    </span>
                    <p className="text-sm text-[#4A4A4A] font-light leading-relaxed">
                      {item.intimateContext}
                    </p>
                  </div>
                </div>

                {/* Bottom Bar: Expand Toggle & "I Relate" Resonance Button */}
                <div className="flex items-center justify-between pt-3.5 border-t border-[#E2E0DC] text-xs">
                  <div className="flex items-center gap-1.5 text-[#686868] group-hover:text-[#171717] transition-colors font-mono text-[11px] font-medium">
                    <span>{isExpanded ? "COLLAPSE DOSSIER" : "EXPLORE CONTEXT"}</span>
                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </div>

                  <button
                    onClick={(e) => handleRelate(e, item.id)}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all duration-200 cursor-pointer text-xs font-mono font-medium ${
                      relateState.active 
                        ? 'border-[#E96B50] bg-[#E96B50]/10 text-[#E96B50]' 
                        : 'border-[#E2E0DC] text-[#686868] hover:border-[#171717] hover:text-[#171717]'
                    }`}
                    aria-label={relateState.active ? "Resonated with statement" : "I relate to statement"}
                  >
                    <Heart 
                      size={13} 
                      className={`transition-transform duration-200 ${relateState.active ? 'fill-[#E96B50] text-[#E96B50] scale-110' : 'group-hover:scale-110'}`} 
                    />
                    <span>I RELATE</span>
                    <span className="text-[#686868] ml-0.5">• {relateState.count}</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Closing Comfort & Attribution Note */}
        <div className="mt-16 flex flex-col items-center text-center gap-3 border-t border-[#E2E0DC] pt-10">
          <p className="font-handwriting text-2xl sm:text-3xl text-[#171717] max-w-2xl leading-relaxed">
            "You are not the only person carrying this silence down the corridor."
          </p>
          <p className="text-[#686868] text-xs font-mono max-w-md">
            Illustrative representative experiences composed for reflective digital storytelling • Not verified survey testimonials
          </p>
        </div>

      </div>
    </section>
  );
}
