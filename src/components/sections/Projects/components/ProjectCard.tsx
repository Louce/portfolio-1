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

interface ProjectCardProps {
  project: Project;
  onOpenSheet: (project: Project) => void;
}

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
