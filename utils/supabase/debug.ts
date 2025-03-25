import { supabase } from "./client";

/**
 * Debug utility to check Supabase configuration and connection
 */
export const debugSupabaseConnection = async (): Promise<{
  status: "success" | "error";
  message: string;
  details?: any;
}> => {
  try {
    // Print configuration info (without sensitive keys)
    console.info(
      "Supabase URL:",
      process.env.NEXT_PUBLIC_SUPABASE_URL || "Using fallback URL"
    );
    console.info(
      "API key present:",
      !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    // Test connection with a simple query
    const start = Date.now();
    const { data, error, status, statusText } = await supabase
      .from("jobs")
      .select("count", { count: "exact", head: true });

    const elapsed = Date.now() - start;

    if (error) {
      return {
        status: "error",
        message: `Connection failed: ${error.message}`,
        details: {
          error,
          httpStatus: status,
          statusText,
          elapsed,
        },
      };
    }

    return {
      status: "success",
      message: `Connected successfully in ${elapsed}ms`,
      details: {
        status,
        statusText,
        elapsed,
      },
    };
  } catch (error: any) {
    return {
      status: "error",
      message: `Exception during connection test: ${error.message}`,
      details: error,
    };
  }
};

/**
 * Utility to check if headers are correctly set in Supabase client
 */
export const debugSupabaseHeaders = (): void => {
  // Access the global.headers object from the Supabase client if available
  try {
    // @ts-ignore - accessing internal properties for debugging
    const headers = supabase?.restClient?.headers;
    if (headers) {
      console.info("Supabase headers:", {
        // Don't log the full API key for security
        apikey: headers.apikey ? "***present***" : "***missing***",
        authorization: headers.authorization
          ? "***present***"
          : "***missing***",
        ...Object.fromEntries(
          Object.entries(headers).filter(
            ([key]) => !["apikey", "authorization"].includes(key.toLowerCase())
          )
        ),
      });
    } else {
      console.warn("Could not access Supabase headers for debugging");
    }
  } catch (error) {
    console.error("Error accessing Supabase headers:", error);
  }
};
