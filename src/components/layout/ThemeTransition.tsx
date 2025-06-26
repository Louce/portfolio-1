'use client';

import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect, useCallback, useRef } from 'react';

/**
 * A client-side component that creates a "circular wipe" transition effect when
 * the theme is changed. It listens for theme changes from the `next-themes` library
 * and orchestrates a performant `transform: scale()` animation to smoothly
 * transition between light and dark modes.
 *
 * @returns {React.ReactElement} An animatable div that handles the theme transition visually.
 */
export const ThemeTransition: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Prevent animation on the initial page load.
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    
    // On subsequent theme changes, trigger the animation.
    setIsAnimating(true);
    // By changing the key, we ensure Framer Motion's AnimatePresence re-runs the animation.
    setAnimationKey(prev => prev + 1);
  }, [resolvedTheme]);

  const onAnimationComplete = useCallback(() => {
    setIsAnimating(false);
  }, []);

  // Determine the background color for the expanding circle (it should be the NEW theme's color).
  const backgroundColor = resolvedTheme === 'dark' ? 'hsl(0 0% 7%)' : 'hsl(220 50% 98%)';

  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          key={animationKey}
          style={{
            backgroundColor,
            position: 'fixed',
            // Center the animation origin on the navbar theme switcher.
            top: '2.5rem', 
            left: '50%',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            zIndex: 9999,
            transformOrigin: 'center',
          }}
          initial={{ scale: 0, x: '-50%' }}
          animate={{ scale: 100, x: '-50%' }} // Scale up to cover the viewport.
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }} // A fast-out, slow-in curve.
          onAnimationComplete={onAnimationComplete}
          className="pointer-events-none"
        />
      )}
    </AnimatePresence>
  );
};

ThemeTransition.displayName = 'ThemeTransition';