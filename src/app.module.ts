import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';

@Module({
  imports: [UserModule, ArtistsModule, AlbumsModule],
})
export class AppModule {}
