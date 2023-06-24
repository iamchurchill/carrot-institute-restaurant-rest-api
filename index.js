require("module-alias/register");
require("dotenv-expand").expand(require("dotenv").config());
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const { rateLimit, MemoryStore } = require("express-rate-limit");
const swaggerUiExpress = require("swagger-ui-express");
const { swaggerSpec, swaggerUiExpressOptions } = require("@helpers/swagger");

const webRouter = require("@routes/index");
//const apiRouter = require("@routes/api");

const AppError = require("@classes/app-error");
const ErrorHandler = require("@classes/error-handler");

const PORT_A = process.env.PORT_A || 8888;

const app = express();

app.use(
  morgan(
    ':remote-addr - :remote-user [:date[web]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
    {
      stream: fs.createWriteStream(path.join(__dirname, "./logs/access.log"), {
        flags: "a",
      }),
    }
  )
);

const apiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    status: false,
    message:
      "Too many requests from this IP, please try again after 15 minutes",
  },
  standardHeaders: true,
  legacyHeaders: true,
  store: new MemoryStore(),
});

app.use(apiRateLimit);

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// Use helmet for security headers
app.use(helmet());

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Set "views" directory and view engine
app.set("views", path.join(__dirname, "views"));
app.set("json spaces", 5);
app.set("view engine", "ejs");

app.use(webRouter);
//app.use("/api/v1", apiRouter);

app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerSpec, swaggerUiExpressOptions)
);

app.use((request, response, next) => {
  const error = new AppError("Not Found", 404);
  next(error);
});

const errorHandler = new ErrorHandler("error");
app.use(errorHandler.handle);

app.listen(PORT_A, () => {
  console.log(`Server listening on port ${PORT_A}`);
});
