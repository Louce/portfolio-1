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
 * This component composes the different sections of the single-page layout in a narrative order,
 * guiding the user from an introduction to a final call-to-action.
 *
 * @returns {React.ReactElement} The complete, single-page portfolio application.
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
