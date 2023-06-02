import {
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesRepository } from './favorites.repository';
import { ArtistsService } from 'src/artists/artists.service';
import { StatusCodes } from 'http-status-codes';

@Injectable()
export class FavoritesArtistsService {
  constructor(
    private readonly favoritesRepository: FavoritesRepository,
    private readonly artistsService: ArtistsService,
  ) {}

  async add(id: string) {
    try {
      const artist = await this.artistsService.findOne(id);
      return this.favoritesRepository.addArtist(artist);
    } catch (err) {
      if ('status' in err && err.status === StatusCodes.NOT_FOUND) {
        throw new UnprocessableEntityException();
      }

      throw new InternalServerErrorException();
    }
  }

  remove(id: string) {
    return this.favoritesRepository.removeArtist(id);
  }
}
