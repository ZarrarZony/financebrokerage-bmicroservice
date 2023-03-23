import express, { Express, Request, Response } from "express";
import { startFetcher } from "./cron-jobs/PostFetcher.js";
import { retryFailedTranslations } from "./cron-jobs/FailTranslations.js";
import { categoryApiHelper } from "./controllers/Category.js";
import { postApiHelper } from "./controllers/Post.js";
import { extractLanguage } from "./controllers/Helper.js";
import cors from "cors";

const app: Express = express();
const port = 2000;

app.use(
  cors({
    origin: "",
    methods: ["GET", "POST"],
  })
);

app.get("/start-fetcher", (req: Request, res: Response) => {
  try {
    startFetcher();
    res.send("<h2>Job is running</h2>");
  } catch (error) {
    console.log("Error Occurred", error);
  }
});

app.get("/failed-posts", (req: Request, res: Response) => {
  res.send("<h2>Failed Posts are running</h2>");
  retryFailedTranslations();
});

app.use(["api/category/*", "api/post/*"], extractLanguage);

app.get(
  "/api/categories/:id?/:subCatName?",
  async (req: Request, res: Response) => {
    const response = await categoryApiHelper(req);
    res.json(response);
  }
);

app.get("/api/posts/:id?", async (req: Request, res: Response) => {
  const response = await postApiHelper(req);
  res.json(response);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running`);
});
