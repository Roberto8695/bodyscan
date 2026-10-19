import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserRole } from '../generated/prisma/client';
import { Roles } from '../auth/decorators/roles.decorator';
import { ArticlesService } from './articles.service';
import { CreateArticleCategoryDto } from './dto/create-article-category.dto';

@ApiTags('admin/article-categories')
@ApiBearerAuth()
@Roles(UserRole.ADMIN, UserRole.EDITOR)
@Controller('admin/article-categories')
export class ArticleCategoriesAdminController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  findAll() {
    return this.articlesService.findCategories();
  }

  @Post()
  create(@Body() input: CreateArticleCategoryDto) {
    return this.articlesService.createCategory(input);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() input: CreateArticleCategoryDto) {
    return this.articlesService.updateCategory(id, input);
  }

  @Delete(':id')
  @HttpCode(204)
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.articlesService.removeCategory(id);
  }
}
