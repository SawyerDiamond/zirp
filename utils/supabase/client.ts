import { createClient } from "@supabase/supabase-js";

// Try to get from env vars first
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://kodtffksvyqnowrasymw.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvZHRmZmtzdnlxbm93cmFzeW13Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMwMDc3OTIsImV4cCI6MjA0ODU4Mzc5Mn0.i_8JVzin17OMnNMADOBR1hfNAlMQ_Y8ElfgzDlC9U7Y";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and anon key are required.");
}

// Create client with additional options for better error handling
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: "zirp-auth",
    // Set debug to false to suppress automatic error logs
    debug: false,
  },
  global: {
    // Set fetcher options to improve network reliability
    fetch: (url, options = {}) => {
      const timeout = 30000; // 30 seconds
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      // Ensure headers object exists and convert to proper type
      const headers = new Headers(options.headers || {});

      // Add the API key header explicitly
      // The apikey is normally added by the Supabase client, but we're ensuring it's there
      if (!headers.has("apikey") && !headers.has("Authorization")) {
        headers.set("apikey", supabaseAnonKey);
      }

      // Add cache control
      headers.set("Cache-Control", "no-cache");

      return fetch(url, {
        ...options,
        signal: controller.signal,
        headers,
      })
        .then((response) => {
          clearTimeout(timeoutId);
          return response;
        })
        .catch((error) => {
          clearTimeout(timeoutId);
          // Log error details for debugging
          if (error.name !== "AbortError") {
            console.error("Fetch error:", error, "URL:", url);
          }
          throw error;
        });
    },
    headers: {
      "x-client-info": "ZIRP Web App",
      apikey: supabaseAnonKey,
    },
  },
  realtime: {
    timeout: 30000, // 30 seconds for realtime
  },
});
