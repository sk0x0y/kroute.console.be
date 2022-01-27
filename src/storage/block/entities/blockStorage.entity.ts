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
import { User } from '../../../user/entities/user.entity';

export enum StorageType {
  SSD,
  HDD,
}

@Entity()
export class BlockStorage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: StorageType,
  })
  type: StorageType;

  @ManyToOne(() => User, (user) => user.instances)
  user: User;

  @Column()
  capacity: number;

  @Column()
  region: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
