"use client";

import { Button } from "./ui/button";
import { signOutAction } from "@/app/actions";
import { Logout } from "@/assets/icons";
import { useTransition } from "react";

const SignOutButton = () => {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(() => {
      signOutAction();
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleSignOut}
      disabled={isPending}>
      <Logout className="w-5 h-5" />
    </Button>
  );
};

export default SignOutButton;
