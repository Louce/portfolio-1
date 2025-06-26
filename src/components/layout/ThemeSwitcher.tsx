
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

/**
 * A theme-switching button that toggles between light and dark modes.
 * It uses a performant, glassmorphic "circular wipe" transition to provide
 * a smooth and visually engaging blend between themes, orchestrated with
 * modern animation hooks for a robust, sequenced effect.
 *
 * @returns {React.ReactElement} A button to toggle the application's theme, with a portal-based animation overlay.
 */
export function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [scope, animate] = useAnimate();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isAnimating || !scope.current) return;
    setIsAnimating(true);

    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';

    // 1. Position the overlay at the click position and make it visible.
    await animate(
      scope.current,
      {
        top: `${event.clientY}px`,
        left: `${event.clientX}px`,
        transform: 'translate(-50%, -50%) scale(0)',
        opacity: 1,
      },
      { duration: 0 }
    );
    
    // 2. Change the theme and start the expansion animation simultaneously.
    setTheme(newTheme);
    await animate(
      scope.current,
      { transform: 'translate(-50%, -50%) scale(150)' },
      { duration: 0.7, ease: 'easeIn' }
    );

    // 3. Quickly fade out the overlay to reveal the new theme.
    await animate(
      scope.current, 
      { opacity: 0 }, 
      { duration: 0.3, ease: 'easeOut' }
    );

    // 4. Reset scale for the next run (happens while invisible).
    await animate(scope.current, { transform: 'translate(-50%, -50%) scale(0)' }, { duration: 0 });

    setIsAnimating(false);
  };
  
  if (!mounted) {
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
      
      {mounted && createPortal(
        <div
          ref={scope}
          className="pointer-events-none"
          style={{
            position: 'fixed',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            zIndex: 9999,
            transformOrigin: 'center',
            opacity: 0,
            transform: 'translate(-50%, -50%) scale(0)',
            // The "lens flare" effect: a blurred radial gradient.
            backgroundImage: 'radial-gradient(circle, hsl(var(--background)/0.1), transparent 70%)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        />,
        document.body
      )}
    </>
  );
}
