
'use client';

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Text, Flex } from '@/components/primitives';

interface KineticTextProps {
  text: string;
  className?: string;
}

const KineticLetter: React.FC<{ char: string; index: number; mouseX: any; mouseY: any }> = ({ char, index, mouseX, mouseY }) => {
  // Create spring animations for x and y coordinates
  const springConfig = { damping: 15, stiffness: 200, mass: 0.5 };
  const letterX = useSpring(mouseX, springConfig);
  const letterY = useSpring(mouseY, springConfig);

  // Transform mouse position to create a subtle parallax or distortion effect
  // The effect strength can be adjusted by changing the multiplier
  const dx = useTransform(letterX, (latestX) => (latestX - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0)) * 0.02 * (index % 2 === 0 ? 1 : -1) );
  const dy = useTransform(letterY, (latestY) => (latestY - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0)) * 0.03 * (index % 2 === 0 ? 1 : -1) );

  // Add a subtle rotation or scale effect
  const rotate = useTransform(dx, [-20, 20], [-5, 5]);
  const scale = useTransform(dy, [-20, 20], [0.95, 1.05]);

  if (char === ' ') {
    return <span className="inline-block w-2 md:w-4 lg:w-6" />; // Adjust space width
  }

  return (
    <motion.span
      className="inline-block origin-center"
      style={{ x: dx, y: dy, rotate, scale }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
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
      style={{ transform: 'translateZ(0px)' }} // Added to promote to its own compositing layer
    >
      {text.split('').map((char, index) => (
        <KineticLetter key={`${char}-${index}`} char={char} index={index} mouseX={mouseX} mouseY={mouseY} />
      ))}
    </Text>
  );
};
