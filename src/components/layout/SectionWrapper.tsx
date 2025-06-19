
import type React from 'react';
import { cn } from '@/lib';
import { Box } from '@/components/primitives';

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> { // Changed HTMLDivElement to HTMLElement
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
    <section // Changed from Box to section
      id={id}
      className={cn(
        'min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden p-4 md:p-8 bg-transparent',
        className
      )}
      {...props} // Outer section wrapper naturally inherits pointer-events: none
    >
      <Box
        className="w-full max-w-6xl h-full flex flex-col items-center justify-center pointer-events-auto" // This container for content gets pointer-events: auto
      >
        {children}
      </Box>
    </section>
  );
};

SectionWrapper.displayName = 'SectionWrapper';
