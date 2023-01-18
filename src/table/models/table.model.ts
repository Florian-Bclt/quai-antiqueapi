import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Node } from 'src/pagination/models/node.model';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
@ObjectType()
export class Table extends Node {
  @Field(() => String)
  @Column()
  title: string;

  @Field(() => Number)
  @Column()
  place: number;

  @Field(() => Boolean)
  @Column()
  statut: boolean;
}