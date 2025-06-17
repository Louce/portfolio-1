'use client';

import type React from 'react';
// import { motion, type Variants } from 'framer-motion'; // motion and Variants are no longer needed here for the wrapper itself
import { cn } from '@/lib/utils';
import { Box } from '@/components/primitives';

interface SectionWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  id?: string;
  className?: string;
  // variants?: Variants; // Removed as the wrapper itself won't animate its content block by default
}

// Removed defaultVariants as the wrapper's motion.div will no longer animate by default
// const defaultVariants: Variants = {
//   hidden: { opacity: 0, y: 50 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
//   exit: { opacity: 0, y: -50, transition: { duration: 0.4, ease: "easeInOut" } },
// };

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  id,
  className,
  // variants, // variants prop is no longer used here
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
      {/* Changed motion.div to a regular div (or Box if preferred) to remove its own animation */}
      <Box
        // variants={variants} // Removed
        // initial="hidden"    // Removed
        // animate="visible"  // Removed
        // exit="exit"        // Removed
        className="w-full max-w-6xl h-full flex flex-col items-center justify-center"
      >
        {children}
      </Box>
    </Box>
  );
};

SectionWrapper.displayName = 'SectionWrapper';
