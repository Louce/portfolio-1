'use client';

import React, { useState } from 'react';
import { SectionWrapper } from '@/components/layout';
import { Box } from '@/components/primitives';
import { SectionTitle } from '@/components/common';
import { projectsData, type Project } from '@/data/projectsData';
import { ProjectCard, ProjectDetailSheet } from './components';

/**
 * The "Featured Projects" section of the portfolio.
 * It displays a grid of `ProjectCard` components. Clicking a card opens a
 * `ProjectDetailSheet` with more detailed information. This component acts as a
 * "container" or "controller" component, managing the state for which project
is currently selected and displayed in the sheet.
 *
 * @returns {React.ReactElement} The Projects section component.
 */
export const Projects: React.FC = React.memo(() => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  /**
   * Handles opening the detail sheet for a specific project.
   * @param {Project} project - The project to display.
   */
  const handleOpenSheet = (project: Project) => {
    setSelectedProject(project);
  };
  
  /**
   * Handles the open/close state change of the sheet.
   * When the sheet is closed, the selected project state is cleared.
   * @param {boolean} isOpen - The new open state of the sheet.
   */
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
