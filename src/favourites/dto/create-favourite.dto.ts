import { IsArray, IsOptional, IsUUID } from 'class-validator';

export class CreateFavouriteDto {
  @IsOptional()
  @IsArray()
  @IsUUID('4', {
    each: true,
  })
  artists: string[];

  @IsOptional()
  @IsArray()
  @IsUUID('4', {
    each: true,
  })
  albums: string[];

  @IsOptional()
  @IsArray()
  @IsUUID('4', {
    each: true,
  })
  tracks: string[];
}
