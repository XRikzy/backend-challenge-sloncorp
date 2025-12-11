import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateContactDto } from './create-contact.dto';

export class CreateSiteDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(10)
  site_id: string;

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
}
