import React from 'react';

export const Canvas3DHeroFallback: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`relative w-full h-full flex items-center justify-center pointer-events-none ${className}`}
    aria-hidden="true"
  >
    {/* Ambient Static Cosmic Fallback */}
    <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-purple-600/20 via-pink-600/15 to-cyan-500/20 blur-3xl animate-pulse-slow" />
    <div className="w-52 h-52 sm:w-72 sm:h-72 rounded-full border border-purple-500/20 opacity-40 shadow-[0_0_60px_rgba(139,92,246,0.15)]" />
  </div>
);
