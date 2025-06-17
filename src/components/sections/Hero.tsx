
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

const sentence = {
  hidden: { opacity: 1 }, 
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.005, // Faster stagger for words
      delayChildren: 0, 
    },
  },
};

const letter = {
  hidden: { opacity: 0, y: 10, filter: 'blur(2px)' }, // Slightly less blur and y offset
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', damping: 15, stiffness: 200 }, // Quicker spring
  },
};

const subHeadlineText = "A Frontend Architect crafting digital experiences where design meets performance with kinetic elegance.";

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [visitorCountry, setVisitorCountry] = useState<string | null>(null);

  useEffect(() => {
    const fetchVisitorLocation = async () => {
      try {
        
        if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
            console.log("Development environment: Simulating visitor location (USA).");
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
          transition={{ duration: 0.4, delay: 0 }} 
          className="absolute top-4 left-1/2 -translate-x-1/2 md:top-6 z-10"
          aria-label={`Visitor location detected as ${visitorCountry}`}
        >
          <Flex align="center" gap="0.375rem">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-primary/80" />
            <Text as="span" className="text-xs sm:text-sm text-foreground/70">{visitorCountry}</Text>
          </Flex>
        </motion.div>
      )}

      <Flex direction="col" align="center" justify="center" className="h-full w-full space-y-6 md:space-y-8">
        <motion.div
          style={{ transform: 'translateZ(0px)' }} 
          initial={{ scale: 0.9, rotate: -3, opacity: 0 }} // Slightly reduced initial scale/rotate
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 180, // Increased stiffness for quicker animation
            damping: 20,    // Adjusted damping
            mass: 0.8,      // Adjusted mass
            delay: 0, 
          }}
        >
          <KineticText 
            text="Frontend Architect" 
            className="font-headline text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }} // Reduced initial y
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0, ease: 'easeOut' }}  // Reduced duration
        >
          <Text 
            as="h2" 
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
          initial={{ opacity: 0, y: 15 }} // Reduced initial y
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0 }} // Reduced duration
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
        transition={{ duration: 0.4, delay: 0, repeat: Infinity, repeatType: 'reverse', ease:'easeInOut' }} 
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
