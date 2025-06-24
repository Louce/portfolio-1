
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from '@/components/layout';
import { Flex, Text, Box } from '@/components/primitives';
import { SectionTitle } from '@/components/common';
import { Tabs, TabsContent, TabsList, TabsTrigger, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui';
import { CodeIcon as Code, Bot, Gamepad2, Palette, Database, Cpu, Cog } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
}

interface SubSkill {
  id: string;
  name: string;
  description: string;
  coreSkillId: string;
}

const coreSkillsData: Skill[] = [
  { id: 'python', name: 'Python', icon: Code, description: "Versatile programming for scripting, automation, and backend logic." },
  { id: 'automation', name: 'Automation', icon: Bot, description: "Designing and implementing automated solutions to streamline processes." },
  { id: 'gamedev', name: 'Game Development', icon: Gamepad2, description: "Bringing interactive experiences to life with game mechanics and design." },
  { id: 'design', name: 'Design & UI/UX', icon: Palette, description: "Applying UI/UX principles to create intuitive and engaging interfaces." },
  { id: 'backend', name: 'Backend & APIs', icon: Database, description: 'Building robust server-side logic and data management systems.' },
  { id: 'devops', name: 'DevOps & Tools', icon: Cog, description: 'Utilizing tools for efficient development, deployment, and version control.' },
];

const subSkillsData: SubSkill[] = [
  // Python
  { id: 'scripting', name: 'Scripting', coreSkillId: 'python', description: 'Automating system tasks and workflows with Python scripts.' },
  { id: 'data-analysis-py', name: 'Data Analysis', coreSkillId: 'python', description: 'Using libraries like Pandas and NumPy for data manipulation.' },
  { id: 'pygame', name: 'Pygame', coreSkillId: 'python', description: 'Creating simple 2D games and prototypes using the Pygame library.' },
  
  // Automation
  { id: 'rpa-concepts', name: 'RPA Concepts', coreSkillId: 'automation', description: 'Understanding principles of Robotic Process Automation.' },
  { id: 'web-automation-py', name: 'Web Automation', coreSkillId: 'automation', description: 'Controlling browsers with Selenium or Playwright.' },
  { id: 'task-scheduling', name: 'Task Scheduling', coreSkillId: 'automation', description: 'Using Cron, Airflow, or other schedulers for automated jobs.' },
  
  // Game Dev
  { id: 'unity-csharp', name: 'Unity & C#', coreSkillId: 'gamedev', description: 'Developing 2D/3D games and experiences in the Unity engine.' },
  { id: 'unreal-blueprints', name: 'Unreal & Blueprints', coreSkillId: 'gamedev', description: 'Visual scripting in Unreal Engine for rapid prototyping.' },
  { id: 'game-logic-design', name: 'Game Logic Design', coreSkillId: 'gamedev', description: 'Architecting core game mechanics, state, and rules.' },
  
  // Design
  { id: 'ui-design-tools', name: 'UI Design Tools', coreSkillId: 'design', description: 'Creating high-fidelity mockups in Figma or Adobe XD.' },
  { id: 'ux-fundamentals', name: 'UX Fundamentals', coreSkillId: 'design', description: 'Applying user research and usability principles to designs.' },
  { id: 'prototyping', name: 'Prototyping', coreSkillId: 'design', description: 'Building interactive prototypes to test user flows.' },
  
  // Backend
  { id: 'api-dev-python', name: 'API Development', coreSkillId: 'backend', description: 'Building RESTful APIs with Flask or FastAPI.' },
  { id: 'django-flask', name: 'Django/Flask', coreSkillId: 'backend', description: 'Full-stack web development with major Python frameworks.' },
  { id: 'restful-apis', name: 'RESTful Principles', coreSkillId: 'backend', description: 'Deep understanding of REST API design and HTTP protocols.' },
  
  // DevOps
  { id: 'git-github', name: 'Git & GitHub', coreSkillId: 'devops', description: 'Expert-level version control and collaboration workflows.' },
  { id: 'docker', name: 'Docker', coreSkillId: 'devops', description: 'Containerizing applications for consistent deployment.' },
  { id: 'ci-cd-pipelines', name: 'CI/CD Pipelines', coreSkillId: 'devops', description: 'Automating build, test, and deploy cycles with GitHub Actions.' },
];

const skillCategories = [
  { id: 'competencies', name: 'Core Competencies', skills: ['python', 'automation', 'gamedev', 'design'] },
  { id: 'technologies', name: 'Backend & DevOps', skills: ['backend', 'devops'] },
];

const SkillCard: React.FC<{ skill: Skill; subSkills: SubSkill[] }> = ({ skill, subSkills }) => {
  const Icon = skill.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="p-4 md:p-6 rounded-xl shadow-lg bg-card/70 backdrop-blur-sm border border-border/20 flex flex-col items-center text-center"
    >
      <Icon className="w-10 h-10 md:w-12 md:h-12 mb-3 text-primary" />
      <Text as="h3" className="font-headline text-lg font-semibold text-foreground">
        {skill.name}
      </Text>
      <Text as="p" className="text-sm mt-2 text-muted-foreground flex-grow">
        {skill.description}
      </Text>
      <Flex wrap="wrap" justify="center" gap="0.5rem" className="mt-4">
        {subSkills.map((sub, index) => (
          <Tooltip key={sub.id}>
            <TooltipTrigger asChild>
               <motion.span
                className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-xs md:text-sm shadow-sm cursor-default"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, type: "spring", stiffness: 260, damping: 18 }} 
              >
                {sub.name}
              </motion.span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{sub.description}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </Flex>
    </motion.div>
  );
};
SkillCard.displayName = 'SkillCard';

export const Skills: React.FC = React.memo(() => {
  return (
    <SectionWrapper id="skills" className="bg-transparent">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      <div className="relative z-10 w-full flex flex-col items-center">
        <SectionTitle>My Expertise</SectionTitle>
        <motion.div
          className="w-full max-w-5xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <Tabs defaultValue="competencies" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
              {skillCategories.map(category => (
                <TabsTrigger key={category.id} value={category.id}>{category.name}</TabsTrigger>
              ))}
            </TabsList>
            
            {skillCategories.map(category => (
              <TabsContent key={category.id} value={category.id}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
                  >
                    {category.skills.map(skillId => {
                      const coreSkill = coreSkillsData.find(s => s.id === skillId);
                      if (!coreSkill) return null;
                      const relatedSubSkills = subSkillsData.filter(s => s.coreSkillId === skillId);
                      return <SkillCard key={skillId} skill={coreSkill} subSkills={relatedSubSkills} />;
                    })}
                  </motion.div>
                </AnimatePresence>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </SectionWrapper>
  );
});

Skills.displayName = 'SkillsSection';
