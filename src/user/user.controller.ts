import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Body,
  ParseUUIDPipe,
  HttpStatus,
  HttpCode,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import parseUuidOptions from 'src/const/uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponse } from './dto/user-response.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { plainToInstance } from 'class-transformer';
import { User } from './entities/user.entity';
import { NotFoundDto } from 'src/common/dto/not-found.dto';
import { BadRequestDto } from 'src/common/dto//bad-request.dto';
import { UnauthorizedDto } from 'src/common/dto/unauthorized.dto';

@ApiTags('user')
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'User was created successfully',
    type: UserResponse,
  })
  @ApiBadRequestResponse({
    description: 'Invalid Album ID',
    type: BadRequestDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Refresh token is invalid or expired',
    type: UnauthorizedDto,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Return user array or empty array',
    type: [UserResponse],
  })
  @ApiUnauthorizedResponse({
    description: 'Refresh token is invalid or expired',
    type: UnauthorizedDto,
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Return user by ID', type: UserResponse })
  @ApiBadRequestResponse({
    description: 'Invalid user ID',
    type: BadRequestDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Refresh token is invalid or expired',
    type: UnauthorizedDto,
  })
  @ApiNotFoundResponse({
    description: 'User does not exits',
    type: NotFoundDto,
  })
  findOne(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Update user and return this user',
    type: UserResponse,
  })
  @ApiBadRequestResponse({
    description: 'Invalid user ID',
    type: BadRequestDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Refresh token is invalid or expired',
    type: UnauthorizedDto,
  })
  @ApiNotFoundResponse({
    description: 'User does not exits',
    type: NotFoundDto,
  })
  async update(
    @Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string,
    @Body() updateUserDto: UpdatePasswordDto,
  ) {
    const user = await this.userService.updatePassword(id, updateUserDto);

    return plainToInstance(User, user);
  }

  @Delete(':id')
  @ApiNoContentResponse({ description: 'User was removed' })
  @ApiBadRequestResponse({
    description: 'Invalid user ID',
    type: BadRequestDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Refresh token is invalid or expired',
    type: UnauthorizedDto,
  })
  @ApiNotFoundResponse({
    description: 'User does not exits',
    type: NotFoundDto,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    await this.userService.remove(id);
  }
}
