"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LocationSVG, SubmitSVG, JobSVG } from "@/assets/icons/";
import { SearchBoxProps } from "@/types/job";

export function SearchBox({ onSearch, className }: SearchBoxProps) {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with:", { jobTitle, location });
    onSearch({ title: jobTitle, location });
  };

  return (
    <form className={`flex z-50 ${className}`} onSubmit={handleSubmit}>
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
          type="submit"
          size="squareSM"
          className="bg-primary-darker"
          disabled={isLoading}>
          <SubmitSVG className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
