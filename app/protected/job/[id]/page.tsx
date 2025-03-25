"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import { JobItem } from "@/types/job";
import { Button } from "@/components/ui/button";
import { useBookmarks } from "@/hooks/useBookmarks";
import { Card } from "@/components/ui/card";
import Spinner from "@/components/Spinner";

export default function JobPage() {
  // Extract job ID from pathname instead of using params
  const pathname = usePathname();
  const jobId = pathname ? pathname.split("/").pop() : "";

  const router = useRouter();
  const [job, setJob] = useState<JobItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isBookmarkLoading, setIsBookmarkLoading] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const {
    addBookmark,
    removeBookmark,
    isBookmarked: checkIsBookmarked,
    isAuthenticated,
  } = useBookmarks();

  // Fetch job data when jobId is available
  useEffect(() => {
    if (!jobId) {
      router.push("/protected");
      return;
    }

    const fetchJob = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("jobs")
          .select("*")
          .eq("id", jobId)
          .single();

        if (error) {
          console.error("Error fetching job:", error);
          router.push("/protected");
          return;
        }

        setJob(data as JobItem);

        // Check bookmark status
        const status = await checkIsBookmarked(jobId);
        setIsBookmarked(status);
      } catch (error) {
        console.error("Error:", error);
        router.push("/protected");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId, router, checkIsBookmarked]);

  const handleBookmarkClick = async () => {
    if (!job) return;

    try {
      setIsBookmarkLoading(true);

      if (isBookmarked) {
        await removeBookmark(job.id);
        setIsBookmarked(false);
      } else {
        await addBookmark(job.id);
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error("Bookmark error:", error);
    } finally {
      setIsBookmarkLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <Spinner />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
        <h2 className="text-2xl font-bold mb-4">Job not found</h2>
        <Button onClick={handleBack}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Button
        variant="ghost"
        onClick={handleBack}
        className="mb-6 hover:bg-primary-border/20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 mr-2">
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back to Jobs
      </Button>

      {isAuthenticated === false && (
        <div className="mb-4 p-3 bg-blue-500/20 border border-blue-500 rounded-lg">
          <p className="text-sm text-blue-300">
            Note: You're not signed in. Bookmarks will be saved locally on this
            browser but won't sync across devices.
          </p>
        </div>
      )}

      <Card className="card-shadow rounded-2xl bg-primary-darker border backdrop-blur border-secondary-border overflow-hidden">
        <div className="h-2 w-full bg-gradient-to-r from-blue-500 to-blue-700"></div>

        <div className="p-8">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex items-center gap-5">
              <img
                src={
                  logoFailed
                    ? `/icons/logos/logo-${Math.floor(Math.random() * 8) + 1}.svg`
                    : job.logo_url
                }
                onError={(e) => {
                  setLogoFailed(true);
                  const randomLogo = `/icons/logos/logo-${Math.floor(Math.random() * 8) + 1}.svg`;
                  e.currentTarget.src = randomLogo;
                }}
                className="w-20 h-20 rounded-xl shadow-md"
              />
              <div>
                <h1 className="text-3xl font-bold mb-1">{job.title}</h1>
                <div className="flex items-center gap-2 text-gray-300">
                  <span className="font-semibold text-lg">{job.company}</span>
                  <span className="text-gray-500">•</span>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 mr-1">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{job.location}</span>
                  </div>
                  {job.salary && (
                    <>
                      <span className="text-gray-500">•</span>
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 mr-1">
                          <circle cx="12" cy="12" r="8" />
                          <path d="M8 12h8" />
                          <path d="M12 8v8" />
                        </svg>
                        <span>{job.salary}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="secondary"
                onClick={handleBookmarkClick}
                disabled={isBookmarkLoading}
                className={`flex gap-2 ${
                  isBookmarked
                    ? "bg-blue-500/20 border-blue-500 text-blue-400"
                    : "border-gray-600"
                }`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill={isBookmarked ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5">
                  <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                </svg>
                {isBookmarked ? "Bookmarked" : "Bookmark"}
              </Button>

              <Button
                onClick={() => window.open(job.apply_url, "_blank")}
                className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 px-6">
                Apply Now
              </Button>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Job Description
            </h2>
            <div className="prose prose-invert max-w-none">
              <div className="whitespace-pre-line text-gray-300 leading-relaxed">
                {job.description}
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-gray-800">
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <div>
                Posted:{" "}
                {new Date(job.created_at || job.timestamp).toLocaleDateString()}
              </div>
              <div>•</div>
              <div>ID: {job.id}</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
