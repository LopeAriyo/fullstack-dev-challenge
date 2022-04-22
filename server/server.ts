import express from "express";

import bodyParser from 'body-parser';
import cors from "cors";

import {projectionRouter} from "./routes/projectionRouter"

const app = express();

app.use(bodyParser.json());

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => res.json({message: "Investments Saving Calculator API"}));

app.use("/api/projection", projectionRouter);

app.all("/*", (req, res, next) => {
  res.status(404).send({ httpError: "Route Not Found" });
  next()
});

app.use((error: Error, req: express.Request, res:express.Response, next:express.NextFunction) => {
  if (res.headersSent) {
      return next(error);
  }
  res.status(500);
  res.json({ message: error.message || "Internal Server Error!" });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.set("port", process.env.PORT || 3001);

app.listen(app.get("port"), () => {
  console.log(`Server listening at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});

module.exports = app; 