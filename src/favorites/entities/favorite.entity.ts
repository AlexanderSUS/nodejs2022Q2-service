import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FavoriteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => AlbumEntity)
  @JoinTable()
  albums: AlbumEntity[];

  @ManyToMany(() => ArtistEntity)
  @JoinTable()
  artists: ArtistEntity[];

  @ManyToMany(() => TrackEntity)
  @JoinTable()
  tracks: TrackEntity[];
}
