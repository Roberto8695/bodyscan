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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRole } from '../generated/prisma/client';
import type { AuthenticatedUser } from '../auth/auth.types';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@ApiTags('admin/articles')
@ApiBearerAuth()
@Roles(UserRole.ADMIN, UserRole.EDITOR)
@Controller('admin/articles')
export class ArticlesAdminController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los artículos' })
  findAll() {
    return this.articlesService.findAllForAdmin();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consultar un artículo' })
  findById(@Param('id') id: string) {
    return this.articlesService.findByIdForAdmin(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un artículo' })
  create(
    @CurrentUser() user: AuthenticatedUser,
    @Body() input: CreateArticleDto,
  ) {
    return this.articlesService.create(user.id, input);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un artículo' })
  update(
    @Param('id') id: string,
    @CurrentUser() user: AuthenticatedUser,
    @Body() input: UpdateArticleDto,
  ) {
    return this.articlesService.update(id, user.id, input);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar un artículo' })
  remove(@Param('id') id: string) {
    return this.articlesService.remove(id);
  }
}
