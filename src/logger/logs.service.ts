import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import * as fs from 'fs';
import { LogData } from './interfaces/log-data.interface';
import { EnvironmentVariables } from 'src/config/environment-variables.interface';
import { BYTE_PER_CHAR } from 'src/config/const';

@Injectable()
export default class LogsService {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  private saveToFile(logDirectory: string, log: string): void {
    const logsFolder = this.configService.get('LOGS_FOLDER');
    const maxFileSize = this.configService.get('LOG_FILE_MAX_SIZE');

    if (!fs.existsSync(logsFolder)) {
      fs.mkdirSync(logsFolder);
    }

    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory);

      fs.appendFileSync(
        path.resolve(logDirectory, `log_${Date.now()}.txt`),
        log,
      );

      return;
    }

    const lastFile = fs.readdirSync(logDirectory).sort().pop();

    const isFull =
      fs.statSync(path.resolve(logDirectory, lastFile)).size +
        log.length * BYTE_PER_CHAR >
      maxFileSize;

    fs.appendFileSync(
      path.resolve(logDirectory, isFull ? `log_${Date.now()}.txt` : lastFile),
      log,
    );
  }

  saveLog({ message, context, level }: LogData) {
    const logDirectory = this.configService.get('LOG_DIR');
    const logString = `${level} ${context} ${message}\n`;

    this.saveToFile(logDirectory, logString);
  }

  saveError({ message, context, level }: LogData) {
    const errorDirectory = this.configService.get('ERR_DIR');
    const logString = `${level} ${context} ${message}\n`;

    this.saveToFile(errorDirectory, logString);
  }
}
