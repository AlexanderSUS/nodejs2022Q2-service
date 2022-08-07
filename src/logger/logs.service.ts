import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import { lstat, readdir, appendFile } from 'fs/promises';
import { LogData } from './types/logData';

@Injectable()
export default class LogsService {
  constructor(private readonly configService: ConfigService) {}

  async saveLog({ message, context, level }: LogData) {
    const BYTE_PER_CHAR = 2;
    const maxFileSize = this.configService.get('logFileMaxSize');
    const logDir = this.configService.get('logDir');
    const fileName = this.configService.get('logFileName');
    const logString = `${level} ${context} ${message}\n`;

    const lastModifiedFile = (await readdir(logDir)).sort().pop();
    const fileSize = (await lstat(path.resolve(logDir, lastModifiedFile))).size;

    await appendFile(
      path.resolve(
        logDir,
        fileSize + logString.length * BYTE_PER_CHAR > maxFileSize
          ? `${fileName}${Date.now()}.txt`
          : lastModifiedFile,
      ),
      logString,
    );
  }

  async saveError({ message, context, level }: LogData) {
    const maxFileSize = this.configService.get('logFileMaxSize');
    const errorDir = this.configService.get('errDir');
    const fileName = this.configService.get('logFileName');
    const BYTE_PER_CHAR = 2;
    const logString = `${level} ${context} ${message}\n`;

    const lastModifiedFile = (await readdir(errorDir)).sort().pop();
    const fileSize = (await lstat(path.resolve(errorDir, lastModifiedFile)))
      .size;

    await appendFile(
      path.resolve(
        errorDir,
        fileSize + logString.length * BYTE_PER_CHAR > maxFileSize
          ? `${fileName}${Date.now()}.txt`
          : lastModifiedFile,
      ),
      logString,
    );
  }
}
