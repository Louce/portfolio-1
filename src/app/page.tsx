'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Hero, About, Skills, Projects, Contact } from '@/components/sections';
import { PageNavigation } from '@/components/PageNavigation';
import { Box } from '@/components/primitives';
import { useToast } from '@/hooks/use-toast'; // For potential scroll blocking notifications

const sections = [
  { id: 'hero', label: 'Home', component: Hero },
  { id: 'about', label: 'About', component: About },
  { id: 'skills', label: 'Skills', component: Skills },
  { id: 'projects', label: 'Projects', component: Projects },
  { id: 'contact', label: 'Contact', component: Contact },
];

const sectionVariants = {
  initial: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? '100vh' : '-100vh', // Slide from bottom or top
    scale: 0.8,
    filter: 'blur(10px)',
  }),
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 50,
      damping: 20,
      duration: 0.8,
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction < 0 ? '100vh' : '-100vh', // Slide to bottom or top
    scale: 0.8,
    filter: 'blur(10px)',
    transition: {
      type: 'spring',
      stiffness: 50,
      damping: 20,
      duration: 0.6,
    },
  }),
};


export default function PortfolioPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // For animation direction: 1 for next, -1 for prev
  const [isScrolling, setIsScrolling] = useState(false); // Debounce scroll
  const { toast } = useToast();

  const handleNavigate = useCallback((sectionId: string) => {
    const newIndex = sections.findIndex(s => s.id === sectionId);
    if (newIndex !== -1 && newIndex !== activeIndex) {
      setDirection(newIndex > activeIndex ? 1 : -1);
      setActiveIndex(newIndex);
    }
  }, [activeIndex]);
  
  // Scroll handling for "unfolding narrative"
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault(); // Prevent default scroll behavior

      if (isScrolling) return;
      setIsScrolling(true);

      const scrollDelta = event.deltaY;
      let newIndex = activeIndex;

      if (scrollDelta > 50) { // Scroll down
        newIndex = Math.min(sections.length - 1, activeIndex + 1);
      } else if (scrollDelta < -50) { // Scroll up
        newIndex = Math.max(0, activeIndex - 1);
      }

      if (newIndex !== activeIndex) {
        setDirection(newIndex > activeIndex ? 1 : -1);
        setActiveIndex(newIndex);
      }
      
      // Debounce to prevent rapid section changes
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 800); // Adjust delay as needed, should be close to animation duration
    };
    
    // Add passive:false to allow preventDefault
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      clearTimeout(scrollTimeout);
    };
  }, [activeIndex, isScrolling]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isScrolling) return; // Prevent navigation during transition

      let newIndex = activeIndex;
      if (event.key === 'ArrowDown' || event.key === 'PageDown') {
        newIndex = Math.min(sections.length - 1, activeIndex + 1);
      } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        newIndex = Math.max(0, activeIndex - 1);
      } else if (event.key === 'Home') {
        newIndex = 0;
      } else if (event.key === 'End') {
        newIndex = sections.length - 1;
      }

      if (newIndex !== activeIndex) {
        setIsScrolling(true); // Set scrolling flag for keyboard too
        setDirection(newIndex > activeIndex ? 1 : -1);
        setActiveIndex(newIndex);
        setTimeout(() => setIsScrolling(false), 800);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, isScrolling]);


  const ActiveComponent = sections[activeIndex].component;

  return (
    <Box className="relative h-screen w-screen overflow-hidden">
      <PageNavigation 
        sections={sections} 
        activeSection={sections[activeIndex].id} 
        onNavigate={handleNavigate} 
      />
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={sections[activeIndex].id}
          custom={direction}
          variants={sectionVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0 w-full h-full"
          aria-live="polite" // Announce section changes to screen readers
          role="tabpanel" // Treat sections like tabs for accessibility
          aria-labelledby={`section-tab-${sections[activeIndex].id}`} // Assuming PageNavigation buttons have these IDs
        >
          {/* The Hero component has a specific onNavigate prop */}
          {sections[activeIndex].id === 'hero' ? (
            <ActiveComponent onNavigate={handleNavigate} />
          ) : (
            <ActiveComponent />
          )}
        </motion.div>
      </AnimatePresence>
    </Box>
  );
}
