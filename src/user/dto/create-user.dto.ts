import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John1984' })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ example: 'test1234' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
