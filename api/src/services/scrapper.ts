import puppeteer from "puppeteer";
import {
  ScrapperResponse,
  HtmlElement,
  Images,
  Links,
  MetaTag,
  PageSpeedResponse,
} from "../interfaces/scrapper";
import { parse } from "node-html-parser";
import axios from "axios";

const readUrl = async (url: string): Promise<ScrapperResponse> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const html = await page.content();
  const root = parse(html);

  const titles: HtmlElement[] = [];
  for (let index = 1; index < 6; index++) {
    const elements = root.getElementsByTagName(`h${index}`);
    elements.forEach((e) => {
      titles.push({ tag: `h${index}`, content: e.textContent });
    });
  }

  const metas = root.getElementsByTagName("meta");
  const metaTags: MetaTag[] = metas.map((m) => ({
    name: m.getAttribute("name") || "",
    content: m.getAttribute("content") || "",
  }));

  const webTitles = root.getElementsByTagName("title");
  let title = "";
  if (webTitles) {
    title = webTitles[0].textContent;
  }

  const webLinks = root.getElementsByTagName("a");
  const links: Links[] = webLinks.map((a) => ({
    href: a.getAttribute("href") || "",
    text: a.textContent,
    rel: a.getAttribute("rel") || "",
  }));

  const imgs = root.getElementsByTagName("img");
  const images: Images[] = imgs.map((i) => ({
    src: i.getAttribute("src") || "",
    alt: i.getAttribute("alt") || "",
  }));

  const response: ScrapperResponse = {
    titles,
    metaTags,
    title,
    links,
    images,
  };

  return response;
};

const pageSpeedQuery = async (
  url: string
): Promise<PageSpeedResponse | null> => {
  const googleUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${process.env.GOOGLE_API_KEY}`;
  try {
    const result = await axios.get(googleUrl);
    const data = result.data;
    const metrics = data.lighthouseResult;
    const response: PageSpeedResponse = {
      FirstContentfulPaint: {
        value: metrics.audits["first-contentful-paint"]?.numericValue,
        score: metrics.audits["first-contentful-paint"]?.score,
      },
      SpeedIndex: {
        value: metrics.audits["speed-index"]?.numericValue,
        score: metrics.audits["speed-index"]?.score,
      },
      TotalBlockingTime: {
        value: metrics.audits["total-blocking-time"]?.numericValue,
        score: metrics.audits["total-blocking-time"]?.score,
      },
      LargestContentfulPaint: {
        value: metrics.audits["largest-contentful-paint"]?.numericValue,
        score: metrics.audits["largest-contentful-paint"]?.score,
      },
      CumulativeLayoutShift: {
        value: metrics.audits["cumulative-layout-shift"]?.numericValue,
        score: metrics.audits["cumulative-layout-shift"]?.score,
      },
      ServerResponseTime: {
        value: metrics.audits["server-response-time"]?.numericValue,
        score: metrics.audits["server-response-time"]?.score,
      },
      Performance: {
        value: 0,
        score: metrics.categories.performance.score,
      },
    };
    return response;
  } catch (e) {
    return null;
  }
};

const readSitemap = async (url: string): Promise<string[]> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`${url}/sitemap.xml`);
  const html = await page.content();
  const root = parse(html);

  const links = root.getElementsByTagName("a");
  const urls = root.getElementsByTagName("url");

  const response = [
    ...links.map((a) => a.getAttribute("href") || ""),
    ...urls.map((t) => t.textContent),
  ];

  return response;
};

const readRobots = async (url: string): Promise<string> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`${url}/robots.txt`);
  const html = await page.content();
  const root = parse(html);
  const response = root.getElementsByTagName("body")[0].textContent;
  return response;
};

export { readUrl, pageSpeedQuery, readSitemap, readRobots };
