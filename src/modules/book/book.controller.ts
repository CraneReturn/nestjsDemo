import { Body, Controller, Get, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BookService } from './book.service';
import { wrapperCountResponse } from 'src/utils';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) { }
    @Get('/list')
    getBookList(@Query() query) {
        // return 
        return wrapperCountResponse(
            this.bookService.getBookList(query),
            this.bookService.countBookList(query),
            '获取成功'
        )
    }
    @Get('/listtyprom')
    getBookListTypeorm(@Query() query) {
        return wrapperCountResponse(
            this.bookService.getBookList(query),
            this.bookService.countBookList(query),
            '获取成功'
        )
    }
    //单文件上传
    // @Post('/upload')
    // @UseInterceptors(FileInterceptor('file'))
    // upload(@UploadedFile() file: Express.Multer.File) {
    //     console.log(file);
    //     //接收文件 formdata

        
    // }
    // //多文件上传
    // @Post('/uploads')
    // uploads(@UploadedFile() files:Array<Express.Multer.File>) {
    //     console.log(files);
    // }
    // //上传携带其他参数
    // @Post('/uploadParams')
    // uploadParams(@Body() body :any, @UploadedFile() file: Express.Multer.File) {
    //     // console.log(file, query);
    // }
}
