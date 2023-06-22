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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import parseUuidOptions from 'src/const/uuid';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { CreateAlbumResponseDto } from './dto/create-album-response.dto';
import { CreateEntityApiResponse } from 'src/common/decorators/create-entity-api-response.decorator';
import { GetAllApiResponse } from 'src/common/decorators/get-all-api-response.decorator';
import { GetByIdApiResponse } from 'src/common/decorators/get-by-id-api-response.decorator';
import { UpdateEntityApiResponse } from 'src/common/decorators/update-entity-api-response.decorator';
import { DeleteEntityApiResponse } from 'src/common/decorators/delete-entity-api-response.decorator';

@ApiTags('album')
@ApiBearerAuth()
@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  @CreateEntityApiResponse({
    successResponseType: CreateAlbumResponseDto,
    successDescription: 'Album was created successfully',
    badRequestDescription: 'Invalid Artist ID',
    unauthorizedDescription: 'Refresh token is invalid or expired',
  })
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  @GetAllApiResponse({
    successResponseType: [CreateAlbumResponseDto],
    successDescription: 'Return Album array or empty array',
    unauthorizedDescription: 'Refresh token is invalid or expired',
  })
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  @GetByIdApiResponse({
    successResponseType: CreateAlbumResponseDto,
    successDescription: 'Return Album by ID',
    badRequestDescription: 'Invalid Album ID',
    unauthorizedDescription: 'Refresh token is invalid or expired',
    notFoundDescription: 'Album does not exits',
  })
  findOne(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    return this.albumsService.findOne(id);
  }

  @Put(':id')
  @UpdateEntityApiResponse({
    successResponseType: CreateAlbumResponseDto,
    successDescription: 'Update Album and return this Album',
    badRequestDescription: 'Invalid album ID',
    unauthorizedDescription: 'Refresh token is invalid or expired',
    notFoundDescription: 'Album does not exits',
  })
  update(
    @Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @DeleteEntityApiResponse({
    successDescription: 'Delete album',
    badRequestDescription: 'Invalid album ID',
    unauthorizedDescription: 'Refresh token is invalid or expired',
    notFoundDescription: 'Album does not exits',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    return this.albumsService.remove(id);
  }
}
