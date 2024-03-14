import winston from "winston";

const { combine, timestamp, json, printf } = winston.format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

export const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), json(), logFormat),
  transports: [
    new winston.transports.Console(),
  ],
});
