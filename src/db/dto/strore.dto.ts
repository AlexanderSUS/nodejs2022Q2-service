import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { Favourite } from 'src/favourites/entities/favourite.entity';
import { AlbumEntity } from 'src/albums/entities/album.entity';

export class Store {
  users: UserEntity[];
  artists: ArtistEntity[];
  albums: AlbumEntity[];
  tracks: TrackEntity[];
  favourites: Favourite;
}
