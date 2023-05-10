import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Node } from 'src/pagination/models/node.model';
import { Entity, Column } from 'typeorm';

@Entity()
@ObjectType()
export class OpeningHours extends Node{

  @Field(() => Int)
  @Column()
  dayOfWeek: number;

  @Field(() => Boolean)
  @Column()
  isClosed: boolean;

  @Field({ nullable: true})
  @Column({type: 'time', nullable: true})
  lunchOpeningTime: string;

  @Field({ nullable: true})
  @Column({ type: 'time', nullable: true })
  lunchClosingTime: string;

  @Field({ nullable: true})
  @Column({ type: 'time', nullable: true })
  dinnerOpeningTime: string;

  @Field({ nullable: true})
  @Column({ type: 'time', nullable: true })
  dinnerClosingTime: string;
}
