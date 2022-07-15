import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  private albums: AlbumEntity[] = [];

  async create(createAlbumDto: CreateAlbumDto) {
    this.albums.push({
      id: uuidv4(),
      ...createAlbumDto,
    });

    return this.albums[this.albums.length - 1];
  }

  findAll() {
    return this.albums;
  }

  findOne(id: string) {
    const album = this.albums.find((album) => album.id === id);

    if (!album) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const albumIndex = this.albums.findIndex((album) => album.id === id);

    if (albumIndex === -1) {
      throw new HttpException('album not found', HttpStatus.NOT_FOUND);
    }

    this.albums[albumIndex] = {
      ...this.albums[albumIndex],
      ...updateAlbumDto,
    };

    return this.albums[albumIndex];
  }

  remove(id: string) {
    const initialLength = this.albums.length;

    this.albums = this.albums.filter((album) => album.id !== id);

    if (!(initialLength > this.albums.length)) {
      throw new HttpException('album not found', HttpStatus.NOT_FOUND);
    }
  }
}
