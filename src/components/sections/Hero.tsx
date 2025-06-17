
'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, MapPin } from 'lucide-react';
import { SectionWrapper } from '@/components/layout';
import { Flex, Text } from '@/components/primitives';
import { Button } from '@/components/ui/button';
import { KineticText } from './KineticText';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

// Removed heroContentVariants and itemVariants.
// The main section animation is now handled by sectionVariants in page.tsx.

const subHeadlineText = "A Frontend Architect crafting digital experiences where design meets performance with kinetic elegance.";

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [visitorCountry, setVisitorCountry] = useState<string | null>(null);

  useEffect(() => {
    const fetchVisitorLocation = async () => {
      try {
        
        if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
            // console.log("Development environment: Simulating visitor location (USA).");
            // setVisitorCountry("USA (Simulated)"); 
            // return; 
        }

        const response = await fetch('https://ipwhois.app/json/', {
          headers: {
            'Accept': 'application/json',
          }
        });
        if (!response.ok) {
          if (response.headers.get("content-type")?.includes("application/json")) {
            const errorData = await response.json();
            console.warn(`IPWHOIS API error: ${response.status}`, errorData.message || errorData);
            return;
          }
          throw new Error(`Failed to fetch location: ${response.statusText}`);
        }
        const data = await response.json();
        if (data && data.country) {
          setVisitorCountry(data.country);
        } else if (data && data.success === false) {
           console.warn('IPWHOIS API reported failure:', data.message);
        }
      } catch (error) {
        console.warn('Could not fetch visitor location:', error);
      }
    };

    fetchVisitorLocation();
  }, []); 

  return (
    <SectionWrapper id="hero" className="relative text-center overflow-hidden">
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-accent/10 bg-[length:200%_200%] animate-gradient-xy"
        aria-hidden="true"
      />
      
      {visitorCountry && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.8 }} // Delayed to appear after main section transition
          className="absolute top-4 left-0 right-0 z-10 flex justify-center" // Centering using flex
          aria-label={`Visitor location detected as ${visitorCountry}`}
        >
          <Flex align="center" justify="center" gap="0.375rem" className="text-center">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-primary/80" />
            <Text as="span" className="text-xs sm:text-sm text-foreground/70">You're from {visitorCountry}</Text>
          </Flex>
        </motion.div>
      )}

      {/* The main content stack. No longer uses motion.div with heroContentVariants. */}
      {/* Individual elements also no longer use itemVariants. */}
      <div className="h-full w-full flex flex-col items-center justify-center space-y-3 md:space-y-4 text-center">
        <div className="text-center">
          <KineticText 
            text="Frontend Architect" 
            className="font-headline text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-primary text-center"
          />
        </div>

        <div className="text-center">
          <Text 
            as="h2" 
            className="text-lg sm:text-xl md:text-2xl font-light text-foreground/80 tracking-wider text-center"
          >
            KINETICODE <span className="text-primary font-normal">//</span> INNOVATE <span className="text-accent">//</span> CREATE
          </Text>
        </div>
        
        <div className="max-w-2xl text-center">
            <Text 
              as="p" 
              variant="default"
              className="font-body text-base sm:text-lg md:text-xl text-foreground/80 leading-relaxed text-center"
              aria-label={subHeadlineText}
            >
              {subHeadlineText}
            </Text>
        </div>

        <div>
          <Button 
            size="lg" 
            className="font-headline bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transform hover:scale-105 transition-transform duration-300"
            onClick={() => onNavigate('projects')}
            aria-label="View my work"
          >
            View My Work
          </Button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 1.5, repeat: Infinity, repeatType: 'reverse', ease:'easeInOut' }} 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={() => onNavigate('about')}
        aria-label="Scroll to about section"
      >
        <ChevronDown className="h-10 w-10 text-primary opacity-75 hover:opacity-100 transition-opacity" />
      </motion.div>
    </SectionWrapper>
  );
};

Hero.displayName = 'HeroSection';
