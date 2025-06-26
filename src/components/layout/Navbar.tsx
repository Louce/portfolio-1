'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HomeIcon, UserIcon, CodeIcon, LayersIcon, MailIcon, MessageSquareIcon } from 'lucide-react';
import { cn } from '@/lib';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip/tooltip';
import { Separator } from '@/components/ui';
import { ThemeSwitcher } from './ThemeSwitcher';

/**
 * Defines the structure for each navigation item in the Navbar.
 */
const navItems = [
  { id: 'hero', label: 'Home', icon: HomeIcon },
  { id: 'about', label: 'About', icon: UserIcon },
  { id: 'skills', label: 'Skills', icon: CodeIcon },
  { id: 'projects', label: 'Projects', icon: LayersIcon },
  { id: 'feedback', label: 'Feedback', icon: MessageSquareIcon },
  { id: 'contact', label: 'Contact', icon: MailIcon },
];

/**
 * A floating, animated navigation bar for the single-page application.
 * It appears with a subtle animation and provides smooth-scrolling links to different
 * sections of the page. It consolidates primary navigation and the theme switcher
 * into a single, clean, and accessible component.
 *
 * @returns {React.ReactElement} The application's main navigation component.
 */
export const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50"
      aria-label="Main Navigation"
    >
      <div className="mx-auto mt-4 max-w-max rounded-full border border-border/30 bg-background/50 p-2 shadow-lg backdrop-blur-md">
        <ul className="flex items-center justify-center gap-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={`#${item.id}`}
                    className={cn(
                      'group relative flex h-10 w-10 items-center justify-center rounded-full',
                      'transition-colors duration-200 hover:bg-primary/20',
                      'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background'
                    )}
                    aria-label={`Go to ${item.label} section`}
                  >
                    <item.icon className="h-5 w-5 text-foreground/80 transition-colors group-hover:text-primary" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </li>
          ))}
          <Separator orientation="vertical" className="h-6 mx-1 bg-border/50" />
          <li>
            <ThemeSwitcher />
          </li>
        </ul>
      </div>
    </motion.nav>
  );
};

Navbar.displayName = 'Navbar';
