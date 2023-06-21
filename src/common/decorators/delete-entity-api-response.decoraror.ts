import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiResponseMetadata,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BadRequestDto } from '../dto/bad-request.dto';
import { UnauthorizedDto } from '../dto/unauthorized.dto';
import { NotFoundDto } from '../dto/not-found.dto';

type DeleteEntityApiResponseProps = {
  successResponseType: ApiResponseMetadata['type'];
  successDescription: string;
  badRequestDescription: string;
  unauthorizedDescription: string;
  notFoundDescription: string;
};

export function DeleteEntityApiResponse({
  successResponseType,
  successDescription,
  badRequestDescription,
  unauthorizedDescription,
  notFoundDescription,
}: DeleteEntityApiResponseProps) {
  return applyDecorators(
    ApiNoContentResponse({
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
