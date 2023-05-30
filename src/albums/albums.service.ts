import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumsRepository } from './albums.repository';

@Injectable()
export class AlbumsService {
  constructor(private readonly albumRepository: AlbumsRepository) {}

  create(createAlbumDto: CreateAlbumDto) {
    return this.albumRepository.create(createAlbumDto);
  }

  findAll() {
    return this.albumRepository.getAll();
  }

  findOne(id: string) {
    return this.albumRepository.getById(id);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.albumRepository.update(id, updateAlbumDto);
  }

  async remove(id: string) {
    return this.albumRepository.remove(id);
  }
}
