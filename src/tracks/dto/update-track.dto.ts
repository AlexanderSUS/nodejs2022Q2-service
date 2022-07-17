import { IsNumber, IsString, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID('4')
  artistId: string | null; // refers to Artist

  @ApiProperty()
  @IsOptional()
  @IsUUID('4')
  albumId: string | null; // refers to Album

  @ApiProperty()
  @IsNumber()
  duration: number; // integer number
}
