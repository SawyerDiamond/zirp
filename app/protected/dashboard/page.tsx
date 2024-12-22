import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { TopBox } from "@/components/TopBox";
import { JobList } from "@/components/JobList";
import { JobItem } from "@/types/job";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }
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
    <div className="flex flex-col gap-[2vh] pt-[2vh] pl-[2vh] pr-[2vh]">
      <TopBox onSearch={handleSearch} />
      <div className="flex-1 grid grid-cols-[auto,1fr] gap-4 ">
        <Sidebar />
        <div>
          <JobList jobs={searchResults} />
          console.log("Updated search results:", ${searchResults.length} jobs);
        </div>
      </div>
    </div>
  );
}
