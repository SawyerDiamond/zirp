"use client";
import { useState } from "react";
import { TopBox } from "@/components/TopBox";
import { Sidebar } from "@/components/Sidebar";
import { JobList } from "@/components/JobList";
import { JobItem } from "@/types/job";

export function Home() {
  const [searchResults, setSearchResults] = useState<JobItem[]>([]);

  const handleSearch = (results: JobItem[]) => {
    console.log("handleSearch called with results:", results);
    if (Array.isArray(results)) {
      setSearchResults(results);
      console.log(`Updated searchResults state with ${results.length} jobs.`);
    } else {
      console.error("Received unexpected results structure:", results);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <TopBox onSearch={handleSearch} />
      <div className="flex gap-4 flex-row">
        <Sidebar />
        <JobList jobs={searchResults} />
      </div>
    </div>
  );
}
