
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Hero, About, Skills, Projects, Contact } from '@/components/sections';
import { PageNavigation } from '@/components/PageNavigation';
import { Box } from '@/components/primitives';

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
    y: direction > 0 ? '100vh' : '-100vh',
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
    y: direction < 0 ? '100vh' : '-100vh',
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
  const [direction, setDirection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollDebounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleNavigate = useCallback((sectionId: string) => {
    const newIndex = sections.findIndex(s => s.id === sectionId);
    if (newIndex !== -1 && newIndex !== activeIndex && !isScrolling) {
      setIsScrolling(true);
      if (scrollDebounceTimeoutRef.current) {
        clearTimeout(scrollDebounceTimeoutRef.current);
        scrollDebounceTimeoutRef.current = null;
      }
      setDirection(newIndex > activeIndex ? 1 : -1);
      setActiveIndex(newIndex);
      // isScrolling will be set to false by onAnimationComplete
    }
  }, [activeIndex, isScrolling, sections]); // sections added as it's used in findIndex
  
  const handleAnimationComplete = () => {
    setIsScrolling(false);
  };

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (isScrolling) return;

      setIsScrolling(true);
      if (scrollDebounceTimeoutRef.current) {
          clearTimeout(scrollDebounceTimeoutRef.current);
          scrollDebounceTimeoutRef.current = null;
      }

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
        // Animation will call handleAnimationComplete to set isScrolling = false
      } else {
        // No section change, set a debounce timeout to reset isScrolling
        scrollDebounceTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
          scrollDebounceTimeoutRef.current = null;
        }, 800); 
      }
    };
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isScrolling) return;

      let newIndex = activeIndex;
      let relevantKeyPress = false;

      if (event.key === 'ArrowDown' || event.key === 'PageDown') {
        newIndex = Math.min(sections.length - 1, activeIndex + 1);
        relevantKeyPress = true;
      } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        newIndex = Math.max(0, activeIndex - 1);
        relevantKeyPress = true;
      } else if (event.key === 'Home') {
        newIndex = 0;
        relevantKeyPress = true;
      } else if (event.key === 'End') {
        newIndex = sections.length - 1;
        relevantKeyPress = true;
      }

      if (!relevantKeyPress) return;

      setIsScrolling(true);
      if (scrollDebounceTimeoutRef.current) {
          clearTimeout(scrollDebounceTimeoutRef.current);
          scrollDebounceTimeoutRef.current = null;
      }

      if (newIndex !== activeIndex) {
        setDirection(newIndex > activeIndex ? 1 : -1);
        setActiveIndex(newIndex);
        // Animation will call handleAnimationComplete to set isScrolling = false
      } else {
        // No section change (e.g. arrow at boundary), set a debounce timeout
        scrollDebounceTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
          scrollDebounceTimeoutRef.current = null;
        }, 800);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      if (scrollDebounceTimeoutRef.current) {
        clearTimeout(scrollDebounceTimeoutRef.current);
        scrollDebounceTimeoutRef.current = null;
      }
    };
  }, [activeIndex, isScrolling, sections, setDirection, setActiveIndex]);


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
          onAnimationComplete={handleAnimationComplete}
          aria-live="polite"
          role="tabpanel"
          aria-labelledby={`section-tab-${sections[activeIndex].id}`}
        >
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
