'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Button,
  Sheet, SheetContent, SheetHeader, SheetTitle as ShadSheetTitle, SheetDescription as ShadSheetDescription, SheetClose, SheetFooter,
  Badge,
  Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext,
  Tooltip, TooltipContent, TooltipTrigger
} from '@/components/ui';
import type { CarouselApi } from '@/components/ui/Carousel/carousel';
import { Box, Flex, Text } from '@/components/primitives';
import { ExternalLink, Github, PlayIcon, PauseIcon } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';
import type { Project } from '@/data/projectsData';

/**
 * Props for the ProjectDetailSheet component.
 */
interface ProjectDetailSheetProps {
  /** The project data to display in the sheet. Can be null if no project is selected. */
  project: Project | null;
  /** The open state of the sheet. */
  isOpen: boolean;
  /** Callback function to handle changes to the open state. */
  onOpenChange: (isOpen: boolean) => void;
}

/**
 * A side sheet component that displays detailed information about a selected project.
 * It includes a media carousel with autoplay functionality, project descriptions,
 * tech stack, and links to the live site or repository.
 *
 * @param {ProjectDetailSheetProps} props - The properties for the component.
 * @returns {React.ReactElement} A Sheet component containing the project details.
 */
export const ProjectDetailSheet: React.FC<ProjectDetailSheetProps> = ({ project, isOpen, onOpenChange }) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | undefined>();
  const [isPlaying, setIsPlaying] = useState(true);

  // Set up the autoplay plugin for the carousel.
  const autoplayPlugin = useRef(
    Autoplay({
      delay: 3500,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    })
  );

  // Effect to control the autoplay state based on user interaction or component state.
  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    if (isPlaying && project) {
      autoplayPlugin.current.play();
    } else {
      autoplayPlugin.current.stop();
    }
  }, [carouselApi, isPlaying, project]);

  // Toggles the play/pause state of the carousel autoplay.
  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  // Reset autoplay to playing whenever a new project is selected.
  useEffect(() => {
    if (project) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [project]);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      {project && (
        <SheetContent className="w-full sm:max-w-2xl p-0 bg-card/80 backdrop-blur-lg border-border/30 shadow-2xl flex flex-col">
          <SheetHeader className="p-4 md:p-6 border-b border-border/20 sticky top-0 bg-card/80 backdrop-blur-lg z-10 flex-shrink-0">
            <ShadSheetTitle className="text-2xl md:text-3xl font-headline text-primary">{project.title}</ShadSheetTitle>
            <ShadSheetDescription className="sr-only">
              Detailed view of the {project.title} project.
            </ShadSheetDescription>
          </SheetHeader>

          <Box className="flex-grow overflow-y-auto">
            <Box className="space-y-4 p-4 md:p-6 pb-24">
              {project.mediaGallery && project.mediaGallery.length > 0 ? (
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
                    {project.mediaGallery.map((media, index) => (
                      <CarouselItem key={index}>
                        <Box className="relative w-full aspect-video bg-black/50">
                          {media.type === 'image' && (
                            <Image
                              src={media.url}
                              alt={`${project.title} - Media ${index + 1}`}
                              data-ai-hint={media.dataAiHint || project.title.toLowerCase().split(' ').slice(0,2).join(' ')}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 90vw, 800px"
                            />
                          )}
                          {media.type === 'video' && (
                            <video src={media.url} controls autoPlay muted playsInline loop className="w-full h-full object-cover">
                              Your browser does not support the video tag.
                            </video>
                          )}
                        </Box>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {project.mediaGallery.length > 1 && (
                    <>
                      <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 text-white bg-black/30 hover:bg-black/50 border-none" />
                      <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 text-white bg-black/30 hover:bg-black/50 border-none" />
                      <Tooltip>
                        <TooltipTrigger asChild>
                           <Button
                            variant="ghost"
                            size="icon"
                            onClick={togglePlay}
                            className="absolute bottom-2 right-2 z-10 text-white bg-black/30 hover:bg-black/50 border-none p-2 rounded-full"
                            aria-label={isPlaying ? "Pause carousel autoplay" : "Play carousel autoplay"}
                           >
                            {isPlaying ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
                           </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{isPlaying ? 'Pause Autoplay' : 'Play Autoplay'}</p>
                        </TooltipContent>
                      </Tooltip>
                    </>
                  )}
                </Carousel>
              ) : (
                 <Box className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden">
                   <Text className="absolute inset-0 flex items-center justify-center text-muted-foreground">No media available</Text>
                 </Box>
              )}

              <Text as="p" className="font-body text-sm md:text-base text-foreground/90">
                {project.longDescription || project.description}
              </Text>

              <Box>
                <Text as="h4" className="font-semibold text-foreground/70 mb-2 text-sm">Tech Stack:</Text>
                <Flex wrap="wrap" gap="0.5rem">
                  {project.techStack.map(tech => (
                    <Badge key={tech} variant="outline" className="text-xs md:text-sm border-primary/50 text-primary/90">{tech}</Badge>
                  ))}
                </Flex>
              </Box>

              <Flex gap="1rem" className="pt-2">
                {project.liveSiteUrl && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground rounded-lg text-xs md:text-sm">
                        <a href={project.liveSiteUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-1.5 h-3.5 w-3.5 md:mr-2 md:h-4 md:w-4" /> Live Site
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View the live project</p>
                    </TooltipContent>
                  </Tooltip>
                )}
                {project.githubUrl && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button asChild variant="outline" className="border-foreground/50 text-foreground/80 hover:bg-foreground/10 hover:text-foreground rounded-lg text-xs md:text-sm">
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-1.5 h-3.5 w-3.5 md:mr-2 md:h-4 md:w-4" /> GitHub
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Explore the source code</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </Flex>
            </Box>
          </Box>
          <SheetFooter className="p-4 border-t border-border/20 sticky bottom-0 bg-card/90 backdrop-blur-lg z-10 flex-shrink-0">
            <SheetClose asChild>
              <Button type="button" variant="outline" className="w-full">
                Close
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      )}
    </Sheet>
  );
};
ProjectDetailSheet.displayName = "ProjectDetailSheet";
