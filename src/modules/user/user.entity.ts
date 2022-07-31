import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { Coffee } from '../coffee/coffee.entity';
import { Order } from '../order/order.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ default: true })
  status: boolean;

  @CreateDateColumn({ default: new Date(), type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ default: new Date(), type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => Coffee, (coffee) => coffee.user)
  coffees: Coffee[];

  @OneToOne(() => Order, (order) => order.user)
  order: Order;
}
