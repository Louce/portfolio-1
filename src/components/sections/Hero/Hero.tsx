'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronDown, MapPin } from 'lucide-react';
import { Flex, Text } from '@/components/primitives';
import { Button } from '@/components/ui/Button/button';
import { useVisitorLocation } from '@/hooks';
import { SplitFlapDisplay } from './components/SplitFlapDisplay';

// Static text content for the hero section.
const subHeadlineBase = "A Python, Automation, and Game Development enthusiast, blending logic with creative design.";

// An array of dynamic headlines that cycle for an animated effect.
const dynamicSubHeadlines = [
  "PYTHON // AUTOMATION // GAME DEV",
  "DESIGN // INNOVATION // SOLUTIONS",
  "LOGIC // CREATIVITY // EFFICIENCY",
  "CODE // BUILD // PLAY"
];

/**
 * The Hero section component.
 * This is the main "above-the-fold" content that serves as the introduction to the portfolio.
 * It features a large animated headline, a cycling sub-headline, a brief bio,
 * a call-to-action button, and displays the visitor's detected location.
 *
 * @returns {React.ReactElement} The Hero section component.
 */
export const Hero: React.FC = React.memo(() => {
  const visitorLocation = useVisitorLocation();

  return (
    <section id="hero" className="relative flex flex-col min-h-screen w-full items-center justify-center text-foreground overflow-hidden pointer-events-auto">
      
      <div className="absolute inset-0 z-0 bg-background bg-grid-pattern masked-radial-gradient" />

      {visitorLocation && (
        <div 
          className="absolute top-20 left-0 right-0 z-10 text-center"
          aria-label={`Visitor location: ${visitorLocation}`}
        >
        <Flex 
          align="center" 
          justify="center" 
          gap="0.375rem" 
        >
          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-primary/80" />
          <Text as="span" className="text-xs sm:text-sm text-foreground/70">{visitorLocation}</Text>
        </Flex>
        </div>
      )}
      
      <div 
        className="relative z-10 flex flex-col items-center justify-center h-full space-y-4 md:space-y-6 text-center px-4 pointer-events-auto"
      >
        <h1
          className="text-center pt-16 md:pt-0"
        >
          <span
            className="font-headline text-7xl sm:text-8xl md:text-9xl lg:text-display-lg xl:text-display-xl font-bold tracking-tight text-primary text-center leading-none drop-shadow-md dark:drop-shadow-lg"
          >
            Dendi Rivaldi
          </span>
        </h1>
        
        {/* The container that defines the size and position of the animation */}
        <SplitFlapDisplay 
          phrases={dynamicSubHeadlines} 
          className="h-12 text-xl sm:text-2xl md:text-3xl font-light tracking-wider text-center tabular-nums"
        />
        
        <div
          className="max-w-xl text-center px-4"
        >
            <Text 
              as="p" 
              variant="default"
              className="font-body text-base sm:text-lg text-foreground/75 leading-relaxed text-center"
              aria-label={subHeadlineBase}
            >
              {subHeadlineBase}
            </Text>
        </div>

        <div
          className="pt-2"
        >
          <Button asChild
            size="lg" 
            variant="default" 
            className="font-headline bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transform hover:scale-105 transition-transform duration-300 rounded-xl"
            aria-label="View my work"
          >
            <Link href="#projects">View My Work</Link>
          </Button>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <Link
          href="#about"
          className="cursor-pointer p-2 rounded-full hover:bg-primary/10 focus-visible:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors"
          aria-label="Scroll to about section"
        >
            <ChevronDown className="h-10 w-10 text-primary transition-opacity hover:opacity-75" />
        </Link>
      </div>
    </section>
  );
});

Hero.displayName = 'HeroSection';
