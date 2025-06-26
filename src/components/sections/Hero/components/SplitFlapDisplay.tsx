'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Props for the AnimatedChar component.
 */
interface AnimatedCharProps {
  char: string;
  className?: string;
}

/**
 * An individual animated character component.
 * It uses Framer Motion's AnimatePresence to create a "flipping" effect
 * when the character value changes.
 */
const AnimatedChar: React.FC<AnimatedCharProps> = ({ char, className }) => (
  <motion.span
    // The key is crucial for AnimatePresence to detect when the character changes.
    key={char}
    initial={{ y: '100%', opacity: 0, rotateX: -90 }}
    animate={{ y: '0%', opacity: 1, rotateX: 0 }}
    exit={{ y: '-100%', opacity: 0, rotateX: 90 }}
    transition={{ duration: 0.4, ease: 'easeInOut' }}
    // Position absolute is used to stack characters during the animation transition.
    className={cn("absolute inset-0 flex items-center justify-center", className)}
    style={{ transformStyle: 'preserve-3d' }}
  >
    {/* Use a non-breaking space to ensure spaces occupy layout space. */}
    {char === ' ' ? '\u00A0' : char}
  </motion.span>
);
AnimatedChar.displayName = 'AnimatedChar';


/**
 * Props for the SplitFlapDisplay component.
 */
interface SplitFlapDisplayProps {
  phrase: string;
}

/**
 * A container component that renders a phrase using the AnimatedChar component.
 * It creates an effect reminiscent of a split-flap (airport clock) display.
 * It correctly applies specific colors to the separators and the chromatic
 * aberration effect to the letters.
 */
export const SplitFlapDisplay: React.FC<SplitFlapDisplayProps> = ({ phrase }) => {
  const characters = phrase.split('');

  return (
    <div className="flex items-center justify-center gap-x-1 text-xl sm:text-2xl md:text-3xl font-light tracking-wider text-center tabular-nums">
      {characters.map((char, index) => {
        let charStyle = 'text-chromatic-aberration';
        
        // This logic correctly applies distinct primary and accent colors to the slashes.
        if (char === '/' && index > 0 && characters[index - 1] === '/') {
          // This is the RIGHT slash. It should be magenta (accent).
          charStyle = 'text-accent'; 
        } else if (char === '/' && index < characters.length - 1 && characters[index + 1] === '/') {
          // This is the LEFT slash. It should be cyan (primary).
          charStyle = 'text-primary';
        }

        return (
          // Each character is wrapped in a container to manage its animation state.
          <div key={index} className="relative h-12 w-[0.7em]">
            <AnimatePresence>
              <AnimatedChar char={char} className={charStyle} />
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
SplitFlapDisplay.displayName = 'SplitFlapDisplay';
