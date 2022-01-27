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

export enum StorageClass {
  STANDARD,
}
export enum AccessPolicy {
  PUBLIC,
  PRIVATE,
}

@Entity()
export class ObjectStorage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: StorageClass,
  })
  class: StorageClass;

  @Column({
    default: 0,
  })
  size: number;

  @ManyToOne(() => User, (user) => user.instances)
  user: User;

  @Column({
    type: 'enum',
    enum: AccessPolicy,
  })
  access_policy: AccessPolicy;

  @Column()
  region: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
