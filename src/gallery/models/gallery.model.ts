import { Column, Entity } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Node } from 'src/pagination/models/node.model';

@Entity()
@ObjectType()
export class Gallery extends Node {
  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String)
  @Column()
  description: string;

  @Field(() => String)
  @Column()
  url: string;

  @Field(() => String)
  @Column()
  alt: string;
}