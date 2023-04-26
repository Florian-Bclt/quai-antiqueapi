import { Field, ObjectType } from '@nestjs/graphql';
import { Node } from 'src/pagination/models/node.model';
import { Reservation } from 'src/reservation/models/reservation.model';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
@ObjectType()
export class Table extends Node {
  @Field(() => String)
  @Column()
  title: string;

  @Field(() => Number)
  @Column({ nullable: false })
  places: number;

  @Field(() => Boolean)
  @Column({ nullable: false})
  available: boolean;

  @OneToMany(() => Reservation, (reservation) => reservation.table)
  reservations: Reservation;
}