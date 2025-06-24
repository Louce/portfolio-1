'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from '@/components/layout';
import { Flex, Text, Box } from '@/components/primitives';
import { SectionTitle } from '@/components/common';
import { Tabs, TabsContent, TabsList, TabsTrigger, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui';
import { type Skill, type SubSkill, coreSkillsData, subSkillsData, skillCategories } from '@/data/skillsData';

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
