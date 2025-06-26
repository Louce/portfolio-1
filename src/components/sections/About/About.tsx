'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/layout';
import { Flex, Text } from '@/components/primitives';
import { SectionTitle } from '@/components/common';
import { Button, Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui';
import { Download } from 'lucide-react';
import { aboutText, philosophyItems } from '@/data/aboutData';
import { AvatarGenerator } from './components';

/**
 * The About section of the portfolio.
 * It displays a personal photo, a biographical summary, an accordion detailing
 * design philosophies, and a button to download a resume.
 * The section is heavily animated with Framer Motion for a dynamic entrance.
 *
 * @returns {React.ReactElement} The About section component.
 */
export const About: React.FC = React.memo(() => {
  return (
    <SectionWrapper id="about" className="bg-card">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center w-full max-w-6xl">
        <div className="lg:col-span-2 flex justify-center">
          <AvatarGenerator />
        </div>

        <div className="lg:col-span-3 space-y-6 text-center lg:text-left">
          <SectionTitle className="text-center lg:text-left mb-4">
            About Me
          </SectionTitle>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-body text-lg md:text-xl text-foreground/90 leading-loose"
          >
            {aboutText}
          </motion.p>

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
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transform hover:scale-105 transition-transform duration-300 rounded-lg">
              <a href="/DendiRivaldi_Resume.pdf" download="DendiRivaldi_Resume.pdf" aria-label="Download Dendi Rivaldi's resume">
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
});

About.displayName = 'AboutSection';
