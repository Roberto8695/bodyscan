import { Module } from '@nestjs/common';
import { EnrollmentsAdminController } from './enrollments-admin.controller';
import { EnrollmentsController } from './enrollments.controller';
import { EnrollmentsService } from './enrollments.service';

@Module({
  controllers: [EnrollmentsController, EnrollmentsAdminController],
  providers: [EnrollmentsService],
  exports: [EnrollmentsService],
})
export class EnrollmentsModule {}
