import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for outer trailing reticle
  const springConfig = { damping: 26, stiffness: 280, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Responsive device check - ONLY active on pointer: fine (desktop / laptop mouse)
  useEffect(() => {
    const checkPointer = () => {
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsTouchDevice(!hasFinePointer || prefersReducedMotion);
    };

    checkPointer();
    const mediaQuery = window.matchMedia('(pointer: fine)');
    const handler = () => checkPointer();
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'button, a, input, textarea, select, [role="button"], [data-cursor="pointer"], .cursor-pointer'
        );
        setIsHovered(!!interactive);
      }
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);
    
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
  }, [isTouchDevice, isVisible, mouseX, mouseY]);

  // If touch device or reduced motion, render nothing
  if (isTouchDevice) return null;

  return (
    <div 
      id="custom-cursor-container" 
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Outer Floating Reticle Ring with Tactile Spring Expansion */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isPressed ? 0.8 : isHovered ? 1.6 : 1,
          opacity: isVisible ? 1 : 0,
          borderColor: isHovered ? 'rgba(85, 100, 71, 0.75)' : 'rgba(124, 143, 106, 0.45)',
          backgroundColor: isHovered 
            ? 'rgba(124, 143, 106, 0.12)' 
            : isPressed 
              ? 'rgba(85, 100, 71, 0.15)' 
              : 'rgba(124, 143, 106, 0.02)',
        }}
        transition={{
          scale: { type: 'spring', stiffness: 350, damping: 22 },
          opacity: { duration: 0.18 },
          backgroundColor: { duration: 0.2 },
          borderColor: { duration: 0.2 },
        }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#7C8F6A]/40 dark:border-[#A3B899]/50 backdrop-blur-[0.5px] pointer-events-none"
      />

      {/* Center Core Precision Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isPressed ? 1.4 : isHovered ? 0.6 : 1,
          opacity: isVisible ? (isHovered ? 0.5 : 1) : 0,
        }}
        transition={{
          scale: { type: 'spring', stiffness: 500, damping: 28 },
          opacity: { duration: 0.15 },
        }}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#556447] dark:bg-[#A3B899] shadow-[0_0_4px_rgba(85,100,71,0.5)] dark:shadow-[0_0_8px_rgba(163,184,153,0.6)] pointer-events-none"
      />
    </div>
  );
};
