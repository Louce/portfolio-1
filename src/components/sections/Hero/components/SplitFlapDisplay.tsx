'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { cn } from '@/lib';

// The set of characters the display can "roll" through.
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// The final set includes special characters used in the phrases.
const ALL_CHARS = `${CHARS} /`;

interface SplitFlapDisplayProps {
  phrases: string[];
  className?: string;
  phraseDuration?: number;
}

/**
 * A single character in the split-flap display. It "rolls" to the target character.
 */
const Character = React.memo(({ value, height }: { value: string; height: number }) => {
  // Find the index of the target character in our character set.
  const charIndex = ALL_CHARS.indexOf(value);
  
  // Use a spring animation for a natural, physical feel.
  const y = useSpring(-charIndex * height, {
    stiffness: 200,
    damping: 25,
    mass: 0.5,
  });

  // When the target character ('value') changes, update the spring's target 'y' position.
  useEffect(() => {
    y.set(-charIndex * height);
  }, [value, height, charIndex, y]);

  return (
    <div style={{ height }} className="overflow-hidden">
      <motion.div style={{ y }} className="flex flex-col items-center">
        {ALL_CHARS.split("").map((char, i) => (
          <span key={i} style={{ height }} className="flex items-center justify-center">
            {/* Use a non-breaking space for spaces to maintain layout integrity */}
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </motion.div>
    </div>
  );
});
Character.displayName = "Character";

/**
 * A component that displays a series of phrases with a split-flap "airport clock" animation effect.
 */
export const SplitFlapDisplay: React.FC<SplitFlapDisplayProps> = ({
  phrases,
  className,
  phraseDuration = 3000,
}) => {
  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  // Measure the component's height once it's mounted to ensure characters align perfectly.
  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.clientHeight);
    }
  }, []);

  // Set up an interval to cycle through the provided phrases.
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => {
        const currentIndex = phrases.indexOf(prev);
        const nextIndex = (currentIndex + 1) % phrases.length;
        return phrases[nextIndex];
      });
    }, phraseDuration);

    return () => clearInterval(interval);
  }, [phrases, phraseDuration]);
  
  const maxLength = Math.max(...phrases.map(p => p.length));
  // Center the current phrase by adding padding to both sides.
  const diff = maxLength - currentPhrase.length;
  const paddingStart = Math.floor(diff / 2);
  const paddingEnd = Math.ceil(diff / 2);
  const paddedPhrase = ' '.repeat(paddingStart) + currentPhrase + ' '.repeat(paddingEnd);

  return (
    <div 
      ref={ref} 
      className={cn("flex justify-center items-center overflow-hidden h-full", className)} 
      aria-label={currentPhrase}
    >
       {/* Only render characters after the height has been measured to prevent glitches. */}
       {height > 0 && paddedPhrase.split("").map((char, index) => (
        <Character key={index} value={char.toUpperCase()} height={height} />
      ))}
    </div>
  );
};
SplitFlapDisplay.displayName = "SplitFlapDisplay";
