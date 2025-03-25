import { useSidebarNavigation } from "../../hooks/useSidebarNavigation";

import { TooltipProvider } from "../ui/tooltip";
import { ZirpLogo } from "@/assets/ZirpLogo";
import {
  Bookmarks,
  Filters,
  Home,
} from "@/components/mainComponents/sidebarComponents";
import SignOutButton from "@/components/mainComponents/SignOutButton";

type SidebarProps = {
  className?: string;
  onToggleBookmarks: () => void;
  onToggleFilters: () => void;
  isBookmarksActive: boolean;
  isFiltersActive: boolean;
};

export function Sidebar({
  className,
  onToggleBookmarks,
  onToggleFilters,
  isBookmarksActive,
  isFiltersActive,
}: SidebarProps) {
  const { isActivePage, handleNavigation } = useSidebarNavigation();

  return (
    <nav className="card-shadow flex flex-col items-center justify-between rounded-2xl bg-primary-darker border border-primary-border backdrop-blur p-3 w-16 h-[63.5vh]">
      <div className="flex flex-col items-center mt-4 gap-6">
        <TooltipProvider>
          <Home
            isActive={
              isActivePage("Dashboard") &&
              !isBookmarksActive &&
              !isFiltersActive
            }
            onClick={() => {
              handleNavigation("Dashboard", "/");
              // Reset active states
              if (isBookmarksActive) onToggleBookmarks();
              if (isFiltersActive) onToggleFilters();
            }}
          />
          <Bookmarks isActive={isBookmarksActive} onClick={onToggleBookmarks} />
          <Filters isActive={isFiltersActive} onClick={onToggleFilters} />
        </TooltipProvider>
      </div>

      <div className="flex flex-col gap-2 items-center justify-center">
        <SignOutButton />
        <ZirpLogo className="h-9 w-9" />
      </div>
    </nav>
  );
}
