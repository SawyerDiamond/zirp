import React from "react";
import { RightArrowSVG } from "@/assets/icons/RightArrowSVG";
export const Badge = () => {
  return (
    <button className="relative overflow-hidden rounded-[13px] px-16 py-4 badge-shadow">
      <div className="absolute inset-px z-10 flex items-center justify-center rounded-xl bg-primary-border badge-border gap-2">
        <span className="text-sm font-semibold">Get Started</span>
        <RightArrowSVG className="w-1.5" />
      </div>
      <div className="absolute inset-0 z-0 scale-x-[2.0] blur before:absolute before:inset-0 before:top-1/2 before:aspect-square before:animate-disco before:bg-gradient-conic before:from-[#661FCE] before:via-[#3C56E6] before:to-[#128CFE]" />
    </button>
  );
};
