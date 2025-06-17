
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
    y: direction > 0 ? "20vh" : "-20vh", // Consistent, moderate travel
    scale: 1,
    filter: 'blur(0px)',
  }),
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 260, // Softer spring for smoothness
      damping: 30,   // Standard damping
      // No explicit duration, let spring physics dictate
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction < 0 ? "20vh" : "-20vh", // Consistent, moderate travel
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 260, // Softer spring for smoothness
      damping: 30,
      // No explicit duration, let spring physics dictate
    },
  }),
};


export default function PortfolioPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollDebounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isScrollingRef = useRef(isScrolling);
  useEffect(() => {
    isScrollingRef.current = isScrolling;
  }, [isScrolling]);

  const handleNavigate = useCallback((sectionId: string) => {
    const newIndex = sections.findIndex(s => s.id === sectionId);
    if (newIndex !== -1 && newIndex !== activeIndex && !isScrollingRef.current) {
      setIsScrolling(true);
      if (scrollDebounceTimeoutRef.current) {
        clearTimeout(scrollDebounceTimeoutRef.current);
        scrollDebounceTimeoutRef.current = null;
      }
      setDirection(newIndex > activeIndex ? 1 : -1);
      setActiveIndex(newIndex);
    }
  }, [activeIndex]);
  
  const handleAnimationComplete = () => {
    setIsScrolling(false);
  };

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (isScrollingRef.current) return;
      
      if (scrollDebounceTimeoutRef.current) {
          clearTimeout(scrollDebounceTimeoutRef.current);
          scrollDebounceTimeoutRef.current = null;
      }
      
      const scrollDelta = event.deltaY;
      let newIndex = activeIndex;

      if (scrollDelta > 20) { 
        newIndex = Math.min(sections.length - 1, activeIndex + 1);
      } else if (scrollDelta < -20) { 
        newIndex = Math.max(0, activeIndex - 1);
      }

      if (newIndex !== activeIndex) {
        setIsScrolling(true); 
        setDirection(newIndex > activeIndex ? 1 : -1);
        setActiveIndex(newIndex);
      } else {
        setIsScrolling(true); 
        scrollDebounceTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
          scrollDebounceTimeoutRef.current = null;
        }, 500);
      }
    };
    
    const handleKeyDown = (event: KeyboardEvent) => {
      
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
      
      if (isScrollingRef.current) return; // Check after determining if key is relevant
      event.preventDefault(); 

      if (scrollDebounceTimeoutRef.current) {
          clearTimeout(scrollDebounceTimeoutRef.current);
          scrollDebounceTimeoutRef.current = null;
      }

      if (newIndex !== activeIndex) {
        setIsScrolling(true); 
        setDirection(newIndex > activeIndex ? 1 : -1);
        setActiveIndex(newIndex);
      } else {
        setIsScrolling(true);
        scrollDebounceTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
          scrollDebounceTimeoutRef.current = null;
        }, 500); 
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
  }, [activeIndex]); 

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

