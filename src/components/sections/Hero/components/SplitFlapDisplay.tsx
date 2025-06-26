'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Props for the AnimatedChar component.
 */
interface AnimatedCharProps {
  char: string;
  charIndex: number; // Index of character in the full phrase
  fullPhrase: string; // The entire phrase for context
}

/**
 * An individual character reel for the slot-machine style display.
 * It animates vertically when the character changes.
 * This component also handles the specific coloring for letters vs. separators.
 */
const AnimatedChar: React.FC<AnimatedCharProps> = ({ char, charIndex, fullPhrase }) => {
  let charStyle = 'text-chromatic-aberration'; // Default style for letters

  // Logic to correctly apply distinct primary and accent colors to the slashes.
  if (char === '/' && charIndex > 0 && fullPhrase[charIndex - 1] === '/') {
    // This is the RIGHT slash. It should be magenta (accent).
    charStyle = 'text-accent';
  } else if (char === '/' && charIndex < fullPhrase.length - 1 && fullPhrase[charIndex + 1] === '/') {
    // This is the LEFT slash. It should be cyan (primary).
    charStyle = 'text-primary';
  }

  return (
    // The container acts as a mask with overflow:hidden.
    <div className="relative h-full w-[0.7em] overflow-hidden">
      <AnimatePresence>
        <motion.span
          // The key is crucial for AnimatePresence to detect when the character changes.
          key={char + charIndex}
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className={cn("absolute inset-0 flex items-center justify-center h-full w-full", charStyle)}
        >
          {/* Use a non-breaking space to ensure spaces occupy layout space. */}
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};
AnimatedChar.displayName = 'AnimatedChar';

/**
 * Props for the SplitFlapDisplay component.
 */
interface SplitFlapDisplayProps {
  phrase: string;
}

/**
 * A "slot-machine" or "airport clock" style display that animates characters vertically.
 * This component correctly centers the text regardless of length and applies specific
 * styles for letters and separators.
 */
export const SplitFlapDisplay: React.FC<SplitFlapDisplayProps> = ({ phrase }) => {
  const characters = phrase.split('');

  return (
    // The main container sets the font styles and overall layout.
    <div className="flex items-center justify-center h-12 text-xl sm:text-2xl md:text-3xl font-light tracking-wider text-center tabular-nums">
      {characters.map((char, index) => (
        // Each character is rendered in its own animated component.
        <AnimatedChar key={index} char={char} charIndex={index} fullPhrase={phrase} />
      ))}
    </div>
  );
};
SplitFlapDisplay.displayName = 'SplitFlapDisplay';
