import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import router from "./routers/v1";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";

const app: Application = express();

app.use(
  cors({
    origin: config.frontend_url,
    credentials: true,
  })
);

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Server Is Running..",
    environment: config.node_env,
    uptime: process.uptime().toFixed(2) + " second",
    timeStamp: new Date().toISOString(),
  });
});

// Global Error Handler
app.use(globalErrorHandler);
// Not Found
app.use(notFound);

export default app;
