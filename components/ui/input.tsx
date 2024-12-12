import * as React from "react";
import "@/app/globals.css";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon: Icon, type, ...props }, ref) => {
    return (
      <div className="flex items-center">
        {Icon && (
          <div className="absolute inset-y-0 left-0 flex items-center z-10 p-[.65rem] bg-primary border border-secondary rounded-xl">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex content-center text-align h-10 pl-[10px] w-full rounded-xl bg-primary border border-primary-border text-sm font-medium ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring  disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
