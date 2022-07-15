import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { TracksModule } from './tracks/tracks.module';

@Module({
  imports: [UserModule, ArtistsModule, AlbumsModule, TracksModule],
})
export class AppModule {}
