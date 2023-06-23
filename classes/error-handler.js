const winston = require("winston");
const path = require("path");
const AppError = require("@classes/app-error");
const Response = require("@classes/response");

class ErrorHandler {
  constructor(level) {
    this.logger = winston.createLogger({
      level: level || "info",
      format: winston.format.combine(
        winston.format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        winston.format.printf((info) => {
          return `${info.level.toUpperCase()} - ${info.timestamp} | MESSAGE: ${
            info.message
          } | STACK: ${info.stack}`;
        })
      ),
      transports: [
        new winston.transports.File({
          filename: path.join(__dirname, "../logs/error.log"),
          level: "error",
        }),
        new winston.transports.File({
          filename: path.join(__dirname, "../logs/combined.log"),
        }),
      ],
    });

    if (process.env.NODE_ENV !== "production") {
      this.logger.add(new winston.transports.Console());
    }
  }

  handle = (err, request, response, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    const stack = err.stack || "";
    const error = new AppError(message, statusCode);

    this.logger.error({ error, message, stack });

    if (request.accepts("html")) {
      return Response.error(response, {
        errors: stack,
        message,
        format: "html",
        view: "errors/error",
      });
    } else if (request.accepts("json")) {
      Response.error(response, {
        message: message,
      });
    } else {
      return Response.error(response, { message: message, format: "text" });
    }
  };
}

module.exports = ErrorHandler;
