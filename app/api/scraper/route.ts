import { NextResponse } from "next/server";
import { workdayJobs } from "@/utils/scraper/index";
import { workdayURLs } from "@/utils/scraper/urls";
export async function GET() {
  try {
    const jobs = await workdayJobs(workdayURLs);
    return NextResponse.json({ jobs });
  } catch (error) {
    console.error("Scraper Error:", error);
    return NextResponse.error();
  }
}
