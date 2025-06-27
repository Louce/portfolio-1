import type React from 'react';
import { cn } from '@/lib';

/**
 * Props for the Box component.
 * Extends standard div element attributes.
 */
type BoxProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * A primitive Box component.
 * This is a basic building block that renders a `div` element. Its primary purpose
 * is to provide a standardized container to which styles and other attributes can be applied.
 * It serves as a fundamental piece of our design system's vocabulary, promoting consistency
 * over using raw `div`s everywhere.
 *
 * @param {BoxProps} props - The properties for the component.
 * @returns {React.ReactElement} A div element.
 */
export const Box: React.FC<BoxProps> = ({ className, children, ...props }) => {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
};

Box.displayName = 'Box';
