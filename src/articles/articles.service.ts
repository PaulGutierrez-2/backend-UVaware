import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';


@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async createArticle(data: Omit<CreateArticleDto, 'idarticles'>) {
    return this.prisma.articles.create({
      data: data as Prisma.articlesUncheckedCreateInput, // Casteamos el tipo a articlesUncheckedCreateInput
    });
  }

  
  async getAllArticles() {
    return this.prisma.articles.findMany();
  }

  async getArticleById(id: number) {
    return this.prisma.articles.findUnique({ where: { idarticles: id } });
  }

  async updateArticle(id: number, data: UpdateArticleDto) {
    return this.prisma.articles.update({ where: { idarticles: id }, data });
  }

  async deleteArticle(id: number) {
    return this.prisma.articles.delete({ where: { idarticles: id } });
  }
}