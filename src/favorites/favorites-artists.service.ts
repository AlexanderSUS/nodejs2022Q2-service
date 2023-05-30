import { Injectable } from '@nestjs/common';
import { FavoritesRepository } from './favorites.repository';
import { ArtistsService } from 'src/artists/artists.service';

@Injectable()
export class FavoritesArtistsService {
  constructor(
    private readonly favoritesRepository: FavoritesRepository,
    private readonly artistsService: ArtistsService,
  ) {}

  async add(id: string) {
    const artist = await this.artistsService.findOne(id);
    return this.favoritesRepository.addArtist(artist);
  }

  remove(id: string) {
    return this.favoritesRepository.removeArtist(id);
  }
}
