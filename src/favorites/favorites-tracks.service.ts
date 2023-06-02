import {
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesRepository } from './favorites.repository';
import { TracksService } from 'src/tracks/tracks.service';
import { StatusCodes } from 'http-status-codes';

@Injectable()
export class FavoritesTracksService {
  constructor(
    private readonly favoritesRepository: FavoritesRepository,
    private readonly tracksService: TracksService,
  ) {}

  async add(id: string) {
    try {
      const track = await this.tracksService.findOne(id);
      return this.favoritesRepository.addTrack(track);
    } catch (err) {
      if ('status' in err && err.status === StatusCodes.NOT_FOUND) {
        throw new UnprocessableEntityException();
      }

      throw new InternalServerErrorException();
    }
  }

  remove(id: string) {
    return this.favoritesRepository.removeTrack(id);
  }
}
