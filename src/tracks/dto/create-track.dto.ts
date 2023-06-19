import { IsNumber, IsString, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @ApiProperty({ example: 'To Live Is to Die' })
  @IsString()
  name: string;

  @ApiProperty({ example: '57c4a84f-fcfb-48fd-81b7-510831898202u' })
  @IsUUID('4')
  @IsOptional()
  artistId: string | null;

  @ApiProperty({ example: '11a74d33-9d14-4ddf-9f7e-5f90910d680c' })
  @IsUUID('4')
  @IsOptional()
  albumId: string | null;

  @ApiProperty({ example: 9.49 })
  @IsNumber()
  duration: number;
}
