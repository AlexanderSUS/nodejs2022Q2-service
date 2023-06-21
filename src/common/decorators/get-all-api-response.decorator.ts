import { applyDecorators } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiResponseMetadata,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UnauthorizedDto } from '../dto/unauthorized.dto';

type GetAllApiResponseProps = {
  successResponseType: ApiResponseMetadata['type'];
  successDescription: string;
  unauthorizedDescription: string;
};

export function GetAllApiResponse({
  successResponseType,
  successDescription,
  unauthorizedDescription,
}: GetAllApiResponseProps) {
  return applyDecorators(
    ApiOkResponse({
      description: successDescription,
      type: successResponseType,
    }),
    ApiUnauthorizedResponse({
      description: unauthorizedDescription,
      type: UnauthorizedDto,
    }),
  );
}
