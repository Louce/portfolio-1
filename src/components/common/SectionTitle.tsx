'use client';

import type React from 'react';
import { Text } from '@/components/primitives/Text';
import { cn } from '@/lib';
import { motion } from 'framer-motion';

/**
 * Props for the SectionTitle component.
 * @extends React.HTMLAttributes<HTMLHeadingElement>
 */
interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** The text content of the title. */
  children: React.ReactNode;
  /** Optional additional class names for styling. */
  className?: string;
}

/**
 * A reusable, animated title component for major sections of the page.
 * It uses Framer Motion for a subtle "fade-in and slide-down" effect,
 * creating a consistent and polished entrance for each section. This is an
 * example of a reusable presentation component that helps enforce the
 * DRY (Don't Repeat Yourself) principle.
 *
 * @param {SectionTitleProps} props - The properties for the component.
 * @returns {React.ReactElement} An animated section title (`<h2>`).
 */
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
