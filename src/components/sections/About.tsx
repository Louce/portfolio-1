
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { SectionWrapper } from '@/components/layout';
import { Flex, Text, Box } from '@/components/primitives';

export const About: React.FC = () => {
  const paragraphAnimation = {
    hidden: { opacity: 1 }, // Parent itself is visible to allow stagger
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Stagger for each word
      },
    },
  };

  const wordAnimation = {
    hidden: { opacity: 0, y: 20, filter: 'blur(3px)', scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: { type: 'spring', damping: 15, stiffness: 100 },
    },
  };

  const aboutText = "I'm a passionate frontend architect dedicated to building intuitive, performant, and visually stunning web applications. With a keen eye for detail and a love for clean, scalable code, I transform complex problems into elegant user experiences. My philosophy revolves around the 'Crystal Cathedral' approach – crafting code that is as beautiful and robust as the final product.";

  return (
    <SectionWrapper id="about" className="bg-gradient-to-br from-background to-slate-900/60">
      <Flex direction="col" align="center" justify="center" className="h-full gap-12 lg:flex-row lg:gap-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, x: -50 }} // Slide in from left for image
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ type: "spring", stiffness: 100, damping: 18, duration: 0.7, delay: 0.1 }}
          className="w-full max-w-md lg:w-2/5"
        >
          <Box className="relative aspect-square rounded-lg overflow-hidden shadow-2xl group">
            <Image
              src="https://placehold.co/600x600.png"
              alt="Portrait of the developer"
              data-ai-hint="developer portrait"
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 group-hover:scale-105 group-hover:brightness-110"
            />
            <Box className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
          </Box>
        </motion.div>

        <Flex direction="col" justify="center" className="w-full lg:w-3/5 space-y-6 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
          >
            <Text 
              as="h2" 
              variant="default" 
              className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4"
            >
              About Me
            </Text>
          </motion.div>
          
          <motion.div 
            variants={paragraphAnimation} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.2 }}
            transition={{delay: 0.3}} // Delay for the whole paragraph block to start its stagger
          >
            {aboutText.split(' ').map((word, index) => (
              <motion.span 
                key={word + '-' + index} 
                variants={wordAnimation} 
                className="inline-block mr-[0.2em] font-body text-lg md:text-xl text-foreground/90 leading-relaxed"
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.5 }}
          >
            <Text variant="lead" className="font-body text-foreground/80">
              Let's build something amazing together.
            </Text>
          </motion.div>
        </Flex>
      </Flex>
    </SectionWrapper>
  );
};

About.displayName = 'AboutSection';
