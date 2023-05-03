import { InputType, ObjectType } from "@nestjs/graphql";
import { GalleryCreateInput, GalleryCreateOutput } from "./gallery-create.dto";

@InputType()
export class GalleryUpdateInput extends GalleryCreateInput {}

@ObjectType()
export class GalleryUpdateOutput extends GalleryCreateOutput {}