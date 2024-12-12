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
        className="inset-0 w-full h-full rounded-2xl"
        fill="none"
        style={{
          filter: "drop-shadow(0px 0px 16px rgba(52, 118, 242, 0.25))",
        }}>
        <g clipPath="url(#clip0_587_19)">
          <path
            d="M0 30C0 13.4315 13.4315 0 30 0H2470C2486.57 0 2500 13.4315 2500 30V420C2500 436.569 2486.57 450 2470 450H30.0001C13.4315 450 0 436.569 0 420V30Z"
            fill="url(#paint0_linear_587_19)"
          />
          <path
            d="M0 30C0 13.4315 13.4315 0 30 0H2470C2486.57 0 2500 13.4315 2500 30V420C2500 436.569 2486.57 450 2470 450H30.0001C13.4315 450 0 436.569 0 420V30Z"
            fill="url(#paint1_radial_587_19)"
            fillOpacity="0.5"
          />
          <path
            d="M0 30C0 13.4315 13.4315 0 30 0H2470C2486.57 0 2500 13.4315 2500 30V420C2500 436.569 2486.57 450 2470 450H30.0001C13.4315 450 0 436.569 0 420V30Z"
            fill="url(#paint2_radial_587_19)"
            fillOpacity="0.5"
          />
          <path
            d="M1.5 30C1.5 14.2599 14.2599 1.5 30 1.5H2470C2485.74 1.5 2498.5 14.2599 2498.5 30V420C2498.5 435.74 2485.74 448.5 2470 448.5H30.0001C14.2599 448.5 1.5 435.74 1.5 420V30Z"
            stroke="white"
            strokeOpacity="0.1"
            strokeWidth="3"
          />
          <g opacity="0.1" filter="url(#filter0_d_587_19)">
            <path
              d="M1800.07 210.889C1719.34 359.787 1771.25 536.196 1912.35 617.658C2053.44 699.12 2232.17 655.868 2320.76 511.509L2201.74 442.796C2154.21 515.593 2052.54 543.17 1979.65 501.086C1906.76 459.001 1879.81 357.167 1919.08 279.602L1800.07 210.889Z"
              fill="white"
            />
            <path
              d="M2439.55 30.907L2558.56 99.6203L2320.76 511.509L2201.74 442.796L2439.55 30.907Z"
              fill="white"
            />
            <path
              d="M2073.17 -4.4661L2149.45 -136.581L2558.56 99.6203L2482.28 231.736L2073.17 -4.4661Z"
              fill="white"
            />
            <path
              d="M2363.27 163.022L2439.55 30.907L2558.56 99.6203L2482.28 231.736L2363.27 163.022Z"
              fill="white"
            />
            <path
              d="M2201.74 442.796L2278.02 310.681L2397.03 379.394L2320.76 511.509L2201.74 442.796Z"
              fill="white"
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_d_587_19"
            x="1749.89"
            y="-156.581"
            width="828.669"
            height="827.01"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="4" dy="-4" />
            <feGaussianBlur stdDeviation="8" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_587_19"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_587_19"
              result="shape"
            />
          </filter>
          <linearGradient
            id="paint0_linear_587_19"
            x1="0"
            y1="0"
            x2="1736.8"
            y2="1398.1"
            gradientUnits="userSpaceOnUse">
            <stop stopColor="#1FB9FD" />
            <stop offset="1" stopColor="#450AAF" />
          </linearGradient>
          <radialGradient
            id="paint1_radial_587_19"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(2500 -3.21044e-05) rotate(90) scale(450 2500)">
            <stop stopColor="#8F1CE5" />
            <stop offset="1" stopColor="#8F1CE5" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            id="paint2_radial_587_19"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="rotate(90) scale(450 2500)">
            <stop offset="0.375" stopColor="#0261FF" />
            <stop offset="1" stopColor="#0261FF" stopOpacity="0" />
          </radialGradient>
          <clipPath id="clip0_587_19">
            <rect width="2500" height="450" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <div className="absolute inset-0 flex flex-col justify-center items-start p-10">
        {children}
      </div>
    </div>
  );
}