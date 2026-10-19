import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UsersAdminController } from './users-admin.controller';
import { UsersService } from './users.service';

@Module({
  imports: [AuthModule],
  controllers: [UsersAdminController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
