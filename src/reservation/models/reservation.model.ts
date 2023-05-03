import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Node } from 'src/pagination/models/node.model';
import { Table } from 'src/table/models/table.model';
import { User } from 'src/user/models/user.model';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
@ObjectType()
export class Reservation extends Node {
  @Field(() => User)
  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @Field(() => Table)
  @ManyToOne(() => Table, { eager: true })
  @JoinColumn()
  table: Table;

  @Column({name: 'table_id'})
  tableId: string;

  @Field(() => Date)
  @Column()
  date: Date;

  @Field(() => Int)
  @Column({ name: 'reservation_hour' })
  reservationHour: number;

  @Field(() => Int)
  @Column({ name: 'reservation_end_hour' })
  reservationEndHour: number;

  @Field(() => Int)
  @Column()
  places: number;
}

