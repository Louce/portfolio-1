'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from '@/components/layout';
import { SectionTitle } from '@/components/common';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
import { coreSkillsData, subSkillsData, skillCategories } from '@/data/skillsData';
import { SkillCard } from './components';

/**
 * The Skills section of the portfolio.
 * It uses a tabbed interface to categorize and display different areas of expertise,
 * such as core competencies and technologies. Each skill is presented in a `SkillCard`.
 *
 * @returns {React.ReactElement} The Skills section component.
 */
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
