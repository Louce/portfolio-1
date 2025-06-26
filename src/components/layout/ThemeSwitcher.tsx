
'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/Button/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/Tooltip/tooltip';
import { motion } from 'framer-motion';

/**
 * A theme-switching component that toggles between light and dark modes.
 * It uses Framer Motion to create a fluid, physics-based "spring" animation,
 * making the transition between the sun and moon icons feel more natural and responsive.
 *
 * @returns {React.ReactElement} A button to toggle the application's theme.
 */
export function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Render a placeholder on the server and during hydration to avoid mismatches.
    return (
      <Button variant="ghost" size="icon" disabled className="h-10 w-10 rounded-full" aria-label="Toggle theme">
        <Sun className="h-5 w-5" />
      </Button>
    );
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const label = resolvedTheme === 'dark' ? 'Enable Light Mode' : 'Enable Dark Mode';
  
  const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30,
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="group relative flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          aria-label={label}
        >
          <motion.div
            className="absolute"
            animate={{ scale: resolvedTheme === 'dark' ? 0 : 1, rotate: resolvedTheme === 'dark' ? 90 : 0 }}
            transition={spring}
          >
            <Sun className="h-5 w-5 text-foreground/80" />
          </motion.div>
          <motion.div
            className="absolute"
            animate={{ scale: resolvedTheme === 'dark' ? 1 : 0, rotate: resolvedTheme === 'dark' ? 0 : -90 }}
            transition={spring}
          >
            <Moon className="h-5 w-5 text-foreground/80" />
          </motion.div>
          <span className="sr-only">{label}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom"><p>{label}</p></TooltipContent>
    </Tooltip>
  );
}
