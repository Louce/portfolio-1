
'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib';

interface PageNavigationProps {
  sections: Array<{ id: string; label: string }>;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  className?: string;
}

const dotTransition = { type: "spring", stiffness: 500, damping: 30, duration: 0.2 };

// Removed hardcoded HSL colors. Tailwind classes will be used in variants.
// const primaryColor = "hsl(182, 100%, 74%)"; 
// const foregroundColorTransparent = "hsla(43, 67%, 96%, 0.5)";
// const transparentColor = "hsla(0, 0%, 0%, 0)";

export const PageNavigation: React.FC<PageNavigationProps> = React.memo(({
  sections,
  activeSection,
  onNavigate,
  className,
}) => {
  return (
    <motion.nav
      className={cn("fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:block", className)}
      initial={{ opacity: 0, x: 30 }} // Entry animation from right
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1.2, ease: "circOut" }} // Adjusted delay
    >
      <ul className="space-y-3" role="tablist" aria-label="Page Sections">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          
          const dotVariants = {
            active: {
              scale: 1.45,
              // Use CSS variables directly if Framer Motion supports them here for arbitrary values,
              // or rely on Tailwind classes if these map to theme colors.
              // For simplicity and direct Tailwind integration, we'll use classes if possible.
              // If using CSS variables for colors:
              // backgroundColor: "var(--primary)", 
              // borderColor: "var(--primary)",
              // However, Framer Motion typically works best with direct values or CSS variables in style prop.
              // Let's assume Tailwind classes can be used for `backgroundColor` and `borderColor` if `motion.button` is styled like a div.
              // For this case, we might need to ensure the element can receive these styles.
              // A safer bet if direct tailwind classes are not interpolatable for `backgroundColor` in `variants`
              // is to apply classes that set these CSS variables if needed, or directly set style.
              // Given the component structure, applying Tailwind classes that resolve to the desired colors is cleaner.
            },
            inactive: {
              scale: 1,
              // backgroundColor: "transparent", 
              // borderColor: "hsla(var(--foreground-rgb), 0.5)", // Needs foreground-rgb defined or use a Tailwind class
            }
          };

          // Using Tailwind classes directly for hover state and dynamic active state
          // The `animate` prop will toggle between "active" and "inactive" styles defined using Tailwind.

          return (
            <li key={section.id} className="flex items-center justify-end" role="presentation">
              <motion.button
                id={`nav-tab-${section.id}`}
                role="tab"
                aria-controls={`section-panel-${section.id}`}
                aria-selected={isActive}
                onClick={() => onNavigate(section.id)}
                className={cn(
                  "w-3 h-3 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
                  isActive 
                    ? "bg-primary border-primary scale-[1.45]" // Active state with Tailwind
                    : "bg-transparent border-foreground/50 scale-100" // Inactive state with Tailwind
                )}
                // Variants can still be used for scale, but color can be driven by className logic
                variants={{ active: { scale: 1.45 }, inactive: { scale: 1 } }}
                animate={isActive ? "active" : "inactive"}
                whileHover={
                  isActive 
                    ? { scale: 1.55 } 
                    : { scale: 1.25, borderColor: 'hsl(var(--primary))' } // direct hsl for hover when inactive for border
                }
                transition={dotTransition}
                aria-label={`Go to ${section.label} section`}
                style={{
                  // If using CSS variables for dynamic colors in Framer:
                  // borderColor: isActive ? 'var(--primary)' : 'hsla(var(--your-foreground-hsl), 0.5)',
                  // backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                }}
              />
              <AnimatePresence>
              {isActive && (
                <motion.span 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="ml-3 text-sm text-primary font-medium hidden lg:inline-block pointer-events-none"
                  aria-hidden="true"
                >
                  {section.label}
                </motion.span>
              )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
});

PageNavigation.displayName = 'PageNavigation';
