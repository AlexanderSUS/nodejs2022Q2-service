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
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';
import parseUuidOptions from 'src/const/uuid';
import { FavoriteResponseDto } from './dto/favorite-response.dto';
import { NotFoundDto } from 'src/common/dto/not-found.dto';
import { BadRequestDto } from 'src/common/dto//bad-request.dto';
import { UnauthorizedDto } from 'src/common/dto/unauthorized.dto';
import { GetAllApiResponse } from 'src/common/decorators/get-all-api-response.decorator';
import { UpdateEntityApiResponse } from 'src/common/decorators/update-entity-api-response.decorator';
import { DeleteEntityApiResponse } from 'src/common/decorators/delete-entity-api-response.decorator';

@ApiTags('favs')
@ApiBearerAuth()
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}
  @Post('track/:id')
  @UpdateEntityApiResponse({
    successResponseType: FavoriteResponseDto,
    successDescription: 'Track was added to favorite successfully',
    badRequestDescription: 'Invalid track ID',
    unauthorizedDescription: 'Refresh token is invalid or expired',
    notFoundDescription: 'Track does not exist',
  })
  addTrack(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    return this.favoritesService.addTrack(id);
  }

  @Post('album/:id')
  @UpdateEntityApiResponse({
    successResponseType: FavoriteResponseDto,
    successDescription: 'Album was added to favorite successfully',
    badRequestDescription: 'Invalid album ID',
    unauthorizedDescription: 'Refresh token is invalid or expired',
    notFoundDescription: 'Album does not exist',
  })
  addAlbum(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    return this.favoritesService.addAlbum(id);
  }

  @Post('artist/:id')
  @UpdateEntityApiResponse({
    successResponseType: FavoriteResponseDto,
    successDescription: 'Artist was added to favorite successfully',
    badRequestDescription: 'Invalid artist ID',
    unauthorizedDescription: 'Refresh token is invalid or expired',
    notFoundDescription: 'Artists does not exist',
  })
  addArtist(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    return this.favoritesService.addArtist(id);
  }

  @Get()
  @GetAllApiResponse({
    successResponseType: FavoriteResponseDto,
    successDescription: 'Return favorites',
    unauthorizedDescription: 'Refresh token is invalid or expired',
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
  @DeleteEntityApiResponse({
    successDescription: 'Album was successfully deleted from favorites',
    badRequestDescription: 'Invalid album ID',
    unauthorizedDescription: 'Refresh token is invalid or expired',
    notFoundDescription: 'Album does not present in favorites',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbum(
    @Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string,
  ) {
    await this.favoritesService.removeAlbum(id);
  }

  @Delete('track/:id')
  @DeleteEntityApiResponse({
    successDescription: 'Track was successfully deleted from favorites',
    badRequestDescription: 'Invalid track ID',
    unauthorizedDescription: 'Refresh token is invalid or expired',
    notFoundDescription: 'Track does not present in favorites',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrack(
    @Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string,
  ) {
    await this.favoritesService.removeTrack(id);
  }
}
