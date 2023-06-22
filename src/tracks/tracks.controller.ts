import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import parseUuidOptions from 'src/const/uuid';
import { TrackResponseDto } from './dto/track-response.dto';
import { CreateEntityApiResponse } from 'src/common/decorators/create-entity-api-response.decorator';
import { GetAllApiResponse } from 'src/common/decorators/get-all-api-response.decorator';
import { GetByIdApiResponse } from 'src/common/decorators/get-by-id-api-response.decorator';
import { UpdateEntityApiResponse } from 'src/common/decorators/update-entity-api-response.decorator';
import { DeleteEntityApiResponse } from 'src/common/decorators/delete-entity-api-response.decorator';

@ApiTags('track')
@ApiBearerAuth()
@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @CreateEntityApiResponse({
    successResponseType: TrackResponseDto,
    successDescription: 'Track was created successfully',
    badRequestDescription: 'Invalid Artist ID',
    unauthorizedDescription: 'Refresh token is invalid or expired',
  })
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Get()
  @GetAllApiResponse({
    successResponseType: [TrackResponseDto],
    successDescription: 'Return tracks array or empty array',
    unauthorizedDescription: 'Refresh token is invalid or expired',
  })
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  @GetByIdApiResponse({
    successResponseType: TrackResponseDto,
    successDescription: 'Return tracks by ID',
    badRequestDescription: 'Invalid favorite ID',
    unauthorizedDescription: 'Refresh token is invalid or expired',
    notFoundDescription: 'Favorite does not exits',
  })
  findOne(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    return this.tracksService.findOne(id);
  }

  @Put(':id')
  @UpdateEntityApiResponse({
    successResponseType: TrackResponseDto,
    successDescription: 'Update track and return this Album',
    badRequestDescription: 'Invalid album ID',
    unauthorizedDescription: 'Refresh token is invalid or expired',
    notFoundDescription: 'Track does not exits',
  })
  update(
    @Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @DeleteEntityApiResponse({
    successDescription: 'Delete track',
    badRequestDescription: 'Invalid track ID',
    unauthorizedDescription: 'Refresh token is invalid or expired',
    notFoundDescription: 'Track does not exits',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    return this.tracksService.remove(id);
  }
}
