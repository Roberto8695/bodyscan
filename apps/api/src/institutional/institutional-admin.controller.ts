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
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { CreateServiceDto } from './dto/create-service.dto';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { InstitutionalService } from './institutional.service';

@ApiTags('admin/institutional')
@ApiBearerAuth()
@Roles(UserRole.ADMIN, UserRole.EDITOR)
@Controller('admin/institutional')
export class InstitutionalAdminController {
  constructor(private readonly service: InstitutionalService) {}

  @Get('specialties')
  @ApiOperation({ summary: 'Listar todas las especialidades' })
  findSpecialties() {
    return this.service.findAllSpecialtiesForAdmin();
  }

  @Post('specialties')
  createSpecialty(@Body() input: CreateSpecialtyDto) {
    return this.service.createSpecialty(input);
  }

  @Patch('specialties/:id')
  updateSpecialty(@Param('id') id: string, @Body() input: UpdateSpecialtyDto) {
    return this.service.updateSpecialty(id, input);
  }

  @Delete('specialties/:id')
  @HttpCode(204)
  @Roles(UserRole.ADMIN)
  removeSpecialty(@Param('id') id: string) {
    return this.service.removeSpecialty(id);
  }

  @Get('professionals')
  @ApiOperation({ summary: 'Listar todos los profesionales' })
  findProfessionals() {
    return this.service.findAllProfessionalsForAdmin();
  }

  @Post('professionals')
  createProfessional(@Body() input: CreateProfessionalDto) {
    return this.service.createProfessional(input);
  }

  @Patch('professionals/:id')
  updateProfessional(
    @Param('id') id: string,
    @Body() input: UpdateProfessionalDto,
  ) {
    return this.service.updateProfessional(id, input);
  }

  @Delete('professionals/:id')
  @HttpCode(204)
  @Roles(UserRole.ADMIN)
  removeProfessional(@Param('id') id: string) {
    return this.service.removeProfessional(id);
  }

  @Get('services')
  @ApiOperation({ summary: 'Listar todos los servicios' })
  findServices() {
    return this.service.findAllServicesForAdmin();
  }

  @Post('services')
  createService(@Body() input: CreateServiceDto) {
    return this.service.createService(input);
  }

  @Patch('services/:id')
  updateService(@Param('id') id: string, @Body() input: UpdateServiceDto) {
    return this.service.updateService(id, input);
  }

  @Delete('services/:id')
  @HttpCode(204)
  @Roles(UserRole.ADMIN)
  removeService(@Param('id') id: string) {
    return this.service.removeService(id);
  }
}
