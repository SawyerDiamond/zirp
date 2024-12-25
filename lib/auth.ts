import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error signing out:", error);
    throw error;
  }

  return { success: true };
}
