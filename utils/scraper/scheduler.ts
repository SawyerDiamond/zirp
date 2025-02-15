import cron from "node-cron";
import { workdayJobs } from "@/utils/scraper/index";
import { workdayURLs } from "./urls";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const runScraper = async () => {
  try {
    const jobs = await workdayJobs(workdayURLs);
    fs.writeFileSync("jobs.json", JSON.stringify(jobs, null, 2));
    console.log(`Jobs from ${workdayURLs} saved successfully to jobs.json.`);
  } catch (error) {
    console.error(`Error processing ${workdayURLs}:`, error);
  }
};

cron.schedule("0 0 * * *", () => {
  console.log("Running scheduled scraper task...");
  runScraper();
});

runScraper();
