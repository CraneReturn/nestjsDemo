import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
async function bootstrap() {
  //允许跨域
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use('/public', express.static(`${__dirname}/../public`));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
