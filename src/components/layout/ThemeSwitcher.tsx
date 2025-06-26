
'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence, useAnimate } from 'framer-motion';

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
  
  const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
  const label = resolvedTheme === 'dark' ? 'Enable Light Mode' : 'Enable Dark Mode';

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isAnimating) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const coords = {
      top: rect.top + rect.height / 2,
      left: rect.left + rect.width / 2,
    };
    
    // Position the circle at the button's center
    if (scope.current) {
        scope.current.style.top = `${coords.top}px`;
        scope.current.style.left = `${coords.left}px`;
    }

    const animationSequence = async () => {
      setIsAnimating(true);
      // Wait for the component to mount in the portal
      await new Promise(resolve => setTimeout(resolve, 0));
      
      // Expand the circle
      await animate(scope.current, 
        { scale: 100 }, 
        { duration: 0.7, ease: "easeInOut" }
      );
      
      // Change the theme after expansion
      setTheme(newTheme);
      
      // Collapse the circle
      await animate(scope.current, 
        { scale: 0 }, 
        { duration: 0.7, ease: "easeInOut" }
      );
      
      setIsAnimating(false);
    };
    
    animationSequence();
  };

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
        <AnimatePresence>
          {isAnimating && (
            <motion.div
              ref={scope}
              className="pointer-events-none bg-background/30 backdrop-blur-md"
              style={{
                position: 'fixed',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                zIndex: 9999,
                transform: 'translate(-50%, -50%)',
                transformOrigin: 'center',
              }}
              initial={{ scale: 0 }}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
