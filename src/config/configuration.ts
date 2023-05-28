export const configuration = () => {
  return {
    port: process.env.PORT,
    logLevel: process.env.LOG_LEVEL,
    logFileMaxSize: process.env.LOG_FILE_MAX_SIZE,
    errDir: process.env.ERR_DIR,
    logDir: process.env.LOG_DIR,
    logsFolder: process.env.LOGS_FOLDER,
  };
};
