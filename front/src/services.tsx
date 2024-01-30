import { ScrapperResponse, PageSpeedResponse } from "./interfaces";
import axios from "axios";

const api_url = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const readUrl = async (url: string): Promise<ScrapperResponse> => {
  const response = await axios.get(
    `${api_url}/readurl?url=${url}`
  );
  return response.data;
};

export const pageSpeed = async (url: string): Promise<PageSpeedResponse> => {
  const response = await axios.get(
    `${api_url}/pagespeed?url=${url}`
  );
  return response.data;
};

export const checkSitemap = async (url: string): Promise<string[]> => {
  try {
    const response = await axios.get(
      `${api_url}/sitemap?url=${url}`
    );
    return response.data;
  } catch (e) {
    return [];
  }
};

export const checkRobots = async (url: string): Promise<string> => {
  try {
    const response = await axios.get(
      `${api_url}/robots?url=${url}`
    );

    return response.data;
  } catch (e) {
    return "";
  }
};
