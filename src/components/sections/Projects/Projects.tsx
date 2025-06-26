
'use client';

import React, { useState } from 'react';
import { SectionWrapper } from '@/components/layout';
import { Box } from '@/components/primitives';
import { SectionTitle } from '@/components/common';
import { projectsData, type Project } from '@/data/projectsData';
import { ProjectCard, ProjectDetailSheet } from './components';

/**
 * The Projects section of the portfolio.
 * It displays a grid of project cards. Clicking a card opens a detailed view
 * in a side sheet, which includes a media carousel and links.
 * This component manages the state for which project is selected.
 *
 * @returns {React.ReactElement} The Projects section component.
 */
export const Projects: React.FC = React.memo(() => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleOpenSheet = (project: Project) => {
    setSelectedProject(project);
  };
  
  const handleSheetOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedProject(null);
    }
  };

  return (
    <SectionWrapper id="projects" className="bg-card">
      <SectionTitle>Featured Projects</SectionTitle>
      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
        {projectsData.map(project => (
          <ProjectCard key={project.id} project={project} onOpenSheet={handleOpenSheet} />
        ))}
      </Box>

      <ProjectDetailSheet 
        project={selectedProject}
        isOpen={!!selectedProject}
        onOpenChange={handleSheetOpenChange}
      />
    </SectionWrapper>
  );
});

Projects.displayName = 'ProjectsSection';
