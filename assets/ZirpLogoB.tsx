export function ZirpLogoB({ className, ...props }: { className?: string }) {
  return (
    <svg
      width="92"
      height="92"
      viewBox="0 0 92 92"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      <rect
        x="1"
        y="9"
        width="82"
        height="82"
        rx="26"
        fill="url(#paint0_linear_1240_23)"
      />
      <rect
        x="1"
        y="9"
        width="82"
        height="82"
        rx="26"
        fill="url(#paint1_radial_1240_23)"
        fillOpacity="0.5"
      />
      <rect
        x="1"
        y="9"
        width="82"
        height="82"
        rx="26"
        fill="url(#paint2_radial_1240_23)"
        fillOpacity="0.5"
      />
      <g filter="url(#filter0_d_1240_23)">
        <rect
          x="37"
          y="21"
          width="10"
          height="58"
          rx="3"
          fill="white"
          fillOpacity="0.6"
        />
        <rect
          x="36.5"
          y="20.5"
          width="11"
          height="59"
          rx="3.5"
          stroke="white"
          strokeOpacity="0.6"
        />
        <path
          d="M39.4181 20.5C37.718 20.5 36.4022 21.875 36.2294 23.4997C35.0697 34.4049 26.4049 43.0697 15.4997 44.2294C13.875 44.4022 12.5 45.718 12.5 47.4181V52.5313C12.5 54.2093 13.8716 55.6198 15.5937 55.4921C32.6287 54.2289 46.2289 40.6287 47.4921 23.5937C47.6198 21.8716 46.2093 20.5 44.5313 20.5H39.4181Z"
          fill="white"
          stroke="white"
        />
        <path
          d="M44.5819 79.5C46.282 79.5 47.5978 78.125 47.7706 76.5003C48.9303 65.5951 57.5951 56.9303 68.5003 55.7706C70.125 55.5978 71.5 54.282 71.5 52.5819L71.5 47.4687C71.5 45.7907 70.1284 44.3802 68.4063 44.5079C51.3713 45.7711 37.7711 59.3713 36.5079 76.4063C36.3802 78.1284 37.7907 79.5 39.4687 79.5L44.5819 79.5Z"
          fill="white"
          stroke="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1240_23"
          x="0"
          y="0"
          width="92"
          height="92"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB">
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
            result="effect1_dropShadow_1240_23"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1240_23"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_1240_23"
          x1="1"
          y1="15.5802"
          x2="87.4164"
          y2="85.5452"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#128CFE" />
          <stop offset="1" stopColor="#4A21BE" />
        </linearGradient>
        <radialGradient
          id="paint1_radial_1240_23"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(79.2417 12.7583) rotate(90) scale(46.125 46.125)">
          <stop stopColor="#8F1CE5" />
          <stop offset="1" stopColor="#8F1CE5" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint2_radial_1240_23"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(1 44.1917) rotate(90) scale(46.8083 46.8083)">
          <stop offset="0.375" stopColor="#0261FF" />
          <stop offset="1" stopColor="#0261FF" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}
