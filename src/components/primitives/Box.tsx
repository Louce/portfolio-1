import type React from 'react';
import { cn } from '@/lib/utils';

type BoxProps = React.HTMLAttributes<HTMLDivElement>;

export const Box: React.FC<BoxProps> = ({ className, children, ...props }) => {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
};

Box.displayName = 'Box';
