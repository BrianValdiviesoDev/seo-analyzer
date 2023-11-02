import { Router } from "express";
import {
  scrapelUrl,
  getPageSpeed,
  getSitemap,
  getRobots,
} from "../controllers/scrapper";

const route = Router();

route.get("/readurl", scrapelUrl);
route.get("/pagespeed", getPageSpeed);
route.get("/sitemap", getSitemap);
route.get("/robots", getRobots);
export default route;
