import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
// import { RefreshDto } from './dto/refresh.dto.';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Public } from './public.decorator';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('auth/signup')
  @ApiCreatedResponse({
    description: 'User was successfully signed up',
  })
  @ApiBadRequestResponse({
    description: 'Invalid credentials has been provided',
  })
  singup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  // @Post('login')
  // @ApiOkResponse({ description: 'User was successfully logined' })
  // @ApiNotFoundResponse({
  //   description: 'Invalid credentials has been provided',
  // })
  // @ApiForbiddenResponse({
  //   description: "user with such login, password doesn't extist",
  // })
  // @HttpCode(HttpStatus.OK)
  // login(@Body() loginDto: CreateUserDto) {
  //   return this.authService.login(loginDto);
  // }

  // @Post('auth/refresh')
  // @ApiOkResponse({ description: 'Token was successfully refreshed' })
  // @ApiUnauthorizedResponse({
  //   description: 'Refresh token is invalid or expired',
  // })
  // @HttpCode(HttpStatus.OK)
  // refresh(@Body() refreshDto: RefreshDto) {
  //   return this.authService.refresh(refreshDto);
  // }
}
