import { Module } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gallery } from './models/gallery.model';
import { GalleryMutationResolver } from './resolvers/gallery.mutations.resolver';
import { GalleryQueriesResolver } from './resolvers/gallery.queries.revolver';

@Module({
  imports: [TypeOrmModule.forFeature([Gallery])],
  providers: [GalleryService, GalleryMutationResolver, GalleryQueriesResolver]
})
export class GalleryModule {}
