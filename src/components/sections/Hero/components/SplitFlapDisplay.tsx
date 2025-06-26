
'use client';

import React, { useMemo } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

// All possible characters in the animation reel.
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,':()?!@#$ ".split("");

/**
 * A single character "ticker" that animates by scrolling through the CHARS array.
 * This version uses a more robust layout where each character in the reel
 * occupies the full height of the container, making percentage-based transforms reliable.
 * @param {object} props
 * @param {string} props.anikey - A unique key to trigger re-animation.
 * @param {string} props.children - The target character to display.
 * @param {string} [props.className] - Optional class name for styling the character.
 * @returns {React.ReactElement} A single animated character.
 */
const Ticker = ({ anikey, children: targetChar, className: passedClassName }) => {
  const targetIndex = CHARS.indexOf(targetChar) ?? 0;

  // useSpring will animate from its last value to the new initial value on re-render.
  const spring = useSpring(targetIndex, {
    damping: 12,
    stiffness: 150,
    mass: 0.5,
  });

  // Transform the spring value (the target index) into a `y` transform.
  // Since each character span inside is 100% height, `y: -val * 100%`
  // correctly shifts the strip up by `val` items.
  const y = useTransform(spring, (val) => `-${val * 100}%`);

  return (
    <div key={anikey} className="h-full overflow-hidden">
      <motion.div style={{ y }} className={cn("h-full", passedClassName)}>
        {CHARS.map((char) => (
          <span
            key={char}
            className="flex h-full w-full items-center justify-center tabular-nums"
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </motion.div>
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
