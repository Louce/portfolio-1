
'use client';

import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { Text } from '@/components/primitives';

interface KineticTextProps {
  text: string;
  className?: string;
}

const KineticLetter: React.FC<{ char: string; index: number; mouseX: MotionValue<number>; mouseY: MotionValue<number> }> = ({ char, index, mouseX, mouseY }) => {
  const springConfig = { damping: 15, stiffness: 200, mass: 0.5 };
  const letterMouseX = useSpring(mouseX, springConfig);
  const letterMouseY = useSpring(mouseY, springConfig);

  const dx = useTransform(letterMouseX, (latestX) => (latestX - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0)) * 0.02 * (index % 2 === 0 ? 1 : -1) );
  const dy = useTransform(letterMouseY, (latestY) => (latestY - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0)) * 0.03 * (index % 2 === 0 ? 1 : -1) );
  
  const rotate = useTransform(dx, [-20, 20], [-3, 3]); 
  const scale = useTransform(dy, [-20, 20], [0.98, 1.02]); 

  if (char === ' ') {
    return <span className="inline-block w-2 md:w-4 lg:w-6" />;
  }

  return (
    <motion.span
      className="inline-block origin-center"
      style={{ x: dx, y: dy, rotate, scale, perspective: 800 }} 
      initial={{ opacity: 0, y: 30, scale: 0.7, rotateX: -90 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      transition={{ 
        type: "spring", 
        damping: 15, 
        stiffness: 150, 
        mass: 0.8, 
        delay: index * 0.05 
      }} 
    >
      {char}
    </motion.span>
  );
};

export const KineticText: React.FC<KineticTextProps> = ({ text, className }) => {
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <Text
      as="h1"
      className={className}
      aria-label={text}
      style={{ transform: 'translateZ(0px)' }} 
    >
      {text.split('').map((char, index) => (
        <KineticLetter key={`${char}-${index}`} char={char} index={index} mouseX={mouseX} mouseY={mouseY} />
      ))}
    </Text>
  );
};
