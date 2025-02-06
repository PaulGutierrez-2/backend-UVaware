import { Injectable } from '@nestjs/common';
import { CreateRecomendationDto } from './dto/create-recomendation.dto';
import { UpdateRecomendationDto } from './dto/update-recomendation.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as path from 'path';

@Injectable()
export class RecomendationsService {
  constructor(private prisma: PrismaService) {}

  // Método para subir la imagen y devolver la URL completa
  async uploadImage(file: Express.Multer.File): Promise<string> {
    // Asegúrate de que la imagen se guarde en la carpeta 'uploads'
    const filePath = `uploads/${file.filename}`;

    // Aquí se crea la URL completa para acceder a la imagen
    const imageUrl = `http://localhost:3000/${filePath}`;
    return imageUrl;
  }

  // Método para crear una recomendación y almacenar la URL de la imagen
async createRecomendation(data: Omit<CreateRecomendationDto, 'idrecomendations'>) {
  return this.prisma.recomendations.create({
    data: {
      title: data.title,
      description: data.description,
      img: data.img, // Ya tenemos la URL de la imagen
    } as Prisma.recomendationsUncheckedCreateInput, 
  });
}


  async getAllRecomendations() {
    return this.prisma.recomendations.findMany();
  }

  async getRecomendationById(id: number) {
    return this.prisma.recomendations.findUnique({ where: { idrecomendations: id } });
  }

  async updateRecomendation(id: number, data: UpdateRecomendationDto) {
    return this.prisma.recomendations.update({ where: { idrecomendations: id }, data });
  }

  async deleteRecomendation(id: number) {
    return this.prisma.recomendations.delete({ where: { idrecomendations: id } });
  }
}
