import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class TestLogger implements LoggerService {
  private logs: string[] = [];

  log(message: string) {
    this.logs.push(message);
  }

  error(message: string, trace: string) {
    this.logs.push(`[error] ${message}`);
  }

  warn(message: string) {
    this.logs.push(`[warn] ${message}`);
  }

  getLogs() {
    return this.logs;
  }
}


