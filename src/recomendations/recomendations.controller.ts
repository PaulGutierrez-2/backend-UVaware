import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { RecomendationsService } from './recomendations.service';
import { CreateRecomendationDto } from './dto/create-recomendation.dto';
import { UpdateRecomendationDto } from './dto/update-recomendation.dto';
import { extname } from 'path';
import { join } from 'path';
import { Express } from 'express';

@Controller('recomendations')
export class RecomendationsController {
  constructor(private recomendationsService: RecomendationsService) {}

  // Función para manejar la carga de imágenes
  private handleImageUpload(file: Express.Multer.File): string {
    // Genera la ruta relativa para la imagen cargada
    return file ? `/uploads/${file.filename}` : null;
  }

  // Ruta para la carga de imágenes (para vistas previas)
  @Post('upload')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads', // La carpeta donde se guardarán las imágenes
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        callback(null, uniqueSuffix + extname(file.originalname)); // Genera un nombre único para el archivo
      },
    }),
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (file) {
      // Retorna la URL de la imagen cargada
      return { imgUrl: `/uploads/${file.filename}` };
    }
    return { message: 'No file uploaded' };
  }

  // Ruta para crear una recomendación
  @Post()
@UseInterceptors(FileInterceptor('image', {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      callback(null, uniqueSuffix + extname(file.originalname));
    },
  }),
}))
async createRecomendation(
  //@UploadedFile() file: Express.Multer.File,
  @Body() data: CreateRecomendationDto
) {
  /*if (!file) {
    throw new Error('No file uploaded');
  }*/

  // Obtener la URL de la imagen
  //const imgUrl = await this.recomendationsService.uploadImage(file);

  // Crear la recomendación con la URL de la imagen
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
