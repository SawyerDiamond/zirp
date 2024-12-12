// /app/components/JobListItem.tsx

import React from "react";
import type { JobItem } from "~/types/job";

type JobListItemProps = {
  job: JobItem;
};

export function JobListItem({ job }: JobListItemProps) {
  console.log("Rendering JobListItem for job_id:", job.job_id);

  return (
    <div className="job-list-item border p-4 mb-4 rounded shadow">
      <h3 className="text-xl font-semibold">{job.job_title}</h3>
      <p className="text-gray-600">Employer: {job.employer_name}</p>
      <p className="text-gray-600">Location: {job.job_location}</p>
      {job.employer_logo && (
        <img
          src={job.employer_logo}
          alt={`${job.employer_name} Logo`}
          className="h-10 w-10"
        />
      )}
      <a
        href={job.job_apply_link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        Apply Now
      </a>
      <p className="mt-2">{job.job_description.substring(0, 200)}...</p>
      <p className="text-sm text-gray-500">
        Posted: {job.job_posted_human_readable}
      </p>
    </div>
  );
}