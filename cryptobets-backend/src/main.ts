import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { AppModule } from "models/app/app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true,
      skipUndefinedProperties: true,
    }),
  );
  app.enableCors({ credentials: true, origin: true });
  await app.listen(3008);
}
bootstrap();
