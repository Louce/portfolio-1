
'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MapPin } from 'lucide-react';
import { Flex, Text } from '@/components/primitives';
import { Button } from '@/components/ui/Button/button';


export interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

const subHeadlineBase = "A Python, Automation, and Game Development enthusiast, blending logic with creative design.";

const dynamicSubHeadlines = [
  "PYTHON // AUTOMATION // GAME DEV",
  "DESIGN // INNOVATION // SOLUTIONS",
  "LOGIC // CREATIVITY // EFFICIENCY",
  "CODE // BUILD // PLAY"
];

const subHeadlineAnimation = {
  initial: { opacity: 1, scale: 1, y: 0 }, // Ensures it starts visible and at final scale/position
  animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.85, y: -10, transition: { duration: 0.4, ease: "easeIn" } },
};

export const Hero: React.FC<HeroProps> = React.memo(({ onNavigate }) => {
  const [visitorLocation, setVisitorLocation] = useState<string | null>(null);
  const [currentSubHeadlineIndex, setCurrentSubHeadlineIndex] = useState(0);
  const [startCyclingAnimation, setStartCyclingAnimation] = useState(false);


  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setStartCyclingAnimation(true);
    }, 500); 

    const fetchVisitorLocation = async () => {
      try {
        if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
            setVisitorLocation("California, USA (Simulated)"); 
            return; 
        }

        const response = await fetch('https://ipwhois.app/json/', {
          headers: {
            'Accept': 'application/json',
          }
        });
        if (!response.ok) {
          let errorMsg = `Failed to fetch location: ${response.statusText}`;
          try {
            const errorData = await response.json();
            errorMsg = errorData.message || errorMsg;
            console.warn(`IPWHOIS API error: ${response.status}`, errorMsg);
          } catch (jsonError) {
            console.warn(errorMsg, "Response was not valid JSON.");
          }
          setVisitorLocation("Location: Unknown");
          return; 
        }
        const data = await response.json();

        if (data && data.success !== false) { 
          let locationString = "";
          if (data.country) { 
            if (data.city && data.region && data.city !== data.region) {
              locationString = `${data.city}, ${data.region}, ${data.country}`;
            } else if (data.region && data.region !== data.country) {
              locationString = `${data.region}, ${data.country}`;
            } else if (data.city && data.city !== data.country) { 
              locationString = `${data.city}, ${data.country}`;
            } else {
              locationString = data.country;
            }
          }
          if (locationString) {
            setVisitorLocation(locationString);
          } else {
            console.warn('IPWHOIS API did not return expected country data.');
            setVisitorLocation("Location: Unknown");
          }
        } else if (data && data.success === false) {
           console.warn('IPWHOIS API reported failure:', data.message);
           setVisitorLocation("Location: Unknown");
        } else {
          setVisitorLocation("Location: Unknown");
        }
      } catch (error) {
        console.warn('Could not fetch visitor location:', error);
        setVisitorLocation("Location: Unknown");
      }
    };

    fetchVisitorLocation();

    const subHeadlineIntervalId = setInterval(() => {
      setCurrentSubHeadlineIndex((prevIndex) => (prevIndex + 1) % dynamicSubHeadlines.length);
    }, 3000); 

    return () => {
      clearTimeout(animationTimer);
      clearInterval(subHeadlineIntervalId);
    };
  }, []); 

  const renderSubHeadlineContent = (text: string) => {
    return text.split(' // ').map((part, index, arr) => (
      <React.Fragment key={part + index}>
        {part}
        {index < arr.length - 1 && (
          <span className={index % 2 === 0 ? "text-primary font-medium" : "text-accent font-medium"}> // </span>
        )}
      </React.Fragment>
    ));
  };


  return (
    <div className="relative flex flex-col h-full w-full items-center justify-center text-foreground overflow-hidden pointer-events-auto">
      
      {visitorLocation && (
        <Flex 
          align="center" 
          justify="center" 
          gap="0.375rem" 
          className="absolute top-4 left-0 right-0 z-10 text-center" // Removed motion wrapper for instant appearance
          aria-label={`Visitor location: ${visitorLocation}`}
        >
          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-primary/80" />
          <Text as="span" className="text-xs sm:text-sm text-foreground/70">{visitorLocation}</Text>
        </Flex>
      )}
      
      <div // Changed from motion.div to div to remove entry animation
        className="relative z-10 flex flex-col items-center justify-center h-full space-y-4 md:space-y-6 text-center px-4 pointer-events-auto"
      >
        <h1 className="text-center pt-16 md:pt-0">
          <span
            className="font-headline text-7xl sm:text-8xl md:text-9xl lg:text-display-lg xl:text-display-xl font-bold tracking-tight text-primary text-center leading-none"
          >
            Dendi Rivaldi
          </span>
        </h1>

        <div className="text-center h-8 sm:h-10 md:h-12">
          {!startCyclingAnimation ? (
            <span className="block text-xl sm:text-2xl md:text-3xl font-light text-foreground/80 tracking-wider text-center">
              {renderSubHeadlineContent(dynamicSubHeadlines[0])}
            </span>
          ) : (
            <AnimatePresence mode="wait">
              <motion.span
                key={currentSubHeadlineIndex}
                variants={subHeadlineAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                className="block text-xl sm:text-2xl md:text-3xl font-light text-foreground/80 tracking-wider text-center"
              >
                {renderSubHeadlineContent(dynamicSubHeadlines[currentSubHeadlineIndex])}
              </motion.span>
            </AnimatePresence>
          )}
        </div>
        
        <div className="max-w-xl text-center px-4">
            <Text 
              as="p" 
              variant="default"
              className="font-body text-base sm:text-lg text-foreground/75 leading-relaxed text-center"
              aria-label={subHeadlineBase}
            >
              {subHeadlineBase}
            </Text>
        </div>

        <div className="pt-2">
          <Button 
            size="lg" 
            variant="default" 
            className="font-headline bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transform hover:scale-105 transition-transform duration-300 rounded-xl"
            onClick={() => onNavigate('projects')}
            aria-label="View my work"
          >
            View My Work
          </Button>
        </div>
      </div>

      <motion.button
        initial={{ opacity: 1, scale: 0.7, y: 20 }} // Starts visible but small for pulse
        animate={{ opacity: 1, scale: 1, y: 0 }}     // Pulse target state
        transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse', ease:'easeInOut' }} // Removed delay
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer p-2 rounded-full hover:bg-primary/10 focus-visible:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors z-10"
        onClick={() => onNavigate('about')}
        aria-label="Scroll to about section"
      >
        <ChevronDown className="h-10 w-10 text-primary transition-opacity hover:opacity-75" />
      </motion.button>
    </div>
  );
});

Hero.displayName = 'HeroSection';
