'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/layout';
import { SectionTitle } from '@/components/common';
import { coreSkillsData, subSkillsData } from '@/data/skillsData';
import { SkillCard } from './components';

/**
 * The "My Expertise" (Skills) section of the portfolio.
 * It displays a grid of "Skill Cards," which are a modern, scannable, and visually
 * appealing way to present technical competencies. This design is optimized for quick
 * review by recruiters and AI crawlers, prioritizing clarity and impact over complex
 * visualizations like charts.
 *
 * @returns {React.ReactElement} The Skills section component.
 */
export const Skills: React.FC = React.memo(() => {
  return (
    <SectionWrapper id="skills" className="bg-transparent">
      <div className="absolute inset-0 z-0 bg-grid-pattern masked-radial-gradient"></div>
      <div className="relative z-10 w-full flex flex-col items-center">
        <SectionTitle>My Expertise</SectionTitle>
        <motion.div
          className="w-full max-w-5xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {coreSkillsData.map((skill) => {
              const relatedSubSkills = subSkillsData.filter(
                (s) => s.coreSkillId === skill.id
              );
              return <SkillCard key={skill.id} skill={skill} subSkills={relatedSubSkills} />;
            })}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
});

Skills.displayName = 'SkillsSection';
