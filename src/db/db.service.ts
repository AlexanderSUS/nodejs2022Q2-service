import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Store } from './dto/strore.dto';
import {
  DbCollectionKey,
  DbCreatePayload,
  DbKey,
  DbUpdatePayload,
  FavouritesKey,
} from 'src/types/db';
import { DbMessage } from 'src/const/enum';

@Injectable()
export class DbService {
  private readonly store: Store = {
    users: [],
    artists: [],
    albums: [],
    tracks: [],
    favourites: {
      albums: [],
      artists: [],
      tracks: [],
    },
  };

  async create(payload: DbCreatePayload) {
    const { type, dto } = payload;

    if (type === 'artists') {
      const entityStore = this.store[type] as Store['artists'];

      const length = entityStore.push({ id: uuidv4(), ...dto });

      return entityStore[length - 1];
    }

    if (type === 'albums') {
      const entityStore = this.store[type] as Store['albums'];
      const length = entityStore.push({ id: uuidv4(), ...dto });

      return entityStore[length - 1];
    }

    if (type === 'tracks') {
      const entityStore = this.store[type] as Store['tracks'];
      const length = entityStore.push({ id: uuidv4(), ...dto });

      return entityStore[length - 1];
    }

    if (type === 'users') {
      const entityStore = this.store[type] as Store['users'];

      const userDto = {
        ...dto,
        id: uuidv4(),
        version: 1,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      const length = entityStore.push(userDto);

      const newUser = { ...entityStore[length - 1] };

      delete newUser.password;

      return newUser;
    }
  }

  findAll(entityType: DbKey) {
    return this.store[entityType];
  }

  findOne(id: string, type: DbCollectionKey) {
    if (type === 'artists') {
      return this.store[type].find((entity) => entity.id === id);
    }

    if (type === 'albums') {
      return this.store[type].find((entity) => entity.id === id);
    }

    if (type === 'tracks') {
      return this.store[type].find((entity) => entity.id === id);
    }

    if (type === 'users') {
      return this.store[type].find((entity) => entity.id === id);
    }
  }

  update(id: string, payload: DbUpdatePayload) {
    const { dto, type } = payload;

    if (type === 'artists') {
      const entityIndex = this.store[type].findIndex(
        (entity) => entity.id === id,
      );

      this.store[type][entityIndex] = {
        ...this.store[type][entityIndex],
        ...dto,
      };

      return entityIndex === -1 ? null : this.store[type][entityIndex];
    }

    if (type === 'albums') {
      const entityIndex = this.store[type].findIndex(
        (entity) => entity.id === id,
      );

      this.store[type][entityIndex] = {
        ...this.store[type][entityIndex],
        ...dto,
      };

      return entityIndex === -1 ? null : this.store[type][entityIndex];
    }

    if (type === 'tracks') {
      const entityIndex = this.store[type].findIndex(
        (entity) => entity.id === id,
      );

      this.store[type][entityIndex] = {
        ...this.store[type][entityIndex],
        ...dto,
      };

      return entityIndex === -1 ? null : this.store[type][entityIndex];
    }

    if (type === 'users') {
      const entityIndex = this.store[type].findIndex(
        (entity) => entity.id === id,
      );

      if (entityIndex === -1) {
        return null;
      }

      if (dto.oldPassword !== this.store[type][entityIndex].password) {
        return DbMessage.wrongPassword;
      }

      this.store[type][entityIndex] = {
        ...this.store[type][entityIndex],
        password: dto.newPassword,
        version: this.store[type][entityIndex].version + 1,
        updatedAt: Date.now(),
      };

      const updatedUser = { ...this.store[type][entityIndex] };
      delete updatedUser.password;

      return updatedUser;
    }
  }

  remove(id: string, type: DbCollectionKey) {
    const initialLength = this.store[type].length;

    if (type === 'artists') {
      this.store[type] = this.store[type].filter((entity) => entity.id !== id);

      this.store.albums
        .filter((album) => album.artistId === id)
        .forEach((album) => (album.artistId = null));

      this.store.tracks
        .filter((track) => track.artistId === id)
        .forEach((track) => (track.artistId = null));

      this.store.favourites.artists = this.store.favourites.artists.filter(
        (artist) => artist.id !== id,
      );
    }

    if (type === 'albums') {
      this.store[type] = this.store[type].filter((entity) => entity.id !== id);

      this.store.tracks
        .filter((track) => track.albumId === id)
        .forEach((track) => (track.albumId = null));

      this.store.favourites.albums = this.store.favourites.albums.filter(
        (album) => album.id !== id,
      );
    }

    if (type === 'tracks') {
      this.store[type] = this.store[type].filter((entity) => entity.id !== id);

      this.store.favourites.tracks = this.store.favourites.tracks.filter(
        (track) => track.id !== id,
      );
    }

    if (type === 'users') {
      this.store[type] = this.store[type].filter((entity) => entity.id !== id);
    }

    return this.store[type].length < initialLength;
  }

  addToFavourites(id: string, type: FavouritesKey) {
    if (type === 'artists') {
      const entity = this.store[type].find((entity) => entity.id !== id);

      if (!entity) return null;

      const length = this.store.favourites[type].push(entity);
      return this.store.favourites[type][length - 1];
    }

    if (type === 'albums') {
      const entity = this.store[type].find((entity) => entity.id !== id);

      if (!entity) return null;

      const length = this.store.favourites[type].push(entity);
      return this.store.favourites[type][length - 1];
    }

    if (type === 'tracks') {
      const entity = this.store[type].find((entity) => entity.id !== id);

      if (!entity) return null;

      const length = this.store.favourites[type].push(entity);
      return this.store.favourites[type][length - 1];
    }
  }

  removeFromFavourites(id: string, type: FavouritesKey) {
    const favourites = this.store.favourites;

    const initialLength = favourites[type].length;

    if (type === 'artists') {
      favourites[type] = favourites[type].filter((entity) => entity.id !== id);
    }

    if (type === 'albums') {
      favourites[type] = favourites[type].filter((entity) => entity.id !== id);
    }

    if (type === 'tracks') {
      favourites[type] = favourites[type].filter((entity) => entity.id !== id);
    }

    return favourites[type].length < initialLength;
  }
}
