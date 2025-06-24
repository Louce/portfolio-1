
'use client';

import React from 'react';
import {
  Hero,
  About,
  Skills,
  Projects,
  Contact,
  Feedback,
} from '@/components/sections';
import { Box } from '@/components/primitives';

/**
 * The main entry point and homepage for the portfolio application.
 * This component composes the different sections of the single-page layout.
 * It also includes a subtle, theme-aware grid background effect.
 *
 * @returns {React.ReactElement} The complete portfolio page.
 */
export default function PortfolioPage() {
  return (
    <Box className="relative bg-background">
      <div className="absolute inset-0 z-0 bg-grid-pattern"></div>
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Feedback />
      </main>
    </Box>
  );
}
