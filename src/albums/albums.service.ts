import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {}

  create(createAlbumDto: CreateAlbumDto) {
    return this.albumRepository.save(createAlbumDto);
  }

  findAll() {
    return this.albumRepository.find();
  }

  async findOne(id: string) {
    const album = await this.albumRepository.findOneBy({ id });

    if (!album) {
      throw new HttpException('Album Not found', HttpStatus.NOT_FOUND);
    }

    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.albumRepository.findOneBy({ id });

    if (!album) {
      throw new HttpException('Album Not found', HttpStatus.NOT_FOUND);
    }

    return this.albumRepository.save({ ...album, ...updateAlbumDto });
  }

  async remove(id: string) {
    const album = await this.albumRepository.findOneBy({ id });

    if (!album) {
      throw new HttpException('Arits not found', HttpStatus.NOT_FOUND);
    }

    await this.albumRepository.remove(album);
  }
}
