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
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';
import parseUuidOptions from 'src/const/uuid';
import { FavoriteResponseDto } from './dto/favorite-response.dto';
import { NotFoundDto } from 'src/common/not-found.dto';
import { BadRequestDto } from 'src/common/bad-request.dto';
import { UnauthorizedDto } from 'src/common/unauthorized.dto';

@ApiTags('favs')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}
  @Post('track/:id')
  @ApiCreatedResponse({
    description: 'Artist was created successfully',
    type: FavoriteResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Refresh token is invalid or expired',
    type: UnauthorizedDto,
  })
  addTrack(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    return this.favoritesService.addTrack(id);
  }

  @Post('album/:id')
  @ApiCreatedResponse({
    description: 'Artist was created successfully',
    type: FavoriteResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Refresh token is invalid or expired',
    type: UnauthorizedDto,
  })
  addAlbum(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    return this.favoritesService.addAlbum(id);
  }

  @Post('artist/:id')
  @ApiCreatedResponse({
    description: 'Artist was created successfully',
    type: FavoriteResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Refresh token is invalid or expired',
    type: UnauthorizedDto,
  })
  addArtist(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    return this.favoritesService.addArtist(id);
  }

  @Get()
  @ApiOkResponse({
    description: 'Return Favorites object',
    type: FavoriteResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Refresh token is invalid or expired',
    type: UnauthorizedDto,
  })
  findAll() {
    return this.favoritesService.findAll();
  }

  @Delete('artist/:id')
  @ApiNoContentResponse({ description: 'Artist was removed from favorites' })
  @ApiBadRequestResponse({
    description: 'Invalid Artist ID',
    type: BadRequestDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Refresh token is invalid or expired',
    type: UnauthorizedDto,
  })
  @ApiNotFoundResponse({
    description: 'Artist does not exits in favorites',
    type: NotFoundDto,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtist(
    @Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string,
  ) {
    await this.favoritesService.removeArtist(id);
  }

  @Delete('album/:id')
  @ApiNoContentResponse({ description: 'Album was removed from favorites' })
  @ApiBadRequestResponse({
    description: 'Invalid Album ID',
    type: BadRequestDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Refresh token is invalid or expired',
    type: UnauthorizedDto,
  })
  @ApiNotFoundResponse({
    description: 'Album does not exits in favorites',
    type: NotFoundDto,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbum(
    @Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string,
  ) {
    await this.favoritesService.removeAlbum(id);
  }

  @Delete('track/:id')
  @ApiNoContentResponse({ description: 'Artist was removed from favorites' })
  @ApiBadRequestResponse({
    description: 'Invalid Artist ID',
    type: BadRequestDto,
  })
  @ApiNotFoundResponse({
    description: 'Artist does not exits in favorites',
    type: NotFoundDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Refresh token is invalid or expired',
    type: UnauthorizedDto,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrack(
    @Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string,
  ) {
    await this.favoritesService.removeTrack(id);
  }
}
