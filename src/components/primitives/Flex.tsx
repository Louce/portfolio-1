import type React from 'react';
import { cn } from '@/lib';

/**
 * Props for the Flex component.
 * Extends standard div attributes and adds flexbox-specific properties.
 */
type FlexProps = React.HTMLAttributes<HTMLDivElement> & {
  /** The flex-direction of the container. Defaults to 'row'. */
  direction?: 'row' | 'col';
  /** The align-items property. */
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  /** The justify-content property. */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  /** The flex-wrap property. */
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  /** The gap between flex items. Can be a string (e.g., '1rem') or a number (in pixels). */
  gap?: string | number;
};

/**
 * A primitive Flex component.
 * This component renders a `div` with `display: flex` and provides convenient props
 * for controlling flexbox alignment, justification, direction, and wrapping.
 * It's a powerful DRY (Don't Repeat Yourself) abstraction that simplifies the
 * creation of complex flexbox layouts without writing repetitive Tailwind classes.
 *
 * @param {FlexProps} props - The properties for the component.
 * @returns {React.ReactElement} A div element with flexbox styles.
 */
export const Flex: React.FC<FlexProps> = ({
  className,
  children,
  direction = 'row',
  align,
  justify,
  wrap,
  gap,
  style,
  ...props
}) => {
  const flexStyles: React.CSSProperties = {
    gap: typeof gap === 'number' ? `${gap}px` : gap,
    ...style,
  };

  return (
    <div
      className={cn(
        'flex',
        direction === 'col' ? 'flex-col' : 'flex-row',
        align && `items-${align}`,
        justify && `justify-${justify}`,
        wrap && `flex-${wrap}`,
        className
      )}
      style={flexStyles}
      {...props}
    >
      {children}
    </div>
  );
};

Flex.displayName = 'Flex';
