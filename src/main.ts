import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { AllExceptionsFilter } from './filter/all-exception.filter';
async function bootstrap() {
  //允许跨域
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use('/public', express.static(`${__dirname}/../public`));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
