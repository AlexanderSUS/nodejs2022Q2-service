import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TracksRepository } from './tracks.repository';

@Injectable()
export class TracksService {
  constructor(private tracksRepository: TracksRepository) {}

  create(createTrackDto: CreateTrackDto) {
    return this.tracksRepository.create(createTrackDto);
  }

  findAll() {
    return this.tracksRepository.getAll();
  }

  async findOne(id: string) {
    return this.tracksRepository.getById(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.tracksRepository.update(id, updateTrackDto);
  }

  async remove(id: string) {
    await this.tracksRepository.remove(id);
  }
}
