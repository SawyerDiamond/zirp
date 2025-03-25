"use client";

import { useState } from "react";
import {
  debugSupabaseConnection,
  debugSupabaseHeaders,
} from "@/utils/supabase/debug";
import {
  checkSupabaseEnv,
  getSupabaseEnvReport,
} from "@/utils/supabase/check-env";
import { supabase } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";

export function SupabaseDebug() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [result, setResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"connection" | "env">(
    "connection"
  );

  const envInfo = checkSupabaseEnv();

  const testConnection = async () => {
    setStatus("loading");
    try {
      // Log headers for debugging
      debugSupabaseHeaders();

      // Test connection
      const connectionResult = await debugSupabaseConnection();
      setResult(connectionResult);
      setStatus(connectionResult.status);
    } catch (error) {
      console.error("Debug error:", error);
      setResult({ error });
      setStatus("error");
    }
  };

  const clearStorage = () => {
    try {
      // Clear Supabase storage
      localStorage.removeItem("sb-kodtffksvyqnowrasymw-auth-token");
      localStorage.removeItem("zirp-auth");

      // Force refresh page
      window.location.reload();
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-2 right-2 px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-md opacity-70 hover:opacity-100">
        Debug
      </button>
    );
  }

  return (
    <div className="fixed bottom-2 right-2 p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-w-md w-full z-50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold text-white">
          Supabase Connection Debug
        </h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div className="flex border-b border-gray-700 mb-4">
        <button
          onClick={() => setActiveTab("connection")}
          className={`px-3 py-2 text-xs ${
            activeTab === "connection"
              ? "border-b-2 border-blue-500 text-blue-400"
              : "text-gray-400 hover:text-gray-200"
          }`}>
          Connection
        </button>
        <button
          onClick={() => setActiveTab("env")}
          className={`px-3 py-2 text-xs ${
            activeTab === "env"
              ? "border-b-2 border-blue-500 text-blue-400"
              : "text-gray-400 hover:text-gray-200"
          }`}>
          Environment
        </button>
      </div>

      {activeTab === "connection" && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              onClick={testConnection}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs py-1 px-2 rounded"
              disabled={status === "loading"}>
              Test Connection
            </Button>
            <Button
              onClick={clearStorage}
              className="bg-red-600 hover:bg-red-700 text-white text-xs py-1 px-2 rounded">
              Clear Auth Storage
            </Button>
          </div>

          {status === "loading" && (
            <div className="text-gray-300 text-xs">Testing connection...</div>
          )}

          {status === "success" && (
            <div className="bg-green-900/30 border border-green-800 p-2 rounded text-xs">
              <div className="text-green-300 font-medium mb-1">
                ✓ Connection successful
              </div>
              <div className="text-gray-300">{result?.message}</div>
              {result?.details && (
                <pre className="mt-2 text-gray-400 text-xs overflow-auto max-h-24">
                  {JSON.stringify(result.details, null, 2)}
                </pre>
              )}
            </div>
          )}

          {status === "error" && (
            <div className="bg-red-900/30 border border-red-800 p-2 rounded text-xs">
              <div className="text-red-300 font-medium mb-1">
                ✗ Connection failed
              </div>
              <div className="text-gray-300">{result?.message}</div>
              {result?.details && (
                <pre className="mt-2 text-gray-400 text-xs overflow-auto max-h-24">
                  {JSON.stringify(result.details, null, 2)}
                </pre>
              )}
              <div className="mt-2 text-gray-300">
                <p>Possible solutions:</p>
                <ul className="list-disc list-inside mt-1">
                  <li>
                    Check if API key is correctly set in .env or localStorage
                  </li>
                  <li>Try clearing local storage and refreshing</li>
                  <li>Ensure Supabase service is running</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "env" && (
        <div className="space-y-4">
          <div className="flex justify-between text-xs mb-2">
            <div className="font-medium text-gray-200">
              Environment Variables
            </div>
            <div className="text-gray-400">
              {envInfo.hasUrl && envInfo.hasAnonKey
                ? "✓ All set"
                : "⚠️ Issues found"}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  envInfo.hasUrl ? "bg-green-500" : "bg-red-500"
                }`}></div>
              <span className="text-gray-300">SUPABASE_URL</span>
            </div>
            <div className="text-right text-gray-400">
              {envInfo.hasUrl ? envInfo.urlValue : "Not set"}
            </div>

            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  envInfo.hasAnonKey ? "bg-green-500" : "bg-red-500"
                }`}></div>
              <span className="text-gray-300">SUPABASE_ANON_KEY</span>
            </div>
            <div className="text-right text-gray-400">
              {envInfo.hasAnonKey ? "✓ Set" : "Not set"}
            </div>
          </div>

          {envInfo.recommendations.length > 0 && (
            <div className="mt-3 border-t border-gray-700 pt-3">
              <div className="text-gray-300 font-medium text-xs mb-2">
                Recommendations:
              </div>
              <ul className="text-gray-400 text-xs list-disc list-inside">
                {envInfo.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-4">
            <div className="text-xs text-gray-400">
              For further help, add your Supabase URL and anon key to:
            </div>
            <code className="block mt-1 p-2 bg-gray-900 rounded text-xs text-gray-300 overflow-x-auto">
              .env.local
            </code>
          </div>
        </div>
      )}
    </div>
  );
}
