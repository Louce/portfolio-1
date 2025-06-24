'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/Button/button';
import { Box } from '@/components/primitives';

/**
 * A theme-switching button that toggles between light and dark modes.
 * It uses the `next-themes` package to manage theme state and applies the
 * `.dark` class to the `<html>` element.
 * It handles server-side rendering gracefully to avoid hydration mismatches.
 *
 * @returns {React.ReactElement} A button to toggle the application's theme.
 */
export function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // useEffect only runs on the client, so we can safely check the theme without hydration errors.
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a disabled placeholder on the server to prevent layout shift.
    return (
        <Box className="fixed bottom-4 right-4 z-[150]">
            <Button variant="outline" size="icon" disabled className="bg-card/80 backdrop-blur-md border-border/50 hover:bg-card hover:border-border">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
            </Button>
        </Box>
    );
  }

  /**
   * Toggles the theme between 'dark' and 'light'.
   * It uses `resolvedTheme` to correctly handle the initial "system" theme preference.
   */
  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Box className="fixed bottom-4 right-4 z-[150]">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className="bg-card/80 backdrop-blur-md border-border/50 hover:bg-card hover:border-border overflow-hidden"
        aria-label={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <Sun className={`h-[1.2rem] w-[1.2rem] transition-all duration-500 ease-in-out ${resolvedTheme === 'dark' ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
        <Moon className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-500 ease-in-out ${resolvedTheme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`} />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </Box>
  );
}
