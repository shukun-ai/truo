import { INestApplication, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './util/query/exceptions/all-exceptions.filter';
import { createApiCenter } from './util/swagger/swagger';

let app: INestApplication;

export async function initializeWebServer(port?: number | string) {
  app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  createApiCenter(app);
  await app.listen(port ?? 0);

  return app.getHttpServer().address();
}

export const stopWebServer = async () => {
  if (app) {
    return await app.close();
  }
};
