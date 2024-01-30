import express from "express";
import cors from "cors";
import ScrapperRouter from "./routes/scrapper";
import morgan from "morgan";
import "dotenv/config";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(ScrapperRouter);
app.listen(PORT, () => console.log(`Listen on port ${PORT}`));
