import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { GenericRepository } from 'src/database/generic.repository';
import { Track } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostgresErrorCode } from 'src/database/enum/postgres-error-code.enum';

@Injectable()
export class TracksRepository implements GenericRepository<Track> {
  constructor(
    @InjectRepository(Track)
    private readonly tracksRepository: Repository<Track>,
  ) {}

  getAll(): Promise<Track[]> {
    return this.tracksRepository.find();
  }

  async getById(id: string): Promise<Track> {
    const track = await this.tracksRepository.findOneBy({ id });

    if (!track) throw new NotFoundException('Track not found');

    return track;
  }

  async create(
    data: Omit<Track, 'id' | 'favorites' | 'album' | 'artist'>,
  ): Promise<Track> {
    try {
      const track = await this.tracksRepository.save(
        this.tracksRepository.create(data),
      );

      return track;
    } catch (err) {
      if ('code' in err && err.code === PostgresErrorCode.UniqueViolation) {
        throw new BadRequestException('Track already exist');
      }

      throw new InternalServerErrorException();
    }
  }

  async update(id: string, updateDto: Partial<Track>): Promise<Track> {
    const track = await this.getById(id);

    if (!track) throw new NotFoundException('Track not found');

    return this.tracksRepository.save({ ...track, ...updateDto });
  }

  async remove(id: string): Promise<void> {
    const { affected } = await this.tracksRepository.delete({ id });

    if (!affected) {
      throw new NotFoundException();
    }
  }
}
