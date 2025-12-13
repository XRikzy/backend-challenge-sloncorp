import { PartialType } from '@nestjs/mapped-types';
import { CreateSiteDto } from './create-site.dto';
import {
  IsArray,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateContactDto } from './create-contact.dto';

export class UpdateSiteDto extends PartialType(CreateSiteDto) {
  @ApiProperty({
    example: '12345',
    description: 'ID del sitio (opcional, no se puede cambiar)',
    required: false,
  })
  @IsString()
  @IsOptional()
  id?: string;
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateContactDto)
  contacts?: CreateContactDto[];

  @IsOptional()
  @IsString()
  image?: string;
}
