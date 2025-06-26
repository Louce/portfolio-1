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
import { Footer } from '@/components/layout';
import { Box } from '@/components/primitives';

/**
 * The main entry point and homepage for the portfolio application.
 * This component composes the different sections of the single-page layout.
 * Individual sections are now responsible for their own backgrounds for better encapsulation.
 *
 * @returns {React.ReactElement} The complete portfolio page.
 */
export default function PortfolioPage() {
  return (
    <Box className="bg-background">
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Feedback />
        <Contact />
      </main>
      <Footer />
    </Box>
  );
}
