'use client';

import React from 'react';
import { Flex, Text } from '@/components/primitives';
import { GitHubIcon, LinkedInIcon } from '@/components/icons';
import { Mail } from 'lucide-react';

/**
 * The application's footer component.
 * It serves as a consistent, final element on the page, providing copyright
 * information and essential professional links in a clean and accessible manner.
 * Its single responsibility is to provide this concluding information, making it
 * a classic layout component.
 *
 * @returns {React.ReactElement} The footer component.
 */
export const Footer: React.FC = React.memo(() => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', icon: GitHubIcon, url: 'https://github.com/Louce', ariaLabel: "View Dendi Rivaldi's GitHub profile" },
    { name: 'LinkedIn', icon: LinkedInIcon, url: 'https://www.linkedin.com/in/dendyrivaldi/', ariaLabel: "Connect with Dendi Rivaldi on LinkedIn" },
    { name: 'Email', icon: Mail, url: 'mailto:rivaldydendy459@gmail.com', ariaLabel: "Send an email to Dendi Rivaldi" },
  ];

  return (
    <footer className="w-full bg-background border-t border-border/20 py-6 px-4 md:px-8 relative z-10">
      <Flex direction="col" align="center" gap="1rem" className="max-w-6xl mx-auto sm:flex-row sm:justify-between">
        <Text variant="small" className="text-muted-foreground">
          © {currentYear} Dendi Rivaldi. All Rights Reserved.
        </Text>
        <Flex justify="center" gap="1rem">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.ariaLabel}
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <link.icon className="w-5 h-5" />
            </a>
          ))}
        </Flex>
      </Flex>
    </footer>
  );
});

Footer.displayName = 'Footer';
