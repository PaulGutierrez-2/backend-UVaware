import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configuración CORS
  app.enableCors({
    origin: 'http://localhost:4200',  // Permitir peticiones solo desde este dominio (ajustar según producción)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',  // Métodos permitidos
    allowedHeaders: 'Content-Type, Accept, Authorization',  // Encabezados permitidos
    credentials: true,  // Permitir el uso de cookies y encabezados de autenticación
  });

  // Configuración de Swagger
  const documentOptions = new DocumentBuilder()
    .setTitle('REST API')
    .setDescription('CRUD DE ARTICULOS DE CUIDADO DE PIEL')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, documentOptions);
  SwaggerModule.setup('api', app, document);

  // Configuración para servir archivos estáticos (como las imágenes subidas)
  app.useStaticAssets(path.join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',  // Accede a las imágenes con /uploads/ desde el cliente
  });

  // Escucha en el puerto especificado o el puerto 3000 por defecto
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
