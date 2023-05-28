import { IsNumber, IsString, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
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
