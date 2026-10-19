import { Module } from '@nestjs/common';
import { InstitutionalController } from './institutional.controller';
import { InstitutionalAdminController } from './institutional-admin.controller';
import { InstitutionalService } from './institutional.service';

@Module({
  controllers: [InstitutionalController, InstitutionalAdminController],
  providers: [InstitutionalService],
  exports: [InstitutionalService],
})
export class InstitutionalModule {}
