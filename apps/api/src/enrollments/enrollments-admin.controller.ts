import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRole } from '../generated/prisma/client';
import type { AuthenticatedUser } from '../auth/auth.types';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { GrantAccessDto } from './dto/grant-access.dto';
import { EnrollmentsService } from './enrollments.service';

@ApiTags('admin/enrollments')
@ApiBearerAuth()
@Roles(UserRole.ADMIN)
@Controller('admin/enrollments')
export class EnrollmentsAdminController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar inscripciones y accesos' })
  findAll() {
    return this.enrollmentsService.findAllForAdmin();
  }

  @Post('access')
  @ApiOperation({ summary: 'Conceder acceso manual a un curso' })
  grantAccess(
    @CurrentUser() administrator: AuthenticatedUser,
    @Body() input: GrantAccessDto,
  ) {
    return this.enrollmentsService.grantAccess({
      ...input,
      grantedById: administrator.id,
    });
  }

  @Delete('access/:accessId')
  @HttpCode(204)
  @ApiOperation({ summary: 'Revocar un acceso' })
  revokeAccess(@Param('accessId') accessId: string) {
    return this.enrollmentsService.revokeAccess(accessId);
  }
}
