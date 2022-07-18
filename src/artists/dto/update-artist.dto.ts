import { PartialType } from '@nestjs/mapped-types';
import { CreateArtistDto } from './create-artist.dto';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: Boolean,
  })
  @IsBoolean()
  grammy: boolean;
}
