import { JobItem } from "@/types/job";
import { supabase } from "@/utils/supabase/client";

type SearchParams = {
  title?: string;
  location?: string;
};

export const useJobSearch = async ({
  title,
  location,
}: SearchParams): Promise<JobItem[]> => {
  console.log("useJobSearch called with:", { title, location });
  let query = supabase.from("jobs").select("*");

  if (title) {
    const titleFilter = `%${title}%`;
    query = query.ilike("title", titleFilter);
    console.log("Querying with title filter:", titleFilter);
  }
  if (location) {
    const locationFilter = `%${location}%`;
    query = query.ilike("location", locationFilter);
    console.log("Querying with location filter:", locationFilter);
  }

  console.log("Executing Supabase query:", query.toString());

  const { data, error } = await query;

  if (error) {
    console.error("Supabase error:", error);
    return [];
  }

  console.log("Supabase data received:", data);
  return data as JobItem[];
};
