import axios from "axios";

export async function getSearch(jobTitle: string, location: string) {
  const options = {
    method: "GET",
    url: "https://jsearch.p.rapidapi.com/search",
    params: {
      query: `${jobTitle} in ${location}`,
      page: "1",
      num_pages: "1",
      date_posted: "all",
    },
    headers: {
      "x-rapidapi-key":
        typeof window !== "undefined"
          ? window.env?.JSEARCH_API_KEY
          : process.env.JSEARCH_API_KEY,
      "x-rapidapi-host": "jsearch.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Error fetching job search results:", error);
    throw error;
  }
}
