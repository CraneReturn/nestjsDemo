import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import * as dayjs from 'dayjs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileEntity } from './file.entity';
import { FileService } from './file.service';
@Module({
  controllers: [FileController],
  imports: [TypeOrmModule.forFeature([FileEntity]),
  MulterModule.register({
    // storage: diskStorage({
    //   //设置上传文件的路径
    //   destination: `./public/uploads/${dayjs().format('YYYY-MM-DD')}`,
    //   filename: (req, file, cb) => {
    //     //文件上传之后的回调，文件为空不走
    //     //取出结尾的类型为扩展名
    //     let ext = file.originalname.split('.').at(-1)
    //     // 在此处自定义保存后的文件名称，仍然使用原后缀名，没有就不用
    //     let filename = `${new Date().getTime()}.${ext ? ext : ''}`
    //     return cb(null, filename)

    //   },
    // }),
  }),
  ],
  providers: [FileService]

})
export class FileModule {

}
