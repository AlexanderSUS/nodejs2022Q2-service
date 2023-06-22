import { ApiProperty } from '@nestjs/swagger';

export class SignUpResponseDto {
  @ApiProperty({ example: 'User was successfully created' })
  message: string;
}
