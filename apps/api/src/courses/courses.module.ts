import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesAdminController } from './courses-admin.controller';
import { CourseContentAdminController } from './course-content-admin.controller';
import { CoursesService } from './courses.service';

@Module({
  controllers: [
    CoursesController,
    CoursesAdminController,
    CourseContentAdminController,
  ],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}
