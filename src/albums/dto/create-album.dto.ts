import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
  @ApiProperty({ example: '...And Justice for All' })
  @IsString()
  name: string;

  @ApiProperty({ example: 1988 })
  @IsNumber()
  year: number;

  @ApiProperty({ example: '1678e952-da14-4bfe-b11b-101e6e1c646f' })
  @IsOptional()
  @IsUUID('4')
  artistId: string;
}
