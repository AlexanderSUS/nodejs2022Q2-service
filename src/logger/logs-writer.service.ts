import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import * as fs from 'fs';
import { LogData } from './interfaces/log-data.interface';
import { EnvironmentVariables } from 'src/config/environment-variables.interface';
import { BYTE_PER_CHAR } from 'src/config/const';

@Injectable()
export default class LogsWriterService {
  allLogsDirectory: string;
  maxFileSize: number;
  logDirectory: string;
  errorDirectory: string;

  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {
    this.allLogsDirectory = this.configService.get('LOGS_FOLDER');
    this.maxFileSize = this.configService.get('LOG_FILE_MAX_SIZE');
    this.logDirectory = this.configService.get('LOG_DIR');
    this.errorDirectory = this.configService.get('ERR_DIR');
  }

  private saveToFile(logDirectory: string, log: string): void {
    if (!fs.existsSync(this.allLogsDirectory)) {
      fs.mkdirSync(this.allLogsDirectory);
    }

    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory);

      fs.appendFileSync(
        path.resolve(logDirectory, `log_${Date.now()}.txt`),
        log,
      );

      return;
    }

    const lastFileName = fs.readdirSync(logDirectory).sort().pop();

    const isFileFull =
      fs.statSync(path.resolve(logDirectory, lastFileName)).size +
        log.length * BYTE_PER_CHAR >
      this.maxFileSize;

    fs.appendFileSync(
      path.resolve(
        logDirectory,
        isFileFull ? `log_${Date.now()}.txt` : lastFileName,
      ),
      log,
    );
  }

  saveLog({ message, context, level }: LogData) {
    this.saveToFile(this.logDirectory, `${level} ${context} ${message}\n`);
  }

  saveError({ message, context, level }: LogData) {
    this.saveToFile(this.errorDirectory, `${level} ${context} ${message}\n`);
  }
}
