import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';
import { InstitutionalService } from './institutional.service';

@Public()
@ApiTags('institutional')
@Controller('institutional')
export class InstitutionalController {
  constructor(private readonly institutionalService: InstitutionalService) {}

  @Get('specialties')
  @ApiOperation({ summary: 'Listar especialidades publicadas' })
  findSpecialties() {
    return this.institutionalService.findSpecialties();
  }

  @Get('professionals')
  @ApiOperation({ summary: 'Listar profesionales publicados' })
  findProfessionals() {
    return this.institutionalService.findProfessionals();
  }

  @Get('services')
  @ApiOperation({ summary: 'Listar servicios publicados' })
  findServices() {
    return this.institutionalService.findServices();
  }
}
