import { IsNumber, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  // TODO add validation
  artistId: string | null; // refers to Artist
}
