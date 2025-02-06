import { Controller, Get, Post, Body, Patch, Param, Delete, Put} from '@nestjs/common';
import { RecomendationsService } from './recomendations.service';
import { CreateRecomendationDto } from './dto/create-recomendation.dto';
import { UpdateRecomendationDto } from './dto/update-recomendation.dto';

@Controller('recomendations')
export class RecomendationsController {
  constructor(private recomendationsService: RecomendationsService) {}

   @Post()
    async createRecomendation(@Body() data: CreateRecomendationDto) {
      return this.recomendationsService.createRecomendation(data);
    }
  
    @Get()
    async getAllRecomendations() {
      return this.recomendationsService.getAllRecomendations();
    }
  
    @Get(':id')
    async getRecomendationById(@Param('id') id: string) {
      return this.recomendationsService.getRecomendationById(Number(id));
    }
  
    @Put(':id')
    async updateRecomendation(@Param('id') id: string, @Body() data: UpdateRecomendationDto) {
      return this.recomendationsService.updateRecomendation(Number(id), data);
    }
  
    @Delete(':id')
    async deleteRecomendation(@Param('id') id: string) {
      return this.recomendationsService.deleteRecomendation(Number(id));
    }
  }