import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { InternalServerCode } from '@shukun/api';
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

    if (
      typeof exception?.message === 'string' &&
      exception?.message.startsWith('E11000 duplicate key error collection')
    ) {
      return this.handleMongoDuplicateError(response, exception);
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
    return this.sendResponse(
      response,
      exception,
      message,
      statusCode,
      InternalServerCode.Unknown,
    );
  }

  handleMongoDuplicateError(response: Response, exception: MongoError) {
    const statusCode = HttpStatus.BAD_REQUEST;
    const message = exception.message;
    return this.sendResponse(
      response,
      exception,
      message,
      statusCode,
      InternalServerCode.DuplicateValue,
    );
  }

  handleMongoError(response: Response, exception: MongoError) {
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception.message;
    return this.sendResponse(
      response,
      exception,
      message,
      statusCode,
      InternalServerCode.Unknown,
    );
  }

  handleCastError(response: Response, exception: MongooseError.CastError) {
    const statusCode = HttpStatus.BAD_REQUEST;
    const message = `The ObjectId '${exception.value}' is not a valid format.`;
    return this.sendResponse(
      response,
      exception,
      message,
      statusCode,
      InternalServerCode.ObjectIdErrorFormat,
    );
  }

  override handleUnknownError(response: Response, exception: unknown) {
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    // @todo should use logger instead of returning message error directly for security and human-readable.
    const message = get(exception, 'message', 'Unknown Internal Error.');
    console.error(exception);
    return this.sendResponse(
      response,
      exception,
      message,
      statusCode,
      InternalServerCode.Unknown,
    );
  }

  sendResponse(
    response: Response,
    exception: any,
    message: string,
    statusCode: HttpStatus,
    internalServerCode: InternalServerCode,
  ) {
    const { workflowTestMode, workflowLog, stack } = exception;
    return response.status(statusCode).json({
      internalServerCode,
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
