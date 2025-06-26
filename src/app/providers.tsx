
'use client';

import React, { useCallback, useState } from 'react';
import { useAnimate } from 'framer-motion';
import { ThemeProvider, useTheme } from 'next-themes';
import { Toaster, TooltipProvider } from "@/components/ui";
import { CookieConsentBanner, Navbar, Footer } from '@/components/layout';
import { ThemeAnimationContext } from '@/context';

function ThemeAnimationWrapper({ children }: { children: React.ReactNode }) {
  const { setTheme, resolvedTheme } = useTheme();
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const [isAnimating, setIsAnimating] = useState(false);

  const triggerThemeAnimation = useCallback(async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isAnimating || !scope.current) return;
    setIsAnimating(true);
    
    const isDark = resolvedTheme === 'dark';
    const targetTheme = isDark ? 'light' : 'dark';
    const targetBg = isDark ? 'hsl(220 50% 98%)' : 'hsl(0 0% 7%)';
    
    const overlay = scope.current;
    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );
      
    overlay.style.backgroundColor = targetBg;
    
    try {
      await animate(
        overlay,
        { clipPath: `circle(${endRadius}px at ${x}px ${y}px)` },
        { duration: 0.5, ease: 'easeIn' }
      );
      
      setTheme(targetTheme);
      
      await animate(overlay, { opacity: [1, 0] }, { duration: 0.4, at: "+0.1" });
      
    } finally {
      overlay.style.clipPath = `circle(0px at ${x}px ${y}px)`;
      overlay.style.opacity = '1';
      setIsAnimating(false);
    }
  }, [animate, isAnimating, resolvedTheme, scope, setTheme]);

  return (
    <ThemeAnimationContext.Provider value={{ triggerThemeAnimation, isAnimating }}>
      <div
        ref={scope}
        className="fixed inset-0 z-[200] pointer-events-none"
        style={{ clipPath: 'circle(0px at 50% 50%)' }}
      />
      {children}
    </ThemeAnimationContext.Provider>
  );
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange
    >
      <TooltipProvider delayDuration={100}>
        <ThemeAnimationWrapper>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster />
          <CookieConsentBanner />
        </ThemeAnimationWrapper>
      </TooltipProvider>
    </ThemeProvider>
  );
}
