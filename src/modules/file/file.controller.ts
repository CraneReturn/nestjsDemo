import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { wrapperResponse } from 'src/utils';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
    constructor(private fileService:FileService){}
    @Post('/upload')
    @UseInterceptors(FileInterceptor('file'))
    upload(@UploadedFile() file: Express.Multer.File) {
        return wrapperResponse(
             this.fileService.uploadFile(file),
            '上传文件成功'
        )

    }
    //多文件上传
    @Post('/uploads')
    uploads(@UploadedFile() files: Array<Express.Multer.File>) {
        console.log(files);
    }
    //上传携带其他参数
    @Post('/uploadParams')
    uploadParams(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
        // console.log(file, query);
    }
}
