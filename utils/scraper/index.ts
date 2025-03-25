import { JobItem } from "@/types/job";
import slugify from "slugify";
import * as puppeteer from "puppeteer";
import dotenv from "dotenv";
import { createSupabaseServerClient } from "../supabase/server";

dotenv.config();
const { LOGO_API_TOKEN } = process.env;

const fetchCompanyLogo = async (companyName: string): Promise<string> => {
  // Return a local fallback logo instead of using the Brandfetch API
  const randomLogoNumber = Math.floor(Math.random() * 8) + 1;
  return `/icons/logos/logo-${randomLogoNumber}.svg`;
};

export const workdayJobs = async (urls: string[]): Promise<JobItem[]> => {
  let allJobs: JobItem[] = [];
  for (const url of urls) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    await page.waitForSelector("li.css-1q2dra3");

    const jobs: JobItem[] = await page.evaluate(() => {
      const jobElements = document.querySelectorAll("li.css-1q2dra3");
      const jobsArray: any[] = [];
      const cleanSalary = (salary: string): string => {
        return salary.replace(/Hourly/g, "").trim();
      };

      jobElements.forEach((element) => {
        const titleElement = element.querySelector(
          '[data-automation-id="jobTitle"]'
        );
        const companyElement = element.querySelector("div.text-secondary-400");
        const locationElement = element.querySelector("css-129m7dg");
        const salaryElement = element.querySelector("p.text-sm.font-normal");
        const descriptionElement = element.querySelector(".description");
        const apply_url =
          (element.querySelector("a.css-19uc56f") as HTMLAnchorElement)?.href ||
          "";

        const title = titleElement
          ? titleElement.textContent?.trim() || ""
          : "";
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
          apply_url,
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
    allJobs = allJobs.concat(jobs);
  }

  return allJobs;
};
