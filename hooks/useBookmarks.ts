import { useState, useEffect, useCallback } from "react";
import { JobItem } from "@/types/job";
import { supabase } from "@/utils/supabase/client";

// Simple cache for bookmark status
const bookmarkStatusCache = new Map<
  string,
  { timestamp: number; isBookmarked: boolean }
>();
const CACHE_TTL = 60 * 1000; // 1 minute cache

// Add auth check cache to prevent too many auth checks
let lastAuthCheck = 0;
let cachedAuthUser: any = null;
const AUTH_CHECK_THROTTLE = 10 * 1000; // 10 seconds

// Store bookmarks locally when auth fails
let localBookmarks: Record<string, boolean> = {};

// Try to load local bookmarks from localStorage if available
try {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("localBookmarks");
    if (saved) {
      localBookmarks = JSON.parse(saved);
    }
  }
} catch (e) {
  console.error("Failed to load local bookmarks:", e);
}

// Function to save local bookmarks
const saveLocalBookmarks = () => {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem("localBookmarks", JSON.stringify(localBookmarks));
    }
  } catch (e) {
    console.error("Failed to save local bookmarks:", e);
  }
};

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Function to fetch the current user
  const getCurrentUser = async () => {
    try {
      // Check if we have a recent auth check we can use
      const now = Date.now();
      if (cachedAuthUser && now - lastAuthCheck < AUTH_CHECK_THROTTLE) {
        return cachedAuthUser;
      }

      const { data, error } = await supabase.auth.getUser();
      lastAuthCheck = now;

      if (error) {
        // Only log unexpected errors, not the common auth session missing error
        if (
          !(
            error instanceof Error &&
            error.message.includes("Auth session missing")
          )
        ) {
          console.error("Error getting current user:", error);
        }
        setIsAuthenticated(false);
        cachedAuthUser = null;
        return null;
      }

      if (!data.user) {
        setIsAuthenticated(false);
        cachedAuthUser = null;
        return null;
      }

      setIsAuthenticated(true);
      cachedAuthUser = data.user;
      return data.user;
    } catch (e) {
      // Only log unexpected errors
      if (!(e instanceof Error && e.message.includes("Auth session missing"))) {
        console.error("Exception in getCurrentUser:", e);
      }
      setIsAuthenticated(false);
      cachedAuthUser = null;
      return null;
    }
  };

  // Function to fetch user's bookmarks
  const fetchBookmarks = useCallback(async () => {
    try {
      setLoading(true);

      // Get current user
      const user = await getCurrentUser();

      if (!user) {
        // Load local bookmarks if not authenticated
        if (isAuthenticated === false) {
          // Convert local bookmarks to JobItem structure if we have job data
          const localBookmarkIds = Object.entries(localBookmarks)
            .filter(([_, isBookmarked]) => isBookmarked)
            .map(([id]) => id);

          if (localBookmarkIds.length > 0) {
            try {
              // Try to fetch job details for local bookmarks
              const { data: jobs } = await supabase
                .from("jobs")
                .select("*")
                .in("id", localBookmarkIds);

              if (jobs && jobs.length > 0) {
                setBookmarks(jobs as JobItem[]);
              }
            } catch (e) {
              console.error("Failed to fetch local bookmark job details:", e);
            }
          } else {
            setBookmarks([]);
          }
        } else {
          setBookmarks([]);
        }

        setLoading(false);
        return;
      }

      // Get bookmarks for current user from Supabase
      const { data: bookmarkIds, error: bookmarkError } = await supabase
        .from("bookmarks")
        .select("job_id")
        .eq("user_id", user.id);

      if (bookmarkError) {
        console.error("Error fetching bookmarks:", bookmarkError);
        setLoading(false);
        return;
      }

      if (!bookmarkIds || bookmarkIds.length === 0) {
        setBookmarks([]);
        setLoading(false);
        return;
      }

      // Get job details for bookmarks
      const ids = bookmarkIds.map((b) => b.job_id);
      const { data: jobs, error: jobsError } = await supabase
        .from("jobs")
        .select("*")
        .in("id", ids);

      if (jobsError) {
        console.error("Error fetching bookmarked jobs:", jobsError);
        setLoading(false);
        return;
      }

      setBookmarks(jobs as JobItem[]);
    } catch (error) {
      console.error("Error in bookmark fetching:", error);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const addBookmark = async (jobId: string) => {
    try {
      // Get current user
      const user = await getCurrentUser();

      if (!user) {
        // Use local bookmarking if not authenticated
        localBookmarks[jobId] = true;
        saveLocalBookmarks();

        // Update cache
        bookmarkStatusCache.set(jobId, {
          timestamp: Date.now(),
          isBookmarked: true,
        });

        // Refresh bookmarks to update UI
        await fetchBookmarks();
        return true;
      }

      // User is authenticated, use Supabase
      // Check if bookmark already exists
      const { data: existing } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", user.id)
        .eq("job_id", jobId)
        .single();

      if (existing) {
        // Already bookmarked, update cache
        bookmarkStatusCache.set(jobId, {
          timestamp: Date.now(),
          isBookmarked: true,
        });
        return true;
      }

      // Add bookmark
      const { error } = await supabase
        .from("bookmarks")
        .insert({ user_id: user.id, job_id: jobId });

      if (error) {
        console.error("Error adding bookmark:", error);
        return false;
      }

      // Update cache
      bookmarkStatusCache.set(jobId, {
        timestamp: Date.now(),
        isBookmarked: true,
      });

      // Refresh bookmarks
      await fetchBookmarks();
      return true;
    } catch (error) {
      console.error("Error in bookmark addition:", error);
      return false;
    }
  };

  const removeBookmark = async (jobId: string) => {
    try {
      // Get current user
      const user = await getCurrentUser();

      if (!user) {
        // Use local bookmarking if not authenticated
        localBookmarks[jobId] = false;
        saveLocalBookmarks();

        // Update cache
        bookmarkStatusCache.set(jobId, {
          timestamp: Date.now(),
          isBookmarked: false,
        });

        // Update local state
        setBookmarks((prev) => prev.filter((job) => job.id !== jobId));
        return true;
      }

      // User is authenticated, use Supabase
      // Remove bookmark
      const { error } = await supabase
        .from("bookmarks")
        .delete()
        .eq("user_id", user.id)
        .eq("job_id", jobId);

      if (error) {
        console.error("Error removing bookmark:", error);
        return false;
      }

      // Update cache
      bookmarkStatusCache.set(jobId, {
        timestamp: Date.now(),
        isBookmarked: false,
      });

      // Update local state
      setBookmarks((prev) => prev.filter((job) => job.id !== jobId));
      return true;
    } catch (error) {
      console.error("Error in bookmark removal:", error);
      return false;
    }
  };

  const isBookmarked = async (jobId: string) => {
    try {
      // Check cache first
      const cachedStatus = bookmarkStatusCache.get(jobId);
      if (cachedStatus && Date.now() - cachedStatus.timestamp < CACHE_TTL) {
        return cachedStatus.isBookmarked;
      }

      // Get current user
      const user = await getCurrentUser();

      if (!user) {
        // Use local bookmarks if not authenticated
        const isBookmarkedLocally = !!localBookmarks[jobId];

        // Update cache
        bookmarkStatusCache.set(jobId, {
          timestamp: Date.now(),
          isBookmarked: isBookmarkedLocally,
        });

        return isBookmarkedLocally;
      }

      // User is authenticated, check in Supabase
      // Check if bookmark exists
      const { data, error } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", user.id)
        .eq("job_id", jobId)
        .single();

      const result = !(error || !data);

      // Update cache
      bookmarkStatusCache.set(jobId, {
        timestamp: Date.now(),
        isBookmarked: result,
      });

      return result;
    } catch (error) {
      console.error("Error checking bookmark status:", error);
      // Fallback to local bookmarks in case of error
      return !!localBookmarks[jobId];
    }
  };

  // Load bookmarks on mount
  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  return {
    bookmarks,
    loading,
    addBookmark,
    removeBookmark,
    isBookmarked,
    refreshBookmarks: fetchBookmarks,
    isAuthenticated,
  };
};
