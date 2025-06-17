
# KineticFolio: Building a Stunning One-Page Portfolio (Tutorial Outline)

This document outlines the step-by-step process for creating the KineticFolio website from scratch. It's designed to serve as a guide for a video tutorial.

## 🎥 Video Intro

*   **Hook**: Showcase the final KineticFolio website with its smooth animations and distinct sections.
*   **What We're Building**: A visually stunning, animated one-page portfolio for a frontend developer.
*   **Technologies**: Next.js (App Router), React, TypeScript, Tailwind CSS, ShadCN UI, Framer Motion.
*   **Key Features to Highlight**:
    *   Full-page section scrolling with "unfolding" animations.
    *   Kinetic typography in the Hero section.
    *   Interactive skills graph.
    *   Project gallery with modals.
    *   Modern, clean design.
*   **Who this is for**: Developers looking to build impressive portfolios or learn advanced Next.js and Framer Motion techniques.

##  Prerequisites

*   Node.js (v18 or later recommended).
*   npm or yarn package manager.
*   A code editor (e.g., VS Code).
*   Basic understanding of React, TypeScript, and CSS.

---

## 🛠️ Development Steps

### Step 1: Initialize Next.js Project

1.  **Open your terminal.**
2.  Run `npx create-next-app@latest kineticfolio --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`
    *   Choose defaults for other prompts, or customize as preferred.
3.  **Navigate into the project directory**: `cd kineticfolio`
4.  **Run the development server**: `npm run dev` (or `yarn dev`).
    *   Verify the default Next.js page loads at `http://localhost:3000`.
5.  **Initial Cleanup**:
    *   Remove default content from `src/app/page.tsx` and `src/app/globals.css` (keep Tailwind base imports).

### Step 2: Install Core Dependencies

1.  **Stop the development server.**
2.  **Install ShadCN UI related dependencies**:
    ```bash
    npm install class-variance-authority clsx tailwind-merge tailwindcss-animate lucide-react @radix-ui/react-slot
    ```
3.  **Install Framer Motion for animations**:
    ```bash
    npm install framer-motion
    ```
4.  **Install React Hook Form & Zod for the contact form**:
    ```bash
    npm install react-hook-form @hookform/resolvers zod
    ```
5.  **(Optional but recommended) Install `patch-package` if you anticipate needing to patch dependencies (as seen in the provided `package.json`).**
    ```bash
    npm install patch-package
    # Add to package.json scripts: "postinstall": "patch-package"
    ```

### Step 3: Configure Tailwind CSS

1.  **Ensure `tailwind.config.ts` is set up correctly by `create-next-app`.**
2.  Open `tailwind.config.ts`. We will extend this later with custom fonts, colors, and animations. For now, the default setup is fine.
3.  **Update `src/app/globals.css`**:
    *   Remove any existing Next.js default styles.
    *   Ensure Tailwind directives are present:
        ```css
        @tailwind base;
        @tailwind components;
        @tailwind utilities;
        ```
    *   We will add theme variables here in a later step.

### Step 4: Set up ShadCN UI

1.  **Initialize ShadCN UI**:
    ```bash
    npx shadcn-ui@latest init
    ```
2.  **Follow the prompts**:
    *   `Would you like to use TypeScript (recommended)?` **yes**
    *   `Which style would you like to use?` **Default**
    *   `Which color would you like to use as base color?` **Neutral** (We'll customize this heavily later)
    *   `Where is your global CSS file?` **`src/app/globals.css`**
    *   `Do you want to use CSS variables for colors?` **yes**
    *   `Where is your Tailwind config file?` **`tailwind.config.ts`**
    *   `Configure import alias for components?` **`@/components`**
    *   `Configure import alias for utils?` **`@/lib/utils`** (or `@/lib` and then create `utils.ts` inside `src/lib`)
    *   `Are you using React Server Components?` **yes**
    *   `Write configuration to components.json.` **yes**
3.  This will create `components.json`, update `tailwind.config.ts`, `globals.css`, and create `src/lib/utils.ts`.
4.  **Install initial ShadCN components we'll need**:
    ```bash
    npx shadcn-ui@latest add button card dialog input textarea label toast form badge
    ```
    (We can add more later as needed)

### Step 5: Project Structure Review

1.  Review the `src` directory. We should have:
    *   `src/app/` (for routes and global layout)
    *   `src/components/` (for UI components)
        *   `src/components/ui/` (ShadCN components)
    *   `src/lib/` (for utility functions like `cn`)
2.  Create additional common directories:
    *   `src/components/primitives/` (for base building block components like Box, Flex, Text)
    *   `src/components/layout/` (for structural components like SectionWrapper, PageNavigation)
    *   `src/components/sections/` (for main page sections: Hero, About, etc.)
    *   `src/components/icons/` (for custom SVG icons)
    *   `src/hooks/` (for custom React hooks)

### Step 6: Global Styles & Theme (`globals.css`)

1.  Open `src/app/globals.css`.
2.  **Define CSS variables for the color theme** (based on the project's light and dark themes):
    ```css
    /* (Paste the :root and .dark blocks from the project's globals.css) */
    /* For example: */
    @layer base {
      :root {
        --background: 43 67% 96%; /* Bone White */
        --foreground: 0 0% 7%; /* Off-black */
        /* ... other light theme variables ... */
        --primary: 182 100% 45%; /* Darker Electric blue */
        --accent: 300 100% 50%; /* Deep Magenta */
        --radius: 0.5rem;
      }
      .dark {
        --background: 0 0% 7%; /* Off-black #121212 */
        --foreground: 43 67% 96%; /* Bone White #F9F6EE */
        /* ... other dark theme variables ... */
        --primary: 182 100% 74%; /* Electric Blue #7DF9FF */
        --accent: 300 100% 50%; /* Deep Magenta */
      }
    }
    ```
3.  **Add base body styles**:
    ```css
    @layer base {
      * {
        @apply border-border;
      }
      body {
        @apply bg-background text-foreground;
        scroll-behavior: smooth;
      }
      ::selection {
        background-color: hsl(var(--primary));
        color: hsl(var(--primary-foreground));
      }
    }
    ```
4.  **Ensure full height for main containers**:
    ```css
    html, body, #__next {
      height: 100%;
      margin: 0;
      padding: 0;
    }
    ```

### Step 7: Root Layout (`layout.tsx`)

1.  Open `src/app/layout.tsx`.
2.  **Update metadata**:
    ```tsx
    export const metadata: Metadata = {
      title: 'KineticFolio - Frontend Architect',
      description: 'A visually stunning, one-page portfolio for an elite frontend developer.',
    };
    ```
3.  **Import Google Fonts (Inter)**:
    ```tsx
    // Add <head> content within the <html> tag
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    </head>
    ```
4.  **Set up the main body structure**:
    *   Apply dark theme by default to `<html>` tag: `className="dark"`.
    *   Apply body font and antialiasing to `<body>`.
    *   Add `Toaster` (for notifications) and `CookieConsentBanner` (placeholder for now).
    ```tsx
    // src/app/layout.tsx
    import type { Metadata } from 'next';
    import './globals.css';
    import { Toaster } from "@/components/ui/toaster"; // Will be created by ShadCN
    // import { CookieConsentBanner } from '@/components/layout'; // We'll create this

    // ... metadata ...

    export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
      return (
        <html lang="en" className="dark">
          <head>
            {/* ... font links ... */}
          </head>
          <body className="font-body antialiased bg-background text-foreground min-h-screen">
            {children}
            <Toaster />
            {/* <CookieConsentBanner /> */} {/* We'll build this component later */}
          </body>
        </html>
      );
    }
    ```
5.  **Configure `tailwind.config.ts` for custom font**:
    ```ts
    // tailwind.config.ts
    theme: {
      extend: {
        fontFamily: {
          body: ['Inter', 'sans-serif'],
          headline: ['Inter', 'sans-serif'], // Can be different if desired
        },
        // ... other theme extensions like colors, keyframes will go here later
      },
    },
    ```

### Step 8: Primitive Components (`src/components/primitives/`)

These are basic building blocks.
1.  **`Box.tsx`**: A simple `div` wrapper.
    ```tsx
    // src/components/primitives/Box.tsx
    import type React from 'react';
    import { cn } from '@/lib'; // Or '@/lib/utils'

    type BoxProps = React.HTMLAttributes<HTMLDivElement>;

    export const Box: React.FC<BoxProps> = ({ className, children, ...props }) => {
      return (
        <div className={cn(className)} {...props}>
          {children}
        </div>
      );
    };
    Box.displayName = 'Box';
    ```
2.  **`Flex.tsx`**: A `div` with flexbox utilities.
    ```tsx
    // src/components/primitives/Flex.tsx
    import type React from 'react';
    import { cn } from '@/lib';

    type FlexProps = React.HTMLAttributes<HTMLDivElement> & {
      direction?: 'row' | 'col';
      align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
      justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
      wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
      gap?: string | number;
    };

    export const Flex: React.FC<FlexProps> = ({
      className, children, direction = 'row', align, justify, wrap, gap, style, ...props
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
    ```
3.  **`Text.tsx`**: A versatile text component.
    ```tsx
    // src/components/primitives/Text.tsx
    import type React from 'react';
    import { cn } from '@/lib';

    type TextProps = React.HTMLAttributes<HTMLElement> & {
      as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'label';
      variant?: 'default' | 'muted' | 'lead' | 'large' | 'small';
    };

    export const Text: React.FC<TextProps> = ({
      as: Component = 'p', className, children, variant = 'default', ...props
    }) => {
      const variantClasses = {
        default: '',
        muted: 'text-muted-foreground',
        lead: 'text-xl text-muted-foreground', // Adjusted from project file
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
    ```
4.  **Barrel export `src/components/primitives/index.ts`**:
    ```ts
    export { Box } from './Box';
    export { Flex } from './Flex';
    export { Text } from './Text';
    ```

### Step 9: Layout Components (`src/components/layout/`)

1.  **`SectionWrapper.tsx`**: A wrapper for consistent section styling.
    ```tsx
    // src/components/layout/SectionWrapper.tsx
    'use client';
    import type React from 'react';
    import { cn } from '@/lib';
    import { Box } from '@/components/primitives';

    interface SectionWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
      children: React.ReactNode;
      id?: string;
      className?: string;
    }

    export const SectionWrapper: React.FC<SectionWrapperProps> = ({
      children, id, className, ...props
    }) => {
      return (
        <Box
          as="section"
          id={id}
          className={cn(
            'min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden p-4 md:p-8',
            className
          )}
          {...props}
        >
          <Box className="w-full max-w-6xl h-full flex flex-col items-center justify-center">
            {children}
          </Box>
        </Box>
      );
    };
    SectionWrapper.displayName = 'SectionWrapper';
    ```
2.  **`CookieConsentBanner.tsx`**: (Initial simple structure, functionality later)
    ```tsx
    // src/components/layout/CookieConsentBanner.tsx
    'use client';
    import React, { useState, useEffect } from 'react';
    import { Button } from '@/components/ui/button';
    import { Text } from '@/components/primitives/Text';
    import { Box } from '@/components/primitives/Box';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Cookie } from 'lucide-react';

    const COOKIE_NAME = 'kineticfolio_cookie_consent';

    export const CookieConsentBanner: React.FC = () => {
      const [isVisible, setIsVisible] = useState(false);

      useEffect(() => {
        const consentCookie = typeof window !== 'undefined' ? document.cookie
          .split('; ')
          .find(row => row.startsWith(`${COOKIE_NAME}=`)) : undefined;
        if (!consentCookie) {
          setIsVisible(true);
        }
      }, []);

      const handleAccept = () => {
        const expires = new Date();
        expires.setFullYear(expires.getFullYear() + 1);
        document.cookie = `${COOKIE_NAME}=true; expires=${expires.toUTCString()}; path=/; SameSite=Lax; Secure`;
        setIsVisible(false);
      };

      if (typeof window === 'undefined' && !isVisible) {
        return null;
      }

      return (
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 z-[200] p-4 sm:p-6 bg-card shadow-2xl border-t border-border"
              role="dialog"
              aria-labelledby="cookie-consent-title"
              aria-describedby="cookie-consent-description"
            >
              <Box className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <Box className="flex items-start sm:items-center gap-3">
                  <Cookie className="h-8 w-8 sm:h-6 sm:w-6 text-primary flex-shrink-0 mt-1 sm:mt-0" />
                  <Box>
                    <Text as="h2" id="cookie-consent-title" className="text-base sm:text-lg font-semibold text-foreground">
                      Our Cookie Policy
                    </Text>
                    <Text as="p" id="cookie-consent-description" className="text-xs sm:text-sm text-muted-foreground mt-1">
                      We use cookies to enhance your browsing experience...
                    </Text>
                  </Box>
                </Box>
                <Button onClick={handleAccept} className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto flex-shrink-0" aria-label="Accept cookie policy">
                  Accept
                </Button>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      );
    };
    CookieConsentBanner.displayName = 'CookieConsentBanner';
    ```
3.  **Update `src/app/layout.tsx` to uncomment and import `CookieConsentBanner`.**
4.  **Barrel export `src/components/layout/index.ts`**:
    ```ts
    export { SectionWrapper } from './SectionWrapper';
    export { CookieConsentBanner } from './CookieConsentBanner';
    // PageNavigation will be added later
    ```

### Step 10: Building the Hero Section (`src/components/sections/Hero.tsx`)

1.  **`KineticText.tsx`** (`src/components/sections/KineticText.tsx` - note: this is in `sections` folder in the final project, so place it there or adjust import).
    ```tsx
    // src/components/sections/KineticText.tsx
    'use client';
    import type React from 'react';
    import { motion } from 'framer-motion';
    import { Text } from '@/components/primitives';

    interface KineticTextProps {
      text: string;
      className?: string;
    }

    const wordVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, type: 'spring', damping: 15, stiffness: 150 },
      }),
    };

    const wordWrapperVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.15 }, // Added small delayChildren
      },
    };

    export const KineticText: React.FC<KineticTextProps> = ({ text, className }) => {
      const words = text.split(' ');
      return (
        <Text as="h1" className={className} aria-label={text} style={{ transform: 'translateZ(0px)' }}>
          <motion.span variants={wordWrapperVariants} initial="hidden" animate="visible" className="inline-block">
            {words.map((word, wordIndex) => (
              <motion.span key={`word-${wordIndex}`} custom={wordIndex} variants={wordVariants} className="inline-block mr-[0.25em]">
                {word}
              </motion.span>
            ))}
          </motion.span>
        </Text>
      );
    };
    ```
2.  **`Hero.tsx`**:
    *   Import necessary components.
    *   Define structure: `SectionWrapper`, `KineticText`, `Text` for subtitle and paragraph, `Button`.
    *   Add `ChevronDown` icon for scroll hint.
    *   Initial Framer Motion animations for elements.
    *   (Optional: Add visitor location feature later for simplicity now).
    ```tsx
    // src/components/sections/Hero.tsx
    'use client';
    import React from 'react'; // Removed useState, useEffect for now for simplicity
    import { motion } from 'framer-motion';
    import { ChevronDown, MapPin } from 'lucide-react';
    import { SectionWrapper } from '@/components/layout';
    import { Flex, Text } from '@/components/primitives';
    import { Button } from '@/components/ui/button';
    import { KineticText } from './KineticText';

    interface HeroProps {
      onNavigate: (sectionId: string) => void;
    }

    const subHeadlineText = "A Frontend Architect crafting digital experiences where design meets performance with kinetic elegance.";

    export const Hero: React.FC<HeroProps> = React.memo(({ onNavigate }) => {
      // const [visitorCountry, setVisitorCountry] = useState<string | null>(null);
      // useEffect for visitorCountry can be added later

      return (
        <SectionWrapper id="hero" className="relative text-center overflow-hidden">
          <motion.div
            className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-accent/10 bg-[length:200%_200%] animate-gradient-xy"
            aria-hidden="true"
          />
          
          {/* Visitor Country Display can be added here later */}

          <div className="h-full w-full flex flex-col items-center justify-center space-y-6 md:space-y-8 text-center">
            <div className="text-center">
              <KineticText 
                text="Fron" 
                className="font-headline text-7xl sm:text-8xl md:text-9xl lg:text-[160px] xl:text-[200px] font-bold tracking-tighter text-primary text-center leading-none"
              />
            </div>

            <div className="text-center">
              <Text 
                as="h2" 
                className="text-2xl sm:text-3xl md:text-4xl font-light text-foreground/80 tracking-wider text-center leading-tight"
              >
                KINETICODE /<br />CREATE
              </Text>
            </div>
            
            <div className="max-w-lg text-center px-4">
                <Text 
                  as="p" 
                  variant="default"
                  className="font-body text-base sm:text-lg text-foreground/75 leading-relaxed text-center"
                  aria-label={subHeadlineText}
                >
                  {subHeadlineText}
                </Text>
            </div>

            <div className="pt-4">
              <Button 
                size="lg" 
                className="font-headline bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transform hover:scale-105 transition-transform duration-300"
                onClick={() => onNavigate('projects')}
                aria-label="View my work"
              >
                View My Work
              </Button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.8, repeat: Infinity, repeatType: 'reverse', ease:'easeInOut' }} 
            className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
            onClick={() => onNavigate('about')}
            aria-label="Scroll to about section"
          >
            <ChevronDown className="h-10 w-10 text-primary opacity-75 hover:opacity-100 transition-opacity" />
          </motion.div>
        </SectionWrapper>
      );
    });
    Hero.displayName = 'HeroSection';
    ```
3.  **Add `gradient-xy` animation to `tailwind.config.ts`**:
    ```ts
    // tailwind.config.ts -> theme.extend.keyframes
    'gradient-xy': {
      '0%, 100%': { 'background-position': '0% 50%' },
      '50%': { 'background-position': '100% 50%' },
    },
    // tailwind.config.ts -> theme.extend.animation
    'gradient-xy': 'gradient-xy 15s ease infinite alternate',
    ```

### Step 11: Building the About Section (`src/components/sections/About.tsx`)

1.  **`About.tsx`**:
    *   Structure: `SectionWrapper`, `Image` for portrait, `Text` for "About Me" and paragraphs.
    *   Use `next/image` for optimized images. Use a placeholder for now.
    *   Add Framer Motion animations for image and text reveal.
    ```tsx
    // src/components/sections/About.tsx
    'use client';
    import React from 'react';
    import { motion } from 'framer-motion';
    import Image from 'next/image';
    import { SectionWrapper } from '@/components/layout';
    import { Flex, Text, Box } from '@/components/primitives';

    export const About: React.FC = React.memo(() => {
      // Re-introduce paragraph and word animation variants if desired from original file
      // For simplicity here, we'll use simpler animations.
      const sectionAnimation = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
      };
      const imageAnimation = {
        hidden: { opacity: 0, scale: 0.85, x: -50 },
        visible: { opacity: 1, scale: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 18, duration: 0.7, delay: 0.1 } },
      };
      const aboutText = "I'm a passionate frontend architect..."; // Full text

      return (
        <SectionWrapper id="about" className="bg-gradient-to-br from-background to-slate-900/60">
          <Flex direction="col" align="center" justify="center" className="h-full gap-12 lg:flex-row lg:gap-16">
            <motion.div
              variants={imageAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              className="w-full max-w-md lg:w-2/5"
            >
              <Box className="relative aspect-square rounded-lg overflow-hidden shadow-2xl group">
                <Image
                  src="https://placehold.co/600x600.png"
                  alt="Portrait of the developer"
                  data-ai-hint="developer portrait"
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 group-hover:scale-105 group-hover:brightness-110"
                  priority // For LCP
                />
                <Box className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
              </Box>
            </motion.div>

            <Flex direction="col" justify="center" className="w-full lg:w-3/5 space-y-6 text-center lg:text-left">
              <motion.div variants={sectionAnimation} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
                <Text as="h2" className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
                  About Me
                </Text>
              </motion.div>
              <motion.div variants={sectionAnimation} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2, delay: 0.2 }}>
                <Text className="font-body text-lg md:text-xl text-foreground/90 leading-relaxed">
                  {aboutText}
                </Text>
              </motion.div>
              <motion.div variants={sectionAnimation} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5, delay: 0.4 }}>
                <Text variant="lead" className="font-body text-foreground/80">
                  Let's build something amazing together.
                </Text>
              </motion.div>
            </Flex>
          </Flex>
        </SectionWrapper>
      );
    });
    About.displayName = 'AboutSection';
    ```
2.  **Add `next/image` placeholder domain to `next.config.ts`**:
    ```ts
    // next.config.ts
    images: {
      remotePatterns: [
        { protocol: 'https', hostname: 'placehold.co', port: '', pathname: '/**' },
      ],
    },
    ```

### Step 12: Building the Skills Section (`src/components/sections/Skills.tsx`)

1.  **`Skills.tsx`**:
    *   Define `Skill` and `SubSkill` interfaces.
    *   Create `coreSkillsData` and `subSkillsData` (with Lucide icons).
    *   Implement `SkillNode` component for individual skills.
    *   Manage hover/focus state (`hoveredSkillId`) to show related skills and descriptions.
    *   Use `AnimatePresence` for the related skills box.
    *   Implement debouncing for hover/focus logic.
    *   Ensure keyboard accessibility (`tabIndex`, `onFocus`).
    ```tsx
    // src/components/sections/Skills.tsx
    // This is a complex component. Refer to the final project file for the full implementation.
    // Key parts:
    // - useState for hoveredSkillId
    // - useMemo for relatedSubSkills
    // - useRef for debouncing (pendingHoverIdRef, hoverTimeoutRef)
    // - handleNodeMouseEnter, handleContainerMouseLeave (with debouncing)
    // - SkillNode component with onMouseEnter, onFocus, tabIndex, aria-label
    // - AnimatePresence for skill description and related skills box
    // - Lucide icons for skills
    'use client';
    import React, { useState, useMemo, useRef, useCallback } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { SectionWrapper } from '@/components/layout';
    import { Flex, Text, Box } from '@/components/primitives';
    import { cn } from '@/lib';
    import { Code, Zap, Layers, Settings, Brain, Share2 } from 'lucide-react';

    // ... (Skill, SubSkill interfaces, coreSkillsData, subSkillsData from project) ...
    // ... (SkillNode component from project, ensure tabIndex and onFocus are present) ...
    // ... (Full component logic with debouncing as in final project file) ...

    // Placeholder for brevity in this outline:
    export const Skills: React.FC = React.memo(() => {
      // Implement the full logic from the final Skills.tsx here
      // This includes state for hoveredSkillId, debouncing logic,
      // and mapping over coreSkillsData to render SkillNode components.
      // Also, the AnimatePresence block for displaying relatedSubSkills.
      const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);
      const pendingHoverIdRef = useRef<string | null>(null);
      const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
      const DEBOUNCE_DELAY = 150;

      const coreSkillsData: any[] = [ /* ... paste data ... */ ]; // Add your skill data
      const subSkillsData: any[] = [ /* ... paste data ... */ ]; // Add your sub-skill data


      const handleNodeEnter = useCallback((skillId: string) => {
        pendingHoverIdRef.current = skillId;
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = setTimeout(() => {
          if (pendingHoverIdRef.current === skillId) setHoveredSkillId(skillId);
        }, DEBOUNCE_DELAY);
      }, []);

      const handleContainerMouseLeave = useCallback(() => {
        pendingHoverIdRef.current = null;
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = setTimeout(() => {
          if (pendingHoverIdRef.current === null) setHoveredSkillId(null);
        }, DEBOUNCE_DELAY);
      }, []);
      
      const relatedSubSkills = useMemo(() => { /* ... logic from project ... */ return []; }, [hoveredSkillId]);


      return (
        <SectionWrapper id="skills" className="bg-gradient-to-b from-background to-slate-900/50">
          <Flex direction="col" align="center" justify="center" className="h-full w-full space-y-10 md:space-y-16">
            <Text as="h2" variant="default" className="font-headline text-4xl md:text-5xl font-bold text-primary text-center">
              My Expertise
            </Text>
            <div className="w-full max-w-3xl" onMouseLeave={handleContainerMouseLeave}>
              <Box className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-8 w-full">
                {/* Map coreSkillsData to SkillNode, passing handleNodeEnter and isActive */}
              </Box>
              {/* AnimatePresence for relatedSubSkills */}
            </div>
          </Flex>
        </SectionWrapper>
      );
    });
    Skills.displayName = 'SkillsSection';
    ```

### Step 13: Building the Projects Section (`src/components/sections/Projects.tsx`)

1.  **`Projects.tsx`**:
    *   Define `Project` interface and `projectsData`.
    *   Create `ProjectCard` component.
    *   Use ShadCN `Card` and `Dialog` components.
    *   Manage state for `selectedProject` to open/close modal.
    *   Use `AnimatePresence` for modal.
    *   Use `next/image` for project images.
    ```tsx
    // src/components/sections/Projects.tsx
    // This is also a complex component. Refer to the final project file.
    // Key parts:
    // - Project interface, projectsData array
    // - ProjectCard component (using Card, CardHeader, CardContent, CardFooter, Image, Badge)
    // - useState for selectedProject
    // - AnimatePresence wrapping Dialog
    // - Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription for modal
    // - Video tag or Image tag inside modal based on project data
    // - ExternalLink, Github icons for links

    // Placeholder for brevity:
    export const Projects: React.FC = React.memo(() => {
      // Implement the full logic from the final Projects.tsx here
      // This includes ProjectCard, project data, modal state and structure.
      return (
        <SectionWrapper id="projects" className="bg-background">
          <Flex direction="col" align="center" justify="start" className="h-full w-full space-y-10 md:space-y-16 pt-16 md:pt-24">
            <Text as="h2" variant="default" className="font-headline text-4xl md:text-5xl font-bold text-primary text-center">
              Featured Projects
            </Text>
            {/* Grid of ProjectCard components */}
            {/* AnimatePresence and Dialog for modal */}
          </Flex>
        </SectionWrapper>
      );
    });
    Projects.displayName = 'ProjectsSection';
    ```

### Step 14: Building the Contact Section (`src/components/sections/Contact.tsx`)

1.  **Custom Icons**: Create `GitHubIcon.tsx` and `LinkedInIcon.tsx` in `src/components/icons/`.
    ```tsx
    // src/components/icons/GitHubIcon.tsx (Example)
    // ... (SVG code from project) ...
    // src/components/icons/LinkedInIcon.tsx (Example)
    // ... (SVG code from project) ...
    // src/components/icons/index.ts
    export { GitHubIcon } from './GitHubIcon';
    export { LinkedInIcon } from './LinkedInIcon';
    ```
2.  **`Contact.tsx`**:
    *   Use `react-hook-form` and `zodResolver`.
    *   Define `contactFormSchema` with Zod.
    *   Use ShadCN `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage`, `Input`, `Textarea`, `Button`.
    *   Implement `onSubmit` handler (simulated submission).
    *   Implement submission status feedback (success/error messages).
    *   Add social media links with icons.
    ```tsx
    // src/components/sections/Contact.tsx
    // Refer to the final project file for full implementation.
    // Key parts:
    // - contactFormSchema (Zod)
    // - useForm hook
    // - onSubmit handler with simulated delay and submissionStatus state
    // - Form structure using ShadCN form components
    // - Social links mapping with icons
    // - Error handling with toast (to be added with useToast hook)

    // Placeholder for brevity:
    export const Contact: React.FC = React.memo(() => {
      // Implement the full logic from the final Contact.tsx here
      // This includes the form, validation, submission handling, and social links.
      return (
        <SectionWrapper id="contact" className="bg-gradient-to-br from-background to-slate-900/70">
          {/* ... Title, lead text ... */}
          {/* ... Form ... */}
          {/* ... Social links ... */}
        </SectionWrapper>
      );
    });
    Contact.displayName = 'ContactSection';
    ```

### Step 15: Main Page Assembly (`src/app/page.tsx`)

1.  **`page.tsx`**:
    *   Import all section components and `PageNavigation`.
    *   Define `sections` array with id, label, and component.
    *   Manage state: `activeIndex`, `direction`, `isScrolling`.
    *   Implement `handleNavigate` function.
    *   Implement `sectionVariants` for Framer Motion page transitions.
    *   Use `AnimatePresence` to animate between sections.
    *   Add event listeners for mouse wheel and keyboard navigation, ensuring they respect `isScrolling` state.
    *   Pass `onNavigate` to `Hero` and `PageNavigation`.
    ```tsx
    // src/app/page.tsx
    'use client';
    import React, { useState, useEffect, useCallback, useRef } from 'react';
    import { AnimatePresence, motion } from 'framer-motion';
    import { Hero, About, Skills, Projects, Contact } from '@/components/sections';
    import { PageNavigation } from '@/components/layout'; // Will create this
    import { Box } from '@/components/primitives';

    const sections = [ /* ... section definitions from project ... */ ];

    // ... sectionVariants from project ...

    export default function PortfolioPage() {
      // ... state variables (activeIndex, direction, isScrolling, isScrollingRef) ...
      // ... handleNavigate (useCallback) ...
      // ... handleAnimationComplete ...
      // ... useEffect for wheel and keydown listeners (respecting isScrollingRef and form inputs) ...

      // Placeholder for brevity:
      const [activeIndex, setActiveIndex] = useState(0);
      // ... other state and handlers ...

      const ActiveComponent = sections[activeIndex].component;

      return (
        <Box className="relative h-screen w-screen overflow-hidden">
          {/* <PageNavigation sections={sections} activeSection={sections[activeIndex].id} onNavigate={handleNavigate} /> */}
          <AnimatePresence initial={false} custom={{/*direction*/}} mode="wait">
            <motion.div
              key={sections[activeIndex].id}
              // ... motion props (id, role, aria-labelledby, custom, variants, initial, animate, exit, className, onAnimationComplete, aria-live) ...
              className="absolute inset-0 w-full h-full"
            >
              {/* Conditional rendering for ActiveComponent, passing onNavigate to Hero */}
              <ActiveComponent />
            </motion.div>
          </AnimatePresence>
        </Box>
      );
    }
    ```

### Step 16: Page Navigation Component (`src/components/layout/PageNavigation.tsx`)

1.  **`PageNavigation.tsx`**:
    *   Props: `sections`, `activeSection`, `onNavigate`.
    *   Render a list of dots, highlighting the active one.
    *   Use Framer Motion for dot animations and label reveal.
    *   Implement accessibility attributes (`role="tablist"`, `role="tab"`, etc.).
    ```tsx
    // src/components/layout/PageNavigation.tsx
    // Refer to the final project file.
    // Key parts:
    // - Motion.nav, ul, li, motion.button
    // - Dot animation variants and transitions
    // - AnimatePresence for active section label
    // - Accessibility attributes
    'use client';
    import React from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { cn } from '@/lib';
    
    // ... (interface PageNavigationProps) ...
    
    export const PageNavigation: React.FC<any/*PageNavigationProps*/> = React.memo(({
      sections, activeSection, onNavigate, className,
    }) => {
      // ... (component logic from project) ...
      return (
        <motion.nav /* ... */ >
          <ul role="tablist" aria-label="Page Sections">
            {/* Map sections to li > motion.button */}
          </ul>
        </motion.nav>
      );
    });
    PageNavigation.displayName = 'PageNavigation';
    ```
2.  **Add `PageNavigation` to `src/components/layout/index.ts` barrel file.**
3.  **Uncomment and use `PageNavigation` in `src/app/page.tsx`.**

### Step 17: Custom Hooks (`src/hooks/`)

1.  **`useToast.ts`**: Implement the toast hook (can copy from ShadCN examples or project file if complex).
    ```ts
    // src/hooks/use-toast.ts
    // (Full implementation from the project file)
    // This involves reducer, dispatch, listeners, etc.
    // For a simpler start, one might initially rely only on direct ShadCN toast usage.
    // Simplified for outline:
    "use client"
    import * as React from "react"
    import type { ToastActionElement, ToastProps, } from "@/components/ui/toast"
    // ... (full code from project's use-toast.ts)
    export function useToast() { return { toasts: [], toast: (props: any) => ({id: '1', dismiss: () => {}, update: () => {} }), dismiss: () => {} }; }
    export function toast(props: any) { /* ... */ }
    ```
2.  **`useIsMobile.ts`**: Hook to detect mobile viewport.
    ```ts
    // src/hooks/use-mobile.ts
    // (Full implementation from the project file)
    import * as React from "react"
    const MOBILE_BREAKPOINT = 768;
    // ... (full code from project's use-mobile.tsx)
    export function useIsMobile() { return false; }
    ```
3.  **Barrel export `src/hooks/index.ts`**:
    ```ts
    export { useToast, toast } from './use-toast';
    export { useIsMobile } from './use-mobile';
    ```
4.  **Ensure `Toaster` component is correctly set up in `src/components/ui/toaster.tsx` (usually done by ShadCN).**

### Step 18: Utility Functions (`src/lib/`)

1.  **`utils.ts`** (`src/lib/utils.ts`): Should contain `cn` function (created by ShadCN).
2.  **Barrel export `src/lib/index.ts`**:
    ```ts
    export { cn } from './utils';
    ```
3.  **Update all `cn` imports to `@/lib` instead of `@/lib/utils`.**

### Step 19: Final Configurations

1.  **`next.config.ts`**:
    *   Ensure `images.remotePatterns` is correctly set for placeholders.
    *   Add `typescript.ignoreBuildErrors = true` and `eslint.ignoreDuringBuilds = true` if desired for faster iteration during development (remove for production).
2.  **`tailwind.config.ts`**:
    *   Add all custom `colors` (primary, secondary, accent, card, popover, etc.) by referencing CSS variables.
    *   Add custom `borderRadius`.
    *   Add all custom `keyframes` and `animation` utilities from the final project.
    *   Ensure `content` paths are correct.
    *   Ensure `darkMode: ['class']` is set.
    *   `plugins: [require('tailwindcss-animate')]` should be present.
3.  **`tsconfig.json`**: Ensure paths are correct: `"@/*": ["./src/*"]`.
4.  **`package.json`**:
    *   Update `dev` script if a custom port is desired (e.g., `next dev --turbopack -p 9002`).

### Step 20: Add IP-Based Location Feature to Hero (Optional Enhancement)

1.  In `src/components/sections/Hero.tsx`:
    *   Add `useState` for `visitorCountry`.
    *   Add `useEffect` to fetch location from `https://ipwhois.app/json/`.
    *   Handle potential errors and localhost case.
    *   Conditionally render the visitor country display with `MapPin` icon.

### Step 21: Refinements, Polish & Testing

1.  **Accessibility Check**:
    *   Review ARIA attributes on interactive elements (navigation, modals, form fields).
    *   Test keyboard navigation thoroughly.
2.  **Performance**:
    *   Use `React.memo` on section components and other frequently rendered components where appropriate.
    *   Ensure images are optimized (using `next/image`, `priority` prop for LCP elements).
    *   Test animation smoothness.
3.  **Responsiveness**: Test thoroughly on different screen sizes.
4.  **Cross-browser Testing**: Check basic functionality in major browsers.
5.  **Code Review**: Clean up comments, console logs, and ensure consistent coding style.
6.  **Create `README.md`**: Document the project, setup, and run instructions.

---

## 🎥 Video Outro

*   **Recap**: Briefly show the main features built.
*   **Key Takeaways**: Highlight a few important concepts covered (e.g., Framer Motion for page transitions, ShadCN for UI, Next.js App Router).
*   **Further Learning/Improvements**: Suggest potential next steps (e.g., adding a CMS, more complex animations, actual backend for contact form).
*   **Call to Action**: Like, subscribe, share, check out the GitHub repo.

This outline provides a comprehensive roadmap for the tutorial video. Each step can be broken down further with detailed code explanations and live coding. Good luck!
