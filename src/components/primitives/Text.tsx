import type React from 'react';
import { cn } from '@/lib';

/**
 * Props for the Text component.
 * Extends standard HTML element attributes.
 */
type TextProps = React.HTMLAttributes<HTMLElement> & {
  /** The HTML tag to render. Defaults to 'p'. */
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'label';
  /** Pre-defined stylistic variations. */
  variant?: 'default' | 'muted' | 'lead' | 'large' | 'small';
};

/**
 * A polymorphic Text component for rendering typographic elements.
 * It allows rendering text with different HTML tags (`as` prop) and pre-defined
 * styles (`variant` prop), promoting semantic HTML and consistent typography. This
 * component is a key part of our design system, enforcing the DRY principle for
 * all text-based elements.
 *
 * @param {TextProps} props - The properties for the component.
 * @returns {React.ReactElement} A styled text element (e.g., <p>, <h1>, <span>).
 */
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
