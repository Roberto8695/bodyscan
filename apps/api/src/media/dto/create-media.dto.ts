import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MediaKind, MediaVisibility } from '../../generated/prisma/client';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateMediaDto {
  @ApiProperty({ enum: MediaKind })
  @IsEnum(MediaKind)
  kind!: MediaKind;

  @ApiPropertyOptional({ enum: MediaVisibility })
  @IsOptional()
  @IsEnum(MediaVisibility)
  visibility?: MediaVisibility;

  @ApiProperty({ example: 's3' })
  @IsString()
  @Length(1, 40)
  provider!: string;

  @ApiProperty()
  @IsString()
  @Length(1, 500)
  providerKey!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  originalName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(120)
  mimeType?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  sizeBytes?: number;
}
