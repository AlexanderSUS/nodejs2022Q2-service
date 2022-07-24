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
  // constructor(private readonly favouritesService: FavouritesService) {}
  // @Post('track/:id')
  // @ApiCreatedResponse({
  //   description: 'Aritst was created succesfully',
  //   type: TrackEntity,
  // })
  // addTrack(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
  //   return this.favouritesService.addTrack(id);
  // }
  // @Post('album/:id')
  // @ApiCreatedResponse({
  //   description: 'Aritst was created succesfully',
  //   type: AlbumEntity,
  // })
  // addAlbum(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
  //   return this.favouritesService.addAlbum(id);
  // }
  // @Post('artist/:id')
  // @ApiCreatedResponse({
  //   description: 'Aritst was created succesfully',
  //   type: ArtistEntity,
  // })
  // addArtist(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
  //   return this.favouritesService.addArtist(id);
  // }
  // @Get()
  // @ApiOkResponse({ description: 'Return Favourites object' })
  // findAll() {
  //   return this.favouritesService.findAll();
  // }
  // @Delete('artist/:id')
  // @ApiNoContentResponse({ description: 'Aritst was removed from favourites' })
  // @ApiNotFoundResponse({ description: 'Aritst does not exits in favourtes' })
  // @ApiBadRequestResponse({ description: 'Invalid Aritst ID' })
  // @HttpCode(HttpStatus.NO_CONTENT)
  // removeAritst(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
  //   return this.favouritesService.remove(id, DbStoreKey.artists);
  // }
  // @Delete('album/:id')
  // @ApiNoContentResponse({ description: 'Album was removed from favourites' })
  // @ApiNotFoundResponse({ description: 'Album does not exits in favourtes' })
  // @ApiBadRequestResponse({ description: 'Invalid Album ID' })
  // @HttpCode(HttpStatus.NO_CONTENT)
  // removeAlbum(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
  //   return this.favouritesService.remove(id, DbStoreKey.albums);
  // }
  // @Delete('track/:id')
  // @ApiNoContentResponse({ description: 'Aritst was removed from favourites' })
  // @ApiNotFoundResponse({ description: 'Aritst does not exits in favourtes' })
  // @ApiBadRequestResponse({ description: 'Invalid Aritst ID' })
  // @HttpCode(HttpStatus.NO_CONTENT)
  // removeTrack(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
  //   return this.favouritesService.remove(id, DbStoreKey.tracks);
  // }
}
