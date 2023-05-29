import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { Repository } from 'typeorm';
import { FavoriteEntity } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoriteEntity)
    private favoriteRepository: Repository<FavoriteEntity>,

    @InjectRepository(ArtistEntity)
    private artistsRepository: Repository<ArtistEntity>,

    @InjectRepository(AlbumEntity)
    private albumsRepository: Repository<AlbumEntity>,

    @InjectRepository(TrackEntity)
    private tracksRepository: Repository<TrackEntity>,
  ) {}

  async addTrack(id: string) {
    const track = await this.tracksRepository.findOneBy({ id });

    if (!track) {
      throw new HttpException(
        'Track not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    let [favorite] = await this.favoriteRepository.find({
      relations: {
        tracks: true,
      },
    });

    if (!favorite) {
      favorite = await this.favoriteRepository.save(new FavoriteEntity());
    }

    favorite.tracks.push(track);

    await this.favoriteRepository.save(favorite);
  }

  async addAlbum(id: string) {
    const album = await this.albumsRepository.findOneBy({ id });

    if (!album) {
      throw new HttpException(
        'Album not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    let [favorite] = await this.favoriteRepository.find({
      relations: {
        albums: true,
      },
    });

    if (!favorite) {
      favorite = await this.favoriteRepository.save(new FavoriteEntity());
    }

    favorite.albums.push(album);

    await this.favoriteRepository.save(favorite);
  }

  async addArtist(id: string) {
    const artist = await this.artistsRepository.findOneBy({ id });

    if (!artist) {
      throw new HttpException(
        'Entity not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    let [favorite] = await this.favoriteRepository.find({
      relations: {
        artists: true,
      },
    });

    if (!favorite) {
      favorite = await this.favoriteRepository.save(new FavoriteEntity());
    }

    favorite.artists.push(artist);

    await this.favoriteRepository.save(favorite);
  }

  async findAll() {
    const [favorites] = await this.favoriteRepository.find({
      relations: {
        artists: true,
        albums: true,
        tracks: true,
      },
    });

    if (favorites) {
      return favorites;
    }

    await this.favoriteRepository.save(new FavoriteEntity());

    const [emptyFavorites] = await this.favoriteRepository.find({
      relations: {
        artists: true,
        albums: true,
        tracks: true,
      },
    });

    return emptyFavorites;
  }

  async removeArtist(id: string) {
    const entity = await this.artistsRepository.findOneBy({ id });

    if (!entity) {
      throw new HttpException(
        'Artist not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const [favorite] = await this.favoriteRepository.find({
      relations: {
        artists: true,
      },
    });

    if (!favorite) {
      throw new HttpException(
        'Entity does not exits in favortes',
        HttpStatus.NOT_FOUND,
      );
    }

    favorite.artists = favorite.artists.filter((artist) => artist.id !== id);

    await this.favoriteRepository.save(favorite);
  }

  async removeAlbum(id: string) {
    const entity = await this.albumsRepository.findOneBy({ id });

    if (!entity) {
      throw new HttpException(
        'Album not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const [favorite] = await this.favoriteRepository.find({
      relations: {
        albums: true,
      },
    });

    if (!favorite) {
      throw new HttpException(
        'Entity does not exits in favortes',
        HttpStatus.NOT_FOUND,
      );
    }

    favorite.albums = favorite.albums.filter((album) => album.id !== id);

    await this.favoriteRepository.save(favorite);
  }

  async removeTrack(id: string) {
    const entity = await this.tracksRepository.findOneBy({ id });

    if (!entity) {
      throw new HttpException(
        'Track not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const [favorite] = await this.favoriteRepository.find({
      relations: {
        tracks: true,
      },
    });

    if (!favorite) {
      throw new HttpException(
        'Track does not exits in favortes',
        HttpStatus.NOT_FOUND,
      );
    }

    favorite.tracks = favorite.tracks.filter((track) => track.id !== id);

    await this.favoriteRepository.save(favorite);
  }
}
