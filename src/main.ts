import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import configuration from './config/configuration';

function buildSwagger(app: INestApplication) {
  const documentBuilder = new DocumentBuilder();

  documentBuilder.setTitle('Desafio-back API').setDescription('Teste').setVersion('1.0');

  const document = SwaggerModule.createDocument(app, documentBuilder.build());
  SwaggerModule.setup('/doc', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  buildSwagger(app);
  await app.listen(configuration().port, '0.0.0.0', async () => {
    console.log(`Server running on ${await app.getUrl()}`);
    Logger.log(`Server running on ${await app.getUrl()}`, 'Bootstrap');
  });
}

bootstrap();
