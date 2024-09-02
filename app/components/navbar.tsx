import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { HomeSVG, Bookmarks, CogSVG, SearchSVG } from "../assets/icons";
import { JobsiteLogo } from "../assets/JobsiteLogo";

export function Navbar() {
  const [currentPage, setCurrentPage] = useState("Home");
  const navigate = useNavigate();
  const isActivePage = (pageName: string) => currentPage === pageName;
  return (
    <nav className="absolute z-50 flex h-[calc(100vh_-_1rem)] flex-col items-center justify-between rounded-[16px] bg-[var(--primaryBG)] m-2 mr-3 p-3">
      <div className="flex items-center justify-center">
        <JobsiteLogo className="h-11 w-11" />
        <span className="sr-only">Jobsite</span>
      </div>
      <div className="flex flex-col items-center gap-4">
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
                className={isActivePage("Search") ? "secondaryBG" : ""}
                onClick={() => {
                  setCurrentPage("Search");
                  navigate("/search");
                }}>
                <SearchSVG className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Search</TooltipContent>
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
          </Tooltip>
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-10 w-10">
            <AvatarFallback>U</AvatarFallback>
            <span className="sr-only">Toggle user menu</span>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>My Account</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
