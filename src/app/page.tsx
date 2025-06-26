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
 * This component follows the Single Responsibility Principle by having one job:
 * to assemble the different sections of the page in a deliberate, narrative order.
 * This composition creates a guided user journey, starting with a hook (Hero),
 * building credibility (About, Skills, Projects), and ending with a call to action
 * (Feedback, Contact).
 *
 * @returns {React.ReactElement} The complete, single-page portfolio application.
 */
export default function PortfolioPage() {
  return (
    <Box>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Feedback />
      <Contact />
    </Box>
  );
}
