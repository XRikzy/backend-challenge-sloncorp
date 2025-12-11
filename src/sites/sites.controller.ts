import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SitesService } from './sites.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { User } from '@/auth/entities/user.entity';
import { GetUser } from '@/auth/decorator/get-user.decorator';

@Controller('sites')
@UseGuards(JwtAuthGuard)
export class SitesController {
  constructor(private readonly sitesService: SitesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createSiteDto: CreateSiteDto,
    @GetUser() user: User,
    @UploadedFile() imageFile: Express.Multer.File,
  ) {
    if (typeof createSiteDto.contacts === 'string') {
      createSiteDto.contacts = JSON.parse(
        createSiteDto.contacts,
      ) as CreateSiteDto['contacts'];
    }
    return this.sitesService.create(createSiteDto, user.id, imageFile);
  }
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@GetUser() user: User) {
    return this.sitesService.findAll(user.id);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.sitesService.findOne(id, user.id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() updateSiteDto: UpdateSiteDto,
    @GetUser() user: User,
    @UploadedFile() imageFile: Express.Multer.File,
  ) {
    if (typeof updateSiteDto.contacts === 'string') {
      updateSiteDto.contacts = JSON.parse(
        updateSiteDto.contacts,
      ) as UpdateSiteDto['contacts'];
    }
    return this.sitesService.update(id, updateSiteDto, user.id, imageFile);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string, @GetUser() user: User) {
    return this.sitesService.remove(id, user.id);
  }
}
