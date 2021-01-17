import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from './config/config.service';
import { PORT_KEY } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const opts = new DocumentBuilder()
    .setTitle('Workclass Takehome Swagger Docs')
    .setDescription('API documentation for Workclass takehome assignment')
    .addServer('https://workclass-takehome-backend.herokuapp.com')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, opts);
  SwaggerModule.setup('docs', app, document);

  const configService: ConfigService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: false }));
  await app.listen(configService.getConfig(PORT_KEY) || 3000);
}
bootstrap();
