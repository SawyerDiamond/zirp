import axios from "axios";
import type { JobItem } from "../types/job";

export async function getSearch(
  jobTitle: string,
  location: string
): Promise<JobItem[]> {
  try {
    const response = await axios.get("/api/search", {
      params: { jobTitle, location },
    });
    console.log("API Response Received:", response.data);

    if (response.data && Array.isArray(response.data.data)) {
      console.log(`Number of jobs received: ${response.data.data.length}`);
      return response.data.data as JobItem[];
    } else {
      console.error("Unexpected API response structure:", response.data);
      return [];
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error during API call:", error.response?.data);
      alert(
        "Error fetching jobs: " +
          (error.response?.data?.error || "Unknown error.")
      );
    } else {
      console.error("Unexpected error during API call:", error);
      alert("An unexpected error occurred while fetching jobs.");
    }
    throw error;
  }
}
