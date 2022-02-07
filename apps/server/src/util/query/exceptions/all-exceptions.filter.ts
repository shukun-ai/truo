import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { get, isObject } from 'lodash';
import { MongoError } from 'mongodb';
import { Error as MongooseError } from 'mongoose';

import {
  EXCEPTION_STACK_NAME,
  EXCEPTION_WEBHOOK_TEST_NAME,
} from '../../../app.constant';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  override catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      return this.handleHttpError(response, exception);
    }

    if (exception?.constructor?.name === MongoError.name) {
      return this.handleMongoError(response, exception);
    }

    if (exception?.constructor?.name === MongooseError.CastError.name) {
      return this.handleCastError(response, exception);
    }

    return this.handleUnknownError(response, exception);
  }

  handleHttpError(response: Response, exception: HttpException) {
    const statusCode = exception.getStatus();
    const res = exception.getResponse();
    const message = isObject(res)
      ? get(res, 'message', 'Unknown http error message.')
      : res;
    return this.sendResponse(response, exception, message, statusCode);
  }

  handleMongoError(response: Response, exception: MongoError) {
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception.message;
    return this.sendResponse(response, exception, message, statusCode);
  }

  handleCastError(response: Response, exception: MongooseError.CastError) {
    const statusCode = HttpStatus.BAD_REQUEST;
    const message = `The ObjectId '${exception.value}' is not a valid format.`;
    return this.sendResponse(response, exception, message, statusCode);
  }

  override handleUnknownError(response: Response, exception: unknown) {
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    // @todo should use logger instead of returning message error directly for security and human-readable.
    const message = get(exception, 'message', 'Unknown Internal Error.');
    console.error(exception);
    return this.sendResponse(response, exception, message, statusCode);
  }

  sendResponse(
    response: Response,
    exception: any,
    message: string,
    statusCode: HttpStatus,
  ) {
    const { workflowTestMode, workflowLog, stack } = exception;
    return response.status(statusCode).json({
      statusCode: statusCode,
      message: message,
      error: exception?.name || 'UnknownException',
      ...(workflowTestMode && {
        [EXCEPTION_WEBHOOK_TEST_NAME]: workflowLog,
      }),
      ...(workflowTestMode &&
        stack && {
          [EXCEPTION_STACK_NAME]: stack,
        }),
    });
  }
}
