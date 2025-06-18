
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { SectionWrapper } from '@/components/layout';
import { Flex, Text, Box, SectionTitle } from '@/components/primitives';
import { Button } from '@/components/ui';
import { Download } from 'lucide-react';

export const About: React.FC = React.memo(() => {
  const paragraphAnimation = {
    hidden: { opacity: 1 }, 
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
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

  const aboutText = "I'm Dendi Rivaldi, a passionate developer with a strong interest in Python, automation, and game development. I enjoy tackling challenges and architecting efficient solutions. I also have a keen eye for design, striving to create intuitive and engaging user experiences. My approach combines analytical thinking with creative problem-solving to build impactful software.";

  return (
    <SectionWrapper id="about" className="bg-transparent">
      <Flex direction="col" align="center" justify="center" className="h-full gap-12 lg:flex-row lg:gap-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, x: -50, rotate: -3 }} 
          whileInView={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ type: "spring", stiffness: 100, damping: 18, duration: 0.7, delay: 0.1 }}
          className="w-full max-w-md lg:w-2/5"
        >
          <Box className="relative aspect-square rounded-xl overflow-hidden shadow-2xl group bg-card/80 backdrop-blur-lg border border-white/10">
            <Image
              src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=600&q=80"
              alt="Portrait of Dendi Rivaldi"
              data-ai-hint="developer portrait"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105 group-hover:brightness-110"
              priority 
              style={{ objectFit: 'cover' }}
            />
            <Box className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
          </Box>
        </motion.div>

        <Flex direction="col" justify="center" className="w-full lg:w-3/5 space-y-6 text-center lg:text-left">
          <SectionTitle className="text-center lg:text-left mb-4">
            About Me
          </SectionTitle>
          
          <motion.div 
            variants={paragraphAnimation} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.2 }}
            transition={{delay: 0.3}} 
            className="font-body text-lg md:text-xl text-foreground/90 leading-loose"
          >
            {aboutText.split(' ').map((word, index) => (
              <motion.span 
                key={word + '-' + index} 
                variants={wordAnimation} 
                className="inline-block mr-[0.2em]"
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.3 + (aboutText.split(' ').length * 0.02) }}
          >
            <Text variant="lead" className="font-body text-foreground/80">
              Let's create something innovative together.
            </Text>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.4 + (aboutText.split(' ').length * 0.02), duration: 0.5 }}
            className="mt-6"
          >
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-md transform hover:scale-105 transition-transform duration-300 rounded-lg">
              <a href="/resume.pdf" download="DendiRivaldi_Resume.pdf" aria-label="Download Dendi Rivaldi's resume">
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </a>
            </Button>
          </motion.div>
        </Flex>
      </Flex>
    </SectionWrapper>
  );
});

About.displayName = 'AboutSection';
