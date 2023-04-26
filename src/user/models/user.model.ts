import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity } from "typeorm";
import { Node } from "src/pagination/models/node.model";

export enum UserRole {
  ADMIN = "admin",
  MANAGER = "manager",
  CLIENT = "client",
}

@Entity()
@ObjectType()
export class User extends Node {
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

  @Column({ default: UserRole.CLIENT})
  role: UserRole;
}