// /app/routes/api/search.ts

import { json, LoaderFunction } from "@remix-run/node";
import { getSearch } from "~/api/jSearchAPI";
import type { JobItem } from "~/types/job";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const jobTitle = url.searchParams.get("jobTitle");
  const location = url.searchParams.get("location");

  console.log("API Request Received:");
  console.log(`Job Title: ${jobTitle}`);
  console.log(`Location: ${location}`);

  if (!jobTitle || !location) {
    console.warn("Missing jobTitle or location parameters.");
    return json({ error: "Missing jobTitle or location" }, { status: 400 });
  }

  try {
    const results: JobItem[] = await getSearch(jobTitle, location);
    console.log(`Number of jobs received: ${results.length}`);
    return json({ data: results });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
};
