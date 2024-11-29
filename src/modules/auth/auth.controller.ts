import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from './public.decorator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){
    }
    @Public()
    @Post('/login')
    async login(@Body() body){
        const {username,password} = body;
       return this.authService.login(username,password);
    }
}
