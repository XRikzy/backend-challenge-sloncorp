import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Site } from './entities/site.entity';
import { Repository } from 'typeorm';
import { Contact } from './entities/contacts.entity';
import { S3Service } from '@/s3/s3.service';
import { logger } from '@/utils/logger';
import { MESSAGE_SITES } from '@/utils/message/messages';

@Injectable()
export class SitesService {
  constructor(
    @InjectRepository(Site)
    private siteRepository: Repository<Site>,
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
    private s3Services: S3Service,
  ) {}
  async create(createSiteDto: CreateSiteDto, userId: string) {
    const { id, name, image, address, contacts } = createSiteDto;
    const existingSite = await this.siteRepository.findOne({
      where: { user_id: userId, id: id },
    });
    if (existingSite) {
      throw new ConflictException(`Already exists this site with name ${name}`);
    }
    const newSite = this.siteRepository.create({
      id,
      name,
      image,
      address,
      user_id: userId,
    });
    await this.siteRepository.save(newSite);
    if (contacts && contacts?.length > 0) {
      const contactsEntities = contacts.map((contact) => {
        return this.contactRepository.create({
          ...contact,
          site_id: newSite.id,
        });
      });
      await this.contactRepository.save(contactsEntities);
    }
    const completeSite = await this.siteRepository.find({
      where: { id: newSite.id },
      relations: ['contacts'],
    });
    return {
      success: true,
      message: MESSAGE_SITES.CREATE,
      data: completeSite,
    };
  }
  async uploadImage(imageFile: Express.Multer.File) {
    let imageUrl: string | undefined;
    if (imageFile) {
      imageUrl = await this.s3Services.uploadImageToS3(imageFile);
    }
    if (!imageUrl) {
      throw new Error(`No se puso subir la imagen proporcionada`);
    }
    return {
      succes: true,
      imageUrl,
    };
  }
  async findAll(userId: string) {
    const sites = await this.siteRepository.find({
      where: { user_id: userId },
      relations: ['contacts'],
      order: { id: 'ASC' },
    });
    return {
      success: true,
      sites,
      count: sites.length,
    };
  }

  async findOne(siteid: string, userId: string) {
    const site = await this.siteRepository.findOne({
      where: { id: siteid, user_id: userId },
      relations: ['contacts'],
    });
    if (!site) {
      throw new NotFoundException(`site with ID ${siteid} not found`);
    }
    return {
      succces: true,
      message: MESSAGE_SITES.FIND,
      data: site,
    };
  }

  async update(siteId: string, updateSiteDto: UpdateSiteDto, userId: string) {
    const site = await this.siteRepository.findOne({
      where: { id: siteId, user_id: userId },
      relations: ['contacts'],
    });
    if (!site) {
      throw new NotFoundException(`Site with ID ${siteId} not found`);
    }
    const { contacts, ...siteData } = updateSiteDto;

    Object.assign(site, siteData);
    await this.siteRepository.save(site);
    if (contacts) {
      await this.contactRepository.delete({ site_id: siteId });
    }
    if (contacts && contacts.length > 0) {
      const contactEntities = contacts.map((contact) => {
        return this.contactRepository.create({
          ...contact,
          site_id: siteId,
        });
      });
      await this.contactRepository.save(contactEntities);
    }
    const updateSite = await this.siteRepository.findOne({
      where: { id: siteId },
      relations: ['contacts'],
    });
    return {
      success: true,
      message: MESSAGE_SITES.UPDATE,
      data: updateSite,
    };
  }

  async remove(siteId: string, userId: string) {
    const site = await this.siteRepository.findOne({
      where: { id: siteId, user_id: userId },
    });
    if (!site) {
      throw new NotFoundException(`Site with ID ${siteId} not found`);
    }
    if (site.image) {
      try {
        await this.s3Services.deleteImageFromS3(site.image);
      } catch (error) {
        logger.error(`Failed to delete image from S3 bucket ${error}`);
      }
    }
    await this.siteRepository.remove(site);

    return {
      success: true,
      message: MESSAGE_SITES.DELETE,
    };
  }
}
