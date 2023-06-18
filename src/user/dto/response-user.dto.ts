import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({ example: '8daf3338-1fc6-4c09-9b1b-7a3aa9a49093' })
  id: string;

  @ApiProperty({ example: 'John1984' })
  login: string;

  @ApiProperty({ example: 1 })
  version: number;

  @ApiProperty({ example: 1687121284058 })
  createdAt: number;

  @ApiProperty({ example: 1687121284058 })
  updatedAt: number;
}
