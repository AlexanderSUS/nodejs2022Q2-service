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
} from '@nestjs/swagger';
import parseUuidOptions from 'src/const/uuid';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Artist was created succesfully',
    type: ArtistEntity,
  })
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Return Artist array or emty array',
    type: Array<ArtistEntity>,
  })
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Return Artist by ID', type: ArtistEntity })
  @ApiNotFoundResponse({ description: 'Artist does not exits' })
  @ApiBadRequestResponse({ description: 'Invalid Artist ID' })
  findOne(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    return this.artistsService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Update Artist and return this Artist',
    type: ArtistEntity,
  })
  @ApiNotFoundResponse({ description: 'Artist does not exits' })
  @ApiBadRequestResponse({ description: 'Invalid Artist ID' })
  update(
    @Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @ApiNoContentResponse({ description: 'Artist was removed' })
  @ApiNotFoundResponse({ description: 'Artist does not exits' })
  @ApiBadRequestResponse({ description: 'Invalid Artist ID' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    return this.artistsService.remove(id);
  }
}
