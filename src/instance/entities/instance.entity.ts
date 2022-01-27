import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

enum InstanceStatus {
  TERMINATED,
  SHUTDOWN,
  CREATING,
  ONLINE,
}
enum InstanceFlavor {
  NANO,
  MICRO,
  MEDIUM,
  LARGE,
  XLARGE,
  DOUBLEXLARGE,
}

@Entity()
export class Instance extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: InstanceStatus,
  })
  status: InstanceStatus;

  @Column({
    type: 'enum',
    enum: InstanceFlavor,
  })
  flavor: InstanceFlavor;

  @ManyToOne(() => User, (user) => user.instances)
  user: User;

  @Column()
  ipv4_address: string;

  @Column({ nullable: true })
  ipv6_address: string;

  @Column()
  region: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
