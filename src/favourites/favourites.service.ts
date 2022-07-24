import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FavouriteEntity } from './entities/favourite.entity';

@Injectable()
export class FavouritesService {
  // async addTrack(id: string) {
  //   const track = await this.tracksRepository.findOneBy({ id });
  //   if (!track) {
  //     throw new HttpException(
  //       'Entity not found',
  //       HttpStatus.UNPROCESSABLE_ENTITY,
  //     );
  //   }
  //   return this.FavsRepository.save(track);
  // }
  // async addAlbum(id: string) {
  //   const album = await this.albumRepository.findOneBy({ id });
  //   if (!album) {
  //     throw new HttpException(
  //       'Entity not found',
  //       HttpStatus.UNPROCESSABLE_ENTITY,
  //     );
  //   }
  //   return this.FavsRepository.save(album);
  // }
  // async addArtist(id: string) {
  //   const artist = await this.aritstRepository.findOneBy({ id });
  //   if (!artist) {
  //     throw new HttpException(
  //       'Entity not found',
  //       HttpStatus.UNPROCESSABLE_ENTITY,
  //     );
  //   }
  //   return this.FavsRepository.save(artist);
  // }
  // findAll() {
  //   return this.FavsRepository.find();
  // }
  // remove(id: string) {
  //   this.
  //   return this.favouriteRepository.remove();
  // }
}
