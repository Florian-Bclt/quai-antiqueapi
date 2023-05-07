import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Node } from 'src/pagination/models/node.model';
import { Column, Entity } from 'typeorm';

@Entity()
@ObjectType()
export class Menu extends Node {
  @Field(() => String)
  @Column({ nullable: false})
  title: string;

  @Field(() => Number)
  @Column({ nullable: false})
  price: number;

  @Field(() => [MenuEntry])
  @Column({ type: 'jsonb', nullable: false })
  entries: MenuEntry[];

  @Field(() => [MenuMainCourse])
  @Column({ type: 'jsonb', nullable: false })
  mainCourses: MenuMainCourse[];

  @Field(() => [MenuDessert])
  @Column({ type: 'jsonb', nullable: false })
  @Directive('@default(value: [])')
  desserts: MenuDessert[];
}

@ObjectType()
export class MenuEntry {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;
}

@ObjectType()
export class MenuMainCourse {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;
}

@ObjectType()
export class MenuDessert {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;
}
