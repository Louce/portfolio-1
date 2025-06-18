"use client";

import React from 'react';
import { SectionWrapper } from '@/components/layout';
import { GlowingEffectDemo } from '@/components/ui'; // Adjusted import path
import { Text } from '@/components/primitives';

export const GlowingDemo: React.FC = () => {
  return (
    <SectionWrapper id="glowing-demo" className="bg-transparent">
      <Text as="h2" variant="default" className="font-headline text-4xl md:text-5xl font-bold text-primary text-center mb-12">
        Interactive Glow Effect
      </Text>
      <GlowingEffectDemo />
    </SectionWrapper>
  );
};

GlowingDemo.displayName = 'GlowingDemoSection';
