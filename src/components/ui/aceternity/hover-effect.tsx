"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image"; // Using next/image for consistency

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link?: string;
    onClick?: () => void;
    coverImageUrl?: string; 
    coverDataAiHint?: string; 
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
        className
      )}
    >
      {items.map((item, idx) => {
        // If onClick is provided, it's a button-like interaction. If link, it's a link.
        const isLink = !!item.link && !item.onClick;
        const InteractiveWrapper = isLink ? Link : 'div';
        
        const wrapperProps: any = {};
        if (isLink && item.link) {
          wrapperProps.href = item.link;
        }
        
        return (
          <InteractiveWrapper
            {...wrapperProps}
            key={item.link || item.title}
            className="relative group block p-2 h-full w-full cursor-pointer" // Ensure cursor pointer for div if onClick
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={item.onClick}
            role={item.onClick ? "button" : (isLink ? "link" : undefined)}
            tabIndex={item.onClick ? 0 : undefined}
            onKeyDown={item.onClick ? (e: React.KeyboardEvent<HTMLDivElement>) => { if (e.key === 'Enter' || e.key === ' ') item.onClick?.(); } : undefined}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                  layoutId="hoverBackground" // Unique ID for layout animation
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <Card item={item} />
          </InteractiveWrapper>
        );
      })}
    </div>
  );
};

const Card = ({ item }: { item: { title: string; description: string; coverImageUrl?: string; coverDataAiHint?: string } }) => {
  return (
    <div className="rounded-2xl h-full w-full p-4 overflow-hidden bg-card dark:bg-background border border-border/20 dark:border-white/[0.2] group-hover:border-border relative z-20 transition-shadow duration-500 group-hover:shadow-xl">
      {item.coverImageUrl && (
         <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg mb-4">
           <Image
             src={item.coverImageUrl}
             alt={item.title}
             data-ai-hint={item.coverDataAiHint || "project image"}
             fill
             className="object-cover transition-transform duration-500 group-hover:scale-105"
           />
         </div>
      )}
      <div className="py-2 sm:py-4 px-1 sm:px-0 relative z-50">
        <h4 className="text-xl font-bold tracking-wide text-primary">
          {item.title}
        </h4>
        <p className="mt-2 text-foreground/80 tracking-wide leading-relaxed text-sm">
          {item.description}
        </p>
      </div>
    </div>
  );
};
