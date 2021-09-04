import React from "react";
interface IconOption {
  strokeColor?: string;
  classes?: string;
}
export const Icon: React.FC<IconOption> = ({ strokeColor, classes }) => (
  <svg
    width="1.1rem"
    height="1.1rem"
    xmlns="http://www.w3.org/2000/svg"
    className={classes}
    fill="none"
    viewBox="0 0 24 24"
    stroke={strokeColor || "currentColor"}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="{2}"
      d="M19 9l-7 7-7-7"
    />
  </svg>
);
export const CheckIcon: React.FC<IconOption> = ({ strokeColor }) => (
  <svg
    width="1rem"
    height="1rem"
    className="w-6 h-6"
    fill="none"
    stroke={strokeColor || "currentColor"}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);
