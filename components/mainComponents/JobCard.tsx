import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { JobItem } from "@/types/job";

export function JobCard({ job }: { job: JobItem }) {
  return (
    <Card className="card-shadow rounded-2xl bg-primary-darker border backdrop-blur border-secondary-border overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-3">
        <img
          src={job.logo_url}
          onError={(e) => {
            const randomLogo = `/icons/logos/logo-${Math.floor(Math.random() * 8) + 1}.svg`;
            e.currentTarget.src = randomLogo;
          }}
          className="w-12 h-12 rounded-xl shadow-md"
        />
        <div>
          <h3 className="text-lg font-semibold w-[30vw] truncate">
            {job.title}
          </h3>

          <div className="flex items-center gap-2">
            <h4 className="text-sm text-muted-foreground">{job.company}</h4>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-sm">{job.location}</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4">
              <circle cx="12" cy="12" r="8" />
              <path d="M8 12h8" />
              <path d="M12 8v8" />
            </svg>
            <span className="text-sm font-semibold">{job.salary}</span>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
