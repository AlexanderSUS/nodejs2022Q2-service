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
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import parseUuidOptions from 'src/const/uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponse } from './dto/response-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto) as Promise<UserResponse>;
  }

  @Get()
  @ApiResponse({ status: 200, type: Array<UserResponse> })
  findAlll() {
    return this.userService.findAll() as Promise<UserResponse[]>;
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    return this.userService.findOne(id) as Promise<UserResponse>;
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string,
    @Body() updateUserDto: UpdatePasswordDto,
  ) {
    return this.userService.update(id, updateUserDto) as Promise<UserResponse>;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe(parseUuidOptions)) id: string) {
    await this.userService.remove(id);
  }
}
