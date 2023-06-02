import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Artist, (artist) => artist.tracks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  artist: Artist;

  @Column({ type: 'uuid', nullable: true })
  artistId: string;

  @ManyToOne(() => Album, (album) => album.tracks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  album: Album;

  @Column({ type: 'uuid', nullable: true })
  albumId: string;

  @ManyToMany(() => Favorite)
  favorites: Favorite[];

  @Column()
  duration: number;
}
