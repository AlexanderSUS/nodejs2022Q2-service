import { ApiProperty } from '@nestjs/swagger';

export class ArtistsResponseDto {
  @ApiProperty({ example: '8daf3338-1fc6-4c09-9b1b-7a3aa9a49093' })
  id: string;

  @ApiProperty({ example: 'James Hetfield' })
  name: string;

  @ApiProperty({ example: false })
  grammy: boolean;
}
