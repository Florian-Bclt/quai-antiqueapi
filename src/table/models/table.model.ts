import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Node } from 'src/pagination/models/node.model';
import { Column, Entity } from 'typeorm';

@Entity()
@ObjectType()
export class Table extends Node {
  @Field(() => String)
  @Column()
  title: string;

  @Field(() => Int)
  @Column({ nullable: false })
  places: number;

  @Field(() => Boolean)
  @Column({ nullable: false})
  available: boolean;
}