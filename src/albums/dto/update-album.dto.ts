import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID, IsOptional } from 'class-validator';

export class UpdateAlbumDto {
  @ApiProperty({ example: 'To live is to die' })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ example: 1988 })
  @IsNumber()
  @IsOptional()
  year: number;

  @ApiProperty({ example: '1678e952-da14-4bfe-b11b-101e6e1c646f' })
  @IsUUID('4')
  @IsOptional()
  artistId: string;
}
