import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Column, Entity } from "typeorm";
import { Node } from "src/pagination/models/node.model";

export enum UserRole {
  ADMIN = "admin",
  MANAGER = "manager",
  CLIENT = "client",
}

registerEnumType(UserRole, { name: 'UserRole' });

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

  @Field(() => UserRole, { defaultValue: UserRole.CLIENT })
  @Column({ default: UserRole.CLIENT})
  role: UserRole;
}