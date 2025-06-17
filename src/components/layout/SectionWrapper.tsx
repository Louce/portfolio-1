'use client';

import type React from 'react';
import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Box } from '@/components/primitives';

interface SectionWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  id?: string;
  className?: string;
  variants?: Variants;
}

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
  exit: { opacity: 0, y: -50, transition: { duration: 0.4, ease: "easeInOut" } },
};

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  id,
  className,
  variants = defaultVariants,
  ...props
}) => {
  return (
    <Box
      as="section"
      id={id}
      className={cn(
        'min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden p-4 md:p-8',
        className
      )}
      {...props}
    >
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-full max-w-6xl h-full flex flex-col items-center justify-center"
      >
        {children}
      </motion.div>
    </Box>
  );
};

SectionWrapper.displayName = 'SectionWrapper';
