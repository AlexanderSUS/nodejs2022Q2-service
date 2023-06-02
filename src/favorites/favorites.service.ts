import { Injectable } from '@nestjs/common';
import { FavoritesArtistsService } from './favorites-artists.service';
import { FavoritesAlbumsService } from './favorites-albums.service';
import { FavoritesTracksService } from './favorites-tracks.service';
import { FavoritesRepository } from './favorites.repository';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly favoritesRepository: FavoritesRepository,
    private readonly favoritesArtistService: FavoritesArtistsService,
    private readonly favoritesAlbumService: FavoritesAlbumsService,
    private readonly favoritesTracksService: FavoritesTracksService,
  ) {}

  addTrack(id: string) {
    return this.favoritesTracksService.add(id);
  }

  addAlbum(id: string) {
    return this.favoritesAlbumService.add(id);
  }

  addArtist(id: string) {
    return this.favoritesArtistService.add(id);
  }

  findAll() {
    return this.favoritesRepository.getAll();
  }

  removeArtist(id: string) {
    return this.favoritesArtistService.remove(id);
  }

  removeAlbum(id: string) {
    return this.favoritesAlbumService.remove(id);
  }

  removeTrack(id: string) {
    return this.favoritesTracksService.remove(id);
  }
}
