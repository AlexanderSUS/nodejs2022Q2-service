import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';
import parseUuidOptions from 'src/const/uuid';
import { Track } from 'src/tracks/entities/track.entity';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}
  @Post('track/:id')
  @ApiCreatedResponse({
    description: 'Artist was created successfully',
    type: Track,
  })
  addTrack(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    return this.favoritesService.addTrack(id);
  }

  @Post('album/:id')
  @ApiCreatedResponse({
    description: 'Artist was created successfully',
    type: Album,
  })
  addAlbum(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    return this.favoritesService.addAlbum(id);
  }

  @Post('artist/:id')
  @ApiCreatedResponse({
    description: 'Artist was created successfully',
    type: Artist,
  })
  addArtist(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    return this.favoritesService.addArtist(id);
  }

  @Get()
  @ApiOkResponse({ description: 'Return Favorites object' })
  findAll() {
    return this.favoritesService.findAll();
  }

  @Delete('artist/:id')
  @ApiNoContentResponse({ description: 'Artist was removed from favorites' })
  @ApiNotFoundResponse({ description: 'Artist does not exits in favorites' })
  @ApiBadRequestResponse({ description: 'Invalid Artist ID' })
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    return this.favoritesService.removeArtist(id);
  }

  @Delete('album/:id')
  @ApiNoContentResponse({ description: 'Album was removed from favorites' })
  @ApiNotFoundResponse({ description: 'Album does not exits in favorites' })
  @ApiBadRequestResponse({ description: 'Invalid Album ID' })
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    return this.favoritesService.removeAlbum(id);
  }

  @Delete('track/:id')
  @ApiNoContentResponse({ description: 'Artist was removed from favorites' })
  @ApiNotFoundResponse({ description: 'Artist does not exits in favorites' })
  @ApiBadRequestResponse({ description: 'Invalid Artist ID' })
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    return this.favoritesService.removeTrack(id);
  }
}
