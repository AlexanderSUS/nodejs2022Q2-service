import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly oldPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly newPassword: string;
}
