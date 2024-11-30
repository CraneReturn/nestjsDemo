import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import { Public } from './public.decorator';
import { AuthService } from './auth.service';
import { HttpExceptionFilter } from 'src/exception/http-excpetion.filter';
import { successMethods, errorMethods, wrapperResponse } from 'src/utils';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }
    @Public()
    @Post('/login')
    @UseFilters(new HttpExceptionFilter())
    login(@Body() body) {
        const { username, password } = body;
        return wrapperResponse(this.authService.login(username, password), '登录成功')
    }
}
