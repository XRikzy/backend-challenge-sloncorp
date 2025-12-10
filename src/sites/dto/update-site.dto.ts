import { PartialType } from '@nestjs/mapped-types';
import { CreateSiteDto } from './create-site.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateSiteDto extends PartialType(CreateSiteDto) {
  @IsString()
  @IsOptional()
  id?: string;
}
