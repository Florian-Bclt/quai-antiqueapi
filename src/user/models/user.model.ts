import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity } from "typeorm";

@Entity()
@ObjectType()
export class User extends Node {
  id: string;
  save() {
    throw new Error('Method not implemented.');
  }
  @Field(() => String)
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field(() => String)
  @Column()
  firstName: string;

  @Field(() => String)
  @Column()
  lastName: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  allergy?: string | null;
}