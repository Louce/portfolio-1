'use client';

import React from 'react';
import { ThemeProvider } from 'next-themes';
import { Toaster, TooltipProvider } from "@/components/ui";
import { CookieConsentBanner, Navbar, Footer } from '@/components/layout';

/**
 * A client-side component responsible for wrapping the application with all necessary context providers.
 * This component is a prime example of Separation of Concerns. It isolates client-side-only logic
 * (like theme management and tooltips) from the server-rendered `RootLayout`, allowing the layout
 * to remain a clean Server Component for better performance and SEO. It also includes the main
 * persistent layout elements like the Navbar and Footer.
 *
 * @param {{ children: React.ReactNode }} props - The children to be rendered within the providers.
 * @returns {React.ReactElement} The application tree wrapped in all necessary providers.
 */
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
