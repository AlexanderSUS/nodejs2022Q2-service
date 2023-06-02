import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { GenericRepository } from 'src/database/generic.repository';
import { Artist } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostgresErrorCode } from 'src/database/enum/postgres-error-code.enum';

@Injectable()
export class ArtistsRepository implements GenericRepository<Artist> {
  constructor(
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
  ) {}

  getAll(): Promise<Artist[]> {
    return this.artistsRepository.find();
  }

  async getById(id: string): Promise<Artist> {
    const artist = await this.artistsRepository.findOneBy({ id });

    if (!artist) throw new NotFoundException('Artist not found');

    return artist;
  }

  async create(
    data: Omit<Artist, 'id' | 'tracks' | 'albums' | 'favorites'>,
  ): Promise<Artist> {
    try {
      const artist = await this.artistsRepository.save(
        this.artistsRepository.create(data),
      );

      return artist;
    } catch (err) {
      if ('code' in err && err.code === PostgresErrorCode.UniqueViolation) {
        throw new BadRequestException('Login already busy');
      }

      throw new InternalServerErrorException();
    }
  }

  async update(id: string, updateDto: Partial<Artist>): Promise<Artist> {
    const artist = await this.getById(id);

    if (!artist) throw new NotFoundException();

    return this.artistsRepository.save({ ...artist, ...updateDto });
  }

  async remove(id: string): Promise<void> {
    const { affected } = await this.artistsRepository.delete({ id });

    if (!affected) {
      throw new NotFoundException();
    }
  }
}
