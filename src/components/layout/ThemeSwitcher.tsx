
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
// This is the key to a seamless transition.
const COLORS = {
  light: 'hsl(220 50% 98%)',
  dark: 'hsl(0 0% 7%)',
};

/**
 * A theme-switching button that provides a high-quality, performant, and visually
 * seamless transition between light and dark modes. This final version uses a
 * "Perfected Masking" technique with a physics-based spring animation to ensure a
 * flawless, snappy, and natural-feeling transition, inspired by classic CSS wipe effects.
 *
 * @returns {React.ReactElement} A button to toggle the application's theme, with a portal-based animation overlay.
 */
export function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [scope, animate] = useAnimate();

  /**
   * The core animation logic. This function orchestrates the entire theme transition.
   * @param {React.MouseEvent<HTMLButtonElement>} event - The click event from the button.
   */
  const toggleTheme = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent starting a new animation while one is already in progress.
    if (isAnimating || !scope.current) return;

    setIsAnimating(true);
    
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    const { clientX, clientY } = event;
    
    // 1. Set the overlay to the TARGET theme's background color. This is the secret to a seamless blend.
    scope.current.style.backgroundColor = COLORS[newTheme];

    // 2. Animate IN: Expand the circle from the click point with a snappy, physics-based spring animation.
    // This creates a natural, "buttery smooth" motion.
    const expansionAnimation = animate(
      scope.current,
      { clipPath: `circle(150vw at ${clientX}px ${clientY}px)` },
      { type: "spring", stiffness: 120, damping: 20, mass: 0.8 }
    );
    await expansionAnimation;
    
    // 3. Change the theme only AFTER the screen is fully covered by the overlay.
    // The user doesn't see this switch because it's hidden behind the mask.
    setTheme(newTheme);

    // 4. Animate OUT: A quick fade reveals the new content instantly. This feels fast and clean.
    // A slight delay ensures the theme has been fully applied by the browser before the reveal.
    await animate(
      scope.current,
      { opacity: [1, 0] },
      { duration: 0.25, ease: "easeOut", delay: 0.05 }
    );
    
    // 5. Reset overlay styles for the next transition, ensuring it's ready for the next click.
    scope.current.style.clipPath = `circle(0% at ${clientX}px ${clientY}px)`;
    scope.current.style.opacity = '1';

    setIsAnimating(false);
  };
  
  // This state prevents rendering the component on the server, which would cause hydration mismatches.
  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Render a disabled placeholder until the component is mounted on the client.
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
      
      {/* 
        Using a React Portal is the professional way to render a screen-covering overlay.
        It breaks the component out of its parent's stacking context and places it at the
        end of the document.body, ensuring it can cover everything without z-index issues.
      */}
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
            // The initial state for the clip-path animation.
            clipPath: 'circle(0% at 50% 50%)'
          }}
        />,
        document.body
      )}
    </>
  );
}
