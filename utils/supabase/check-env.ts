/**
 * Utility to check and provide diagnostics for Supabase environment variables
 */

export function checkSupabaseEnv(): {
  hasUrl: boolean;
  hasAnonKey: boolean;
  urlValue: string;
  recommendations: string[];
} {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const hasUrl = !!supabaseUrl;
  const hasAnonKey = !!supabaseAnonKey;
  let urlValue = "";
  const recommendations: string[] = [];

  // Only show a masked URL for security
  if (hasUrl) {
    // Extract and mask domain only
    try {
      const url = new URL(supabaseUrl as string);
      urlValue = `https://***${url.host.slice(-12)}`;
    } catch (e) {
      urlValue = "Invalid URL format";
      recommendations.push(
        "Your NEXT_PUBLIC_SUPABASE_URL appears to be incorrectly formatted."
      );
    }
  }

  if (!hasUrl) {
    recommendations.push(
      "Add NEXT_PUBLIC_SUPABASE_URL to your .env.local file."
    );
  }

  if (!hasAnonKey) {
    recommendations.push(
      "Add NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file."
    );
  }

  if (hasUrl && hasAnonKey) {
    recommendations.push(
      "Both environment variables are set. If you're still having issues, check that their values are correct."
    );
  }

  return {
    hasUrl,
    hasAnonKey,
    urlValue,
    recommendations,
  };
}

/**
 * Utility to get a verbose report on environment variables
 */
export function getSupabaseEnvReport(): string {
  const checkResult = checkSupabaseEnv();

  let report = "SUPABASE ENVIRONMENT REPORT\n";
  report += "===========================\n\n";

  report += `NEXT_PUBLIC_SUPABASE_URL: ${checkResult.hasUrl ? "✓ SET" : "✗ MISSING"}\n`;
  if (checkResult.hasUrl) {
    report += `Value: ${checkResult.urlValue}\n`;
  }

  report += `NEXT_PUBLIC_SUPABASE_ANON_KEY: ${checkResult.hasAnonKey ? "✓ SET" : "✗ MISSING"}\n\n`;

  report += "RECOMMENDATIONS:\n";
  if (checkResult.recommendations.length > 0) {
    checkResult.recommendations.forEach((rec, i) => {
      report += `${i + 1}. ${rec}\n`;
    });
  } else {
    report +=
      "No recommendations - all variables appear to be set correctly.\n";
  }

  report +=
    "\nNOTE: If environment variables are set but not being loaded, ensure you are correctly loading them in your Next.js app.";

  return report;
}
