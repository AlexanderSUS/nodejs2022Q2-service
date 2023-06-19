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
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Public } from './public.decorator';
import { RefreshAuthGuard } from './refresh-auth.guard';
import { RequestWithUser } from './interface/request-with-user.interface';

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
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOkResponse({ description: 'User was successfully logged in' })
  @ApiNotFoundResponse({
    description: 'Invalid credentials has been provided',
  })
  @ApiForbiddenResponse({
    description: "user with such login, password doesn't exist",
  })
  @HttpCode(HttpStatus.OK)
  async login(@Request() { user }: RequestWithUser) {
    return this.authService.login(user);
  }

  @Public()
  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  @ApiOkResponse({ description: 'Token was successfully refreshed' })
  @ApiUnauthorizedResponse({
    description: 'Refresh token is invalid or expired',
  })
  @HttpCode(HttpStatus.OK)
  refresh(@Request() { user }: RequestWithUser) {
    return this.authService.refresh(user);
  }
}
