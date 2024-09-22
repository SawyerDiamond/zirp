import { useState } from "react";
import { Sidebar } from "~/components/sidebar";
import { TopBox } from "~/components/topbox";
import { JobList } from "~/components/jobList";

export default function Home() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (results: any) => {
    console.log("Search results in Index:", results);
    setSearchResults(results.data || []);
  };

  return (
    <div className="flex flex-col gap-[2vh] pl-[2vh] pr-[2vh]">
      <div></div>
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
