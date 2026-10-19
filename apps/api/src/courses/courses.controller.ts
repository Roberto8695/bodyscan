import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';
import { CoursesService } from './courses.service';

@Public()
@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar cursos publicados' })
  findPublished() {
    return this.coursesService.findPublished();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Consultar un curso publicado' })
  findPublishedBySlug(@Param('slug') slug: string) {
    return this.coursesService.findPublishedBySlug(slug);
  }
}
