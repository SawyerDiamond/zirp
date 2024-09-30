import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import { HomeSVG } from "../../assets/icons";

type HomeProps = {
  isActive: boolean;
  onClick: () => void;
};

export function Home({ isActive, onClick }: HomeProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className={
            isActive
              ? "relative after:content-[''] after:absolute after:top-[-4px] after:left-[-4px] after:right-[-4px] after:bottom-[-4px] after:border-2 after:border-[var(--primary)] after:rounded-md after:z-[-1]"
              : ""
          }
          onClick={onClick}>
          <HomeSVG className="h-5 w-5" />
          <span className="sr-only">Home</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">Home</TooltipContent>
    </Tooltip>
  );
}
