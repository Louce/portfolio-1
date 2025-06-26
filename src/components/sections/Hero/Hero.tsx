'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronDown, MapPin } from 'lucide-react';
import { Flex, Text } from '@/components/primitives';
import { Button } from '@/components/ui/Button/button';
import { useVisitorLocation } from '@/hooks';
import { SplitFlapDisplay } from './components/SplitFlapDisplay';
import { motion } from 'framer-motion';

/**
 * An array of dynamic headlines that cycle in the SplitFlapDisplay component.
 * These are crafted to be concise and impactful on all screen sizes.
 */
const dynamicSubHeadlines = [
  "PYTHON // AUTOMATION // GAMES",
  "DESIGN // BUILD // INNOVATE",
  "LOGIC // CREATIVITY // IMPACT",
  "CODE // BUILD // PLAY"
];

/**
 * The main introductory text for the hero section.
 */
const subHeadlineBase = "A creative developer crafting elegant, high-performance solutions that bridge the gap between logic and user experience.";

const name = "Dendi Rivaldi".split("");

/**
 * Framer Motion variants for the staggered letter animation in the main title.
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: "spring", stiffness: 120, damping: 12 },
  },
};

/**
 * The Hero section component, designed to make a powerful first impression.
 * It features a fully animated entrance sequence using Framer Motion:
 * - A 3D, staggered letter animation for the main title.
 * - An animated "split-flap" display for cycling sub-headlines.
 * - Sequenced fade-ins for the description and call-to-action button.
 * - A hook-driven visitor location display for a personalized touch.
 *
 * @returns {React.ReactElement} The Hero section component.
 */
export const Hero: React.FC = React.memo(() => {
  const visitorLocation = useVisitorLocation();

  return (
    <section id="hero" className="relative flex flex-col min-h-screen w-full items-center justify-center text-foreground overflow-hidden pointer-events-auto">
      
      <div className="absolute inset-0 z-0 bg-background bg-grid-pattern masked-radial-gradient" />

      {visitorLocation && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 1.5, duration: 0.5 } }}
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
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          aria-label="Dendi Rivaldi"
          className="flex flex-wrap justify-center text-center pt-16 md:pt-0 font-headline text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-display-xl font-bold tracking-tight text-primary drop-shadow-md dark:drop-shadow-lg [perspective:800px]"
        >
          {name.map((letter, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className="relative inline-block leading-none"
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.h1>
        
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0, transition: {delay: 1.0, duration: 0.5, ease: "easeOut"}}}
        >
          <SplitFlapDisplay 
            phrases={dynamicSubHeadlines} 
            className="h-12 text-base sm:text-xl md:text-2xl font-light tracking-normal sm:tracking-wider text-center tabular-nums"
          />
        </motion.div>
        
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0, transition: {delay: 1.2, duration: 0.5, ease: "easeOut"}}}
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
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0, transition: {delay: 1.4, duration: 0.5, ease: "easeOut"}}}
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 1.6, duration: 0.5 } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <Link
          href="#about"
          className="cursor-pointer p-2 rounded-full hover:bg-primary/10 focus-visible:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors"
          aria-label="Scroll to about section"
        >
            <ChevronDown className="h-10 w-10 text-primary transition-opacity hover:opacity-75 animate-bounce [animation-duration:2s]" />
        </Link>
      </motion.div>
    </section>
  );
});

Hero.displayName = 'HeroSection';
