import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LessonKind, PublicationStatus } from '../../generated/prisma/client';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Min,
} from 'class-validator';

export class CreateLessonDto {
  @ApiProperty()
  @IsString()
  @Length(2, 200)
  title!: string;

  @ApiPropertyOptional({ enum: LessonKind })
  @IsOptional()
  @IsEnum(LessonKind)
  kind?: LessonKind;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  body?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  videoId?: string;

  @ApiProperty({ minimum: 0 })
  @IsInt()
  @Min(0)
  position!: number;

  @ApiPropertyOptional({ enum: PublicationStatus })
  @IsOptional()
  @IsEnum(PublicationStatus)
  status?: PublicationStatus;
}
