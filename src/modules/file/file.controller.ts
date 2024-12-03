import { Body, Controller, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { responseMessage, returnResponse, wrapperResponse } from 'src/utils';
import { FileService } from './file.service';
import { Response } from 'express';
import { RESPONSE_CODE } from 'src/enums';
import { ResponseDto } from 'src/dto/response.dto';
@Controller('file')
export class FileController {
    constructor(private fileService: FileService) { }
    @Post('/upload')
    @UseInterceptors(FileInterceptor('file'))
    async upload(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
        //上传到磁盘也上传到minio
        const result = await this.fileService.uploadFileMinio(file);
        return returnResponse(result, res)
    }
    @Post('/uploadminio')
    @UseInterceptors(FileInterceptor('file'))

    async uploadminio(@UploadedFile() file: Express.Multer.File, @Res() res: Response): Promise<Response> {
        const result = await this.fileService.uploadMinio(file);
        return returnResponse(result, res)

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
