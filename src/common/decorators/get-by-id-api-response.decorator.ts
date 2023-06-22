import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponseMetadata,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BadRequestDto } from '../dto/bad-request.dto';
import { UnauthorizedDto } from '../dto/unauthorized.dto';
import { NotFoundDto } from '../dto/not-found.dto';

type GetByIdApiResponseProps = {
  successResponseType: ApiResponseMetadata['type'];
  successDescription: string;
  badRequestDescription: string;
  unauthorizedDescription: string;
  notFoundDescription: string;
};

export function GetByIdApiResponse({
  successResponseType,
  successDescription,
  badRequestDescription,
  unauthorizedDescription,
  notFoundDescription,
}: GetByIdApiResponseProps) {
  return applyDecorators(
    ApiOkResponse({
      description: successDescription,
      type: successResponseType,
    }),
    ApiBadRequestResponse({
      description: badRequestDescription,
      type: BadRequestDto,
    }),
    ApiUnauthorizedResponse({
      description: unauthorizedDescription,
      type: UnauthorizedDto,
    }),
    ApiNotFoundResponse({
      description: notFoundDescription,
      type: NotFoundDto,
    }),
  );
}
