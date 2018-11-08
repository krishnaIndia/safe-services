import * as express from "express";
import * as compression from "compression";
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import * as errorHandler from "errorhandler";
import * as lusca from "lusca";
import * as dotenv from "dotenv";
import * as flash from "express-flash";
import * as clear from "clear-console";
import * as chalk from "chalk";
import * as cors from "cors";
import * as expressValidator from "express-validator";

import AppConfig from './config/app';

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: ".env" });
  clear({ toStart: true });
  clear({ toStart: true });
}

const app = express();

app.set("port", process.env.PORT || AppConfig.PORT);
app.use(cors());
app.use(compression());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(flash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

// API Routes imports
import APIRouter from "./routes/main";

// Initialization
APIRouter(app);

app.use(errorHandler());

app.listen(app.get("port"), () => {
  console.info(chalk.green("Node server compiled successfully!"));
  console.info(
    "App is running at " +
      chalk.bold("http://localhost:" + app.get("port")) +
      " in " +
      chalk.bold(app.get("env").toUpperCase()) +
      " mode"
  );
});

module.exports = app;
