import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
//可以被注入到controller
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getData(params):string{
    // return 'now i will return data'
    //参数不存在
    console.log(params);
    
    if(!params.id){
      throw new HttpException('参数不对',HttpStatus.BAD_REQUEST)
    }else{
      return 'now i will return data'
    }
  }
}
