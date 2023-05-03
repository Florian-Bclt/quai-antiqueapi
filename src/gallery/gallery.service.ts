import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Gallery } from "./models/gallery.model";
import { Repository } from "typeorm";
import { GalleryCreateInput, GalleryCreateOutput } from "./dto/gallery-create.dto";
import { GalleryUpdateInput, GalleryUpdateOutput } from "./dto/gallery-update.dto";
import { GalleryDeleteOutput } from "./dto/gallery-delete.dto";

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Gallery) 
    private readonly galleryRepository: Repository<Gallery>,
  ) {}

  async galleryCreate(
    input: GalleryCreateInput
    ): Promise<GalleryCreateOutput> {
    const newGallery = this.galleryRepository.create(input);
    const gallery = await this.galleryRepository.save(newGallery);
    return { gallery };
  }

  async galleryUpdate(
    galleryId: Gallery['id'],
    input: GalleryUpdateInput
  ): Promise<GalleryUpdateOutput> {
    const gallery = await this.galleryRepository.findOneBy({ id: galleryId});
    gallery.title = input.title;
    gallery.description = input.description;
    gallery.url = input.url;
    gallery.alt = input.alt;
    await gallery.save();
    return { gallery };
  }

  async galleryDelete(
    galleryId: Gallery['id']
  ): Promise<GalleryDeleteOutput> {
    const gallery = await this.galleryRepository.findOneBy({id: galleryId});
    await gallery.remove();
    return { galleryId };
  }

  async getAllGallery(): Promise<Gallery[]> {
    const galleries = await this.galleryRepository.find();
    return galleries;
  }

  async getGalleryById(id: Gallery['id']): Promise<Gallery> {
    const gallery = await this.galleryRepository.findOne({ where : {id}});
    return gallery;
  }
}