import { JobItem } from "@/types/job";
import slugify from "slugify";
import * as puppeteer from "puppeteer";
import dotenv from "dotenv";
import { createSupabaseServerClient } from "../supabase/server";

dotenv.config();
const { LOGO_API_TOKEN } = process.env;

const autoScroll = async (page: puppeteer.Page) => {
  await page.evaluate(async () => {
    const container = document.querySelector(
      ".flex.h-screen.flex-col.gap-4.overflow-y-auto.p-4"
    );
    if (!container) return;
    await new Promise<void>((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        container.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= container.scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
};

const fetchCompanyLogo = async (companyName: string): Promise<string> => {
  const cleanName = companyName.replace(/\s+/g, "");
  const formattedName = slugify(cleanName, {
    lower: true,
    replacement: "",
    strict: true,
  });

  return `https://cdn.brandfetch.io/${encodeURIComponent(formattedName)}.com/fallback/404/?c=${LOGO_API_TOKEN}`;
};

export const simplifyJobs = async (url: string): Promise<JobItem[]> => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });
  await autoScroll(page);
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

    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.from("jobs").insert(job);
    if (error) {
      console.error(`Error inserting job ID ${job.title}:`, error.message);
    }
  }

  await browser.close();
  return jobs;
};
