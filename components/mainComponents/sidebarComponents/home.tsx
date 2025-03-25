import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { HomeSVG } from "@/assets/icons";

type HomeProps = {
  isActive: boolean;
  onClick: () => void;
};

export function Home({ isActive, onClick }: HomeProps) {
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
          <HomeSVG className={`h-5 w-5 ${isActive ? "text-white" : ""}`} />
          <span className="sr-only">Home</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">Home</TooltipContent>
    </Tooltip>
  );
}
