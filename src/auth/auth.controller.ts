import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { RefreshDto } from './dto/refresh.dto.';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @ApiCreatedResponse({
    description: 'User was successfully signed up',
  })
  @ApiBadRequestResponse({
    description: 'Invalid credentials has been provided',
  })
  singup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOkResponse({ description: 'User was successfully logined' })
  @ApiNotFoundResponse({
    description: 'Invalid credentials has been provided',
  })
  @ApiForbiddenResponse({
    description: "user with such login, password doesn't extist",
  })
  @HttpCode(HttpStatus.OK)
  async login(@Request() req) {
    const { access_token, refresh_token } = await this.authService.login(
      req.user,
    );

    return {
      accessToken: access_token,
      refreshToken: refresh_token,
    };
  }

  @Post('refresh')
  @ApiOkResponse({ description: 'Token was successfully refreshed' })
  @ApiUnauthorizedResponse({
    description: 'Refresh token is invalid or expired',
  })
  @HttpCode(HttpStatus.OK)
  refresh(@Body() refreshDto: RefreshDto) {
    return this.authService.refresh(refreshDto);
  }
}
