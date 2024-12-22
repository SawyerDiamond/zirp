"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LocationSVG, SubmitSVG, JobSVG } from "@/assets/icons/";
import type { JobItem } from "@/types/job";

type SearchBoxProps = {
  onSearch: (results: JobItem[]) => void;
  className?: string;
};

export function SearchBox({ onSearch, className }: SearchBoxProps) {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <form className={`flex z-50 ${className}`}>
      <div className="flex items-center gap-4">
        <Input
          name="Search"
          type="search"
          placeholder="Job Title"
          icon={JobSVG}
          value={jobTitle}
          className="w-96 flex-1 backdrop-blur"
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
          className="w-64 flex-1 backdrop-blur"
          onChange={(e) => {
            setLocation(e.target.value);
            console.log("Location input changed:", e.target.value);
          }}
        />
        <Button
          size="squareSM"
          className="bg-primary-darker"
          disabled={isLoading}>
          <SubmitSVG className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
