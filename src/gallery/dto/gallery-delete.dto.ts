import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Gallery } from "../models/gallery.model";

@ObjectType()
export class GalleryDeleteOutput {
 @Field(() => ID)
 galleryId: Gallery['id'];
}