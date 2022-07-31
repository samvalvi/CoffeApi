import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

import { User } from '../user/user.entity';

@Entity('coffee')
export class Coffee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ default: true })
  status: boolean;

  @CreateDateColumn({ default: new Date(), type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ default: new Date(), type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.order, { cascade: true })
  user: User;
}
