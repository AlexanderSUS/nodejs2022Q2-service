import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TracksService {
  private tracks: TrackEntity[] = [];

  create(createTrackDto: CreateTrackDto) {
    this.tracks.push({
      id: uuidv4(),
      ...createTrackDto,
    });

    return this.tracks[this.tracks.length - 1];
  }

  findAll() {
    return this.tracks;
  }

  findOne(id: string) {
    const track = this.tracks.find((track) => track.id === id);

    if (!track) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);

    if (trackIndex === -1) {
      throw new HttpException('track not found', HttpStatus.NOT_FOUND);
    }

    this.tracks[trackIndex] = {
      ...this.tracks[trackIndex],
      ...updateTrackDto,
    };

    return this.tracks[trackIndex];
  }

  remove(id: string) {
    const initialLength = this.tracks.length;

    this.tracks = this.tracks.filter((track) => track.id !== id);

    if (!(initialLength > this.tracks.length)) {
      throw new HttpException('track not found', HttpStatus.NOT_FOUND);
    }
  }
}
