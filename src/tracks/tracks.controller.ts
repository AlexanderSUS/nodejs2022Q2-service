import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import parseUuidOptions from 'src/const/uuid';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    return this.tracksService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    return this.tracksService.remove(id);
  }
}
