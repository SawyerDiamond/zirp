"use client";

import { Button } from "./ui/button";
import { signOut } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
    <Button onClick={handleSignOut} disabled={isLoading}>
      {isLoading ? "Signing out..." : "Sign Out"}
    </Button>
  );
};

export default SignOutButton;
