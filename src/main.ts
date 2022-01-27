import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(5050);

  // setInterval(() => {
  //   console.log('Checking...');
  // }, 5000);
}
bootstrap();
