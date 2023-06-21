import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiResponseMetadata,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BadRequestDto } from '../dto/bad-request.dto';
import { UnauthorizedDto } from '../dto/unauthorized.dto';

type CreateEntityApiResponseProps = {
  successResponseType: ApiResponseMetadata['type'];
  successDescription: string;
  badRequestDescription: string;
  unauthorizedDescription: string;
};

export function CreateEntityApiResponse({
  successResponseType,
  successDescription,
  badRequestDescription,
  unauthorizedDescription,
}: CreateEntityApiResponseProps) {
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
  );
}
