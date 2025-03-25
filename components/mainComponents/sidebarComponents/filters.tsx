import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { CogSVG } from "@/assets/icons";

type FiltersProps = {
  isActive: boolean;
  onClick: () => void;
};

export function Filters({ isActive, onClick }: FiltersProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClick}
          className={`transition-all ${
            isActive
              ? "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
              : ""
          }`}>
          <CogSVG className={`h-5 w-5 ${isActive ? "text-white" : ""}`} />
          <span className="sr-only">Filters</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">Filters</TooltipContent>
    </Tooltip>
  );
}
