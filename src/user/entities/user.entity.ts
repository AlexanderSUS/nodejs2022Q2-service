import { Exclude, Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string; // uuid v4

  @Column()
  login: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  @Exclude()
  refreshTokenHash: string;

  @VersionColumn()
  version: number;

  @Transform(({ value }) => new Date(value).getTime(), { toPlainOnly: true })
  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: number;

  @Transform(({ value }) => new Date(value).getTime(), { toPlainOnly: true })
  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: number;
}
