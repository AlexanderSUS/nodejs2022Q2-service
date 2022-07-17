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
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Album was created succesfully',
    type: AlbumEntity,
  })
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Return Album array or emty array',
    type: Array<AlbumEntity>,
  })
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Return Album by ID', type: AlbumEntity })
  @ApiNotFoundResponse({ description: 'Album does not exits' })
  @ApiBadRequestResponse({ description: 'Invalid Album ID' })
  findOne(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    return this.albumsService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Update Album and return this Album',
    type: AlbumEntity,
  })
  @ApiNotFoundResponse({ description: 'Album does not exits' })
  @ApiBadRequestResponse({ description: 'Invalid Album ID' })
  update(
    @Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @ApiNoContentResponse({ description: 'Album was removed' })
  @ApiNotFoundResponse({ description: 'Album does not exits' })
  @ApiBadRequestResponse({ description: 'Invalid Album ID' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    return this.albumsService.remove(id);
  }
}
