'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PageNavigationProps {
  sections: Array<{ id: string; label: string }>;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  className?: string;
}

export const PageNavigation: React.FC<PageNavigationProps> = ({
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
      <ul className="space-y-3">
        {sections.map((section) => (
          <li key={section.id} className="flex items-center justify-end">
            <button
              onClick={() => onNavigate(section.id)}
              className={cn(
                "w-3 h-3 rounded-full border-2 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
                activeSection === section.id ? "bg-primary border-primary scale-125" : "bg-transparent border-foreground/50 hover:border-primary hover:scale-110"
              )}
              aria-label={`Go to ${section.label} section`}
              aria-current={activeSection === section.id ? 'page' : undefined}
            />
            <AnimatePresence>
            {activeSection === section.id && (
              <motion.span 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="ml-3 text-sm text-primary font-medium hidden lg:inline-block pointer-events-none"
              >
                {section.label}
              </motion.span>
            )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
};
