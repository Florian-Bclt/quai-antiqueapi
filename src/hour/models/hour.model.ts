import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class OpeningHours {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column({ default: 'Monday' })
  day: string;

  @Field(() => String)
  @Column({ default: '12:00' })
  lunchOpeningTime: string;

  @Field(() => String)
  @Column({ default: '14:00' })
  lunchClosingTime: string;

  @Field(() => String)
  @Column({ default: '19:00' })
  dinnerOpeningTime: string;

  @Field(() => String)
  @Column({ default: '22:00' })
  dinnerClosingTime: string;
}
