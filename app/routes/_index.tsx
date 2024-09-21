"use client";
import type { MetaFunction } from "@remix-run/node";
import { Background } from "~/assets";
import { Navbar } from "~/components/navbar";
import { TopBox } from "~/components/TopBox";
import { JobList } from "~/components/jobList";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Jobsite" },
    { name: "description", content: "Find Your Dream Job!" },
  ];
};

export default function Index() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (results: any) => {
    console.log("Search results in Index:", results);
    setSearchResults(results.data || []);
  };

  return (
    <div className="h-[98vh] flex flex-col gap-[2vh] pl-[2vh] pr-[2vh]">
      <div></div>
      <TopBox onSearch={handleSearch} />
      <div className="flex-1 grid grid-cols-[auto,1fr] gap-4 ">
        <Navbar />
        <div className="overflow-y-auto">
          <JobList jobs={searchResults} />
        </div>
      </div>
      <Background />
    </div>
  );
}
