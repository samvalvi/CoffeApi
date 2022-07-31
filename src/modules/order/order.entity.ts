import {
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { User } from '../user/user.entity';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.order, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ default: new Date(), type: 'timestamp' })
  createdAt: Date;
}
