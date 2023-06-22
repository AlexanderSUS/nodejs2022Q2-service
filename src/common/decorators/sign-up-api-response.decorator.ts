import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiResponseMetadata,
} from '@nestjs/swagger';
import { BadRequestDto } from '../dto/bad-request.dto';

type SignUpApiResponseProps = {
  successResponseType: ApiResponseMetadata['type'];
  successDescription: string;
  badRequestDescription: string;
};

export function SignUpApiResponse({
  successResponseType,
  successDescription,
  badRequestDescription,
}: SignUpApiResponseProps) {
  return applyDecorators(
    ApiCreatedResponse({
      description: successDescription,
      type: successResponseType,
    }),
    ApiBadRequestResponse({
      description: badRequestDescription,
      type: BadRequestDto,
    }),
  );
}
