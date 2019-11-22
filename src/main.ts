import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { PlasmaService } from './contracts/root_chain/plasma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const plasma: PlasmaService = app.get(PlasmaService);
  plasma.listen();
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001);
}
bootstrap();
