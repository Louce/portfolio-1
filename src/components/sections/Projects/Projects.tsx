
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { SectionWrapper } from '@/components/layout';
import { Flex, Text, Box } from '@/components/primitives';
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, Badge } from '@/components/ui'; // Updated import
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  imageUrl: string;
  dataAiHint?: string;
  videoUrl?: string; 
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
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'ecommerce website',
    videoUrl: 'https://placehold.co/1280x720.mp4/000000/ffffff?text=Project+Video',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Stripe'],
    liveSiteUrl: '#',
    githubUrl: '#',
  },
  {
    id: 'project-2',
    title: 'Interactive Data Dashboard',
    description: 'A real-time data visualization dashboard for business analytics.',
    longDescription: 'Created an interactive dashboard that allows users to explore complex datasets through dynamic charts and graphs. Features include customizable widgets, data filtering, and report generation. Built with React, D3.js, and Framer Motion for smooth animations.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'data dashboard',
    techStack: ['React', 'TypeScript', 'D3.js', 'Framer Motion', 'Python (Flask)'],
    liveSiteUrl: '#',
  },
  {
    id: 'project-3',
    title: 'AI-Powered Content Generator',
    description: 'A web application that uses AI to generate creative content.',
    longDescription: 'This project leverages cutting-edge AI models to assist users in generating various forms of content, such as articles, social media posts, and scripts. The interface is designed to be intuitive and user-friendly, promoting a seamless creative workflow. Tech stack includes SvelteKit, Tailwind CSS, and Python with FastAPI for the AI backend.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'ai application',
    videoUrl: 'https://placehold.co/1280x720.mp4/111111/eeeeee?text=AI+Project',
    techStack: ['SvelteKit', 'TypeScript', 'Tailwind CSS', 'Python', 'FastAPI', 'OpenAI API'],
    githubUrl: '#',
  },
];

const ProjectCard: React.FC<{ project: Project; onOpenModal: (project: Project) => void }> = ({ project, onOpenModal }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full group"
    >
      <Card className="h-full flex flex-col overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 ease-out hover:-translate-y-1 bg-card">
        <CardHeader className="p-0">
          <Box className="relative w-full aspect-[16/9] overflow-hidden">
            <Image
              src={project.imageUrl}
              alt={project.title}
              data-ai-hint={project.dataAiHint}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 group-hover:scale-105"
            />
          </Box>
        </CardHeader>
        <CardContent className="flex-grow p-4 md:p-6 space-y-3">
          <CardTitle className="font-headline text-xl md:text-2xl text-primary">{project.title}</CardTitle>
          <CardDescription className="font-body text-foreground/80 text-sm md:text-base">{project.description}</CardDescription>
          <Flex wrap="wrap" gap="0.5rem" className="pt-2">
            {project.techStack.slice(0, 4).map(tech => (
              <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
            ))}
            {project.techStack.length > 4 && <Badge variant="outline" className="text-xs">+{project.techStack.length - 4} more</Badge>}
          </Flex>
        </CardContent>
        <CardFooter className="p-4 md:p-6 border-t">
          <Button onClick={() => onOpenModal(project)} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" aria-label={`View details for ${project.title}`}>
            View Details
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export const Projects: React.FC = React.memo(() => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <SectionWrapper id="projects" className="bg-background">
      <Flex direction="col" align="center" justify="start" className="h-full w-full space-y-10 md:space-y-16 pt-16 md:pt-24">
        <Text as="h2" variant="default" className="font-headline text-4xl md:text-5xl font-bold text-primary text-center">
          Featured Projects
        </Text>
        
        <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
          {projectsData.map(project => (
            <ProjectCard key={project.id} project={project} onOpenModal={setSelectedProject} />
          ))}
        </Box>

        <AnimatePresence>
          {selectedProject && (
            <Dialog open={!!selectedProject} onOpenChange={(isOpen) => !isOpen && setSelectedProject(null)}>
              <DialogContent className="max-w-3xl w-[90vw] p-0 bg-card shadow-2xl rounded-lg overflow-hidden">
                <DialogHeader className="p-0">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
                  >
                    {selectedProject.videoUrl ? (
                        <Box className="relative w-full aspect-video bg-black">
                        <video src={selectedProject.videoUrl} loop autoPlay muted playsInline className="w-full h-full object-cover">
                          Your browser does not support the video tag.
                        </video>
                        </Box>
                    ) : (
                      <Box className="relative w-full aspect-video">
                        <Image
                          src={selectedProject.imageUrl}
                          alt={selectedProject.title}
                          data-ai-hint={selectedProject.dataAiHint}
                          layout="fill"
                          objectFit="cover"
                        />
                      </Box>
                    )}
                  </motion.div>
                </DialogHeader>
                <Box className="p-6 md:p-8 space-y-4">
                  <DialogTitle className="font-headline text-3xl md:text-4xl text-primary">{selectedProject.title}</DialogTitle>
                  <DialogDescription className="font-body text-base md:text-lg text-foreground/90">
                    {selectedProject.longDescription || selectedProject.description}
                  </DialogDescription>
                  <Flex wrap="wrap" gap="0.5rem" className="py-2">
                    {selectedProject.techStack.map(tech => (
                      <Badge key={tech} variant="outline" className="text-sm border-primary text-primary">{tech}</Badge>
                    ))}
                  </Flex>
                  <Flex gap="1rem" className="pt-4">
                    {selectedProject.liveSiteUrl && (
                      <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                        <a href={selectedProject.liveSiteUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" /> Live Site
                        </a>
                      </Button>
                    )}
                    {selectedProject.githubUrl && (
                      <Button asChild variant="outline" className="border-foreground/50 text-foreground/80 hover:bg-foreground/10">
                        <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" /> GitHub
                        </a>
                      </Button>
                    )}
                  </Flex>
                </Box>
              </DialogContent>
            </Dialog>
          )}
        </AnimatePresence>
      </Flex>
    </SectionWrapper>
  );
});

Projects.displayName = 'ProjectsSection';
