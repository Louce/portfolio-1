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
 * seamless transition between light and dark modes. This final version uses a
 * "Perfected Masking" technique with a physics-based spring animation to ensure a
 * flawless, snappy, and natural-feeling transition.
 *
 * @returns {React.ReactElement} A button to toggle the application's theme, with a portal-based animation overlay.
 */
export function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [scope, animate] = useAnimate();

  const toggleTheme = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isAnimating || !scope.current) return;

    setIsAnimating(true);
    
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    const { clientX, clientY } = event;
    
    // 1. Set the overlay to the TARGET theme's background color. This is the key to a seamless blend.
    scope.current.style.backgroundColor = COLORS[newTheme];

    // 2. Animate IN: Expand the circle from the click point with a snappy, physics-based spring animation.
    const expansionAnimation = animate(
      scope.current,
      { clipPath: `circle(150vw at ${clientX}px ${clientY}px)` },
      { type: "spring", stiffness: 120, damping: 20, mass: 0.8 }
    );
    await expansionAnimation;
    
    // 3. Change the theme only AFTER the screen is fully covered.
    setTheme(newTheme);

    // 4. Animate OUT: A quick fade reveals the new content instantly. This feels fast and clean.
    await animate(
      scope.current,
      { opacity: [1, 0] },
      { duration: 0.25, ease: "easeOut" }
    );
    
    // 5. Reset overlay styles for the next transition.
    scope.current.style.clipPath = `circle(0% at ${clientX}px ${clientY}px)`;
    scope.current.style.opacity = '1';

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
            borderRadius: '50%',
            clipPath: 'circle(0% at 50% 50%)'
          }}
        />,
        document.body
      )}
    </>
  );
}
