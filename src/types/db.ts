import { CreateAlbumDto } from 'src/albums/dto/create-album.dto';
import { Store } from '../db/dto/strore.dto';
import { CreateArtistDto } from 'src/artists/dto/create-artist.dto';
import { CreateTrackDto } from 'src/tracks/dto/create-track.dto';
import { UpdateArtistDto } from 'src/artists/dto/update-artist.dto';
import { UpdateAlbumDto } from 'src/albums/dto/update-album.dto';
import { UpdateTrackDto } from 'src/tracks/dto/update-track.dto';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { UpdatePasswordDto } from 'src/user/dto/update-user.dto';

export type DbKey = keyof Store;

export type FavouritesKey = keyof Store['favourites'];

export type DbCollectionKey = Exclude<DbKey, 'favourites'>;

type CreateEntityDto =
  | CreateArtistDto
  | CreateAlbumDto
  | CreateTrackDto
  | CreateUserDto;

type UpdateEntityDto =
  | UpdateArtistDto
  | UpdateAlbumDto
  | UpdateTrackDto
  | UpdatePasswordDto;

export type EntityDto = ArtistEntity | AlbumEntity | TrackEntity | UserEntity;

export type FavouritesEntity = ArtistEntity | AlbumEntity | TrackEntity;

type AritistPayload<T = CreateEntityDto | UpdateEntityDto> = {
  type: Extract<DbKey, 'artists'>;
  dto: T;
};

type AlbumPayload<T> = {
  type: Extract<DbKey, 'albums'>;
  dto: T;
};

type TrackPayload<T> = {
  type: Extract<DbKey, 'tracks'>;
  dto: T;
};

type UserPayload<T> = {
  type: Extract<DbKey, 'users'>;
  dto: T;
};

export type DbCreatePayload =
  | AritistPayload<CreateArtistDto>
  | AlbumPayload<CreateAlbumDto>
  | TrackPayload<CreateTrackDto>
  | UserPayload<CreateUserDto>;

export type DbUpdatePayload =
  | AritistPayload<UpdateArtistDto>
  | AlbumPayload<UpdateAlbumDto>
  | TrackPayload<UpdateTrackDto>
  | UserPayload<UpdatePasswordDto>;
