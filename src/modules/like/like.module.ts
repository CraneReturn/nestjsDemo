import { Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeFile } from './like.entity';
import { LikeService } from './like.service';
import { User } from 'src/modules/user/user.entity';
import { FileEntity } from 'src/modules/file/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LikeFile, User, FileEntity])],
  controllers: [LikeController],
  providers: [LikeService],
  exports: [LikeService],
})
export class LikeModule { }
