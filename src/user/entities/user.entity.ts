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
export class UserEntity {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string; // uuid v4

  @Column()
  login: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  refreshTokenHash: string;

  @VersionColumn()
  version: number; // integer number, increments on update

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: number; // timestamp of creation

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: number; // timestamp of last update
}
