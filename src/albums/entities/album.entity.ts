import { Artist } from 'src/artists/entities/artist.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { Track } from 'src/tracks/entities/track.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => Artist, (artist) => artist.albums, { nullable: true })
  @JoinColumn()
  artist?: Artist;

  @Column({ type: 'uuid', nullable: true })
  artistId: string;

  @OneToMany(() => Track, (track) => track.album)
  tracks: Track[];

  @ManyToMany(() => Favorite)
  favorites: Favorite[];
}
