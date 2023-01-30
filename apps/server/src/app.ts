import {
  INestApplication,
  NestApplicationOptions,
  ValidationPipe,
} from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './util/query/exceptions/all-exceptions.filter';
import { createApiCenter } from './util/swagger/swagger';

let app: INestApplication;

type WebServerOptions = {
  port?: string;
  ci?: boolean;
};

const RADOM_PORT = 0;

export async function initializeWebServer(options: WebServerOptions = {}) {
  app = await NestFactory.create(AppModule, prepareOptions(options.ci));

  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  createApiCenter(app);
  await app.listen(options.port ?? RADOM_PORT);

  return app.getHttpServer().address();
}

export const stopWebServer = async () => {
  if (app) {
    return await app.close();
  }
};

const prepareOptions = (ci?: boolean): NestApplicationOptions | undefined => {
  return ci ? { logger: false } : undefined;
};
