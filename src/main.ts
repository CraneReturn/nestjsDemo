import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  //允许跨域
  const app = await NestFactory.create(AppModule,{cors: true});
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
