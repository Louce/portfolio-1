
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimate } from 'framer-motion';
import { cn } from '@/lib/utils';

// ====================================================================================
// True Split-Flap Character Component
// ====================================================================================

interface SplitFlapCharacterProps {
  char: string;
  className?: string;
}

const SplitFlapCharacter: React.FC<SplitFlapCharacterProps> = React.memo(({ char, className }) => {
  const [scope, animate] = useAnimate();
  const [currentChar, setCurrentChar] = useState(char);
  const [previousChar, setPreviousChar] = useState(char);

  useEffect(() => {
    if (char !== currentChar) {
      setPreviousChar(currentChar);
      setCurrentChar(char);

      animate(scope.current, { rotateX: -180 }, { duration: 0.5, ease: 'easeInOut' })
        .then(() => {
          // Reset without animation
          animate(scope.current, { rotateX: 0 }, { duration: 0 });
        });
    }
  }, [char, currentChar, animate, scope]);
  
  const charToDisplay = char === ' ' ? '\u00A0' : char;
  const prevCharToDisplay = previousChar === ' ' ? '\u00A0' : previousChar;

  return (
    <div className={cn("relative w-[0.6em] h-full tabular-nums perspective-[120px]", className)}>
      {/* New character - top static half */}
      <div className="absolute top-0 left-0 right-0 h-1/2 overflow-hidden">
        {charToDisplay}
      </div>
      {/* Old character - bottom static half */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 overflow-hidden flex items-end">
        {currentChar !== previousChar ? prevCharToDisplay : charToDisplay}
      </div>

      {/* The rotating flap */}
      <motion.div
        ref={scope}
        className="absolute top-0 left-0 right-0 h-1/2 overflow-hidden transform-style-3d"
        style={{ transformOrigin: 'bottom', rotateX: 0 }}
      >
        {/* Front of the flap (old character top) */}
        <div className="absolute inset-0 backface-hidden">
          {prevCharToDisplay}
        </div>
        {/* Back of the flap (new character bottom) */}
        <div className="absolute inset-0 backface-hidden flex items-end" style={{ transform: 'rotateX(180deg)' }}>
          {charToDisplay}
        </div>
      </motion.div>
    </div>
  );
});

SplitFlapCharacter.displayName = 'SplitFlapCharacter';


// ====================================================================================
// Main Split-Flap Display Container
// ====================================================================================

interface SplitFlapDisplayProps {
  phrase: string;
}

export const SplitFlapDisplay: React.FC<SplitFlapDisplayProps> = ({ phrase }) => {
  const characters = phrase.split('');

  return (
    <div className="flex h-full items-center justify-center text-xl sm:text-2xl md:text-3xl font-light text-foreground tracking-wider text-center">
      {characters.map((char, index) => {
        let charStyle = 'text-chromatic-aberration';
        
        // Check for the '//' pattern
        if (char === '/') {
          if (index > 0 && characters[index - 1] === '/') {
            // This is the second '/'
            charStyle = 'text-accent/70';
          } else {
            // This is the first '/'
            charStyle = 'text-primary/70';
          }
        } else if (char.trim() === '') {
          // Make spaces transparent
          charStyle = 'text-transparent';
        }

        return <SplitFlapCharacter key={index} char={char} className={charStyle} />;
      })}
    </div>
  );
};
SplitFlapDisplay.displayName = 'SplitFlapDisplay';
