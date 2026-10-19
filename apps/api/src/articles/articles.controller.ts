import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';
import { ArticlesService } from './articles.service';

@Public()
@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar artículos publicados' })
  findPublished() {
    return this.articlesService.findPublished();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Consultar un artículo publicado' })
  findPublishedBySlug(@Param('slug') slug: string) {
    return this.articlesService.findPublishedBySlug(slug);
  }
}
