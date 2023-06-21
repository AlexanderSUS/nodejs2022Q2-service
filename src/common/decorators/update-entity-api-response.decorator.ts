import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiResponseMetadata,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BadRequestDto } from '../dto/bad-request.dto';
import { UnauthorizedDto } from '../dto/unauthorized.dto';
import { NotFoundDto } from '../dto/not-found.dto';

type UpdateEntityApiResponseProps = {
  successResponseType: ApiResponseMetadata['type'];
  successDescription: string;
  badRequestDescription: string;
  unauthorizedDescription: string;
  notFoundDescription: string;
};

export function UpdateEntityApiResponse({
  successResponseType,
  successDescription,
  badRequestDescription,
  unauthorizedDescription,
  notFoundDescription,
}: UpdateEntityApiResponseProps) {
  return applyDecorators(
    ApiCreatedResponse({
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
