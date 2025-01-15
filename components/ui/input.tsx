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
      <div className="relative flex flex-1 items-center">
        {Icon && (
          <div className="absolute p-[.6rem] rounded-xl bg-primary-solid flex items-center z-10">
            <Icon className="h-5 w-5" />
          </div>
        )}
        <input
          type={type}
          className={cn(
            `${Icon ? "pl-12" : "pl-4"} rounded-xl flex-1 h-10 bg-primary-darker backdrop-blur border border-secondary-border text-sm text-gray-200 font-medium ring-offset-secondary-border file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50`,
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
