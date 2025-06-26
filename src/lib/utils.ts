/**
 * @fileOverview
 * A utility file containing helper functions. This project uses it for the `cn`
 * function, which is a standard and essential utility in modern web development
 * with Tailwind CSS.
 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * A utility function to merge Tailwind CSS classes conditionally and without conflicts.
 * It combines the functionality of `clsx` (for conditional classes) and `tailwind-merge`
 * (to resolve conflicting Tailwind classes). This is standard in projects
 * using Tailwind and component libraries like ShadCN.
 *
 * @param {...ClassValue[]} inputs - A list of class names or conditional class objects.
 * @returns {string} The final, merged, and de-duplicated class string.
 * @example cn('p-4', 'font-bold', true && 'bg-red-500', false && 'text-white')
 * @see https://github.com/dcastil/tailwind-merge
 * @see https://github.com/lukeed/clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
