import { Injectable } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from './file.entity'; // 你的文件实体

@Injectable()
export class FileService {
    constructor(
        @InjectRepository(FileEntity)
        private readonly fileRepository: Repository<FileEntity>,
    ) {}

     uploadFile(mfile: Express.Multer.File): Promise<FileEntity> {
        console.log(mfile);
        if (!mfile) {
            throw new HttpException('文件不存在', HttpStatus.BAD_REQUEST);
        }

        // 创建文件实体
        const fileEntity = new FileEntity();
        fileEntity.originalname = mfile.originalname;
        fileEntity.mimetype = mfile.mimetype;
        fileEntity.size = mfile.size;
        fileEntity.path = mfile.path; // 将文件内容存储为 Buffer

        // 保存到数据库
        return this.fileRepository.save(fileEntity);
    }
}
