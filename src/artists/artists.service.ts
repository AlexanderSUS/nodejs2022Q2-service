import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  create(createArtistDto: CreateArtistDto) {
    return this.artistRepository.save(createArtistDto);
  }

  findAll() {
    return this.artistRepository.find();
  }

  async findOne(id: string) {
    const artist = await this.artistRepository.findOneBy({ id });

    if (!artist) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.artistRepository.findOneBy({ id });

    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    return this.artistRepository.save({ ...artist, ...updateArtistDto });
  }

  async remove(id: string) {
    const artist = await this.artistRepository.findOneBy({ id });

    if (!artist) {
      throw new HttpException('Arits not found', HttpStatus.NOT_FOUND);
    }

    await this.artistRepository.remove(artist);
  }
}
