
'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, MapPin } from 'lucide-react'; // Added MapPin
import { SectionWrapper } from '@/components/layout';
import { Flex, Text } from '@/components/primitives';
import { Button } from '@/components/ui/button';
import { KineticText } from './KineticText';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

const sentence = {
  hidden: { opacity: 1 }, // Parent opacity for stagger control
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 1.0, // Start after KineticText and Tagline
      staggerChildren: 0.04,
    },
  },
};

const letter = {
  hidden: { opacity: 0, y: 15, filter: 'blur(3px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', damping: 15, stiffness: 150 },
  },
};

const subHeadlineText = "A Frontend Architect crafting digital experiences where design meets performance with kinetic elegance.";

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [visitorCountry, setVisitorCountry] = useState<string | null>(null);

  useEffect(() => {
    const fetchVisitorLocation = async () => {
      try {
        // Simulating API response for environments where external fetch might be restricted or for consistent testing
        if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
            console.log("Development environment: Simulating visitor location (USA).");
            // setVisitorCountry("United States (Simulated)");
            // return; 
            // Keeping actual fetch for now, as per original implementation
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
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <SectionWrapper id="hero" className="relative text-center overflow-hidden">
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-accent/10 bg-[length:200%_200%] animate-gradient-xy"
        aria-hidden="true"
      />
      
      {/* Visitor Location Display - Moved to top left */}
      {visitorCountry && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.8 }} // Adjusted delay slightly, can be tuned
          className="absolute top-4 left-4 md:top-6 md:left-6 text-xs sm:text-sm text-foreground/70 flex items-center z-10"
          aria-label={`Visitor location detected as ${visitorCountry}`}
        >
          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 text-primary/80" />
          <span>{visitorCountry}</span>
        </motion.div>
      )}

      <Flex direction="col" align="center" justify="center" className="h-full w-full space-y-6 md:space-y-10">
        <motion.div
          style={{ transform: 'translateZ(0px)' }} 
          initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            opacity: { duration: 0.6, delay: 0.2, ease: "easeOut" },
            scale: { duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] },
            rotate: { duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] },
          }}
        >
          <KineticText 
            text="Frontend Architect" 
            className="font-headline text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}
        >
          <Text 
            as="h2" // More semantic for a tagline
            className="text-lg sm:text-xl md:text-2xl font-light text-foreground/80 tracking-wider"
          >
            KINETICODE <span className="text-primary font-normal">//</span> INNOVATE <span className="text-accent">//</span> CREATE
          </Text>
        </motion.div>
        
        <motion.div
          variants={sentence}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          <Text 
            as="p" 
            variant="default"
            className="font-body text-base sm:text-lg md:text-xl text-foreground/80 leading-relaxed"
            aria-label={subHeadlineText}
          >
            {subHeadlineText.split(' ').map((word, index) => (
              <React.Fragment key={word + '-' + index}>
                <motion.span
                  variants={letter}
                  className="inline-block"
                >
                  {word}
                </motion.span>
                {index < subHeadlineText.split(' ').length -1 && <span className="inline-block">&nbsp;</span>}
              </React.Fragment>
            ))}
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }} // Adjusted delay
        >
          <Button 
            size="lg" 
            className="font-headline bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transform hover:scale-105 transition-transform duration-300"
            onClick={() => onNavigate('projects')}
            aria-label="View my work"
          >
            View My Work
          </Button>
        </motion.div>
      </Flex>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.1, repeat: Infinity, repeatType: 'reverse', ease:'easeInOut' }} // Adjusted delay
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

