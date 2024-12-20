export function JobsiteLogo({ className, ...props }: { className?: string }) {
  return (
    <svg
      width="82"
      height="82"
      viewBox="0 0 82 82"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      <g clipPath="url(#clip0_1089_1325)">
        <rect
          width="82"
          height="82"
          rx="24"
          fill="url(#paint0_linear_1089_1325)"
        />
        <rect
          width="82"
          height="82"
          rx="24"
          fill="url(#paint1_radial_1089_1325)"
          fillOpacity="0.5"
        />
        <rect
          width="82"
          height="82"
          rx="24"
          fill="url(#paint2_radial_1089_1325)"
          fillOpacity="0.5"
        />
        <g filter="url(#filter0_d_1089_1325)">
          <rect x="34" width="13" height="82" fill="white" fillOpacity="0.4" />
          <path
            d="M45.1498 85C47.2263 85 48.8884 83.311 49.108 81.2462C50.8501 64.8647 63.8647 51.8501 80.2462 50.108C82.311 49.8884 84 48.2263 84 46.1499L84 38.6305C84 36.5541 82.3109 34.8561 80.2401 35.0097C55.5519 36.8403 35.8403 56.5519 34.0097 81.2401C33.8561 83.3109 35.554 85 37.6305 85L45.1498 85Z"
            fill="#D4DEF9"
          />
          <path
            d="M45.1498 85C47.2263 85 48.8884 83.311 49.108 81.2462C50.8501 64.8647 63.8647 51.8501 80.2462 50.108C82.311 49.8884 84 48.2263 84 46.1499L84 38.6305C84 36.5541 82.3109 34.8561 80.2401 35.0097C55.5519 36.8403 35.8403 56.5519 34.0097 81.2401C33.8561 83.3109 35.554 85 37.6305 85L45.1498 85Z"
            stroke="#D4DEF9"
          />
          <path
            d="M35.8501 -3C33.7737 -3 32.1116 -1.311 31.892 0.753777C30.1499 17.1353 17.1353 30.1499 0.753781 31.892C-1.311 32.1116 -3 33.7737 -3 35.8501L-3 43.3695C-3 45.4459 -1.31086 47.1439 0.759872 46.9903C25.4481 45.1597 45.1597 25.4481 46.9903 0.759871C47.1439 -1.31086 45.4459 -3 43.3695 -3L35.8501 -3Z"
            fill="#D4DEF9"
          />
          <path
            d="M35.8501 -3C33.7737 -3 32.1116 -1.311 31.892 0.753777C30.1499 17.1353 17.1353 30.1499 0.753781 31.892C-1.311 32.1116 -3 33.7737 -3 35.8501L-3 43.3695C-3 45.4459 -1.31086 47.1439 0.759872 46.9903C25.4481 45.1597 45.1597 25.4481 46.9903 0.759871C47.1439 -1.31086 45.4459 -3 43.3695 -3L35.8501 -3Z"
            stroke="#D4DEF9"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_1089_1325"
          x="-15"
          y="-23"
          width="119"
          height="120"
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
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.15 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1089_1325"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1089_1325"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_1089_1325"
          x1="1.02232e-06"
          y1="6.58025"
          x2="86.4164"
          y2="76.5452"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#128CFE" />
          <stop offset="1" stopColor="#4A21BE" />
        </linearGradient>
        <radialGradient
          id="paint1_radial_1089_1325"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(78.2417 3.75833) rotate(90) scale(46.125 46.125)">
          <stop stopColor="#8F1CE5" />
          <stop offset="1" stopColor="#8F1CE5" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint2_radial_1089_1325"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(0 35.1917) rotate(90) scale(46.8083 46.8083)">
          <stop offset="0.375" stopColor="#0261FF" />
          <stop offset="1" stopColor="#0261FF" stopOpacity="0" />
        </radialGradient>
        <clipPath id="clip0_1089_1325">
          <rect width="82" height="82" rx="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
