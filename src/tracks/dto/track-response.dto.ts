import { ApiProperty } from '@nestjs/swagger';

export class TrackResponseDto {
  @ApiProperty({ example: '' })
  id: string;

  @ApiProperty({ example: '57c4a84f-fcfb-48fd-81b7-510831898202u' })
  artistId: string;

  @ApiProperty({ example: '11a74d33-9d14-4ddf-9f7e-5f90910d680c' })
  albumId: string;

  @ApiProperty({ example: 9.49 })
  duration: number;
}
