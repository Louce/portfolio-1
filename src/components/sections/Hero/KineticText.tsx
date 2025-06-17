
'use client';

import type React from 'react';
import { motion } from 'framer-motion';
import { Text } from '@/components/primitives';

interface KineticTextProps {
  text: string;
  className?: string;
}

// Renamed from letterVariants to wordVariants, and simplified
const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1, // Stagger delay for each word
      type: 'spring',
      damping: 15,
      stiffness: 150,
    },
  }),
};

const wordWrapperVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // Stagger words if there are multiple (this will be used if wordVariants doesn't have its own delay)
      delayChildren: 0, // Start immediately once parent is visible
    },
  },
};


export const KineticText: React.FC<KineticTextProps> = ({ text, className }) => {
  const words = text.split(' '); // Split by space to get words

  return (
    <Text
      as="h1"
      className={className}
      aria-label={text}
      style={{ transform: 'translateZ(0px)' }} 
    >
      <motion.span // This is the container that will stagger its children (words)
        variants={wordWrapperVariants}
        initial="hidden"
        animate="visible"
        className="inline-block" 
      >
        {words.map((word, wordIndex) => (
          <motion.span
            key={`word-${wordIndex}`}
            custom={wordIndex} // Pass index for per-word delay in wordVariants
            variants={wordVariants}
            className="inline-block mr-[0.25em]" // Add some space between words if needed, adjust as per font
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Text>
  );
};
