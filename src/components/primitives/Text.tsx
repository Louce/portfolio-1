import type React from 'react';
import { cn } from '@/lib';

type TextProps = React.HTMLAttributes<HTMLElement> & {
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'label';
  variant?: 'default' | 'muted' | 'lead' | 'large' | 'small';
};

export const Text: React.FC<TextProps> = ({
  as: Component = 'p',
  className,
  children,
  variant = 'default',
  ...props
}) => {
  const variantClasses = {
    default: '',
    muted: 'text-muted-foreground',
    lead: 'text-xl text-muted-foreground',
    large: 'text-lg font-semibold',
    small: 'text-sm font-medium leading-none',
  };

  return (
    <Component className={cn(variantClasses[variant], className)} {...props}>
      {children}
    </Component>
  );
};

Text.displayName = 'Text';
