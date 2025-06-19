
# KineticFolio - Dendi Rivaldi

KineticFolio is a visually stunning, one-page portfolio website for Dendi Rivaldi, a Python, Automation, and Game Development enthusiast with a passion for design. Built with Next.js, Tailwind CSS, TypeScript, and Framer Motion. It embodies a "Kinetic Elegance" design philosophy and "Crystal Cathedral" architectural principles.

## Project Vision

The portfolio aims to be an interactive art installation, offering a charismatic, elegant, and unforgettable user experience. The entire experience is contained on a single, seamless page, with unique, fluid animations creating an "unfolding narrative" as the user navigates through sections.

## Core Features

-   **Kinetic Hero**: A dynamic "Living Ink Sculpture" typography effect for the main headline (Dendi Rivaldi) and an animated, cycling sub-headline that subtly reacts to the user's cursor.
-   **Animated Sections**: Fluid section transitions using Framer Motion, creating an unfolding narrative effect as users scroll or navigate.
-   **Interactive About Section**: Features animated text and an image, along with a "Download Resume" button for "DendiRivaldi_Resume.pdf".
-   **Interactive Skills Graph**: A skill showcase where hovering over a core skill (Python, Automation, Game Dev, Design, etc.) reveals related sub-skills and descriptions.
-   **Project Gallery with Carousels**: A card-based gallery for project showcases, with detailed modals that include carousels to display multiple project media (images/videos).
-   **Interactive Contact Form**: A clean contact form with social media links to Dendi Rivaldi's GitHub, LinkedIn, and email.
-   **Feedback Section**: A prototype feature allowing users to (mock) log in/sign up and submit, view, and delete their feedback, persisted using browser `localStorage`.
-   **Modern Architecture**: Adherence to DRY principles and a clear, modular folder structure with barrel-style exports for maintainability.

## Technical Stack

-   **Framework**: Next.js (App Router)
-   **Styling**: Tailwind CSS
-   **Language**: TypeScript
-   **Animation**: Framer Motion
-   **UI Components**: ShadCN UI
-   **Carousel**: Embla Carousel React (via ShadCN UI)
-   **Form Handling**: React Hook Form & Zod

## Setup and Run Instructions

1.  **Clone the repository (if applicable):**
    ```bash
    # git clone <repository-url>
    # cd kineticfolio
    ```

2.  **Install dependencies:**
    Make sure you have Node.js (v18 or later recommended) and npm/yarn installed.
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will typically be available at `http://localhost:9002` (as specified in `package.json` for this project) or `http://localhost:3000`.

4.  **Build for production:**
    ```bash
    npm run build
    ```

5.  **Start the production server:**
    ```bash
    npm run start
    ```

## Code Structure

The project follows a specific folder structure to promote clarity and maintainability:

```
/src
├── app/                 // Next.js App Router core files (layout.tsx, page.tsx, globals.css)
├── components/
│   ├── icons/           // Custom SVG icons as components (e.g., GitHubIcon.tsx)
│   │   └── index.ts     // Barrel export for icons
│   ├── layout/          // Structural components (SectionWrapper.tsx, PageNavigation.tsx, CookieConsentBanner.tsx)
│   │   └── index.ts     // Barrel export for layout components
│   ├── primitives/      // Base HTML element wrappers (Box.tsx, Flex.tsx, Text.tsx)
│   │   └── index.ts     // Barrel export for primitives
│   ├── sections/        // Main content sections
│   │   ├── About/
│   │   │   └── About.tsx
│   │   ├── Contact/
│   │   │   └── Contact.tsx
│   │   ├── Feedback/
│   │   │   └── Feedback.tsx
│   │   ├── Hero/
│   │   │   ├── Hero.tsx
│   │   ├── Projects/
│   │   │   └── Projects.tsx
│   │   └── Skills/
│   │       └── Skills.tsx
│   │   └── index.ts     // Barrel export for all section components
│   └── ui/              // ShadCN UI components, each in its own subdirectory
│       ├── Button/
│       │   └── button.tsx
│       ├── Card/
│       │   └── card.tsx
│       ├── Carousel/
│       │   └── carousel.tsx
│       └── ... (other ShadCN components)
│       └── index.ts     // Barrel export for all UI components
├── hooks/               // Custom React hooks (e.g., use-mobile.tsx) // useToast.ts is removed
│   └── index.ts         // Barrel export for hooks
├── lib/                 // Utility functions (utils.ts)
│   └── index.ts         // Barrel export for lib utilities
└── public/              // Static assets (e.g., DendiRivaldi_Resume.pdf, images, manifest.json, icons/)

```
Each component directory (icons, layout, primitives, sections, ui, hooks, lib) utilizes an `index.ts` file for barrel exports, allowing for cleaner imports (e.g., `import { Button } from '@/components/ui';`).

## Customization

-   **Content**: Update text, project details (in `src/components/sections/Projects/Projects.tsx` - `projectsData` array), and skill information directly in the respective components.
-   **Styling**: Modify Tailwind CSS classes in components or update the theme variables in `src/app/globals.css`.
-   **Images**: Placeholder images are sourced from Unsplash to provide a better visual starting point. You should replace these with your actual project visuals and your portrait. Look for `data-ai-hint` attributes for guidance on image content. Update Open Graph image (`og-image.png`) and icons in `/public`.
-   **Social Links**: Already updated with Dendi Rivaldi's info.
-   **Resume**: Place your resume as `DendiRivaldi_Resume.pdf` in the `/public` directory.

## Deployment to Vercel

Deploying this Next.js application to Vercel is straightforward.

1.  **Push to GitHub**:
    *   Ensure your latest code is committed and pushed to a GitHub repository.

2.  **Import Project in Vercel**:
    *   Go to your Vercel dashboard and click "Add New... > Project".
    *   Choose "Import Git Repository" and connect your GitHub account if you haven't already.
    *   Select your `kineticfolio` repository.
    *   Vercel will automatically detect that it's a Next.js project and configure most settings.

3.  **Configure Environment Variables**:
    *   For your **production domain**, you need to set the `NEXT_PUBLIC_SITE_URL` environment variable.
        *   In your Vercel project settings, go to "Environment Variables".
        *   Add a new variable:
            *   **Name**: `NEXT_PUBLIC_SITE_URL`
            *   **Value**: Your full production domain (e.g., `https://yourdomain.com` or `https://www.yourdomain.com`)
            *   Ensure this is available for the **Production** environment (and optionally Preview/Development if you want to test with it).
    *   Vercel automatically provides `NEXT_PUBLIC_VERCEL_URL` for preview deployments, which the application will use as a fallback if `NEXT_PUBLIC_SITE_URL` is not set (or if you want to check preview deployments).

4.  **Deploy**:
    *   Click the "Deploy" button in Vercel.
    *   Vercel will build and deploy your application. You'll be provided with a URL once it's live.

Your site should now be deployed! Vercel will automatically redeploy your site whenever you push changes to the connected GitHub branch (usually `main` or `master`).

Enjoy your new portfolio!
