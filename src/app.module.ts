import { Module, OnModuleInit } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service'; // Importa el AuthService
import { RecomendationsModule } from './recomendations/recomendations.module';

@Module({
  imports: [ArticlesModule, PrismaModule, AuthModule, RecomendationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { //implements OnModuleInit 
  constructor(private readonly authService: AuthService) {}

  // async onModuleInit() {
  //   Llamada al método de creación del admin inicial
  //   await this.authService.createInitialAdmin();
  // }
}

