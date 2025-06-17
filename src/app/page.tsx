
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
    y: direction > 0 ? '10vh' : '-10vh', // Significantly reduced Y-offset
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
      stiffness: 400, // Increased stiffness for snappier feel
      damping: 40,  // Adjusted damping
      duration: 0.15, // Explicit very short duration hint
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction < 0 ? '10vh' : '-10vh', // Significantly reduced Y-offset
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
      duration: 0.1, // Explicit very short duration hint
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
  }, [activeIndex, setActiveIndex, setDirection, setIsScrolling]);
  
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
        // If trying to scroll past boundaries, still set isScrolling to true
        // and rely on the debounce timeout to reset it.
        setIsScrolling(true); 
        scrollDebounceTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
          scrollDebounceTimeoutRef.current = null;
        }, 500); // Debounce timeout for boundary scrolls
      }
    };
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isScrollingRef.current) return;

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
        // If trying to scroll past boundaries with keys
        setIsScrolling(true);
        scrollDebounceTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
          scrollDebounceTimeoutRef.current = null;
        }, 500); // Debounce timeout for boundary key presses
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
  }, [activeIndex, handleNavigate]); // handleNavigate is stable due to useCallback

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

