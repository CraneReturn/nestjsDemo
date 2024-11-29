import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.gurd';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
  controllers: [AuthController],
  providers: [AuthService,{
    provide: 'APP_GUARD',
    useClass: AuthGuard,
  }],
  //导入user模块 使得authService可以使用userService中的方法
  imports: [UserModule,JwtModule.register({
    secret: 'hahasecret',
    global: true,
    signOptions: { expiresIn: '24h' },
  })],
})
export class AuthModule {}
