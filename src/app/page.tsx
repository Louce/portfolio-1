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
 * This component composes the different sections of the single-page layout in a narrative order,
 * guiding the user from an introduction to a final call-to-action.
 * The flow is designed to build interest:
 * 1. Hero: Captivating introduction.
 * 2. About: Personal connection and story.
 * 3. Skills: Scannable proof of expertise.
 * 4. Projects: Concrete examples of work.
 * 5. Feedback: A live, full-stack demonstration of AI skills.
 * 6. Contact: The final, focused call-to-action.
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
    </Box>
  );
}

    