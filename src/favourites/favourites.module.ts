import { Module } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { FavouritesController } from './favourites.controller';

@Module({
  imports: [],
  controllers: [FavouritesController],
  providers: [FavouritesService],
})
export class FavouritesModule {}
