import { Column, Entity } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Node } from 'src/pagination/models/node.model';

@Entity()
@ObjectType()
export class Products extends Node {
  @Field(() => String)
  @Column()
  title: string;

  @Field(() => Number)
  @Column()
  price: number;

  @Field(() => String)
  @Column()
  tags: string;

  @Field(() => String)
  @Column()
  category: string;
}