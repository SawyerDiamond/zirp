import { useState } from "react";
import { useNavigate } from "@remix-run/react";

export function useSidebarNavigation() {
  const [currentPage, setCurrentPage] = useState("Home");
  const navigate = useNavigate();

  const isActivePage = (pageName: string) => currentPage === pageName;

  const handleNavigation = (pageName: string, path: string) => {
    setCurrentPage(pageName);
    navigate(path);
  };

  return { isActivePage, handleNavigation };
}
