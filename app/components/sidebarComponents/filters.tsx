import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { FilterMenu } from "../FilterMenu";
import { CogSVG } from "../../assets/icons";

export function Filters() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Dialog>
          <DialogTrigger>
            <CogSVG className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </DialogTrigger>
          <FilterMenu />
        </Dialog>
      </TooltipTrigger>
      <TooltipContent side="right">Settings</TooltipContent>
    </Tooltip>
  );
}
