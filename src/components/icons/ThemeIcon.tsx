import React from 'react';

/**
 * Props interface for ThemeIcon component
 */
interface ThemeIconProps {
  className?: string;
}

/**
 * Theme icon component for theme switching functionality.
 * Moon SVG icon used to toggle between light and dark themes.
 * 
 * @param {ThemeIconProps} props - Component props
 * @component
 * @returns {JSX.Element} Theme SVG icon
 */
const ThemeIcon: React.FC<ThemeIconProps> = ({ className = '' }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ThemeIcon;
