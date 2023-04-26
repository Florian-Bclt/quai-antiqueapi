import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Menu extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Field(() => String)
  @Column()
  title: string;

  @Field(() => Number)
  @Column()
  price: number;

  @Field(() => [String])
  @Column('simple-array')
  entries: string[];

  @Field(() => [String])
  @Column('simple-array')
  mainCourses: string[];

  @Field(() => [String])
  @Column('simple-array')
  desserts: string[];
}
