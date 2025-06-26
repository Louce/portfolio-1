
'use client';

import React, { useEffect } from 'react';
import { motion, useAnimate } from 'framer-motion';
import { cn } from '@/lib/utils';

// A defined set of characters for the ticker reel animation.
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789// ";
// The height of each character in 'em' units, tied to the font size for responsiveness.
const CHARACTER_HEIGHT_EM = 1.2;
// A quick, snappy animation duration.
const ANIMATION_DURATION = 0.25;

/**
 * Props for the TickerCharacter component.
 */
interface TickerCharacterProps {
  /** The character to display. */
  char: string;
  /** Optional class names for styling. */
  className?: string;
}

/**
 * An animated character component that mimics one column of a ticker or slot machine.
 * It scrolls a "reel" of characters to the correct position.
 * This component is memoized for performance.
 */
const TickerCharacter: React.FC<TickerCharacterProps> = React.memo(({ char, className }) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    // Find the index of the character in our reel.
    const charIndex = CHARS.indexOf(char.toUpperCase());
    // Calculate the vertical offset to scroll to.
    const yOffset = -charIndex * CHARACTER_HEIGHT_EM;
    
    // Animate the 'y' property to the calculated offset.
    animate(scope.current, { y: `${yOffset}em` }, { duration: ANIMATION_DURATION, ease: 'easeOut' });
  }, [char, animate, scope]);
  
  // Use a non-breaking space for empty characters to maintain layout integrity.
  const displayChars = CHARS.split('').map(c => c === ' ' ? '\u00A0' : c);

  return (
    <div 
      className={cn("h-full overflow-hidden", className)} 
      style={{ height: `${CHARACTER_HEIGHT_EM}em` }}
    >
      <motion.div ref={scope} className="flex flex-col">
        {displayChars.map((c, i) => (
          <span key={i} className="flex items-center justify-center" style={{ height: `${CHARACTER_HEIGHT_EM}em` }}>
            {c}
          </span>
        ))}
      </motion.div>
    </div>
  );
});
TickerCharacter.displayName = 'TickerCharacter';

/**
 * Props for the SplitFlapDisplay component.
 */
interface SplitFlapDisplayProps {
  /** The full phrase to display and animate. */
  phrase: string;
}

/**
 * A container component that renders a phrase using the TickerCharacter animation.
 * It handles the logic for applying specific styles to different characters,
 * such as the multi-colored separator.
 */
export const SplitFlapDisplay: React.FC<SplitFlapDisplayProps> = ({ phrase }) => {
  const characters = phrase.split('');

  return (
    <div className="flex items-center justify-center gap-x-1 text-xl sm:text-2xl md:text-3xl font-light text-foreground tracking-wider text-center tabular-nums">
      {characters.map((char, index) => {
        let charStyle = 'text-chromatic-aberration';
        
        // This logic correctly applies the distinct primary and accent colors to the slashes.
        if (char === '/' && index < characters.length - 1 && characters[index + 1] === '/') {
          // This is the first '/' of a '//' pair
          charStyle = 'text-primary/70';
        } else if (char === '/' && index > 0 && characters[index - 1] === '/') {
          // This is the second '/' of a '//' pair
          charStyle = 'text-accent/70';
        } else if (char.trim() === '') {
          // Make spaces transparent but ensure they still occupy space in the layout.
          charStyle = 'text-transparent';
        }

        return <TickerCharacter key={index} char={char} className={charStyle} />;
      })}
    </div>
  );
};
SplitFlapDisplay.displayName = 'SplitFlapDisplay';
