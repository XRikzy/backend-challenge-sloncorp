import { CreateContactDto } from '@/sites/dto/create-contact.dto';
import { CreateSiteDto } from '@/sites/dto/create-site.dto';
import { UpdateSiteDto } from '@/sites/dto/update-site.dto';

export type CrudCreateDTO = CreateSiteDto | CreateContactDto;
export type CrudUpdateDTO = UpdateSiteDto;
