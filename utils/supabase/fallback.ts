import { JobItem } from "@/types/job";

// A small set of sample job data to use as fallback when API calls fail
const FALLBACK_JOBS: JobItem[] = [
  {
    id: "fallback-1",
    title: "Frontend Developer Intern",
    company: "TechCorp",
    location: "Remote",
    salary: "$20-25/hr",
    description:
      "Join our team as a Frontend Developer Intern and work on exciting projects using React, TypeScript, and Next.js.",
    timestamp: new Date().toISOString(),
    apply_url: "#",
    logo_url: "/icons/logos/logo-1.svg",
  },
  {
    id: "fallback-2",
    title: "Backend Engineer Intern",
    company: "DataSystems",
    location: "New York, NY",
    salary: "$22-28/hr",
    description:
      "Work on our backend systems using Node.js, Express, and PostgreSQL. Learn about API design and implementation.",
    timestamp: new Date().toISOString(),
    apply_url: "#",
    logo_url: "/icons/logos/logo-2.svg",
  },
  {
    id: "fallback-3",
    title: "UI/UX Design Intern",
    company: "CreativeStudios",
    location: "Los Angeles, CA",
    salary: "$18-23/hr",
    description:
      "Join our design team and create beautiful user interfaces for web and mobile applications.",
    timestamp: new Date().toISOString(),
    apply_url: "#",
    logo_url: "/icons/logos/logo-3.svg",
  },
  {
    id: "fallback-4",
    title: "Full Stack Developer Intern",
    company: "WebWorks",
    location: "Remote",
    salary: "$23-30/hr",
    description:
      "Work on both frontend and backend technologies. Experience with React and Node.js preferred.",
    timestamp: new Date().toISOString(),
    apply_url: "#",
    logo_url: "/icons/logos/logo-4.svg",
  },
];

/**
 * Get fallback job data when Supabase connections fail
 */
export function getFallbackJobs(count = 4): JobItem[] {
  // Return a copy of the fallback jobs to prevent mutation
  return [...FALLBACK_JOBS].slice(0, count);
}

/**
 * Get a single fallback job by ID
 */
export function getFallbackJob(id: string): JobItem | null {
  const job = FALLBACK_JOBS.find((job) => job.id === id);
  return job ? { ...job } : null;
}

/**
 * Store jobs in local cache to use as fallback
 */
export function storeJobsInLocalCache(jobs: JobItem[]): void {
  try {
    const timestamp = Date.now();
    const cacheData = {
      timestamp,
      jobs: jobs.slice(0, 20), // Store up to 20 jobs to keep size reasonable
    };
    localStorage.setItem("zirp-jobs-cache", JSON.stringify(cacheData));
  } catch (error) {
    console.error("Failed to store jobs in local cache:", error);
  }
}

/**
 * Get jobs from local cache
 */
export function getJobsFromLocalCache(): JobItem[] {
  try {
    const cachedData = localStorage.getItem("zirp-jobs-cache");
    if (!cachedData) return [];

    const { timestamp, jobs } = JSON.parse(cachedData);
    const cacheAge = Date.now() - timestamp;

    // Use cache only if it's less than a day old
    if (cacheAge < 24 * 60 * 60 * 1000) {
      return jobs;
    }

    return [];
  } catch (error) {
    console.error("Failed to retrieve jobs from local cache:", error);
    return [];
  }
}
