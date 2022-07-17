import { Injectable } from '@nestjs/common';
import { DbStoreKey } from 'src/const/enum';
import { DbService } from 'src/db/db.service';
import { FavouritesKey } from 'src/types/db';

@Injectable()
export class FavouritesService {
  constructor(private readonly DbService: DbService) {}

  addTrack(id: string) {
    this.DbService.addToFavourites(id, DbStoreKey.tracks);
  }

  addAlbum(id: string) {
    this.DbService.addToFavourites(id, DbStoreKey.albums);
  }

  addArtist(id: string) {
    this.DbService.addToFavourites(id, DbStoreKey.artists);
  }

  findAll() {
    return this.DbService.findAll(DbStoreKey.favourites);
  }

  remove(id: string, type: FavouritesKey) {
    return this.DbService.removeFromFavourites(id, type);
  }
}
