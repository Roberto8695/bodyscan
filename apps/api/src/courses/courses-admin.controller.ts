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
import { Roles } from '../auth/decorators/roles.decorator';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@ApiTags('admin/courses')
@ApiBearerAuth()
@Roles(UserRole.ADMIN, UserRole.EDITOR)
@Controller('admin/courses')
export class CoursesAdminController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los cursos' })
  findAll() {
    return this.coursesService.findAllForAdmin();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consultar un curso con módulos y lecciones' })
  findById(@Param('id') id: string) {
    return this.coursesService.findByIdForAdmin(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un curso' })
  create(@Body() input: CreateCourseDto) {
    return this.coursesService.create(input);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un curso' })
  update(@Param('id') id: string, @Body() input: UpdateCourseDto) {
    return this.coursesService.update(id, input);
  }

  @Delete(':id')
  @HttpCode(204)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Eliminar un curso borrador sin inscripciones' })
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
