'use client';

import React, { Suspense } from 'react';
import {
  Hero,
  About,
  Skills,
  Projects,
  Contact,
} from '@/components/sections';
import { Box, Flex, Text } from '@/components/primitives';
import { SectionWrapper } from '@/components/layout';

// Explicitly lazy-load the Feedback section, as it is a complex, interactive
// component that is not critical for the initial page view. This demonstrates
// manual code-splitting and optimization.
const LazyFeedback = React.lazy(() => 
  import('@/components/sections/Feedback/Feedback').then(module => ({ default: module.Feedback }))
);

/**
 * A simple fallback component to display while a lazy-loaded component is loading.
 * This prevents layout shifts and informs the user about the loading state.
 */
const LoadingFeedbackSection = () => (
  <SectionWrapper id="feedback" className="bg-background relative">
    <div className="absolute inset-0 z-0 bg-grid-pattern masked-radial-gradient" />
    <Flex align="center" justify="center" className="h-full">
      <Text>Loading Interactive Feedback Module...</Text>
    </Flex>
  </SectionWrapper>
);

/**
 * The main entry point and homepage for the portfolio application.
 * This component follows the Single Responsibility Principle by having one job:
 * to assemble the different sections of the page in a deliberate, narrative order.
 * It now uses React.Suspense and React.lazy to defer the loading of the heavy
 * Feedback component, improving initial page load performance.
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
      <Suspense fallback={<LoadingFeedbackSection />}>
        <LazyFeedback />
      </Suspense>
      <Contact />
    </Box>
  );
}
