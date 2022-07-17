import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import parseUuidOptions from 'src/const/uuid';
import { DbStoreKey } from '../const/enum';

@Controller('favs')
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}

  @Post('track/:id')
  addTrack(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    return this.favouritesService.addTrack(id);
  }

  @Post('album/:id')
  addAlbum(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    return this.favouritesService.addAlbum(id);
  }

  @Post('artist/:id')
  addArtist(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    return this.favouritesService.addArtist(id);
  }

  @Get()
  findAll() {
    return this.favouritesService.findAll();
  }

  @Delete('artist/:id')
  removeAritst(@Param('id') id: string) {
    return this.favouritesService.remove(id, DbStoreKey.artists);
  }

  @Delete('album/:id')
  removeAlbum(@Param('id') id: string) {
    return this.favouritesService.remove(id, DbStoreKey.albums);
  }

  @Delete('track/:id')
  removeTrack(@Param('id') id: string) {
    return this.favouritesService.remove(id, DbStoreKey.tracks);
  }
}
