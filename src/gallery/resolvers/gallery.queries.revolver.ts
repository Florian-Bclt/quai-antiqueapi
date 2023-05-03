import { Args, Query, Resolver } from "@nestjs/graphql";
import { Gallery } from "../models/gallery.model";
import { GalleryService } from "../gallery.service";

@Resolver(() => Gallery)
export class GalleryQueriesResolver {
  constructor(private readonly galleryService: GalleryService) {}

  @Query(() => [Gallery])
  async getAllGallery(): Promise<Gallery[]> {
    return this.galleryService.getAllGallery();
  }

  @Query(() => Gallery)
  async getGalleryById(
    @Args('id') id: string): Promise<Gallery> {
      return this.galleryService.getGalleryById(id);
    }
  }