import React from "react";

/**
 * X icon component for closing functionality.
 * Close/X SVG icon used in modals and overlays.
 * 
 * @component
 * @returns {JSX.Element} X SVG icon
 */
const XIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      className={className || "w-6 h-6"}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
    </svg>
  );
};

export default XIcon;