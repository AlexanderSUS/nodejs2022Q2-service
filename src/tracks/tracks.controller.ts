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
} from '@nestjs/swagger';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import parseUuidOptions from 'src/const/uuid';
import { TrackEntity } from './entities/track.entity';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Aritst was created succesfully',
    type: TrackEntity,
  })
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Return Aritst array or emty array',
    type: Array<TrackEntity>,
  })
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Return Aritst by ID', type: TrackEntity })
  @ApiNotFoundResponse({ description: 'Aritst does not exits' })
  @ApiBadRequestResponse({ description: 'Invalid Aritst ID' })
  findOne(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    return this.tracksService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Update Aritst and return this Aritst',
    type: TrackEntity,
  })
  @ApiNotFoundResponse({ description: 'Aritst does not exits' })
  @ApiBadRequestResponse({ description: 'Invalid Aritst ID' })
  update(
    @Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @ApiNoContentResponse({ description: 'Aritst was removed' })
  @ApiNotFoundResponse({ description: 'Aritst does not exits' })
  @ApiBadRequestResponse({ description: 'Invalid Aritst ID' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    return this.tracksService.remove(id);
  }
}
