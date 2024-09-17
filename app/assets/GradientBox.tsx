import React from "react";

interface GradientBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  width?: string | number;
  height?: string | number;
}

export function GradientBox({
  children,
  width = "100%",
  height = "auto",
  ...props
}: GradientBoxProps) {
  return (
    <div style={{ width, height }} className="relative" {...props}>
      <div className="w-full h-0 pb-[18.05%] relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2510 453"
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 w-full h-full"
          fill="none">
          <path
            d="M0 30C0 13.4315 13.4315 0 30 0H2480C2496.57 0 2510 13.4315 2510 30V423C2510 439.569 2496.57 453 2480 453H29.9999C13.4314 453 0 439.569 0 423V30Z"
            fill="url(#paint0_linear_209_22)"
          />
          <path
            d="M0 30C0 13.4315 13.4315 0 30 0H2480C2496.57 0 2510 13.4315 2510 30V423C2510 439.569 2496.57 453 2480 453H29.9999C13.4314 453 0 439.569 0 423V30Z"
            fill="url(#paint1_radial_209_22)"
            fill-opacity="0.5"
          />
          <path
            d="M0 30C0 13.4315 13.4315 0 30 0H2480C2496.57 0 2510 13.4315 2510 30V423C2510 439.569 2496.57 453 2480 453H29.9999C13.4314 453 0 439.569 0 423V30Z"
            fill="url(#paint2_radial_209_22)"
            fill-opacity="0.5"
          />
          <path
            d="M30 1.5H2480C2495.74 1.5 2508.5 14.2599 2508.5 30V423C2508.5 438.74 2495.74 451.5 2480 451.5H29.9999C14.2598 451.5 1.5 438.74 1.5 423V30C1.5 14.2599 14.2599 1.5 30 1.5Z"
            stroke="white"
            stroke-opacity="0.2"
            stroke-width="1"
          />
          <defs>
            <linearGradient
              id="paint0_linear_209_22"
              x1="0"
              y1="0"
              x2="1747.38"
              y2="1402.89"
              gradientUnits="userSpaceOnUse">
              <stop stop-color="#5BC6F3" />
              <stop offset="1" stop-color="#450AAF" />
            </linearGradient>
            <radialGradient
              id="paint1_radial_209_22"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(2510 -3.23185e-05) rotate(90) scale(453 2510)">
              <stop stop-color="#8F1CE5" />
              <stop offset="1" stop-color="#8F1CE5" stop-opacity="0" />
            </radialGradient>
            <radialGradient
              id="paint2_radial_209_22"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="rotate(90) scale(453 2510)">
              <stop offset="0.375" stop-color="#3A7EF0" />
              <stop offset="1" stop-color="#3A7EF0" stop-opacity="0" />
            </radialGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col justify-center items-start p-10">
          {children}
        </div>
      </div>
    </div>
  );
}
