import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Menu } from '../models/menu.model';
import { Type } from 'class-transformer';

@InputType()
class MenuEntryInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  title: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  description: string;
}

@InputType()
class MenuMainCourseInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  title: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  description: string;
}

@InputType()
class MenuDessertInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  title: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  description: string;
}

@InputType()
export class MenuCreateInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  price: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MenuEntryInput)
  @IsNotEmpty()
  @Field(() => [MenuEntryInput])
  entries: MenuEntryInput[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MenuMainCourseInput)
  @IsNotEmpty()
  @Field(() => [MenuMainCourseInput])
  mainCourses: MenuMainCourseInput[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MenuDessertInput)
  @IsNotEmpty()
  @Field(() => [MenuDessertInput])
  desserts: MenuDessertInput[];
}

@ObjectType()
export class MenuCreateOutput {
  @Field()
  menu: Menu;
}