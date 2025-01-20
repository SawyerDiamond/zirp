import { createClient } from "@supabase/supabase-js";
import { JobItem } from "@/types/job";

import fs from "fs";
import puppeteer from "puppeteer";
import cron from "node-cron";
import slugify from "slugify";

import dotenv from "dotenv";
dotenv.config();
const { SUPABASE_URL, SUPABASE_KEY, LOGO_API_TOKEN } = process.env;

// if (!SUPABASE_URL || !SUPABASE_KEY || !LOGO_API_TOKEN) {
//   throw new Error("Missing Supabase or Logo API credentials");
// }

// const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const fetchCompanyLogo = async (companyName: string): Promise<string> => {
  const cleanName = companyName.replace(/\s+/g, "");

  const formattedName = slugify(cleanName, {
    lower: true,
    replacement: "",
    strict: true,
  });

  return `https://img.logo.dev/${encodeURIComponent(formattedName)}.com?token=${LOGO_API_TOKEN}`;
};

const url =
  "https://simplify.jobs/jobs?query=frontend%20&state=New%20York%2C%20USA&points=45.015865%3B-71.777491%3B40.477399%3B-79.76259&experience=Internship&education=Bachelor%27s&jobId=891a4c15-816a-4fbd-ae39-bf4c3b33d522";

const simplifyJobs = async (url: string): Promise<JobItem[]> => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  await page.waitForSelector('[data-testid="job-card"]');

  const jobs: JobItem[] = await page.evaluate(() => {
    const jobElements = document.querySelectorAll('[data-testid="job-card"]');
    const jobsArray: any[] = [];

    const cleanSalary = (salary: string): string => {
      return salary.replace(/Hourly/g, "").trim();
    };

    jobElements.forEach((element) => {
      const titleElement = element.querySelector("h3");
      const companyElement = element.querySelector("div.text-secondary-400");
      const locationElement = element.querySelector("p.text-sm");
      const salaryElement = element.querySelector("p.text-sm.font-normal");
      const descriptionElement = element.querySelector(".description");

      const title = titleElement ? titleElement.textContent?.trim() || "" : "";
      const company = companyElement
        ? companyElement.textContent?.trim() || ""
        : "";
      const location = locationElement
        ? locationElement.textContent?.trim() || ""
        : "";
      const salary = salaryElement
        ? cleanSalary(salaryElement.textContent?.trim() || "")
        : "";
      const description = descriptionElement
        ? (descriptionElement as HTMLElement).innerText.trim()
        : "";

      jobsArray.push({
        id: Math.floor(Math.random() * 1000000),
        title,
        company,
        location,
        salary,
        description,
        timestamp: new Date().toISOString(),
        apply_url: "",
        logo_url: "",
      });
    });

    return jobsArray;
  });

  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i];
    try {
      const logoUrl = await fetchCompanyLogo(job.company);
      job.logo_url = logoUrl;
    } catch (error) {
      job.logo_url = "";
    }
  }

  await browser.close();
  return jobs;
};

const runScraper = async () => {
  try {
    const jobs = await simplifyJobs(url);
    fs.writeFileSync("jobs.json", JSON.stringify(jobs, null, 2));
    console.log(`Jobs from ${url} saved successfully to jobs.json.`);
  } catch (error) {
    console.error(`Error processing ${url}:`, error);
  }
};

runScraper();
