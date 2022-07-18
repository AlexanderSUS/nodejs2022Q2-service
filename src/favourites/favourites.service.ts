import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbStoreKey } from 'src/const/enum';
import { DbService } from 'src/db/db.service';
import { FavouritesKey } from 'src/types/db';

@Injectable()
export class FavouritesService {
  constructor(private readonly DbService: DbService) {}

  addTrack(id: string) {
    const track = this.DbService.addToFavourites(id, DbStoreKey.tracks);

    if (!track) {
      throw new HttpException(
        'Entity not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return track;
  }

  addAlbum(id: string) {
    const album = this.DbService.addToFavourites(id, DbStoreKey.albums);

    if (!album) {
      throw new HttpException(
        'Entity not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return album;
  }

  addArtist(id: string) {
    const artist = this.DbService.addToFavourites(id, DbStoreKey.artists);

    if (!artist) {
      throw new HttpException(
        'Entity not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return artist;
  }

  findAll() {
    return this.DbService.findAll(DbStoreKey.favourites);
  }

  remove(id: string, type: FavouritesKey) {
    return this.DbService.removeFromFavourites(id, type);
  }
}
