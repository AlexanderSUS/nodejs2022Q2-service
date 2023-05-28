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
import { FavouritesService } from './favourites.service';
import parseUuidOptions from 'src/const/uuid';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artists/entities/artist.entity';

@Controller('favs')
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}
  @Post('track/:id')
  @ApiCreatedResponse({
    description: 'Artist was created succesfully',
    type: TrackEntity,
  })
  addTrack(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    return this.favouritesService.addTrack(id);
  }

  @Post('album/:id')
  @ApiCreatedResponse({
    description: 'Artist was created succesfully',
    type: AlbumEntity,
  })
  addAlbum(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    return this.favouritesService.addAlbum(id);
  }

  @Post('artist/:id')
  @ApiCreatedResponse({
    description: 'Artist was created succesfully',
    type: ArtistEntity,
  })
  addArtist(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    return this.favouritesService.addArtist(id);
  }

  @Get()
  @ApiOkResponse({ description: 'Return Favourites object' })
  findAll() {
    return this.favouritesService.findAll();
  }

  @Delete('artist/:id')
  @ApiNoContentResponse({ description: 'Artist was removed from favourites' })
  @ApiNotFoundResponse({ description: 'Artist does not exits in favourtes' })
  @ApiBadRequestResponse({ description: 'Invalid Artist ID' })
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    return this.favouritesService.removeArtist(id);
  }

  @Delete('album/:id')
  @ApiNoContentResponse({ description: 'Album was removed from favourites' })
  @ApiNotFoundResponse({ description: 'Album does not exits in favourtes' })
  @ApiBadRequestResponse({ description: 'Invalid Album ID' })
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    return this.favouritesService.removeAlbum(id);
  }

  @Delete('track/:id')
  @ApiNoContentResponse({ description: 'Artist was removed from favourites' })
  @ApiNotFoundResponse({ description: 'Artist does not exits in favourtes' })
  @ApiBadRequestResponse({ description: 'Invalid Artist ID' })
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    return this.favouritesService.removeTrack(id);
  }
}
