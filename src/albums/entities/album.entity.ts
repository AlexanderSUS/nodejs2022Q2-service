import { ArtistEntity } from 'src/artists/entities/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => ArtistEntity, (artist) => artist.albums, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  artits: ArtistEntity;
}
