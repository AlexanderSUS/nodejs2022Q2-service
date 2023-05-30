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

  @Column({ unique: true })
  name: string;

  @ManyToOne(() => Artist, (artist) => artist.tracks)
  artist: Artist;

  @ManyToOne(() => Album, (album) => album.tracks)
  album: Album;

  @ManyToMany(() => Favorite)
  favorites: Favorite[];

  @Column()
  duration: number;
}
