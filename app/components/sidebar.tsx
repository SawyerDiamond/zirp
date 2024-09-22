import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip";
import { Button } from "./ui/button";
import { HomeSVG, Bookmarks, CogSVG } from "../assets/icons";
import { JobsiteLogo } from "../assets/JobsiteLogo";

type SidebarProps = {
  className?: string;
};
export function Sidebar({ className }: SidebarProps) {
  const [currentPage, setCurrentPage] = useState("Home");
  const navigate = useNavigate();
  const isActivePage = (pageName: string) => currentPage === pageName;
  return (
    <nav className="card-shadow flex flex-col items-center justify-between rounded-2xl bg-[var(--primaryBG)] border border-[var(--primaryBorder)] backdrop-blur-md p-3 w-16 gap-[25vh] h-auto">
      <div className="flex flex-col items-center mt-4 gap-10">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="default"
                size="icon"
                className={isActivePage("Home") ? "secondaryBG" : ""}
                onClick={() => {
                  setCurrentPage("Home");
                  navigate("/home");
                }}>
                <HomeSVG className="h-5 w-5" />
                <span className="sr-only">Home</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Home</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="default"
                size="icon"
                className={
                  isActivePage("Bookmarks")
                    ? "relative after:content-[''] after:absolute after:top-[-4px] after:left-[-4px] after:right-[-4px] after:bottom-[-4px] after:border-2 after:border-[var(--primary)] after:rounded-md after:z-[-1]"
                    : ""
                }
                onClick={() => {
                  setCurrentPage("Bookmarks");
                  navigate("/bookmarks");
                }}>
                <Bookmarks className="h-5 w-5" />
                <span className="sr-only">Bookmarks</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Bookmarks</TooltipContent>
          </Tooltip>{" "}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="default"
                size="icon"
                className={
                  isActivePage("Settings")
                    ? "relative after:content-[''] after:absolute after:top-[-4px] after:left-[-4px] after:right-[-4px] after:bottom-[-4px] after:border-2 after:border-[var(--primary)] after:rounded-md after:z-[-1]"
                    : ""
                }
                onClick={() => {
                  setCurrentPage("Settings");
                  navigate("/settings");
                }}>
                <CogSVG className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex items-center justify-center">
        <JobsiteLogo className="h-9 w-9" />
        <span className="sr-only">Jobsite Logo</span>
      </div>
    </nav>
  );
}
