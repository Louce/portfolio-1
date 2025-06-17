
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

export const PageNavigation: React.FC<PageNavigationProps> = React.memo(({
  sections,
  activeSection,
  onNavigate,
  className,
}) => {
  return (
    <motion.nav
      className={cn("fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:block", className)}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <ul className="space-y-3" role="tablist" aria-label="Page Sections">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          
          const dotVariants = {
            active: {
              scale: 1.45,
              backgroundColor: "hsl(var(--primary))", 
              borderColor: "hsl(var(--primary))",
            },
            inactive: {
              scale: 1,
              backgroundColor: "rgba(0, 0, 0, 0)", 
              borderColor: "hsla(var(--foreground), 0.5)",
            }
          };

          const dotHover = isActive 
            ? { scale: 1.55 } 
            : { scale: 1.25, borderColor: "hsl(var(--primary))" };

          return (
            <li key={section.id} className="flex items-center justify-end" role="presentation">
              <motion.button
                id={`nav-tab-${section.id}`}
                role="tab"
                aria-controls={`section-panel-${section.id}`}
                aria-selected={isActive}
                onClick={() => onNavigate(section.id)}
                className="w-3 h-3 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                variants={dotVariants}
                animate={isActive ? "active" : "inactive"}
                whileHover={dotHover}
                transition={dotTransition}
                aria-label={`Go to ${section.label} section`}
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
