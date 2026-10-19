import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Length, Min } from 'class-validator';

export class CreateCourseModuleDto {
  @ApiProperty()
  @IsString()
  @Length(2, 200)
  title!: string;

  @ApiProperty({ minimum: 0 })
  @IsInt()
  @Min(0)
  position!: number;
}
