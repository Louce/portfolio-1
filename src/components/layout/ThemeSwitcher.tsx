
'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/Button/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/Tooltip/tooltip';

/**
 * A theme-switching button that toggles between light and dark modes.
 * It uses a performant, glassmorphic "circular wipe" transition to provide
 * a smooth and visually engaging blend between themes.
 *
 * @returns {React.ReactElement} A button to toggle the application's theme, with a portal-based animation overlay.
 */
export function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = React.useState({ top: 0, left: 0 });

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (isAnimating || !buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    setCoords({
      top: rect.top + rect.height / 2,
      left: rect.left + rect.width / 2,
    });
    setIsAnimating(true);
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
  
  const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
  const label = resolvedTheme === 'dark' ? 'Enable Light Mode' : 'Enable Dark Mode';

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            ref={buttonRef}
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            disabled={isAnimating}
            className="group relative flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            aria-label="Toggle theme"
          >
            <Sun className={`h-5 w-5 text-foreground/80 transition-all duration-200 group-hover:text-primary ${resolvedTheme === 'dark' ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
            <Moon className={`absolute h-5 w-5 text-foreground/80 transition-all duration-200 group-hover:text-primary ${resolvedTheme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`} />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom"><p>{label}</p></TooltipContent>
      </Tooltip>
      
      {mounted && createPortal(
        <AnimatePresence>
          {isAnimating && (
            <motion.div
              className="pointer-events-none bg-background/30 backdrop-blur-md"
              style={{
                position: 'fixed',
                top: coords.top,
                left: coords.left,
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                zIndex: 9999,
                transform: 'translate(-50%, -50%)',
                transformOrigin: 'center',
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 100 }}
              transition={{ duration: 1.0, ease: [0.25, 1, 0.5, 1] }}
              onAnimationComplete={() => {
                setTheme(newTheme);
                setTimeout(() => setIsAnimating(false), 50);
              }}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
