import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { BookmarksSVG } from "@/assets/icons/BookmarksSVG";

type BookmarksProps = {
  isActive: boolean;
  onClick: () => void;
};

export function Bookmarks({ isActive, onClick }: BookmarksProps) {
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
          <BookmarksSVG className={`h-5 w-5 ${isActive ? "text-white" : ""}`} />
          <span className="sr-only">Bookmarks</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">Bookmarks</TooltipContent>
    </Tooltip>
  );
}
