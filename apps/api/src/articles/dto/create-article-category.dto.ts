import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateArticleCategoryDto {
  @ApiProperty()
  @IsString()
  @Length(2, 120)
  slug!: string;

  @ApiProperty()
  @IsString()
  @Length(2, 120)
  name!: string;
}
