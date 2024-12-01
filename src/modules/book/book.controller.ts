import { Controller, Get, Query } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
    constructor(private readonly bookService:BookService) { }
    @Get('/list')
    getBookList(@Query() query){
        return this.bookService.getBookList(query);
    }
    @Get('/listtyprom')
    getBookListTypeorm(@Query() query){
        return this.bookService.getBookListTypeorm(query);
    }
}
