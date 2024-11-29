import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
    constructor(private readonly UserService:UserService) { }
    @Get('/:id')
    getUser(@Param('id',ParseIntPipe) id:number){
        return this.UserService.findOne(id);
    }
    @Get('/findAll')
    getAllUser(){
        return this.UserService.findAll();
    }
    @Post('/add')
    addUser(@Body() body){
        return this.UserService.addUser(body);
    }
    @Delete('/delete/:id')
    deleteUser(@Param('id',ParseIntPipe) id:number){
        return this.UserService.deleteUser(id);
    }
}
