
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Hero, About, Skills, Projects, Contact, Feedback } from '@/components/sections';
import { FloatingDock, type FloatingDockItem } from '@/components/ui/floating-dock'; // Updated import
import { Box } from '@/components/primitives';
import { HomeIcon, UserIcon, CodeIcon, LayersIcon, MailIcon, MessageSquareIcon } from 'lucide-react'; // Lucide icons

const sectionsConfig = [
  { id: 'hero', label: 'Home', component: Hero, icon: <HomeIcon className="w-full h-full" /> },
  { id: 'about', label: 'About', component: About, icon: <UserIcon className="w-full h-full" /> },
  { id: 'skills', label: 'Skills', component: Skills, icon: <CodeIcon className="w-full h-full" /> },
  { id: 'projects', label: 'Projects', component: Projects, icon: <LayersIcon className="w-full h-full" /> },
  { id: 'contact', label: 'Contact', component: Contact, icon: <MailIcon className="w-full h-full" /> },
  { id: 'feedback', label: 'Feedback', component: Feedback, icon: <MessageSquareIcon className="w-full h-full" /> },
];

const sectionVariants = {
  initial: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? "100vh" : "-100vh",
    scale: 1,
  }),
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "tween",
      ease: "easeOut",
      duration: 0.5,
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction < 0 ? "100vh" : "-100vh", 
    scale: 1,
    transition: {
      type: "tween",
      ease: "easeIn",
      duration: 0.5,
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
    const newIndex = sectionsConfig.findIndex(s => s.id === sectionId);
    if (newIndex !== -1 && newIndex !== activeIndex && !isScrollingRef.current) {
      setIsScrolling(true);
      setDirection(newIndex > activeIndex ? 1 : -1);
      setActiveIndex(newIndex);
      if (typeof window !== 'undefined') {
        window.history.pushState(null, '', `#${sectionId}`);
      }
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
        newIndex = Math.min(sectionsConfig.length - 1, activeIndex + 1);
      } else if (scrollDelta < -20) { 
        newIndex = Math.max(0, activeIndex - 1);
      }

      if (newIndex !== activeIndex) {
        event.preventDefault(); 
        handleNavigate(sectionsConfig[newIndex].id);
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
        newIndex = Math.min(sectionsConfig.length - 1, activeIndex + 1);
        relevantKeyPress = true;
      } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        newIndex = Math.max(0, activeIndex - 1);
        relevantKeyPress = true;
      } else if (event.key === 'Home') {
        newIndex = 0;
        relevantKeyPress = true;
      } else if (event.key === 'End') {
        newIndex = sectionsConfig.length - 1;
        relevantKeyPress = true;
      }

      if (!relevantKeyPress) return;
      
      event.preventDefault(); 

      if (newIndex !== activeIndex) {
        handleNavigate(sectionsConfig[newIndex].id);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, handleNavigate]); 

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.substring(1);
      if (hash) {
        const initialIndex = sectionsConfig.findIndex(s => s.id === hash);
        if (initialIndex !== -1 && initialIndex !== activeIndex) {
          setActiveIndex(initialIndex);
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const ActiveComponent = sectionsConfig[activeIndex].component;

  const floatingDockItems: FloatingDockItem[] = sectionsConfig.map(section => ({
    title: section.label,
    icon: section.icon,
    href: `#${section.id}`,
    onClick: (e) => {
      e.preventDefault();
      handleNavigate(section.id);
    },
    isActive: sectionsConfig[activeIndex].id === section.id,
  }));

  return (
    <Box className="relative h-screen w-screen overflow-hidden">
      <motion.div
        className="fixed top-1/2 -translate-y-1/2 right-4 md:right-6 z-[50]"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.2, ease: "circOut" }}
      >
        <FloatingDock items={floatingDockItems} />
      </motion.div>
      
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={sectionsConfig[activeIndex].id}
          id={`section-panel-${sectionsConfig[activeIndex].id}`}
          role="tabpanel"
          aria-labelledby={`nav-tab-${sectionsConfig[activeIndex].id}`} // Ensure FloatingDock items have corresponding IDs if this is used
          custom={direction}
          variants={sectionVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0 w-full h-full"
          onAnimationComplete={handleAnimationComplete}
          aria-live="polite"
        >
          {sectionsConfig[activeIndex].id === 'hero' ? (
            <ActiveComponent onNavigate={handleNavigate} />
          ) : (
            <ActiveComponent />
          )}
        </motion.div>
      </AnimatePresence>
    </Box>
  );
}
