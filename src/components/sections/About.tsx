
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { SectionWrapper } from '@/components/layout';
import { Flex, Text, Box } from '@/components/primitives';

export const About: React.FC = () => {
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        staggerChildren: 0.08,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const aboutText = "I'm a passionate frontend architect dedicated to building intuitive, performant, and visually stunning web applications. With a keen eye for detail and a love for clean, scalable code, I transform complex problems into elegant user experiences. My philosophy revolves around the 'Crystal Cathedral' approach – crafting code that is as beautiful and robust as the final product.";

  return (
    <SectionWrapper id="about" className="bg-gradient-to-br from-background to-slate-900/60">
      <Flex direction="col" align="center" justify="center" className="h-full gap-12 lg:flex-row lg:gap-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
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
          <Text 
            as="h2" 
            variant="default" 
            className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4"
          >
            About Me
          </Text>
          <motion.div variants={sentence} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            {aboutText.split(' ').map((word, index) => (
              <motion.span key={word + '-' + index} variants={letter} className="inline-block mr-[0.2em] font-body text-lg md:text-xl text-foreground/90 leading-relaxed">
                {word}
              </motion.span>
            ))}
          </motion.div>
          <Text variant="lead" className="font-body text-foreground/80">
            Let's build something amazing together.
          </Text>
        </Flex>
      </Flex>
    </SectionWrapper>
  );
};

About.displayName = 'AboutSection';
