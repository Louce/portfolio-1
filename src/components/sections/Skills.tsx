
'use client';

import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from '@/components/layout';
import { Flex, Text, Box } from '@/components/primitives';
import { cn } from '@/lib';
import { Code, Zap, Layers, Settings, Brain, Share2 } from 'lucide-react'; // Example icons

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
  { id: 'react', name: 'React', icon: Layers, relatedSkills: ['redux', 'mobx', 'react-query', 'nextjs-skill'], description: "Building dynamic and responsive UIs with a component-based architecture." },
  { id: 'typescript', name: 'TypeScript', icon: Code, relatedSkills: ['zod', 'eslint-skill'], description: "Ensuring type safety and scalability in large JavaScript applications." },
  { id: 'nextjs', name: 'Next.js', icon: Zap, relatedSkills: ['ssr', 'ssg', 'server-actions'], description: "Leveraging full-stack capabilities for performant web applications." },
  { id: 'tailwindcss', name: 'Tailwind CSS', icon: Settings, relatedSkills: ['shadcn-ui', 'css-modules'], description: "Rapidly building custom designs with a utility-first CSS framework." },
  { id: 'framer-motion', name: 'Framer Motion', icon: Brain, relatedSkills: ['micro-interactions', 'page-transitions'], description: "Creating fluid and engaging animations for a delightful user experience." },
  { id: 'nodejs', name: 'Node.js', icon: Share2, relatedSkills: ['express', 'nestjs', 'api-design'], description: "Developing robust and scalable server-side applications and APIs." },
];

const subSkillsData: SubSkill[] = [
  { id: 'redux', name: 'Redux', category: 'React' },
  { id: 'mobx', name: 'MobX', category: 'React' },
  { id: 'react-query', name: 'TanStack Query', category: 'React' },
  { id: 'nextjs-skill', name: 'Advanced Next.js', category: 'Next.js' },
  { id: 'zod', name: 'Zod', category: 'TypeScript' },
  { id: 'eslint-skill', name: 'ESLint', category: 'TypeScript' },
  { id: 'ssr', name: 'SSR', category: 'Next.js' },
  { id: 'ssg', name: 'SSG', category: 'Next.js' },
  { id: 'server-actions', name: 'Server Actions', category: 'Next.js' },
  { id: 'shadcn-ui', name: 'ShadCN/UI', category: 'Tailwind CSS' },
  { id: 'css-modules', name: 'CSS Modules', category: 'Tailwind CSS' },
  { id: 'micro-interactions', name: 'Micro-interactions', category: 'Framer Motion' },
  { id: 'page-transitions', name: 'Page Transitions', category: 'Framer Motion' },
  { id: 'express', name: 'Express.js', category: 'Node.js' },
  { id: 'nestjs', name: 'NestJS', category: 'Node.js' },
  { id: 'api-design', name: 'API Design', category: 'Node.js' },
];


interface SkillNodeProps {
  skill: Skill;
  onNodeEnter: (skillId: string) => void;
  isActive: boolean;
}

const SkillNode: React.FC<SkillNodeProps> = ({ skill, onNodeEnter, isActive }) => {
  const Icon = skill.icon;
  return (
    <motion.div
      className={cn(
        "relative p-4 md:p-6 rounded-xl shadow-lg cursor-pointer transition-all duration-300 ease-out aspect-square flex flex-col items-center justify-center text-center",
        isActive ? "bg-primary text-primary-foreground scale-110 shadow-primary/50" : "bg-card hover:shadow-primary/30 hover:bg-primary/10"
      )}
      onMouseEnter={() => onNodeEnter(skill.id)}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Icon className={cn("w-10 h-10 md:w-12 md:h-12 mb-3", isActive ? "text-primary-foreground" : "text-primary")} />
      <Text as="h3" className="font-headline text-base md:text-lg font-semibold">{skill.name}</Text>
      <AnimatePresence>
        {isActive && skill.description && (
          <motion.p 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs md:text-sm mt-2 text-primary-foreground/80 hidden md:block"
          >
            {skill.description}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};


export const Skills: React.FC = React.memo(() => {
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);
  const pendingHoverIdRef = useRef<string | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const DEBOUNCE_DELAY = 150; 

  const handleNodeMouseEnter = (skillId: string) => {
    pendingHoverIdRef.current = skillId;
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      if (pendingHoverIdRef.current === skillId) {
        setHoveredSkillId(skillId);
      }
    }, DEBOUNCE_DELAY);
  };

  const handleContainerMouseLeave = () => {
    pendingHoverIdRef.current = null; 
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      if (pendingHoverIdRef.current === null) { 
        setHoveredSkillId(null);
      }
    }, DEBOUNCE_DELAY);
  };

  const relatedSubSkills = useMemo(() => {
    if (!hoveredSkillId) return [];
    const coreSkill = coreSkillsData.find(s => s.id === hoveredSkillId);
    if (!coreSkill || !coreSkill.relatedSkills) return [];
    return subSkillsData.filter(sub => coreSkill.relatedSkills?.includes(sub.id));
  }, [hoveredSkillId]);
  

  return (
    <SectionWrapper id="skills" className="bg-gradient-to-b from-background to-slate-900/50">
      <Flex direction="col" align="center" justify="center" className="h-full w-full space-y-10 md:space-y-16">
        <Text as="h2" variant="default" className="font-headline text-4xl md:text-5xl font-bold text-primary text-center">
          My Expertise
        </Text>
        
        <div 
          className="w-full max-w-3xl" 
          onMouseLeave={handleContainerMouseLeave} 
        >
          <Box className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-8 w-full">
            {coreSkillsData.map((skill) => (
              <SkillNode 
                key={skill.id} 
                skill={skill} 
                onNodeEnter={handleNodeMouseEnter}
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
                transition={{ duration: 0.3 }}
                className="mt-8 md:mt-12 p-4 md:p-6 bg-card rounded-lg shadow-xl w-full"
              >
                <Text as="h4" className="font-headline text-lg md:text-xl font-semibold text-accent mb-3 md:mb-4 text-center">
                  Related Technologies for {coreSkillsData.find(s => s.id === hoveredSkillId)?.name}
                </Text>
                <Flex wrap="wrap" justify="center" gap="0.5rem">
                  {relatedSubSkills.map((subSkill, index) => (
                    <motion.span
                      key={subSkill.id}
                      className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-xs md:text-sm shadow-sm"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }} 
                    >
                      {subSkill.name}
                    </motion.span>
                  ))}
                </Flex>
              </motion.div>
            )}
          </AnimatePresence>
        </div> 
      </Flex>
    </SectionWrapper>
  );
});

Skills.displayName = 'SkillsSection';
