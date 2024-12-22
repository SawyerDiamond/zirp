"use client";
import { useRouter, usePathname } from "next/navigation";
export function useSidebarNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  function isActivePage(pageName: string) {
    if (pageName === "Dashboard" && pathname === "/") return true;
    if (pageName === "Bookmarks" && pathname === "/bookmarks") return true;
    return false;
  }

  function handleNavigation(pageName: string, route: string) {
    router.push(route);
  }

  return { isActivePage, handleNavigation };
}