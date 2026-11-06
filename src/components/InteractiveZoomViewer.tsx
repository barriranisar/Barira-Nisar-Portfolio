import React, { useState, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, Minimize2, X } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

interface InteractiveZoomViewerProps {
  src: string;
  alt: string;
  className?: string;
}

export const InteractiveZoomViewer: React.FC<InteractiveZoomViewerProps> = ({
  src,
  alt,
  className = '',
}) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  const dragStartRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset zoom & pan when image changes or fullscreen toggles
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [src, isFullscreen]);

  // Handle wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const zoomFactor = 0.25;
    const newScale = e.deltaY < 0 ? scale + zoomFactor : scale - zoomFactor;
    const clampedScale = Math.min(Math.max(newScale, 1), 3.5);

    setScale(clampedScale);
    if (clampedScale === 1) {
      setPosition({ x: 0, y: 0 });
    }
  };

  // Pointer drag interactions
  const handlePointerDown = (clientX: number, clientY: number) => {
    if (scale <= 1) return;
    setIsDragging(true);
    setHasMoved(false);
    dragStartRef.current = {
      x: clientX - position.x,
      y: clientY - position.y,
    };
  };

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!isDragging || scale <= 1) return;
    setHasMoved(true);

    // Limit pan boundaries based on current scale
    const maxPanX = (scale - 1) * 220;
    const maxPanY = (scale - 1) * 320;

    const newX = clientX - dragStartRef.current.x;
    const newY = clientY - dragStartRef.current.y;

    setPosition({
      x: Math.max(Math.min(newX, maxPanX), -maxPanX),
      y: Math.max(Math.min(newY, maxPanY), -maxPanY),
    });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Click to toggle 1x <-> 2.2x
  const handleImageClick = () => {
    if (hasMoved) return; // Ignore click if user was dragging
    if (scale === 1) {
      setScale(2.2);
    } else {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((prev) => Math.min(prev + 0.5, 3.5));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((prev) => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFullscreen(!isFullscreen);
  };

  // Shared inner zoom canvas
  const renderViewerContent = (isFull: boolean) => (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onMouseDown={(e) => handlePointerDown(e.clientX, e.clientY)}
      onMouseMove={(e) => handlePointerMove(e.clientX, e.clientY)}
      onMouseUp={handlePointerUp}
      onTouchStart={(e) => handlePointerDown(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchMove={(e) => handlePointerMove(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchEnd={handlePointerUp}
      className={`relative w-full h-full flex items-center justify-center overflow-hidden select-none ${
        scale === 1
          ? 'cursor-zoom-in'
          : isDragging
          ? 'cursor-grabbing'
          : 'cursor-grab'
      }`}
    >
      {/* Zoomable Image */}
      <img
        src={src}
        alt={alt}
        onClick={handleImageClick}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0px) scale(${scale})`,
          transition: isDragging ? 'none' : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className={`max-w-full max-h-full object-contain rounded-lg pointer-events-auto ${
          isFull ? 'max-h-[85vh]' : 'max-h-[380px]'
        }`}
        draggable={false}
      />

      {/* Floating Zoom Controls Bar */}
      <div className="absolute top-3 right-3 z-30 flex items-center gap-1 p-1 rounded-2xl glass-panel bg-black/60 border border-white/15 shadow-xl backdrop-blur-md">
        <button
          onClick={handleZoomIn}
          disabled={scale >= 3.5}
          className="p-1.5 rounded-xl text-zinc-300 hover:text-white hover:bg-white/10 disabled:opacity-30 transition-colors cursor-pointer"
          title="Zoom In"
          aria-label="Zoom in"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <button
          onClick={handleZoomOut}
          disabled={scale <= 1}
          className="p-1.5 rounded-xl text-zinc-300 hover:text-white hover:bg-white/10 disabled:opacity-30 transition-colors cursor-pointer"
          title="Zoom Out"
          aria-label="Zoom out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        {scale > 1 && (
          <button
            onClick={handleResetZoom}
            className="flex items-center gap-1 px-2 py-1 rounded-xl text-[11px] font-mono-code text-pink-400 hover:text-pink-300 bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 transition-colors cursor-pointer"
            title="Reset Zoom (1x)"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{Math.round(scale * 10) / 10}x</span>
          </button>
        )}

        <button
          onClick={toggleFullscreen}
          className="p-1.5 rounded-xl text-zinc-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title={isFull ? 'Exit Full Screen' : 'Full Screen View'}
          aria-label={isFull ? 'Exit full screen' : 'Full screen view'}
        >
          {isFull ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Helper text pill at bottom */}
      <div className="absolute bottom-2.5 inset-x-0 flex justify-center pointer-events-none">
        <span className="px-3 py-1 rounded-full text-[10px] font-mono-code bg-black/70 backdrop-blur-md text-zinc-400 border border-white/10">
          {scale === 1 ? 'Click or scroll to zoom • Full resolution' : 'Drag to pan across UI spec'}
        </span>
      </div>
    </div>
  );

  return (
    <>
      {/* Standard In-Modal Container */}
      <div
        className={`relative rounded-2xl overflow-hidden bg-black/50 border border-white/10 flex items-center justify-center p-2 sm:p-3 ${className}`}
      >
        {renderViewerContent(false)}
      </div>

      {/* Fullscreen High-Resolution Inspection Overlay */}
      <AnimatePresence>
        {isFullscreen && (
          <div
            data-lenis-prevent
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8 bg-[#05030b]/95 backdrop-blur-2xl"
          >
            {/* Top Close Button for Fullscreen */}
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-6 right-6 z-40 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Exit fullscreen viewer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title / Info pill */}
            <div className="absolute top-6 left-6 z-40 flex items-center gap-2 glass-panel px-4 py-2 rounded-full border border-white/10">
              <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
              <span className="font-space text-xs font-bold text-white tracking-wide truncate max-w-[240px] sm:max-w-md">
                {alt}
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-[10px] font-mono-code text-cyan-400">Deep Inspection</span>
            </div>

            {/* Fullscreen Canvas Container */}
            <div className="relative w-full h-full max-w-6xl max-h-[90vh] rounded-3xl overflow-hidden glass-panel border border-white/15 bg-black/70 shadow-2xl flex items-center justify-center p-4">
              {renderViewerContent(true)}
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
