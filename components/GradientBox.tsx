import React from "react";

interface GradientBoxProps {
  children?: React.ReactNode;
  className?: string;
}

const GradientBox = ({ children, className }: GradientBoxProps) => {
  return (
    <div className={`gradient-glow relative overflow-hidden ${className}`}>
      <div
        className="border-2 border-transparent rounded-[inherit] w-full h-full"
        style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}>
        {children}
      </div>
    </div>
  );
};

export default GradientBox;
