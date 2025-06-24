'use client';

import type React from 'react';
import { Text } from '@/components/primitives/Text';
import { cn } from '@/lib';
import { motion } from 'framer-motion';

interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ children, className, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.1 }}
    >
      <Text
        as="h2"
        variant="default"
        className={cn(
          "font-headline text-4xl md:text-5xl font-bold text-primary text-center mb-10 md:mb-12",
          className
        )}
        {...props}
      >
        {children}
      </Text>
    </motion.div>
  );
};

SectionTitle.displayName = 'SectionTitle';
