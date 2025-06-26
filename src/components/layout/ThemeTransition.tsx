'use client';

import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect, useCallback } from 'react';

/**
 * A client-side component that creates a "circular wipe" transition effect when
 * the theme is changed. It listens for theme changes from the `next-themes` library
 * and orchestrates a performant `transform: scale()` animation to smoothly
 * transition between light and dark modes.
 *
 * @returns {React.ReactElement} An animatable div that handles the theme transition visually.
 */
export const ThemeTransition: React.FC = () => {
  const { theme, resolvedTheme } = useTheme();
  const [transitionState, setTransitionState] = useState({
    isAnimating: false,
    key: 0,
    backgroundColor: '',
  });

  useEffect(() => {
    // Only trigger the animation if a theme change occurs (not on initial load)
    if (theme !== resolvedTheme) {
      setTransitionState(prevState => ({
        isAnimating: true,
        key: prevState.key + 1, // Increment key to force re-render and re-animation
        backgroundColor: resolvedTheme === 'dark' ? 'hsl(0 0% 7%)' : 'hsl(220 50% 98%)',
      }));
    }
  }, [resolvedTheme, theme]);

  const onAnimationComplete = useCallback(() => {
    setTransitionState(prevState => ({ ...prevState, isAnimating: false }));
  }, []);

  return (
    <AnimatePresence>
      {transitionState.isAnimating && (
        <motion.div
          key={transitionState.key}
          style={{
            backgroundColor: transitionState.backgroundColor,
            position: 'fixed',
            top: '2rem', // Approx vertical center of the navbar
            right: 'calc(50% - 220px + 40px)', // Approx horizontal position of the switcher
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            zIndex: 9999,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 100 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }} // Fast-out, slow-in curve
          onAnimationComplete={onAnimationComplete}
          className="pointer-events-none"
        />
      )}
    </AnimatePresence>
  );
};

ThemeTransition.displayName = 'ThemeTransition';
