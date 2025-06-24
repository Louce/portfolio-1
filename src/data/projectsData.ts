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
