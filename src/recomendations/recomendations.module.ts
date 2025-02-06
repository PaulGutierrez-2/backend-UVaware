import { Module } from '@nestjs/common';
import { RecomendationsService } from './recomendations.service';
import { RecomendationsController } from './recomendations.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [RecomendationsController],
  providers: [RecomendationsService],
  imports: [PrismaModule],
})
export class RecomendationsModule {}
