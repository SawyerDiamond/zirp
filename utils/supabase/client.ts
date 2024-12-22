import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("supabaseUrl and supabaseAnonKey must be provided.");
}

export const createClient = () => {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey);
};
