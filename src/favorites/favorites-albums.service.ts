import { Injectable } from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { FavoritesRepository } from './favorites.repository';

@Injectable()
export class FavoritesAlbumsService {
  constructor(
    private readonly favoritesRepository: FavoritesRepository,
    private readonly albumsService: AlbumsService,
  ) {}

  async add(id: string) {
    const album = await this.albumsService.findOne(id);
    return this.favoritesRepository.addAlbum(album);
  }

  remove(id: string) {
    return this.favoritesRepository.removeAlbum(id);
  }
}
