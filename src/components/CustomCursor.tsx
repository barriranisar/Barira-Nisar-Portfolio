import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouch] = useState(() => {
    if (typeof window === 'undefined') return false;
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches
    );
  });

  // Direct mouse coordinates for immediate tracking (zero lag)
  const rawMouseX = useMotionValue(-100);
  const rawMouseY = useMotionValue(-100);

  // Smooth springs for the outer lagging cosmic ring
  const trailingX = useSpring(rawMouseX, { damping: 22, stiffness: 190 });
  const trailingY = useSpring(rawMouseY, { damping: 22, stiffness: 190 });

  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      rawMouseX.set(e.clientX);
      rawMouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if target is an interactive or clickable element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('a') ||
          target.closest('button') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('select') ||
          target.closest('[role="button"]') ||
          target.closest('.cursor-pointer') ||
          target.closest('[data-cursor="pointer"]')
        );
        setIsPointer(isInteractive);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [rawMouseX, rawMouseY, isVisible, isTouch]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Lagging cosmic frosted ring */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-purple-400/50 backdrop-blur-[1px]"
        style={{
          x: trailingX,
          y: trailingY,
          translateX: '-50%',
          translateY: '-50%',
          mixBlendMode: isPointer ? 'difference' : 'normal'
        }}
        animate={{
          width: 38,
          height: 38,
          scale: isPointer ? 2.2 : isClicking ? 0.85 : 1,
          opacity: isPointer ? 0.35 : 0.8,
          backgroundColor: isPointer
            ? 'rgba(236, 72, 153, 0.4)'
            : 'rgba(139, 92, 246, 0.1)',
          borderColor: isPointer
            ? 'rgba(255, 255, 255, 0.9)'
            : 'rgba(168, 85, 247, 0.6)',
          boxShadow: isPointer
            ? '0 0 25px rgba(236, 72, 153, 0.5)'
            : '0 0 15px rgba(139, 92, 246, 0.25)'
        }}
        transition={{
          scale: { type: 'spring', damping: 20, stiffness: 300 },
          opacity: { duration: 0.18 },
          backgroundColor: { duration: 0.2 },
          borderColor: { duration: 0.2 }
        }}
      />

      {/* Small glowing core dot (tracks mouse coordinates with precision) */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full"
        style={{
          x: rawMouseX,
          y: rawMouseY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          width: isPointer ? 6 : 7,
          height: isPointer ? 6 : 7,
          scale: isClicking ? 1.5 : 1,
          backgroundColor: isPointer ? '#ffffff' : '#06b6d4',
          boxShadow: isPointer
            ? '0 0 10px #ffffff, 0 0 20px #ec4899'
            : '0 0 8px #06b6d4, 0 0 16px rgba(6, 182, 212, 0.6)'
        }}
        transition={{ duration: 0.12 }}
      />
    </>
  );
};
