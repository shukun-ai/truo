import {
  INestApplication,
  NestApplicationOptions,
  ValidationPipe,
} from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './util/query/exceptions/all-exceptions.filter';
import { createApiCenter } from './util/swagger/swagger';

export class WebServer {
  RADOM_PORT = 0;

  app?: INestApplication;

  constructor(private readonly options: WebServerOptions = {}) {}

  public async start() {
    this.app = await NestFactory.create(
      AppModule,
      this.prepareOptions(this.options.ci),
    );

    const { httpAdapter } = this.app.get(HttpAdapterHost);

    this.app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
    this.app.enableCors();
    this.app.useGlobalPipes(new ValidationPipe());
    createApiCenter(this.app);
    await this.app.listen(this.options.port ?? this.RADOM_PORT);

    return this.app.getHttpServer().address();
  }

  public async stop() {
    if (this.app) {
      return await this.app.close();
    }
  }

  private prepareOptions(ci?: boolean): NestApplicationOptions | undefined {
    return ci ? { logger: false } : undefined;
  }
}

type WebServerOptions = {
  port?: string;
  ci?: boolean;
};
