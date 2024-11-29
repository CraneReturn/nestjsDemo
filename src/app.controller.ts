import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './exception/http-excpetion.filter';
//Params restful
//Query  url
//Body   post
@Controller()
export class AppController {
  //controll负责传入的请求和客户端返回的响应
  //控制路径
  constructor(private readonly appService: AppService) { }

  @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/data/:subid')
  @UseFilters(new HttpExceptionFilter())
  getHAHA(@Param() p): string {
    return this.appService.getData(p);
  }
  @Post('/data')
  getPost(@Body() body) {
    console.log(body);
    return 'post';
  }
  @Put('/changedata')
  getPut(@Body() body) {
    console.log(body);
    return 'put';
  }
  @Delete('/delete')
  getDelete(@Param () p ) {
    return 'delete';
  }
}
