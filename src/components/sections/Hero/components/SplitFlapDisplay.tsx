'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

// The set of characters the display can "roll" through.
// Having the space at the start helps with the animation logic for empty characters.
const CHARS = " /ABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface CharacterProps {
  value: string;
  height: number;
  charIndex: number;
  fullPhrase: string;
}

/**
 * A single character in the split-flap display. It "rolls" to the target character.
 */
const Character: React.FC<CharacterProps> = React.memo(({ value, height, charIndex, fullPhrase }) => {
  // Find the index of the target character in our character set.
  const charIndexInSet = CHARS.indexOf(value);
  
  // Use a spring animation for a natural, physical feel.
  const y = useSpring(0, {
    stiffness: 200,
    damping: 25,
    mass: 0.5,
  });

  // When the target character ('value') changes, update the spring's target 'y' position.
  useLayoutEffect(() => {
    if (height > 0) {
      y.set(-charIndexInSet * height);
    }
  }, [value, height, charIndexInSet, y]);

  // Determine the styling for the character based on its value.
  const getCharStyle = () => {
    if (value === '/') {
      // Both slashes will now use the vibrant 'accent' color for a unified look.
      return 'text-accent';
    }
    if (value === ' ') {
      return ''; // No style for space
    }
    // Default styling for letters, applying the chromatic aberration effect.
    return 'text-chromatic-aberration';
  };

  return (
    <div style={{ height }} className={cn("overflow-hidden", getCharStyle())}>
      <motion.div style={{ y }} className="flex flex-col items-center">
        {CHARS.split("").map((char, i) => (
          <span key={i} style={{ height }} className="flex items-center justify-center">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </motion.div>
    </div>
  );
});
Character.displayName = "Character";

interface SplitFlapDisplayProps {
  phrases: string[];
  className?: string;
  phraseDuration?: number;
}


/**
 * A component that displays a series of phrases with a split-flap "airport clock" animation effect.
 */
export const SplitFlapDisplay: React.FC<SplitFlapDisplayProps> = ({
  phrases,
  className,
  phraseDuration = 4000,
}) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  // Measure the component's height once it's mounted to ensure characters align perfectly.
  useLayoutEffect(() => {
    if (ref.current) {
      setHeight(ref.current.clientHeight);
    }
  }, []);

  // Set up an interval to cycle through the provided phrases.
  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, phraseDuration);
    return () => clearInterval(interval);
  }, [phrases.length, phraseDuration]);

  // Calculate the centered phrase. This is crucial for stability.
  const maxLength = Math.max(...phrases.map(p => p.length));
  const currentPhrase = phrases[phraseIndex];
  const paddingNeeded = maxLength - currentPhrase.length;
  const leftPadding = Math.floor(paddingNeeded / 2);
  const centeredPhrase = ' '.repeat(leftPadding) + currentPhrase;

  return (
    <div ref={ref} className={cn("flex justify-center items-center", className)} aria-label={currentPhrase}>
      {/* Always render 'maxLength' characters to keep the component stable. */}
      {Array.from({ length: maxLength }).map((_, index) => {
        const char = (centeredPhrase[index] || ' ').toUpperCase();
        // The full phrase is padded to ensure the styling logic for the slashes always works correctly.
        const fullPaddedPhrase = centeredPhrase.padEnd(maxLength, ' '); 
        return <Character key={index} value={char} height={height} charIndex={index} fullPhrase={fullPaddedPhrase} />;
      })}
    </div>
  );
};
SplitFlapDisplay.displayName = "SplitFlapDisplay";
