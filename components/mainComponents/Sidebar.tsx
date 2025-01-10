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
};
export function Sidebar({ className }: SidebarProps) {
  const { isActivePage, handleNavigation } = useSidebarNavigation();

  return (
    <nav className="card-shadow flex flex-col items-center justify-between rounded-2xl bg-primary border border-primary-border backdrop-blur p-3 w-16 h-[63.5vh]">
      <div className="flex flex-col items-center mt-4 gap-6">
        <TooltipProvider>
          <Home
            isActive={isActivePage("Dashboard")}
            onClick={() => handleNavigation("Dashboard", "/")}
          />
          <Bookmarks
            isActive={isActivePage("Bookmarks")}
            onClick={() => handleNavigation("Bookmarks", "/bookmarks")}
          />
          <Filters />
        </TooltipProvider>
      </div>

      <div className="flex flex-col gap-2 items-center justify-center">
        <SignOutButton />
        <ZirpLogo className="h-9 w-9" />
      </div>
    </nav>
  );
}
