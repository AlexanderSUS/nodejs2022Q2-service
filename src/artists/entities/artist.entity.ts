import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ArtistEntity {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  grammy: boolean;
}
