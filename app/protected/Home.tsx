"use client";
import { useState } from "react";
import { TopBox } from "@/components/mainComponents/TopBox";
import { Sidebar } from "@/components/mainComponents/Sidebar";
import { JobItem } from "@/types/job";
import { BGLogo } from "@/assets/BGLogo";

import { JobCard } from "@/components/mainComponents/JobCard";
import { FeaturedCard } from "@/components/mainComponents/FeaturedCard";

const placeholderJobs = [
  {
    id: 2646234,
    company: "TechCorp",
    title: "Senior Frontend Developer",
    location: "San Francisco, CA",
    description:
      "We're looking for an experienced frontend developer to join our team and help build amazing user interfaces.",
    salary: "$120,000 - $150,000",
    timestamp: new Date().toISOString(),
    apply_url: "https://example.com/apply",
  },
  {
    id: 2646534,
    company: "DataSystems Inc.",
    title: "Data Scientist",
    location: "New York, NY",
    description:
      "Join our data science team to work on cutting-edge machine learning projects and drive business insights.",
    salary: "$100,000 - $130,000",
    timestamp: new Date().toISOString(),
    apply_url: "https://example.com/apply",
  },
  {
    id: 2647234,
    company: "CloudNine Solutions",
    title: "DevOps Engineer",
    location: "Austin, TX",
    description:
      "Help us build and maintain our cloud infrastructure and streamline our deployment processes.",
    salary: "$110,000 - $140,000",
    timestamp: new Date().toISOString(),
    apply_url: "https://example.com/apply",
  },
  {
    id: 2646294,
    company: "TechCorp",
    title: "Senior Frontend Developer",
    location: "San Francisco, CA",
    description:
      "We're looking for an experienced frontend developer to join our team and help build amazing user interfaces.",
    salary: "$120,000 - $150,000",
    timestamp: new Date().toISOString(),
    apply_url: "https://example.com/apply",
  },
  {
    id: 2646230,
    company: "DataSystems Inc.",
    title: "Data Scientist",
    location: "New York, NY",
    description:
      "Join our data science team to work on cutting-edge machine learning projects and drive business insights.",
    salary: "$100,000 - $130,000",
    timestamp: new Date().toISOString(),
    apply_url: "https://example.com/apply",
  },
  {
    id: 1646234,
    company: "CloudNine Solutions",
    title: "DevOps Engineer",
    location: "Austin, TX",
    description:
      "Help us build and maintain our cloud infrastructure and streamline our deployment processes.",
    salary: "$110,000 - $140,000",
    timestamp: new Date().toISOString(),
    apply_url: "https://example.com/apply",
  },
];

export function Home() {
  const [searchResults, setSearchResults] = useState<JobItem[]>([]);

  const handleSearch = (results: JobItem[]) => {
    console.log("handleSearch called with results:", results);
    if (Array.isArray(results)) {
      setSearchResults(results);
      console.log(
        `Updated searchResults state with ${results.length} placeholderJobs.`
      );
    } else {
      console.error("Received unexpected results structure:", results);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <TopBox onSearch={handleSearch} />
      <div className="flex gap-4 flex-row">
        <Sidebar />
        <div className="flex flex-col w-full gap-4 overflow-y-auto max-h-[66vh] pt-4">
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
          <h3 className="text-2xl font-semibold pl-1">Recently Added</h3>
          <div className="grid grid-cols-2 gap-4 mb-5">
            {placeholderJobs.map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
          </div>
        </div>
      </div>

      <BGLogo
        fillColor="#0D1E3D"
        className="absolute -z-20 -top-32 -right-60 opacity-50"
      />
    </div>
  );
}
