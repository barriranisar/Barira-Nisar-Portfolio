import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for cursor dot and outer glow ring
  const springX = useSpring(mouseX, { damping: 28, stiffness: 350 });
  const springY = useSpring(mouseY, { damping: 28, stiffness: 350 });

  const trailingX = useSpring(mouseX, { damping: 18, stiffness: 140 });
  const trailingY = useSpring(mouseY, { damping: 18, stiffness: 140 });

  useEffect(() => {
    // Detect touch device
    if (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches
    ) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if target is interactive
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('a') ||
          target.closest('button') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('select') ||
          target.closest('[role="button"]') ||
          target.closest('[data-cursor="pointer"]')
        );
        setIsPointer(isInteractive);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
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
  }, [mouseX, mouseY, isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Outer fluid trailing aura */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full border border-purple-400/50 mix-blend-screen"
        style={{
          x: trailingX,
          y: trailingY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isPointer ? 56 : 36,
          height: isPointer ? 56 : 36,
          backgroundColor: isPointer
            ? 'rgba(236, 72, 153, 0.15)'
            : 'rgba(139, 92, 246, 0.08)',
          borderColor: isPointer
            ? 'rgba(236, 72, 153, 0.6)'
            : 'rgba(139, 92, 246, 0.4)',
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />

      {/* Inner precise dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full shadow-lg"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isPointer ? 10 : 6,
          height: isPointer ? 10 : 6,
          backgroundColor: isPointer ? '#ec4899' : '#06b6d4',
          scale: isClicking ? 1.4 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
};

