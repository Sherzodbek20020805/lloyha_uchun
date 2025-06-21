import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Shift Scheduler API')
    .setDescription('Shift va User uchun API — *super mukammal*')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'jwt-auth')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
    customSiteTitle: '⚡ Shift Scheduler Docs',
    customCss: '.swagger-ui .topbar { background-color: #292929; }',
  });

  await app.listen(3000);
  console.log('⚡ App up! Swagger: http://localhost:3000/api-docs');
}

bootstrap();
