export function Grid({ className, ...props }: { className?: string }) {
  return (
    <svg
      width="1000"
      height="1200"
      viewBox="0 0 1000 1200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      <g clipPath="url(#clip0_1089_1333)">
        <path
          d="M100.5 0L100.5 1200M200.5 0L200.5 1200M300.5 0L300.5 1200M400.5 0L400.5 1200M500.5 0L500.5 1200M600.5 0L600.5 1200M800.5 0L800.5 1200M900.5 0L900.5 1200M1000.5 0L1000.5 1200M700.5 0L700.5 1200M1000 100.5H3.93403e-05M1000 201.5H3.49691e-05M1000 302.5H3.0598e-05M1000 403.5H2.62268e-05M1000 504.5H2.18557e-05M1000 605.5H1.74846e-05M1000 807.5H8.74228e-06M1000 908.5H4.37114e-06M1000 1009.5H0M1000 1110.5H3.93403e-05M1000 706.5H1.31134e-05"
          stroke="url(#paint0_radial_1089_1333)"
        />
      </g>
      <defs>
        <radialGradient
          id="paint0_radial_1089_1333"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(500.25 600) rotate(90) scale(600 500.25)">
          <stop stopColor="#FFFFFF33" />
          <stop offset="1" stopColor="#FFFFFF0D" />
        </radialGradient>
        <clipPath id="clip0_1089_1333">
          <rect width="1000" height="1200" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
