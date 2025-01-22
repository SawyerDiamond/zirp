import { supabase } from "@/utils/supabase/client";

export async function signOut() {
  console.log("Starting sign out...");
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error signing out:", error);
    throw error;
  }

  console.log("Sign out successful.");
  return { success: true };
}
