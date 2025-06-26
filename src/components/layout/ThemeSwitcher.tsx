
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

// HSL color values from globals.css for a perfect match.
const THEME_COLORS = {
  dark: 'hsl(0 0% 7%)',
  light: 'hsl(220 50% 98%)',
};

/**
 * A theme-switching button that provides a high-quality, performant, and visually
 * seamless transition between light and dark modes using a "color wipe" effect.
 *
 * @returns {React.ReactElement} A button to toggle the application's theme, with a portal-based animation overlay.
 */
export function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [scope, animate] = useAnimate();

  const toggleTheme = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isAnimating || !scope.current) return;
    
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    const targetColor = THEME_COLORS[newTheme];

    setIsAnimating(true);
    
    // Set the overlay to the target theme's color
    scope.current.style.backgroundColor = targetColor;

    // Position the overlay at the click position and make it visible.
    await animate(
      scope.current,
      {
        clipPath: `circle(0% at ${event.clientX}px ${event.clientY}px)`,
      },
      { duration: 0 }
    );
    
    // Animate the expansion to cover the screen.
    const animationPromise = animate(
      scope.current,
      { clipPath: `circle(150% at ${event.clientX}px ${event.clientY}px)` },
      { duration: 0.6, ease: 'easeIn' }
    );
    
    // Change the theme concurrently with the animation start for a seamless blend.
    setTheme(newTheme);

    await animationPromise;
    
    // Reset for the next run
    await animate(scope.current, { clipPath: 'circle(0% at 0px 0px)' }, { duration: 0 });

    setIsAnimating(false);
  };
  
  const isMounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

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
            clipPath: 'circle(0% at 0px 0px)'
          }}
        />,
        document.body
      )}
    </>
  );
}
