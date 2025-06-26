
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
import { useThemeAnimation } from '@/context';

/**
 * A theme-switching component that triggers a global, animated theme transition.
 * It is decoupled from the animation logic itself, which is handled by the
 * ThemeAnimationContext at the root layout level.
 *
 * @returns {React.ReactElement} A button to toggle the application's theme.
 */
export function ThemeSwitcher() {
  const { resolvedTheme } = useTheme();
  const { triggerThemeAnimation, isAnimating } = useThemeAnimation();
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

  const label = resolvedTheme === 'dark' ? 'Enable Light Mode' : 'Enable Dark Mode';

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={triggerThemeAnimation}
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
  );
}
