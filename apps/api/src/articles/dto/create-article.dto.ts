import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PublicationStatus } from '../../generated/prisma/client';
import {
  IsArray,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({ example: 'beneficios-de-la-ecografia' })
  @IsString()
  @Length(2, 200)
  slug!: string;

  @ApiProperty()
  @IsString()
  @Length(2, 220)
  title!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  excerpt?: string;

  @ApiProperty({ type: 'object', additionalProperties: true })
  @IsObject()
  content!: Record<string, unknown>;

  @ApiPropertyOptional({ enum: PublicationStatus })
  @IsOptional()
  @IsEnum(PublicationStatus)
  status?: PublicationStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  coverId?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  categoryIds?: string[];
}
