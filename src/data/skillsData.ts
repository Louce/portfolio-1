
/**
 * @fileOverview
 * This file contains the static data for the "My Expertise" (Skills) section.
 * It defines the structure for core skills and sub-skills, and categorizes them
 * for the tabbed display in the UI.
 */

import React from 'react';
import { CodeIcon as Code, Bot, Gamepad2, Palette, Database, Cog } from 'lucide-react';

/**
 * Represents a core skill category.
 * @property {string} id - A unique identifier for the skill.
 * @property {string} name - The display name of the skill.
 * @property {React.ElementType} icon - The Lucide icon component to display for the skill.
 * @property {string} description - A brief description of the skill.
 */
export interface Skill {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
}

/**
 * Represents a specific technology or sub-skill related to a core skill.
 * @property {string} id - A unique identifier for the sub-skill.
 * @property {string} name - The name of the technology/sub-skill.
 * @property {string} description - A more detailed description shown in a tooltip.
 * @property {string} coreSkillId - The ID of the parent core skill it belongs to.
 * @property {number} proficiency - A self-assessed proficiency level from 0 to 100.
 */
export interface SubSkill {
  id: string;
  name: string;
  description: string;
  coreSkillId: string;
  proficiency: number;
}

/**
 * The definitive array of core skills data.
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
 */
export const subSkillsData: SubSkill[] = [
  // Python
  { id: 'scripting', name: 'Scripting', coreSkillId: 'python', proficiency: 90, description: 'Automating system tasks and workflows with Python scripts.' },
  { id: 'data-analysis-py', name: 'Data Analysis', coreSkillId: 'python', proficiency: 75, description: 'Using libraries like Pandas and NumPy for data manipulation.' },
  { id: 'pygame', name: 'Pygame', coreSkillId: 'python', proficiency: 80, description: 'Creating simple 2D games and prototypes using the Pygame library.' },
  
  // Automation
  { id: 'rpa-concepts', name: 'RPA Concepts', coreSkillId: 'automation', proficiency: 85, description: 'Understanding principles of Robotic Process Automation.' },
  { id: 'web-automation-py', name: 'Web Automation', coreSkillId: 'automation', proficiency: 90, description: 'Controlling browsers with Selenium or Playwright.' },
  { id: 'task-scheduling', name: 'Task Scheduling', coreSkillId: 'automation', proficiency: 70, description: 'Using Cron, Airflow, or other schedulers for automated jobs.' },
  
  // Game Dev
  { id: 'unity-csharp', name: 'Unity & C#', coreSkillId: 'gamedev', proficiency: 80, description: 'Developing 2D/3D games and experiences in the Unity engine.' },
  { id: 'unreal-blueprints', name: 'Unreal & Blueprints', coreSkillId: 'gamedev', proficiency: 65, description: 'Visual scripting in Unreal Engine for rapid prototyping.' },
  { id: 'game-logic-design', name: 'Game Logic Design', coreSkillId: 'gamedev', proficiency: 85, description: 'Architecting core game mechanics, state, and rules.' },
  
  // Design
  { id: 'ui-design-tools', name: 'UI Design Tools', coreSkillId: 'design', proficiency: 90, description: 'Creating high-fidelity mockups in Figma or Adobe XD.' },
  { id: 'ux-fundamentals', name: 'UX Fundamentals', coreSkillId: 'design', proficiency: 75, description: 'Applying user research and usability principles to designs.' },
  { id: 'prototyping', name: 'Prototyping', coreSkillId: 'design', proficiency: 80, description: 'Building interactive prototypes to test user flows.' },
  
  // Backend
  { id: 'api-dev-python', name: 'API Development', coreSkillId: 'backend', proficiency: 85, description: 'Building RESTful APIs with Flask or FastAPI.' },
  { id: 'django-flask', name: 'Django/Flask', coreSkillId: 'backend', proficiency: 75, description: 'Full-stack web development with major Python frameworks.' },
  { id: 'restful-apis', name: 'RESTful Principles', coreSkillId: 'backend', proficiency: 90, description: 'Deep understanding of REST API design and HTTP protocols.' },
  
  // DevOps
  { id: 'git-github', name: 'Git & GitHub', coreSkillId: 'devops', proficiency: 95, description: 'Expert-level version control and collaboration workflows.' },
  { id: 'docker', name: 'Docker', coreSkillId: 'devops', proficiency: 80, description: 'Containerizing applications for consistent deployment.' },
  { id: 'ci-cd-pipelines', name: 'CI/CD Pipelines', coreSkillId: 'devops', proficiency: 70, description: 'Automating build, test, and deploy cycles with GitHub Actions.' },
];

/**
 * Defines the categories for the tabs in the Skills section UI.
 * Each category maps to a set of core skill IDs.
 */
export const skillCategories = [
  { id: 'competencies', name: 'Core Competencies', skills: ['python', 'automation', 'gamedev', 'design'] },
  { id: 'technologies', name: 'Backend & DevOps', skills: ['backend', 'devops'] },
];
