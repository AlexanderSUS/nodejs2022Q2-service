import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { TracksModule } from './tracks/tracks.module';
import { DbModule } from './db/db.module';
import { FavouritesModule } from './favourites/favourites.module';

@Module({
  imports: [
    UserModule,
    ArtistsModule,
    AlbumsModule,
    TracksModule,
    FavouritesModule,
    DbModule,
  ],
})
export class AppModule {}
