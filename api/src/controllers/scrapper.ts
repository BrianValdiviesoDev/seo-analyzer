import { Request, Response } from "express";
import {
  pageSpeedQuery,
  readRobots,
  readSitemap,
  readUrl,
} from "../services/scrapper";

const scrapelUrl = async (req: Request, res: Response) => {
  try {
    const url = req.query.url?.toString();
    if (!url) {
      throw new Error("Bad url to crawl");
    }
    const response = await readUrl(url);
    const data = response ? response : "NOT_FOUND";
    res.send(data);
  } catch (e) {
    res.status(500);
    res.send({ e });
  }
};

const getPageSpeed = async (req: Request, res: Response) => {
  try {
    const url = req.query.url?.toString();
    if (!url) {
      throw new Error("Bad url to analyze");
    }
    const response = await pageSpeedQuery(url);
    res.send(response);
  } catch (e) {
    res.status(500);
    res.send({ e });
  }
};

const getSitemap = async (req: Request, res: Response) => {
  try {
    const url = req.query.url?.toString();
    if (!url) {
      throw new Error("Bad url to analyze");
    }
    const response = await readSitemap(url);
    res.send(response);
  } catch (e) {
    res.status(500);
    res.send({ e });
  }
};

const getRobots = async (req: Request, res: Response) => {
  try {
    const url = req.query.url?.toString();
    if (!url) {
      throw new Error("Bad url to analyze");
    }
    const response = await readRobots(url);
    res.send(response);
  } catch (e) {
    res.status(500);
    res.send({ e });
  }
};

export { scrapelUrl, getPageSpeed, getSitemap, getRobots };
