import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  private artists: ArtistEntity[] = [];

  create(createArtistDto: CreateArtistDto) {
    this.artists.push({
      id: uuidv4(),
      ...createArtistDto,
    });

    return this.artists[this.artists.length - 1];
  }

  findAll() {
    return this.artists;
  }

  findOne(id: string) {
    const artist = this.artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);

    if (artistIndex === -1) {
      throw new HttpException('artist not found', HttpStatus.NOT_FOUND);
    }

    this.artists[artistIndex] = {
      ...this.artists[artistIndex],
      ...updateArtistDto,
    };

    return this.artists[artistIndex];
  }

  remove(id: string) {
    const initialLength = this.artists.length;

    this.artists = this.artists.filter((artist) => artist.id !== id);

    if (!(initialLength > this.artists.length)) {
      throw new HttpException('artist not found', HttpStatus.NOT_FOUND);
    }
  }
}
