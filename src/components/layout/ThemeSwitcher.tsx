
'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/Button/button';
import { Box } from '@/components/primitives';

export function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a placeholder or null during server-side rendering or before hydration
    // to avoid mismatch if theme is 'system' initially
    return (
        <Box className="fixed top-4 right-4 z-[150]">
            <Button variant="outline" size="icon" disabled className="bg-card/80 backdrop-blur-md border-border/50 hover:bg-card hover:border-border">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
            </Button>
        </Box>
    );
  }

  const toggleTheme = () => {
    // Use resolvedTheme to handle initial "system" state correctly
    if (resolvedTheme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <Box className="fixed top-4 right-4 z-[150]">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className="bg-card/80 backdrop-blur-md border-border/50 hover:bg-card hover:border-border"
        aria-label={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {resolvedTheme === 'dark' ? (
          <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
        ) : (
          <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </Box>
  );
}
