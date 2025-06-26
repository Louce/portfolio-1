
'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useAnimate } from 'framer-motion';

import { Button } from '@/components/ui/Button/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/Tooltip/tooltip';

// HSL values are sourced directly from globals.css to ensure a perfect color match for the masking effect.
const COLORS = {
  light: 'hsl(220 50% 98%)',
  dark: 'hsl(0 0% 7%)',
};

/**
 * A theme-switching button that provides a high-quality, performant, and visually
 * seamless transition between light and dark modes. This definitive version uses a
 * "Perfected Masking" technique to ensure a flawless, snappy, and natural-feeling
 * transition, orchestrated with an imperative animation sequence to prevent bugs.
 *
 * @returns {React.ReactElement} A button to toggle the application's theme, with a portal-based animation overlay.
 */
export function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [scope, animate] = useAnimate();

  /**
   * The core animation logic. This function orchestrates the entire theme transition
   * in a precise, imperative sequence.
   * @param {React.MouseEvent<HTMLButtonElement>} event - The click event from the button.
   */
  const toggleTheme = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent starting a new animation while one is already in progress.
    if (isAnimating || !scope.current) return;

    setIsAnimating(true);
    
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    const { clientX, clientY } = event;
    
    // 1. PREPARE: Before animating, explicitly reset the overlay to its starting state.
    // This is the crucial step that fixes the "works only once" bug.
    scope.current.style.backgroundColor = COLORS[newTheme];
    await Promise.all([
      animate(scope.current, { opacity: 1 }, { duration: 0 }),
      animate(
        scope.current,
        { clipPath: `circle(0% at ${clientX}px ${clientY}px)` },
        { duration: 0 }
      ),
    ]);

    // 2. ANIMATE IN: Expand the circle from the click point with a snappy spring animation.
    const expansionAnimation = animate(
      scope.current,
      { clipPath: `circle(150vw at ${clientX}px ${clientY}px)` },
      { type: "spring", stiffness: 100, damping: 20 }
    );
    await expansionAnimation;
    
    // 3. CHANGE THEME: Switch the theme only AFTER the screen is fully masked.
    setTheme(newTheme);

    // 4. ANIMATE OUT: Perform a quick, clean fade-out to reveal the new theme.
    await animate(
      scope.current,
      { opacity: 0 },
      { duration: 0.3, ease: "easeOut", delay: 0.05 }
    );
    
    setIsAnimating(false);
  };
  
  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        disabled
        className="h-10 w-10 rounded-full"
        aria-label="Toggle theme"
      >
        <Sun className="h-5 w-5" />
      </Button>
    );
  }
  
  const label = resolvedTheme === 'dark' ? 'Enable Light Mode' : 'Enable Dark Mode';

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            disabled={isAnimating}
            className="group relative flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            aria-label={label}
          >
            <Sun className={`h-5 w-5 text-foreground/80 transition-all duration-200 group-hover:text-primary ${resolvedTheme === 'dark' ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
            <Moon className={`absolute h-5 w-5 text-foreground/80 transition-all duration-200 group-hover:text-primary ${resolvedTheme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`} />
            <span className="sr-only">{label}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom"><p>{label}</p></TooltipContent>
      </Tooltip>
      
      {isMounted && createPortal(
        <div
          ref={scope}
          className="pointer-events-none"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9999,
            opacity: 0, // Start fully transparent
            clipPath: 'circle(0% at 50% 50%)' // Initial state
          }}
        />,
        document.body
      )}
    </>
  );
}
