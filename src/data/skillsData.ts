/**
 * @fileOverview
 * This file contains the static data for the "My Expertise" (Skills) section.
 * It defines the structure for core skills and their related sub-skills.
 * As part of the "Content Layer," this file separates the skills data from
 * the UI components that render it, adhering to the Separation of Concerns
 * principle and making content updates simple and safe.
 */

import React from 'react';
import { CodeIcon as Code, Bot, Gamepad2, Palette, Database, Cog } from 'lucide-react';

/**
 * Represents a core skill category.
 */
export interface Skill {
  /** A unique identifier for the skill category. */
  id: string;
  /** The name of the skill category (e.g., "Python"). */
  name: string;
  /** A Lucide React icon component to visually represent the skill. */
  icon: React.ElementType;
  /** A short description of the skill category. */
  description: string;
}

/**
 * Represents a specific technology or sub-skill related to a core skill.
 */
export interface SubSkill {
  /** A unique identifier for the sub-skill. */
  id: string;
  /** The name of the technology (e.g., "React", "Docker"). */
  name: string;
  /** The ID of the core skill this sub-skill belongs to. */
  coreSkillId: string;
}

/**
 * The definitive array of core skills data.
 * This array is mapped to create the main "Skill Cards" in the UI.
 */
export const coreSkillsData: Skill[] = [
  { id: 'python', name: 'Python', icon: Code, description: "Versatile programming for scripting, automation, and backend logic." },
  { id: 'automation', name: 'Automation', icon: Bot, description: "Designing and implementing automated solutions to streamline processes." },
  { id: 'gamedev', name: 'Game Development', icon: Gamepad2, description: "Bringing interactive experiences to life with game mechanics and design." },
  { id: 'design', name: 'Design & UI/UX', icon: Palette, description: "Applying UI/UX principles to create intuitive and engaging interfaces." },
  { id: 'backend', name: 'Backend & APIs', icon: Database, description: 'Building robust server-side logic and data management systems.' },
  { id: 'devops', name: 'DevOps & Tools', icon: Cog, description: 'Utilizing tools for efficient development, deployment, and version control.' },
];

/**
 * The definitive array of sub-skills and technologies data.
 * Each item is related to a core skill via `coreSkillId`.
 */
export const subSkillsData: SubSkill[] = [
  // Python
  { id: 'scripting', name: 'Scripting', coreSkillId: 'python' },
  { id: 'data-analysis-py', name: 'Data Analysis', coreSkillId: 'python' },
  { id: 'pygame', name: 'Pygame', coreSkillId: 'python' },
  
  // Automation
  { id: 'rpa-concepts', name: 'RPA Concepts', coreSkillId: 'automation' },
  { id: 'web-automation-py', name: 'Web Automation', coreSkillId: 'automation' },
  { id: 'task-scheduling', name: 'Task Scheduling', coreSkillId: 'automation' },
  
  // Game Dev
  { id: 'unity-csharp', name: 'Unity & C#', coreSkillId: 'gamedev' },
  { id: 'unreal-blueprints', name: 'Unreal & Blueprints', coreSkillId: 'gamedev' },
  { id: 'game-logic-design', name: 'Game Logic Design', coreSkillId: 'gamedev' },
  
  // Design
  { id: 'ui-design-tools', name: 'Figma & Adobe XD', coreSkillId: 'design' },
  { id: 'ux-fundamentals', name: 'UX Fundamentals', coreSkillId: 'design' },
  { id: 'prototyping', name: 'Interactive Prototyping', coreSkillId: 'design' },
  
  // Backend
  { id: 'api-dev-python', name: 'API Development (Flask/FastAPI)', coreSkillId: 'backend' },
  { id: 'django-flask', name: 'Django/Flask', coreSkillId: 'backend' },
  { id: 'restful-apis', name: 'RESTful Principles', coreSkillId: 'backend' },
  
  // DevOps
  { id: 'git-github', name: 'Git & GitHub', coreSkillId: 'devops' },
  { id: 'docker', name: 'Docker', coreSkillId: 'devops' },
  { id: 'ci-cd-pipelines', name: 'CI/CD Pipelines', coreSkillId: 'devops' },
];
