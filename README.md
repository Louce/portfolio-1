
# KineticFolio

KineticFolio is a visually stunning, one-page portfolio website for an elite frontend developer, built with Next.js, Tailwind CSS, TypeScript, and Framer Motion. It embodies the "Kinetic Elegance" design philosophy and "Crystal Cathedral" architectural principles.

## Project Vision

The portfolio aims to be an interactive art installation, offering a charismatic, elegant, and unforgettable user experience. The entire experience is contained on a single, seamless page, with unique, fluid animations creating an "unfolding narrative" as the user navigates through sections.

## Core Features

-   **Kinetic Hero**: A dynamic "Living Ink Sculpture" typography effect in the hero section that subtly reacts to the user's cursor.
-   **Animated Sections**: Fluid section transitions using Framer Motion, creating an unfolding narrative effect.
-   **Skill Graph**: An interactive skill showcase where hovering over a core skill reveals related sub-skills.
-   **Project Gallery**: A card-based gallery for project showcases, with detailed modals.
-   **Interactive Form**: A contact form with subtle micro-interactions and social media links.
-   **Modern Architecture**: Adherence to DRY principles and a barrel-style folder structure for clarity and maintainability.

## Technical Stack

-   **Framework**: Next.js (App Router)
-   **Styling**: Tailwind CSS
-   **Language**: TypeScript
-   **Animation**: Framer Motion

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
    or
    ```bash
    yarn dev
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
├── app/                 // Next.js App Router core files
│   ├── layout.tsx
│   └── page.tsx         // The main one-page container
├── components/
│   ├── primitives/      // Base HTML element wrappers (Box, Flex, Text)
│   ├── icons/           // SVG icons as components
│   ├── layout/          // Structural components (SectionWrapper)
│   └── sections/        // Main content sections (Hero, About, Skills, etc.)
├── hooks/               // Custom React hooks (e.g., useToast, useIsMobile)
├── styles/              // Global styles (globals.css) - This is app/globals.css in Next.js 13+
└── lib/                 // Utility functions (utils.ts)
```
(Note: `styles/globals.css` is located at `src/app/globals.css` in modern Next.js App Router projects.)

Each folder containing multiple modules utilizes an `index.ts` file for barrel exports (where applicable), allowing for cleaner imports.

## Customization

-   **Content**: Update text, project details, and skill information directly in the respective components within `src/components/sections/`.
-   **Styling**: Modify Tailwind CSS classes in components or update the theme variables in `src/app/globals.css`.
-   **Images/Placeholders**: Replace placeholder images (`https://placehold.co/...`) with actual project visuals. Look for `data-ai-hint` attributes for guidance on image content.
-   **Social Links**: Update URLs in `src/components/sections/Contact.tsx`.

Enjoy your new portfolio!

