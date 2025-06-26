
'use client';

import React, { useEffect, useMemo } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

// All possible characters in the animation reel.
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,':()?!@#$ ".split("");

/**
 * A single character "ticker" that animates by scrolling through the CHARS array.
 * @param {object} props
 * @param {string} props.anikey - A unique key to trigger re-animation.
 * @param {string} props.children - The target character to display.
 * @param {string} [props.className] - Optional class name for styling the character.
 * @returns {React.ReactElement} A single animated character.
 */
const Ticker = ({ anikey, children: targetChar, className: passedClassName }) => {
  const targetIndex = CHARS.indexOf(targetChar) ?? 0;

  // Use a spring for a natural, physical feel.
  const spring = useSpring(0, {
    damping: 12,
    stiffness: 150,
    mass: 0.5,
  });

  // Map the spring value to a transform Y value for the scrolling effect.
  const y = useTransform(spring, (val) => `${-val * 100}%`);

  useEffect(() => {
    // Animate the spring to the target character's index.
    spring.set(targetIndex);
  }, [spring, targetIndex]);

  return (
    <div key={anikey} className="h-full overflow-hidden">
      <motion.span
        style={{ y }}
        className={cn("inline-block tabular-nums", passedClassName)}
      >
        {CHARS.map((char) => (
          <span className="block" key={char}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </motion.span>
    </div>
  );
};
Ticker.displayName = "Ticker";

/**
 * A component that displays a string with a "split-flap" or "slot machine" animation effect.
 * It animates each character individually and ensures the entire phrase is centered.
 * @param {object} props
 * @param {string} props.phrase - The string to display.
 * @param {number} props.maxLength - The maximum length of any phrase in the cycle, for centering.
 * @param {string} [props.className] - Optional class name for styling.
 * @returns {React.ReactElement} The animated display component.
 */
export const SplitFlapDisplay = ({ phrase, maxLength, className }) => {
  const key = useMemo(() => Math.random(), [phrase]);

  const characters = useMemo(() => {
    // Pad the phrase with spaces to ensure it is always centered based on maxLength.
    const diff = maxLength - phrase.length;
    const padding = " ".repeat(Math.floor(diff / 2));
    const finalPhrase = `${padding}${phrase}${padding}${diff % 2 === 1 ? ' ' : ''}`;
    return finalPhrase.split('');
  }, [phrase, maxLength]);
  
  return (
    <div
      className={cn("flex h-full items-center justify-center text-center", className)}
    >
      {characters.map((char, index) => {
          let charStyle = 'text-chromatic-aberration'; 
          if (char.trim() === '') {
              charStyle = ''; 
          } else if (char === '/') {
              if (index > 0 && characters[index - 1] === '/') {
                  charStyle = 'text-accent/70'; // Second slash
              } else {
                  charStyle = 'text-primary/70'; // First slash
              }
          }
          
          return (
            <div key={`${key}-${index}`} className="h-full">
              <Ticker anikey={`${key}-${index}`} className={charStyle}>
                {char}
              </Ticker>
            </div>
          );
      })}
    </div>
  );
};
SplitFlapDisplay.displayName = "SplitFlapDisplay";
