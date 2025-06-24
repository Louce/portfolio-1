# KineticFolio: A Senior Developer's Masterclass (Video Script)

**Video Format Notes:**
*   **Target Runtime:** 30 minutes.
*   **Presenter:** This script is a word-for-word monologue. The tone should be that of an experienced, friendly senior developer guiding a junior colleague.
*   **Visuals:** Specific on-screen actions and visuals are explicitly described in `[ACTION]` and `[ON-SCREEN]` blocks.

---

### **(0:00) Chapter 1: Introduction - Beyond the Static Portfolio**

**[ON-SCREEN: Start with a polished, full-screen screen capture of the final, deployed KineticFolio website. The camera smoothly scrolls through the page, showcasing the hero text animation, sections animating into view, the 3D project cards tilting on hover, and the AI feedback analysis in action. The overall impression should be fluid, professional, and visually captivating. Energetic, inspiring background music fades in and then lowers to a background level as the presenter begins.]**

**[PRESENTER]:**
"Hey everyone, and welcome to the channel! My name is Dendi, and if you're a developer, I want you to think about your portfolio. Is it just a digital resume? A static list of projects? Or is it a true reflection of your craft?

That's the exact question that led to the project we're going to build, from the ground up, in this video. What if a portfolio could be more? What if it could be an interactive experience, something that showcases your skills not just with words, but through the very act of using it?

In this in-depth, 30-minute masterclass, we are going to build this exact application: **KineticFolio**. It's a visually stunning, one-page portfolio designed around a philosophy I call 'Kinetic Elegance'. By the end of this video, you will not only have this incredible project, but you will deeply understand the 'why' behind the 'how' from a senior developer's perspective. You'll learn to harness the full-stack power of **Next.js** and its App Router. You'll build completely custom, responsive designs at lightning speed with **Tailwind CSS**. You'll master my absolute favorite way to handle components with **ShadCN UI**. You'll orchestrate breathtaking, production-grade animations with **Framer Motion**. And, as a final 'wow' factor, you'll even integrate a powerful **Genkit** AI feature to make your project stand out.

This is a big one, packed with professional, real-world techniques. The full, final source code is available on GitHub, and you'll find that link in the description below so you can follow along or check your work.

Alright, let's get right into it."

---

### **(2:30) Chapter 2: The Foundation - Architecture & Setup**

**[ON-SCREEN: A clean, empty terminal window.]**

**[PRESENTER]:**
"Every great project starts with a solid foundation. We'll begin by bootstrapping our project using the standard `create-next-app` command."

**[ACTION]:**
In the terminal, type and execute the following command.

```bash
npx create-next-app@latest kineticfolio
```

**[PRESENTER]:**
"This CLI will ask a series of questions that are critical for our setup. We're making professional choices right from the start."

**[ON-SCREEN: Show the `create-next-app` prompts appearing one by one.]**

**[PRESENTER]:**
-   "First, 'Would you like to use TypeScript?' **Absolutely, yes.** For a project of this complexity, TypeScript is non-negotiable for catching bugs and ensuring maintainability.
-   "ESLint?' **Yes.** This enforces a consistent, clean code style.
-   "Tailwind CSS?' **A definite yes.** This is our styling engine.
-   "`src/` directory?' **Yes.** This is a professional convention for organizing our application code.
-   "App Router?' **This is the most important one. YES.** The App Router enables React Server Components and is the foundation of our modern, performant architecture.
-   "And finally, say 'No' to customizing the default import alias. The `@/*` it provides is perfect."

**[ON-SCREEN: Show the installation process completing. Then, open the new `kineticfolio` directory in VS Code. The terminal should be visible at the bottom.]**

**[PRESENTER]:**
"With our project created, let's open it in our code editor. Now we'll set up **ShadCN UI**. This isn't a typical component library you install from npm. It's a game-changer. You use its CLI to copy the full source code of beautifully designed, accessible components directly into your project. This gives us the speed of pre-built components with 100% control to customize them. It's the best of both worlds."

**[ACTION]:**
In the integrated terminal within VS Code, run the ShadCN initialization command.

```bash
npx shadcn-ui@latest init
```

**[PRESENTER]:**
"It's going to ask a few questions. The defaults are perfect for our setup, so just press Enter through the prompts. It will detect TypeScript, suggest 'Default' and 'Neutral' for the theme, and find our `globals.css` file. Crucially, ensure you say **yes** to using CSS Variables for theming. This is the secret to our light and dark modes."

**[ON-SCREEN: Show the `components.json` and `src/lib/utils.ts` files being created.]**

**[PRESENTER]:**
"Now for the magic. We'll add all the components we'll need for this entire portfolio in one go. You can find this full command in the project's `README.md` file."

**[ACTION]:**
In the terminal, run the following command to add all necessary UI components.

```bash
npx shadcn-ui@latest add button card sheet input textarea label toast form badge carousel accordion alert-dialog avatar dialog dropdown-menu popover progress radio-group scroll-area select separator slider switch table tabs tooltip
```

**[ON-SCREEN: Show the `src/components/ui` folder being populated with dozens of component files.]**

**[PRESENTER]:**
"Look at that! If you now open your `src/components/ui` folder, it's populated with the full source code for every single one of those components. We own this code. We can change anything we want.

"Finally, we'll install a few other key dependencies: `Framer Motion` for our animations, `next-themes` for light and dark mode, and `embla-carousel-autoplay` for our project gallery."

**[ACTION]:**
In the terminal, run the following command.

```bash
npm install framer-motion next-themes embla-carousel-autoplay
```

**[PRESENTER]:**
"Our foundation is set. It's time to define our visual identity."

---

### **(7:00) Chapter 3: Global Styles & Root Layout**

**[ON-SCREEN: VS Code is focused on the file `src/app/globals.css`. It should contain the default Tailwind and Shadcn boilerplate.]**

**[PRESENTER]:**
"Before we build our first component, we need to define the soul of our application: the theme. A professional color palette is what separates amateur projects from professional ones. We'll do this in `src/app/globals.css` by defining our colors using CSS variables. This is the modern way to handle theming and is essential for light and dark modes."

**[ACTION]:**
Replace the entire contents of `src/app/globals.css` with the following code.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Light Mode - More vibrant and contrasty */
    --background: 220 50% 98%; /* Lighter, slightly cool off-white */
    --foreground: 220 25% 10%; /* Dark, desaturated blue for high contrast text */
    
    --card: 0 0% 100%; /* Pure white for cards */
    --card-foreground: 220 25% 15%; /* Dark text on cards */
    
    --popover: 0 0% 100%; /* Pure white for popovers */
    --popover-foreground: 220 25% 15%; /* Dark text on popovers */
    
    --primary: 205 88% 50%; /* Vibrant, clear blue */
    --primary-foreground: 0 0% 100%; /* White text on primary */
    
    --secondary: 220 25% 85%; /* Darker grayish blue for secondary elements (e.g., slider track) */
    --secondary-foreground: 220 25% 25%; /* Darker text on secondary */
    
    --muted: 220 30% 90%; /* Slightly darker muted background */
    --muted-foreground: 220 20% 45%; /* Softer text for muted content */
    
    --accent: 340 90% 55%; /* Vibrant pink/magenta */
    --accent-foreground: 0 0% 100%; /* White text on accent */
    
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    
    --border: 220 30% 88%; /* Softer border color */
    --input: 220 30% 92%; /* Light input background */
    --ring: 205 88% 50%; /* Ring color matching primary */

    --chart-1: 200 80% 55%;
    --chart-2: 25 90% 60%;
    --chart-3: 260 75% 60%;
    --chart-4: 150 70% 45%;
    --chart-5: 320 85% 65%;
    --radius: 0.5rem;
  }
 
  .dark {
    --background: 0 0% 7%; /* Off-black #121212 */
    --foreground: 43 67% 96%; /* Bone White #F9F6EE */

    --card: 0 0% 10%; /* Slightly lighter than background for cards */
    --card-foreground: 43 67% 96%; /* Bone White */

    --popover: 0 0% 5%; /* Darker for popovers */
    --popover-foreground: 43 67% 96%; /* Bone White */

    --primary: 182 100% 74%; /* Electric Blue #7DF9FF */
    --primary-foreground: 0 0% 7%; /* Off-black for text on primary */

    --secondary: 0 0% 14.9%;
    --secondary-foreground: 43 67% 96%;

    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%; /* Lighter gray for muted text */

    --accent: 300 100% 50%; /* Deep Magenta #FF00FF */
    --accent-foreground: 43 67% 96%; /* Bone White */

    --destructive: 0 72% 51%; /* Adjusted destructive for dark theme */
    --destructive-foreground: 43 67% 96%;

    --border: 0 0% 20%; /* Darker border */
    --input: 0 0% 20%; /* Darker input background */
    --ring: 182 100% 74%; /* Electric Blue for rings */
    
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }
}
 
@layer base {
  * {
    @apply border-border;
  }
  html {
    scroll-behavior: smooth;
  }
  body {
    /* These are now directly on the <body> tag in layout.tsx */
  }
  ::selection {
    background-color: hsl(var(--primary));
    color: hsl(var(--primary-foreground));
  }
}

@layer utilities {
  .bg-grid-pattern {
    background-image: linear-gradient(to right, hsl(var(--border)/0.4) 1px, transparent 1px),
                      linear-gradient(to bottom, hsl(var(--border)/0.4) 1px, transparent 1px);
    background-size: 18px 28px;
  }
  
  .masked-radial-gradient {
    -webkit-mask-image: radial-gradient(ellipse 50% 50% at 50% 50%, #000 70%, transparent 100%);
            mask-image: radial-gradient(ellipse 50% 50% at 50% 50%, #000 70%, transparent 100%);
  }
}
```

**[PRESENTER]:**
"Let's break this down. The `:root` selector defines our default light theme colors using HSL values—Hue, Saturation, and Lightness—which are super easy to tweak. The `.dark` selector right below it contains all the overrides for our dark theme.

"At the bottom, inside `@layer utilities`, we've added a custom `.bg-grid-pattern` class. This is an application of the **DRY principle—Don't Repeat Yourself**. Instead of writing a complex `linear-gradient` in our JSX, we've abstracted it into a reusable utility class. This is a senior-level practice that keeps our component code clean."

**[PRESENTER]:**
"Next, let's open **`src/app/layout.tsx`**. This is the root shell of our entire application. Every page will be wrapped by this layout."

**[ON-SCREEN: Show the file `src/app/layout.tsx` and its default content.]**

**[PRESENTER]:**
"We need to replace the boilerplate in here with our own fully configured layout. This will include our optimized web font, providers for theming and tooltips, and our main structural components."

**[ACTION]:**
Replace the contents of `src/app/layout.tsx` with the following.

```typescript
import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import { Toaster, TooltipProvider } from "@/components/ui";
import { CookieConsentBanner, ThemeSwitcher, Navbar } from '@/components/layout';
import { Inter } from 'next/font/google';
import { SpeedInsights } from "@vercel/speed-insights/next";

/**
 * Configures the Inter font from Google Fonts with a CSS variable.
 * This is the modern, performance-optimized way to handle web fonts in Next.js.
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/fonts
 */
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Use swap for better perceived performance
  variable: '--font-inter' // CSS variable for Tailwind
});

/**
 * Dynamically determines the site's base URL.
 * Prioritizes environment variables for production/preview deployments (Vercel)
 * and falls back to localhost for local development. This is crucial for correct
 * metadata generation (e.g., Open Graph URLs).
 * @returns {string} The full base URL of the site.
 */
const getSiteUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.startsWith('http')
      ? process.env.NEXT_PUBLIC_SITE_URL
      : `https://${process.env.NEXT_PUBLIC_SITE_URL}`;
  }
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  return `http://localhost:${process.env.PORT || 3000}`;
};

const SITE_URL = getSiteUrl();

/**
 * Defines the static metadata for the application.
 * This object is used by Next.js to generate <meta> tags for SEO and social sharing.
 * It includes title, description, keywords, Open Graph, and Twitter card information.
 * The `metadataBase` is crucial for resolving relative image paths into absolute URLs.
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/metadata
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Dendi Rivaldi - Python, Automation & Game Dev Enthusiast',
  description: 'Portfolio of Dendi Rivaldi, showcasing skills in Python, automation, game development, and design. Explore projects and connect.',
  keywords: ['Dendi Rivaldi', 'Python Developer', 'Automation Engineer', 'Game Developer', 'Design Enthusiast', 'Portfolio', 'Software Developer'],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Dendi Rivaldi - Python, Automation & Game Dev Portfolio',
    description: 'Discover the work of Dendi Rivaldi, a developer passionate about Python, automation, game creation, and design.',
    url: SITE_URL,
    siteName: 'Dendi Rivaldi Portfolio',
    images: [
      {
        url: `/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Dendi Rivaldi - Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dendi Rivaldi - Developer Portfolio',
    description: 'Explore Dendi Rivaldi\'s projects in Python, automation, game development, and design.',
    images: [`/og-image.png`],
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/icons/favicon.ico', 
    apple: '/icons/apple-touch-icon.png', 
  },
};

/**
 * Configures the viewport for the application.
 * This sets the initial scale and theme colors for the browser chrome,
 * adapting to the user's system preference for light or dark mode.
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-viewport
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [ 
    { media: '(prefers-color-scheme: light)', color: 'hsl(220 50% 98%)' }, // light background
    { media: '(prefers-color-scheme: dark)', color: 'hsl(0 0% 7%)' },  // dark background
  ],
};

/**
 * The root layout component for the entire application.
 * This component wraps every page, providing a consistent structure and global context providers.
 *
 * @param {object} props - The properties for the component.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout (i.e., the current page).
 * @returns {React.ReactElement} The root HTML structure of the application.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://ipwhois.app" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body 
        className="font-body antialiased bg-background text-foreground min-h-screen transition-colors duration-300 ease-in-out"
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange={false}
        >
          <TooltipProvider delayDuration={100}>
            <ThemeSwitcher />
            <Navbar />
            {children}
            <Toaster />
            <CookieConsentBanner />
          </TooltipProvider>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
```

**[PRESENTER]:**
"Inside the `<body>`, we're setting up our global providers. `<ThemeProvider>` handles our light and dark mode switching, which we installed earlier. Then we have `<TooltipProvider>` from Shadcn, which enables all tooltips across the app. I've also placed our `<Navbar>`, `<ThemeSwitcher>`, and other layout components here. These will appear on every page.

With our global styles and layout configured, we can start building the page itself."

---

### **(12:30) Chapter 4: The Core Build - The Projects Section**

**[ON-SCREEN: Show the VS Code sidebar. Highlight the `src/data` and `src/components/sections/Projects` directories that will be created.]**

**[PRESENTER]:**
"Okay, this is where the magic happens. We're going to build the most visually impressive part of our portfolio: the Projects section. But before we write a single line of component code, we're going to apply a foundational software design principle: **Separation of Concerns**. Our React components should only be responsible for *how things look*. They should not be responsible for the *data* they display.

To achieve this, we'll create a dedicated data layer."

**[ACTION]:**
Create a new file at `src/data/projectsData.ts`. Paste the following code into the new file.

```typescript
/**
 * @fileOverview
 * This file contains the static data for the "Featured Projects" section.
 * Separating data from the component logic makes the project easier to maintain and update.
 */

/**
 * Represents a media item (image or video) in a project's gallery.
 * @property {'image' | 'video'} type - The type of media.
 * @property {string} url - The URL of the media asset.
 * @property {string} [dataAiHint] - Optional hint for AI tools or image generation services.
 */
export interface MediaItem {
  type: 'image' | 'video';
  url: string;
  dataAiHint?: string;
}

/**
 * Represents a single project to be displayed in the portfolio.
 * @property {string} id - A unique identifier for the project.
 * @property {string} title - The title of the project.
 * @property {string} description - A short, one-sentence description for the project card.
 * @property {string} [longDescription] - A more detailed description for the project's detail view.
 * @property {string} coverImageUrl - The URL for the main image shown on the project card.
 * @property {string} [coverDataAiHint] - Optional hint for the cover image.
 * @property {MediaItem[]} mediaGallery - An array of images and videos for the detail view carousel.
 * @property {string[]} techStack - An array of technologies used in the project.
 * @property {string} [liveSiteUrl] - Optional URL to the live, deployed project.
 * @property {string} [githubUrl] - Optional URL to the project's source code repository.
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  coverImageUrl: string;
  coverDataAiHint?: string;
  mediaGallery: MediaItem[];
  techStack: string[];
  liveSiteUrl?: string;
  githubUrl?: string;
}

/**
 * The definitive array of project data used to populate the Projects section.
 * To add, remove, or edit a project, modify this array.
 */
export const projectsData: Project[] = [
  {
    id: 'project-1',
    title: 'E-commerce Platform X',
    description: 'A modern, responsive e-commerce platform with advanced features.',
    longDescription: 'Developed a full-stack e-commerce solution focusing on user experience, performance, and scalability. Integrated payment gateways, order management, and a recommendation engine. The frontend was built with Next.js and Tailwind CSS, while the backend used Node.js and PostgreSQL.',
    coverImageUrl: 'https://placehold.co/600x400.png',
    coverDataAiHint: 'ecommerce website',
    mediaGallery: [
      { type: 'image', url: 'https://placehold.co/1280x720.png', dataAiHint: 'product grid' },
      { type: 'image', url: 'https://placehold.co/1280x720.png', dataAiHint: 'checkout page' },
      { type: 'image', url: 'https://placehold.co/1280x720.png', dataAiHint: 'user dashboard' },
    ],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Stripe'],
    liveSiteUrl: '#',
    githubUrl: '#',
  },
  {
    id: 'project-2',
    title: 'Interactive Data Dashboard',
    description: 'A real-time data visualization dashboard for business analytics.',
    longDescription: 'Created an interactive dashboard that allows users to explore complex datasets through dynamic charts and graphs. Features include customizable widgets, data filtering, and report generation. Built with React, D3.js, and Framer Motion for smooth animations.',
    coverImageUrl: 'https://placehold.co/600x400.png',
    coverDataAiHint: 'data dashboard',
    mediaGallery: [
      { type: 'image', url: 'https://placehold.co/1280x720.png', dataAiHint: 'main chart' },
      { type: 'image', url: 'https://placehold.co/1280x720.png', dataAiHint: 'map visualization' },
      { type: 'image', url: 'https://placehold.co/1280x720.png', dataAiHint: 'report export' },
    ],
    techStack: ['React', 'TypeScript', 'D3.js', 'Framer Motion', 'Python (Flask)'],
    liveSiteUrl: '#',
  },
  {
    id: 'project-3',
    title: 'AI-Powered Content Generator',
    description: 'A web application that uses AI to generate creative content.',
    longDescription: 'This project leverages cutting-edge AI models to assist users in generating various forms of content, such as articles, social media posts, and scripts. The interface is designed to be intuitive and user-friendly, promoting a seamless creative workflow. Tech stack includes SvelteKit, Tailwind CSS, and Python with FastAPI for the AI backend.',
    coverImageUrl: 'https://placehold.co/600x400.png',
    coverDataAiHint: 'ai application',
    mediaGallery: [
      { type: 'image', url: 'https://placehold.co/1280x720.png', dataAiHint: 'generator ui' },
      { type: 'image', url: 'https://placehold.co/1280x720.png', dataAiHint: 'abstract brain' },
    ],
    techStack: ['SvelteKit', 'TypeScript', 'Tailwind CSS', 'Python', 'FastAPI', 'Genkit'],
    githubUrl: '#',
  },
];
```

**[PRESENTER]:**
"By defining our data and its TypeScript types here, our project becomes incredibly easy to update. Want to add a new project? You just edit this array. You don't have to touch any of our complex React components. This is a senior-level practice that pays huge dividends."

**[PRESENTER]:**
"Now, let's build the UI. We'll apply another key principle: the **Single Responsibility Principle**. Each component should do one thing, and do it well. Our main `Projects.tsx` file shouldn't manage the project grid *and* the complex detail view. So, we'll break it down into smaller, dedicated components."

**[ACTION]:**
Create a new file at `src/components/sections/Projects/components/ProjectCard.tsx`. Paste this code into the file.

```typescript
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Flex } from '@/components/primitives';
import {
  Button,
  Badge,
  CardContainer, CardBody, CardItem,
} from '@/components/ui';
import type { Project } from '@/data/projectsData';

/**
 * Props for the ProjectCard component.
 */
interface ProjectCardProps {
  /** The project data object to display. */
  project: Project;
  /** Callback function to open the details sheet for this project. */
  onOpenSheet: (project: Project) => void;
}

/**
 * A card component that displays a summary of a single project.
 * It features a 3D tilt effect on hover, a cover image, title, description,
 * tech stack badges, and a button to view more details.
 *
 * @param {ProjectCardProps} props - The properties for the component.
 * @returns {React.ReactElement} A single project card.
 */
export const ProjectCard: React.FC<ProjectCardProps> = React.memo(({ project, onOpenSheet }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full h-full"
    >
      <CardContainer className="inter-var h-full" containerClassName="h-full py-0">
        <CardBody className="bg-card/90 backdrop-blur-lg relative group/card hover:shadow-2xl hover:shadow-primary/40 dark:hover:shadow-primary/20 border-border/30 w-full h-full rounded-xl p-0 border flex flex-col overflow-hidden">
          <CardItem
            translateZ="30"
            className="w-full aspect-[16/9] relative overflow-hidden rounded-t-xl !w-full"
          >
            <Image
              src={project.coverImageUrl}
              alt={`Cover image for ${project.title}`}
              data-ai-hint={project.coverDataAiHint || project.title.toLowerCase().split(' ').slice(0,2).join(' ')}
              fill
              className="object-cover group-hover/card:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </CardItem>

          <div className="flex-grow p-4 md:p-6 space-y-3 flex flex-col">
            <CardItem
              as="h3" 
              translateZ="60"
              className="font-headline text-xl md:text-2xl text-primary !w-auto max-w-full"
            >
              {project.title}
            </CardItem>
            <CardItem
              translateZ="50"
              as="p"
              className="font-body text-foreground/80 text-sm md:text-base flex-grow !w-auto max-w-full"
            >
              {project.description}
            </CardItem>
            <CardItem translateZ="40" className="pt-2 !w-full">
              <Flex wrap="wrap" gap="0.5rem">
                {project.techStack.slice(0, 4).map(tech => (
                  <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
                ))}
                {project.techStack.length > 4 && <Badge variant="outline" className="text-xs">+{project.techStack.length - 4} more</Badge>}
              </Flex>
            </CardItem>
          </div>

          <CardItem translateZ="20" className="p-4 md:p-6 border-t border-border/20 mt-auto !w-full">
            <Button onClick={() => onOpenSheet(project)} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg" aria-label={`View details for ${project.title}`}>
              View Details
            </Button>
          </CardItem>
        </CardBody>
      </CardContainer>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';
```

**[PRESENTER]:**
"Next, we'll create the component for the detailed view that slides out. This component will encapsulate all the complex logic for the image carousel, including the autoplay feature we installed earlier."

**[ACTION]:**
Create a new file at `src/components/sections/Projects/components/ProjectDetailSheet.tsx`. Paste this code into it.

```typescript
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Button,
  Sheet, SheetContent, SheetHeader, SheetTitle as ShadSheetTitle, SheetDescription as ShadSheetDescription, SheetClose, SheetFooter,
  Badge,
  Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext,
  Tooltip, TooltipContent, TooltipTrigger
} from '@/components/ui';
import type { CarouselApi } from '@/components/ui/Carousel/carousel';
import { Box, Flex, Text } from '@/components/primitives';
import { ExternalLink, Github, PlayIcon, PauseIcon } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';
import type { Project } from '@/data/projectsData';

/**
 * Props for the ProjectDetailSheet component.
 */
interface ProjectDetailSheetProps {
  /** The project data to display in the sheet. Can be null if no project is selected. */
  project: Project | null;
  /** The open state of the sheet. */
  isOpen: boolean;
  /** Callback function to handle changes to the open state. */
  onOpenChange: (isOpen: boolean) => void;
}

/**
 * A side sheet component that displays detailed information about a selected project.
 * It includes a media carousel with autoplay functionality, project descriptions,
 * tech stack, and links to the live site or repository.
 *
 * @param {ProjectDetailSheetProps} props - The properties for the component.
 * @returns {React.ReactElement} A Sheet component containing the project details.
 */
export const ProjectDetailSheet: React.FC<ProjectDetailSheetProps> = ({ project, isOpen, onOpenChange }) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | undefined>();
  const [isPlaying, setIsPlaying] = useState(true);

  // Set up the autoplay plugin for the carousel.
  const autoplayPlugin = useRef(
    Autoplay({
      delay: 3500,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    })
  );

  // Effect to control the autoplay state based on user interaction or component state.
  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    if (isPlaying && project) {
      autoplayPlugin.current.play();
    } else {
      autoplayPlugin.current.stop();
    }
  }, [carouselApi, isPlaying, project]);

  // Toggles the play/pause state of the carousel autoplay.
  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  // Reset autoplay to playing whenever a new project is selected.
  useEffect(() => {
    if (project) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [project]);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      {project && (
        <SheetContent className="w-full sm:max-w-2xl p-0 bg-card/80 backdrop-blur-lg border-border/30 shadow-2xl flex flex-col">
          <SheetHeader className="p-4 md:p-6 border-b border-border/20 sticky top-0 bg-card/80 backdrop-blur-lg z-10 flex-shrink-0">
            <ShadSheetTitle className="text-2xl md:text-3xl font-headline text-primary">{project.title}</ShadSheetTitle>
            <ShadSheetDescription className="sr-only">
              Detailed view of the {project.title} project.
            </ShadSheetDescription>
          </SheetHeader>

          <Box className="flex-grow overflow-y-auto">
            <Box className="space-y-4 p-4 md:p-6 pb-24">
              {project.mediaGallery && project.mediaGallery.length > 0 ? (
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  plugins={[autoplayPlugin.current]}
                  setApi={setCarouselApi}
                  className="w-full rounded-lg overflow-hidden"
                >
                  <CarouselContent>
                    {project.mediaGallery.map((media, index) => (
                      <CarouselItem key={index}>
                        <Box className="relative w-full aspect-video bg-black/50">
                          {media.type === 'image' && (
                            <Image
                              src={media.url}
                              alt={`${project.title} - Media ${index + 1}`}
                              data-ai-hint={media.dataAiHint || project.title.toLowerCase().split(' ').slice(0,2).join(' ')}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 90vw, 800px"
                            />
                          )}
                          {media.type === 'video' && (
                            <video src={media.url} controls autoPlay muted playsInline loop className="w-full h-full object-cover">
                              Your browser does not support the video tag.
                            </video>
                          )}
                        </Box>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {project.mediaGallery.length > 1 && (
                    <>
                      <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 text-white bg-black/30 hover:bg-black/50 border-none" />
                      <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 text-white bg-black/30 hover:bg-black/50 border-none" />
                      <Tooltip>
                        <TooltipTrigger asChild>
                           <Button
                            variant="ghost"
                            size="icon"
                            onClick={togglePlay}
                            className="absolute bottom-2 right-2 z-10 text-white bg-black/30 hover:bg-black/50 border-none p-2 rounded-full"
                            aria-label={isPlaying ? "Pause carousel autoplay" : "Play carousel autoplay"}
                           >
                            {isPlaying ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
                           </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{isPlaying ? 'Pause Autoplay' : 'Play Autoplay'}</p>
                        </TooltipContent>
                      </Tooltip>
                    </>
                  )}
                </Carousel>
              ) : (
                 <Box className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden">
                   <Text className="absolute inset-0 flex items-center justify-center text-muted-foreground">No media available</Text>
                 </Box>
              )}

              <Text as="p" className="font-body text-sm md:text-base text-foreground/90">
                {project.longDescription || project.description}
              </Text>

              <Box>
                <Text as="h4" className="font-semibold text-foreground/70 mb-2 text-sm">Tech Stack:</Text>
                <Flex wrap="wrap" gap="0.5rem">
                  {project.techStack.map(tech => (
                    <Badge key={tech} variant="outline" className="text-xs md:text-sm border-primary/50 text-primary/90">{tech}</Badge>
                  ))}
                </Flex>
              </Box>

              <Flex gap="1rem" className="pt-2">
                {project.liveSiteUrl && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground rounded-lg text-xs md:text-sm">
                        <a href={project.liveSiteUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-1.5 h-3.5 w-3.5 md:mr-2 md:h-4 md:w-4" /> Live Site
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View the live project</p>
                    </TooltipContent>
                  </Tooltip>
                )}
                {project.githubUrl && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button asChild variant="outline" className="border-foreground/50 text-foreground/80 hover:bg-foreground/10 hover:text-foreground rounded-lg text-xs md:text-sm">
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-1.5 h-3.5 w-3.5 md:mr-2 md:h-4 md:w-4" /> GitHub
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Explore the source code</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </Flex>
            </Box>
          </Box>
          <SheetFooter className="p-4 border-t border-border/20 sticky bottom-0 bg-card/90 backdrop-blur-lg z-10 flex-shrink-0">
            <SheetClose asChild>
              <Button type="button" variant="outline" className="w-full">
                Close
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      )}
    </Sheet>
  );
};
ProjectDetailSheet.displayName = "ProjectDetailSheet";
```

**[PRESENTER]:**
"Finally, we can assemble everything in our main section file. Create the file **`src/components/sections/Projects/Projects.tsx`**. Its code is now beautifully simple because all the hard work is delegated to its children."

**[ACTION]:**
Create `src/components/sections/Projects/Projects.tsx` and paste the following into it.

```typescript
'use client';

import React, { useState } from 'react';
import { SectionWrapper } from '@/components/layout';
import { Box } from '@/components/primitives';
import { SectionTitle } from '@/components/common';
import { projectsData, type Project } from '@/data/projectsData';
import { ProjectCard, ProjectDetailSheet } from './components';

/**
 * The Projects section of the portfolio.
 * It displays a grid of project cards. Clicking a card opens a detailed view
 * in a side sheet, which includes a media carousel and links.
 * This component manages the state for which project is selected.
 *
 * @returns {React.ReactElement} The Projects section component.
 */
export const Projects: React.FC = React.memo(() => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleOpenSheet = (project: Project) => {
    setSelectedProject(project);
  };
  
  const handleSheetOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedProject(null);
    }
  };

  return (
    <SectionWrapper id="projects" className="bg-background">
      <SectionTitle>Featured Projects</SectionTitle>
      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
        {projectsData.map(project => (
          <ProjectCard key={project.id} project={project} onOpenSheet={handleOpenSheet} />
        ))}
      </Box>

      <ProjectDetailSheet 
        project={selectedProject}
        isOpen={!!selectedProject}
        onOpenChange={handleSheetOpenChange}
      />
    </SectionWrapper>
  );
});

Projects.displayName = 'ProjectsSection';
```

**[PRESENTER]:**
"Look how clean that is! This component is now a 'container' component. Its only job is to manage state and compose its smaller children. This architecture is clean, maintainable, and incredibly easy to reason about."

---

### **(22:00) Chapter 5: Codebase Deep Dive: A Senior Developer's Tour**

**[PRESENTER]:**
"Alright, let's put on our architect hats. A project's long-term success is dictated by its structure. A clean, logical, and well-documented folder structure is the difference between a project you can scale and a project you'll dread opening in six months. I've structured KineticFolio based on years of experience, emphasizing **Separation of Concerns**, the **Single Responsibility Principle**, and **maintainability**. Let's walk through it, file by file.

#### Root-Level Configuration

First, the files in the project's root directory. These control the entire project's behavior.
*   `next.config.ts`: This is the configuration file for Next.js. We've used it to define our image sources (`images.unsplash.com` and `placehold.co`), which is a security best practice, and to add a webpack configuration to ensure smooth builds on Vercel.
*   `tailwind.config.ts`: This file defines our design system in code. It's where we've configured our custom fonts, color palettes (via CSS variables from `globals.css`), and extended Tailwind's default theme.
*   `package.json`: This is the manifest for our project. It lists all our dependencies (`react`, `next`, `tailwindcss`, `framer-motion`, etc.) and defines our command-line scripts like `npm run dev` and `npm run build`.
*   `components.json`: This file is specific to **Shadcn/UI**. It tells the Shadcn CLI where to find our components, styles, and utilities, so it knows how to add new components correctly.

#### The `/public` Directory: Static Assets

This is the simplest directory. Anything placed here is served directly by the browser at the root URL.
*   `DendiRivaldi_Resume.pdf`: The resume file linked in the "About" section.
*   Other assets like `favicon.ico` and social sharing images (`og-image.png`) would also live here.

#### The `/src` Directory: The Application's Core

This is where 99% of our unique code lives. Using a `src` directory is a standard convention that separates our application code from configuration files.

##### `/src/app` - The Heart of Next.js

This directory is the core of the Next.js App Router. The file structure here directly maps to the URL routes of our application.
*   `layout.tsx`: This is the **root layout**, the shell that wraps every single page. It's one of the most important files. Here, we've set up our HTML structure, imported our global font (`Inter`), configured our site's metadata for SEO, and wrapped our application in essential context providers like `<ThemeProvider>` for dark mode and `<TooltipProvider>` for tooltips. Key layout components like the `<Navbar>` and `<ThemeSwitcher>` are also placed here so they are present on all pages.
*   `page.tsx`: Since this is a one-page portfolio, this file is the main entry point for our homepage (`/`). Its only job is to assemble our various `<Section>` components in the correct order.
*   `globals.css`: This is where we define our entire visual theme. It contains our custom color palette (using HSL CSS variables for light and dark modes) and a few custom utility classes like `.bg-grid-pattern`. This centralized approach to theming is incredibly powerful.

##### `/src/components` - The Reusable UI Toolkit

This is the most organized directory in the project, built on the principle of composition.
*   `/ui`: This folder contains all the components we've added via **Shadcn/UI**. Critically, this is **our code**. We can modify any of these files to suit our exact design needs without worrying about breaking changes from a third-party library.
*   `/primitives`: These are our most basic, unstyled building blocks (`Box`, `Flex`, `Text`). They are simple wrappers around HTML elements like `div` that provide convenient props for styling and layout, forming the foundation of all other components.
*   `/common`: Contains small, highly reusable components that are shared across different sections, like `SectionTitle`.
*   `/icons`: Holds any custom SVG icons that aren't available in the `lucide-react` library, exported as React components.
*   `/layout`: This is for major structural components that define the page's overall layout: `Navbar`, `SectionWrapper`, `ThemeSwitcher`, and `CookieConsentBanner`.
*   `/sections`: This is where the main content sections of the page live. Each section (`Hero`, `About`, `Projects`, etc.) has its own folder. Inside each, you'll find:
    *   `Projects.tsx`: The main component for that section. It acts as a "container," managing state and composing its children.
    *   `components/`: A sub-folder for any components that are only used within that specific section. For example, `ProjectCard.tsx` and `ProjectDetailSheet.tsx` live inside `Projects/components/`. This follows the **Single Responsibility Principle**—the main `Projects.tsx` file doesn't need to know the internal details of a card or a detail sheet; it just tells them what data to display.

##### `/src/data` - The Content Layer

This is a perfect example of **Separation of Concerns**. Our components should not contain hard-coded text or data. By placing all our static content here, we can update the entire portfolio without ever touching a React component.
*   `aboutData.ts`, `projectsData.ts`, `skillsData.ts`: These files export simple arrays of data. This makes content management a breeze and is a hallmark of a well-architected frontend application.

##### `/src/hooks` - Stateful Logic

When UI logic gets complex (e.g., managing state across multiple components, handling side effects), we extract it into custom hooks. This keeps our components clean and focused on presentation.
*   `use-feedback-store.ts`: Manages all the state for the feedback feature: the current user, the list of feedback, and the AI analysis results.
*   `use-visitor-location.ts`: Encapsulates the asynchronous logic for fetching the user's location from an external API.

##### `/src/services` - The Data Persistence Layer

This is a crucial abstraction layer. Our application logic (in hooks and components) shouldn't care *how* or *where* data is stored.
*   `feedbackService.ts`: This service contains all the logic for interacting with `localStorage`. It has functions like `getCurrentUser`, `addFeedbackForUser`, etc. If we ever wanted to move our feedback system to a real database like Firebase, **this is the only file we would need to change**. This powerful separation makes our application incredibly adaptable.

##### `/src/lib` - Utilities & Constants

This is a standard folder for shared helper functions and constants.
*   `utils.ts`: Contains the essential `cn` function for merging Tailwind CSS classes.
*   `constants.ts`: Defines our `localStorage` keys in one place to avoid "magic strings" and prevent typos.

##### `/src/ai` - The Generative AI Brain

All our server-side AI logic is neatly organized here.
*   `genkit.ts`: Initializes and configures our Genkit instance with the Google AI plugin.
*   `flows/review-feedback-flow.ts`: This is our **server action**. It defines the entire AI process: the Zod schemas for structured input and output (ensuring type-safe, predictable AI responses), the prompt sent to the Gemini model, and the flow that orchestrates the call. The `'use server';` directive at the top is critical, as it ensures this sensitive code only ever runs on the server."

---

### **(27:00) Chapter 6: How to Customize and Contribute**

**[PRESENTER]:**
"Now that you understand the architecture, customizing this portfolio is incredibly straightforward.

##### Updating Content

*   **Project Information**: To change project details, open **`src/data/projectsData.ts`** and edit the `projectsData` array.
*   **Skill Information**: To update skills, open **`src/data/skillsData.ts`** and modify the `coreSkillsData` and `subSkillsData` arrays.
*   **About Me Text**: To change the bio, open **`src/data/aboutData.ts`**.
*   **Other Text**: Most other text can be found directly within the respective section component in `src/components/sections/`.

##### Changing Styles

*   **Colors & Theme**: To change the color palette for light and dark modes, edit the HSL CSS variables at the top of **`src/app/globals.css`**.
*   **Component Styles**: To change the style of a specific element, find the component file and modify its Tailwind CSS utility classes.

##### Replacing Images & Assets

*   **Resume**: Replace the `DendiRivaldi_Resume.pdf` file in the `/public` directory with your own.
*   **Images**: Project images and other visuals are defined in **`src/data/projectsData.ts`**. We are using live, working images from Unsplash, but you should replace these URLs with your own."

---

### **(28:30) Chapter 7: Deployment & Final Thoughts**

**[ON-SCREEN: Browser showing the finished, polished application. Then, switch to the Vercel dashboard.]**

**[PRESENTER]:**
"And with that, the core development of our KineticFolio is complete! We've built an incredible application that's responsive, dynamic, and most importantly, built on a professional, maintainable architecture. Now, let's get it online. The absolute best place to host a Next.js app is **Vercel**."

**[PRESENTER]:**
"The process is incredibly simple. First, make sure all your code is pushed to a GitHub repository. Then, in your Vercel dashboard, you'll 'Add New... > Project', and import that repository. Vercel automatically detects that it's a Next.js project and configures all the build settings for you. You just need to add your `NEXT_PUBLIC_SITE_URL` environment variable for production metadata, hit 'Deploy', and in about a minute, your application will be live on the web. It is truly that simple."

---

### **(29:30) Outro**

**[ON-SCREEN: Back to the finished application, perhaps slowly cycling through the dark and light themes. A final slate with links appears.]**

**[PRESENTER]:**
"And there you have it! We went from an empty folder to a fully functional, beautifully animated, AI-enhanced web application built on a professional, real-world architecture.

We learned how to apply key software design principles like **Separation of Concerns**, the **Single Responsibility Principle**, and **DRY** to create a codebase that is not just clean, but truly maintainable.

I really hope you found this masterclass valuable. If you did, do me a huge favor and hit that like button—it genuinely helps the channel. Be sure to subscribe so you don't miss future deep dives just like this one. The complete, finished source code is linked right at the top of the description below. Go check it out, clone it, and make it your own. I would love to see what you build with these techniques.

Thanks so much for watching, and I'll see you in the next one. Happy coding!"

**[Video End: Outro music fades in, and an end screen appears with links to other videos and social media profiles.]**
