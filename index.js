import winston from "winston";

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: false }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({
      dirname: "./logs",
      filename: "error.log",
      level: "error",
    }),
    new winston.transports.File({
      dirname: "./logs",
      filename: "combined.log",
    }),
    new winston.transports.Console(),
  ],
});

function level() {
  logger.error("testing error");
  logger.warn("testing warn");
  logger.info("testing info");
  logger.verbose("testing verbose");
  logger.debug("testing debug");
  logger.silly("testing silly");
}

function errorTest() {
  try {
    throw new Error("This is error message!");
  } catch (error) {
    logger.error(error);
  }
}

function intervalInfo() {
  setInterval(() => {
    logger.info(`This is interval info message: ${new Date().toISOString()}`);
  }, 2000);
}

function intervalWarn() {
  setInterval(() => {
    logger.warn(`This is interval warn message: ${new Date().toISOString()}`);
  }, 5000);
}

function intervalError() {
  setInterval(() => {
    logger.error(`This is interval error message: ${new Date().toISOString()}`);
  }, 10000);
}

function main() {
  level();
  errorTest();
  intervalInfo();
  intervalWarn();
  intervalError();
}

main();
