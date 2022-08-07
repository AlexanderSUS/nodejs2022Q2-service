export const configuration = () => {
  return {
    port: process.env.PORT,
    logLevel: process.env.LOG_LEVEL,
    logFileMaxSize: process.env.LOG_FILE_MAX_SIZE,
    logDir: process.env.LOG_DIR,
    logFileName: process.env.LOG_FILE_NAME,
  };
};
