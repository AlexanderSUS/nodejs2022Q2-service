import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DbStoreKey } from 'src/const/enum';
import { DbService } from 'src/db/db.service';

@Injectable()
export class TracksService {
  constructor(private readonly DbService: DbService) {}

  create(createTrackDto: CreateTrackDto) {
    return this.DbService.create({
      dto: createTrackDto,
      type: DbStoreKey.tracks,
    });
  }

  findAll() {
    return this.DbService.findAll(DbStoreKey.tracks);
  }

  findOne(id: string) {
    const artist = this.DbService.findOne(id, DbStoreKey.tracks);

    if (!artist) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const result = this.DbService.update(id, {
      dto: updateTrackDto,
      type: DbStoreKey.tracks,
    });

    if (!result) {
      throw new HttpException('Aritst not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  remove(id: string) {
    const isFound = this.DbService.remove(id, DbStoreKey.tracks);

    if (!isFound) {
      throw new HttpException('Arits not found', HttpStatus.NOT_FOUND);
    }
  }
}
