
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Hero, About, Skills, Projects, Contact } from '@/components/sections';
import { PageNavigation } from '@/components/layout';
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
    y: direction > 0 ? "10vh" : "-10vh",
    scale: 1,
    filter: 'blur(0px)', 
  }),
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      type: "tween",
      ease: "easeOut",
      duration: 0.5,
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction < 0 ? "10vh" : "-10vh",
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      type: "tween",
      ease: "easeIn",
      duration: 0.4,
    },
  }),
};


export default function PortfolioPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  
  const isScrollingRef = useRef(isScrolling);
  useEffect(() => {
    isScrollingRef.current = isScrolling;
  }, [isScrolling]);

  const handleNavigate = useCallback((sectionId: string) => {
    const newIndex = sections.findIndex(s => s.id === sectionId);
    if (newIndex !== -1 && newIndex !== activeIndex && !isScrollingRef.current) {
      setIsScrolling(true);
      setDirection(newIndex > activeIndex ? 1 : -1);
      setActiveIndex(newIndex);
    }
  }, [activeIndex]);
  
  const handleAnimationComplete = () => {
    setIsScrolling(false);
  };

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (isScrollingRef.current) {
        event.preventDefault(); 
        return;
      }
      
      const scrollDelta = event.deltaY;
      let newIndex = activeIndex;

      if (scrollDelta > 20) { 
        newIndex = Math.min(sections.length - 1, activeIndex + 1);
      } else if (scrollDelta < -20) { 
        newIndex = Math.max(0, activeIndex - 1);
      }

      if (newIndex !== activeIndex) {
        event.preventDefault(); 
        setIsScrolling(true); 
        setDirection(newIndex > activeIndex ? 1 : -1);
        setActiveIndex(newIndex);
      }
    };
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isScrollingRef.current) {
        const target = event.target as HTMLElement;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
            event.preventDefault();
        }
        return;
      }
      
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

      if (newIndex !== activeIndex) {
        setIsScrolling(true); 
        setDirection(newIndex > activeIndex ? 1 : -1);
        setActiveIndex(newIndex);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
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
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={sections[activeIndex].id}
          id={`section-panel-${sections[activeIndex].id}`}
          role="tabpanel"
          aria-labelledby={`nav-tab-${sections[activeIndex].id}`}
          custom={direction}
          variants={sectionVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0 w-full h-full"
          onAnimationComplete={handleAnimationComplete}
          aria-live="polite"
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

