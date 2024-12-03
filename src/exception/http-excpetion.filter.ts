
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('被输出值{  }的输出结果是：', );
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    console.log(exception);
        
    response
      .status(status)
      .json({
        code:-1,
        statusCode: status,
        message:exception.message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
