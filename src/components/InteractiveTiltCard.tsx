import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, HTMLMotionProps } from 'motion/react';

interface InteractiveTiltCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  id?: string;
  maxTilt?: number;
  scaleOnHover?: number;
  scale?: number;
  spotlight?: boolean;
}

export const InteractiveTiltCard: React.FC<InteractiveTiltCardProps> = ({
  children,
  className = '',
  id,
  maxTilt = 6,
  scaleOnHover,
  scale,
  spotlight = true,
  ...props
}) => {
  const targetScale = scale ?? scaleOnHover ?? 1.02;
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Normalized mouse coordinates from center (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Pixel position for radial spotlight
  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);

  // Spring physics for buttery smooth tilt
  const springConfig = { damping: 20, stiffness: 280, mass: 0.6 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-maxTilt, maxTilt]);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(!window.matchMedia('(pointer: fine)').matches);
    };
    checkTouch();
    const media = window.matchMedia('(pointer: fine)');
    media.addEventListener('change', checkTouch);
    return () => media.removeEventListener('change', checkTouch);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const width = rect.width;
    const height = rect.height;
    const xPos = e.clientX - rect.left;
    const yPos = e.clientY - rect.top;

    spotX.set(xPos);
    spotY.set(yPos);
    mouseX.set((xPos - width / 2) / width);
    mouseY.set((yPos - height / 2) / height);
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      id={id}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        rotateX: isTouchDevice ? 0 : rotateX,
        rotateY: isTouchDevice ? 0 : rotateY,
        transformStyle: 'preserve-3d',
        ...props.style,
      }}
      whileHover={
        isTouchDevice
          ? undefined
          : {
              scale: targetScale,
              y: -7,
              transition: { type: 'spring', stiffness: 350, damping: 22 },
            }
      }
      whileTap={{ scale: 0.98 }}
      className={`relative overflow-hidden will-change-transform ${className}`}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Following Mouse inside the Card */}
      {spotlight && !isTouchDevice && isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            left: spotX,
            top: spotY,
            transform: 'translate(-50%, -50%)',
          }}
          className="absolute w-72 h-72 rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(124,143,106,0.12)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(163,184,153,0.16)_0%,transparent_70%)] z-0"
        />
      )}

      {/* Card Content with subtle 3D lift */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
};
