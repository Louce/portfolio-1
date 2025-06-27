'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * The set of characters the display can "roll" through.
 * Having the space at the start helps with animation logic for empty characters.
 */
const CHARS = " /ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/**
 * Props for the individual Character component.
 */
interface CharacterProps {
  /** The target character to display. */
  value: string;
  /** The height of the character slot, used for animation calculations. */
  height: number;
  /** The index of this character within the full phrase. */
  charIndex: number;
  /** The complete, centered phrase being displayed. */
  fullPhrase: string;
}

/**
 * A single character in the split-flap display. It "rolls" through `CHARS` to
 * land on the target `value`, animated with a Framer Motion spring for a
 * natural, physical feel. It also handles special coloring for separators.
 */
const Character: React.FC<CharacterProps> = React.memo(({ value, height, charIndex, fullPhrase }) => {
  const charIndexInSet = CHARS.indexOf(value);
  const y = useSpring(0, {
    stiffness: 200,
    damping: 25,
    mass: 0.5,
  });

  useLayoutEffect(() => {
    // Animate the spring to the correct character position.
    if (height > 0) {
      y.set(-charIndexInSet * height);
    }
  }, [value, height, charIndexInSet, y]);

  /**
   * Determines the appropriate text color class for the character.
   * Letters get a chromatic aberration effect, while separators get specific theme colors.
   */
  const getCharStyle = () => {
    if (value !== '/') {
      return value === ' ' ? '' : 'text-chromatic-aberration';
    }

    // Find the indices of all separators to determine which one this is.
    const firstSeparatorIndex = fullPhrase.indexOf('//');
    const secondSeparatorIndex = fullPhrase.indexOf('//', firstSeparatorIndex + 1);

    if (firstSeparatorIndex !== -1 && (charIndex === firstSeparatorIndex || charIndex === firstSeparatorIndex + 1)) {
      return 'text-primary'; // Use primary color (cyan) for the first separator.
    }
    if (secondSeparatorIndex !== -1 && (charIndex === secondSeparatorIndex || charIndex === secondSeparatorIndex + 1)) {
      return 'text-accent'; // Use accent color (magenta) for the second separator.
    }
    return 'text-primary'; // Fallback for any other slashes.
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
  /** An array of phrases to cycle through. */
  phrases: string[];
  /** Optional additional class names for styling the container. */
  className?: string;
  /** The duration (in ms) each phrase is displayed before cycling to the next. */
  phraseDuration?: number;
}

/**
 * A component that displays a series of phrases with a split-flap "airport clock"
 * animation effect. It ensures phrases are centered and the layout remains stable
 * during transitions by padding all phrases to a consistent length. Its single
 * responsibility is to manage this complex, multi-character animation.
 */
export const SplitFlapDisplay: React.FC<SplitFlapDisplayProps> = ({
  phrases,
  className,
  phraseDuration = 4000,
}) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  // Measure the component's height once mounted to ensure characters align perfectly.
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

  // Pad the current phrase to the length of the longest phrase to ensure centering and stability.
  const maxLength = Math.max(...phrases.map(p => p.length));
  const currentPhrase = phrases[phraseIndex];
  const paddingNeeded = maxLength - currentPhrase.length;
  const leftPadding = Math.floor(paddingNeeded / 2);
  const centeredPhrase = ' '.repeat(leftPadding) + currentPhrase;

  return (
    <div ref={ref} className={cn("flex justify-center items-center h-full", className)} aria-label={currentPhrase}>
      {/* Always render 'maxLength' characters to keep the component layout stable. */}
      {Array.from({ length: maxLength }).map((_, index) => {
        const char = (centeredPhrase[index] || ' ').toUpperCase();
        const fullPaddedPhrase = centeredPhrase.padEnd(maxLength, ' '); 
        return <Character key={index} value={char} height={height} charIndex={index} fullPhrase={fullPaddedPhrase} />;
      })}
    </div>
  );
};
SplitFlapDisplay.displayName = "SplitFlapDisplay";
