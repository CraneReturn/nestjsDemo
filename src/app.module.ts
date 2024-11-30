import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuModule } from './modules/menu/menu.module';
@Module({
  imports: [UserModule, AuthModule,TypeOrmModule.forRoot(
    {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'WZY572523',
      database: 'testnestjs',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      //自动更新表的键名
    },
  ), MenuModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
