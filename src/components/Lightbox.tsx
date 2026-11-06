import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Sliders,
  Check,
  Camera,
  MapPin,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import type { PhotographyItem } from '../types';
import { analyzeImagePixels, type AnalysisResult } from '../utils/imageAnalysis';

interface LightboxProps {
  photo: PhotographyItem | null;
  photos: PhotographyItem[];
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  photo,
  photos,
  onClose,
  onNext,
  onPrev
}) => {
  const [showAnalysis, setShowAnalysis] = useState<boolean>(true);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const histogramCanvasRef = useRef<HTMLCanvasElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const prevFocusedRef = useRef<HTMLElement | null>(null);

  // Store trigger element and manage focus trap
  useEffect(() => {
    if (photo) {
      prevFocusedRef.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          onNext();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          onPrev();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
        if (prevFocusedRef.current && typeof prevFocusedRef.current.focus === 'function') {
          prevFocusedRef.current.focus();
        }
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [photo, onClose, onNext, onPrev]);

  // Run Image Analysis whenever active photo changes
  useEffect(() => {
    if (!photo) return;
    let cancelled = false;
    setAnalyzing(true);

    analyzeImagePixels(photo.image)
      .then((res) => {
        if (!cancelled) {
          setAnalysis(res);
          setAnalyzing(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setAnalyzing(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [photo]);

  // Draw Live RGB Histogram on canvas
  useEffect(() => {
    if (!analysis || !histogramCanvasRef.current) return;
    const canvas = histogramCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Dark sleek background
    ctx.fillStyle = '#0b0616';
    ctx.fillRect(0, 0, width, height);

    // Subtle gridlines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.lineWidth = 1;
    for (let x = 64; x < 256; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 20; y < height; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    const max = analysis.histogram.maxBin || 1;

    // Helper to draw channel curve
    const drawChannel = (bins: number[], color: string, fillStyle: string) => {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, height);

      for (let i = 0; i < 256; i++) {
        const val = bins[i] || 0;
        const normalizedY = height - (val / max) * (height - 6);
        ctx.lineTo(i, normalizedY);
      }

      ctx.lineTo(255, height);
      ctx.closePath();
      ctx.fillStyle = fillStyle;
      ctx.fill();

      ctx.strokeStyle = color;
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.restore();
    };

    // Composite Red, Green, Blue overlapping wave curves
    ctx.globalCompositeOperation = 'screen';
    drawChannel(analysis.histogram.r, '#f87171', 'rgba(239, 68, 68, 0.28)');
    drawChannel(analysis.histogram.g, '#4ade80', 'rgba(34, 197, 94, 0.28)');
    drawChannel(analysis.histogram.b, '#60a5fa', 'rgba(59, 130, 246, 0.28)');
    ctx.globalCompositeOperation = 'source-over';
  }, [analysis, showAnalysis]);

  if (!photo) return null;

  const currentIndex = photos.findIndex((p) => p.id === photo.id);

  const copyColor = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  return (
    <AnimatePresence>
      <div
        ref={lightboxRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Photo viewer: ${photo.title}`}
        data-lenis-prevent
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto overscroll-contain"
      >
        {/* Dark Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          aria-hidden="true"
          className="fixed inset-0 bg-[#05020c]/95 backdrop-blur-2xl"
        />

        {/* Top Floating Bar */}
        <div className="fixed top-5 inset-x-4 sm:inset-x-8 z-30 flex items-center justify-between pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-2 sm:gap-3 glass-panel px-3.5 py-1.5 rounded-full border border-white/10 shadow-lg shadow-black/40">
            <span className="font-space text-xs sm:text-sm font-bold text-white tracking-wide truncate max-w-[180px] sm:max-w-xs">
              {photo.title}
            </span>
            <span className="text-zinc-600">•</span>
            <span className="font-mono-code text-xs text-[#f97316]">
              {currentIndex + 1} / {photos.length}
            </span>
          </div>

          <div className="pointer-events-auto flex items-center gap-2">
            {/* Toggle Analysis HUD button */}
            <button
              onClick={() => setShowAnalysis(!showAnalysis)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono-code font-medium flex items-center gap-1.5 transition-all cursor-pointer border ${
                showAnalysis
                  ? 'bg-[#f97316]/20 border-[#f97316]/50 text-orange-200 shadow-md shadow-orange-950/40'
                  : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
              aria-label="Toggle live camera EXIF and color analysis panel"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Optics &amp; Palette Analysis</span>
              <span className="sm:hidden">Analysis</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors cursor-pointer border border-white/10"
              aria-label="Close photo viewer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Left / Right Nav Buttons */}
        <button
          onClick={onPrev}
          className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110 cursor-pointer border border-white/10 shadow-xl backdrop-blur-md"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={onNext}
          className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110 cursor-pointer border border-white/10 shadow-xl backdrop-blur-md"
          aria-label="Next photo"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Main Content Layout: Photo + Optional Analysis Dock */}
        <div className="relative z-20 max-w-7xl w-full my-auto flex flex-col lg:flex-row items-center justify-center gap-6 pt-16 pb-8">
          {/* Main Visual Image */}
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.28 }}
            className="flex-1 flex flex-col items-center justify-center max-w-4xl w-full"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-black/70 max-h-[72vh] flex items-center justify-center p-2.5 group">
              <img
                src={photo.image}
                alt={photo.title}
                className="max-h-[68vh] w-auto max-w-full object-contain rounded-2xl mx-auto shadow-2xl select-none"
              />

              {/* Minimal Bottom Bar */}
              <div className="absolute bottom-4 inset-x-4 flex items-center justify-between pointer-events-none">
                {photo.location && (
                  <span className="glass-panel px-3 py-1 rounded-full text-[11px] font-mono-code text-zinc-300 border border-white/10 flex items-center gap-1.5 backdrop-blur-md">
                    <MapPin className="w-3 h-3 text-[#f97316]" />
                    <span>{photo.location}</span>
                  </span>
                )}
                {photo.date && (
                  <span className="glass-panel px-3 py-1 rounded-full text-[11px] font-mono-code text-zinc-300 border border-white/10 flex items-center gap-1.5 backdrop-blur-md ml-auto">
                    <Calendar className="w-3 h-3 text-cyan-400" />
                    <span>{photo.date}</span>
                  </span>
                )}
              </div>
            </div>

            {photo.caption && (
              <p className="mt-3 text-xs sm:text-sm text-zinc-400 font-sans text-center max-w-xl">
                {photo.caption}
              </p>
            )}
          </motion.div>

          {/* Analysis & EXIF HUD Dock (Phase 4 Photography + Data Feature) */}
          <AnimatePresence>
            {showAnalysis && (
              <motion.aside
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.25 }}
                className="w-full lg:w-80 shrink-0 rounded-2xl glass-panel border border-white/15 bg-[#0e081e]/90 p-5 text-left flex flex-col gap-4 shadow-2xl shadow-purple-950/60 backdrop-blur-xl"
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-[#f97316]" />
                    <span className="font-space text-xs font-bold text-white tracking-wider uppercase">
                      Telemetry &amp; Optics
                    </span>
                  </div>
                  <span className="text-[10px] font-mono-code text-[#f97316] bg-[#f97316]/10 px-2 py-0.5 rounded border border-[#f97316]/30">
                    RAW EXIF
                  </span>
                </div>

                {/* Camera & Lens Parameters */}
                {photo.exif ? (
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono-code">
                    <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                      <span className="text-zinc-500 block text-[9px]">BODY</span>
                      <span className="text-zinc-200 font-semibold truncate block">
                        {photo.exif.camera || 'Mirrorless'}
                      </span>
                    </div>
                    <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                      <span className="text-zinc-500 block text-[9px]">OPTIC</span>
                      <span className="text-zinc-200 font-semibold truncate block">
                        {photo.exif.lens || 'Prime'}
                      </span>
                    </div>
                    <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                      <span className="text-zinc-500 block text-[9px]">FOCAL / APERTURE</span>
                      <span className="text-orange-300 font-semibold">
                        {photo.exif.focalLength} • {photo.exif.aperture}
                      </span>
                    </div>
                    <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                      <span className="text-zinc-500 block text-[9px]">ISO / SHUTTER</span>
                      <span className="text-cyan-300 font-semibold">
                        ISO {photo.exif.iso} • {photo.exif.shutter}
                      </span>
                    </div>
                  </div>
                ) : null}

                {/* Live RGB Histogram Section */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-[11px] font-mono-code">
                    <span className="text-zinc-400 flex items-center gap-1.5 font-semibold">
                      <Layers className="w-3 h-3 text-cyan-400" />
                      <span>RGB Histogram</span>
                    </span>
                    <span className="text-[10px] text-zinc-500">256 Bins • Subsampled</span>
                  </div>

                  <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#090514] p-1">
                    <canvas
                      ref={histogramCanvasRef}
                      width={256}
                      height={74}
                      className="w-full h-[74px] rounded-lg block"
                    />
                    {analyzing && (
                      <div className="absolute inset-0 bg-[#090514]/70 flex items-center justify-center text-[11px] font-mono-code text-zinc-400">
                        Analyzing Pixels...
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono-code text-zinc-500 px-1">
                    <span className="text-red-400/80">Red (R)</span>
                    <span className="text-green-400/80">Green (G)</span>
                    <span className="text-blue-400/80">Blue (B)</span>
                  </div>
                </div>

                {/* Dominant 5-Color Palette Section (K-Means Quantization) */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-[11px] font-mono-code">
                    <span className="text-zinc-400 flex items-center gap-1.5 font-semibold">
                      <Sparkles className="w-3 h-3 text-pink-400" />
                      <span>Dominant 5-Color Palette</span>
                    </span>
                    {analysis && (
                      <span className="text-[10px] text-zinc-500 font-mono-code">
                        {analysis.colorTemperature} Tone
                      </span>
                    )}
                  </div>

                  {analysis?.palette ? (
                    <div className="grid grid-cols-5 gap-1.5">
                      {analysis.palette.map((color, i) => {
                        const isCopied = copiedHex === color.hex;
                        return (
                          <button
                            key={i}
                            onClick={() => copyColor(color.hex)}
                            title={`Click to copy: ${color.hex} (${color.percent}%)`}
                            className="group/swatch flex flex-col items-center gap-1 p-1 rounded-xl bg-black/40 border border-white/10 hover:border-white/30 transition-all cursor-pointer relative"
                          >
                            <span
                              className="w-full aspect-square rounded-lg shadow-inner border border-white/20 block transition-transform group-hover/swatch:scale-105"
                              style={{ backgroundColor: color.hex }}
                            />
                            <span className="text-[9px] font-mono-code text-zinc-300">
                              {color.percent}%
                            </span>
                            <span className="text-[8px] font-mono-code text-zinc-500 truncate w-full text-center">
                              {color.hex.toUpperCase()}
                            </span>
                            {isCopied && (
                              <div className="absolute inset-0 bg-black/85 rounded-xl flex items-center justify-center text-emerald-400">
                                <Check className="w-3.5 h-3.5" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="h-14 rounded-xl bg-black/30 border border-white/5 animate-pulse" />
                  )}

                  <p className="text-[10px] font-mono-code text-zinc-500 text-center">
                    Click swatch to copy hex • Extracted via k-means
                  </p>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AnimatePresence>
  );
};
