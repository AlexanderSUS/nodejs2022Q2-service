import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { FavoritesRepository } from './favorites.repository';
import { FavoritesArtistsService } from './favorites-artists.service';
import { FavoritesAlbumsService } from './favorites-albums.service';
import { FavoritesTracksService } from './favorites-tracks.service';
import { ArtistsModule } from 'src/artists/artists.module';
import { AlbumsModule } from 'src/albums/albums.module';
import { TracksModule } from 'src/tracks/tracks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Favorite]),
    ArtistsModule,
    AlbumsModule,
    TracksModule,
  ],
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    FavoritesRepository,
    FavoritesArtistsService,
    FavoritesAlbumsService,
    FavoritesTracksService,
  ],
})
export class FavoritesModule {}
