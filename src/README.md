# KineticFolio: Developer Onboarding & Documentation

Welcome to the KineticFolio project! This document serves as your primary guide for understanding, running, and contributing to the application. It's written with a new developer in mind, so we'll cover everything from the high-level vision to the nitty-gritty of the code structure.

## 1. Project Vision

KineticFolio is a visually stunning, one-page portfolio for **Dendi Rivaldi**. It aims to be more than a static digital resume; it's designed to be an interactive art installation that showcases skills not just with words, but through the very experience of using it.

The core design philosophy is **"Kinetic Elegance,"** creating an "unfolding narrative" where each section animates into view, providing an engaging and memorable user experience.

## 2. Core Features

-   **Dynamic Hero Section**: A captivating entry point with a 3D animated title and a "split-flap" sub-headline display.
-   **AI-Powered Avatar**: The "About Me" section features an interactive avatar that can be regenerated in different artistic styles using AI image generation.
-   **Animated Section Transitions**: Fluid animations powered by Framer Motion create a seamless scrolling experience.
-   **Modern Skills Showcase**: An organized and instantly scannable display of core competencies using "spec cards" with animated badges.
-   **3D-Effect Project Gallery**: Project cards feature a 3D tilt effect on hover, opening into a detailed view with an image carousel.
-   **Full-Stack Feedback System**: A mock-authentication system allows users to leave feedback, which can then be analyzed for sentiment and summary using Google's AI via Genkit.
-   **Responsive Design & Theming**: The site is fully responsive and features a beautiful light/dark mode theme switcher integrated into the main navigation.

## 3. Technical Architecture & Architectural Principles

This project uses a modern, opinionated tech stack and is built upon core software engineering principles that ensure its quality, maintainability, and scalability.

-   **Framework**: **Next.js (App Router)**
    -   **Why?**: We use the App Router for its performance benefits (React Server Components), intuitive file-based routing, and powerful features like Server Actions, which allow us to write backend logic (like our AI flow) without needing a separate server.

-   **Component Toolkit**: **Shadcn/UI**
    -   **Why?**: Shadcn is **not** a typical component library. Instead of installing a package, you use its CLI to **copy component source code** directly into the project (`src/components/ui`). This gives us the best of both worlds: the speed of pre-built, accessible components and the 100% control to customize their style and logic as needed.

-   **Styling**: **Tailwind CSS**
    -   **Why?**: Tailwind's utility-first approach allows for rapid, custom UI development without writing a single line of custom CSS. All styles are co-located with the components, making them easy to manage and update. Theming is handled via CSS variables in `src/app/globals.css`.

-   **Animation**: **Framer Motion**
    -   **Why?**: It provides a simple, declarative API for creating complex, production-grade animations directly within our React components.

-   **Generative AI**: **Genkit**
    -   **Why?**: Genkit is Google's open-source framework for building AI-powered features. We use it on the server-side (as a Next.js Server Action) to securely call the Gemini model for feedback analysis and image generation.

### Architectural Principles in Practice

-   **Separation of Concerns**: This is the cornerstone of our architecture. We strictly separate different aspects of the application:
    -   **Presentation Logic (`/src/components`)**: React components are responsible only for rendering the UI.
    -   **Stateful UI Logic (`/src/hooks`)**: Complex state management and lifecycle logic (e.g., `useFeedbackStore`) are extracted into custom hooks. This keeps our components clean and focused on presentation.
    -   **Data Persistence Logic (`/src/services`)**: The logic for how data is stored and retrieved (currently `localStorage`) is abstracted into a dedicated service layer. This allows us to switch our backend in the future without changing any UI code.
    -   **Static Content (`/src/data`)**: All static text and data for projects, skills, etc., are stored in a dedicated directory. This allows for easy content updates without touching component code.

-   **Single Responsibility Principle (SRP)**: Each component and module has one, and only one, reason to change. For example, the `ProjectCard.tsx` component is responsible only for displaying a project summary, while the `ProjectDetailSheet.tsx` component handles the detailed view.

-   **Don't Repeat Yourself (DRY)**: We avoid code duplication by creating reusable abstractions. The `SectionWrapper` component provides consistent padding and layout for all main sections. Complex CSS, like the background grid pattern, is abstracted into a utility class in `globals.css` instead of being repeated in multiple components.

## 4. Getting Started: Local Development

Follow these steps to get the project running on your local machine.

### Prerequisites

-   **Node.js**: v18.0 or later
-   **npm** (or yarn/pnpm)

### Step 1: Clone the Repository

If you haven't already, clone the project to your local machine.

```bash
# git clone <repository-url>
cd kineticfolio
```

### Step 2: Install Dependencies

Install all the required packages using npm.

```bash
npm install
```
This command reads the `package.json` file and installs all the necessary libraries.

### Step 3: Run the Development Server

Start the local development server.

```bash
npm run dev
```

This command will start the Next.js application in development mode with Turbopack for maximum speed. Once it's running, you can view the application by opening your browser and navigating to:

**http://localhost:3000**

The application will automatically reload if you make any changes to the code.

## 5. Codebase Deep Dive: Understanding the Structure

The project's code is organized inside the `/src` directory. Here’s a breakdown of what each folder is for:

```
/src
├── app/                  // Next.js App Router core. The heart of the application.
│   ├── layout.tsx        // The root layout for the entire site. Wraps all pages.
│   ├── page.tsx          // The main entry point for the homepage.
│   └── globals.css       // Global styles, theme, and custom utility classes.
│
├── components/
│   ├── common/           // Small, highly reusable components (e.g., SectionTitle).
│   ├── icons/            // Custom SVG icons as React components.
│   ├── layout/           // Major structural components (Navbar, Footer, SectionWrapper).
│   ├── primitives/       // Basic HTML element wrappers (Box, Flex, Text).
│   ├── sections/         // The main page sections (Hero, About, Projects, etc.).
│   │   └── [SectionName]/  // Each section has its own folder...
│   │       └── components/ // ...which may contain its own sub-components.
│   └── ui/               // Shadcn UI components. You own this code.
│
├── data/                 // Static content. The "database" of the site.
│   ├── projectsData.ts   // Data for all featured projects.
│   └── skillsData.ts     // Data for all skills and technologies.
│
├── hooks/                // Custom React hooks for reusable stateful logic.
│   ├── use-feedback-store.ts // Manages UI state for the feedback feature.
│   └── use-visitor-location.ts // Fetches the visitor's location.
│
├── lib/                  // Utility functions and constants.
│   ├── constants.ts      // Centralized constants (e.g., localStorage keys).
│   └── utils.ts          // `cn` utility for merging Tailwind classes.
│
├── services/             // Handles external data interactions (e.g., localStorage).
│   └── feedbackService.ts// All logic for reading/writing feedback data.
│
├── ai/                   // All Genkit-related AI code.
│   ├── flows/            // Contains the definitions for our AI flows.
│   └── genkit.ts         // Genkit configuration and initialization.
│
└── public/               // Static assets accessible from the browser.
    └── DendiRivaldi_Resume.pdf
```

## 6. How to Customize and Contribute

### Updating Content

-   **Project Information**: To change project details, open **`src/data/projectsData.ts`** and edit the `projectsData` array.
-   **Skill Information**: To update skills, open **`src/data/skillsData.ts`** and modify the `coreSkillsData` and `subSkillsData` arrays.
-   **About Me Text**: To change the bio, open **`src/data/aboutData.ts`**.
-   **Other Text**: Most other text can be found directly within the respective section component in `src/components/sections/`.

### Changing Styles

-   **Colors & Theme**: To change the color palette for light and dark modes, edit the HSL CSS variables at the top of **`src/app/globals.css`**.
-   **Component Styles**: To change the style of a specific element, find the component file and modify its Tailwind CSS utility classes.

### Replacing Images & Assets

-   **Resume**: Replace the `DendiRivaldi_Resume.pdf` file in the `/public` directory with your own.
-   **Images**: Project images are defined in **`src/data/projectsData.ts`**. The project uses high-quality images from `images.unsplash.com`. You can replace these URLs with your own. The AI avatar in the "About" section can be changed by updating the `initialImage` constant in `src/components/sections/About/components/AvatarGenerator.tsx`.

## 7. Deployment Guide (Vercel)

This Next.js application is optimized for deployment on **Vercel**.

1.  **Push to GitHub**: Ensure your latest code is committed and pushed to a GitHub repository.

2.  **Import Project in Vercel**:
    -   In your Vercel dashboard, click "Add New... > Project".
    -   Connect your GitHub account and import the `kineticfolio` repository.
    -   Vercel will automatically detect the `Next.js` framework and configure the build settings.

3.  **Configure Environment Variables**:
    -   For a production deployment, you need to set the `NEXT_PUBLIC_SITE_URL` environment variable. This is crucial for generating correct metadata for SEO.
    -   In your Vercel project settings, go to "Environment Variables".
    -   Add a new variable:
        -   **Name**: `NEXT_PUBLIC_SITE_URL`
        -   **Value**: Your full production domain (e.g., `https://yourdomain.com`).

4.  **Deploy**:
    -   Click the "Deploy" button. Vercel will build and deploy your application, providing you with a live URL.
    -   Vercel will automatically redeploy the site whenever you push new changes to the main branch.

---

Happy coding!

    