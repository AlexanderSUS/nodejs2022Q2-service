import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import * as fs from 'fs';
import { LogData } from './interfaces/log-data.interface';
import { EnvironmentVariables } from 'src/config/environment-variables.interface';

@Injectable()
export default class LogsService {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  saveLog({ message, context, level }: LogData) {
    const BYTE_PER_CHAR = 2;
    const logsFolder = this.configService.get('LOGS_FOLDER');
    const maxFileSize = this.configService.get('LOG_FILE_MAX_SIZE');
    const logDir = this.configService.get('LOG_DIR');
    const logString = `${level} ${context} ${message}\n`;

    if (!fs.existsSync(logsFolder)) {
      fs.mkdirSync(logsFolder);
    }

    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);

      fs.appendFileSync(
        path.resolve(logDir, `log_${Date.now()}.txt`),
        logString,
      );
    }

    const lastFile = fs.readdirSync(logDir).sort().pop();

    const isFull =
      fs.statSync(path.resolve(logDir, lastFile)).size +
        logString.length * BYTE_PER_CHAR >
      maxFileSize;

    fs.appendFileSync(
      path.resolve(logDir, isFull ? `log_${Date.now()}.txt` : lastFile),
      logString,
    );
  }

  saveError({ message, context, level }: LogData) {
    const BYTE_PER_CHAR = 2;
    const logsFolder = this.configService.get('LOGS_FOLDER');
    const maxFileSize = this.configService.get('LOG_FILE_MAX_SIZE');
    const errorDir = this.configService.get('ERR_DIR');
    const logString = `${level} ${context} ${message}\n`;

    if (!fs.existsSync(logsFolder)) {
      fs.mkdirSync(logsFolder);
    }

    if (!fs.existsSync(errorDir)) {
      fs.mkdirSync(errorDir);
      fs.appendFileSync(
        path.resolve(errorDir, `err_${Date.now()}.txt`),
        logString,
      );
    }

    const lastFile = fs.readdirSync(errorDir).sort().pop();

    const isFull =
      fs.statSync(path.resolve(errorDir, lastFile)).size +
        logString.length * BYTE_PER_CHAR >
      maxFileSize;

    fs.appendFileSync(
      path.resolve(errorDir, isFull ? `err_${Date.now()}.txt` : lastFile),
      logString,
    );
  }
}
