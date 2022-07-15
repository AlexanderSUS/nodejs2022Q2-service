import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ArtistsModule } from './artists/artists.module';

@Module({
  imports: [UserModule, ArtistsModule],
})
export class AppModule {}
