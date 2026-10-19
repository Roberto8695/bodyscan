import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRole } from '../generated/prisma/client';
import { Roles } from '../auth/decorators/roles.decorator';
import { CoursesService } from './courses.service';
import { CreateCourseModuleDto } from './dto/create-course-module.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateCourseModuleDto } from './dto/update-course-module.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@ApiTags('admin/course-content')
@ApiBearerAuth()
@Roles(UserRole.ADMIN, UserRole.EDITOR)
@Controller('admin')
export class CourseContentAdminController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post('courses/:courseId/modules')
  @ApiOperation({ summary: 'Crear un módulo' })
  createModule(
    @Param('courseId') courseId: string,
    @Body() input: CreateCourseModuleDto,
  ) {
    return this.coursesService.createModule(courseId, input);
  }

  @Patch('modules/:moduleId')
  updateModule(
    @Param('moduleId') moduleId: string,
    @Body() input: UpdateCourseModuleDto,
  ) {
    return this.coursesService.updateModule(moduleId, input);
  }

  @Delete('modules/:moduleId')
  @HttpCode(204)
  removeModule(@Param('moduleId') moduleId: string) {
    return this.coursesService.removeModule(moduleId);
  }

  @Post('modules/:moduleId/lessons')
  @ApiOperation({ summary: 'Crear una lección' })
  createLesson(
    @Param('moduleId') moduleId: string,
    @Body() input: CreateLessonDto,
  ) {
    return this.coursesService.createLesson(moduleId, input);
  }

  @Patch('lessons/:lessonId')
  updateLesson(
    @Param('lessonId') lessonId: string,
    @Body() input: UpdateLessonDto,
  ) {
    return this.coursesService.updateLesson(lessonId, input);
  }

  @Delete('lessons/:lessonId')
  @HttpCode(204)
  removeLesson(@Param('lessonId') lessonId: string) {
    return this.coursesService.removeLesson(lessonId);
  }
}
