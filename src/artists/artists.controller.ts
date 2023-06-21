import {
  Controller,
  Get,
  Post,
  Body,
  Put,
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
import parseUuidOptions from 'src/const/uuid';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistsResponseDto } from './dto/artist-response.dto';
import { NotFoundDto } from 'src/common/not-found.dto';
import { BadRequestDto } from 'src/common/bad-request.dto';
import { UnauthorizedDto } from 'src/common/unauthorized.dto';

@ApiTags('artist')
@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Artist was created successfully',
    type: ArtistsResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Refresh token is invalid or expired',
    type: UnauthorizedDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid Album ID',
    type: BadRequestDto,
  })
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Return Artist array or empty array',
    type: [ArtistsResponseDto],
  })
  @ApiUnauthorizedResponse({
    description: 'Refresh token is invalid or expired',
    type: UnauthorizedDto,
  })
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Return Artist by ID',
    type: ArtistsResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Refresh token is invalid or expired',
    type: UnauthorizedDto,
  })
  @ApiNotFoundResponse({
    description: 'Artist does not exits',
    type: NotFoundDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid Artist ID',
    type: BadRequestDto,
  })
  findOne(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    return this.artistsService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Update Artist and return this Artist',
    type: ArtistsResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid Artist ID',
    type: BadRequestDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Refresh token is invalid or expired',
    type: UnauthorizedDto,
  })
  @ApiNotFoundResponse({
    description: 'Artist does not exits',
    type: NotFoundDto,
  })
  update(
    @Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @ApiNoContentResponse({ description: 'Artist was removed' })
  @ApiBadRequestResponse({
    description: 'Invalid Artist ID',
    type: BadRequestDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Refresh token is invalid or expired',
    type: UnauthorizedDto,
  })
  @ApiNotFoundResponse({
    description: 'Artist does not exits',
    type: NotFoundDto,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    return this.artistsService.remove(id);
  }
}
