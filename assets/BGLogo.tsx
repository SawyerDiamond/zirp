export function BGLogo({
  className,
  fillColor,
  ...props
}: {
  className?: string;
  fillColor: string;
}) {
  return (
    <svg
      width="1085"
      height="1094"
      viewBox="0 0 1085 1094"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      <rect
        x="464"
        width="180"
        height="1094"
        rx="52"
        fill={fillColor}
        fillOpacity={fillColor === "#FFFFFF" ? "1" : ".4"}
      />
      <path
        d="M602.481 1094C628.27 1094 648.914 1073.02 651.641 1047.38C673.278 843.919 834.919 682.278 1038.38 660.641C1064.02 657.914 1085 637.27 1085 611.481L1085 518.091C1085 492.301 1064.02 471.213 1038.3 473.12C731.674 495.856 486.856 740.674 464.12 1047.3C462.213 1073.02 483.301 1094 509.09 1094L602.481 1094Z"
        fill={fillColor}
      />
      <path
        d="M602.481 1094C628.27 1094 648.914 1073.02 651.641 1047.38C673.278 843.919 834.919 682.278 1038.38 660.641C1064.02 657.914 1085 637.27 1085 611.481L1085 518.091C1085 492.301 1064.02 471.213 1038.3 473.12C731.674 495.856 486.856 740.674 464.12 1047.3C462.213 1073.02 483.301 1094 509.09 1094L602.481 1094Z"
        stroke={fillColor}
      />
      <path
        d="M515.519 0C489.73 0 469.086 20.9774 466.359 46.6219C444.722 250.081 283.081 411.722 79.622 433.359C53.9774 436.086 33 456.73 33 482.519L33 575.91C33 601.699 53.9791 622.787 79.6976 620.88C386.326 598.144 631.144 353.326 653.88 46.6976C655.787 20.9791 634.699 0 608.91 0L515.519 0Z"
        fill={fillColor}
      />
      <path
        d="M515.519 0C489.73 0 469.086 20.9774 466.359 46.6219C444.722 250.081 283.081 411.722 79.622 433.359C53.9774 436.086 33 456.73 33 482.519L33 575.91C33 601.699 53.9791 622.787 79.6976 620.88C386.326 598.144 631.144 353.326 653.88 46.6976C655.787 20.9791 634.699 0 608.91 0L515.519 0Z"
        stroke={fillColor}
      />
    </svg>
  );
}
