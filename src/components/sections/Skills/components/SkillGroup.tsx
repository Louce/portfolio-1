
'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import type { ChartConfig } from '@/components/ui/Chart/chart';
import type { Skill, SubSkill } from '@/data/skillsData';
import { Flex, Text } from '@/components/primitives';

/**
 * Props for the SkillGroup component.
 */
interface SkillGroupProps {
  /** The core skill data object to display. */
  skill: Skill;
  /** An array of sub-skills related to the core skill. */
  subSkills: SubSkill[];
}

/**
 * A component that visualizes a group of related skills using a bar chart.
 * It displays a core skill's title and description, then a chart showing
 * proficiency levels for its associated sub-skills.
 *
 * @param {SkillGroupProps} props - The properties for the component.
 * @returns {React.ReactElement} A card containing a skill chart.
 */
export const SkillGroup: React.FC<SkillGroupProps> = ({ skill, subSkills }) => {
  const Icon = skill.icon;

  const chartData = subSkills.map(s => ({
    name: s.name,
    proficiency: s.proficiency,
    fill: 'var(--color-proficiency)',
    description: s.description,
  }));

  const chartConfig = {
    proficiency: {
      label: "Proficiency",
      color: "hsl(var(--primary))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="p-4 md:p-6 rounded-xl shadow-lg bg-card/70 backdrop-blur-sm border border-border/20 flex flex-col">
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
        <ChartContainer config={chartConfig} className="w-full h-52">
            <BarChart
                accessibilityLayer
                data={chartData}
                layout="vertical"
                margin={{ left: 10, top: 10, right: 10, bottom: 0 }}
            >
                <CartesianGrid horizontal={false} />
                <YAxis
                    dataKey="name"
                    type="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    className="text-xs"
                />
                <XAxis dataKey="proficiency" type="number" hide />
                <ChartTooltip
                    cursor={false}
                    content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                                <div className="min-w-[150px] rounded-lg border bg-background p-2 text-xs shadow-sm">
                                    <Text as="p" className="font-bold text-foreground">{data.name}</Text>
                                    <Text as="p" className="text-muted-foreground">{data.description}</Text>
                                    <Text as="p" className="mt-1 text-primary">Proficiency: {data.proficiency}%</Text>
                                </div>
                            );
                        }
                        return null;
                    }}
                />
                <Bar
                    dataKey="proficiency"
                    layout="vertical"
                    radius={5}
                />
            </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

SkillGroup.displayName = 'SkillGroup';
