export function JobsiteLogo({ className, ...props }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="70"
      height="82"
      viewBox="0 0 70 82"
      fill="none"
      className={className}>
      <g filter="url(#filter0_d_484_6)">
        <path
          d="M12 50.8766C12.2869 61.6267 20.7027 69.679 31 69.679C41.2973 69.679 49.7131 61.6267 50 50.8766L41.3143 50.8766C41.0129 56.3885 36.3197 61.1324 31 61.1324C25.6803 61.1324 20.9871 56.3885 20.6857 50.8766L12 50.8766Z"
          fill="white"
        />
        <path
          d="M41.3143 20.679L50 20.679L50 50.8766L41.3143 50.8766L41.3143 20.679Z"
          fill="white"
        />
        <path
          d="M20.1429 30.365L20.1429 20.679L50 20.679L50 30.365L20.1429 30.365Z"
          fill="white"
        />
        <path
          d="M41.3143 30.365L41.3143 20.679L50 20.679L50 30.365L41.3143 30.365Z"
          fill="white"
        />
        <path
          d="M41.3143 50.8766L41.3143 41.1906L50 41.1906L50 50.8766L41.3143 50.8766Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_484_6"
          x="0"
          y="0.678955"
          width="70"
          height="81"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
            result="effect1_dropShadow_484_6"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_484_6"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
