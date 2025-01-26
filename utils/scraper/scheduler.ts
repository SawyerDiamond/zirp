import cron from "node-cron";
import { simplifyJobs } from "@/utils/scraper/index";
import { simplifyUrl } from "./urls";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const runScraper = async () => {
  try {
    const jobs = await simplifyJobs(simplifyUrl);
    fs.writeFileSync("jobs.json", JSON.stringify(jobs, null, 2));
    console.log(`Jobs from ${simplifyUrl} saved successfully to jobs.json.`);
  } catch (error) {
    console.error(`Error processing ${simplifyUrl}:`, error);
  }
};

cron.schedule("0 0 * * *", () => {
  console.log("Running scheduled scraper task...");
  runScraper();
});

runScraper();
