'use client';

import type React from 'react';
import { cn } from '@/lib';
import { Box } from '@/components/primitives';

/**
 * Props for the SectionWrapper component.
 * @extends React.HTMLAttributes<HTMLElement>
 */
interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  /** The content to be rendered inside the section. */
  children: React.ReactNode;
  /** The ID of the section, used for anchor links (`<a href="#id">`). */
  id?: string;
  /** Optional additional class names for styling. */
  className?: string;
}

/**
 * A reusable layout component that wraps each major section of the page.
 * It provides consistent styling, including min-height for a full-screen feel,
 * padding, and centering. Using this component ensures a rhythmic and well-paced
 * vertical layout, enforcing the DRY (Don't Repeat Yourself) principle.
 *
 * @param {SectionWrapperProps} props - The properties for the component.
 * @returns {React.ReactElement} A styled `<section>` element containing the children.
 */
export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  id,
  className,
  ...props
}) => {
  return (
    <section
      id={id}
      className={cn(
        'min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden p-4 md:p-8 bg-transparent',
        className
      )}
      {...props}
    >
      <Box
        className="w-full max-w-6xl h-full flex flex-col items-center justify-center pointer-events-auto"
      >
        {children}
      </Box>
    </section>
  );
};

SectionWrapper.displayName = 'SectionWrapper';
