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
} from '@nestjs/swagger';
import parseUuidOptions from 'src/const/uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponse } from './dto/response-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'User was created successfully',
    type: UserResponse,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Return user array or empty array',
    type: Array<UserResponse>,
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Return user by ID', type: UserResponse })
  @ApiNotFoundResponse({ description: 'User does not exits' })
  @ApiBadRequestResponse({ description: 'Invalid user ID' })
  findOne(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Update user and return this user',
    type: UserResponse,
  })
  @ApiNotFoundResponse({ description: 'User does not exits' })
  @ApiBadRequestResponse({ description: 'Invalid user ID' })
  update(
    @Param('id', new ParseUUIDPipe(parseUuidOptions))
    id: string,
    @Body() updateUserDto: UpdatePasswordDto,
  ) {
    return this.userService.updatePassword(id, updateUserDto);
  }

  @Delete(':id')
  @ApiNoContentResponse({ description: 'User was removed' })
  @ApiNotFoundResponse({ description: 'User does not exits' })
  @ApiBadRequestResponse({ description: 'Invalid user ID' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    await this.userService.remove(id);
  }
}
