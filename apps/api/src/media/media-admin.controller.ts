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
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateMediaDto } from './dto/create-media.dto';
import { MediaService } from './media.service';

@ApiTags('admin/media')
@ApiBearerAuth()
@Roles(UserRole.ADMIN, UserRole.EDITOR)
@Controller('admin/media')
export class MediaAdminController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  findAll() {
    return this.mediaService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Registrar los metadatos de un archivo ya subido' })
  create(@Body() input: CreateMediaDto) {
    return this.mediaService.createMetadata(input);
  }

  @Delete(':id')
  @HttpCode(204)
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.mediaService.remove(id);
  }
}
