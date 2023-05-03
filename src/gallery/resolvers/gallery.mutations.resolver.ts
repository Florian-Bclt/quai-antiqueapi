import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Gallery } from '../models/gallery.model';
import { GalleryService } from '../gallery.service';
import { GalleryCreateInput, GalleryCreateOutput } from '../dto/gallery-create.dto';
import { GalleryUpdateInput, GalleryUpdateOutput } from '../dto/gallery-update.dto';
import { GalleryDeleteOutput } from '../dto/gallery-delete.dto';

@Resolver(Gallery)
export class GalleryMutationResolver {
  constructor(private readonly galleryService: GalleryService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => GalleryCreateOutput)
    async galleryCreate(
      @Args('input') input: GalleryCreateInput) {
      return this.galleryService.galleryCreate(input);
    }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => GalleryUpdateOutput)
    async galleryUpdate(
      @Args({ name: 'galleryId', type: () => ID}) galleryId: Gallery['id'],
      @Args('input') input: GalleryUpdateInput) {
      return this.galleryService.galleryUpdate(galleryId, input);
    }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => GalleryDeleteOutput)
    async galleryDelete(
      @Args({ name: 'galleryId', type: () => ID}) galleryId: Gallery['id']) {
      return this.galleryService.galleryDelete(galleryId);
    }
  }