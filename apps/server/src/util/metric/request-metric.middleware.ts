import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestMetricMiddleware implements NestMiddleware {
  private readonly logger = new Logger(RequestMetricMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      if (duration > 1000 * 5) {
        this.logger.log(
          `[METRIC] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`,
        );
      }
    });
    next();
  }
}
