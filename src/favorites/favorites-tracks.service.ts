import { Injectable } from '@nestjs/common';
import { FavoritesRepository } from './favorites.repository';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class FavoritesTracksService {
  constructor(
    private readonly favoritesRepository: FavoritesRepository,
    private readonly tracksService: TracksService,
  ) {}

  async add(id: string) {
    const track = await this.tracksService.findOne(id);
    return this.favoritesRepository.addTrack(track);
  }

  remove(id: string) {
    return this.favoritesRepository.removeTrack(id);
  }
}
