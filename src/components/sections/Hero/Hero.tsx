
'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, MapPin } from 'lucide-react';
import { SectionWrapper } from '@/components/layout';
import { Flex, Text } from '@/components/primitives';
import { Button } from '@/components/ui'; // Updated import
import { KineticText } from './KineticText';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

const subHeadlineText = "A Frontend Architect crafting digital experiences where design meets performance with kinetic elegance.";

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [visitorLocation, setVisitorLocation] = useState<string | null>(null);

  useEffect(() => {
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
          if (response.headers.get("content-type")?.includes("application/json")) {
            const errorData = await response.json();
            console.warn(`IPWHOIS API error: ${response.status}`, errorData.message || errorData);
            return;
          }
          throw new Error(`Failed to fetch location: ${response.statusText}`);
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
            }
             else {
              locationString = data.country;
            }
          }
          if (locationString) {
            setVisitorLocation(locationString);
          } else {
            console.warn('IPWHOIS API did not return expected country data.');
          }
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
      
      {visitorLocation && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="absolute top-4 left-0 right-0 z-10 flex justify-center"
          aria-label={`Visitor location detected: ${visitorLocation}`}
        >
          <Flex align="center" justify="center" gap="0.375rem" className="text-center">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-primary/80" />
            <Text as="span" className="text-xs sm:text-sm text-foreground/70">You're from {visitorLocation}</Text>
          </Flex>
        </motion.div>
      )}

      <div className="h-full w-full flex flex-col items-center justify-center space-y-4 md:space-y-6 text-center">
        <div className="text-center">
          <KineticText 
            text="Frontend" 
            className="font-headline text-7xl sm:text-8xl md:text-9xl lg:text-[120px] xl:text-[150px] font-bold tracking-tight text-primary text-center leading-none"
          />
        </div>

        <div className="text-center">
          <Text 
            as="h2" 
            className="text-xl sm:text-2xl md:text-3xl font-light text-foreground/80 tracking-wider text-center"
          >
            KINETICODE <span className="text-primary font-normal">//</span> INNOVATE <span className="text-accent">//</span> CREATE
          </Text>
        </div>
        
        <div className="max-w-xl text-center px-4">
            <Text 
              as="p" 
              variant="default"
              className="font-body text-base sm:text-lg text-foreground/75 leading-relaxed text-center"
              aria-label={subHeadlineText}
            >
              {subHeadlineText}
            </Text>
        </div>

        <div className="pt-2">
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
