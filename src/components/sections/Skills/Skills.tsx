
'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from '@/components/layout';
import { Flex, Text, Box } from '@/components/primitives';
import { SectionTitle } from '@/components/common';
import { cn } from '@/lib';
import { CodeIcon as Code, Bot, Gamepad2, Palette, Globe, TerminalSquareIcon as Terminal } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  icon: React.ElementType;
  level?: number; 
  relatedSkills?: string[]; 
  description?: string;
}

interface SubSkill {
  id: string;
  name: string;
  category: string; 
}

const coreSkillsData: Skill[] = [
  { id: 'python', name: 'Python', icon: Code, description: "Versatile programming for scripting, automation, and backend logic.", relatedSkills: ['scripting', 'data-analysis-py', 'api-dev-python', 'django-flask'] },
  { id: 'automation', name: 'Automation', icon: Bot, description: "Designing and implementing automated solutions to streamline processes.", relatedSkills: ['rpa-concepts', 'web-automation-py', 'ci-cd-pipelines', 'task-scheduling'] },
  { id: 'gamedev', name: 'Game Development', icon: Gamepad2, description: "Bringing interactive experiences to life with game mechanics and design.", relatedSkills: ['unity-csharp', 'unreal-blueprints', 'game-logic-design', 'pygame'] },
  { id: 'design', name: 'Design Principles', icon: Palette, description: "Applying UI/UX principles to create intuitive and engaging interfaces.", relatedSkills: ['ui-design-tools', 'ux-fundamentals', 'prototyping-interactive', 'graphic-design-basics'] },
  { id: 'webtech', name: 'Web Technologies', icon: Globe, description: "Understanding foundational web concepts for development and automation.", relatedSkills: ['html-css-js-basics', 'restful-apis-concepts', 'frontend-awareness'] },
  { id: 'devtools', name: 'Developer Tools', icon: Terminal, description: "Proficient with essential development tools and version control.", relatedSkills: ['git-github', 'docker', 'cli-tools', 'ide-vscode'] },
];

const subSkillsData: SubSkill[] = [
  // Python
  { id: 'scripting', name: 'Scripting & System Tasks', category: 'Python' },
  { id: 'data-analysis-py', name: 'Data Analysis (Pandas, NumPy)', category: 'Python' },
  { id: 'api-dev-python', name: 'API Development (Flask/FastAPI)', category: 'Python' },
  { id: 'django-flask', name: 'Django/Flask Frameworks', category: 'Python' },
  // Automation
  { id: 'rpa-concepts', name: 'RPA Concepts (e.g., UiPath, Blue Prism)', category: 'Automation' },
  { id: 'web-automation-py', name: 'Web Automation (Selenium, Playwright)', category: 'Automation' },
  { id: 'ci-cd-pipelines', name: 'CI/CD (Jenkins, GitHub Actions)', category: 'Automation' },
  { id: 'task-scheduling', name: 'Task Scheduling (Cron, Airflow)', category: 'Automation' },
  // Game Dev
  { id: 'unity-csharp', name: 'Unity & C#', category: 'Game Development' },
  { id: 'unreal-blueprints', name: 'Unreal Engine & Blueprints', category: 'Game Development' },
  { id: 'game-logic-design', name: 'Game Logic & Mechanics Design', category: 'Game Development' },
  { id: 'pygame', name: 'Pygame', category: 'Game Development' },
  // Design
  { id: 'ui-design-tools', name: 'UI Design Tools (Figma, Adobe XD)', category: 'Design Principles' },
  { id: 'ux-fundamentals', name: 'UX Fundamentals & Research', category: 'Design Principles' },
  { id: 'prototyping-interactive', name: 'Interactive Prototyping', category: 'Design Principles' },
  { id: 'graphic-design-basics', name: 'Graphic Design Basics', category: 'Design Principles' },
  // Web Technologies
  { id: 'html-css-js-basics', name: 'HTML, CSS, JavaScript', category: 'Web Technologies' },
  { id: 'restful-apis-concepts', name: 'RESTful APIs & HTTP', category: 'Web Technologies' },
  { id: 'frontend-awareness', name: 'Frontend Framework Awareness (React, Vue)', category: 'Web Technologies' },
  // Developer Tools
  { id: 'git-github', name: 'Git & GitHub/GitLab', category: 'Developer Tools' },
  { id: 'docker', name: 'Docker & Containers', category: 'Developer Tools' },
  { id: 'cli-tools', name: 'Command Line Interface', category: 'Developer Tools' },
  { id: 'ide-vscode', name: 'IDEs (VS Code, PyCharm)', category: 'Developer Tools' },
];


interface SkillNodeProps {
  skill: Skill;
  onMouseEnter: () => void;
  onFocus: () => void;
  onBlur: () => void;
  isActive: boolean;
}

const SkillNode: React.FC<SkillNodeProps> = React.memo(({ 
  skill, 
  onMouseEnter, 
  onFocus, 
  onBlur, 
  isActive 
}) => {
  const Icon = skill.icon;
  return (
    <motion.div
      tabIndex={0}
      aria-label={`${skill.name} skill node. ${isActive ? skill.description : ''}`}
      aria-expanded={isActive}
      className={cn(
        "relative p-4 md:p-6 rounded-xl shadow-lg cursor-pointer transition-all duration-300 ease-out aspect-square flex flex-col items-center justify-center text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background border",
        isActive 
          ? "bg-primary text-primary-foreground scale-110 shadow-primary/50 border-primary" 
          : "bg-card/70 backdrop-blur-sm border-border/20 hover:shadow-primary/30 hover:bg-card/80 hover:backdrop-blur-md hover:border-primary/40"
      )}
      onMouseEnter={onMouseEnter}
      onFocus={onFocus}
      onBlur={onBlur}
      whileHover={{ y: isActive ? 0 : -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Icon className={cn("w-10 h-10 md:w-12 md:h-12 mb-3", isActive ? "text-primary-foreground" : "text-primary")} />
      <Text as="h3" className={cn("font-headline text-base md:text-lg font-semibold", isActive ? "text-primary-foreground" : "text-foreground")}>
        {skill.name}
      </Text>
      <AnimatePresence>
        {isActive && skill.description && (
          <motion.p 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs md:text-sm mt-2 text-primary-foreground/80 hidden md:block pointer-events-none"
          >
            {skill.description}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
});
SkillNode.displayName = 'SkillNode';


export const Skills: React.FC = React.memo(() => {
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);
  
  const relatedSubSkills = useMemo(() => {
    if (!hoveredSkillId) return [];
    const coreSkill = coreSkillsData.find(s => s.id === hoveredSkillId);
    if (!coreSkill || !coreSkill.relatedSkills) return [];
    return subSkillsData.filter(sub => coreSkill.relatedSkills?.includes(sub.id));
  }, [hoveredSkillId]);
  

  return (
    <SectionWrapper id="skills" className="bg-transparent">
        <SectionTitle>My Expertise</SectionTitle>
        <div 
          className="w-full max-w-3xl" 
          onMouseLeave={() => setHoveredSkillId(null)}
        >
          <Box className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-8 w-full">
            {coreSkillsData.map((skill) => (
              <SkillNode 
                key={skill.id} 
                skill={skill} 
                onMouseEnter={() => setHoveredSkillId(skill.id)}
                onFocus={() => setHoveredSkillId(skill.id)}
                onBlur={() => setHoveredSkillId(null)} 
                isActive={hoveredSkillId === skill.id}
              />
            ))}
          </Box>

          <AnimatePresence>
            {hoveredSkillId && relatedSubSkills.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="mt-8 md:mt-12 p-4 md:p-6 bg-card/70 backdrop-blur-md border border-border/30 rounded-lg shadow-xl w-full"
              >
                <Text as="h4" className="font-headline text-lg md:text-xl font-semibold text-accent mb-3 md:mb-4 text-center">
                  Related Areas for {coreSkillsData.find(s => s.id === hoveredSkillId)?.name}
                </Text>
                <Flex wrap="wrap" justify="center" gap="0.5rem">
                  {relatedSubSkills.map((subSkill, index) => (
                    <motion.span
                      key={subSkill.id}
                      className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-xs md:text-sm shadow-sm"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05, type: "spring", stiffness: 260, damping: 18 }} 
                    >
                      {subSkill.name}
                    </motion.span>
                  ))}
                </Flex>
              </motion.div>
            )}
          </AnimatePresence>
        </div> 
    </SectionWrapper>
  );
});

Skills.displayName = 'SkillsSection';
