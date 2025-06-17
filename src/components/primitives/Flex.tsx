import type React from 'react';
import { cn } from '@/lib/utils';

type FlexProps = React.HTMLAttributes<HTMLDivElement> & {
  direction?: 'row' | 'col';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: string | number;
};

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
