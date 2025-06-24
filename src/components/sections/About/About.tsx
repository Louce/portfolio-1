'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { SectionWrapper } from '@/components/layout';
import { Flex, Text, Box } from '@/components/primitives';
import { SectionTitle } from '@/components/common';
import { Button, Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui';
import { Download } from 'lucide-react';
import { aboutText, philosophyItems } from '@/data/aboutData';

/**
 * The About section of the portfolio.
 * It displays a personal photo, a biographical summary, an accordion detailing
 * design philosophies, and a button to download a resume.
 * The section is heavily animated with Framer Motion for a dynamic entrance.
 *
 * @returns {React.ReactElement} The About section component.
 */
export const About: React.FC = React.memo(() => {
  // Animation variants for staggering the appearance of words in the main text.
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

  return (
    <SectionWrapper id="about" className="bg-card">
      <Flex direction="col" align="center" justify="center" className="h-full gap-12 lg:flex-row lg:gap-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, x: -50, rotate: -3 }} 
          whileInView={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ type: "spring", stiffness: 100, damping: 18, duration: 0.7, delay: 0.1 }}
          className="w-full max-w-md lg:w-2/5"
        >
          <Box className="relative aspect-square rounded-xl overflow-hidden shadow-2xl group bg-card/80 backdrop-blur-lg border border-white/10">
            <Image
              src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=600&q=80"
              alt="Portrait of Dendi Rivaldi, Python, Automation, and Game Development enthusiast"
              data-ai-hint="developer portrait"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105 group-hover:brightness-110"
              priority 
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
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
            viewport={{ once: false, amount: 0.2 }}
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
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="w-full"
            >
              <Accordion type="single" collapsible className="w-full">
                {philosophyItems.map((item) => (
                  <AccordionItem value={item.value} key={item.value}>
                    <AccordionTrigger className="text-base font-semibold hover:text-primary transition-colors">
                      <Flex align="center" gap={3}>
                        <item.icon className="h-5 w-5 text-accent" />
                        {item.trigger}
                      </Flex>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm pl-8">
                      {item.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.6, duration: 0.5 }}
            className="mt-6 flex items-center justify-center lg:justify-start"
          >
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-md transform hover:scale-105 transition-transform duration-300 rounded-lg">
              <a href="/DendiRivaldi_Resume.pdf" download="DendiRivaldi_Resume.pdf" aria-label="Download Dendi Rivaldi's resume">
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
