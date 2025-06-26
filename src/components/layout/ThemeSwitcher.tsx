
'use client';

import * as React from 'react';
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
 * A sophisticated theme-switching component that provides a smooth, snappy,
 * and visually engaging circular wipe transition.
 *
 * @returns {React.ReactElement} A button to toggle the application's theme with an animated transition.
 */
export function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = React.useState(false);
  const [scope, animate] = useAnimate();
  const [isAnimating, setIsAnimating] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const handleThemeToggle = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isAnimating || !isMounted) return;
    setIsAnimating(true);
    
    const isDark = resolvedTheme === 'dark';
    const targetTheme = isDark ? 'light' : 'dark';
    // HSL values from globals.css for light and dark backgrounds
    const targetBg = isDark ? 'hsl(220 50% 98%)' : 'hsl(0 0% 7%)';

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const overlay = scope.current as HTMLElement;
    overlay.style.backgroundColor = targetBg;
    
    try {
      // Expand the circle to cover the screen
      await animate(
        overlay,
        { clipPath: `circle(${endRadius}px at ${x}px ${y}px)` },
        { duration: 0.5, ease: 'easeIn' }
      );
      
      // Change the theme once the screen is covered
      setTheme(targetTheme);
      
      // Collapse the circle to reveal the new theme
      await animate(
        overlay,
        { clipPath: `circle(0px at ${x}px ${y}px)` },
        { duration: 0.4, ease: 'easeOut', at: '+0.1' }
      );
    } finally {
      setIsAnimating(false);
    }
  };
  
  if (!isMounted) {
    return (
      <Button variant="ghost" size="icon" disabled className="h-10 w-10 rounded-full" aria-label="Toggle theme">
        <Sun className="h-5 w-5" />
      </Button>
    );
  }

  const label = resolvedTheme === 'dark' ? 'Enable Light Mode' : 'Enable Dark Mode';

  return (
    <>
      <div
        ref={scope}
        className="fixed inset-0 z-[100] pointer-events-none"
        style={{ clipPath: 'circle(0% at 50% 50%)' }}
      />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleThemeToggle}
            disabled={isAnimating}
            className="group relative flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            aria-label={label}
          >
            <Sun className={`h-5 w-5 text-foreground/80 transition-all duration-300 ease-in-out ${resolvedTheme === 'dark' ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
            <Moon className={`absolute h-5 w-5 text-foreground/80 transition-all duration-300 ease-in-out ${resolvedTheme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`} />
            <span className="sr-only">{label}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom"><p>{label}</p></TooltipContent>
      </Tooltip>
    </>
  );
}
