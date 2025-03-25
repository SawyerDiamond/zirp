import { useState, useEffect } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { JobItem } from "@/types/job";
import { Button } from "@/components/ui/button";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useRouter } from "next/navigation";

export function JobCard({ job }: { job: JobItem }) {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const [hasError, setHasError] = useState(false);

  const {
    addBookmark,
    removeBookmark,
    isBookmarked: checkIsBookmarked,
    isAuthenticated,
  } = useBookmarks();

  // Check if job is bookmarked on load
  useEffect(() => {
    const checkBookmarkStatus = async () => {
      try {
        const status = await checkIsBookmarked(job.id);
        setIsBookmarked(status);
      } catch (error) {
        console.error("Error checking bookmark status:", error);
        // Don't set error state here, as bookmark failure shouldn't affect the whole card
      }
    };

    if (job && job.id) {
      checkBookmarkStatus();
    }
  }, [job?.id, checkIsBookmarked]);

  const handleBookmarkClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening job page when clicking bookmark

    try {
      setIsLoading(true);

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
      setIsLoading(false);
    }
  };

  const navigateToJob = () => {
    if (!job || !job.id) {
      return;
    }
    router.push(`/protected/job/${job.id}`);
  };

  // If the job data is invalid, render a fallback card
  if (!job || !job.title || hasError) {
    return (
      <Card className="card-shadow rounded-2xl bg-primary-darker border backdrop-blur border-secondary-border overflow-hidden opacity-75">
        <CardHeader className="flex flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gray-700 animate-pulse"></div>
            <div>
              <div className="h-5 w-48 bg-gray-700 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-32 bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="h-8 w-8 rounded-full bg-gray-700 animate-pulse"></div>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card
      className="card-shadow rounded-2xl bg-primary-darker border backdrop-blur border-secondary-border overflow-hidden cursor-pointer hover:bg-opacity-80 transition-all"
      onClick={navigateToJob}>
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={
              logoFailed
                ? `/icons/logos/logo-${Math.floor(Math.random() * 8) + 1}.svg`
                : job.logo_url ||
                  `/icons/logos/logo-${Math.floor(Math.random() * 8) + 1}.svg`
            }
            onError={(e) => {
              setLogoFailed(true);
              const randomLogo = `/icons/logos/logo-${Math.floor(Math.random() * 8) + 1}.svg`;
              e.currentTarget.src = randomLogo;
            }}
            className="w-12 h-12 rounded-xl shadow-md"
          />
          <div>
            <h3 className="text-lg font-semibold w-[30vw] truncate">
              {job.title}
            </h3>

            <div className="flex items-center gap-2">
              <h4 className="text-sm text-muted-foreground">{job.company}</h4>
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
                className="h-4 w-4">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="text-sm">{job.location || "Remote"}</span>

              {job.salary && (
                <>
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
                    className="h-4 w-4">
                    <circle cx="12" cy="12" r="8" />
                    <path d="M8 12h8" />
                    <path d="M12 8v8" />
                  </svg>
                  <span className="text-sm font-semibold">{job.salary}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bookmark Button */}
        <Button
          variant="ghost"
          size="icon"
          className={`h-8 w-8 rounded-full transition-colors relative ${
            isBookmarked
              ? "text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
              : "hover:bg-primary-border/30"
          }`}
          onClick={handleBookmarkClick}
          disabled={isLoading}>
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
          {isAuthenticated === false && isBookmarked && (
            <span className="absolute -bottom-1 -right-1 h-2 w-2 bg-blue-400 rounded-full"></span>
          )}
          <span className="sr-only">Bookmark</span>
        </Button>
      </CardHeader>
    </Card>
  );
}
