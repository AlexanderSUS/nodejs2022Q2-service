import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import CustomLogger from './logger/custom-logger';
import './utils/externalErrorLoger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });

  const customLogger = app.get(CustomLogger);

  app.useLogger(customLogger);

  const config = app.get(ConfigService);

  const docConfig = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('The Home Library Service API description')
    .setVersion('1.0')
    .addTag('Home Library')
    .build();

  const document = SwaggerModule.createDocument(app, docConfig);

  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  const port = config.get('port');

  await app.listen(port, () => {
    console.log(`Listening at http://loaclhost: ${port}`);
  });
}
bootstrap();
