'use client';

import type React from 'react';
import { cn } from '@/lib';
import { Box } from '@/components/primitives';

interface SectionWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  id,
  className,
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
      <Box
        className="w-full max-w-6xl h-full flex flex-col items-center justify-center"
      >
        {children}
      </Box>
    </Box>
  );
};

SectionWrapper.displayName = 'SectionWrapper';
