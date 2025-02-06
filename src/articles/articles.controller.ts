import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Post()
  async createArticle(@Body() data: CreateArticleDto) {
    return this.articlesService.createArticle(data);
  }

  @Get()
  async getAllArticles() {
    return this.articlesService.getAllArticles();
  }

  @Get(':id')
  async getArticleById(@Param('id') id: string) {
    return this.articlesService.getArticleById(Number(id));
  }

  @Put(':id')
  async updateArticle(@Param('id') id: string, @Body() data: UpdateArticleDto) {
    return this.articlesService.updateArticle(Number(id), data);
  }

  @Delete(':id')
  async deleteArticle(@Param('id') id: string) {
    return this.articlesService.deleteArticle(Number(id));
  }
}