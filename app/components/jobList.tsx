// /Users/sawyer/Documents/GitHub/jobsite/app/components/JobList.tsx

import React from "react";
import { JobItem } from "~/types/job";
import { JobListItem } from "./JobListItem";

type JobListProps = {
  jobs: JobItem[];
};

export function JobList({ jobs }: JobListProps) {
  console.log("JobList received jobs:", jobs);

  if (jobs.length === 0) {
    console.warn("JobList: No jobs to display.");
    return <p>No jobs found. Please try a different search.</p>;
  }

  return (
    <div>
      {jobs.map((job) => (
        <JobListItem key={job.job_id} job={job} />
      ))}
    </div>
  );
}
