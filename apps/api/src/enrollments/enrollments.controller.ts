import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import type { AuthenticatedUser } from '../auth/auth.types';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { EnrollmentsService } from './enrollments.service';

@ApiTags('enrollments')
@ApiBearerAuth()
@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Get('me')
  @ApiOperation({ summary: 'Listar mis cursos con acceso vigente' })
  findMine(@CurrentUser() user: AuthenticatedUser) {
    return this.enrollmentsService.findActiveByUser(user.id);
  }

  @Get('me/courses/:courseId')
  @ApiOperation({
    summary: 'Obtener el contenido de un curso con acceso vigente',
  })
  findAccessibleCourse(
    @CurrentUser() user: AuthenticatedUser,
    @Param('courseId') courseId: string,
  ) {
    return this.enrollmentsService.findAccessibleCourse(user.id, courseId);
  }
}
