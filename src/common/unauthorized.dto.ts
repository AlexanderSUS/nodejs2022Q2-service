import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedDto {
  @ApiProperty({ example: 401 })
  statusCode: number;

  @ApiProperty({ example: '2023-06-19T23:16:22.799Z' })
  timestamp: string;

  @ApiProperty({ example: '/auth/login' })
  path: string;

  @ApiProperty({ example: 'Unauthorized' })
  message: string;
}
