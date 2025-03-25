import { JobItem } from "@/types/job";
import { supabase } from "@/utils/supabase/client";
import {
  getFallbackJobs,
  getJobsFromLocalCache,
  storeJobsInLocalCache,
} from "@/utils/supabase/fallback";

type SearchParams = {
  title?: string;
  location?: string;
  salary?: string;
  page?: number;
  limit?: number;
};

// Simple cache to improve performance
const searchCache = new Map<string, { timestamp: number; data: JobItem[] }>();
const CACHE_TTL = 60 * 1000; // 1 minute cache
const MAX_RETRIES = 2;

let connectionFailedRecently = false;
let connectionFailedTime = 0;
const CONNECTION_RETRY_DELAY = 30 * 1000; // 30 seconds

// Check if the Supabase client is initialized properly
const checkSupabaseConnection = async (): Promise<boolean> => {
  try {
    // If we failed recently, don't try again too soon to avoid spamming
    if (
      connectionFailedRecently &&
      Date.now() - connectionFailedTime < CONNECTION_RETRY_DELAY
    ) {
      return false;
    }

    // Try to do a simple ping-like query to test connection
    const { data, error } = await supabase
      .from("jobs")
      .select("count", { count: "exact", head: true });

    if (error) {
      console.error("Supabase connection test error:", error);
      connectionFailedRecently = true;
      connectionFailedTime = Date.now();
      return false;
    }

    // Reset the failed flag if we succeed
    connectionFailedRecently = false;
    return true;
  } catch (error) {
    console.error("Supabase connection check failed:", error);
    connectionFailedRecently = true;
    connectionFailedTime = Date.now();
    return false;
  }
};

export const useJobSearch = async ({
  title,
  location,
  salary,
  page = 1,
  limit = 20,
}: SearchParams): Promise<JobItem[]> => {
  // Create a cache key from the search parameters
  const cacheKey = JSON.stringify({ title, location, salary, page, limit });

  // Check if we have a valid cache entry
  const cachedResult = searchCache.get(cacheKey);
  if (cachedResult && Date.now() - cachedResult.timestamp < CACHE_TTL) {
    return cachedResult.data;
  }

  // Try to get data from Supabase
  let supabaseJobs: JobItem[] = [];
  let fallbackUsed = false;

  // Check Supabase connection on first query attempt
  const isConnected = await checkSupabaseConnection();
  if (!isConnected) {
    console.warn("Supabase connection is not available, using fallback data");

    // Try to get data from local cache first
    const localCacheJobs = getJobsFromLocalCache();
    if (localCacheJobs.length > 0) {
      console.info("Using jobs from local cache");
      fallbackUsed = true;
      supabaseJobs = localCacheJobs;
    } else {
      // Use static fallback data as last resort
      console.info("Using static fallback job data");
      fallbackUsed = true;
      supabaseJobs = getFallbackJobs();
    }

    // Cache the fallback results
    searchCache.set(cacheKey, {
      timestamp: Date.now(),
      data: supabaseJobs,
    });

    return supabaseJobs;
  }

  // If connected, try to get real data
  let lastError: any = null;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      // Configure the query
      let query = supabase
        .from("jobs")
        .select("*")
        .order("timestamp", { ascending: false })
        .range((page - 1) * limit, page * limit - 1);

      if (title) {
        const titleFilter = `%${title}%`;
        query = query.ilike("title", titleFilter);
      }

      if (location) {
        const locationFilter = `%${location}%`;
        query = query.ilike("location", locationFilter);
      }

      if (salary) {
        const salaryFilter = `%${salary}%`;
        query = query.ilike("salary", salaryFilter);
      }

      const { data, error } = await query;

      if (error) {
        console.error(
          `Supabase error (attempt ${attempt + 1}/${MAX_RETRIES + 1}):`,
          error
        );

        // Special handling for auth errors
        if (
          error.message?.includes("No API key found") ||
          error.message?.includes("JWT")
        ) {
          console.error("API key or auth error - attempting to reinitialize");
          lastError = error;

          // Wait before next retry with increasing backoff
          if (attempt < MAX_RETRIES) {
            await new Promise((resolve) =>
              setTimeout(resolve, 1000 * Math.pow(2, attempt))
            );
          }
        } else {
          lastError = error;

          // Wait before next retry with increasing backoff
          if (attempt < MAX_RETRIES) {
            await new Promise((resolve) =>
              setTimeout(resolve, 1000 * Math.pow(2, attempt))
            );
          }
        }
        continue;
      }

      // Successfully got data from Supabase
      supabaseJobs = data as JobItem[];

      // Store in local cache for future fallback
      if (supabaseJobs.length > 0) {
        storeJobsInLocalCache(supabaseJobs);
      }

      // Store the result in cache
      searchCache.set(cacheKey, {
        timestamp: Date.now(),
        data: supabaseJobs,
      });

      return supabaseJobs;
    } catch (error) {
      console.error(
        `Error fetching jobs (attempt ${attempt + 1}/${MAX_RETRIES + 1}):`,
        error
      );
      lastError = error;

      // Wait before next retry with increasing backoff
      if (attempt < MAX_RETRIES) {
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 * Math.pow(2, attempt))
        );
        continue;
      }
    }
  }

  console.error(
    `Failed to fetch jobs after ${MAX_RETRIES + 1} attempts. Last error:`,
    lastError
  );

  // All attempts failed, try fallback data
  if (!fallbackUsed) {
    const localCacheJobs = getJobsFromLocalCache();
    if (localCacheJobs.length > 0) {
      console.info("Using jobs from local cache after failed attempts");
      supabaseJobs = localCacheJobs;
    } else {
      console.info("Using static fallback job data after failed attempts");
      supabaseJobs = getFallbackJobs();
    }

    // Cache the fallback results
    searchCache.set(cacheKey, {
      timestamp: Date.now(),
      data: supabaseJobs,
    });
  }

  // Return fallback data or cached data if available
  return supabaseJobs.length > 0 ? supabaseJobs : cachedResult?.data || [];
};

// Function to clear cache (can be called when data is known to have changed)
export const clearJobSearchCache = () => {
  searchCache.clear();
  connectionFailedRecently = false; // Reset the connection failed flag
};
