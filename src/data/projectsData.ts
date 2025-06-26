/**
 * @fileOverview
 * This file contains the static data for the "Featured Projects" section.
 * Separating data from the component logic (Separation of Concerns) makes the
 * project easier to maintain and update. To change project information, you
 * only need to edit this file.
 */

/**
 * Represents a media item (image or video) in a project's gallery.
 */
export interface MediaItem {
  /** The type of media, used to determine the correct HTML tag. */
  type: 'image' | 'video';
  /** The URL of the media asset. */
  url: string;
  /** Optional hint for AI tools or image generation services. */
  dataAiHint?: string;
}

/**
 * Represents a single project to be displayed in the portfolio.
 * This is the canonical data structure for a project.
 */
export interface Project {
  /** A unique identifier for the project, used for React keys. */
  id: string;
  /** The title of the project. */
  title: string;
  /** A short, one-sentence description for the project card. */
  description: string;
  /** A more detailed description for the project's detail view. */
  longDescription?: string;
  /** The URL for the main image shown on the project card. */
  coverImageUrl: string;
  /** Optional hint for the cover image. */
  coverDataAiHint?: string;
  /** An array of images and videos for the detail view carousel. */
  mediaGallery: MediaItem[];
  /** An array of technologies used in the project. */
  techStack: string[];
  /** Optional URL to the live, deployed project. */
  liveSiteUrl?: string;
  /** Optional URL to the project's source code repository. */
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
    coverImageUrl: 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=1200&auto=format&fit=crop',
    coverDataAiHint: 'ecommerce website',
    mediaGallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1481437156560-3205f6a85705?q=80&w=1280&auto=format&fit=crop', dataAiHint: 'product grid' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1280&auto=format&fit=crop', dataAiHint: 'checkout page' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1280&auto=format&fit=crop', dataAiHint: 'user dashboard' },
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
    coverImageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    coverDataAiHint: 'data dashboard',
    mediaGallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1280&auto=format&fit=crop', dataAiHint: 'main chart' },
      { type: 'video', url: 'https://videos.pexels.com/video-files/3254013/3254013-hd.mp4', dataAiHint: 'map visualization' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1280&auto=format&fit=crop', dataAiHint: 'report export' },
    ],
    techStack: ['React', 'TypeScript', 'D3.js', 'Framer Motion', 'Python (Flask)'],
    liveSiteUrl: '#',
  },
  {
    id: 'project-3',
    title: 'AI-Powered Content Generator',
    description: 'A web application that uses AI to generate creative content.',
    longDescription: 'This project leverages cutting-edge AI models to assist users in generating various forms of content, such as articles, social media posts, and scripts. The interface is designed to be intuitive and user-friendly, promoting a seamless creative workflow. Tech stack includes SvelteKit, Tailwind CSS, and Python with FastAPI for the AI backend.',
    coverImageUrl: 'https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?q=80&w=1200&auto=format&fit=crop',
    coverDataAiHint: 'ai application',
    mediaGallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1280&auto=format&fit=crop', dataAiHint: 'generator ui' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1515523542283-36427b01a1e1?q=80&w=1280&auto=format&fit=crop', dataAiHint: 'abstract brain' },
    ],
    techStack: ['SvelteKit', 'TypeScript', 'Tailwind CSS', 'Python', 'FastAPI', 'Genkit'],
    githubUrl: '#',
  },
];
