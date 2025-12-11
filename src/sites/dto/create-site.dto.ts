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
import { CreateContactDto } from './create-contact.dto';

export class CreateSiteDto {
  @IsString()
  @MaxLength(50)
  @Matches(/^[0-9]+$/, { message: 'Site ID must contain only numbers' })
  id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateContactDto)
  contacts?: CreateContactDto[];

  @IsOptional()
  image?: Express.Multer.File | string;
}
