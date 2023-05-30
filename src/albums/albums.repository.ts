import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Repository } from 'typeorm';
import { GenericRepository } from 'src/database/generic.repository';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PostgresErrorCode } from 'src/database/enum/postgres-error-code.enum';

export class AlbumsRepository implements GenericRepository<Album> {
  constructor(
    @InjectRepository(Album)
    private readonly albumsRepository: Repository<Album>,
  ) {}

  getAll() {
    return this.albumsRepository.find();
  }

  async getById(id: string): Promise<Album> {
    const album = await this.albumsRepository.findOneBy({ id });

    if (!album) throw new NotFoundException('Album not found');

    return album;
  }

  async create(
    data: Omit<Album, 'id' | 'tracks' | 'favorites'>,
  ): Promise<Album> {
    try {
      const album = await this.albumsRepository.save(
        this.albumsRepository.create(data),
      );

      return album;
    } catch (err) {
      if ('code' in err && err.code === PostgresErrorCode.ForeignKeyViolation) {
        throw new BadRequestException('Foreign key violation');
      }

      if ('code' in err && err.code === PostgresErrorCode.UniqueViolation) {
        throw new BadRequestException('Name already busy');
      }

      throw new InternalServerErrorException();
    }
  }

  async update(id: string, updateDto: Partial<Album>): Promise<Album> {
    const album = await this.getById(id);

    if (!album) throw new NotFoundException();

    try {
      return this.albumsRepository.save({ ...album, ...updateDto });
    } catch (err) {
      if ('code' in err && err.code === PostgresErrorCode.ForeignKeyViolation) {
        throw new BadRequestException('Foreign key violation');
      }

      if ('code' in err && err.code === PostgresErrorCode.UniqueViolation) {
        throw new BadRequestException('Name already busy');
      }

      throw new InternalServerErrorException();
    }
  }

  async remove(id: string): Promise<void> {
    const { affected } = await this.albumsRepository.delete({ id });

    if (!affected) {
      throw new NotFoundException();
    }
  }
}
