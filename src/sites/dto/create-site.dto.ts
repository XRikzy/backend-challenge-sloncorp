import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateContactDto } from './create-contact.dto';

export class CreateSiteDto {
  @ApiProperty({
    example: '12345',
    description: 'ID único del sitio (solo números)',
    pattern: '^[0-9]+$',
    maxLength: 50,
  })
  @IsString()
  @MaxLength(50)
  @Matches(/^[0-9]+$/, { message: 'Site ID must contain only numbers' })
  id: string;

  @ApiProperty({
    example: 'Mi Sitio Web',
    description: 'Nombre del sitio',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    example: 'Calle Principal 123, Ciudad, País',
    description: 'Dirección del sitio',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    type: [CreateContactDto],
    description: 'Lista de contactos asociados al sitio (opcional)',
    required: false,
  })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateContactDto)
  contacts?: CreateContactDto[];

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Imagen del sitio (JPEG, PNG, WebP máx 5MB) (opcional)',
    required: false,
  })
  @IsOptional()
  image?: Express.Multer.File | string;
}
