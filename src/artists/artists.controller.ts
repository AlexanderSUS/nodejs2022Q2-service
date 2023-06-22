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
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { CreateEntityApiResponse } from 'src/common/decorators/create-entity-api-response.decorator';
import { GetAllApiResponse } from 'src/common/decorators/get-all-api-response.decorator';
import { GetByIdApiResponse } from 'src/common/decorators/get-by-id-api-response.decorator';
import { UpdateEntityApiResponse } from 'src/common/decorators/update-entity-api-response.decorator';
import { DeleteEntityApiResponse } from 'src/common/decorators/delete-entity-api-response.decorator';

@ApiTags('artist')
@ApiBearerAuth()
@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @CreateEntityApiResponse({
    successResponseType: CreateArtistDto,
    successDescription: 'Artist was created successfully',
    badRequestDescription: 'Reason',
    unauthorizedDescription: 'Refresh token is invalid or expired',
  })
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Get()
  @GetAllApiResponse({
    successResponseType: [CreateArtistDto],
    successDescription: 'Return artist array or empty array',
    unauthorizedDescription: 'Refresh token is invalid or expired',
  })
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  @GetByIdApiResponse({
    successResponseType: CreateArtistDto,
    successDescription: 'Return artist by ID',
    badRequestDescription: 'Invalid artist ID',
    unauthorizedDescription: 'Refresh token is invalid or expired',
    notFoundDescription: 'Artist does not exits',
  })
  findOne(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    return this.artistsService.findOne(id);
  }

  @Put(':id')
  @UpdateEntityApiResponse({
    successResponseType: CreateArtistDto,
    successDescription: 'Update artist and return this Album',
    badRequestDescription: 'Invalid artist ID',
    unauthorizedDescription: 'Refresh token is invalid or expired',
    notFoundDescription: 'Artist does not exits',
  })
  update(
    @Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @DeleteEntityApiResponse({
    successDescription: 'Artist was successfully deleted',
    badRequestDescription: 'Invalid artist ID',
    unauthorizedDescription: 'Refresh token is invalid or expired',
    notFoundDescription: 'Artist does not exits',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    return this.artistsService.remove(id);
  }
}
