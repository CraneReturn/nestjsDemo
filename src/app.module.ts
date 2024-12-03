import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MenuModule } from './modules/menu/menu.module';
import { BookModule } from './modules/book/book.module';
import { FileModule } from './modules/file/file.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigEnum } from './enums/config.enum';
import { LikeModule } from './modules/like/like.module';
@Module({
  imports: [UserModule, AuthModule, ConfigModule.forRoot({
    isGlobal: true, // 设置为全局模块
  }),
    //  TypeOrmModule.forRoot(
    //   {
    //     type:,
    //     host: 'localhost',
    //     port: 3306,
    //     username: 'root',
    //     password: 'WZY572523',
    //     database: 'testnestjs',
    //     entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //     synchronize: true,
    //     //自动更新表的键名
    //   },
    // ),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbType = configService.get<string>(ConfigEnum.DB_TYPE);
        if (!dbType) {
            throw new Error('Database type is not defined in the environment variables.');
        }
        return {
            type: dbType,
            host: configService.get<string>(ConfigEnum.DB_HOST) || 'localhost',
            username: configService.get<string>(ConfigEnum.DB_USERNAME) || 'root',
            password: configService.get<string>(ConfigEnum.DB_PASSWORD) || '',
            database: configService.get<string>(ConfigEnum.DB_DATABASE) || 'testnestjs',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
        } as TypeOrmModuleOptions;
    },
    }),
    MenuModule, BookModule, FileModule, LikeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
