import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumResponseDto {
  @ApiProperty({ example: 'a7d2464c-430e-4bc5-a611-bc05535a47c5' })
  id: string;

  @ApiProperty({ example: 'To live is to die' })
  name: string;

  @ApiProperty({ example: 1988 })
  year: number;

  @ApiProperty({ example: '1678e952-da14-4bfe-b11b-101e6e1c646f' })
  artistId: string;
}
