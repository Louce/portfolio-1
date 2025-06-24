'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Flex, Text } from '@/components/primitives';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui';
import type { Skill, SubSkill } from '@/data/skillsData';

/**
 * Props for the SkillCard component.
 */
interface SkillCardProps {
  /** The core skill data object to display. */
  skill: Skill;
  /** An array of sub-skills related to the core skill. */
  subSkills: SubSkill[];
}

/**
 * A reusable card component to display a single core skill and its related sub-skills.
 * It features the skill's icon, name, description, and a list of related technologies
 * with tooltips for more details.
 *
 * @param {SkillCardProps} props - The properties for the component.
 * @returns {React.ReactElement} A card displaying skill information.
 */
export const SkillCard: React.FC<SkillCardProps> = ({ skill, subSkills }) => {
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
