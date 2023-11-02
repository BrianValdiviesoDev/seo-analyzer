import { ScrapperResponse, PageSpeedResponse } from "./interfaces";
import axios from "axios";

export const readUrl = async (url: string): Promise<ScrapperResponse> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/readurl?url=${url}`
  );
  return response.data;
};

export const pageSpeed = async (url: string): Promise<PageSpeedResponse> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/pagespeed?url=${url}`
  );
  return response.data;
};

export const checkSitemap = async (url: string): Promise<string[]> => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/sitemap?url=${url}`
    );
    return response.data;
  } catch (e) {
    return [];
  }
};

export const checkRobots = async (url: string): Promise<string> => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/robots?url=${url}`
    );

    return response.data;
  } catch (e) {
    return "";
  }
};
