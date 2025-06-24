# KineticFolio: Building a Stunning One-Page Portfolio (In-Depth Tutorial)

**(Video formatting: This script is designed for a 30-minute runtime, assuming a steady but clear speaking pace of ~150 words per minute. Visual cues and on-screen actions are explicitly described for a non-developer presenter.)**

---

### [CHAPTER] (0:00) Introduction: From Static Page to Interactive Masterpiece

**[Video Start: Energetic, inspiring background music fades in. The screen shows a dynamic, full-screen recording of the final KineticFolio website. The camera smoothly scrolls, showcasing the hero text animation, the sections gracefully animating into view, the 3D project cards tilting on hover, and the AI feedback analysis in action. The overall impression is polished, professional, and alive.]**

"Hey everyone, and welcome to the channel! My name is Dendi, and if you're a developer, I want you to think about the last portfolio website you looked at. Was it clean? Professional? Probably. But was it... memorable? Did it feel like an experience, or did it feel like a static digital resume?

That's the exact question that led to the project we're going to build, from the ground up, in this video.

What if a portfolio could be more? What if it could be an interactive art piece, something that tells a story and showcases your skills not just with words, but through the very experience of using it?

In this in-depth, 30-minute tutorial, we are going to build this exact application: **KineticFolio**. It's a visually captivating, one-page portfolio designed around a philosophy I call 'Kinetic Elegance'. By the end of this video, you will not only have this incredible project, but you will deeply understand the 'why' behind the 'how' from a senior developer's perspective. You'll learn to harness the full-stack power of **Next.js** and its App Router. You'll learn to build completely custom, responsive designs at lightning speed with **Tailwind CSS**. You'll master my absolute favorite way to handle components with **ShadCN UI**. You'll orchestrate breathtaking, production-grade animations with **Framer Motion**. And, as a final 'wow' factor, you'll even integrate a powerful **Genkit** AI feature to make your project stand out from the crowd.

This is a big one, packed with professional, real-world techniques. If that sounds good to you, do me a quick favor and hit that like button and make sure you're subscribed to the channel, because we're about to cover a lot of ground. The full, final source code for the project is available on GitHub, and you'll find that link in the description below so you can follow along or check your work.

Alright, let's get right into it and set up our foundation."

---

### [CHAPTER] (2:45) Part 1: The Foundation - Project Setup & Tech Stack Deep Dive

**[On Screen: A clean, empty terminal window.]**

"Alright, every great project starts with a solid foundation. Let's get our project bootstrapped. I'm here in my terminal, and we're going to use the official `create-next-app` command, which is the standard way to start any new Next.js project. So, type this with me:

```bash
npx create-next-app@latest kineticfolio
```

We're calling our project `kineticfolio`.

Now, this command-line interface will ask us a series of questions that are absolutely critical for getting our setup right from the very beginning. Let's walk through them.

-   'Would you like to use TypeScript?' **Absolutely, yes.** For any project of this complexity, TypeScript is non-negotiable. It provides static typing, which catches bugs before they ever make it to the browser and makes our code infinitely more maintainable.
-   'Would you like to use ESLint?' **Yes.** This is our code linter. It will enforce a consistent code style and help us avoid common pitfalls.
-   'Would you like to use Tailwind CSS?' **A definite yes.** This is our styling engine, and it's central to the entire design philosophy of this project.
-   'Would you like to use the `src/` directory?' **Yes.** This is a common convention for keeping our application code neatly organized and separated from configuration files in the root.
-   'Would you like to use the App Router?' **This is the most important one. YES.** The App Router is the modern, powerful, and recommended way to build Next.js apps. It enables React Server Components, nested layouts, and a host of performance optimizations that this entire tutorial is built around.
-   Finally, you can say 'No' to customizing the default import alias. The `@/*` alias it sets up for us is perfect.

While that's installing all of our initial dependencies, let's quickly talk about why this specific stack is so powerful and how these pieces fit together.

**Next.js with the App Router** is our application's entire skeleton and nervous system. It's a full-stack React framework. This means we're not just building a frontend; we're building a complete web application. By using the App Router, we get access to React Server Components. This is a game-changer. It means we can write components that render on the server, fetch data on the server, and send only the resulting HTML to the client. This dramatically reduces the amount of JavaScript the user has to download, leading to a much faster, more performant website.

**Tailwind CSS** is our styling engine. It’s a utility-first CSS framework. What that means is, instead of writing traditional CSS in separate files, we're going to use small, single-purpose classes directly in our JSX. This might seem strange at first, but it allows us to build completely custom, professional designs without ever leaving our component files, which massively speeds up development.

And finally, **ShadCN UI**. This is the part that might be new to you, and honestly, it's a game-changer in the React ecosystem. Okay, the installation is done. Let's `cd kineticfolio` and open it up in VS Code."

**[On Screen: The newly created project is now open in VS Code. The terminal is visible at the bottom.]**

"Now, to set up ShadCN, we'll run its initialization command in the integrated terminal:

```bash
npx shadcn-ui@latest init
```

It's going to ask you a few questions to configure itself for our project. It's smart enough to detect our setup, so the defaults it suggests are usually perfect. Let's press Enter through the prompts. It will detect we're using TypeScript, it will suggest 'Default' and 'Neutral' for the base color theme, it will find our `src/app/globals.css` file for styling, and—this is critical—it will ask if we want to use CSS Variables for theming. **You absolutely want to say yes to this.** This is the secret to creating our beautiful light and dark modes.

Once that's done, you'll see it has created two things: a `components.json` file to store our configuration, and a `src/lib/utils.ts` file which contains a small but mighty helper function called `cn` that we'll use to merge our Tailwind classes.

Now for the magic. Shadcn is not a typical component library you install from npm. Instead, you use its command-line tool to **copy the source code** of beautifully designed, accessible components directly into your project. This means **we own the code**. We have 100% control to customize it.

Let's add all the components we'll need for this entire portfolio project in one go. This command is a bit long, but you can find it in the project's `README.md` file on GitHub. In your terminal, run this exact command:

```bash
npx shadcn-ui@latest add button card sheet input textarea label toast form badge carousel accordion alert-dialog avatar dialog dropdown-menu popover progress radio-group scroll-area select separator slider switch table tabs tooltip
```

**[Presenter executes the command, and the terminal output is shown on screen.]**

Look at that! If you now open your `src/components/ui` folder, it's now populated with the full, un-minified source code for every single one of those components. This is the power and flexibility we're going to leverage throughout this build. We have the speed of using pre-built components with the complete control of writing them from scratch. It's the best of both worlds.

Okay, our foundation is set. It's time to start building."

---

### [CHAPTER] (8:30) Part 2: Global Styles & Root Layout

**[On Screen: VS Code is focused on `src/app/globals.css`. The file is mostly empty except for the default `@tailwind` directives.]**

"Before we build our first component, we need to define the soul of our application: the theme. A consistent and professional color palette is what separates amateur projects from professional ones. Let's open the file at **`src/app/globals.css`**. This is where we'll define all of our site-wide styles.

We're going to define all of our colors here using CSS variables, which is the modern and correct way to handle theming, especially for supporting both light and dark modes. I want you to replace the entire contents of `src/app/globals.css` with this exact code block.

**[On Screen: Display the full code for `src/app/globals.css` as it's being pasted in.]**

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
```

Let's break this down. Inside the `@layer base` directive, we have a `:root` selector. This defines the variables for our default theme, which is the light theme. We're defining variables for `--background`, `--foreground` (which is the text color), `--primary` (our main brand color), `--accent`, and so on. Notice that I'm using HSL values, which stands for Hue, Saturation, and Lightness. Using HSL makes it incredibly easy to tweak our color palette later.

Right below that, we have the `.dark` selector. This block contains all the color overrides for our dark theme. When the `dark` class is applied to the `<html>` element, all of these variables will take precedence. Next.js and a package we'll use called `next-themes` will handle toggling this class for us automatically. This is a powerful and scalable way to manage themes.

Next, let's open **`src/app/layout.tsx`**. This is the root shell of our entire application. Every single page and component will be wrapped by this layout. It's the perfect place for things that need to be on every page. We need to replace the boilerplate in this file with our own fully configured layout.

**[On Screen: Display the full code for `src/app/layout.tsx` as it's being pasted in.]**

```typescript
import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import { Toaster, TooltipProvider } from "@/components/ui";
import { CookieConsentBanner, ThemeSwitcher, Navbar } from '@/components/layout';
import { Inter } from 'next/font/google';
import { SpeedInsights } from "@vercel/speed-insights/next";

// Configure Inter font
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Use swap for better perceived performance
  variable: '--font-inter' // CSS variable for Tailwind
});

// Helper function to determine the site URL
const getSiteUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.startsWith('http')
      ? process.env.NEXT_PUBLIC_SITE_URL
      : `https://${process.env.NEXT_PUBLIC_SITE_URL}`;
  }
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  return `http://localhost:${process.env.PORT || 9002}`;
};

const SITE_URL = getSiteUrl();

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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [ 
    { media: '(prefers-color-scheme: light)', color: 'hsl(220 50% 98%)' }, // light background
    { media: '(prefers-color-scheme: dark)', color: 'hsl(0 0% 7%)' },  // dark background
  ],
};

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

Let's walk through this file. At the top, we're importing the 'Inter' font from `next/font/google`. This is an amazing feature of Next.js that optimizes web fonts for us automatically. I'm configuring it with a CSS variable, `--font-inter`, so we can use it easily in our Tailwind config.

Then we have the `metadata` object. This is critical for SEO. It controls our site's `<title>` tag, the meta description, keywords, and the Open Graph tags for beautiful social media previews.

Inside the `<body>` tag, this is where we set up our global providers. We wrap everything with the `<ThemeProvider>` from a package called `next-themes`. We'll need to install that: `npm install next-themes`. This provider will manage switching between light and dark mode for us. Inside that, we wrap everything in a `<TooltipProvider>` from Shadcn, which enables all the tooltips across our app. I've also added our `<Toaster>` for notifications, and placeholders for our `<Navbar>`, `<ThemeSwitcher>`, and `<CookieConsentBanner>` which we will build or already exist as components.

With our global styles, fonts, and root layout configured, we can finally start building the actual page."

---

### [CHAPTER] (13:00) Part 3: The Core Build - Crafting the Projects Section

**[On Screen: VS Code is focused on a new, empty file: `src/components/sections/Projects/Projects.tsx`.]**

"Okay, this is where the magic happens. We're going to build out what is arguably the most visually impressive and technically complex section of our portfolio: the Projects section. This section will demonstrate how to combine data, state management, custom components, and advanced animations.

But a great application is built on solid, reusable foundations. Before we dive in, let's look at a key architectural piece I've prepared. Open the file **`src/components/layout/SectionWrapper.tsx`**. This is a simple but vital component. It's a `<section>` element that provides consistent padding and vertical centering. It's a reusable layout primitive that ensures a rhythmic, well-paced scrolling experience. Using wrappers like this keeps our code DRY—Don't Repeat Yourself.

Because we have this wrapper, our main page file at **`src/app/page.tsx`** becomes incredibly simple and readable. It's just a sequence of our main section components: `<Hero />`, `<About />`, `<Skills />`, and the `<Projects />` component that we're about to build. This clean, declarative structure is a hallmark of professional React architecture.

Alright, let's start building the **Projects Section**. Open the file at **`src/components/sections/Projects/Projects.tsx`**.

First, let's define our data. In a real-world application, this would come from a database or a headless CMS. But for this tutorial, a local constant is perfect. Paste this `projectsData` array at the top of the file.

**[On Screen: Display the full `projectsData` constant.]**

```javascript
const projectsData: Project[] = [
  // ... (Full data from the file)
];
```

This is an array of objects, where each object represents one of our projects, containing its `id`, `title`, `description`, a `longDescription`, an array of `techStack` strings, and crucially, a `mediaGallery` array for our image carousel.

Now, for the card itself. The logic for a single project card is complex enough that it deserves its own component. So, right inside this file, we'll create a `ProjectCard` component that accepts a `project` object as a prop.

This is where we combine our coolest technologies. The root of the card will be a `CardContainer` component. This isn't a standard Shadcn component. If you look in the file tree at **`src/components/ui/3d-card/card-3d.tsx`**, you'll see it's a custom component that uses React's `onMouseMove` event to track the cursor's position relative to the card. It then uses that data to apply CSS transforms, creating that awesome 3D tilt effect. This is a fantastic example of enhancing a base component with custom logic.

Inside the `CardContainer`, we'll use `CardBody` and `CardItem`. Now, let's write the code for our `ProjectCard` component.

**[On Screen: Display the full code for the `ProjectCard` component.]**

```jsx
const ProjectCard: React.FC<{ project: Project; onOpenSheet: (project: Project) => void }> = React.memo(({ project, onOpenSheet }) => {
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
              priority={project.id === 'project-1'}
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

The `CardItem` component is really cool. It takes a `translateZ` prop. This tells Framer Motion how much to 'lift' that element towards the viewer when you hover over the card, creating that incredible 3D perspective. For the image, I'm using the `<Image>` component from `next/image` for automatic optimization. Notice the `sizes` prop—this is a key performance optimization that tells the browser how much space the image will take up at different screen sizes, so it can download the most efficient version possible.

Now for the 'View Details' button. When this is clicked, we want to open a side panel with more information. For that, we use ShadCN's `<Sheet>` component. The state for which project is currently selected will live in our main `Projects` component, managed with a simple `useState<Project | null>(null)`. When the 'View Details' button is clicked, we'll call `onOpenSheet`, setting that state to the current project. When a project is selected, the `<Sheet>`'s `open` prop becomes true, and it slides into view.

Inside the `SheetContent`, this is where we'll display the detailed project information. The centerpiece will be a `<Carousel>` component, another powerful component from Shadcn. We'll pass the `mediaGallery` array from our selected project directly to this carousel.

I'm also adding the `embla-carousel-autoplay` plugin to make it automatically cycle through the images. This small touch makes the project feel much more dynamic and professional.

And just like that, by composing these powerful tools—Framer Motion for the 3D effect, Next.js for the performant images, and Shadcn for the UI building blocks like the Card, Sheet, and Carousel—we've created a truly stunning, interactive, and feature-rich project showcase. This is the workflow that modern, component-driven web development enables."

---

### [CHAPTER] (24:00) Part 4: The "Wow" Factor - Integrating Genkit AI

**[On Screen: VS Code is focused on `src/ai/flows/review-feedback-flow.ts`.]**

"Okay, our portfolio is already looking incredible. But what if we could add a truly standout feature? Let's add some AI.

We have a Feedback section in our app. Right now, it just collects feedback from users and stores it in their browser's local storage. We can take it to the next level by adding a button that allows the portfolio owner to get an instant AI-powered analysis of any piece of feedback.

Using Google's **Genkit**, an open-source framework for building with generative AI, we can add a server-side AI flow. Let's open the file at **`src/ai/flows/review-feedback-flow.ts`**. Let me show you the code.

**[On Screen: Display the full code for `review-feedback-flow.ts`.]**

```typescript
'use server';
/**
 * @fileOverview An AI flow to review user feedback.
 *
 * - reviewFeedback - A function that analyzes feedback text.
 * - ReviewFeedbackInput - The input type for the reviewFeedback function.
 * - ReviewFeedbackOutput - The return type for the reviewFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import {googleAI} from '@genkit-ai/googleai';

const ReviewFeedbackInputSchema = z.object({
  feedbackText: z.string().describe('The user feedback text to be analyzed.'),
});
export type ReviewFeedbackInput = z.infer<typeof ReviewFeedbackInputSchema>;

const ReviewFeedbackOutputSchema = z.object({
  sentiment: z
    .enum(['Positive', 'Neutral', 'Negative'])
    .describe('The overall sentiment of the feedback.'),
  summary: z.string().describe('A concise one-sentence summary of the feedback.'),
  suggestedAction: z
    .string()
    .describe('A brief, actionable next step to address the feedback.'),
});
export type ReviewFeedbackOutput = z.infer<typeof ReviewFeedbackOutputSchema>;

export async function reviewFeedback(input: ReviewFeedbackInput): Promise<ReviewFeedbackOutput> {
  return reviewFeedbackFlow(input);
}

const reviewPrompt = ai.definePrompt({
  name: 'reviewFeedbackPrompt',
  model: googleAI.model('gemini-1.5-flash'),
  input: {schema: ReviewFeedbackInputSchema},
  output: {schema: ReviewFeedbackOutputSchema},
  prompt: `You are a helpful assistant for a portfolio website owner.
Your task is to analyze a piece of user feedback and provide a structured analysis.
Your response MUST conform to the specified JSON schema.

Analyze the following feedback:
"{{{feedbackText}}}"

Based on your analysis, determine the sentiment, provide a one-sentence summary, and suggest a clear, actionable next step for the portfolio owner.
`,
});

const reviewFeedbackFlow = ai.defineFlow(
  {
    name: 'reviewFeedbackFlow',
    inputSchema: ReviewFeedbackInputSchema,
    outputSchema: ReviewFeedbackOutputSchema,
  },
  async (input) => {
    const {output} = await reviewPrompt(input);
    if (!output) {
      throw new Error('Failed to get a structured response from the AI model.');
    }
    return output;
  }
);
```

At the very top of the file, we have the string `'use server';`. This is a Next.js directive. It tells Next.js that this code should only ever run on the server, keeping our API keys and logic secure.

First, we define our input and output shapes using a library called **Zod**. We're creating a `ReviewFeedbackOutputSchema` that tells the AI we expect to receive a perfectly structured JSON object back, with fields for sentiment, summary, and a suggested action. Using Zod like this is a senior-level best practice that makes our interactions with the AI type-safe and reliable.

Next, we define the prompt itself using `ai.definePrompt`. We pass our Zod schemas and give the model its instructions: 'You are a helpful assistant... Your response MUST conform to the specified JSON schema.' This is called structured prompting, and it's the key to getting reliable, machine-readable output from an LLM.

Finally, we wrap this in an `ai.defineFlow`. Now, here's the magic. Let's go back to our frontend component, **`src/components/sections/Feedback/Feedback.tsx`**. In this file, we can just `import { reviewFeedback }` from our AI flow file. Then, in our `handleAiReview` function, we can simply call `await reviewFeedback(...)` as if it were a normal function. Next.js's Server Actions feature handles all the complex networking and security for us automatically. It's the power of modern, integrated web development."

---

### [CHAPTER] (27:30) Final Touches & Deployment

**[On Screen: Browser showing the finished, polished application. Then, switch to the Vercel dashboard.]**

"And with that, the core development of our KineticFolio is complete! We've built an incredible application. It's responsive, thanks to Tailwind's utility classes. It's dynamic, thanks to Framer Motion. And it's feature-rich.

Now, what good is a world-class application if you can't share it with the world? Let's deploy it. Since our project is a Next.js app, the absolute best place to host it is **Vercel**, the company that created Next.js.

The process is incredibly simple. First, make sure all of your code is committed and pushed to a GitHub repository. Then, sign in to your Vercel account, click 'Add New... > Project', and import that GitHub repository. Vercel will automatically detect that it's a Next.js project and configure all the build settings for you. It knows exactly how to build, optimize, and deploy this application for the best possible performance. All you have to do is hit 'Deploy', and in about a minute, your application will be live on the web with a shareable URL, protected by a free SSL certificate. It is truly that simple."

---

### [CHAPTER] (29:00) Outro & What's Next

**[On Screen: Back to the finished application, maybe slowly cycling through the dark and light themes. A final slate with links appears.]**

"And there you have it! In just under 30 minutes, we went from an empty folder to a fully functional, beautifully animated, AI-enhanced web application using a modern, powerful, and scalable tech stack.

We learned how to set up a professional Next.js project with the App Router. We learned how to use Tailwind CSS for rapid, utility-first styling, and how to create a beautiful, custom theme with CSS variables. We mastered the Shadcn/UI workflow to gain full control over our components. We orchestrated complex animations with Framer Motion and custom hooks. And we seamlessly integrated a server-side AI feature with Genkit and Next.js Server Actions.

I really, really hope you found this tutorial valuable and that it's inspired you to build your own amazing projects. If you did, do me a huge favor and smash that like button—it genuinely helps the channel reach more people who could benefit from this content. Be sure to subscribe and turn on notifications so you don't miss future deep dives just like this one.

The complete, finished source code for everything you saw today is linked right at the top of the description below. Go check it out, clone it, and make it your own. I would love to see what you build with these techniques, so please let me know in the comments, or tell me what you'd like to see me build next.

Thanks so much for watching, and I'll see you in the next one. Happy coding!"

**[Video End: Outro music fades in, and an end screen appears with links to other videos and social media profiles.]**
