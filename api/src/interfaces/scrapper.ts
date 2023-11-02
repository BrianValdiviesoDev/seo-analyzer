export interface CrawlerRequest {
  url: string;
}

export interface HtmlElement {
  tag: string;
  content: string;
}

export interface Links {
  href: string;
  text: string;
  rel?: string;
}

export interface MetaTag {
  name: string;
  content: string;
}

export interface Images {
  src: string;
  alt?: string;
}

export interface ScrapperResponse {
  titles?: HtmlElement[];
  metaTags?: MetaTag[];
  links?: Links[];
  images?: Images[];
  title?: string;
}

export interface PageSpeedMetric {
  value: number;
  score: number;
}
export interface PageSpeedResponse {
  FirstContentfulPaint: PageSpeedMetric;
  SpeedIndex: PageSpeedMetric;
  TotalBlockingTime: PageSpeedMetric;
  LargestContentfulPaint: PageSpeedMetric;
  CumulativeLayoutShift: PageSpeedMetric;
  ServerResponseTime: PageSpeedMetric;
  Performance: PageSpeedMetric;
}
