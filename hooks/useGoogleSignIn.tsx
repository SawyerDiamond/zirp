"use client";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export const useGoogleSignIn = () => {
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.error("Error signing in with Google:", error.message);
      setError(error.message);
    }
  };

  return { handleGoogleSignIn, error };
};
