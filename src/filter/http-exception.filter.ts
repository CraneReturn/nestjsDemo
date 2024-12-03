import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { responseMessage } from "src/utils";
//HttpException 类实例的异常
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter{
   catch(exception: HttpException, host: ArgumentsHost) {
       //获取上下文
       const ctx = host.switchToHttp();
       //获取响应体
       const response = ctx.getResponse();
       //获取请求体
       const statusCode = exception.getStatus();
       //自定义返回体
       console.log('444',exception);
       response.status(statusCode).json(responseMessage(
         null,
         exception.message,statusCode
       ))
   }
}