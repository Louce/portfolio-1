import type React from 'react';

/**
 * Props for the LinkedInIcon component.
 * Extends standard SVG element attributes.
 */
interface IconProps extends React.SVGProps<SVGSVGElement> {}

/**
 * Renders a LinkedIn SVG icon.
 * This is a standard icon used for linking to LinkedIn profiles.
 *
 * @param {IconProps} props - Standard SVG props.
 * @returns {React.ReactElement} The LinkedIn icon as an SVG element.
 */
export const LinkedInIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

LinkedInIcon.displayName = 'LinkedInIcon';
