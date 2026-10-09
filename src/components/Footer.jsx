import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#F0EFEB] text-[#686868] py-14 border-t border-[#E2E0DC] text-center px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center space-y-3 font-mono text-xs">
        <p className="tracking-[0.25em] uppercase text-[#171717] font-bold">
          PRESSURE POINTS — THE REAL STUDENT LIFE
        </p>
        <p className="text-[#686868] tracking-wider text-[11px]">
          Digital Fine-Art & Frontend Designing Challenge • PIXEL PERSONA 2026
        </p>
        <p className="text-[#386B5D] text-[11px] pt-2 italic font-serif">
          "Behind every 'I'm fine' is a story you haven't heard."
        </p>
      </div>
    </footer>
  );
}
