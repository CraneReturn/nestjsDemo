import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { LikeModule } from '../like/like.module';
@Module({
  imports: [TypeOrmModule.forFeature([User]),LikeModule],
  //数据库和entity的映射关系
  controllers: [UserController],
  providers: [UserService,User],
  //使得其他模块可以使用这个userService
  exports: [UserService],
})
export class UserModule { }
