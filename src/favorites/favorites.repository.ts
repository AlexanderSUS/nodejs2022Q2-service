import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { Repository } from 'typeorm';
import { Track } from 'src/tracks/entities/track.entity';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';

@Injectable()
export class FavoritesRepository {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
  ) {}

  async getAll() {
    let [favorites] = await this.favoriteRepository.find({
      relations: {
        artists: true,
        albums: true,
        tracks: true,
      },
    });

    if (!favorites) {
      favorites = this.favoriteRepository.create();
      await this.favoriteRepository.save(favorites);
    }

    return favorites;
  }

  private async getFavorites(
    relations: { tracks: true } | { albums: true } | { artists: true },
  ) {
    let [favorite] = await this.favoriteRepository.find({ relations });

    if (!favorite) {
      favorite = this.favoriteRepository.create();
    }
    return favorite;
  }

  async addTrack(track: Track) {
    const favorite = await this.getFavorites({ tracks: true });
    favorite.tracks.push(track);

    await this.favoriteRepository.save(favorite);
  }

  async addAlbum(album: Album) {
    const favorite = await this.getFavorites({ albums: true });
    favorite.albums.push(album);

    await this.favoriteRepository.save(favorite);
  }

  async addArtist(artist: Artist) {
    const favorite = await this.getFavorites({ artists: true });
    favorite.artists.push(artist);

    await this.favoriteRepository.save(favorite);
  }

  // async remove(
  //   relations: { tracks: true } | { albums: true } | { artists: true },
  //   itemId: string,
  // ) {
  //   const key = Object.keys(relations)[0];

  //   const favorite = await this.getFavorites(relations);
  //   const index = favorite[key].findIndex(({ id }) => id === itemId);

  //   if (index === -1) throw new NotFoundException(`${key} not found`);

  //   favorite[key].splice(index, 1);
  //   await this.favoriteRepository.save(favorite);
  // }

  async removeTrack(trackId: string) {
    const favorite = await this.getFavorites({ tracks: true });

    const index = favorite.tracks.findIndex(({ id }) => id === trackId);

    if (index === -1) throw new NotFoundException('Track not found');

    favorite.tracks.splice(index, 1);
    await this.favoriteRepository.save(favorite.tracks);
  }

  async removeAlbum(trackId: string) {
    const favorite = await this.getFavorites({ albums: true });

    const index = favorite.albums.findIndex(({ id }) => id === trackId);

    if (index === -1) throw new NotFoundException('Album not found');

    favorite.albums.splice(index, 1);
    await this.favoriteRepository.save(favorite.albums);
  }

  async removeArtist(trackId: string) {
    const favorite = await this.getFavorites({ artists: true });

    const index = favorite.artists.findIndex(({ id }) => id === trackId);

    if (index === -1) throw new NotFoundException('Artist not found');

    favorite.artists.splice(index, 1);
    await this.favoriteRepository.save(favorite.artists);
  }
}
