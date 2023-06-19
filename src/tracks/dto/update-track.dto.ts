import { IsNumber, IsString, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsUUID('4')
  @IsOptional()
  artistId: string | null;

  @ApiProperty()
  @IsUUID('4')
  @IsOptional()
  albumId: string | null;

  @ApiProperty()
  @IsNumber()
  duration: number;
}
