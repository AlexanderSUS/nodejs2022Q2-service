import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbStoreKey } from 'src/const/enum';
import { DbService } from 'src/db/db.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(private readonly DbService: DbService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    return this.DbService.create({
      dto: createAlbumDto,
      type: DbStoreKey.albums,
    }) as Promise<AlbumEntity>;
  }

  findAll() {
    return this.DbService.findAll(DbStoreKey.albums);
  }

  findOne(id: string) {
    const album = this.DbService.findOne(id, DbStoreKey.albums);

    if (!album) {
      throw new HttpException('Album Not found', HttpStatus.NOT_FOUND);
    }

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const result = this.DbService.update(id, {
      dto: updateAlbumDto,
      type: DbStoreKey.albums,
    });

    if (!result) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  remove(id: string) {
    const isFound = this.DbService.remove(id, DbStoreKey.albums);

    if (!isFound) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
  }
}
