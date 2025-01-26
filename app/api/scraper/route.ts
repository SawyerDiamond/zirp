import { NextResponse } from "next/server";
import { simplifyJobs } from "@/utils/scraper/index";
import { simplifyUrl } from "@/utils/scraper/urls";
export async function GET() {
  try {
    const jobs = await simplifyJobs(simplifyUrl);
    return NextResponse.json({ jobs });
  } catch (error) {
    console.error("Scraper Error:", error);
    return NextResponse.error();
  }
}
