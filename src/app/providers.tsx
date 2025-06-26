
'use client';

import React from 'react';
import { ThemeProvider } from 'next-themes';
import { Toaster, TooltipProvider } from "@/components/ui";
import { CookieConsentBanner, Navbar, Footer } from '@/components/layout';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        // This is important. It prevents next-themes from adding its own transitions,
        // allowing our custom CSS transition on the body to work unimpeded.
        disableTransitionOnChange
    >
      <TooltipProvider delayDuration={100}>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster />
          <CookieConsentBanner />
      </TooltipProvider>
    </ThemeProvider>
  );
}
