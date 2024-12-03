import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
//可以被注入到controller
export class BookService {
    constructor(@InjectRepository(Book) private readonly bookRepository: Repository<Book>
    ) { }
    //分页和查询
    getBookList(query: any = {}) {
        let page = query.page || 1;
        let pageSize = query.pageSize || 10;
        const { title, author } = query;
        if (page < 0) {
            page = 1;
        }
        if (pageSize < 0) {
            pageSize = 10;
        }
        let where = 'where 1=1'
        if (title) {
            where += ` and title like '%${title}%'`;
        }
        if (author) {
            where += ` and author like '%${author}%'`;
        }
        const sql = `select * from book ${where} limit ${pageSize} offset ${(page - 1) * pageSize}`;
        return this.bookRepository.query(sql);
    }
    //第二种使用typeorm 模糊匹配
    getBookListTypeorm(query: BookDto) {
        const { page, pageSize, title, author } = query;
        const take = pageSize || 10;
        return this.bookRepository.find({
            //设置需要返回的数据
            select: ['id', 'title', 'author', 'cover'],
            where: {
                title: title ? Like(`%${title}%`) : undefined,
                author: author ? Like(`%${author}%`) : undefined,
            },
            relations: {
                //设置关联表
            },
            skip: (page - 1) * pageSize,
            take//分页条件
        })
    }
    

    //返回total
    countBookList(query: any = {}) {
        const { title, author } = query;
        let where = 'where 1=1'
        if (title) {
            where += ` and title like '%${title}%'`;
        }
        if (author) {
            where += ` and author like '%${author}%'`;
        }
        const sql = `select count(*) as count from book ${where}`;
        return this.bookRepository.query(sql);
    }
    //上传文件本地上传
    
}
