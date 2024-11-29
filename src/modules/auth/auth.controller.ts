import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import { Public } from './public.decorator';
import { AuthService } from './auth.service';
import { HttpExceptionFilter } from 'src/exception/http-excpetion.filter';
import { successMethods, errorMethods } from 'src/utils';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }
    @Public()
    @Post('/login')
    @UseFilters(new HttpExceptionFilter())
    async login(@Body() body) {
        const { username, password } = body;
        try {
            const data = await this.authService.login(username, password);
            return successMethods(data, '登录成功');
        } catch (error) {
            return errorMethods('登录失败');
        }
    }
}
