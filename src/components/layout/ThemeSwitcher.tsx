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

/**
 * A theme-switching component that toggles between light and dark modes.
 * It uses a simple but effective icon swap and provides clear accessibility labels.
 * The actual color transition is handled by CSS transitions defined on the `<body>`
 * and other components, making this component's responsibility purely about state
 * management and user interaction.
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
          <Sun className="h-5 w-5 rotate-0 scale-100 text-foreground/80 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 text-foreground/80 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">{label}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom"><p>{label}</p></TooltipContent>
    </Tooltip>
  );
}
