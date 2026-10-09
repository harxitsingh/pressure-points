import React, { useRef, useState } from 'react';
import { Download, X, ShieldCheck, Sparkles } from 'lucide-react';
import { useExperienceStore } from '../store/useExperienceStore';

export default function StudentPrescriptionModal({ isOpen, onClose }) {
  const selectedPressures = useExperienceStore((state) => state.selectedPressures);
  const [downloading, setDownloading] = useState(false);
  const canvasRef = useRef(null);

  if (!isOpen) return null;

  const handleDownload = () => {
    setDownloading(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = 1200;
    canvas.height = 800;

    // Background
    ctx.fillStyle = '#F7F7F5';
    ctx.fillRect(0, 0, 1200, 800);

    // Archival Border
    ctx.strokeStyle = '#E2E0DC';
    ctx.lineWidth = 3;
    ctx.strokeRect(40, 40, 1120, 720);

    // Header Accents
    ctx.fillStyle = '#E96B50';
    ctx.font = 'bold 20px monospace';
    ctx.fillText('Rx // OFFICIAL STUDENT CARE PRESCRIPTION', 80, 100);

    ctx.fillStyle = '#686868';
    ctx.font = '16px monospace';
    ctx.fillText('DOCUMENT #PP-2026-ARCHIVE', 860, 100);

    // Divider Line
    ctx.strokeStyle = '#E2E0DC';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(80, 120);
    ctx.lineTo(1120, 120);
    ctx.stroke();

    // Patient Info
    ctx.fillStyle = '#171717';
    ctx.font = '32px Georgia, serif';
    ctx.fillText('ISSUED TO: ANONYMOUS STUDENT CARRYING REAL LOADS', 80, 180);

    // Diagnosed Pressures
    ctx.fillStyle = '#386B5D';
    ctx.font = 'bold 18px monospace';
    ctx.fillText('IDENTIFIED INVISIBLE VECTORS:', 80, 240);

    ctx.fillStyle = '#171717';
    ctx.font = '22px sans-serif';
    const pressureList = selectedPressures.length > 0 
      ? selectedPressures.map(p => p.toUpperCase()).join('  •  ')
      : 'GENERAL ACADEMIC EXHAUSTION';
    ctx.fillText(`[ ${pressureList} ]`, 80, 280);

    // Prescribed Dosage
    ctx.fillStyle = '#E96B50';
    ctx.font = 'bold 18px monospace';
    ctx.fillText('MANDATORY PRESCRIPTION & REMEDY:', 80, 360);

    ctx.fillStyle = '#171717';
    ctx.font = 'italic 28px Georgia, serif';
    ctx.fillText('"You are hereby permitted to learn at your own pace.', 80, 410);
    ctx.fillText('Your worth is not a rank, a package, or someone else\'s timeline.', 80, 455);
    ctx.fillText('Rest is not an earned reward; it is a biological foundation."', 80, 500);

    // Dosage limits
    ctx.fillStyle = '#386B5D';
    ctx.font = '20px monospace';
    ctx.fillText('DOSAGE: 15–20 MINUTES OF SINGLE-TASK FOCUS • ZERO GUILT REST PERIODS', 80, 580);

    // Stamp & Sign-off
    ctx.strokeStyle = '#E96B50';
    ctx.lineWidth = 2;
    ctx.strokeRect(840, 620, 240, 80);

    ctx.fillStyle = '#E96B50';
    ctx.font = 'bold 16px monospace';
    ctx.fillText('AUTHORIZED // VALID', 860, 655);
    ctx.font = '12px monospace';
    ctx.fillText('EXHIBIT 2026 PIXEL PERSONA', 860, 680);

    // Trigger Download
    setTimeout(() => {
      const link = document.createElement('a');
      link.download = 'Student-Prescription-PressurePoints.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      setDownloading(false);
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-[#171717]/40 backdrop-blur-md animate-fade-in">
      <div className="bg-[#FFFFFF] border border-[#E2E0DC] max-w-2xl w-full p-6 sm:p-8 rounded-xs shadow-2xl relative text-[#171717]">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-[#888888] hover:text-[#171717] transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-4 text-xs font-mono text-[#E96B50] font-bold">
          <Sparkles size={14} />
          <span>PERSONALIZED RESOLUTION EXPORT</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-light text-[#171717] mb-2">
          Your Grounding Student Prescription
        </h3>

        <p className="text-sm text-[#686868] font-light mb-6">
          A personalized digital artifact generated from the invisible vectors you navigated today.
        </p>

        {/* Preview Card */}
        <div className="bg-[#FAF9F5] border border-[#E2E0DC] p-6 rounded-xs mb-6 text-left">
          <div className="flex justify-between items-center text-[10px] font-mono text-[#888888] border-b border-[#E2E0DC] pb-2 mb-4">
            <span className="text-[#386B5D] font-bold">Rx CARD // IDENTIFIED WEIGHTS</span>
            <span>NO EXPIRATION</span>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-[#171717] font-mono">
              <span className="text-[#686868]">ACTIVE PRESSURES:</span> {selectedPressures.join(', ') || 'Academic exhaustion'}
            </p>
            <p className="font-editorial italic text-lg sm:text-xl text-[#171717] leading-relaxed">
              "Rest is not a failure. You do not have to conquer the entire semester today. Take your next step with unhurried dignity."
            </p>
            <p className="text-xs font-mono text-[#386B5D] pt-2 font-bold">
              DOSAGE: 15-minute single focus block • Guilt-free breaks
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#686868]">
            <ShieldCheck size={14} className="text-[#386B5D]" />
            <span>Generates 1200x800 high-res PNG canvas locally</span>
          </div>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#171717] text-[#FFFFFF] font-mono font-bold text-xs tracking-wider uppercase rounded-xs hover:bg-[#E96B50] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <Download size={15} />
            <span>{downloading ? 'Rendering Artifact...' : 'Download Prescription'}</span>
          </button>
        </div>

        {/* Hidden Canvas for Generation */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}
