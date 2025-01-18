import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import * as cheerio from "cheerio";
import cron from "node-cron";

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  throw new Error("Missing Supabase credentials");
}

import { JobItem } from "@/types/job";

const collectedJobs = async (url: string): Promise<JobItem[]> => {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);
  const jobs: JobItem[] = [];

  return jobs;
};
