import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { JobItem } from "~/types/job";
import { Pagination } from "~/components/ui/pagination";
type JobListProps = {
  jobs: JobItem[];
  className?: string;
};

export function JobList({ jobs, className }: JobListProps) {
  console.log("JobList received jobs:", jobs);

  const placeholderJobs: JobItem[] = Array(5).fill({
    employer_name: "Company Name",
    job_title: "Job Title",
    job_description:
      "This is a placeholder job description. Search for real jobs to see more details. This is a placeholder job description. Search for real jobs to see more details. This is a placeholder job description. Search for real jobs to see more details. This is a placeholder job description. Search for real jobs to see more details.",
    job_city: "City",
    job_country: "Country",
  });

  const jobsToDisplay = jobs.length > 0 ? jobs : placeholderJobs;

  return (
    <div className="h-full">
      <div className="grid grid-cols-2 gap-4 h-[62.5vh]">
        {jobsToDisplay.map((job, index) => (
          <Card
            key={index}
            className="bg-[var(--secondaryBG)] text-white border border-[var(--secondaryBorder)] rounded-2xl">
            <CardHeader className="flex flex-row gap-2">
              <img
                src={`https://img.logo.dev/${job.employer_name
                  .toLowerCase()
                  .replace(/\s+/g, "")}.com?token=${
                  typeof window !== "undefined"
                    ? window.env?.LOGO_DEV_PUBLIC_KEY
                    : process.env.LOGO_DEV_PUBLIC_KEY
                }&size=80&format=png`}
                alt={job.employer_name}
                className="rounded-lg w-10 h-10"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    job.employer_logo || "/default-logo.png";
                }}
              />
              <div className="flex flex-col">
                <CardTitle>{job.job_title}</CardTitle>
                <p>{job.employer_name}</p>
              </div>
            </CardHeader>
            <CardContent>
              <p>
                {job.job_city}, {job.job_country}
              </p>
              <p className="text-sm mt-2">
                {job.job_description.slice(0, 300)}...
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
