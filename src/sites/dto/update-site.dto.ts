import { PartialType } from '@nestjs/mapped-types';
import { CreateSiteDto } from './create-site.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSiteDto extends PartialType(CreateSiteDto) {
  @ApiProperty({
    example: '12345',
    description: 'ID del sitio (opcional, no se puede cambiar)',
    required: false,
  })
  @IsString()
  @IsOptional()
  id?: string;
}
