/**
 * @fileOverview
 * A utility file containing helper functions. This project uses it for the `cn` function.
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * A utility function to merge Tailwind CSS classes conditionally and without conflicts.
 * It combines the functionality of `clsx` (for conditional classes) and `tailwind-merge`
 * (to resolve conflicting Tailwind classes). This is a standard utility in projects
 * using Tailwind and component libraries like ShadCN.
 *
 * @param {...ClassValue[]} inputs - A list of class names or conditional class objects.
 * @returns {string} The final, merged class string.
 * @example cn('p-4', 'font-bold', true && 'bg-red-500', false && 'text-white')
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
