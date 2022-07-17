import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbStoreKey } from 'src/const/enum';
import { DbService } from 'src/db/db.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(private readonly DbService: DbService) {}

  create(createArtistDto: CreateArtistDto) {
    return this.DbService.create({
      dto: createArtistDto,
      type: DbStoreKey.artists,
    });
  }

  findAll() {
    return this.DbService.findAll(DbStoreKey.artists);
  }

  findOne(id: string) {
    const artist = this.DbService.findOne(id, DbStoreKey.artists);

    if (!artist) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const result = this.DbService.update(id, {
      dto: updateArtistDto,
      type: DbStoreKey.artists,
    });

    if (!result) {
      throw new HttpException('Aritst not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  remove(id: string) {
    const isFound = this.DbService.remove(id, DbStoreKey.artists);

    if (!isFound) {
      throw new HttpException('Arits not found', HttpStatus.NOT_FOUND);
    }
  }
}
