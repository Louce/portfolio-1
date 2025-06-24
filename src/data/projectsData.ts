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
    coverImageUrl: 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80',
    coverDataAiHint: 'ecommerce website',
    mediaGallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&h=720&q=80', dataAiHint: 'product grid' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1599544158439-952a123389ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&h=720&q=80', dataAiHint: 'checkout page' },
      { type: 'image', url: 'https://images.unsplash.com/photo-155128804ankind-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&h=720&q=80', dataAiHint: 'user dashboard' },
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
    coverImageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80',
    coverDataAiHint: 'data dashboard',
    mediaGallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1611079838318-58d9657aff8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&h=720&q=80', dataAiHint: 'main chart' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&h=720&q=80', dataAiHint: 'map visualization' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1280&h=720&q=80', dataAiHint: 'report export' },
    ],
    techStack: ['React', 'TypeScript', 'D3.js', 'Framer Motion', 'Python (Flask)'],
    liveSiteUrl: '#',
  },
  {
    id: 'project-3',
    title: 'AI-Powered Content Generator',
    description: 'A web application that uses AI to generate creative content.',
    longDescription: 'This project leverages cutting-edge AI models to assist users in generating various forms of content, such as articles, social media posts, and scripts. The interface is designed to be intuitive and user-friendly, promoting a seamless creative workflow. Tech stack includes SvelteKit, Tailwind CSS, and Python with FastAPI for the AI backend.',
    coverImageUrl: 'https://images.unsplash.com/photo-1555949963-ff980877a244?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80',
    coverDataAiHint: 'ai application',
    mediaGallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1587614203976-365c7d6297d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&h=720&q=80', dataAiHint: 'generator ui' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1535378620166-273708d44e4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&h=720&q=80', dataAiHint: 'abstract brain' },
    ],
    techStack: ['SvelteKit', 'TypeScript', 'Tailwind CSS', 'Python', 'FastAPI', 'Genkit'],
    githubUrl: '#',
  },
];
