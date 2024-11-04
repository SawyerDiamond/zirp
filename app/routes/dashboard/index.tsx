import { useState } from "react";
import { Sidebar } from "~/components/Sidebar";
import { TopBox } from "~/components/TopBox";
import { JobList } from "~/components/JobList";
import { JobItem } from "~/types/job";

export default function Home() {
  const [searchResults, setSearchResults] = useState<JobItem[]>([]);

  const handleSearch = (results: any) => {
    console.log("Search results in Index:", results);
    if (results && results.data) {
      console.log("Jobs data:", results.data);
      const jobs = Array.isArray(results.data) ? results.data : [];
      setSearchResults(jobs);
    } else {
      console.error("Unexpected results structure:", results);
    }
  };

  return (
    <div className="flex flex-col gap-[2vh] pt-[2vh] pl-[2vh] pr-[2vh]">
      <TopBox onSearch={handleSearch} />
      <div className="flex-1 grid grid-cols-[auto,1fr] gap-4 ">
        <Sidebar />
        <div>
          <JobList jobs={searchResults} />
        </div>
      </div>
    </div>
  );
}
