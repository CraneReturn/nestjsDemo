import { Injectable } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from './file.entity'; // 你的文件实体
import { minioClient } from './minio';
import { join } from 'path';
import { existsSync, unlink, unlinkSync } from 'fs';
@Injectable()
export class FileService {
    constructor(
        @InjectRepository(FileEntity)
        private readonly fileRepository: Repository<FileEntity>,
    ) { }

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
        fileEntity.path = mfile.path;

        // 保存到数据库
        return this.fileRepository.save(fileEntity);
    }
    putFile(filename, path) {
        console.log(filename, path);
        return minioClient.fPutObject('nest', filename,
            path)
    }


    putFilebuffer(filename: string, buffer: Buffer) {
        //如果想两个端都存在文件，可以使用 fPutObject 逻辑更简单
        return minioClient.putObject(
            'nest',
            filename,
            buffer
        )
    }
    //获取url签名
    presUrl(filename: string) {
        return minioClient.presignedUrl(
            'GET',
            'nest',
            filename,

        )
    }
    //即上传到服务器也上传到磁盘
    async uploadFileMinio(mfile: Express.Multer.File) {
        console.log(4444);

        if (!mfile) {
            throw new HttpException('文件不存在', HttpStatus.BAD_REQUEST);
        }
        let url = null
        const linkPath = join(__dirname, `../../${mfile.path}`)
        try {
            await this.putFile(mfile.filename, mfile.path)
            url = await this.presUrl(mfile.filename)
        } catch (e) {
            existsSync(linkPath) && unlinkSync(linkPath)

            throw new HttpException('上传失败', HttpStatus.BAD_REQUEST);
        }
        existsSync(linkPath) && unlinkSync(linkPath)
        return { url }
    }
    //单上传到服务器 返回url
    
    async uploadMinio(mfile: Express.Multer.File) {
        console.log(mfile);

        if (!mfile) {
            throw new HttpException('文件不存在', HttpStatus.BAD_REQUEST);
        }

        // 确保 originalname 是字符串
        const { originalname } = mfile;
        if (typeof originalname !== 'string') {
            throw new HttpException('文件名无效', HttpStatus.BAD_REQUEST);
        }

        // 生成文件扩展名
        let ext = originalname.split('.').at(-1);
        let filename = `${new Date().getTime()}.${ext ? ext : ''}`;

        try {

            if (!Buffer.isBuffer(mfile.buffer)) {
                throw new HttpException('文件数据无效', HttpStatus.BAD_REQUEST);
            }

            await this.putFilebuffer(filename, mfile.buffer);

            let url = await this.presUrl(filename);
            console.log(url);

            return { url };
        } catch (e) {
            console.log(e, 'qqqq');
            throw new HttpException('上传失败', HttpStatus.BAD_REQUEST);
        }
    }

}
