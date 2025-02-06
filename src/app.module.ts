import { Module, OnModuleInit } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { RecomendationsModule } from './recomendations/recomendations.module';
import { ServeStaticModule } from '@nestjs/serve-static';  // Asegúrate de que esta línea esté presente
import * as path from 'path';


@Module({
  imports: [
    ArticlesModule,
    PrismaModule,
    AuthModule,
    RecomendationsModule,
    // Configuración para servir archivos estáticos
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'uploads'),  // La carpeta 'uploads' donde se almacenan las imágenes
      serveRoot: '/uploads',  // URL base para acceder a las imágenes
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly authService: AuthService) {}

  // Método para crear el admin inicial si es necesario
  //async onModuleInit() {
    //await this.authService.createInitialAdmin();
  //}
}

