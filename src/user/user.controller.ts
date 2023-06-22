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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import parseUuidOptions from 'src/const/uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponse } from './dto/user-response.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { plainToInstance } from 'class-transformer';
import { User } from './entities/user.entity';
import { CreateEntityApiResponse } from 'src/common/decorators/create-entity-api-response.decorator';
import { GetAllApiResponse } from 'src/common/decorators/get-all-api-response.decorator';
import { GetByIdApiResponse } from 'src/common/decorators/get-by-id-api-response.decorator';
import { UpdateEntityApiResponse } from 'src/common/decorators/update-entity-api-response.decorator';
import { DeleteEntityApiResponse } from 'src/common/decorators/delete-entity-api-response.decorator';

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @CreateEntityApiResponse({
    successResponseType: UserResponse,
    successDescription: 'User was created successfully',
    badRequestDescription: 'Invalid request data',
    unauthorizedDescription: 'Refresh token is invalid or expired',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @GetAllApiResponse({
    successResponseType: [UserResponse],
    successDescription: 'Returns user array or empty array',
    unauthorizedDescription: 'Refresh token is invalid or expired',
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @GetByIdApiResponse({
    successResponseType: UserResponse,
    successDescription: 'Return user by ID',
    badRequestDescription: 'Invalid user ID',
    unauthorizedDescription: 'Refresh token is invalid or expired',
    notFoundDescription: 'User does not exits',
  })
  findOne(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @UpdateEntityApiResponse({
    successResponseType: UserResponse,
    successDescription: 'Update user',
    badRequestDescription: 'Invalid user ID',
    unauthorizedDescription: 'Refresh token is invalid or expired',
    notFoundDescription: 'User does not exits',
  })
  async update(
    @Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string,
    @Body() updateUserDto: UpdatePasswordDto,
  ) {
    const user = await this.userService.updatePassword(id, updateUserDto);

    return plainToInstance(User, user);
  }

  @Delete(':id')
  @DeleteEntityApiResponse({
    successDescription: 'Delete user',
    badRequestDescription: 'Invalid user ID',
    unauthorizedDescription: 'Refresh token is invalid or expired',
    notFoundDescription: 'User does not exits',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    await this.userService.remove(id);
  }
}
