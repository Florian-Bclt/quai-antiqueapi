import { Field, ObjectType } from '@nestjs/graphql';
import { Node } from 'src/pagination/models/node.model';
import { Entity, Column } from 'typeorm';

@Entity()
@ObjectType()
export class OpeningHours extends Node{

  @Field(() => String)
  @Column()
  dayOfWeek: string;

  @Field(() => Boolean)
  @Column()
  isClosed: boolean;

  @Field(() => String, { nullable: true})
  @Column({ nullable: true })
  lunchOpeningTime: string;

  @Field(() => String, { nullable: true})
  @Column({ nullable: true })
  lunchClosingTime: string;

  @Field(() => String, { nullable: true})
  @Column({ nullable: true })
  dinnerOpeningTime: string;

  @Field(() => String, { nullable: true})
  @Column({ nullable: true })
  dinnerClosingTime: string;
}
