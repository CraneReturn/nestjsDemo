import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { wrapperResponse } from 'src/utils';
@Controller('user')
export class UserController {
    constructor(private readonly UserService: UserService) { }
    @Get('/userinfor')
    getUserByToken(@Req() req) {
        return wrapperResponse(
            this.UserService.findByToken(req.user.userid),
            "获取用户信息成功",
        );
    }
      //查询用户点赞过的文件
      @Get('/getLikeFile')
      getLikeFile(@Req() req) {
          const { userid } = req.user;
          return this.UserService.getLikedFiles(userid);
      }
    @Get('/:id')
    getUser(@Param('id', ParseIntPipe) id: number) {
        return this.UserService.findOne(id);
    }
  
    @Get('/findAll')
    getAllUser() {
        return this.UserService.findAll();
    }
    @Post('/add')
    addUser(@Body() body) {
        return this.UserService.addUser(body);
    }
    @Delete('/delete/:id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.UserService.deleteUser(id);
    }

}
