
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from '@/components/ui';
import type { Skill, SubSkill } from '@/data/skillsData';
import { Flex } from '@/components/primitives';

/**
 * Props for the SkillCard component.
 */
interface SkillCardProps {
  /** The core skill data object to display. */
  skill: Skill;
  /** An array of sub-skills related to the core skill. */
  subSkills: SubSkill[];
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      staggerChildren: 0.05
    }
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

/**
 * A component that visualizes a core skill and its related technologies as a "spec card".
 * This scannable format is more effective for quick review than a chart. It uses badges
 * to represent individual technologies and animations to add visual appeal.
 *
 * @param {SkillCardProps} props - The properties for the component.
 * @returns {React.ReactElement} A card containing a skill summary and technology badges.
 */
export const SkillCard: React.FC<SkillCardProps> = ({ skill, subSkills }) => {
  const Icon = skill.icon;

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <Card className="p-4 md:p-6 rounded-xl shadow-lg bg-card/70 backdrop-blur-sm border border-border/20 flex flex-col h-full">
        <CardHeader className="p-0 mb-4">
          <Flex align="center" gap={3} className="mb-2">
            <Icon className="w-8 h-8 text-accent flex-shrink-0" />
            <CardTitle className="font-headline text-lg md:text-xl font-semibold text-foreground">
              {skill.name}
            </CardTitle>
          </Flex>
          <CardDescription className="text-sm text-muted-foreground text-left">
            {skill.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 flex-grow">
          <Flex wrap="wrap" gap="0.5rem">
            {subSkills.map((subSkill) => (
              <motion.div key={subSkill.id} variants={itemVariants}>
                <Badge variant="secondary" className="font-mono text-xs">
                  {subSkill.name}
                </Badge>
              </motion.div>
            ))}
          </Flex>
        </CardContent>
      </Card>
    </motion.div>
  );
};

SkillCard.displayName = 'SkillCard';
