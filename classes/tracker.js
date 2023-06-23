const winston = require("winston");
const path = require("path");
const moment = require("moment");

class Tracker {
  constructor() {
    this.logger = winston.createLogger({
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        winston.format.printf((info) => {
          const uuidString = info.uuid ? ` | UUID: ${info.uuid}` : "";
          return `${info.level.toUpperCase()} - ${
            info.timestamp
          }${uuidString} | MESSAGE: ${info.message}`;
        })
      ),
      transports: [
        new winston.transports.File({
          filename: path.join(
            __dirname,
            `../logs/tracker/${moment().format("YYYY-MM-DD")}.log`
          ),
        }),
      ],
    });

    if (process.env.NODE_ENV !== "production") {
      this.logger.add(new winston.transports.Console());
    }
  }

  info = (uuid, message) => {
    if (typeof message !== "string") {
      this.logger.error({
        uuid,
        message: "message must be strings",
      });
      return;
    }

    this.logger.info({
      uuid,
      message,
    });
  };

  error = (uuid, message) => {
    this.logger.error({
      uuid,
      message,
    });
  };
}

module.exports = new Tracker();
