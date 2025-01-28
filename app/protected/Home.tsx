"use client";
import { useState } from "react";
import { TopBox } from "@/components/mainComponents/TopBox";
import { Sidebar } from "@/components/mainComponents/Sidebar";
import { JobItem } from "@/types/job";
import { BGLogo } from "@/assets/BGLogo";
import { JobCard } from "@/components/mainComponents/JobCard";
import Spinner from "@/components/Spinner";

import { useJobSearch } from "@/hooks/useJobSearch";

export function Home() {
  const [searchResults, setSearchResults] = useState<JobItem[]>([]);

  const handleSearch = async (results: { title: string; location: string }) => {
    console.log("handleSearch called with:", results);
    const searchResults = await useJobSearch(results);
    console.log("Search results received:", searchResults);
    setSearchResults(searchResults);
  };

  return (
    <div className="flex flex-col gap-4">
      <TopBox onSearch={handleSearch} />
      <div className="flex gap-4 flex-row">
        <Sidebar />
        <div className="flex flex-col w-full gap-4 overflow-y-auto max-h-[63.5vh] bg-secondary border border-secondary-border backdrop-blur-sm rounded-2xl p-6">
          <div className="h-full overflow-hidden fixed -top-40 -left-56">
            <BGLogo
              fillColor="#030a17"
              className="absolute -z-10  opacity-50"
            />
          </div>

          {/* <div className="flex flex-row gap-4">
            <FeaturedCard
              featureName="Big Tech"
              featureImage="/icons/BigTechIcon.svg"
              imageColor="128cfe"
              className="flex-1"
            />
            <FeaturedCard
              featureName="Big Tech"
              featureImage="/icons/BigTechIcon.svg"
              imageColor="661fce"
              className="flex-1"
            />
            <FeaturedCard
              featureName="Big Tech"
              featureImage="/icons/BigTechIcon.svg"
              imageColor="661fce"
              className="flex-1"
            />
            <FeaturedCard
              featureName="Big Tech"
              featureImage="/icons/BigTechIcon.svg"
              imageColor="661fce"
              className="flex-1"
            />
          </div> */}
          <h3 className="text-2xl font-semibold pl-1 pt-2">Recently Added</h3>

          <div className="grid grid-cols-2 gap-4 mb-5">
            {searchResults.map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
          </div>
          <Spinner />
        </div>
      </div>
    </div>
  );
}
