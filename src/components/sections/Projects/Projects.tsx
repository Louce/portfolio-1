
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { SectionWrapper } from '@/components/layout';
import { Flex, Text, Box } from '@/components/primitives';
import { SectionTitle } from '@/components/common'; // Updated import
import {
  Button,
  Dialog, DialogContent, DialogHeader, DialogTitle as ShadDialogTitle, DialogDescription as ShadDialogDescription,
  Badge,
  Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext,
  CardContainer, CardBody, CardItem // These should come from the new 3d-card path
} from '@/components/ui'; // CardContainer etc. will be updated if they are moved
import { ExternalLink, Github, PlayIcon, PauseIcon, X as CloseIcon } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';
import type { CarouselApi } from '@/components/ui/Carousel/carousel';
import * as DialogPrimitive from "@radix-ui/react-dialog";

interface MediaItem {
  type: 'image' | 'video';
  url: string;
  dataAiHint?: string;
}

interface Project {
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

const projectsData: Project[] = [
  {
    id: 'project-1',
    title: 'E-commerce Platform X',
    description: 'A modern, responsive e-commerce platform with advanced features.',
    longDescription: 'Developed a full-stack e-commerce solution focusing on user experience, performance, and scalability. Integrated payment gateways, order management, and a recommendation engine. The frontend was built with Next.js and Tailwind CSS, while the backend used Node.js and PostgreSQL.',
    coverImageUrl: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80',
    coverDataAiHint: 'ecommerce website',
    mediaGallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&h=720&q=80', dataAiHint: 'product page' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1580974928064-70ae0508d7b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&h=720&q=80', dataAiHint: 'shopping cart' },
      { type: 'video', url: 'https://placehold.co/1280x720.mp4/000000/ffffff?text=Project+Demo' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&h=720&q=80', dataAiHint: 'user dashboard' },
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
    coverImageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80',
    coverDataAiHint: 'data dashboard',
    mediaGallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1518186213641-aad543590a65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&h=720&q=80', dataAiHint: 'main chart' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1611079838318-58d9657aff8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&h=720&q=80', dataAiHint: 'filter options' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&h=720&q=80', dataAiHint: 'report export' },
    ],
    techStack: ['React', 'TypeScript', 'D3.js', 'Framer Motion', 'Python (Flask)'],
    liveSiteUrl: '#',
  },
  {
    id: 'project-3',
    title: 'AI-Powered Content Generator',
    description: 'A web application that uses AI to generate creative content.',
    longDescription: 'This project leverages cutting-edge AI models to assist users in generating various forms of content, such as articles, social media posts, and scripts. The interface is designed to be intuitive and user-friendly, promoting a seamless creative workflow. Tech stack includes SvelteKit, Tailwind CSS, and Python with FastAPI for the AI backend.',
    coverImageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80',
    coverDataAiHint: 'ai application',
    mediaGallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1573495627363-71cc912f1b2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&h=720&q=80', dataAiHint: 'generator ui' },
      { type: 'video', url: 'https://placehold.co/1280x720.mp4/111111/eeeeee?text=AI+Project+Walkthrough' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1587613990078-5a1737253f8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&h=720&q=80', dataAiHint: 'generated text' },
    ],
    techStack: ['SvelteKit', 'TypeScript', 'Tailwind CSS', 'Python', 'FastAPI', 'OpenAI API'],
    githubUrl: '#',
  },
];

const ProjectCard: React.FC<{ project: Project; onOpenModal: (project: Project) => void }> = React.memo(({ project, onOpenModal }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
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
            <Button onClick={() => onOpenModal(project)} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg" aria-label={`View details for ${project.title}`}>
              View Details
            </Button>
          </CardItem>
        </CardBody>
      </CardContainer>
    </motion.div>
  );
});
ProjectCard.displayName = 'ProjectCard';


export const Projects: React.FC = React.memo(() => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | undefined>();
  const [isPlaying, setIsPlaying] = useState(true);

  const autoplayPlugin = useRef(
    Autoplay({
      delay: 3500, 
      stopOnInteraction: true, 
      stopOnMouseEnter: true, 
    })
  );

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    if (isPlaying && selectedProject) { 
      autoplayPlugin.current.play();
    } else {
      autoplayPlugin.current.stop();
    }
  }, [carouselApi, isPlaying, selectedProject]);

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  useEffect(() => {
    if (selectedProject) {
      setIsPlaying(true); 
    } else {
      setIsPlaying(false); 
    }
  }, [selectedProject]);


  return (
    <SectionWrapper id="projects" className="bg-transparent">
      <SectionTitle>Featured Projects</SectionTitle>
      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
        {projectsData.map(project => (
          <ProjectCard key={project.id} project={project} onOpenModal={setSelectedProject} />
        ))}
      </Box>

      <AnimatePresence>
        {selectedProject && (
          <Dialog open={!!selectedProject} onOpenChange={(isOpen) => {
              if (!isOpen) {
                setSelectedProject(null);
              }
            }}
          >
            <DialogContent className="max-w-3xl w-[95vw] md:w-full p-0 bg-card/80 backdrop-blur-lg border border-border/30 rounded-xl shadow-2xl overflow-y-auto max-h-[90vh]">
              <DialogHeader className="p-4 md:p-6 border-b border-border/20 sticky top-0 bg-card/80 backdrop-blur-lg z-10">
                <ShadDialogTitle className="text-2xl md:text-3xl font-headline text-primary">{selectedProject.title}</ShadDialogTitle>
                <ShadDialogDescription className="sr-only">
                  Detailed view of the {selectedProject.title} project, including media gallery, full description, technology stack, and relevant links.
                </ShadDialogDescription>
                 <DialogPrimitive.Close className="absolute right-4 top-1/2 -translate-y-1/2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                    <CloseIcon className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                </DialogPrimitive.Close>
              </DialogHeader>
              
              <Box className="space-y-4 p-4 md:p-6">
                {selectedProject.mediaGallery && selectedProject.mediaGallery.length > 0 ? (
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
                      {selectedProject.mediaGallery.map((media, index) => (
                        <CarouselItem key={index}>
                          <Box className="relative w-full aspect-video bg-black/50">
                            {media.type === 'image' && (
                              <Image
                                src={media.url}
                                alt={`${selectedProject.title} - Media ${index + 1}`}
                                data-ai-hint={media.dataAiHint || selectedProject.title.toLowerCase().split(' ').slice(0,2).join(' ')}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 90vw, (max-width: 1280px) 70vw, 60vw"
                              />
                            )}
                            {media.type === 'video' && (
                              <video src={media.url} controls autoPlay muted playsInline loop className="w-full h-full object-contain">
                                Your browser does not support the video tag.
                              </video>
                            )}
                          </Box>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    {selectedProject.mediaGallery.length > 1 && (
                      <>
                        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 text-white bg-black/30 hover:bg-black/50 border-none" />
                        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 text-white bg-black/30 hover:bg-black/50 border-none" />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={togglePlay}
                          className="absolute bottom-2 right-2 z-10 text-white bg-black/30 hover:bg-black/50 border-none p-2 rounded-full"
                          aria-label={isPlaying ? "Pause carousel autoplay" : "Play carousel autoplay"}
                        >
                          {isPlaying ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
                        </Button>
                      </>
                    )}
                  </Carousel>
                ) : (
                   <Box className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden">
                     <Text className="absolute inset-0 flex items-center justify-center text-muted-foreground">No media available</Text>
                   </Box>
                )}

                <Text as="p" className="font-body text-sm md:text-base text-foreground/90">
                  {selectedProject.longDescription || selectedProject.description}
                </Text>

                <Box>
                  <Text as="h4" className="font-semibold text-foreground/70 mb-2 text-sm">Tech Stack:</Text>
                  <Flex wrap="wrap" gap="0.5rem">
                    {selectedProject.techStack.map(tech => (
                      <Badge key={tech} variant="outline" className="text-xs md:text-sm border-primary/50 text-primary/90">{tech}</Badge>
                    ))}
                  </Flex>
                </Box>

                <Flex gap="1rem" className="pt-2">
                  {selectedProject.liveSiteUrl && (
                    <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground rounded-lg text-xs md:text-sm">
                      <a href={selectedProject.liveSiteUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-1.5 h-3.5 w-3.5 md:mr-2 md:h-4 md:w-4" /> Live Site
                      </a>
                    </Button>
                  )}
                  {selectedProject.githubUrl && (
                    <Button asChild variant="outline" className="border-foreground/50 text-foreground/80 hover:bg-foreground/10 hover:text-foreground rounded-lg text-xs md:text-sm">
                      <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-1.5 h-3.5 w-3.5 md:mr-2 md:h-4 md:w-4" /> GitHub
                      </a>
                    </Button>
                  )}
                </Flex>
              </Box>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
});

Projects.displayName = 'ProjectsSection';
