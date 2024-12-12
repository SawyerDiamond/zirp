// /app/components/SearchBox.tsx

import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { LocationSVG, SubmitSVG, JobSVG } from "~/assets/icons/";
import { getSearchResults } from "~/api/jSearchAPI";
import type { JobItem } from "~/types/job";

type SearchBoxProps = {
  onSearch: (results: JobItem[]) => void;
  className?: string;
};

export function SearchBox({ onSearch, className }: SearchBoxProps) {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!jobTitle.trim() || !location.trim()) {
      alert("Please enter both Job Title and Location.");
      console.warn("Search attempted with empty fields.");
      return;
    }

    setIsLoading(true);
    console.log(
      "Search button pressed. Job Title:",
      jobTitle,
      "Location:",
      location
    );

    try {
      const results = await getSearchResults(jobTitle, location);
      console.log("Search results received from API:", results);
      onSearch(results);

      if (results.length === 0) {
        console.warn("No jobs found for the given search criteria.");
        alert("No jobs found. Please try a different search.");
      }
    } catch (error) {
      console.error("Error occurred during job search:", error);
      alert("Failed to fetch job listings. Please try again.");
    } finally {
      setIsLoading(false);
      console.log("Search operation completed. Loading state:", isLoading);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`flex z-50 ${className || ""}`}>
      <div className="flex items-center gap-4">
        <Input
          name="Search"
          type="search"
          placeholder="Job Title"
          icon={JobSVG}
          value={jobTitle}
          className="w-96 flex-1 backdrop-blur-sm"
          onChange={(e) => {
            setJobTitle(e.target.value);
            console.log("Job Title input changed:", e.target.value);
          }}
        />
        <Input
          name="Location"
          type="search"
          placeholder="Location"
          icon={LocationSVG}
          value={location}
          className="w-64 flex-1 backdrop-blur-sm"
          onChange={(e) => {
            setLocation(e.target.value);
            console.log("Location input changed:", e.target.value);
          }}
        />
        <Button
          type="submit"
          className="rounded-xl bg-[var(--primaryBG)] aspect-square"
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : <SubmitSVG className="h-4 w-4" />}
        </Button>
      </div>
    </form>
  );
}