import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  year: number;

  @ApiProperty()
  @IsOptional()
  @IsUUID('4')
  artistId: string | null; // refers to Artist
}
