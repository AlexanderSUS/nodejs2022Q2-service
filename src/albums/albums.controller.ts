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
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { NotFoundDto } from 'src/common/not-found.dto';
import { BadRequestDto } from 'src/common/bad-request.dto';
import { CreateAlbumResponseDto } from './dto/create-album-response.dto';
import { UnauthorizedDto } from 'src/common/unauthorized.dto';

@ApiTags('album')
@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Album was created successfully',
    type: CreateAlbumResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid Artist ID',
    type: BadRequestDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Refresh token is invalid or expired',
    type: UnauthorizedDto,
  })
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Return Album array or empty array',
    type: [CreateAlbumResponseDto],
  })
  @ApiUnauthorizedResponse({
    description: 'Refresh token is invalid or expired',
    type: UnauthorizedDto,
  })
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Return Album by ID',
    type: CreateAlbumResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Album does not exits',
    type: NotFoundDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Refresh token is invalid or expired',
    type: UnauthorizedDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid Album ID',
    type: BadRequestDto,
  })
  findOne(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    return this.albumsService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Update Album and return this Album',
    type: CreateAlbumResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Album does not exits',
    type: NotFoundDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Refresh token is invalid or expired',
    type: UnauthorizedDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid Album ID',
    type: BadRequestDto,
  })
  update(
    @Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @ApiNoContentResponse({ description: 'Album was removed' })
  @ApiNotFoundResponse({
    description: 'Album does not exits',
    type: NotFoundDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Refresh token is invalid or expired',
    type: UnauthorizedDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid Album ID',
    type: BadRequestDto,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    return this.albumsService.remove(id);
  }
}
