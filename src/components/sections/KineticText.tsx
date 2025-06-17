
'use client';

import type React from 'react';
import { motion } from 'framer-motion';
import { Text } from '@/components/primitives';

interface KineticTextProps {
  text: string;
  className?: string;
}

const letterVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(1px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.03, // Faster stagger
      type: 'spring',
      damping: 15,
      stiffness: 200,
    },
  }),
};

const wordWrapperVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger words if there are multiple
      delayChildren: 0,
    },
  },
};


export const KineticText: React.FC<KineticTextProps> = ({ text, className }) => {
  const words = text.split(/(\s+)/); // Split by space, keeping spaces

  return (
    <Text
      as="h1"
      className={className}
      aria-label={text}
      style={{ transform: 'translateZ(0px)' }} // For potential 3D transforms if any parent has perspective
    >
      <motion.span
        variants={wordWrapperVariants}
        initial="hidden"
        animate="visible"
        className="inline-block" // Ensure the wrapper behaves as expected
      >
        {words.map((word, wordIndex) => {
          if (word.match(/\s+/)) { // If it's a space
            return <span key={`space-${wordIndex}`} className="inline-block w-2 md:w-4 lg:w-6" >{'\u00A0'}</span>;
          }
          return (
            <span key={`word-${wordIndex}`} className="inline-block">
              {word.split('').map((char, charIndex) => (
                <motion.span
                  key={`${char}-${wordIndex}-${charIndex}`}
                  custom={charIndex + wordIndex * word.length} // Global index for delay
                  variants={letterVariants}
                  className="inline-block origin-center"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          );
        })}
      </motion.span>
    </Text>
  );
};
