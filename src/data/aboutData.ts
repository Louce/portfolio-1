'use client';

import { Lightbulb, Code, Heart } from 'lucide-react';

/**
 * Static text content for the main biographical paragraph in the About section.
 */
export const aboutText = "I'm Dendi Rivaldi, a passionate developer with a strong interest in Python, automation, and game development. I enjoy tackling challenges and architecting efficient solutions. I also have a keen eye for design, striving to create intuitive and engaging user experiences. My approach combines analytical thinking with creative problem-solving to build impactful software.";

/**
 * An array of objects representing the core philosophies displayed in the accordion
 * component within the About section. Each item includes a value, a trigger text,
 * an icon, and the content to be displayed.
 */
export const philosophyItems = [
  { 
    value: "item-1", 
    trigger: "Pragmatic Innovation",
    icon: Lightbulb,
    content: "I believe in solutions that are both innovative and practical. It's about finding the sweet spot where cutting-edge technology serves a real, tangible purpose, creating systems that are not just clever, but also robust and maintainable."
  },
  { 
    value: "item-2", 
    trigger: "Code as a Craft",
    icon: Code,
    content: "To me, writing code is a craft. I strive for elegance and clarity, believing that well-structured, readable code is fundamental to building scalable and long-lasting applications. It's about taking pride in the quality of the work."
  },
  { 
    value: "item-3", 
    trigger: "Human-Centered Design",
    icon: Heart,
    content: "Technology is for people. My focus is always on the end-user. I am dedicated to creating experiences that are not only functional but also intuitive, accessible, and enjoyable to interact with, bridging the gap between complex logic and human needs."
  },
];
