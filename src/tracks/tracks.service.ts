import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  create(createTrackDto: CreateTrackDto) {
    return this.trackRepository.save(createTrackDto);
  }

  findAll() {
    return this.trackRepository.find();
  }

  async findOne(id: string) {
    const track = await this.trackRepository.findOneBy({ id });

    if (!track) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.trackRepository.findOneBy({ id });

    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    return this.trackRepository.save({ ...track, ...updateTrackDto });
  }

  async remove(id: string) {
    const track = await this.trackRepository.findOneBy({ id });

    if (!track) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    await this.trackRepository.remove(track);
  }
}
