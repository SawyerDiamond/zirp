"use client";

import { Button } from "./ui/button";
import { signOut } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Logout } from "@/assets/icons";

const SignOutButton = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size={"icon"}
      onClick={handleSignOut}
      disabled={isLoading}>
      <Logout className="w-5 h-5" />
    </Button>
  );
};

export default SignOutButton;
