import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TrackEntity {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  artistId: string | null; // refers to Artist

  @Column({
    nullable: true,
  })
  albumId: string | null; // refers to Album

  @Column()
  duration: number; // integer number
}
