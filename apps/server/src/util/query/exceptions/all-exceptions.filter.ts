import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import {
  BaseException,
  GatewayForbiddenException,
  GatewayUnauthorizedException,
  SourceDuplicateException,
  SourceRequiredException,
  SourceUnknownException,
  SourceValidateException,
} from '@shukun/exception';
import { Response } from 'express';
import { get, isObject } from 'lodash';

import {
  EXCEPTION_STACK_NAME,
  EXCEPTION_WEBHOOK_TEST_NAME,
} from '../../../app.constant';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  override catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      return this.handleHttpError(response, exception);
    }

    if (exception instanceof SourceRequiredException) {
      return this.handlePlatformException(response, exception, 400);
    }

    if (exception instanceof SourceDuplicateException) {
      return this.handlePlatformException(response, exception, 400);
    }

    if (exception instanceof SourceValidateException) {
      return this.handlePlatformException(response, exception, 400);
    }

    if (exception instanceof GatewayForbiddenException) {
      return this.handlePlatformException(response, exception, 403);
    }

    if (exception instanceof GatewayUnauthorizedException) {
      return this.handlePlatformException(response, exception, 401);
    }

    if (exception instanceof SourceUnknownException) {
      console.error(exception);
      return this.handlePlatformException(response, exception, 500);
    }

    return this.handleUnknownError(response, exception);
  }

  handlePlatformException(
    response: Response,
    exception: BaseException,
    statusCode: number,
  ) {
    return response.status(statusCode).json({
      statusCode: statusCode,
      message: exception.message,
      interpolationMap: exception.interpolationMap,
      internalServerCode: exception.name,
    });
  }

  /**
   * @deprecated
   */
  private handleHttpError(response: Response, exception: HttpException) {
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
      'Unknown',
    );
  }

  /**
   * @deprecated
   */
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
      'Unknown',
    );
  }

  /**
   * @deprecated
   */
  private sendResponse(
    response: Response,
    exception: any,
    message: string,
    statusCode: HttpStatus,
    internalServerCode: string,
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
