import {
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { FavoritesRepository } from './favorites.repository';
import { StatusCodes } from 'http-status-codes';

@Injectable()
export class FavoritesAlbumsService {
  constructor(
    private readonly favoritesRepository: FavoritesRepository,
    private readonly albumsService: AlbumsService,
  ) {}

  async add(id: string) {
    try {
      const album = await this.albumsService.findOne(id);
      return this.favoritesRepository.addAlbum(album);
    } catch (err) {
      if ('status' in err && err.status === StatusCodes.NOT_FOUND) {
        throw new UnprocessableEntityException();
      }

      throw new InternalServerErrorException();
    }
  }

  remove(id: string) {
    return this.favoritesRepository.removeAlbum(id);
  }
}
