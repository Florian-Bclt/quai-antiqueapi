import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Gallery } from "../models/gallery.model";


@InputType()
export class GalleryCreateInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  url: string;

  @Field(() => String)
  alt: string;
}

@ObjectType()
export class GalleryCreateOutput {
  @Field(() => Gallery)
  gallery: Gallery;
}