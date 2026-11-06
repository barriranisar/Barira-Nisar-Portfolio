import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

interface HoloAvatarCardProps {
  imageSrc: string;
  name?: string;
}

export const HoloAvatarCard: React.FC<HoloAvatarCardProps> = ({ imageSrc }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Normalized cursor coordinates (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth physical spring physics for 3D tilt
  const springConfig = { damping: 22, stiffness: 220, mass: 0.6 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), springConfig);

  // Dynamic box shadow reacting to cursor tilt
  const shadowX = useTransform(x, [-0.5, 0.5], [-18, 18]);
  const shadowY = useTransform(y, [-0.5, 0.5], [-18, 18]);
  const dynamicBoxShadow = useMotionTemplate`
    ${shadowX}px ${shadowY}px 45px -10px rgba(168, 85, 247, 0.45),
    0 0 35px -5px rgba(6, 182, 212, 0.35)
  `;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      className="relative mx-auto max-w-md lg:max-w-none"
      style={{ perspective: '1000px' }}
    >
      {/* 3D Interactive Card Container */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          boxShadow: dynamicBoxShadow,
          transformStyle: 'preserve-3d',
          willChange: 'transform'
        }}
        className="relative rounded-3xl p-[2px] bg-gradient-to-tr from-purple-500 via-pink-500 to-cyan-400 cursor-pointer select-none transition-shadow duration-300"
      >
        {/* Card Canvas */}
        <div
          style={{ transformStyle: 'preserve-3d' }}
          className="relative rounded-[22px] overflow-hidden bg-[#0d081f] aspect-[4/5] flex items-center justify-center"
        >
          {/* Avatar Image Layer with 3D translation & high clarity */}
          <motion.img
            src={imageSrc}
            alt="Barira Nisar - Profile Portrait"
            style={{
              transform: 'translateZ(15px)',
              willChange: 'transform'
            }}
            className="w-full h-full object-cover select-none pointer-events-none"
            loading="lazy"
          />

          {/* Superimposed Minimal Typography: BARIRA NISAR */}
          <div className="absolute top-0 inset-x-0 pt-6 pb-12 bg-gradient-to-b from-black/60 via-black/20 to-transparent flex justify-center z-20 pointer-events-none">
            <motion.span
              style={{
                transform: 'translateZ(32px)',
                willChange: 'transform'
              }}
              className="font-space font-extrabold uppercase tracking-[0.24em] text-white text-base sm:text-lg lg:text-xl drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
            >
              BARIRA NISAR
            </motion.span>
          </div>
        </div>
      </motion.div>

      {/* Reactive Ambient Background Glow */}
      <motion.div
        style={{ transform: 'translateZ(-20px)' }}
        className="absolute -inset-4 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 rounded-3xl blur-2xl -z-10 pointer-events-none opacity-30"
      />
    </div>
  );
};
