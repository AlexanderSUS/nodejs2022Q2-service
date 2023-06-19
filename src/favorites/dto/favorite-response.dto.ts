import { ApiProperty } from '@nestjs/swagger';
import { CreateAlbumResponseDto } from 'src/albums/dto/create-album-response.dto';
import { ArtistsResponseDto } from 'src/artists/dto/artist-response.dto';
import { TrackResponseDto } from 'src/tracks/dto/track-response.dto';

export class FavoriteResponseDto {
  @ApiProperty({ example: 'a3dccf14-e9e9-4856-aad9-13b9a53919dd' })
  id: string;

  @ApiProperty({ type: [CreateAlbumResponseDto] })
  albums: CreateAlbumResponseDto[];

  @ApiProperty({ type: [ArtistsResponseDto] })
  artists: ArtistsResponseDto[];

  @ApiProperty({ type: [TrackResponseDto] })
  tracks: TrackResponseDto[];
}
