
'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown, MapPin } from 'lucide-react';
import { Flex, Text } from '@/components/primitives';
import { Button } from '@/components/ui/Button/button';
import { useVisitorLocation } from '@/hooks';

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
 * Renders a phrase with styled separators.
 * This function allows for granular control over the colors of the slashes.
 * @param {string} phrase - The string to format.
 * @returns {React.ReactElement} A React fragment with the styled text.
 */
const renderStyledPhrase = (phrase: string) => {
  const parts = phrase.split('//');
  return (
    <>
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          <span className="text-chromatic-aberration">{part.trim()}</span>
          {i < parts.length - 1 && (
            <span className="mx-2 font-light tracking-normal">
              <span className="text-primary/70">/</span>
              <span className="text-accent/70">/</span>
            </span>
          )}
        </React.Fragment>
      ))}
    </>
  );
};


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
  const [headlineIndex, setHeadlineIndex] = useState(0);

  // Effect to cycle through the dynamic headlines.
  useEffect(() => {
    const intervalId = setInterval(() => {
      setHeadlineIndex((prevIndex) => (prevIndex + 1) % dynamicSubHeadlines.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section id="hero" className="relative flex flex-col min-h-screen w-full items-center justify-center text-foreground overflow-hidden pointer-events-auto">
      
      <div className="absolute inset-0 z-0 bg-background bg-grid-pattern masked-radial-gradient" />

      {visitorLocation && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
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
        </motion.div>
      )}
      
      <div 
        className="relative z-10 flex flex-col items-center justify-center h-full space-y-4 md:space-y-6 text-center px-4 pointer-events-auto"
      >
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="text-center pt-16 md:pt-0"
        >
          <span
            className="font-headline text-7xl sm:text-8xl md:text-9xl lg:text-display-lg xl:text-display-xl font-bold tracking-tight text-primary text-center leading-none drop-shadow-md dark:drop-shadow-lg"
          >
            Dendi Rivaldi
          </span>
        </motion.h1>

        <div className="text-center h-8 sm:h-10 md:h-12">
            <AnimatePresence mode="wait">
                <motion.h2
                    key={dynamicSubHeadlines[headlineIndex]}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ ease: 'easeInOut', duration: 0.4 }}
                    className="text-xl sm:text-2xl md:text-3xl font-light text-foreground tracking-wider text-center"
                >
                    {renderStyledPhrase(dynamicSubHeadlines[headlineIndex])}
                </motion.h2>
            </AnimatePresence>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.9 }}
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
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "backOut", delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <Link
          href="#about"
          className="cursor-pointer p-2 rounded-full hover:bg-primary/10 focus-visible:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors"
          aria-label="Scroll to about section"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
          >
            <ChevronDown className="h-10 w-10 text-primary transition-opacity hover:opacity-75" />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
});

Hero.displayName = 'HeroSection';
