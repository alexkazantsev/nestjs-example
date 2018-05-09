import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cors from 'cors';

import { ApplicationModule } from './app.module';
import { ReqeustLoggerInterceptor } from './interceptors';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.use(cors());
  app.useGlobalInterceptors(new ReqeustLoggerInterceptor());

  const options = new DocumentBuilder()
    .setTitle('REST API Example')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
