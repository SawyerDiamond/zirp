"use client";
import { useState, useEffect } from "react";
import { TopBox } from "@/components/mainComponents/TopBox";
import { Sidebar } from "@/components/mainComponents/Sidebar";
import { JobItem } from "@/types/job";
import { BGLogo } from "@/assets/BGLogo";
import { JobCard } from "@/components/mainComponents/JobCard";
import Spinner from "@/components/Spinner";
import { FilterPanel } from "@/components/mainComponents/FilterPanel";
import { useJobSearch, clearJobSearchCache } from "@/hooks/useJobSearch";
import { useBookmarks } from "@/hooks/useBookmarks";
import { Particles } from "@tsparticles/engine";
import { SupabaseDebug } from "@/components/SupabaseDebug";

export function Home() {
  const [searchResults, setSearchResults] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<{
    title?: string;
    location?: string;
    industries?: string[];
    durations?: string[];
    paid?: string[];
  }>({
    title: "",
    location: "",
  });

  const {
    bookmarks,
    loading: bookmarksLoading,
    refreshBookmarks,
    isAuthenticated,
  } = useBookmarks();

  // Function to perform job search
  const performSearch = async (page = 1) => {
    setIsLoading(true);
    setLoadError(null);

    try {
      const searchFilters = {
        title: searchParams.title,
        location: searchParams.location,
        page,
        limit: 20,
      };

      const results = await useJobSearch(searchFilters);

      if (page === 1) {
        setSearchResults(results);
      } else {
        setSearchResults((prev) => [...prev, ...results]);
      }

      setCurrentPage(page);
    } catch (error) {
      console.error("Error searching jobs:", error);
      setLoadError("Failed to load jobs. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to retry loading after a failure
  const handleRetry = () => {
    clearJobSearchCache(); // Clear cache to force a fresh load
    performSearch(1);
  };

  // Initial load of jobs
  useEffect(() => {
    if (!showBookmarks) {
      performSearch();
    }
  }, [showBookmarks]);

  // Handle search from SearchBox
  const handleSearch = async (results: { title: string; location: string }) => {
    setSearchParams((prev) => ({
      ...prev,
      title: results.title || "",
      location: results.location || "",
    }));

    // Reset to first page and show all jobs view
    setShowBookmarks(false);
    setShowFilters(false);
    performSearch(1);
  };

  // Handle filter application
  const handleApplyFilters = (filters: {
    industries: string[];
    durations: string[];
    paid: string[];
  }) => {
    setSearchParams((prev) => ({
      ...prev,
      industries: filters.industries,
      durations: filters.durations,
      paid: filters.paid,
    }));

    // For simplicity, we'll just apply a title filter to match industries
    // In a real implementation, you would have proper filtering in your backend
    if (filters.industries.length > 0) {
      const industryFilter = filters.industries.join("|");
      setSearchParams((prev) => ({ ...prev, title: industryFilter }));
      performSearch(1);
    } else {
      performSearch(1);
    }

    // Close filters panel
    setShowFilters(false);
  };

  // Handle loading more jobs
  const handleLoadMore = () => {
    if (!isLoading && !showBookmarks) {
      performSearch(currentPage + 1);
    }
  };

  // Toggle bookmark view
  const toggleBookmarks = () => {
    setShowBookmarks(!showBookmarks);
    if (!showBookmarks) {
      refreshBookmarks();
    }
    setShowFilters(false);
  };

  // Toggle filters view
  const toggleFilters = () => {
    setShowFilters(!showFilters);
    setShowBookmarks(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <TopBox onSearch={handleSearch} />
      <div className="flex gap-4 flex-row">
        <Sidebar
          isBookmarksActive={showBookmarks}
          isFiltersActive={showFilters}
          onToggleBookmarks={toggleBookmarks}
          onToggleFilters={toggleFilters}
        />
        <div className="flex flex-col w-full gap-4 overflow-y-auto max-h-[63.5vh] bg-secondary border border-secondary-border backdrop-blur rounded-2xl p-6">
          {showFilters ? (
            <FilterPanel
              isOpen={showFilters}
              onApplyFilters={handleApplyFilters}
            />
          ) : (
            <>
              <h3 className="text-2xl font-semibold pl-1 pt-2">
                {showBookmarks
                  ? "Bookmarked Internships"
                  : "Recently Added Internships"}
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-5">
                {showBookmarks ? (
                  bookmarksLoading ? (
                    <div className="col-span-2 flex justify-center">
                      <Spinner />
                    </div>
                  ) : bookmarks.length > 0 ? (
                    bookmarks.map((job, index) => (
                      <JobCard key={`bookmark-${job.id}-${index}`} job={job} />
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-8">
                      <p className="text-lg text-gray-400">No bookmarks yet.</p>
                      <p className="text-gray-500">
                        Browse and bookmark internships to access them quickly!
                      </p>
                      {isAuthenticated === false && (
                        <div className="mt-4 p-3 inline-block bg-blue-500/20 border border-blue-500 rounded-lg">
                          <p className="text-sm text-blue-300">
                            Note: You're not signed in. Bookmarks are saved
                            locally and won't sync across devices.
                          </p>
                        </div>
                      )}
                    </div>
                  )
                ) : loadError ? (
                  <div className="col-span-2 flex flex-col items-center justify-center py-12">
                    <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 mb-4 max-w-md">
                      <p className="text-red-300 mb-2">{loadError}</p>
                      <p className="text-gray-400 text-sm">
                        This might be due to network issues or the server being
                        temporarily unavailable.
                      </p>
                    </div>
                    <button
                      onClick={handleRetry}
                      className="px-4 py-2 bg-blue-600 rounded-lg text-white font-medium hover:bg-blue-700 transition-colors">
                      Retry Loading
                    </button>
                  </div>
                ) : (
                  searchResults.map((job, index) => (
                    <JobCard key={`job-${job.id}-${index}`} job={job} />
                  ))
                )}
              </div>

              {!showBookmarks && searchResults.length > 0 && (
                <div className="flex justify-center pb-4">
                  <button
                    className="px-4 py-2 bg-blue-600 rounded-lg text-white font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                    onClick={handleLoadMore}
                    disabled={isLoading}>
                    {isLoading ? <Spinner /> : "Load More"}
                  </button>
                </div>
              )}

              {isLoading && !showBookmarks && searchResults.length === 0 && (
                <div className="flex justify-center py-8">
                  <Spinner />
                </div>
              )}

              {!isLoading && !showBookmarks && searchResults.length === 0 && (
                <div className="col-span-2 text-center py-8">
                  <p className="text-lg text-gray-400">
                    No internships found matching your criteria.
                  </p>
                  <p className="text-gray-500">
                    Try adjusting your search or filters.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <SupabaseDebug />
    </div>
  );
}
