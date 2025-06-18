
'use client';

import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import { PageNavigation } from '@/components/layout';
import { Box } from '@/components/primitives';
import { HomeIcon, UserIcon, CodeIcon, LayersIcon, MailIcon, MessageSquareIcon, Loader2 } from 'lucide-react';
import type { HeroProps } from '@/components/sections/Hero/Hero'; // Assuming HeroProps is exported

// Statically import Hero as it's the first visible section
import { Hero } from '@/components/sections';

// Dynamically import other sections
const About = dynamic(() => import('@/components/sections').then(mod => mod.About), {
  suspense: true, loading: () => <SectionLoader />
});
const Skills = dynamic(() => import('@/components/sections').then(mod => mod.Skills), {
  suspense: true, loading: () => <SectionLoader />
});
const Projects = dynamic(() => import('@/components/sections').then(mod => mod.Projects), {
  suspense: true, loading: () => <SectionLoader />
});
const Contact = dynamic(() => import('@/components/sections').then(mod => mod.Contact), {
  suspense: true, loading: () => <SectionLoader />
});
const Feedback = dynamic(() => import('@/components/sections').then(mod => mod.Feedback), {
  suspense: true, loading: () => <SectionLoader />
});

interface SectionConfig {
  id: string;
  label: string;
  component: React.ComponentType<any>; // Use 'any' for props with dynamic components or define a common props interface
  icon: React.ReactNode;
}

const sectionsConfig: SectionConfig[] = [
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
      duration: 0.3,
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction < 0 ? "100vh" : "-100vh",
    scale: 1,
    transition: {
      type: "tween",
      ease: "easeIn",
      duration: 0.3,
    },
  }),
};

const SectionLoader: React.FC = () => (
  <Box className="w-full h-full flex items-center justify-center text-primary">
    <Loader2 className="w-12 h-12 animate-spin" />
  </Box>
);


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

  return (
    <Box className="relative h-screen w-screen overflow-hidden bg-background">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      
      <PageNavigation 
        sections={sectionsConfig} 
        activeSection={sectionsConfig[activeIndex].id} 
        onNavigate={handleNavigate}
      />
      
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={sectionsConfig[activeIndex].id}
          id={`section-panel-${sectionsConfig[activeIndex].id}`}
          role="tabpanel"
          aria-labelledby={`nav-tab-${sectionsConfig[activeIndex].id}`}
          custom={direction}
          variants={sectionVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0 w-full h-full z-10 pointer-events-none"
          onAnimationComplete={handleAnimationComplete}
          aria-live="polite"
        >
          <Suspense fallback={<SectionLoader />}>
            {sectionsConfig[activeIndex].id === 'hero' ? (
              <ActiveComponent onNavigate={handleNavigate as HeroProps['onNavigate']} />
            ) : (
              <ActiveComponent />
            )}
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
}

