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
import {
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import parseUuidOptions from 'src/const/uuid';
import { TrackResponseDto } from './dto/track-response.dto';
import { NotFoundDto } from 'src/common/not-found.dto';
import { BadRequestDto } from 'src/common/bad-request.dto';
import { UnauthorizedDto } from 'src/common/unauthorized.dto';

@ApiTags('track')
@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Artist was created successfully',
    type: TrackResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Refresh token is invalid or expired',
    type: UnauthorizedDto,
  })
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Return Artist array or empty array',
    type: [TrackResponseDto],
  })
  @ApiUnauthorizedResponse({
    description: 'Refresh token is invalid or expired',
    type: UnauthorizedDto,
  })
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Return Artist by ID', type: TrackResponseDto })
  @ApiUnauthorizedResponse({
    description: 'Refresh token is invalid or expired',
    type: UnauthorizedDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid Artist ID',
    type: BadRequestDto,
  })
  @ApiNotFoundResponse({
    description: 'Artist does not exits',
    type: NotFoundDto,
  })
  findOne(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    return this.tracksService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Update Artist and return this Artist',
    type: TrackResponseDto,
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
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.tracksService.update(id, updateTrackDto);
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
    return this.tracksService.remove(id);
  }
}
