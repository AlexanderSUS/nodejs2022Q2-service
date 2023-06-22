import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BadRequestDto } from '../dto/bad-request.dto';
import { UnauthorizedDto } from '../dto/unauthorized.dto';
import { NotFoundDto } from '../dto/not-found.dto';

type DeleteEntityApiResponseProps = {
  successDescription: string;
  badRequestDescription: string;
  unauthorizedDescription: string;
  notFoundDescription: string;
};

export function DeleteEntityApiResponse({
  successDescription,
  badRequestDescription,
  unauthorizedDescription,
  notFoundDescription,
}: DeleteEntityApiResponseProps) {
  return applyDecorators(
    ApiNoContentResponse({
      description: successDescription,
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
