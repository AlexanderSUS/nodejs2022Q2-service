import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';

export const externalLogger = process
  .on('unhandledRejection', (reason, p) => {
    const logString = `${reason}, Unhandled Rejection at Promise', ${p}`;
    const BYTE_PER_CHAR = 2;

    console.error(reason, 'Unhandled Rejection at Promise', p);

    if (!fs.existsSync(process.env.LOGS_FOLDER)) {
      fs.mkdirSync(process.env.LOGS_FOLDER);
      fs.mkdirSync(process.env.ERR_DIR);

      fs.appendFileSync(
        path.resolve(process.env.ERR_DIR, `err_${Date.now()}.txt`),
        logString,
      );
    } else {
      const lastFile = fs.readdirSync(process.env.ERR_DIR).sort().pop();

      const isFull =
        fs.statSync(path.resolve(process.env.ERR_DIR, lastFile)).size +
          logString.length * BYTE_PER_CHAR >
        parseInt(process.env.LOG_FILE_MAX_SIZE, 10);

      fs.appendFileSync(
        path.resolve(
          process.env.ERR_DIR,
          isFull ? `err_${Date.now()}.txt` : lastFile,
        ),
        logString,
      );
    }
  })
  .on('uncaughtException', (err) => {
    const logString = `${err}, Uncaught Exception thrown`;

    console.error(logString);

    const BYTE_PER_CHAR = 2;

    if (!fs.existsSync(process.env.LOGS_FOLDER)) {
      fs.mkdirSync(process.env.LOGS_FOLDER);
      fs.mkdirSync(process.env.ERR_DIR);

      fs.appendFileSync(
        path.resolve(process.env.ERR_DIR, `err_${Date.now()}.txt`),
        logString,
      );
    } else {
      const lastFile = fs.readdirSync(process.env.ERR_DIR).sort().pop();

      const isFull =
        fs.statSync(path.resolve(process.env.ERR_DIR, lastFile)).size +
          logString.length * BYTE_PER_CHAR >
        parseInt(process.env.LOG_FILE_MAX_SIZE, 10);

      fs.appendFileSync(
        path.resolve(
          process.env.ERR_DIR,
          isFull ? `err_${Date.now()}.txt` : lastFile,
        ),
        logString,
      );
    }

    process.exit(1);
  });
