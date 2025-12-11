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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
  ApiParam,
  ApiConsumes,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { SitesService } from './sites.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { User } from '@/auth/entities/user.entity';
import { GetUser } from '@/auth/decorator/get-user.decorator';

@ApiTags('Sites')
@ApiBearerAuth('JWT')
@Controller('sites')
@UseGuards(JwtAuthGuard)
export class SitesController {
  constructor(private readonly sitesService: SitesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Crear nuevo sitio',
    description:
      'Crea un nuevo sitio con imagen y contactos. Enviar como form-data con campo "image" para la imagen y "contacts" como JSON string',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: '12345' },
        name: { type: 'string', example: 'Mi Sitio Web' },
        address: { type: 'string', example: 'Calle Principal 123' },
        image: { type: 'string', format: 'binary' },
        contacts: {
          type: 'string',
          example:
            '[{"name":"John","email":"john@example.com","phone":"+123456"}]',
        },
      },
      required: ['id', 'name', 'address'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Sitio creado exitosamente',
    schema: {
      example: {
        success: true,
        message: 'Site created Succeessfully',
        data: [
          {
            id: '12345',
            name: 'Mi Sitio Web',
            address: 'Calle Principal 123',
            image: 'https://bucket.s3.region.amazonaws.com/sites/uuid.jpg',
            user_id: 'uuid',
            contacts: [],
            created_at: '2025-12-11T10:00:00Z',
          },
        ],
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 409, description: 'El sitio ya existe' })
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
  @ApiOperation({
    summary: 'Obtener todos los sitios',
    description:
      'Retorna una lista de todos los sitios del usuario autenticado',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de sitios obtenida',
    schema: {
      example: {
        success: true,
        data: {
          sites: [
            {
              id: '12345',
              name: 'Mi Sitio Web',
              address: 'Calle Principal 123',
              image: 'https://bucket.s3.region.amazonaws.com/sites/uuid.jpg',
              user_id: 'uuid',
              contacts: [],
              created_at: '2025-12-11T10:00:00Z',
            },
          ],
        },
        count: 1,
      },
    },
  })
  async findAll(@GetUser() user: User) {
    return this.sitesService.findAll(user.id);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Obtener sitio por ID',
    description: 'Retorna los detalles de un sitio específico del usuario',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del sitio',
    example: '12345',
  })
  @ApiResponse({
    status: 200,
    description: 'Sitio obtenido',
    schema: {
      example: {
        succces: true,
        data: {
          id: '12345',
          name: 'Mi Sitio Web',
          address: 'Calle Principal 123',
          image: 'https://bucket.s3.region.amazonaws.com/sites/uuid.jpg',
          user_id: 'uuid',
          contacts: [
            {
              id: 'uuid',
              name: 'John',
              email: 'john@example.com',
              phone: '+123456',
            },
          ],
          created_at: '2025-12-11T10:00:00Z',
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Sitio no encontrado' })
  async findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.sitesService.findOne(id, user.id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Actualizar sitio',
    description:
      'Actualiza los datos de un sitio. Los campos son opcionales. La imagen anterior será eliminada al subir una nueva',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del sitio a actualizar',
    example: '12345',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Sitio Actualizado' },
        address: { type: 'string', example: 'Nueva Dirección 456' },
        image: { type: 'string', format: 'binary' },
        contacts: {
          type: 'string',
          example:
            '[{"name":"Jane","email":"jane@example.com","phone":"+654321"}]',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Sitio actualizado exitosamente',
  })
  @ApiResponse({ status: 404, description: 'Sitio no encontrado' })
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
  @ApiOperation({
    summary: 'Eliminar sitio',
    description:
      'Elimina un sitio y su imagen de S3. Esta acción no se puede deshacer',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del sitio a eliminar',
    example: '12345',
  })
  @ApiResponse({
    status: 200,
    description: 'Sitio eliminado exitosamente',
    schema: {
      example: {
        success: true,
        message: 'Site deleted succesfully',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Sitio no encontrado' })
  async remove(@Param('id') id: string, @GetUser() user: User) {
    return this.sitesService.remove(id, user.id);
  }
}
