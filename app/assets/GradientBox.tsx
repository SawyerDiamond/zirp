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
    <div style={{ width, height }} {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2500 450"
        preserveAspectRatio="xMidYMid meet"
        className=" inset-0 w-full h-full"
        fill="none">
        <path
          d="M0 30C0 13.4315 13.4315 0 30 0H2470C2486.57 0 2500 13.4315 2500 30V420C2500 436.569 2486.57 450 2470 450H30.0001C13.4315 450 0 436.569 0 420V30Z"
          fill="url(#paint0_linear_587_19)"
        />
        <path
          d="M0 30C0 13.4315 13.4315 0 30 0H2470C2486.57 0 2500 13.4315 2500 30V420C2500 436.569 2486.57 450 2470 450H30.0001C13.4315 450 0 436.569 0 420V30Z"
          fill="url(#paint1_radial_587_19)"
          fill-opacity="0.5"
        />
        <path
          d="M0 30C0 13.4315 13.4315 0 30 0H2470C2486.57 0 2500 13.4315 2500 30V420C2500 436.569 2486.57 450 2470 450H30.0001C13.4315 450 0 436.569 0 420V30Z"
          fill="url(#paint2_radial_587_19)"
          fill-opacity="0.5"
        />
        <path
          d="M30 1.5H2470C2485.74 1.5 2498.5 14.2599 2498.5 30V420C2498.5 435.74 2485.74 448.5 2470 448.5H30.0001C14.2599 448.5 1.5 435.74 1.5 420V30C1.5 14.2599 14.2599 1.5 30 1.5Z"
          stroke="white"
          stroke-opacity="0.1"
          stroke-width="3"
        />
        <rect
          x="6"
          width="2494"
          height="450"
          fill="url(#pattern0_587_19)"
          fill-opacity="0.05"
        />
        <defs>
          <pattern
            id="pattern0_587_19"
            patternContentUnits="objectBoundingBox"
            width="0.410585"
            height="2.27556">
            <use transform="scale(0.000400962 0.00222222)" />
          </pattern>
          <linearGradient
            id="paint0_linear_587_19"
            x1="0"
            y1="0"
            x2="1736.8"
            y2="1398.1"
            gradientUnits="userSpaceOnUse">
            <stop stop-color="#1FB9FD" />
            <stop offset="1" stop-color="#450AAF" />
          </linearGradient>
          <radialGradient
            id="paint1_radial_587_19"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(2500 -3.21044e-05) rotate(90) scale(450 2500)">
            <stop stop-color="#8F1CE5" />
            <stop offset="1" stop-color="#8F1CE5" stop-opacity="0" />
          </radialGradient>
          <radialGradient
            id="paint2_radial_587_19"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="rotate(90) scale(450 2500)">
            <stop offset="0.375" stop-color="#0261FF" />
            <stop offset="1" stop-color="#0261FF" stop-opacity="0" />
          </radialGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col justify-center items-start p-10">
        {children}
      </div>
    </div>
  );
}
